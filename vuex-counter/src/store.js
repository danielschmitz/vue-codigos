import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0
}

const mutations = {
    INCREMENT(state){
        state.count++;
    },
    DECREMENT(state){
        state.count--;
    },
    INCREMENTVALUE(state,value){
        state.count=state.count+value
    },
}

export default new Vuex.Store({
  state,
  mutations
})