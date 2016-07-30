import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        itens_per_page: 5,
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
        SET_LOGIN(state, login) {
            state.login = login
            localStorage.setItem("login", JSON.stringify(state.login));
        },
        SHOW_LOADING(state) {
            state.loading = true;
        },
        HIDE_LOADING(state) {
            state.loading = false;
        },
        SHOW_ERROR(state, msg) {
            state.error.message = msg || "Network error";
            setTimeout(function () {
                state.error.message = ""
            }, 5000)
        },
        HIDE_ERROR(state) {
            state.error.message = "";
        },
        SET_CATEGORIES(state, categories) {
            state.category.list = categories;
        },
        SET_CATEGORY(state, category) {
            state.category.selected = category;
        },
        SET_CATEGORY_PAGE(state, page) {
            state.category.page = page;
        },
        SET_TOTAL_CATEGORIES(state, total) {
            state.category.total = total;
        },
        SET_PAGE_CATEGORY(state, page) {
            state.category.page = page;
        }
    }
})
