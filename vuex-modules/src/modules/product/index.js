
const state = {
    list : [],
    selected : {}
}

const mutations = {
    SETPRODUCTS(state, data) {
        state.list = data;
    },
    SETPRODUCT(state, data) {
        state.selected = data;
    }
}

export default { state, mutations }
