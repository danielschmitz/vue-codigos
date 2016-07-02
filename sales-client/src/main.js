import Vue from 'vue'
import App from './App.vue'

import VueValidator from 'vue-validator'

Vue.use(VueValidator)

new Vue({
  el: 'body',
  components: { App }
})
