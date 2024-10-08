import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/admin',
      name: 'admin',
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
      ]
    }
  ]
})

export default router
