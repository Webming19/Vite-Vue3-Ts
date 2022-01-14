# 基于Vite搭建的Vue 3项目，支持Typescript

这个模板应该可以帮助你开始在 Vite 中使用 Vue 3 和 Typescript 进行开发。
该模板使用 Vue 3 `<script setup>` 语法糖，查看 [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) 了解更多的。

## 1.默认描述

### 推荐的 IDE 设置

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

### 类型支持 TS 中的 `.vue` 导入

由于 TypeScript 无法处理 .vue 导入的类型信息，
默认情况下，它们被填充为通用的 Vue 组件类型。

在大多数情况下，如果您并不真正关心模板之外组件的props类型。 
然而，如果希望在 `.vue` 导入中获得实际的 props 类型，
（例如，使用手动 `h(...)` 调用时获取 props 验证），
可以通过从 VSCode 命令面板运行 `Volar: Switch TS Plugin on/off` 来启用 Volar 的 `.vue` 类型支持插件。

## 2.常用插件

2.1 [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components/ )
：组件的按需自动导入。

+ vite.config.ts 中的配置插件

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({ /* options */ }),
  ],
})
```


2.2 [vite-plugin-svg-icons](https://github.com/vbenjs/vite-plugin-svg-icons/blob/HEAD/README.zh_CN.md )
：用于生成 svg 雪碧图。

+ 配置：

2.2.1 vite.config.ts
```ts
import viteSvgIcons from 'vite-plugin-svg-icons';
import path from 'path';

export default () => {
  return {
    plugins: [
      viteSvgIcons({
        // 指定需要缓存的图标文件夹
        iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
        // 指定symbolId格式
        symbolId: 'icon-[dir]-[name]',
      }),
    ],
  };
};
```
2.2.2 在 src/main.ts 内引入注册脚本
```ts
import 'virtual:svg-icons-register';
```

2.3 [vite-plugin-compression](https://github.com/vbenjs/vite-plugin-compression/blob/HEAD/README.zh_CN.md )
：使用 gzip 或者 brotli 来压缩资源。
+ vite.config.ts 中的配置插件
```ts
import viteCompression from 'vite-plugin-compression';

export default () => {
  return {
    plugins: [viteCompression()],
  };
};
```

##3.使用 Typescript
Vite 天然支持引入`.ts`文件。
```json
{
  "compilerOptions": {
    "types": ["vite/client"],
    "baseUrl": "src",
    "paths": {
      "@/*": ["./*"]
    }
  },
  "exclude": ["node_modules"]
}
```

##4.配置环境变量
vite 提供了两种模式：具有开发服务器的开发模式（development）和生产模式（production）。
本架构基于公司现有应用，创建了四个生产环境和、、一个测试环境、一个本地环境

####1）以默认`.env`文件为例

地图服务暂时仅使用 **电子地图** 和 **卫星地图**

```dotenv
# 默认运行的名称
VITE_APP_RUNTIME_ENV=default
# 默认服务器地址
VITE_APP_REQUEST_URL=172.16.1.150:9000
# 默认地图服务器地址
VITE_APP_MAP_URL=10.10.7.200:9000
# 默认电子地图ID
VITE_APP_MAP_STREET_ID=0v8b4qex
# 默认卫星地图ID
VITE_APP_MAP_SATELLITE_ID=18bsypjc
```
####2）package命令：
``` bash
# 安装依赖
yarn
pnpm i

# 启动本地服务
yarn serve

# 修复代码
yarn lint

## 打包方式
yarn build

# 测试服务器打包
yarn build:test

# 感知网(东西区)服务器打包
yarn build:perceive-east
yarn build:perceive-west

# 公安网(东西区)服务器打包
yarn build:police-east
yarn build:police-west
```

##5.按需自动引入组件

[unplugin-vue-components](https://github.com/antfu/unplugin-vue-components/ )
是一款非常强大的插件，
核心功能就是帮助你自动按需引入组件，Tree-shakable，只注册你使用的组件。
这里说一下两个核心使用方式和配置方式。

>此插件不仅支持 vue3，同时也支持 vue2，并且支持 Vite、Webpack、Vue CLI、Rollup

###5.1安装与配置
安装：
```
npm i unplugin-vue-components -D
```

配置：
```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'

export default defineConfig({
  plugins: [
    Components({ /* options */ }),
  ],
})
```
这里的 options 可以配置一些选项，后面提到的组件库注册会使用到

###5.2 改变全局组件注册方式

我们通常将全局的组件封装在 @/src/components 中，然后通过 app.component() 注册全局组件。
使用此插件后，无需手写注册，直接在模板中使用组件即可：

引入官方的示例：
```vue
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
```
自动编译为：
```vue
<template>
  <div>
    <HelloWorld msg="Hello Vue 3.0 + Vite" />
  </div>
</template>

<script>
import HelloWorld from './src/components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
```

###5.3自动引入组件库

在使用组件库时，常规组件我们也会注册到全局；
如果使用局部注册（手动按需引入）由于页面中会使用到多个组件，会非常麻烦，故使用该插件自动引入；
该项目使用element-plus组件库。

```ts
// vite.config.js
import ViteComponents, {
  ElementPlusResolver,
} from 'unplugin-vue-components/resolvers'

// your plugin installation
export default defineConfig({
  plugins: [
    // 自动引入组件
    Components({
      resolvers: [
        ElementPlusResolver(),
      ],
    }),
  ]
})
```
配置完成后，即可在组件中直接使用element-plus组件，无需引入



##6.样式

项目建议使用通用样式，可以创建 src/styles 目录存放

推荐分类：

```dotenv
styles
  ├── elem # 组件库样式覆盖，命名自取，以 elem 为例
  ├── color.scss # 颜色
  ├── index.scss # 入口
  ├── global.scss # 公共类
  ├── transition.scss # 动画相关
  └── variable.scss # 变量
```


###6.1 预设基础样式

`normalize.css`是一个基础的样式库，它可以重置 css 样式，使各浏览器效果保持一致。


###6.2 CSS 预处理器
虽然 vite 原生支持 less/sass/scss/stylus，但是你必须手动安装他们的预处理器依赖;

本项目使用**scss**：`npm install -D scss`


###6.3 开启 scoped
没有加 scoped 属性，会编译成全局样式，造成全局污染。
```vue
<style scoped></style>
```

###6.4 深度选择器
如果你希望 scoped 样式中的一个选择器能够穿透时，请使用`::v-deep`。（禁止使用`/deep/`）



##7.布局

页面整体布局是一个产品最外层的框架结构，往往会包含导航、页脚、侧边栏等。在页面之中，也有很多区块的布局结构。

在真实项目中，页面布局通常统领整个应用的界面，有非常重要的作用，所以单独拆分出来也是非常有必要的。

在脚手架中，所有的通用布局组件都应该放在 src/layouts 中，这种封装比较简单。

###7.1 常规的布局
BasicLayout
基础页面布局，应包含顶部、底部两栏

BlankLayout
空白的布局。


###7.2 特殊的布局

UserLayout
将用户登录注册等页面抽离出来。



##8.























##n.xxx

src文件内容
```tree
├─src
  ├─components
  │  └─svg
  ├─router
  ├─store
  ├─styles
  ├─utils
  └─views
```


