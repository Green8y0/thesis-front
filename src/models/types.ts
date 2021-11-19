import { RoleType } from './enums'

export type PickSome<T, K extends keyof T> = {
  [P in keyof Pick<T, K>]?: T[P]
}

/**
 * 用户
 */
export interface IUser {
  _id: string
  nickname: string
  phoneNum: string
  role: RoleType
}

/**
 * TODO
 */
export interface ITodo {
  _id: string
  content: string
  userId: string
  finished: boolean
  marked: boolean
  createdAt: number
}

export interface SearchType {
  offset?: number
  limit?: number
  order?: string[]
}

export interface IRoom {
  _id: string // rooms表_id
  name: string // 会议室名称
  creatorId: string // 会议室创建者userId
  location: string // 会议室地址
  capacity: number // 会议室容纳量
  hasScreen: boolean // 是否有显示屏
}

export interface ISku {
  id: string
  title: string
}
