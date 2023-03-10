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
      component: () => import('../views/Titles/TitleView.vue')
    },
    {
        path: '/update/:id',
        name: 'update',
        component: () => import('../views/Titles/UpdateView.vue')
    },
    {
      path: '/members',
      name: 'members',
      component: () => import('../views/Members/MembersView.vue')
    },
    {
      path: '/members/update/:id',
      name: 'UpdateMember',
      component: () => import('../views/Members/UpdateMember.vue')
    },
    {
      path: '/projects',
      name: 'projects',
      component: () => import('../views/Projects/ProjectView.vue')
    },
    {
      path: '/projects/update/:id',
      name: 'UpdateProject',
      component: () => import('../views/Projects/UpdateProject.vue')
    },
    {
      path: '/missions',
      name: 'missions',
      component: () => import('../views/Missions/MissionsView.vue')
    },
    {
      path: '/missions/update/:id',
      name: 'UpdateMission',
      component: () => import('../views/Missions/UpdateMissions.vue')
    },
  ]
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if(!token && to.name !== 'login') {
      next({ name: 'Login' });
  } else {
    next();
  }
})

export default router
