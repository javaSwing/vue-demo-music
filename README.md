## 一个基本 create-react-app 的开发模版

> 使用 `typescript`开发，版本依赖如下:

- `"react": "^17.0.1"`
- ` "react-dom": "^17.0.1"`
- `"typescript": "^4.0.3"`

## 添加的功能

- [x] scss 支持
- [x] postcss 处理 (rem 处理)
- [x] husky
- [x] lint-staged
- [x] prettier
- [x] editorconfig
- [x] hook 校验

## vscode 相关

- [添加`extensions.json`推荐插件](https://code.visualstudio.com/docs/editor/extension-gallery)

## 封装

- [ ] 常用 scss 封装
  - [x] `normalize`浏览器重置样式
  - [x] `flex` 帮助样式类
  - [x] `ellipsis` 文本截取
  - [x] `clearfix` 清除浮动
  - [x] `hariline` 1px 边框
- [ ] 常用工具类封装

## QA

- [目前版本的 create-react-app 安装 node-sass 最新版本出错](https://exerror.com/error-node-sass-version-5-0-0-is-incompatible-with-4-0-0/)

## TODO

- [x] H5 移动端开发模版
- [ ] PC 开发模版


## 说明
- 为`scss`生成的`*.d.ts`描述文件在`react-app-env.d.ts`中,目前对于引入的`style`文件的提示使用的是[`typescript-plugin-css-modules`](https://github.com/mrmckeb/typescript-plugin-css-modules)插件,目前仅支持`*.module.scss`类文件提示

## 其它
- [`react-app-env.d.ts`](https://github.com/lizhongzhen11/dailyGain/issues/36)
- [使用SASS生成CSS模块的TypeScript定义](https://skovy.dev/generating-typescript-definitions-for-css-modules-using-sass/)
- [Increasing the Value of CSS Modules with Typescript](https://spin.atomicobject.com/2020/06/22/css-module-typescript/)
- [css modules in Typescript](https://codepen.io/codiechanel/post/css-modules-in-typescript)
