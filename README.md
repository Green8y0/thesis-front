# React Todo

该工程在 `create-react-app` 创建的工程的基础上做了一些修改

## 代码规范

- 配置了 `eslint` 规则，遵循 `standard.js` 规范，具体依赖可以参考 `package.json`
- 配置了 `prettier` 代码格式化规则

## 代理

- 通过 `src/setupProxy.js` 自定义了代理规则

## webpack

- 使用 `react-app-rewired`、`customize-cra` 替换了默认了 `react-scripts` 
- 增加了 `less` 的支持，`less-loader` 最新版本有兼容问题
- 增加了导入路径别名的支持，`@*` => `src/`

## 目录结构

- assets：静态资源目录

  - styles：全局样式

- components：公共组件目录
- libs：公共函数库目录
- models：接口定义、枚举类型定义

  - types.ts：interface 接口定义
  - enums.ts：enum 枚举类型定义

- pages：路由页面组件目录
- services：服务模块目录，封装API请求等

## 前端路由设置

- 首页：`/`
- 登录：`/login`
- 注册：`/register`
- 个人中心：`/me`
- 新增预订：`reserve`
