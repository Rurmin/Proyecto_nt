import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import MenuView from '@/views/MenuView.vue'

const routes = [
  { 
    path: '/', 
    name: 'Home', 
    component: HomeView,
    meta: { requiresAuth: false } 
  },
  { 
    path: '/login', 
    name: 'Login', 
    component: LoginView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/registro', 
    name: 'Register', 
    component: RegisterView,
    meta: { requiresGuest: true }
  },
  { 
    path: '/menu', 
    name: 'Menu', 
    component: MenuView,
    meta: { requiresAuth: true } 
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('pegasus_user') !== null

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'Login' })
  } else if (to.meta.requiresGuest && isAuthenticated) {
    next({ name: 'Menu' })
  } else {
    next()
  }
})

export default router