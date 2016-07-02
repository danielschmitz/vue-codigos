
export function getLogin(state){
    return state.login;
}

export function isLogged(state){
  return state.login.token!=null
}

export function isLoading(state){
  return state.loading
}
