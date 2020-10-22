<template>
  <div class="spt-password-input">
    <div class="spt-password-input__grid" v-clickoutside="onBlur" v-if="type === 'keyboard'"></div>
    <div class="spt-password-input__grid" v-clickoutside="onBlur" v-if="type === 'grid'">
      <ul
        class="spt-password-input__security"
        :class="{ 'spt-password-input-cursor': isFocus }"
        :style="{ border: border ? '' : 'none' }"
      >
        <li
          v-for="(item, index) in maxlength"
          :key="index"
          :style="{ border: border ? '' : 'none' }"
        >
          <i
            v-if="mask"
            class="spt-password-input__dot"
            :style="{ visibility: index < passVal.length ? 'inherit' : 'hidden' }"
          ></i>
          <span v-else class="spt-password-inpur__mask" v-html="passVal[index]"></span>
          <div class="spt-password-input__cursor" v-show="index === passVal.length && isFocus"></div>
        </li>
      </ul>
      <input
        class="spt-password-input__val"
        type="text"
        @click="onFocus"
        @keyup="keyUp"
        v-model="passVal"
        :maxlength="maxlength"
      />
    </div>
  </div>
</template>

<script>

const clickoutside = {
  // 初始化指令
  bind(el, binding) {
    function documentHandler(e) {
      // 这里判断点击的元素是否是本身，是本身，则返回
      if (el.contains(e.target)) {
        return false;
      }
      // 判断指令中是否绑定了函数
      if (binding.expression) {
        // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
        binding.value(e);
      }
      return true;
    }
    // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
    // eslint-disable-next-line
    el.__vueClickOutside__ = documentHandler;
    document.addEventListener('click', documentHandler);
  },
  unbind(el) {
    // 解除事件监听
    // eslint-disable-next-line
    document.removeEventListener('click', el.__vueClickOutside__);
    // eslint-disable-next-line
    delete el.__vueClickOutside__;
  },
};
export default {
  name: 'spt-password-input',
  directives: { clickoutside },
  props: {
    maxlength: {
      type: Number,
      default: 6,
    },
    pattern: {
      type: RegExp,
      default() {
        return /[^\d|chun]/g;
      },
    },
    placeholder: {
      type: String,
      default: '暗提示',
    },
    type: {
      type: String,
      default: 'grid',
    },
    mask: {
      type: Boolean,
      default: false,
    },
    border: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      passVal: '',
      mode: 'password',
      currentValue: '',
      isFocus: false,
    };
  },
  watch: {
    passVal(newValue) {
      this.$emit('change', newValue || '');
    },
    currentValue(newValue) {
      this.$emit('change', newValue || '');
    },
  },
  methods: {
    keyUp(e) {
      this.passVal = e.target.value.replace(this.pattern, '');
    },
    onFocus() {
      setTimeout(() => {
        this.isFocus = true;
      });
    },
    onBlur() {
      setTimeout(() => {
        this.isFocus = false;
      });
    },
  },
};
</script>

<style lang="less">
@import './style.less';
</style>
