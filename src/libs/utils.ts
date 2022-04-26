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

/**
 * 获取digit位随机数
 * @returns digit位随机数,不传参为默认六位数
 */
export function getRandom(digit: number = 6) {
  return String(Math.floor(Math.random() * Math.pow(10, digit)))
}
