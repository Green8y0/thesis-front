import { SearchType, IAttendees, ListData } from '@/models/types'
import request, { BaseRes } from '../libs/request'

// API路径前缀
const PREFIX = '/api/v1/attendees'

interface IAddResp {
  insertedId: string
}
interface IListReq extends SearchType {
  meetingIds: string[]
  attendeeId: string
}

/**
 * 新增与会者
 * @param meetingId 会议记录_id
 * @param attendeeIds 与会者userId，不需要传自己的userId
 * @returns insertedId
 */
export async function add(meetingId: string, attendeeIds: string[]) {
  const { data } = await request.post<BaseRes<IAddResp>>(
    `${PREFIX}/add`, { meetingId, attendeeIds }
  )
  return data
}

/**
 * 获取与会者信息
 * @param record 查询参数，详情见接口文档
 * @returns 与会者信息列表
 */
export async function list(record: IListReq) {
  const { data } = await request.post<BaseRes<ListData<IAttendees>>>(
    `${PREFIX}/list`, record
  )
  return data
}
