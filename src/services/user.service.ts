import request, { BaseRes } from '../libs/request'
import { IUser } from '../models/types'
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
 * 修改密码
 * @param oldValue
 * @param newValue
 * @returns
 */
export async function passwd(oldValue: string, newValue: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/passwd', {
    oldValue,
    newValue
  })
  return data
}
