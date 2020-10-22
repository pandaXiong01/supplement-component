/* eslint-disable */

export function isDef(value) {
  return value !== undefined && value !== null;
}
export function isObj(x) {
  const type = typeof x;
  return x !== null && (type === 'object' || type === 'function');
}

export function stopPropagation(event) {
  event.stopPropagation();
}

export function preventDefault(event, isStopPropagation) {
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault();
  }

  if (isStopPropagation) {
    stopPropagation(event);
  }
}

export const formatList = (data = []) => {
  const loop = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
      const listItem = arr[i];
      const {
        cityAreaOlds,
        areaName,
        areaCode,
        parentCode,
        name,
        value,
        parent,
        ...rest
      } = listItem;

      if (!name && !areaName) {
        console.error('传入 area 组件的数据 list 不符合组件 api 要求，详细数据格式请查看文档');
        return [];
      }
      const item = {
        name: name || areaName,
        value: value || areaCode,
        children: cityAreaOlds,
        areaCode,
        areaName,
        parentCode,
        ...rest,
      };

      delete item.cityAreaOlds;
      arr[i] = item;

      if (item.children) {
        loop(item.children);
      }
    }
  };

  const newData = JSON.parse(JSON.stringify(data));
  loop(newData);
  return newData;
};

export const value2Item = (value, list) => {
  const items = [];
  const loop = (arr) => {
    for (const i of arr) {
      if (value.includes(i.value)) {
        const { children, ...rest } = i;
        items.push(rest);
      }
      if (i.children) {
        loop(i.children);
      }
    }
  };
  loop(list);

  return items;
};
/* eslint-enable */
