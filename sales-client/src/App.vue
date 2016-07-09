<template>
  <div id="app">
    <Login v-if="!isLogged"></Login>
    <Admin v-else></admin>
  </div>
</template>

<script>

import store from './vuex/store'
import {isLogged} from './vuex/getters'
import {setLoginFromLocalStorage} from './vuex/actions'

import Login from './components/Login.vue'
import Admin from './components/Admin.vue'

export default {
   components: {
        Login, Admin
   },
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  store,
  vuex:{
      getters:  {
          isLogged
      },
      actions: {
          setLoginFromLocalStorage
      }
  },
  created(){
      this.setLoginFromLocalStorage();
  }
}
</script>
<style>
body {
  background-color: #eee;
}
</style>
