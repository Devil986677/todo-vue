import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ListTodo from '@/views/ListTodo.vue'
import CreateTodo from '@/views/CreateTodo.vue'
import EditView from '@/views/EditView.vue';
import Registerview from '@/views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },{
      path: '/list',
      name: 'list',
      component: ListTodo,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/add',
      name: 'add',
      component: CreateTodo,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/list/:id',
      name: 'edit',
      component: EditView,
      meta: { requiresAuth: true }, 
    },
    {
      path: '/register',
      name: 'register',
      component: Registerview,
     
    },
  ]
});
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token'); 

  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/');
  } else {
    next();
  }
});

export default router
