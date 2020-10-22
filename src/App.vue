<template>
  <div id="app">
    <router-view v-transition></router-view>
  </div>
</template>

<script>

// import Sticky from './demo/sticky.vue'
// import PasswordInput from './demo/password-input.vue'
// import Fetch from './demo/fetch.vue'

export default {
  name: 'App',
  components: {
    // Sticky,
    // PasswordInput,
    // Fetch,
  }
}
</script>

<style lang="less">
#app {
  height: 100vh;
  width: 100vw;
}
.ceshi {
  color: red;
}
@import './style/reset.less';
</style>
