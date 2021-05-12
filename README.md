### 介绍

基于 create-react-app 的 typescript 创建的项目

```
yarn create react-app react-backstage-template --template typescript
```

### 技术要点

`hooks`+`typescript`

### 项目所需重点依赖

#### UI 框架

[`antd`](https://ant-design.gitee.io/index-cn)

#### 其他比较核心的库

- [`axios`](http://www.axios-js.com/)：请求库
- [`customize-cra`](https://github.com/arackaf/customize-cra#readme)：重写 webpack 的配置
- [`less`](https://less.bootcss.com/)：css 预处理
- [`fast-deep-equal`](https://github.com/epoberezkin/fast-deep-equal)：快速比较两个参数是否全等（===），主要用于 react 的 memo 优化
