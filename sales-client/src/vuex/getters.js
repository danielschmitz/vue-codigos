
export function getLogin(state){
    return state.login;
}

export function isLogged(state){
  return state.login.token!=null
}

export function itensPerPage(state){
  return state.itens_per_page
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

export function getCategories(state){
    return state.category.list;
}

export function getTotalCategories(state){
    return state.category.total;
}

export function getCategoryPage(state){
    return state.category.page;
}

export function getItensPerPage(state){
    return state. itens_per_page
}
