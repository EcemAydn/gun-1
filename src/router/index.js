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
        path: '/title/create',
        name: 'createTitle',
        component: () => import('../views/CreateTitle.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/MembersView.vue')
    },
    {
      path: '/members/create',
      name: 'createMember',
      component: () => import('../views/CreateMember.vue')
    },
    {
      path: '/members/update/:id',
      name: 'UpdateMember',
      component: () => import('../views/UpdateMember.vue')
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
