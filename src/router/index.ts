import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'

const routes: Array<RouteRecordRaw> = [
  // {
  //   path:'*',
  //   redirect:'/'
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path:"/CityFilter/:category",
    name:'CityFilter',
    component: () => import('@/views/CityFilter.vue')
  },
  {
    path:"/CityRecommend/:city",
    name:'CityRecommend',
    component: () => import('@/views/CityRecommend.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
