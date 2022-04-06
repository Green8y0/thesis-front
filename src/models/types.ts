import { CapacityOrder, MtimeOrder, RoleType } from './enums'

export type PickSome<T, K extends keyof T> = {
  [P in keyof Pick<T, K>]?: T[P]
}
export interface ListData<T> {
  rows: T[]
  total: number
}

/**
 * 用户
 */
export interface IUser {
  _id: string
  /**
   * 昵称
   */
  nickname: string
  /**
   * 手机号
   */
  phoneNum: string
  /**
   * 角色权限
   */
  role: RoleType | RoleType[]
}

/**
 * offset, limit, order
 */
export interface SearchType {
  offset?: number
  limit?: number
  order?: MtimeOrder[] | CapacityOrder[]
}

/**
 * 会议室类型
 */
export interface IRoom {
  /**
   * rooms表_id
   */
  _id: string
  /**
   * 会议室名称
   */
  name: string
  /**
   * 会议室地址
   */
  location: string
  /**
   * 会议室容纳量
   */
  capacity: number
  /**
   * 是否有显示屏
   */
  hasScreen: boolean
  /**
   * 会议室创建者
   */
  creator: Omit<IUser, 'phoneNum'>
}

/**
 * 会议信息
 */
export interface IMeeting {
  _id: string
  /**
   * 会议室_id
   */
  roomId: string
  /**
   * 会议主题
   */
  topic: string
  /**
   * 开始时间戳
   */
  startTime: number
  /**
   * 结束时间戳
   */
  endTime: number
  /**
   * 会议室创建者
   */
  creator: Omit<IUser, 'phoneNum'>
}

/**
 * 用户信息列表请求参数
 */
export interface IUserListRes extends SearchType {
  userIds?: string[]
  phoneNums?: string[]
}
