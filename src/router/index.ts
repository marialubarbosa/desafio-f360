import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/Dashboard/DashboardView.vue'
import StatisticsView from '@/views/Statistics/StatisticsView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  {path: '/statistics', name: 'Statistics', component: StatisticsView},
]

const router = createRouter({
  history: createWebHistory(), 
  routes,
})

export default router
