<template>
  <transition :name="transition ? 'spt-slide-bottom' : ''">
    <div
      class="spt-keyboard"
      v-show="show"
      :style="style"
      :class="`spt-keyboard-${theme}`"
      @touchStart.stop
      @mousedown.stop
      @animationend="onAnimationEnd"
      @webkitAnimationEnd="onAnimationEnd"
    >
      <div class="spt-keyboard-title" v-if="title || showTitleClose">
        <span v-text="title" />
        <span
          class="spt-keyboard-close"
          v-if="showTitleClose"
          v-text="closeButtonText"
          @click="onBlur"
        />
      </div>
      <div class="spt-keyboard-body">
        <key
          v-for="{ text, type } in keys"
          :key="text"
          :text="text"
          :type="type"
          @press="onPressKey"
        />
      </div>
      <div class="spt-keyboard-sidebar" v-if="theme === 'default'">
        <key :text="'delete'" :type="['delete', 'big']" @press="onPressKey" />
        <key :text="okText" :type="['ok', 'blue', 'big']" @press="onPressKey" />
      </div>
    </div>
  </transition>
</template>

<script>
import Key from './key';

export default {
  name: 'key-board',
  components: {
    Key,
  },
  props: {
    show: Boolean,
    title: String,
    closeButtonText: String,
    okText: {
      type: String,
      default: '确定',
    },
    theme: {
      type: String,
      default: '',
    },
    extraKey: {
      type: String,
      default: '.',
    },
    zIndex: {
      type: Number,
      default: 100,
    },
    transition: {
      type: Boolean,
      default: true,
    },
    showDeleteKey: {
      type: Boolean,
      default: true,
    },
    showTitleClose: {
      type: Boolean,
      default: false,
    },
    hideOnClickOutside: {
      type: Boolean,
      default: true,
    },
  },
  mounted() {
    this.handler(true);
  },
  destroyed() {
    this.handler(false);
  },
  activated() {
    this.handler(true);
  },
  deactivated() {
    this.handler(false);
  },
  computed: {
    keys() {
      const keys = [];
      for (let i = 1; i <= 9; i++) {
        keys.push({ text: i });
      }
      // 根据主题变化
      switch (this.theme) {
        case 'default':
          keys.push(
            { text: this.extraKey, type: ['gray'] },
            { text: 0 },
            { text: 'hide', type: ['gray', 'hide'] },
          );
          break;
        default:
          keys.push({ text: this.extraKey }, { text: 0 }, { text: 'delete', type: ['delete'] });
          break;
      }
      return keys;
    },
    style() {
      return { 'z-index': this.zIndex };
    },
  },
  methods: {
    handler(action) {
      if (action !== this.handlerStatus && this.hideOnClickOutside) {
        // console.log(action, this.hideOnClickOutside);
        this.handlerStatus = action;
        document.body[`${action ? 'add' : 'remove'}EventListener`]('touchstart', this.onBlur);
        document.body[`${action ? 'add' : 'remove'}EventListener`]('mousedown', this.onBlur);
      }
    },
    onAnimationEnd() {
      this.$emit(this.show ? 'show' : 'hide');
    },
    onBlur() {
      this.$emit('blur');
    },
    onPressKey(text) {
      if (text === '') {
        return;
      }
      if (text === 'delete') {
        this.$emit('delete');
      } else if (text === 'hide') {
        this.onBlur();
      } else if (text === this.okText) {
        this.$emit('ok');
      } else {
        this.$emit('input', text);
      }
    },
  },
};
</script>

<style lang="less">
@import './style.less';
</style>
