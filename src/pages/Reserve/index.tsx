import { useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Form, Dialog, Toast } from 'react-vant'
import dayjs from 'dayjs'
import { FormItemProps } from 'react-vant/es/form'
import { ListInstance } from 'react-vant/es/list'

import Layout from '@/components/Layout'
import EditForm from '@/components/EditForm'
import { IRoom, IMeeting } from '@/models/types'
import { useFormList } from './hooks/useFormList'
import DateTimeField from '@/components/DateTimeField'
import { meetingsService, roomsService } from '@/services'
import { filterSameKey } from '@/libs/utils'
import { MemberFilter } from '@/models/enums'
import RoomCard from '@/pages/Rooms/RoomCard'
import { usePeriodicFormList } from './hooks/usePeriodicFormLIst'

interface IAddMeeting extends
Pick<IRoom, 'hasScreen' | 'capacity'>,
Pick<IMeeting, 'topic' | 'startTime' | 'endTime'> {
  dateText: string
}

interface ILocation {
  dateText: string
}
enum TimeType {
  startTime = 'startTime',
  endTime = 'endTime'
}

export default function Reserve() {
  const location = useLocation<ILocation>()
  const history = useHistory()
  const listRef = useRef<ListInstance>(null)
  const [form] = Form.useForm()
  const [dateText] = useState(location.state?.dateText)
  const [sTimeVisiable, setSTimeVisiable] = useState(false)
  const [eTimeVisiable, setETimeVisiable] = useState(false)
  const [isPeriodic, setIsPeriodic] = useState(false)
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [rooms, setRooms] = useState<IRoom[]>([])
  // const [total, setTotal] = useState(0)

  const { run: getMeetings } = useRequest(meetingsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setMeetings(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        // setTotal(data.data.total)
        // setHasMore(data.data.rows.length >= limit.current)
      }
    }
  })
  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setRooms(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        // setTotal(data.data.total)
        // setHasMore(data.data.rows.length >= limit.current)
      }
    }
  })
  const { run: addMeeting } = useRequest(meetingsService.add, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        Toast.success('预订成功')
        history.replace('/')
      }
    }
  })
  const formList: FormItemProps[] = useFormList({
    startTimeFieldProps: {
      onClick: () => setSTimeVisiable(true)
    },
    endTimeFieldProps: {
      onClick: () => setETimeVisiable(true)
    },
    isPeriodicFieldProps: {
      onChange: (checked) => setIsPeriodic(checked)
    }
  })

  const getMemberFilter = (val: number) => {
    if (val <= 20) return MemberFilter.twenty
    else if (val <= 99) return MemberFilter.ninetyNine
    return MemberFilter.max
  }

  const loadMoreRoom = async () => {
    try {
      const val = form.getFieldsValue() as IAddMeeting
      await loadRooms({
        capacity: getMemberFilter(val.capacity),
        hasScreen: Boolean(val.hasScreen)
      })
    } catch (error) {
      console.trace(error)
    }
  }

  const onFinish = async (val: IAddMeeting) => {
    // console.log(val)
    getMeetings({
      startTime: new Date(`${val.dateText} ${val.startTime}`).getTime(),
      endTime: new Date(`${val.dateText} ${val.endTime}`).getTime()
    })
    let ids = [] as string[]
    if (meetings.length > 0) {
      ids = meetings.map(item => item._id)
    }
    loadRooms({
      capacity: getMemberFilter(val.capacity),
      hasScreen: Boolean(val.hasScreen)
    })
  }
  const changeTime = (changeType: TimeType, value: string) => {
    console.log(value)
    if (changeType) {
      form.setFields([{
        name: changeType,
        value: value
      }])
      console.log('@', form.getFieldValue('startTime'))
    }
  }
  const filterStartTime = () => {
    return new Date(`${dateText} ${form.getFieldValue('startTime')}`)
  }
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='预订会议室'
    >
      <EditForm
        formProps={{
          form,
          initialValues: { dateText },
          onFinish
        }}
        formList={usePeriodicFormList({ isPeriodic, formList })}
      />
      <DateTimeField
        popupProps={{
          visible: sTimeVisiable,
          round: true,
          position: 'bottom',
          onClose: () => setSTimeVisiable(false)
        }}
        dateTimePickerProps={{
          title: '请选择开始时间',
          type: 'time',
          minHour: dayjs().get('hour'),
          maxHour: 21,
          filter: (type, options) => {
            if (type === 'minute') {
              return options.filter((option) => Number(option) % 15 === 0)
            }
            return options
          },
          onCancel: () => setSTimeVisiable(false),
          onConfirm: (value: string) => {
            setSTimeVisiable(false)
            changeTime(TimeType.startTime, value)
          }
        }}
      />
      <DateTimeField
        popupProps={{
          visible: eTimeVisiable,
          round: true,
          position: 'bottom',
          onClose: () => setETimeVisiable(false)
        }}
        dateTimePickerProps={{
          title: '请选择结束时间',
          type: 'time',
          minHour: dayjs(filterStartTime()).get('hour') || dayjs().get('hour'),
          maxHour: 21,
          filter: (type, options) => {
            if (type === 'minute') {
              return options.filter((option) => Number(option) % 15 === 0)
            }
            return options
          },
          onCancel: () => setETimeVisiable(false),
          onConfirm: (value: string) => {
            setETimeVisiable(false)
            changeTime(TimeType.endTime, value)
          }
        }}
      />
      {rooms.length > 0 &&
        <RoomCard
          listRef={listRef}
          rooms={rooms}
          loadMore={loadMoreRoom}
          finished={true}
          onClickByCardHeader={(item: IRoom) => {
            Dialog.confirm({
              title: '预订',
              message: `是否预订 ${item.name} 会议室？`
            })
              .then(() => {
                // on confirm
                console.log('on confirm')
                addMeeting({
                  roomId: item._id,
                  topic: form.getFieldValue('topic'),
                  startTime: new Date(`${dateText} ${form.getFieldValue('startTime')}`).getTime(),
                  endTime: new Date(`${dateText} ${form.getFieldValue('endTime')}`).getTime()
                })
              })
              .catch(() => {
                // on cancel
                console.log('on cancel')
              })
          }}
        />
      }
    </Layout>
  )
}
