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
export enum RoleTypeZhCN {
  common = '普通用户',
  admin = '管理员',
  console = '系统管理员'
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
 * 会议筛选
 */
export enum MeetingFilter {
  /**
   * 按最新排序
   */
  latest = '最新',
  /**
   * 按最早排序
   */
  oldest = '最早'
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

/**
 * 人数容纳量排序类型
 */
export enum CapacityOrder {
  /**
   * 按人数容纳量(capacity)降序
   */
  desc = '-capacity',
  /**
   * 按人数容纳量(capacity)升序
   */
  asc = '+capacity'
}

/**
 * 记录状态
 */
export enum DataStatus {
  /**
   * 正常
   */
  normal = 0,
  /**
   * 已删除
   */
  deleted = 1
}

export enum IFrequency {
  /**
   * 每天
   */
  day = 'day',
  /**
   * 每周
   */
  week = 'week'
}

export enum IKeyofDay {
  morning = 'morning',
  nooning = 'nooning',
  afternoon = 'afternoon',
  evening = 'evening'
}
export enum IKeyofWeek {
  Monday = 'Monday', // 周一的会议次数
  Tuesday = 'Tuesday', // 周二的会议次数
  Wednesday = 'Wednesday',
  Thursday = 'Thursday',
  Friday = 'Friday',
  Saturday = 'Saturday',
  Sunday = 'Sunday'
}
