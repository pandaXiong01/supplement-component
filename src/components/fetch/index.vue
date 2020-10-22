<template>
  <div class="spt-fetch-container">
    <div ref="wrapEl" @scroll="handleScroll" class="spt-fetch-container-inner">
      <!-- 下拉加载 -->
      <div
        :class="['spt-fetch-tip-area', 'spt-fetch__top', needAnimation && 'spt-fetch__animation']"
        :style="{ transform: `translate3d(0,${distance}px,0)` }"
      >
        <div class="spt-fetch-loading-wrap" v-if="pullRefreshStatus === 'FETCHING'">
          <spt-loading :size="refreshLoadingText ? '16px' : '26px'" />
          {{ refreshLoadingText }}
        </div>
        <template v-else-if="pullRefreshStatus === 'IS_MAX'">{{ triggerText }}</template>
        <template v-else>{{ pullingText }}</template>
      </div>
      <!-- 内容 -->
      <div
        :class="['spt-fetch-track', needAnimation && 'spt-fetch__animation']"
        :style="{ transform: `translate3d(0,${distance}px,0)` }"
      >
        <slot />
        <!-- 滚动加载提示 -->
        <div class="spt-fetch-tip-area spt-fetch__bottom" v-if="scrollFetchStatus !== 'DONE'">
          <div class="spt-fetch-loading-wrap" v-if="scrollFetchStatus === 'FETCHING'">
            <spt-loading :size="scrollLoadingText ? '16px' : '26px'" />
            {{ scrollLoadingText }}
          </div>
          <template v-else-if="scrollFetchStatus === 'ALL_LOADED'">{{ allLoadedText }}</template>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import createSlide from '../../utils/slide';
import Loading from '../loading';

const REFRESH_TRIGGER_DIST = 45; // 下拉加载触发距离
// const duration = 300;
const SCROLL_TRIGGER_DIST = 45; // 滚动加载 距离底部  触发距离
/* 手指触摸的状态 */
const START = 'START';
const MOVING = 'MOVING';
/* 触发类型  !!!!!不可改动!!!!! */
const IS_SCROLL = 'SCROLL'; // 滚动加载
const IS_REFRESH = 'PULL_REFRESH'; // 下拉加载
/* 下拉状态显示 */
const PULLING = 'PULLING'; // 正在下拉
const IS_MAX = 'IS_MAX'; // 已到达最小触发点
/* 上滑无限加载 */
const ALL_LOADED = 'ALL_LOADED';
/* 通用状态 */
const FETCHING = 'FETCHING'; // 正在请求
const DONE = 'DONE'; // 完成

