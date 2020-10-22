
## Fetch 数据请求

> Fetch 是一个支持下拉刷新及滚动加载的组件。因为这两个操作最终目的都是为了做数据请求，所以取名“Fetch”。


#### 注意事项

Fetch 的高度属性被设置为`height: 100%`，也就是说其高度由父元素决定，Fetch 自身不会撑起高度。使用 Fetch 时，需要用户为 Fetch 的父元素设置一个高度（通常是屏幕高度）。

### Props

| 参数                 | 说明                  | 类型        | 默认值       |
| ------------------ | ------------------- | --------- | --------- |
| disableRefresh     | 禁用下拉刷新              | `Boolean` | `false`   |
| disableScroll      | 禁用滚动加载              | `Boolean` | `false`   |
| stopPropagation    | 是否阻止滚动事件冒泡。用于防止嵌套问题 | `Boolean` | `true`    |
| refreshLoadingText | 下拉刷新正在加载时的提示        | `String`  | `''`      |
| scrollLoadingText  | 滚动加载正在加载时的提示        | `String`  | `'正在加载'`  |
| triggerText        | 触发下拉刷新时的提示          | `String`  | `'松开加载'`  |
| pullingText        | 下拉时的提示              | `String`  | `'下拉刷新'`  |
| allLoadedText      | 数据完全加载完毕的提示         | `String`  | `'没有更多了'` |

### Events

| 事件    | 说明                | 参数                  |
| ----- | ----------------- | ------------------- |
| fetch | 触发下拉刷新或滚动加载时的回调函数 | `fn(resolve, type)` |

> 根据`type`（`'PULL_REFRESH'`|`'SCROLL'`）获取此次触发回调的事件类型。当数据请求完成候，需要调用`resolve()`通知组件。对于滚动加载事件，当数据全部加载后调用`resolve(true)`的时候记得传入`true`。

