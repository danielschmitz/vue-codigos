import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
    count: 0,
    showWaitMessage:false
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
    SHOW_WAIT_MESSAGE(state){
      state.showWaitMessage = true;
    },
    HIDE_WAIT_MESSAGE(state){
      state.showWaitMessage = false;
    }
}

export default new Vuex.Store({
  state,
  mutations
})