import request, { BaseRes } from '../libs/request'
import { SearchType, IRoom } from '../models/types'

// API路径前缀
const PREFIX = '/api/v1/rooms'
// const PREFIX = '/api/v1/sku'

interface ListData<T> {
  rows: T[]
}

interface ISearch extends SearchType {
  roomsIds?: string[]
  name?: string
  creatorIds?: string[]
}

export async function list({
  roomsIds,
  name,
  creatorIds,
  offset,
  limit,
  order
}: ISearch) {
  const { data } = await request.post<BaseRes<ListData<IRoom>>>(
    `${PREFIX}/list`, {
      roomsIds,
      name,
      creatorIds,
      offset,
      limit,
      order
    }
  )
  return data
}
