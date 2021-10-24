import request, { BaseRes } from '../libs/request'
import { ITodo, PickSome } from '../models/types'

interface ListData {
  rows: ITodo[]
}

// API路径前缀
const PREFIX = '/api/v1/todo'

/**
 * Todo列表
 * @returns
 */
export async function list() {
  const { data } = await request.post<BaseRes<ListData>>(PREFIX + '/list')
  return data
}

/**
 * 添加Todo
 * @param content
 * @returns
 */
export async function create(content: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/create', {
    content
  })
  return data
}

/**
 * 更新Todo
 * @param _id
 * @param data
 * @returns
 */
export async function update(
  _id: string,
  data: PickSome<ITodo, 'finished' | 'marked'>
) {
  const { data: result } = await request.post<BaseRes>(PREFIX + '/update', {
    _id,
    data
  })
  return result
}

/**
 * 删除任务
 * @param _id
 * @returns
 */
export async function remove(_id: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/delete', {
    _id
  })
  return data
}