export default {
  name: 'spt-fetch',
  components: {
    'spt-loading': Loading,
  },
  props: {
    disableRefresh: {
      type: Boolean,
      default: false,
    },
    disableScroll: {
      type: Boolean,
      default: false,
    },
    stopPropagation: {
      type: Boolean,
      default: true,
    },
    refreshLoadingText: {
      type: String,
      default: '',
    },
    scrollLoadingText: {
      type: String,
      default: '正在加载',
    },
    // 触发文本
    triggerText: {
      type: String,
      default: '松开加载',
    },
    pullingText: {
      type: String,
      default: '下拉刷新',
    },
    allLoadedText: {
      type: String,
      default: '没有更多了',
    },
  },
  data() {
    return {
      distance: 0, // track 元素滑动距离
      needAnimation: false, // track 元素滑动是否需要动画效果
      pullRefreshStatus: DONE, // 下拉加载 的 状态
      scrollFetchStatus: DONE, // 滚动加载 的 状态
    };
  },
  created() {
    this.touchStatus = DONE; // 手指触摸状态
    this.fetchState = null; // 加载状态 ?  下拉刷新 | 无限滚动
    this.isStateFrozen = false;
  },
  mounted() {
    if (!this.disableRefresh) {
      this.attachEvent();
    }
  },
  beforeDestroy() {
    if (this.detachEvent) {
      this.detachEvent();
    }
  },
  methods: {
    attachEvent() {
      if (this.detachEvent) {
        this.detachEvent();
      }
      this.detachEvent = createSlide({
        el: this.$refs.wrapEl,
        onStart: this.handleStart.bind(this),
        onMove: this.handleMove.bind(this),
        onEnd: this.handleEnd.bind(this),
        axis: 'Y',
      });
    },

    /**
     * 供外部调用
     */
    reset() {
      this.clearState();
      this.scrollToTop();
    },
    clearState(hasAllLoaded = false) {
      // TODO: 当下拉刷新加载完成后重置状态时，这个状态设置为true
      // TODO: 禁止任何操作，但是不禁止好像也没啥影响
      this.isStateFrozen = false;
      this.touchStatus = DONE; // 手指触摸状态

      this.distance = 0;
      this.isFetching = false;
      this.needAnimation = true;
      this.pullRefreshStatus = DONE;

      this.scrollFetchStatus = hasAllLoaded && this.fetchState === IS_SCROLL ? ALL_LOADED : DONE;

      this.fetchState = null; // 加载状态 ?  下拉刷新 | 无限滚动
    },
    scrollToTop() {
      // 重置时， 底部提示消失， 会触发 wrapEl 的滚动事件
      // 引发多余的请求
      this.$refs.wrapEl.scrollTop = 0;
    },
    allLoaded() {
      this.scrollFetchStatus = ALL_LOADED;
    },
    /**
     * 下拉加载, touchstart事件处理
     */
    handleStart() {
      // 如果此时加载完成, 元素正在归位, 禁止滑动
      if (this.disableRefresh || this.isStateFrozen) {
        return;
      }
      this.touchStatus = this.$refs.wrapEl.scrollTop === 0 ? START : DONE;
    },

    /**
     * 下拉加载, touchmove事件处理
     */
    handleMove({ touches }, e) {
      const touch = touches[0];
      if (touch.axis === 'X') {
        return;
      }
      // 1. 只有在最顶部时,才允许
      if ((this.touchStatus !== START && this.touchStatus !== MOVING) || this.isStateFrozen) {
        return;
      }
      // 2. 如果在最顶部, 但是 不是往下拉, 流程无效
      if (this.touchStatus === START && touch.direction < 0) {
        this.touchStatus = DONE;
        return;
      }
      this.touchStatus = MOVING;
      // 4. 阻止默认事件，在ios上整个网页会被拉下来
      e.preventDefault();

      const isFetching = this.pullRefreshStatus === FETCHING;

      // 5. 设置下拉 距离

      // 距离越大，粘滞感越强
      let diff = (touch.direction * touch.diffY < 0 ? 0 : touch.diffY) / 4;
      if (isFetching) {
        diff += REFRESH_TRIGGER_DIST;
      }

      this.distance = diff;
      this.needAnimation = false;
      this.pullRefreshStatus = isFetching
        ? FETCHING
        : diff < REFRESH_TRIGGER_DIST
        ? PULLING
        : IS_MAX;
    },

    /**
     * 下拉加载, touchend事件处理
     */
    handleEnd() {
      if (this.touchStatus !== MOVING || this.isStateFrozen) {
        return;
      }
      this.touchStatus = DONE;

      const step = this.pullRefreshStatus;
      const isMax = step === IS_MAX;
      const isFetching = step === FETCHING;

      this.distance = isMax || isFetching ? REFRESH_TRIGGER_DIST : 0;
      this.pullRefreshStatus = isMax || isFetching ? FETCHING : DONE;
      this.needAnimation = true;

      // 当拉到最大位置, 且此时没有在请求数据时才执行
      if (!isMax) {
        return;
      }

      this.fetch(IS_REFRESH);
    },

    /**
     * 滚动加载, 监听滚动
     */
    handleScroll(e) {
      // 防止嵌套Fetch 问题
      if (this.stopPropagation) {
        e.stopPropagation();
      }

      const el = e.target;
      const { scrollTop } = el;

      if (scrollTop <= 0) {
        return;
      }

      // 被父组件禁用 或 在顶部 不触发
      if (this.disableScroll) {
        return;
      }
      // 没滚到位置， 不触发
      if (el.scrollHeight - (scrollTop + el.clientHeight) > SCROLL_TRIGGER_DIST) {
        return;
      }

      const state = this.scrollFetchStatus;

      // 数据全部加载完了 或  正在加载的时候  不再多次触发
      if (state === ALL_LOADED || state === FETCHING) {
        return;
      }
      this.scrollFetchStatus = FETCHING;
      this.fetch(IS_SCROLL);
    },

    /**
     * 通知外部进行请求
     */
    fetch(type) {
      // 如果正在请求, 之后的触发都无效, 知道请求完成
      // 但如果两次的请求类型不同, 则继续
      if (this.isFetching && this.fetchState === type) {
        return;
      }
      this.fetchState = type;
      this.isFetching = true;
      const { fetch } = this.$listeners;
      if (fetch) {
        this.$emit('fetch', this.clearState, type);
      } else {
        this.clearState();
      }
    },
  },
};
</script>

<style lang="less">
@import '../loading/style.less';
@import './style.less';
</style>
