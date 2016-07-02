import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loading:false,
        login: {
        name: null,
        email: null,
        token: null
        }
    },
    mutations: {
        SET_LOGIN (store, login) {
        store.login = login
        },
        SHOW_LOADING (store) {
        store.loading=true;
        },
        HIDE_LOADING (store) {
        store.loading=false;
        },
    }
})
