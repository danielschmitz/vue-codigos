
export function getProducts(state){
    return state.product.list;
}

export function hasProducts(state){
    return state.product.list.length>0
}
