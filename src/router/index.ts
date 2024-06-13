import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../pages/login.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('../pages/signup.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/journal',
      name: 'journal',
      component: () => import('../pages/journal/index.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/reseau',
      name: 'reseau',
      component: () => import('../pages/reseau/index.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/reseau/test',
      name: 'test',
      component: () => import('../pages/reseau/test.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/journal/stats',
      name: 'stats',
      component: () => import('../pages/journal/stats.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/journal/create',
      name: 'create',
      component: () => import('../pages/journal/create.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../pages/about/index.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/about/cgu',
      name: 'cgu',
      component: () => import('../pages/about/cgu.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/about/nda',
      name: 'nda',
      component: () => import('../pages/about/nda.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/about/rgpd',
      name: 'rgpd',
      component: () => import('../pages/about/rgpd.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/about/us',
      name: 'us',
      component: () => import('../pages/about/us.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/account',
      name: 'account',
      component: () => import('../pages/account/index.vue'),
      props: true // Assurez-vous que les props sont définies correctement
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
      component: () => import('../pages/journal/analyse.vue'),
      props: true // Assurez-vous que les props sont définies correctement
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
      component: () => import('../pages/journal/filter.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: () => import('../pages/ForgotPassword.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/reseau/filter',
      name: 'share-filter',
      component: () => import('../pages/reseau/filter.vue'),
      props: true // Assurez-vous que les props sont définies correctement
    },
    {
      path: '/auth/confirm-password-reset/:token',
      name: 'reset-password',
      component: () => import('../pages/ResetPassword.vue'),
      props: true
    },
    {
      path: '/reseau/:id',
      name: 'dream-post',
      component: () => import('../pages/reseau/DreamPost.vue'),
      props: true
    },
    {
      path: '/account/change-password',
      name: 'change-password',
      component: () => import('../pages/account/ChangePassword.vue')
    }
    ,
    { path: '/contact',
       name: 'contact',
       component: () => import('../pages/contact.vue') 
    },
    { path: '/profil',
       name: 'profil-user',
       component: () => import('../pages/reseau/ProfilUser.vue') 
    },
    {
      path: '/profil/edit',
      name: 'edit-profile',
      component: () => import('../pages/reseau/EditProfile.vue'),
      props: true
    },
    {
      path: '/user/:userId',
      name: 'user-profile',
      component: () => import('../pages/reseau/UserProfile.vue'),
      props: true
    }
    
    
    
    
  ]
})

export default router
