import request, { BaseRes } from '../libs/request'
import { IUser, IUserListRes, ListData, SearchType } from '../models/types'
import { Canceler } from 'axios'

// API路径前缀
const PREFIX = '/api/v1/user'

export let loginCancel: Canceler

/**
 * 用户登录
 * @param phoneNum 手机号
 * @param code 验证码
 * @returns
 */
export async function login(phoneNum: string, code: number) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/login`, { phoneNum, code }
  )
  return data
}

/**
 * 用户注册
 * @param phoneNum 手机号
 * @param nickname 昵称
 * @returns
 */
export async function register(phoneNum: string, nickname?: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/register', {
    phoneNum,
    nickname
  })
  return data
}

/**
 * 获取用户信息
 * @returns
 */
export async function info() {
  const { data } = await request.post<BaseRes<IUser>>(PREFIX + '/info')
  return data
}

/**
 * 注销登录
 * @returns
 */
export async function logout() {
  const { data } = await request.post<BaseRes>(PREFIX + '/logout')
  return data
}

/**
 * 发送登录验证码
 * @returns
 */
export async function sms(phoneNum: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/sms', {
    phoneNum
  })
  return data
}

/**
 * 获取我的会议信息
 * @returns
 */
export async function meetings(record: SearchType) {
  const { data } = await request.post<BaseRes>(PREFIX + '/meetings', { ...record })
  return data
}

/**
 * 获取用户信息列表
 * @param record 用户信息
 * @returns
 */
export async function list(record: IUserListRes) {
  const { data } = await request.post<BaseRes<ListData<IUser>>>(PREFIX + '/list', {
    record
  })
  return data
}
