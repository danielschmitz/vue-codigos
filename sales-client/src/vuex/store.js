import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: {
        name: null,
        email: null,
        token: null
        }
    },
    mutations: {
        SET_LOGIN (store, login) {
        store.login = login
        }
    }
})
