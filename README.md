# The Next Web Project

## 开发中的痛点

1. node_modules黑洞，重复的依赖会被多次下载。（多个lodash、tslib）
2. 多个git仓库之间的代码复用问题。
3. 开发过程中的报错问题。（eslint，dependencies依赖冲突）
4. 重复打包第三方依赖，用户重复下载第三方库。（重复编译react、react-dom）
5. npm install速度慢。

## turbo + pnpm + micro

> monorepo仓库配合pnpm管理依赖，采用micro模式，提高开发效率。

1. turbo，monorepo的终极方案。构建速度快，构建结果更稳定。
2. pnpm，提供统一的依赖管理工具。安装依赖速度快。

## micro(微前端)

```
apps
  ├── web           // 项目A
  ├── docs          // 项目B
packages
  ├── cli           // 脚本工具[自动化]
  ├── compoents     // 业务组件模块[业务相关，私有权限]
  ├── config        // 统一的项目配置[eslint,webpack,runtime]
  ├── store         // 状态管理模块[同域全局状态管理]
  ├── ui            // UI组件模块
pnpm-workspace.yaml
turbo.json
```
