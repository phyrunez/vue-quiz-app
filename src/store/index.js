import Vue from 'vue'
import Vuex from 'vuex'
import users from './modules/users'
import admin from './modules/admin'
import auth from './modules/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    users: users,
    admin: admin,
    auth
  }
})
