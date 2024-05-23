import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/journal/index.vue')
    },
    {
      path: '/reseau',
      name: 'reseau',
      component: () => import('../pages/reseau.vue/index.vue')
    },
    {
      path: '/reseau/caca',
      name: 'caca',
      component: () => import('../pages/reseau.vue/caca.vue')
    }

  ]
})

export default router
