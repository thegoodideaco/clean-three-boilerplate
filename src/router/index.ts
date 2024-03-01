import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '3d',
      component: () => import('@/views/3d/rapier_setup/RapierView.vue')
    },
    {
      path: '/hearts',
      name: 'hearts',
      component: () => import('@/views/3d/hearts/HeartsView.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('@/views/AboutView.vue')
    },
    {
      path: '/4th',
      name: '4th',
      component: () => import('@/views/3d/4th/MainApp.vue')
    }
  ]
})

export default router
