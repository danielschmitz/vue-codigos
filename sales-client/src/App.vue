<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<script>

import store from './vuex/store'
import Login from './components/Login.vue'

export default {
    components{
        Login
    },
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  store
}
</script>
