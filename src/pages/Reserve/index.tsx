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
import { filterSameKey, getDataBind, unique } from '@/libs/utils'
import { Duration, getOnceADay, getOnceAMouth, getOnceAWeek } from '@/libs/DateUtils'
// import { MemberFilter } from '@/models/enums'
import RoomCard from '@/pages/Rooms/RoomCard'
import { usePeriodicFormList } from './hooks/usePeriodicFormLIst'

interface IAddMeeting extends
Pick<IRoom, 'hasScreen' | 'capacity'>,
Pick<IMeeting, 'topic' | 'startTime' | 'endTime'> {
  dateText: string
  isPeriodic: boolean
  /**
   * 重复频率（每天/周/月）
   */
  frequency?: string
  /**
   * 结束重复日期
   */
  endPeriodic?: string
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

  // 获取会议信息
  const { run: getMeetings } = useRequest(meetingsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        console.log('data.data.rows = ', data.data.rows)
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
        let ids = [] as string[]
        const mts = unique(meetings, 'roomId')
        console.log('mts = ', mts, 'meetings = ', meetings)
        if (mts.length > 0) {
          // 获取指定的时间段被占用的会议室id
          ids = mts.map(item => item.roomId)
          // 过滤被占用的会议室
          data.data.rows = data.data.rows.filter(item => !ids.includes(item._id))
        }
        setRooms(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        // setTotal(data.data.total)
        // setHasMore(data.data.rows.length >= limit.current)
        return data.data
      }
    }
  })
  // 预订会议室
  const { run: addMeeting } = useRequest(meetingsService.add, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.stat === 'OK') {
        Toast.success('预订成功')
        const { roomId } = params[0]
        if (roomId) {
          history.replace(`/detail/${roomId}`)
        } else {
          history.replace('/')
        }
      }
    }
  })

  // 预订会议表单
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

  // 加载会议室
  const loadMoreRoom = async () => {
    try {
      const val = form.getFieldsValue() as IAddMeeting
      await loadRooms({
        capacityLimit: val.capacity,
        hasScreen: Boolean(val.hasScreen)
      })
    } catch (error) {
      console.trace(error)
    }
  }

  // 预订会议提交按钮
  const onFinish = async (val: IAddMeeting) => {
    console.log('val = ', val)
    let req: Duration[] = []
    if (val.frequency) {
      const begin = new Date(`${val.dateText} ${val.startTime}`).getTime()
      const end = new Date(`${val.dateText} ${val.endTime}`).getTime()
      if (val.frequency[1] === '天') {
        // 每天
        // const len = getDayOfInterval(
        //   new Date(`${val.dateText} ${val.startTime}`),
        //   new Date(`${val.endPeriodic} ${val.startTime}`)
        // )
        // const hourOfms = getHourOfms(24)
        // for (let index = 0; index <= len; index++) {
        //   req = [...req, {
        //     startTime: begin + index * hourOfms,
        //     endTime: end + index * hourOfms
        //   }]
        // }
        req = getOnceADay(
          { startTime: begin, endTime: end },
          new Date(`${val.endPeriodic} ${val.startTime}`)
        )
      } else if (val.frequency[1] === '周') {
        // 每周
        req = getOnceAWeek(
          { startTime: begin, endTime: end },
          new Date(`${val.endPeriodic} ${val.startTime}`)
        )
      } else if (val.frequency[1] === '月') {
        // 每月
        req = getOnceAMouth(
          { startTime: begin, endTime: end },
          new Date(`${val.endPeriodic} ${val.startTime}`)
        )
      }
      // TODO：并行调用getMeetings出现最后返回请求的rows覆盖前面返回请求的rows
      Promise.all(getDataBind(getMeetings, req)).then(values => {
        console.log('values = ', values)
      })
      // getDataBind(getMeetings, req)
      // req.map(item => getMeetings(item))
      console.log('req = ', req)
      // console.log('ret = ', ret)
    } else {
      getMeetings({
        startTime: new Date(`${val.dateText} ${val.startTime}`).getTime(),
        endTime: new Date(`${val.dateText} ${val.endTime}`).getTime()
      })
    }
    loadRooms({
      capacityLimit: val.capacity,
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
      // console.log('@', form.getFieldValue('startTime'))
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
        formList={usePeriodicFormList({ form, isPeriodic, formList, today: new Date(dateText) })}
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
