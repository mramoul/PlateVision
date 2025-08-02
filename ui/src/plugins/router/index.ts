import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import PlateVision from '../../views/plateVision/PlateVision.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'PlateVision',
    component: PlateVision,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
