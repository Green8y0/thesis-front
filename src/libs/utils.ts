/**
 * 返回bigArr中不存在smallArr中的项
 * @example
 * bigArr = [{ id: '001' }, { id: '002' }]
 * smallArr = [{ id: '001' }, { id: '003' }]
 * filterSameKey(bigArr, smallArr, 'id') = [{ id: '002' }]
 * @param bigArr filter执行的数组
 * @param smallArr 控制key的数组
 * @param key 两个数组中控制过滤的key
 * @returns any[]
 */
export function filterSameKey<T>(bigArr: T[], smallArr: T[], key: keyof T): T[] {
  const keys = smallArr.map(item => item[key])
  return bigArr.filter(item => keys.includes(item[key]) === false)
}

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

/**
 * 获取Promise.all的参数
 * @param func 封装的Promise方法
 * @param parmas 参数数组
 * @returns Promise数组
 */
export function getDataBind<T>(func: Function, parmas: T[]) {
  return parmas.map(item => func(item))
}

/**
 * 对象数组去重
 * @param parmas 对象数组
 * @param key 指定的key
 * @returns 去重后的对象数组
 */
export function unique<T>(parmas: T[], key: keyof T) {
  const res = new Map()
  return parmas.filter((item) => !res.has(item[key]) && res.set(item[key], true))
}
