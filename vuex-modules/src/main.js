import Vue from 'vue'
import App from './App.vue'

import VueResource from 'vue-resource'

Vue.use(VueResource)

new Vue({
  el: 'body',
  components: { App }
})
