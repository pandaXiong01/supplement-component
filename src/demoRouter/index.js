import VueRouter from "vue-router"
import home from "../demo"
import sticky from "../demo/sticky";
import fetch from "../demo/fetch";
import passwordInput from "../demo/password-input"
import keyBoard from "../demo/key-board";
import swipeCell from "../demo/swipe-cell";

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
  {
    path: "/keyBoard",
    name: "keyBoard",
    meta: {
      title: "keyBoard",
    },
    component: keyBoard,
  },
  {
    path: "/swipeCell",
    name: "swipeCell",
    meta: {
      title: "swipeCell",
    },
    component: swipeCell,
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
