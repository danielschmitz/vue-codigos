<template>
  <div id="app">
    <Display></Display>
    <Increment></Increment>
  </div>
</template>


<script>
import Display from './Display.vue'
import Increment from './Increment.vue'
import store from './store.js'

export default {
    components: {
        Display, Increment
    },
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  store
}
</script>