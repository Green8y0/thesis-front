import { UserStatus } from './enums'

export type PickSome<T, K extends keyof T> = {
  [P in keyof Pick<T, K>]?: T[P]
}

/**
 * 用户
 */
export interface IUser {
  _id: string
  username: string
  avatar: string
  status: UserStatus
  createdAt: number
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

export interface IRooms {
  _id: string // rooms表_id
  name: string // 会议室名称
  creatorId: string // 会议室创建者userId
}

export interface ISku {
  id: string
  title: string
}
