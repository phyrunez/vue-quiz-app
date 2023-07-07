import Vue from 'vue'
import App from './App.vue'
import Jumbotron from "./slots/JumbotronSlot.vue"
import router from './router/index'
import store from "./store/index.js"
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import { SidebarComponent, SidebarPlugin } from '@syncfusion/ej2-vue-navigations';

Vue.component(SidebarPlugin.name, SidebarComponent);

Vue.config.productionTip = false

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)

Vue.component('jumbotron-slot', Jumbotron)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
