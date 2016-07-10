import Vue from 'vue'
import Vuex from 'Vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        itens_per_page: 10,
        error: {
            message: ""
        },
        loading: false,
        login: {
            name: null,
            email: null,
            token: null
        },
        category: {
            list: [],
            selected: {},
            total: 1,
            page: 1
        }
    },
    mutations: {
        SET_LOGIN(store, login) {
            store.login = login
            localStorage.setItem("login", JSON.stringify(store.login));
        },
        SHOW_LOADING(store) {
            store.loading = true;
        },
        HIDE_LOADING(store) {
            store.loading = false;
        },
        SHOW_ERROR(store, msg) {
            store.error.message = msg || "Network error";
            setTimeout(function () {
                store.error.message = ""
            }, 5000)
        },
        HIDE_ERROR(store) {
            store.error.message = "";
        },
        SET_CATEGORIES(store, categories) {
            store.category.list = categories;
        },
        SET_CATEGORY(store, category) {
            store.category.selected = category;
        },
        SET_TOTAL_CATEGORIES(store, total) {
            store.category.total = total;
        },
        SET_PAGE_CATEGORY(store, page) {
            store.category.page = page;
        }
    }
})
