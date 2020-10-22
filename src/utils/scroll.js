const overflowScrollReg = /scroll|auto/i;
export function getScrollEventTarget(element, rootParent) {
  if (rootParent === void 0) {
    rootParent = window;
  }

  var node = element;

  while (node && node.tagName !== 'HTML' && node.nodeType === 1 && node !== rootParent) {
    const windowGetCom = window.getComputedStyle(node),
      overflowY = windowGetCom.overflowY;

    if (overflowScrollReg.test(overflowY)) {
      if (node.tagName !== 'BODY') {
        return node;
      }

      const windowGetComNode = window.getComputedStyle(node.parentNode),
        htmlOverflowY = windowGetComNode.overflowY;

      if (overflowScrollReg.test(htmlOverflowY)) {
        return node;
      }
    }
    node = node.parentNode;
  }

  return rootParent;
}

export function getScrollTop(element) {
  return 'scrollTop' in element ? element.scrollTop : element.pageYOffset;
}
export function setScrollTop(element, value) {
  'scrollTop' in element ? (element.scrollTop = value) : element.scrollTo(element.scrollX, value);
}
export function getRootScrollTop() {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
}
export function setRootScrollTop(value) {
  setScrollTop(window, value);
  setScrollTop(document.body, value);
} // get distance from element top to page top

export function getElementTop(element) {
  // todo 区分是body滚动，还是元素内部滚动。后续进行优化 
  return (element === window ? 0 : element.getBoundingClientRect().top);
  // return (element === window ? 0 : element.getBoundingClientRect().top)  + getRootScrollTop();
}
export function getVisibleHeight(element) {
  return element === window ? element.innerHeight : element.getBoundingClientRect().height;
}

