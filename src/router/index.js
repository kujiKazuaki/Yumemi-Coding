import { createRouter, createWebHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Main",
    component: () => import("@/view/mainPage.vue"),
  },
  {
    path: "/NaviBar",
    name: "NaviBar",
    component: () => import("@/components/naviBar.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
