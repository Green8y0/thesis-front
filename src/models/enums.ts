export enum UserStatus {
  Normal = 1,
  Disabled = 2
}
/**
 * 角色类型
 */
export enum RoleType {
  /**
   * 普通类型
   */
  common = 'common',
  /**
   * 管理员
   */
  admin = 'admin',
  /**
   * 系统管理员
   */
  console = 'console'
}
/**
 * 显示屏筛选
 */
export enum ScreenFilter {
  /**
   * 不限
   */
  unlimit = 'undefined',
  /**
   * 有显示屏
   */
  true = 'true',
  /**
   * 无显示屏
   */
  false = 'false'
}
/**
 * 人数筛选
 */
export enum MemberFilter {
  /**
   * 不限
   */
  unlimit = 0,
  /**
   * 0-20人
   */
  twenty = 1,
  /**
   * 21-99人
   */
  ninetyNine = 2,
  /**
   * 100-499人
   */
  max = 3
}
/**
 * 修改时间排序类型
 */
export enum MtimeOrder {
  /**
   * 按修改时间(mtime)降序
   */
  desc = '-mtime',
  /**
   * 按修改时间(mtime)升序
   */
  asc = '+mtime'
}
