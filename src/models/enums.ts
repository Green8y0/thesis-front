export enum UserStatus {
  Normal = 1,
  Disabled = 2
}
export enum RoleType {
  common = 'common',
  admin = 'admin',
  console = 'console'
}
export enum screenFilter {
  unlimit = 0, // 不限
  true = 1, // 有显示屏
  false = 2 // 无显示屏
}
export enum memberFilter {
  unlimit = 0, // 不限
  twenty = 1, // 0-20人
  ninetyNine = 2, // 21-99人
  max = 3 // 100-499人
}
