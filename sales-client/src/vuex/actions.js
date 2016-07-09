
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


