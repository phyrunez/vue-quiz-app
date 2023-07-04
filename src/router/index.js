import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login/Login.vue'
import AdminDashboard from "../components/Dashboards/Admin/Dashboard.vue"
import CreateQuiz from "../components/Dashboards/Admin/adminDashboardComponents/CreateQuiz.vue"
import UsersDashboard from "../components/Dashboards/Users/Dashboard.vue"
import QuestionSession from "../components/Dashboards/Users/usersDashboardComponents/QuestionSession.vue"
import Result from "../components/Result.vue"

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
        // beforeEnter: (to, from, next) => {
        //   if(state.rootState.) {
        //       next(false);
        //   } else {
        //       next();
        //   }
        // }
        // props: true,
        // children: [
        //   {
        //     path: "create-quiz",
        //     name: "create-quiz",
        //     component: CreateQuiz
        //   }
        // ]
      },
      {
        path: "admin/create-quiz",
        name: "create-quiz",
        component: CreateQuiz,
        // beforeEnter: (to, from, next) => {
        //   if(this.$store.getters['users/userAuthState']) {
        //       next(false);
        //   } else {
        //       next();
        //   }
        // }
      },
      {
        path: "users",
        name: "users",
        component: UsersDashboard,
      },
      {
        path: "users/:id",
        name: "question-session",
        component: QuestionSession
      }
    ]
  },
  {
    path: "/result",
    name: "result",
    component: Result
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
