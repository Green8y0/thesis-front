import { RoleType } from '@models/enums'
import request, { BaseRes } from '../libs/request'

// API路径前缀
const PREFIX = '/api/v1/roles'
export async function update(userId: string, type: RoleType) {
  const { data } = await request.post<BaseRes>(
    `${PREFIX}/update`, { userId: userId, type: type }
  )
  return data
}
