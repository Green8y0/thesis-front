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
/**
 * 会议室可删除信息
 */
interface IUpdate {
  /**
   * 修改的会议室_id
   */
  roomId: string
  /**
   * 名称
   */
  name?: string
  /**
   * 是否有显示屏
   */
  hasScreen?: boolean
  /**
   * 人员容纳量
   */
  capacity?: number
  /**
   * 会议室地址
   */
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

/**
 * 删除会议室记录
 * @param roomId 会议室id
 * @param status 会议室状态，默认传递已删除
 * @returns modifiedId
 */
export async function deleteRoom(roomId: string, status: DataStatus = DataStatus.deleted) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/update`, { roomId, status }
  )
  return data
}

/**
 * 修改会议室记录
 * @param record 修改的信息
 * @returns modifiedId
 */
export async function update(record: IUpdate) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/update`, record
  )
  return data
}

/**
 * 新增会议室记录
 * @param record 新增会议室信息
 * @returns 见接口文档
 */
export async function add(record: Omit<IRoom, '_id' | 'creator'>) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/add`, { ...record, hasScreen: Boolean(record.hasScreen) }
  )
  return data
}
