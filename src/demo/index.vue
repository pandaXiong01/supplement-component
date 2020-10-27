<template>
  <div class="home-page">
    <h1>supplement-component</h1>
    <ul>
      <li v-for="page in pages" :key="page.name">
        <router-link :to="page.path">{{ page.name }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "demos-home",
  data: () => {
    return {
      pages: [
        {
          path: "/sticky",
          name: "sticky",
          meta: {
            title: "sticky",
          },
        },
        {
          path: "/fetch",
          name: "fetch",
          meta: {
            title: "fetch",
          },
        },
        {
          path: "/passwordInput",
          name: "passwordInput",
          meta: {
            title: "passwordInput",
          },
        },
        {
          path: "/keyBoard",
          name: "keyBoard",
          meta: {
            title: "keyBoard",
          },
        },
        {
          path: "/swipeCell",
          name: "swipeCell",
          meta: {
            title: "swipeCell",
          },
        },
      ],
    };
  },
  components: {},
  methods: {},
};
</script>

<style>
.home-page {
  min-height: 100vh;
  padding: 0px 20px;
}
h1 {
  text-align: center;
  font-weight: 600;
  font-size: 20px;
  line-height: 50px;
}
li {
  padding: 20px;
  background: #fff;
  margin-top: 16px;
  border-radius: 6px;
}
</style>