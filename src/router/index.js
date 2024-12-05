import { createRouter, createWebHistory } from 'vue-router'
import dashboardRoutes from '../modules/dashboard/dashboard.routes'
import usersRoutes from '../modules/users/users.routes'

const routes = [...dashboardRoutes, ...usersRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
