
import {URL} from '../config.js'

export function setLogin({dispatch},user){
  dispatch("SHOW_LOADING")
  this.$http.post(`${URL}/login`,user).then(
    (response)=>{
      dispatch("HIDE_LOADING")
      dispatch("SET_LOGIN",response.data)
    },
    (error)=>{
      dispatch("HIDE_LOADING")
      console.log(error)
      dispatch("SHOW_ERROR",error.body)
    }
  )
}

export function setError({dispatch},msg){
  dispatch("SHOW_ERROR",msg);
}

export function clearError({dispatch}){
  dispatch("HIDE_ERROR");
}


