import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/journal'
    },
    {
      path: '/journal',
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
    }
  ]
})

export default router
