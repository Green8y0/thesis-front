import request, { BaseRes } from '../libs/request'
import { MemberFilter, DataStatus } from '@/models/enums'
import { SearchType, IRoom } from '../models/types'

// API路径前缀
const PREFIX = '/api/v1/rooms'

interface ListData<T> {
  rows: T[]
}

interface ISearch extends SearchType {
  roomsIds?: string[]
  name?: string
  creatorIds?: string[]
  hasScreen?: boolean
  capacity?: MemberFilter
}
interface IUpdate {
  roomId: string
  name?: string
  hasScreen?: boolean
  capacity?: number
  location?: string
}

/**
 * 获取会议室信息
 * @param roomsIds 会议室_id数组
 * @param creatorIds 会议室创建者_id数组
 * @param name 会议室名称
 * @param hasScreen 是否有显示屏
 * @param capacity 人数筛选
 * @returns 会议室信息数组
 */
export async function list(record: ISearch) {
  const { data } = await request.post<BaseRes<ListData<IRoom>>>(
    `${PREFIX}/list`, record
  )
  return data
}

export async function deleteRoom(roomId: string, status: DataStatus) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/update`, { roomId, status }
  )
  return data
}

export async function update(record: IUpdate) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/update`, record
  )
  return data
}
