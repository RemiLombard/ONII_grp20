import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/login.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/signup.vue')
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../pages/journal/index.vue')
    },
    {
      path: '/reseau',
      name: 'reseau',
      component: () => import('../pages/reseau/index.vue')
    },
    {
      path: '/reseau/test',
      name: 'test',
      component: () => import('../pages/reseau/test.vue')
    },
    {
      path: '/journal/stats',
      name: 'stats',
      component: () => import('../pages/journal/stats.vue')
    },
    {
      path: '/journal/create',
      name: 'create',
      component: () => import('../pages/journal/create.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/about/index.vue')
    },
    {
      path: '/about/cgu',
      name: 'cgu',
      component: () => import('../pages/about/cgu.vue')
    },
    {
      path: '/about/nda',
      name: 'nda',
      component: () => import('../pages/about/nda.vue')
    },
    {
      path: '/about/rgpd',
      name: 'rgpd',
      component: () => import('../pages/about/rgpd.vue')
    },
    {
      path: '/about/us',
      name: 'us',
      component: () => import('../pages/about/us.vue')
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../pages/account/index.vue')
    },
    {
      path: '/journal/dream/:id',
      name: 'dream-details',
      component: () => import('../pages/journal/details.vue'),
      props: true
    },
    {
      path: '/journal/:id/analyse',
      name: 'dream-analysis',
      component: () => import('../pages/journal/analyse.vue')
    },
    {
      path: '/journal/edit/:id',
      name: 'dream-edit',
      component: () => import('../pages/journal/edit.vue'),
      props: true
    },
    {
      path: '/journal/filter',
      name: 'filter',
      component: () => import('../pages/journal/filter.vue')
    },
    
    
    
  ]
})

export default router
