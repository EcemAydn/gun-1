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
        path: '/update/:id',
        name: 'update',
        component: () => import('../views/UpdateView.vue')
    },
    {
        path: '/create',
        name: 'create',
        component: () => import('../views/CreateView.vue')
    },
  ]
});

const token = localStorage.getItem('token');
router.beforeEach((to, from, next) => {
   if(!token && to.name !== 'login') {
    next({ name: 'login' });
   }

   next();
})

export default router
