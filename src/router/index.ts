import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/add-user',
      name: 'addUser',
      component: () => import('../views/AddUserView.vue')
    },
    {
      path: '/edit-user',
      name: 'editUser',
      component: () => import('../views/EditUserView.vue')
    },
    {
      path: '/edit-user',
      name: 'editUser',
      component: () => import('../views/EditUserView.vue')
    },
    {
      path: '/admin/queues',
      name: 'Queue Dashboard',
      component: () => import('../views/tools/QueueDashboard.vue'),
      props: { route: ' http://localhost:5000/admin/queues' }
    }
  ]
})

export default router
