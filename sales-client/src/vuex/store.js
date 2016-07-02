import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        login: {
        name: '',
        email: '',
        token:''
        }
    },
    mutations: {
        SET_LOGIN (store, login) {
        store.login = login
        }
    }
})
