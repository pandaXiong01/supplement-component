<template>
  <div
    :class="[
      `spt-divider`,
      slotdefault && `spt-divider-content-${postion}`,
      hairline && 'spt-divider-hairline',
      dashed && 'spt-divider-dashed',
    ]"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: 'spt-divider',
  props: {
    hairline: {
      type: Boolean,
      default: true,
    },
    dashed: {
      type: Boolean,
      default: false,
    },
    postion: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    slotdefault() {
      return this.$slots.default;
    },
  },
};
</script>
<style lang="less">
@import './style.less';
</style>
