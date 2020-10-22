
<template>
  <div class="demo-sticky">
    <h3>基础用法</h3>
    <spt-sticky @scroll="appScroll">
      <div class="header">内容1</div>
    </spt-sticky>

    <h3>距离顶部</h3>
    <spt-sticky :offset-top="60" @scroll="appScroll">
      <div class="header" style="margin-left:120px;">内容2</div>
    </spt-sticky>

    <h3>指定容器</h3>
    <div ref="container" class="demobox">
      <spt-sticky :container="container" :offset-top="30">
        <div class="header">内容3</div>
      </spt-sticky>
    </div>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <br />
    <p>滑吧，有内容</p>
  </div>
</template>
<script>
import Sticky from '../components/sticky/index.vue';

export default {
  // eslint-disable-next-line
  name: 'sticky',
  meta: {
    class: 'exhibition',
    name: 'Sticky 粘性布局',
  },
  components: {

    'spt-sticky': Sticky,
  },
  data() {
    return {
      container: null,
    };
  },
  mounted() {
    this.container = this.$refs.container;
  },
  methods: {
    appScroll(obj) {
      console.log(obj);
    },
  },
};
</script>
<style lang="less">
.demo-sticky {
  height: 100vh;
  overflow: scroll;
  h3 {
    line-height: 60px;
    text-align: center;
    font-size: 20px;
  }
  .demobox {
    height: 240px;
    background: rgb(255, 255, 255);
    border:5px solid red;
  }
  .header {
    background: black;
    color: white;
    height: 50px;
    line-height: 50px;
  }
}
</style>
