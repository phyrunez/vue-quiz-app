import Vue from 'vue'
import App from './App.vue'
import Jumbotron from "./slots/JumbotronSlot.vue"
import router from './router/index'
import store from "./store/index.js"
import firebase from "firebase/app"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyDgbSBN72BUDBoPhnFdcnNHkOnS7igBoEY",
  authDomain: "vue-quiz-app-1c64b.firebaseapp.com",
  databaseURL: "https://vue-quiz-app-1c64b-default-rtdb.firebaseio.com",
  projectId: "vue-quiz-app-1c64b",
  storageBucket: "vue-quiz-app-1c64b.appspot.com",
  messagingSenderId: "195495467966",
  appId: "1:195495467966:web:e8a669a910b39444d737ef"
};
firebase.initializeApp(firebaseConfig)

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('jumbotron-slot', Jumbotron)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
