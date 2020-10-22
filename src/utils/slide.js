
export const X = 'X';
export const Y = 'Y';

/**
 * @options keys
 * ---------------------
 * @key {element} el
 * @key {'X'|'Y'} axis
 * @key {fn} onStart
 * @key {fn} onMove
 * @key {fn} onEnd
 *
 * */

const defaultOptions = {
  el: null,
  onStart: () => null,
  onMove: () => null,
  onEnd: () => null,
};
// const div = document.body.appendChild(document.createElement('div'))
// div.setAttribute('style', 'position:fixed;bottom:0;right:0;z-index: 999999;background:#ccc;color:#000;overflow:scroll')

class Slide {
  constructor(options) {
    if (!options.el) {
      return;
    }
    this.el = options.el;
    this.options = Object.assign({}, defaultOptions, options);

    this.touches = [];
    this.multiple = {};
    this.touchMap = {};

    this.touchStart = this.touchStart.bind(this);
    this.touchMove = this.touchMove.bind(this);
    this.touchEnd = this.touchEnd.bind(this);

    this.init();

    return this.detachEvent.bind(this);
  }

  init() {
    addEvent(this.el, 'touchstart', this.touchStart);
    addEvent(this.el, 'touchmove', this.touchMove);
    addEvent(this.el, 'touchend', this.touchEnd);
  }

  detachEvent() {
    detachEvent(this.el, 'touchstart', this.touchStart);
    detachEvent(this.el, 'touchmove', this.touchMove);
    detachEvent(this.el, 'touchend', this.touchEnd);
  }

  /**
   * @function - 代理touchStart
   * */
  touchStart(e) {
    const { changedTouches } = e; // 新增的触点
    const changedLen = changedTouches.length; // 新增的触点数量
    const oldTouchesLen = this.touches.length; // 之前的触点数量
    let touch = null;
    let i = 0;
    do {
      touch = changedTouches[i];
      this.touchMap[touch.identifier] = this.touches.length;

      this.touches.push({
        startX: touch.clientX,
        startY: touch.clientY,
        startTimestamp: Number(new Date()),
        identifier: touch.identifier,
      });
    } while (++i < changedLen);

    // 从单指变成多指
    const isSingleToMultiple = oldTouchesLen === 1;
    // 直接多指触摸
    const directlyMultiple = changedLen >= 2 && oldTouchesLen === 0;

    if (this.touches.length >= 2) {
      const obj = formatMultiple(this.touches, 'start');

      this.multiple = {
        startX: obj.currentX,
        startY: obj.currentY,
        startSpaceBetween: obj.spaceBetween,
        startDegree: obj.degree,
      };
    }

    this.options.onStart(
      {
        touches: this.touches,
        multiple: this.multiple,
        numberOfTouches: this.touches.length,
        isSingleToMultiple,
        directlyMultiple,
      },
      e,
    );

    this.isOn = true;
  }

  /**
   * @function - 代理touchMove
   *
   * */
  touchMove(e) {
    const { touches } = this;
    if (touches.length === 0) {
      this.isOn = false;
    }
    if (!this.isOn) {
      return;
    }

    const { axis } = this.touches[0];
    if (this.options.axis && axis && axis !== this.options.axis) {
      return;
    }

    const { changedTouches } = e;
    let changeTouch = null;
    let isFirstTwo = false;
    let i = 0;
    do {
      changeTouch = changedTouches[i];
      const index = this.touchMap[changeTouch.identifier];
      if (index > 1) {
        continue;
      }
      isFirstTwo = true;
      const item = this.touches[index];
      this.touches.splice(
        index,
        1,
        Object.assign(
          {},
          item,
          compute(item, {
            currentX: changeTouch.clientX,
            currentY: changeTouch.clientY,
          }),
        ),
      );
    } while (++i < changedTouches.length);

    if (isFirstTwo && this.touches.length >= 2) {
      const result = formatMultiple(this.touches, 'move');
      const cache = this.multiple;

      const moveResult = compute(cache, {
        currentX: result.currentX,
        currentY: result.currentY,
      });

      this.multiple = Object.assign({}, cache, moveResult, {
        currentSpaceBetween: result.spaceBetween,
        diffSpaceBetween: result.spaceBetween - cache.startSpaceBetween,
        diffDegree: result.degree - cache.startDegree,
      });
    }

    this.options.onMove(
      {
        touches: this.touches,
        multiple: this.multiple,
        numberOfTouches: this.touches.length,
      },
      e,
    );
  }

