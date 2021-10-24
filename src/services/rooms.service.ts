import request, { BaseRes } from '../libs/request'
import { SearchType, IRooms, ISku } from '../models/types'

// API路径前缀
// const PREFIX = '/api/v1/rooms'
const PREFIX = '/api/v1/sku'

interface ListData<T> {
  rows: T[]
}

interface ISearch extends SearchType {
  roomsId?: string
  name?: string
  creatorId?: string
}

export async function search({
  roomsId,
  name,
  creatorId,
  offset,
  limit,
  order
}: ISearch) {
  const { data } = await request.post<BaseRes<ListData<ISku>>>(
    `${PREFIX}/list`, {
      roomsId,
      name,
      creatorId,
      offset,
      limit,
      order
    }
  )
  return data
}
