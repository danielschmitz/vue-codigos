import Vue from 'vue'
import App from './App.vue'

import VueValidator from 'vue-validator'
import VueResource from 'vue-resource'

Vue.use(VueValidator)
Vue.use(VueResource)

new Vue({
  el: 'body',
  components: { App }
})
