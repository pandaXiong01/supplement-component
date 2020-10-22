<template>
  <i
    v-text="text"
    @touchstart.stop.prevent="onFocus"
    @touchmove="onBlur"
    @touchend="onBlur"
    @touchcancel="onBlur"
    @mousedown.stop.prevent="onFocus"
    @mousemove="onBlur"
    @mouseup="onBlur"
    class="spt-key spt-hairline"
    :class="className"
  />
</template>

<script>
export default {
   name: 'spt-key',
  props: {
    text: [String, Number],
    type: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: false,
    };
  },
  computed: {
    className() {
      const types = this.type.slice(0);
      if (this.active) {
        types.push('active');
      }
      return types.map((type) => `spt-key-${type}`);
    },
  },
  methods: {
    onFocus() {
      this.active = true;
      this.$emit('press', this.text);
    },
    onBlur() {
      this.active = false;
    },
  },
};
</script>
