import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      name: 'admin',
      redirect:'/admin/dashboard',
      component: () => import('../views/Admin.vue'),
      children:[
        {
          path: 'manage-product',
          name: 'manageProduct',
          component: () => import('../views/ManageProduct.vue')
        },
        {
          path: 'manage-category',
          name: 'manageCategory',
          component: () => import('../views/ManageCategory.vue')
        },
        {
          path: 'dashboard',
          name: 'dashboard',
          component: () => import('../views/Dashboard.vue')
        },
      ]
    }
  ]
})

export default router
