<template>
  <div class="demo-swipe-cell">
    <spt-divider>基础用法</spt-divider>
    <spt-swipe-cell :right-width="60" :left-width="60">
      <div slot="left">
        <button class="primary-btn">选择</button>
      </div>
      <div class="cell-div">
        <span>单元格一</span>
        <span>描述文字</span>
      </div>
      <div slot="right-btn">
        <button class="danger-btn">删除</button>
      </div>
    </spt-swipe-cell>
    <spt-divider>多个操作</spt-divider>
    <spt-swipe-cell :right-width="120" :left-width="120">
      <div slot="left">
        <button class="primary-btn">选择</button>
        <button class="primary-btn">选择1</button>
      </div>

      <div class="cell-div">
        <span>单元格二</span>
        <span>描述文字</span>
      </div>

      <div slot="right-btn">
        <button class="danger-btn">删除</button>
        <button class="primary-btn">选中</button>
      </div>
    </spt-swipe-cell>
    <spt-divider>异步操作</spt-divider>
    <spt-swipe-cell :right-width="60" :on-close="onClose">
      <div class="cell-div">
        <span>单元格三</span>
        <span>描述文字</span>
      </div>

      <div slot="right-btn">
        <button class="danger-btn">删除</button>
      </div>
    </spt-swipe-cell>
    <spt-divider>禁止滑动</spt-divider>
    <spt-swipe-cell :disabled="true">
      <div class="cell-div">
        <span>单元格四</span>
        <span>描述文字</span>
      </div>
      <div slot="right-btn">
        <button class="danger-btn">删除</button>
      </div>
    </spt-swipe-cell>
  </div>
</template>
<script>
import Divider from "../components/divider/index.vue";
import SwipeCell from "../components/swipe-cell/index.vue";

export default {
  name: "SwipeCell",
  meta: {
    class: "gesture",
    name: "SwipeCell 滑动单元格",
  },
  components: {
    "spt-swipe-cell": SwipeCell,
    "spt-divider": Divider,
  },
  methods: {
    onClose(clickPosition) {
      console.log(clickPosition);
    },
  },
};
</script>
<style lang="less">
.demo-swipe-cell {
  width: 100%;
  height: 100%;
  padding: 20px;
  box-sizing: border-box;
  button {
    padding: 0;
    margin: 0;
    display: inline-block;
    border: none;
    text-align: center;
    height: 50px;
    line-height: 50px;
    width: 60px;
    color: #fff;
  }
  .primary-btn {
    background-color: #108ee9;
  }
  .danger-btn {
    background-color: #ff3b30;
  }
  .cell-div {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: #fff;
    border-radius: 4px;
    padding: 10px;
    box-sizing: border-box;
  }
  
}
</style>
