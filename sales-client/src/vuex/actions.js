
import {URL} from '../config.js'

export function setLogin({dispatch},user){
  dispatch("SHOW_LOADING")
  this.$http.post(`${URL}/login`,user).then(
    (response)=>{
      dispatch("HIDE_LOADING")
      dispatch("SET_LOGIN",response.data);
    },
    (error)=>{
      dispatch("HIDE_LOADING")
      console.error("ERROU",error);
    }
  )
}


