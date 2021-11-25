# thesis-front

该工程在 `create-react-app` 创建的工程的基础上做了一些修改

## 开发流程

```bash
# 安装依赖
yarn install
# 启动项目
yarn start
```

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

## 前端路由设置

- 首页：`/`
- 登录：`/login`
- 注册：`/register`
- 个人中心：`/me`
- 新增预订：`/reserve`
