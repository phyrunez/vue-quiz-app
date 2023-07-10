import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login.vue'
import AdminDashboard from "../components/Dashboards/Admin/Dashboard.vue"
import CreateQuiz from "../components/Dashboards/Admin/adminDashboardComponents/CreateQuiz.vue"
import UsersDashboard from "../components/Dashboards/Users/Dashboard.vue"
import QuestionSession from "../components/Dashboards/Users/usersDashboardComponents/QuestionSession.vue"
import NotFound from "../components/NotFound.vue"

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/signup',
    name: 'signup',
    component: () => import( '../components/Signup/Signup.vue')
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: {
      render(c) {
        return c('router-view')
      }
    },
    children: [
      {
        path: "admin",
        name: "admin",
        component: AdminDashboard,
      },
      {
        path: "admin/create-quiz",
        name: "create-quiz",
        component: CreateQuiz,
        
      },
      {
        path: "users",
        name: "users",
        component: UsersDashboard,
      },
      {
        path: "users/quiz/:id",
        name: "question-session",
        component: QuestionSession,
      }
    ]
  },
  {
    path: '*',
    name: 'Not Found',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
