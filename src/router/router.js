import { createRouter, createWebHistory } from 'vue-router'
import Login from "@/pages/Login"
import Lk from "@/pages/Lk"
import Grades from "@/pages/Grades"
import Payments from "@/pages/Payments"
import Hostel from "@/pages/Hostel"

const routes = [
  {
    name: 'login',
    path: '/',
    component: Login
  },

  {
    name: 'logout',
    path: '/logout',
    component: Login
  },

  {
    name: 'lk',
    path: '/lk',
    component: Lk
  },
  {
    name: 'grades',
    path: '/grades',
    component: Grades
  },
  {
    name: 'payments',
    path: '/payments',
    component: Payments
  },
  {
    name: 'hostel',
    path: '/hostel',
    component: Hostel
  },
]

const router = createRouter({
  history: createWebHistory("/lk-bot"),
  routes
})

export default router
