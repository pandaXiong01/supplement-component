<template>
  <div class="demo-keyboard">
    <button  @click="keyboard = 'null'">默认数字键盘</button>
    <button  @click="keyboard = 'title'">带标题数字键盘</button>
    <button  @click="keyboard = 'default'">主题default数字键盘</button>
    <spt-key-board :show="keyboard === 'null'" @blur="hideKeyBoard" @input="onInput"></spt-key-board>
    <spt-key-board
      :show="keyboard === 'title'"
      @blur="hideKeyBoard"
      @input="onInput"
      title="带标题数字键盘"
      show-title-close
      :close-button-text="'确定'"
    ></spt-key-board>
    <spt-key-board
      :show="keyboard === 'default'"
      @blur="hideKeyBoard"
      @input="onInput"
      title="主题default数字键盘"
      theme="default"
      show-title-close
      :close-button-text="'确定'"
    ></spt-key-board>
  </div>
</template>
<script>

import KeyBoard from '../components/key-board/index.vue';


export default {
  name: 'DemoKeyBoard',
  meta: {
    class: 'DemoKeyBoard',
    name: 'KeyBoard 键盘',
  },
  components: {
    'spt-key-board': KeyBoard,
  },
  data() {
    return {
      keyboard: '',
    };
  },
  methods: {
    hideKeyBoard() {
      this.keyboard = '';
    },
    onInput(text) {
      console.log(text);
    },
  },
};
</script>
<style lang="less">
.demo-keyboard {
  .button + .button {
    margin-top: 10px;
  }
}
</style>
