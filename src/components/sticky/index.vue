<template>
  <div :style="boxStyle">
    <div :class="['spt-sticky', fixed && 'spt-sticky-fixed']" :style="style">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { isDef } from '../../utils';
import { getScrollTop, getElementTop, getScrollEventTarget } from '../../utils/scroll';

export default {
  name: 'spt-sticky',
  props: {
    zIndex: Number,
    container: null,
    offsetTop: {
      type: Number,
      default: 0,
    },
  },

  data() {
    return {
      fixed: false,
      height: 0,
      transform: 0,
      scroller: undefined,
    };
  },

  mounted() {
    this.scroller = getScrollEventTarget(this.$el);
    this.handler(true);
    this.$nextTick(this.onScroll);
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
    boxStyle() {
      const { fixed } = this;
      const style = {
        height: fixed ? `${this.height}px` : null,
      };
      return style;
    },
    style() {
      if (!this.fixed) {
        return;
      }
      const style = {};
      if (isDef(this.zIndex)) {
        style.zIndex = this.zIndex;
      }
      if (this.offsetTop && this.fixed) {
        style.top = `${this.offsetTop}px`;
      }
      if (this.transform) {
        style.transform = `translate3d(0, ${this.transform}px, 0)`;
      }
      // eslint-disable-next-line
      return style;
    },
  },
  methods: {
    handler(bind) {
      if (this.binded !== bind) {
        this.binded = bind;
        if (bind) {
          this.scroller.addEventListener('scroll', this.onScroll);
        } else {
          this.scroller.removeEventListener('scroll', this.onScroll);
        }
      }
    },
    onScroll() {
      this.height = this.$el.offsetHeight;
      const { container, offsetTop } = this;
      console.log(this.$el);
      const scrollTop = getScrollTop(this.$el);
      const topToPageTop = getElementTop(this.$el);
      console.log('scrollTop',scrollTop);
      console.log('offsetTop', offsetTop);
      console.log('topToPageTop', topToPageTop);
      const emitScrollEvent = () => {
        this.$emit('scroll', {
          scrollTop,
          isFixed: this.fixed,
        });
      };

      // The sticky component should be kept inside the container element
      if (container) {
        const bottomToPageTop = topToPageTop + container.offsetHeight;

        if (scrollTop + offsetTop + this.height > bottomToPageTop) {
          const distanceToBottom = this.height + scrollTop - bottomToPageTop;

          if (distanceToBottom < this.height) {
            this.fixed = true;
            this.transform = -(distanceToBottom + offsetTop);
          } else {
            this.fixed = false;
          }

          emitScrollEvent();
          return;
        }
      }
      
      if (scrollTop + offsetTop > topToPageTop) {
        this.fixed = true;
        this.transform = 0;
      } else {
        this.fixed = false;
      }

      emitScrollEvent();
    },
  },
};
</script>
<style lang="less">
@import './style.less';
</style>
