<template>
  <div class="fetch-demo" style="position:absolute;top:0;left:0;bottom:0;right:0;">
    <Fetch @fetch="handleFetch">
      <div
        style="line-height:50px;border-bottom:1px solid #eee;background:#fff;text-align:center;"
        v-for="i in count"
        :key="i"
      >
        {{ i }}
      </div>
    </Fetch>
  </div>
</template>

<script>
import Fetch from '../components/fetch/index.vue';

export default {
  name: 'fetch-demo',
  meta: {
    class: 'gesture',
    name: 'Fetch 数据',
  },
  components: {
    Fetch,
  },
  data() {
    return {
      count: 20,
    };
  },
  methods: {
    handleFetch(resolve, type) {
      setTimeout(() => {
        if (type === 'PULL_REFRESH') {
          this.count = 20;
          resolve();
          return;
        }
        this.count += 20;
        resolve(this.count >= 60);
      }, 2000);
    },
  },
};
</script>
