import { DataStatus, IFrequency, IKeyofDay, IKeyofWeek } from '@/models/enums'
import request, { BaseRes } from '../libs/request'
import { SearchType, IMeeting, ListData, IObj } from '../models/types'

// API路径前缀
const PREFIX = '/api/v1/meetings'

interface ISearch extends SearchType {
  roomsIds?: string[]
  creatorIds?: string[]
  startTime?: number
  endTime?: number
}
interface IAddResp {
  meetingId: string
}
interface ISuggestionRes extends SearchType, Pick<IMeeting, 'startTime' | 'endTime'> {
  /**
   * 会议重复频率
   */
  frequency: IFrequency,
  /**
   * 重复频率结束日期戳
   */
  endPeriodic: number
  status?: DataStatus
}

export interface ISuggestionResp {
  suggestion: string
  sorted: {
    day: IObj<IKeyofDay, number>[],
    week?: IObj<IKeyofWeek, number>[]
  }
}

/**
 * 获取会议室信息
 * @param roomsIds 会议室_id数组
 * @param creatorIds 会议室创建者_id数组
 * @param startTime 会议开始时间戳
 * @param endTime 会议结束时间戳
 * @returns 会议室信息数组
 */
export async function list(props: ISearch) {
  const { data } = await request.post<BaseRes<ListData<IMeeting>>>(
    `${PREFIX}/list`, props
  )
  return data
}

/**
 * 预订会议室
 * @param roomId 会议室_id
 * @param topic 会议主题
 * @returns insertedId
 */
export async function add(props: {
  roomId: string
  topic: string
  startTime: number
  endTime: number
}) {
  const { data } = await request.post<BaseRes<IAddResp>>(
    `${PREFIX}/add`, props
  )
  return data
}

/**
 * 获取周期性时间推荐
 * @param props 见接口文档
 * @returns 建议与排序对象数组
 */
export async function suggest(props: ISuggestionRes) {
  const { data } = await request.post<BaseRes<ISuggestionResp>>(
    `${PREFIX}/suggest`, props
  )
  return data
}
