import Vue from 'vue'
import App from './App.vue'

import real from '../real'
Vue.use(real)

new Vue({
  el: 'body',
  components: { App }
})
