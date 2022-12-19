## react app

### 一个做好了各种前置设置的现代化的 react app
- pnpm
- eslint
- prettier
- tailwindcss
- typescript
- vite

### 文件夹结构说明

#### assets
- 全局资源文件
    - 图片
    - 样式
    - 字体
    - 其他非代码的文件
- 注意一定要是**全局**的, 如果是某个 feature 独有的资源, 放在该 feature 自有的 assets 文件夹中

#### components
- 全局无状态组件, 例如:
- ui 类组件
  - button
  - modal
  - card
- form 类组件
  - input
  - checkbox
  - date picker
- 这些基础组件会被其他 feature 组件或 page 组件引用

#### context
- 全局 context, 例如
  - 用户登录信息
  - 应用主题色

#### data
- 类似 assets 文件夹, 用来存放数据, 例如:
  - 各种 JSON 文件
  - 应用主题数据
  - 全局常量/环境变量/配置数据

#### features
- 应用的功能模块 (与页面布局无关)
- 每个功能模块有单独的文件夹, 它的文件夹里是一个 mini 的项目结构, 例如:
- 一个 todo 模块, 它里面可能有自己的 assets, components, context, hooks...等所有 src 下面的文件夹 (除了 features 文件夹本身)
- 每个功能模块必须有一个唯一的出口 index.tsx, 仅暴露必要的 public api

#### hooks
- 全局自定义 hook, 跟具体功能模块无关, 例如:
  - useFetch
  - useLocalStorage

#### layouts
- 全局布局组件, 例如:
  - sidebar
  - navbar
  - container
  - footer
- 如果应用包含的布局组件较少, 可以将它们直接放在 components 文件夹中, 从而 layouts 文件夹可留空

#### lib
- 全局第三方库的封装实现
- 例如我们要用到 axios, 但是不直接在需要用到它的地方直接引入 axios
- 而是我们自己在唯一的一个地方, 将 axios 包一层, 实现所谓的 Facade Pattern
- 这样做的好处是: 我们后续可以方便的更换和升级第三方库, 或者定制我们自己的实现

#### pages
- 整个应用的页面, 有几个页面就创建几个页面组件 (不需要文件夹嵌套)
- 页面组件里没有复杂逻辑, 只是引入 feature 中的组件和全局组件来拼凑出自己的页面结构

#### services
- 全局外部 api 的交互代码
- 一般就是应用的后端接口, 或者第三方提供的接口, 比如 google analytics

#### utils
- 全局工具函数, 注意必须是纯函数

### 注意, 每个文件夹都可以有一个 __tests__ 的文件夹来存放测试代码, __tests__ 文件夹的存放位置的原则是: 尽量离它要测试的代码近一些
