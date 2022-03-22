import { IMeeting } from '@/models/types'

/**
 * 获取指定时间的星期
 * @param date 指定时间
 * @returns 指定时间的星期
 */
export function getCurrentWeek(date: Date): string {
  const dateNum = date.getDay()
  let dateStr = ''
  switch (dateNum) {
    case 1:
      dateStr = '周一'
      break
    case 2:
      dateStr = '周二'
      break
    case 3:
      dateStr = '周三'
      break
    case 4:
      dateStr = '周四'
      break
    case 5:
      dateStr = '周五'
      break
    case 6:
      dateStr = '周六'
      break
    case 0:
      dateStr = '周日'
      break
    default:
      break
  }
  return dateStr
}

/**
 * 获取指定小时的毫秒数
 * @param hour 小时
 * @returns 小时的毫秒数
 */
export function getHourOfms(hour: number): number {
  return hour * 60 * 60 * 1000
}

/**
 * 获取开始时间到结束时间的间隔天数
 * @param begin 开始时间
 * @param end 结束时间
 * @returns 间隔天数
 */
export function getDayOfInterval(begin: Date, end: Date): number {
  const beginStamp = begin.getTime()
  const endStamp = end.getTime()
  return (endStamp - beginStamp) / getHourOfms(24)
}

// export interface Duration {
//   /**
//    * 开始时间戳
//    */
//   startTime: number
//   /**
//    * 结束时间戳
//    */
//   endTime: number
// }
export interface Duration extends Pick<IMeeting, 'startTime' | 'endTime'> {}
const isBeforeDate = (dateA: Date | number, dateB: Date) => dateA < dateB
/**
 * 获取指定时间段duration每天的数组
 * @param duration 时间段
 * @param endDate 结束重复日期
 * @returns 每天duration的数组
 */
export function getOnceADay(duration: Duration, endDate: Date) {
  const { startTime, endTime } = duration
  const diff = getDayOfInterval(new Date(startTime), endDate)
  const tArr: Duration[] = [duration]
  const s = new Date(startTime)
  const e = new Date(endTime)
  for (let index = 0; index < diff; index++) {
    const element = {
      startTime: s.setDate(s.getDate() + 1),
      endTime: e.setDate(e.getDate() + 1)
    }
    tArr.push(element)
  }
  return tArr
}

/**
 * 获取指定时间段duration每周的数组
 * @param duration 时间段
 * @param endDate 结束重复日期
 * @returns 每周duration的数组
 */
export function getOnceAWeek(duration: Duration, endDate: Date) {
  const { startTime, endTime } = duration
  const s = new Date(startTime)
  const e = new Date(endTime)
  const tArr: Duration[] = [duration]
  while (isBeforeDate(s.setDate(s.getDate() + 7), endDate)) {
    const element = {
      startTime: s.getTime(),
      endTime: e.setDate(e.getDate() + 7)
    }
    tArr.push(element)
  }
  return tArr
}
/**
 * 获取指定时间段duration每月的数组
 * @param duration 时间段
 * @param endDate 结束重复日期
 * @returns 每月duration的数组
 */
export function getOnceAMouth(duration: Duration, endDate: Date) {
  const { startTime, endTime } = duration
  const s = new Date(startTime)
  const e = new Date(endTime)
  const tArr: Duration[] = [duration]
  while (isBeforeDate(s.setMonth(s.getMonth() + 1), endDate)) {
    const element = {
      startTime: s.getTime(),
      endTime: e.setMonth(e.getMonth() + 1)
    }
    tArr.push(element)
  }
  return tArr
}
