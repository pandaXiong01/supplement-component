## SwipeCell 滑动单元格

#### 组件介绍

> SwipeCell 滑动单元格

### 代码演示

#### 基础用法

```
<spt-swipe-cell :right-width="60" :left-width="60">
  <div slot="left-btn">
    <spt-button class="middle middle-left" type="primary">选择</spt-button>
  </div>
  <spt-cell title="单元格一" desc="描述文字" icon="point" imgSize="large">
    <div slot="right">
      <span>右侧内容1</span>
    </div>
  </spt-cell>
  <div slot="right-btn">
    <spt-button class="middle" type="danger">删除</spt-button>
  </div>
</spt-swipe-cell>
```

#### 多个操作

```
<spt-swipe-cell :right-width="120" :left-width="120">
  <div slot="left-btn">
    <spt-button class="middle middle-left" plain>选择</spt-button>
    <spt-button class="middle middle-left" type="primary">选择1</spt-button>
  </div>
  <spt-cell title="单元格二" desc="描述文字" icon="point" imgSize="large">
    <div slot="right">
      <span>右侧内容2</span>
    </div>
  </spt-cell>
  <div slot="right-btn">
    <spt-button class="middle" type="danger">删除</spt-button>
    <spt-button class="middle" type="primary">选中</spt-button>
  </div>
</spt-swipe-cell>
```

#### 异步操作

```
<spt-swipe-cell :right-width="60" :on-close="onClose">
  <spt-cell title="单元格三" desc="描述文字" icon="point" imgSize="large">
    <div slot="right">
      <span>右侧内容3</span>
    </div>
  </spt-cell>
  <div slot="right-btn">
    <spt-button class="middle middle-right" type="danger">删除</spt-button>
  </div>
</spt-swipe-cell>
```

#### 禁止滑动

```
<spt-swipe-cell :disabled="true">
  <spt-cell title="单元格四" icon="point" imgSize="large">
    <div slot="right">
      <span>右侧内容4</span>
    </div>
  </spt-cell>
  <div slot="right-btn">
    <spt-button class="middle middle-right" type="danger">删除</spt-button>
  </div>
</spt-swipe-cell>
```

### API

| 参数          | 说明         | 类型         | 默认值  |
| ----------- | ---------- | ---------- | ---- |
| left-width  | 指定左侧滑动区域宽度 | `Number`   | -    |
| right-width | 指定右侧滑动区域宽度 | `Number`   | -    |
| disabled    | 是否禁用滑动     | `Boolean`  | -    |
| on-close    | 关闭时的回调函数   | `Function` | -    |

### Slots

| Slot 名    | 说明   | 备注   |
| --------- | ---- | ---- |
| left-btn  | 左侧插槽 | -    |
| right-btn | 右侧插槽 | -    |
| -         | -    | -    |





