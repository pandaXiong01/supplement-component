
<template>
  <div :class="`spt-loading spt-loading-${type}`">
    <span :class="`spt-loading-inner--${type} spt-loading-inner`" :style="style">
      <i v-for="(item, index) in type === 'spinner' ? 12 : 0" :key="index" />
      <svg v-if="type === 'circular'" class="spt-loading-icon-circular" viewBox="25 25 50 50">
        <circle cx="50" cy="50" r="20" fill="none" />
      </svg>
    </span>
  </div>
</template>

<script>

export default {
  name: 'spt-loading',
  props: {
    size: String,
    type: {
      type: String,
      default: 'circular',
    },
    color: {
      type: String,
      default: '#c9c9c9',
    },
  },
  computed: {
    style() {
      return {
        color: this.color === 'black' ? '#c9c9c9' : this.color,
        width: this.size,
        height: this.size,
      };
    },
  },
};
</script>
<style lang="less">
@import './style.less';
</style>
