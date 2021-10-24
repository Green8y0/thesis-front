import axios from 'axios'

const instance = axios.create({
  validateStatus: status => {
    return status < 500
  }
})

instance.interceptors.response.use(async resp => {
  // 定义响应拦截器
  if (resp.headers['content-type'].includes('application/json')) {
    const whitelist = ['/login', '/register']
    if (
      resp.data.stat === 'ERR_NOT_LOGIN' &&
      whitelist.includes(window.location.pathname) === false
    ) {
      window.location.href = '/login'
    }
  }
  return resp
})

export interface BaseRes<T = any> {
  stat: string
  data: T
  msg: string
}

export default instance
