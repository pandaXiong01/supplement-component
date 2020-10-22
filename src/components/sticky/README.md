## Sticky 粘性布局

### 使用指南

#### 组件介绍

> Sticky 组件与 CSS 中`position: sticky`属性实现的效果一致，当组件在屏幕范围内时，会按照正常的布局排列，当组件滚出屏幕范围时，始终会固定在屏幕顶部。

### 代码演示

#### 基础用法

```
<spt-sticky>
  <div>吸顶标题</div>
</spt-sticky>
```

#### 距离顶部

通过 `offset-top` 属性可以设置组件在吸顶时与顶部的距离

```
<spt-sticky :offset-top="60">
  <div style="margin-left:120px;">内容2</div>
</spt-sticky>
```

#### 指定容器

html

```
<div ref="container" class="demobox">
  <spt-sticky :container="container" :offset-top="50" class="box">
    <spt-button type="primary" size="small" style="margin-left:210px;">我是按钮</spt-button>
  </spt-sticky>
</div>
```

js

```
data() {
    return {
        container: null,
    };
},
mounted() {
  this.container = this.$refs.container;
}
```

### API

| 参数         | 说明              | 类型         | 默认值  | 可选值  |
| ---------- | --------------- | ---------- | ---- | ---- |
| offset-top | 吸顶时与顶部的距离，单位 px | `Number`   | `0`  | -    |
| z-index    | 吸顶时的 z-index    | `Number`   | `99` | -    |
| container  | 容器对应的 HTML 节点   | `HTMLNode` | -    | -    |
| -          | -               | -          | -    | -    |

### Events

| 参数     | 说明    | 回调参数                                 | 备注   |
| ------ | ----- | ------------------------------------ | ---- |
| scroll | 滚动时触发 | { scrollTop: 距离顶部位置, isFixed: 是否吸顶 } | -    |
| -      | -     | -                                    | -    |


