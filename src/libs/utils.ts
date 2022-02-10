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
