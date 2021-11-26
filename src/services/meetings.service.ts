import request, { BaseRes } from '../libs/request'
import { SearchType, IMeeting } from '../models/types'

// API路径前缀
const PREFIX = '/api/v1/meetings'

interface ListData<T> {
  rows: T[]
  total: number
}

interface ISearch extends SearchType {
  roomsIds?: string[]
  creatorIds?: string[]
}

/**
 * 获取会议室信息
 * @param roomsIds 会议室_id数组
 * @param creatorIds 会议室创建者_id数组
 * @returns 会议室信息数组
 */
export async function list({
  roomsIds,
  creatorIds,
  offset,
  limit,
  order
}: ISearch) {
  const { data } = await request.post<BaseRes<ListData<IMeeting>>>(
    `${PREFIX}/list`, {
      roomsIds,
      creatorIds,
      offset,
      limit,
      order
    }
  )
  return data
}
