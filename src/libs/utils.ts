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