  /**
   * @function - touchEnd触发
   *
   * */
  touchEnd(e) {
    if (!this.isOn) {
      return;
    }

    const prevMultipleCache = this.multiple;
    const prevTouches = this.touches;
    const currentTouches = e.touches;

    const currentExactTouches = [];
    const newMap = {};
    for (let i = 0, len = currentTouches.length; i < len; i++) {
      const id = currentTouches[i].identifier;
      const index = this.touchMap[id];
      if (typeof index === 'undefined') {
        continue;
      }
      newMap[id] = currentExactTouches.length;
      currentExactTouches.push(this.touches[index]);
    }
    // 更新后的触点
    this.touches = currentExactTouches;
    this.touchMap = newMap;
    // 当前实际触点数量
    const currentTouchesNumber = currentExactTouches.length;

    // 手指全部离开
    if (currentTouchesNumber === 0) {
      this.isOn = false; // 结束流程
      this.multiple = {};
      this.touchMap = {};
      this.touches = [];
    }
    // 多个触点
    else {
      // 只剩一个触点的时候
      if (currentTouchesNumber === 1) {
        this.multiple = {};
      }
    }

    this.options.onEnd(
      {
        touches: this.touches, // 当前触点
        multiple: this.multiple, // 多触点的数据
        prevTouches, // 触点变化前最近一次的触点
        prevMultiple: prevMultipleCache, // 上一步的多触点数据
        endTimestamp: Number(new Date()),
        numberOfTouches: this.touches.length,
        numberOfChanged: prevTouches.length - this.touches.length,
      },
      e,
    );
  }
}

// 提取多指操作的数据
function formatMultiple(touches) {
  const fT = touches[0];
  const sT = touches[1];
  const fX = fT.currentX || fT.startX;
  const fY = fT.currentY || fT.startY;
  const x = (sT.currentX || sT.startX) - fX;
  const y = (sT.currentY || sT.startY) - fY;
  const spaceBetween = Math.sqrt(Math.abs(x * x) + Math.abs(y * y));
  const sin = -y / spaceBetween;

  return {
    spaceBetween,
    degree: Math.asin(sin) / ((2 * Math.PI) / 360),
    currentX: x / 2 + fX,
    currentY: y / 2 + fY,
  };
}

// 规范化数据
function compute(cache, current) {
  const { currentX } = current;
  const { currentY } = current;

  const diffX = Math.abs(currentX - cache.startX);
  const diffY = Math.abs(currentY - cache.startY);

  const directionX = currentX >= cache.startX ? 1 : -1;
  const directionY = currentY >= cache.startY ? 1 : -1;
  const cdX = currentX >= (cache.currentX || cache.startX) ? 1 : -1;
  const cdY = currentY >= (cache.currentY || cache.startY) ? 1 : -1;

  // 尽早的判断出滑动的轴线;
  const axis = cache.axis || (diffX > diffY ? X : Y);

  return {
    axis,
    // 单轴方向的移动距离
    diffX,
    diffY,
    diff: Math.sqrt(diffX * diffX + diffY * diffY),
    // 总体的移动方向， X轴向上的移动方向  Y轴向上的移动方向
    directionX,
    directionY,
    direction: axis === X ? directionX : directionY,
    // 当前滑动方向， X轴向上的当前移动方向  Y轴向上当前移动方向
    currentDirectionX: cdX,
    currentDirectionY: cdY,
    currentDirection: axis === X ? cdX : cdY,
    // 上次触点位置
    currentX,
    currentY,
  };
}

function addEvent(el, eventName, fn, useCapture = false) {
  el.addEventListener(eventName, fn, useCapture);
}

function detachEvent(el, eventName, fn) {
  el.removeEventListener(eventName, fn);
}

function createSlide(options) {
  return new Slide(options);
}

export default createSlide;

