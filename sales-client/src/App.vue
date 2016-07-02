<template>
  <div id="app">
    <Login></Login>
  </div>
</template>

<script>

import store from './vuex/store'
import Login from './components/Login.vue'

export default {
    components: {
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
<style>
    body {
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #ded!important;
}
</style>
