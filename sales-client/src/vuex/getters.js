
export function getLogin(state){
    return state.login;
}

export function isLogged(state){
  return state.login.token!=null
}

export function isLoading(state){
  return state.loading
}

export function hasError(state){
  return state.error.message!="";
}

export function getError(state){
  return state.error.message;
}

export function getCategory(state){
    return state.category.selected;
}
