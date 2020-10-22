<template>
  <div
    v-clickoutside:touchstart="swipeMove"
    class="swipe-cell"
    @click="onClick('cell')"
    @touchstart="startDrag"
    @touchmove="onDrag"
    @touchend="endDrag"
    @touchcancel="endDrag"
  >
    <div class="swipe-cell_wrapper" :style="wrapperStyle" @transitionend="swipe = false">
      <div class="swipe-cell_left" v-if="leftWidth" @click="onClick('left')">
        <slot name="left"></slot>
      </div>
      <slot></slot>
      <div class="swipe-cell_right" v-if="rightWidth" @click="onClick('left')">
        <slot name="right-btn"></slot>
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from '../../utils/clickoutside';

export default {
  name: 'spt-swipe-cell',
  props: {
    onClose: Function,
    leftWidth: {
      type: Number,
      default: 0,
    },
    rightWidth: {
      type: Number,
      default: 0,
    },
    disabled: Boolean,
  },
  directives: {
    Clickoutside,
  },
  data() {
    return {
      offset: 0,
      dragging: false,
      THRESHOLD: 0.5,
    };
  },
  computed: {
    wrapperStyle() {
      return {
        transform: `translate3d(${this.offset}px, 0, 0)`,
        transitionDuration: this.dragging ? '0s' : '.6s',
      };
    },
    computedLeftWidth() {
      return this.leftWidth;
    },
    computedRightWidth() {
      return this.rightWidth;
    },
  },
  methods: {
    startDrag(event) {
      if (this.disabled) {
        return;
      }
      this.dragging = true;
      this.startOffset = this.offset;
      this.touchStart(event);
    },
    touchStart(event) {
      this.resetTouchStatus();
      if (this.disabled) {
        return;
      }
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },
    resetTouchStatus() {
      this.direction = '';
      this.deltaX = 0;
      this.deltaY = 0;
      this.offsetX = 0;
      this.offsetY = 0;
    },
    onDrag(event) {
      if (this.disabled) {
        return;
      }
      this.touchMove(event);
      if (this.direction === 'horizontal') {
        const shouldPrevent = !this.opened;
        if (shouldPrevent) {
          event.preventDefault();
        }
        this.swipeMove(this.deltaX + this.startOffset);
      }
    },
    touchMove(event) {
      const touch = event.touches[0];
      this.deltaX = touch.clientX - this.startX;
      this.deltaY = touch.clientY - this.startY;
      this.offsetX = Math.abs(this.deltaX);
      this.offsetY = Math.abs(this.deltaY);
      this.direction = this.direction || this.getDirection(this.offsetX, this.offsetY);
    },
    getDirection(x, y) {
      if (x > y && x > 10) {
        return 'horizontal';
      }
      if (y > x && y > 10) {
        return 'vertical';
      }
      return '';
    },
    endDrag() {
      if (this.disabled) {
        return;
      }
      this.dragging = false;
      if (this.swiping) {
        this.swipeLeaveTransition(this.offset > 0 ? 'left' : 'right');
      }
    },
    open(position) {
      const offset = position === 'left' ? this.computedLeftWidth : -this.computedRightWidth;
      this.swipeMove(offset);
      this.resetSwipeStatus();
    },
    resetSwipeStatus() {
      this.swiping = false; // 是否正在拖动
      this.opened = true; // 记录是否滑动左右
    },
    close() {
      this.offset = 0;
    },
    swipeMove(offset = 0) {
      this.offset = Math.min(Math.max(offset, -this.computedRightWidth), this.computedLeftWidth);
      if (this.offset) {
        this.swiping = true;
      } else {
        this.opened = false;
      }
    },
    swipeLeaveTransition(direction) {
      const { offset, computedLeftWidth, computedRightWidth, THRESHOLD } = this;
      const threshold = this.opened ? 1 - THRESHOLD : THRESHOLD;
      if (
        direction === 'right' &&
        -offset > computedRightWidth * threshold &&
        computedRightWidth > 0
      ) {
        this.open('right');
      } else if (
        direction === 'left' &&
        offset > computedLeftWidth * threshold &&
        computedLeftWidth > 0
      ) {
        this.open('left');
      } else {
        this.swipeMove(0);
      }
    },
    onClick(position = 'outside') {
      if (!this.offset) {
        return;
      }
      if (this.onClose) {
        this.onClose(position);
      } else {
        this.swipeMove(0);
      }
    },
  },
};
</script>
<style lang="less">
@import './style.less';
</style>
