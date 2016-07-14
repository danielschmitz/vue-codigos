
import {URL} from '../config.js'

export function setLogin({dispatch}, user) {
    dispatch("SHOW_LOADING")
    this.$http.post(`${URL}/login`, user).then(
        (response) => {
            dispatch("HIDE_LOADING")
            console.log("setLogin", response.data)
            dispatch("SET_LOGIN", response.data)
        },
        (error) => {
            dispatch("HIDE_LOADING")
            console.log(error)
            dispatch("SHOW_ERROR", error.body)
        }
    )
}

export function setLoginFromLocalStorage({dispatch}) {
    let login = JSON.parse(localStorage.getItem("login"))
    if ((login != null) && (login.token != null)) {
        dispatch("SET_LOGIN", login)
    }
}

export function setError({dispatch}, msg) {
    dispatch("SHOW_ERROR", msg);
}

export function clearError({dispatch}) {
    dispatch("HIDE_ERROR");
}

export function setCategory({dispatch}, category) {
    dispatch("SET_CATEGORY", category);
}

export function saveCategory({dispatch, state},keyword) {
    dispatch("SHOW_LOADING")

    this.$http.post(`${URL}/category`, state.category.selected).then(
        response => {
            dispatch("SET_CATEGORY", response.json())
        },
        error => {
            dispatch("SHOW_ERROR", error.body)
        }
    ).finally(function () {
        dispatch("HIDE_LOADING")
        this.loadCategories(keyword);
    })

}

export function loadCategories({dispatch, state},keyword) {
    dispatch('SHOW_LOADING')

    let start = (state.category.page * state.itens_per_page) - (state.itens_per_page - 1);

    let keywordString=""
    if (keyword!=null){
        keywordString=`&q=${keyword}`
    }

    this.$http.get(`${URL}/categories?start=${start}&limit=${state.itens_per_page}${keywordString}`).then(
        response => {
            dispatch("SET_CATEGORIES", response.json())
            dispatch('SET_TOTAL_CATEGORIES', response.headers['x-total-count']);
        },
        error => {
            dispatch("SHOW_ERROR", error.body)
        }
    ).finally(function () {
        dispatch("HIDE_LOADING")
    })
}

export function changeCategoriesPage({dispatch, state}, page, keyword) {
    dispatch('SET_CATEGORY_PAGE', page)
    this.loadCategories(keyword)
}

export function deleteCategory({dispatch,state},keyword) {
    dispatch('SHOW_LOADING')
    this.$http.delete(`${URL}/category/${state.category.selected.id}`).then(
        response => {
            //clear selected
            dispatch("SET_CATEGORY", {})
        },
        error => {
            dispatch("SHOW_ERROR", error.body)
        }
    ).finally(function () {
        dispatch("HIDE_LOADING")
        this.loadCategories(keyword);
    })
}





