import { useState, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { useRequest } from 'ahooks'
import { Form, Dialog, Toast, Button, Popup } from 'react-vant'
import dayjs from 'dayjs'
import isToday from 'dayjs/plugin/isToday'
import { FormItemProps } from 'react-vant/es/form'
import { ListInstance } from 'react-vant/es/list'

import Layout from '@/components/Layout'
import EditForm from '@/components/EditForm'
import { IRoom, IMeeting, IUser } from '@/models/types'
import { useFormList } from './hooks/useFormList'
import DateTimeField from '@/components/DateTimeField'
import { attendeesService, meetingsService, roomsService, userService } from '@/services'
import { filterSameKey, getDataBind, getRandom, unique } from '@/libs/utils'
import { Duration, getOnceADay, getOnceAWeek } from '@/libs/DateUtils'
// import { MemberFilter } from '@/models/enums'
import RoomCard from '@/pages/Rooms/RoomCard'
import { usePeriodicFormList } from './hooks/usePeriodicFormLIst'
import NewIcon from '@/components/Icon/NewIcon'
import AttendeesPicker from '@/components/AttendeesPicker'
import { IFrequency } from '@/models/enums'
import styles from './style.module.less'

dayjs.extend(isToday)

interface IAddMeeting extends
Pick<IRoom, 'hasScreen' | 'capacity'>,
Pick<IMeeting, 'topic'> {
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
  startTime: string
  endTime: string
}

interface ILocation {
  dateText: string
}
enum TimeType {
  startTime = 'startTime',
  endTime = 'endTime'
}
/**
 * 获取周期性会议的startTime和endTime的数组
 * @param frequency 周期频率
 * @param begin 会议开始时间戳（MM-DD HH:SS）
 * @param end 会议结束时间戳（MM-DD HH:SS）
 * @param endPeriodic 结束重复日期时间戳
 * @param startTime 会议开始时间戳（HH:SS）
 * @returns Duration[]
 */
const getDuration = (
  frequency: string,
  begin: number, end: number,
  endPeriodic: string, startTime: string
) => {
  if (frequency[1] === '天') {
    return getOnceADay(
      { startTime: begin, endTime: end },
      new Date(`${endPeriodic} ${startTime}`)
    ) || []
  } else if (frequency[1] === '周') {
    // 每周
    return getOnceAWeek(
      { startTime: begin, endTime: end },
      new Date(`${endPeriodic} ${startTime}`)
    ) || []
  }
}

export default function Reserve() {
  const location = useLocation<ILocation>()
  const history = useHistory()
  const limit = useRef(10)
  const listRef = useRef<ListInstance>(null)
  const [form] = Form.useForm()
  const [showForm, setShowForm] = useState(true)
  const [dateText] = useState(location.state?.dateText)
  const [sTimeVisiable, setSTimeVisiable] = useState(false)
  const [eTimeVisiable, setETimeVisiable] = useState(false)
  const [isPeriodic, setIsPeriodic] = useState(false)
  const [searchVal, setSearchVal] = useState('')
  const [meetings, setMeetings] = useState<IMeeting[]>([])
  const [rooms, setRooms] = useState<IRoom[]>([])
  const [users, setUsers] = useState<IUser[]>([])
  const [finished, setFinished] = useState(false)
  const [visibleAttendees, setVisibleAttendees] = useState(false)
  const [attendees, setAttendees] = useState<IUser[]>([])

  // const [total, setTotal] = useState(0)

  const { run: getSuggestion } = useRequest(meetingsService.suggest, {
    manual: true,
    onSuccess: async (data) => {
      if (data.stat === 'OK') {
        const { suggestion } = data.data
        try {
          await Dialog.alert({
            title: '当前时间段无空闲会议室',
            message: suggestion,
            onClose: () => {
              setShowForm(true)
            }
          })
        } catch (error) {
          console.error(error)
        }
      }
    }
  })
  // 获取会议信息
  const { run: getMeetings } = useRequest(meetingsService.list, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.stat === 'OK') {
        // console.log('data.data.rows = ', data.data.rows)
        setMeetings(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        // setTotal(data.data.total)
        // setHasMore(data.data.rows.length >= limit.current)
      }
    },
    fetchKey: () => getRandom()
  })
  const { run: loadRooms } = useRequest(roomsService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        let ids = [] as string[]
        const mts = unique(meetings, 'roomId')
        // console.log('mts = ', mts, 'meetings = ', meetings)
        if (mts.length > 0) {
          // 获取指定的时间段被占用的会议室id
          ids = mts.map(item => item.roomId)
          // 过滤被占用的会议室
          data.data.rows = data.data.rows.filter(item => !ids.includes(item._id))
        }
        if ([...rooms, ...filterSameKey(data.data.rows, rooms, '_id')].length === 0) {
          const frequency = form.getFieldValue('frequency') as string
          const dateText = form.getFieldValue('dateText') as string
          const startTime = form.getFieldValue('startTime') as string
          const endTime = form.getFieldValue('endTime') as string
          const endPeriodic = form.getFieldValue('endPeriodic') as string
          getSuggestion({
            startTime: new Date(`${dateText} ${startTime}`).getTime(),
            endTime: new Date(`${dateText} ${endTime}`).getTime(),
            frequency: frequency === '每周' ? IFrequency.week : IFrequency.day,
            endPeriodic: new Date(`${endPeriodic} 23:00`).getTime()
          })
        }
        setRooms(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        // setTotal(data.data.total)
        // setHasMore(data.data.rows.length >= limit.current)
        return data.data
      }
    }
  })
  const { run: addAttendees } = useRequest(attendeesService.add, {
    manual: true
  })
  // 预订会议室
  const { run: addMeeting } = useRequest(meetingsService.add, {
    manual: true,
    onSuccess: (data, params) => {
      if (data.stat === 'OK' && location.pathname === '/reserve') {
        Toast.success('预订成功')
        const meetingId = data.data.meetingId
        const { roomId } = params[0]
        if (roomId && meetingId) {
          addAttendees(meetingId, attendees.map(item => item._id))
          history.replace(`/detail/${roomId}`)
        } else {
          history.replace('/')
        }
      }
    },
    fetchKey: () => getRandom()
  })
  const { run: getUsers } = useRequest(userService.list, {
    manual: true,
    onSuccess: data => {
      if (data.stat === 'OK') {
        setUsers(val => [...val, ...filterSameKey(data.data.rows, val, '_id')])
        setFinished(data.data.rows.length < limit.current)
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
    },
    attendeesFieldProps: {
      onClick: () => setVisibleAttendees(true)
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
    setShowForm(false)
    let req: Duration[] = []
    const begin = new Date(`${val.dateText} ${val.startTime}`).getTime()
    const end = new Date(`${val.dateText} ${val.endTime}`).getTime()
    if (val.frequency) {
      req = getDuration(
        val.frequency,
        begin,
        end,
        val.endPeriodic as string,
        val.startTime
      ) || []
      Promise.all(getDataBind(getMeetings, req)).then(values => {
        // console.log('values = ', values)
      })
    } else {
      getMeetings({
        startTime: begin,
        endTime: end
      })
    }
    loadRooms({
      capacityLimit: val.capacity,
      hasScreen: Boolean(val.hasScreen)
    })
  }
  // 选择预约的会议室
  const selectRoom = (room: IRoom) => {
    const frequency = form.getFieldValue('frequency') as string
    const dateText = form.getFieldValue('dateText') as string
    const startTime = form.getFieldValue('startTime') as string
    const endTime = form.getFieldValue('endTime') as string
    const endPeriodic = form.getFieldValue('endPeriodic') as string
    const begin = new Date(`${dateText} ${startTime}`).getTime()
    const end = new Date(`${dateText} ${endTime}`).getTime()
    if (frequency) {
      const req = getDuration(
        frequency,
        begin,
        end,
        endPeriodic,
        startTime
      ) || []
      console.log('line 270 req = ', req)
      const msg = { roomId: room._id, topic: form.getFieldValue('topic') }
      req.map(item => Object.assign(item, msg))
      console.log('@@@@@@@@ req = ', req)
      Promise.all(getDataBind(addMeeting, req)).then(values => {
        console.log('values = ', values)
      }).catch(reson => {
        console.log('reson = ', reson)
      })
    } else {
      addMeeting({
        roomId: room._id,
        topic: form.getFieldValue('topic'),
        startTime: begin,
        endTime: end
      })
    }
  }
  const changeTime = (changeType: TimeType, value: string) => {
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
  const refresh = async (fn?: () => void) => {
    return new Promise(resolve => {
      setFinished(false)
      setUsers(attendees)
      fn && fn()
      resolve('')
    }).then(() => {
      listRef.current?.check()
    })
  }
  const loadMoreUser = async () => {
    try {
      if (searchVal) {
        await getUsers({ phoneNums: [searchVal] })
      } else {
        await getUsers({
          offset: users.length,
          limit: limit.current
        })
      }
    } catch (error) {
      console.trace(error)
    }
  }
  return (
    <Layout
      showNav={true}
      showTab={false}
      navText='预订会议室'
    >
      <Button type='default' round
        icon={<NewIcon/>}
        className={styles.btn}
        shadow={2}
        onClick={() => setShowForm(true)}
      ></Button>
      <Popup
        visible={showForm}
        position='top'
        onClose={() => setShowForm(false)}
        round
      >
        <EditForm
          formProps={{
            form,
            initialValues: { dateText },
            onFinish
          }}
          formList={usePeriodicFormList({ form, isPeriodic, formList, today: new Date(dateText) })}
        />
      </Popup>
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
          minHour: dayjs(dateText).isToday() ? dayjs().get('hour') : 9,
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
      <AttendeesPicker
        popupProps={{
          visible: visibleAttendees,
          round: true,
          position: 'bottom',
          onClose: () => {
            form.setFields([{
              name: 'attendees',
              value: attendees.length + '人'
            }])
            setVisibleAttendees(false)
          }
        }}
        listProps={{
          finished: finished,
          onLoad: loadMoreUser
        }}
        users={users}
        searchProps={{
          value: searchVal,
          onSearch: val => {
            refresh(() => setSearchVal(val))
          },
          onClear: val => {
            refresh(() => setSearchVal(val))
          }
        }}
        checkboxProps={{
          value: attendees,
          setValue: (value: IUser[]) => setAttendees(value)
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
                selectRoom(item)
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
