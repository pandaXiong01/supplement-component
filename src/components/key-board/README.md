## KeyBoard

### 使用指南

#### 组件介绍

> 数字键盘组件


### 代码演示

#### 默认数字键盘

```
<spt-key-board :show="visible" @blur="hideKeyBoard" @input="onInput"></spt-key-board>
```

#### 带标题数字键盘

```
<spt-key-board
  :show="visible"
  @blur="hideKeyBoard"
  @input="onInput"
  :title="'标题'"
  show-title-close
  :close-button-text="'确定'"
></spt-key-board>
```

#### 主题 default 数字键盘

```
<spt-key-board
  :show="visible"
  @blur="hideKeyBoard"
  @input="onInput"
  :title="'标题'"
  theme="default"
  show-title-close
  :close-button-text="'确定'"
></spt-key-board>
```

### API

| 参数                    | 说明              | 类型        | 默认值     | 可选值            |
| --------------------- | --------------- | --------- | ------- | -------------- |
| show                  | 是否显示            | `Boolean` | `false` | `false`/`true` |
| title                 | 键盘标题            | `String`  | -       | -              |
| close-button-text     | 确认/关闭按钮文案,没有不显示 | `String`  | -       | -              |
| show-title-close      | 是否显示确认/关闭按钮     | `Boolean` | -       | -              |
| okText                | 确认按钮文字          | `String`  | `false` | -              |
| extra-key             | 额外按键内容          | `String`  | `.`     | -              |
| theme                 | 主题              | `String`  | -       | `default`      |
| z-index               | 键盘的 `z-index` 值 | `Number`  | `100`   | -              |
| transition            | 是否有过场动画         | `Boolean` | `true`  | `false`/`true` |
| hide-on-click-outside | 点击外部时是否收起键盘     | `Boolean` | `true`  | `false`/`true` |

### Events

| 事件名    | 参数   | 说明         | 备注   |
| ------ | ---- | ---------- | ---- |
| input  | val  | 点击按键时触发    | -    |
| delete |      | 点击删除时触发    | -    |
| blur   |      | 点击非键盘区域时触发 | -    |
| show   |      | 键盘显示时触发    | -    |
| hide   |      | 键盘隐藏时触发    | -    |
| ok     |      | 点击确认按钮时触发  | -    |






