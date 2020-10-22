import Vue from "vue"
import VueRouter from "vue-router"
import home from "../demo"
import sticky from "../demo/sticky";
import fetch from "../demo/fetch";
import passwordInput from "../components/password-input"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    component: home,
    meta: {
      title: "组件介绍",
    },
  },
  {
    path: "/sticky",
    name: "sticky",
    meta: {
      title: "sticky",
    },
    component: sticky,
  },
  {
    path: "/fetch",
    name: "fetch",
    meta: {
      title: "fetch",
    },
    component: fetch,
  },
  {
    path: "/passwordInput",
    name: "passwordInput",
    meta: {
      title: "passwordInput",
    },
    component: passwordInput,
  },
]

const router = new VueRouter({
  mode: "history",
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

export default router
