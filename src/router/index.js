import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')

    },
    {
      path: '/titles',
      name: 'title',
      component: () => import('../views/TitleView.vue')
    },
    {
        path: '/titles',
        name: 'title',
        component: () => import('../views/TitleView.vue')
      }
  ]
})

export default router
