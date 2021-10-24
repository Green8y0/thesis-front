import request, { BaseRes } from '../libs/request'
import { IUser } from '../models/types'
import axios, { Canceler } from 'axios'

// API路径前缀
const PREFIX = '/api/v1/user'

interface InfoData {
  user: IUser
}
const CancelToken = axios.CancelToken
export let loginCancel: Canceler

/**
 * 用户登录
 * @param username
 * @param password
 * @returns
 */
export async function login(username: string, password: string) {
  const { data } = await request.post<BaseRes>(
    PREFIX + '/login',
    {
      username,
      password
    },
    {
      cancelToken: new CancelToken(function executor(cancel) {
        loginCancel = cancel
      })
    }
  )
  return data
}

/**
 * 用户注册
 * @param username
 * @param password
 * @returns
 */
export async function register(username: string, password: string) {
  const { data } = await request.post<BaseRes>(PREFIX + '/register', {
    username,
    password
  })
  return data
}

/**
 * 获取用户信息
 * @returns
 */
export async function info() {
  const { data } = await request.post<BaseRes<InfoData>>(PREFIX + '/info')
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
