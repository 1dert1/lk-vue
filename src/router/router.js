import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/Login"
import Lk from "@/pages/Lk"
import Grades from "@/pages/Grades"

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login
  },

  {
    name: 'logout',
    path: '/logout/:token',
    component: Login
  },

  {
    name: 'lk',
    path: '/lk/:token',
    component: Lk
  },
  {
    name: 'grades',
    path: '/grades/:token',
    component: Grades
  },
]

const router = createRouter({
  history: createWebHistory("/lk-bot"),
  routes
})

export default router
