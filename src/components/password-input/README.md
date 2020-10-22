
#### 组件介绍

> 带网格的输入框组件，可以用于输入密码、支付密码等，可与数字键盘组件配合使用


### 代码演示

#### 基本用法

```
<spt-password-input @change="onChange" />
```

```
export default {
  data() {
    return { showKeyboard: true };
  },
  methods: {
    onChange(val) {
      console.log(val);
    },
  },
};
```

#### 自定义长度

```
<spt-password-input @change="onChange" :maxLength="4" />
```

#### 自带 label

```
<spt-password-input label="密码" @change="onChange" type="field" :maxlength="6" />
```

#### 明文展示

```
<spt-password-input label="密码" @change="onChange" :mask="false" />
```

### API

| 参数          | 说明       | 类型        | 默认值    | 可选值                       |
| ----------- | -------- | --------- | ------ | ------------------------- |
| type        | 输入框方式    | `String`  | `grid` | `grid` `field` `keyboard` |
| maxLength   | 密码最大长度   | `Number`  | `6`    | -                         |
| mask        | 是否明文展示   | `Boolean` | `true` | -                         |
| pattern     | 正则规则     | `RegExp`  | -      | -                         |
| placeholder | 暗提示      | `String`  | `暗提示`  | -                         |
| border      | 是否显示内外边框 | `Boolean` | `true` | -                         |
| -           | -        | -         | -      | -                         |

### Events

| 事件名    | 参数      | 说明      | 备注   |
| ------ | ------- | ------- | ---- |
| change | `value` | 内容变化时触发 | -    |
| -      | -       | -       | -    |



