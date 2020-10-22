
<template>
  <div class="spt-password-input-demo-box">
    <divider>基础用法</divider>
    <spt-password-input @change="onChange" />
    <divider>自定义长度</divider>
    <spt-password-input @change="onChange" :maxlength="4" />
    <divider>明文展示</divider>
    <spt-password-input @change="onChange" />

    <divider>密文展示</divider>
    <spt-password-input @change="onChange" mask />
  </div>
</template>

<script>
import divider from '../components/divider/index.vue';
import passwordInput from '../components/password-input/index.vue';

export default {
  name: 'PasswordInput',
  meta: {
    class: 'form',
    name: 'PasswordInput 密码输入框',
  },
  components: {
    divider,
    'spt-password-input': passwordInput,
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
<style lang="less">
.spt-password-input-demo-box {
  width: 100%;
  height: 100%;
  padding: 20px;

  box-sizing: border-box;
}
</style>
