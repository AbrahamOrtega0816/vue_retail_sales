import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Market',
    component: () => import('../views/Market.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
