import Vue from 'vue'
import App from './App.vue'

import VueValidator from 'vue-validator'
import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
import Routes from './routes.js'

Vue.use(VueValidator)
Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active',
})

router.map(Routes)

router.start(App, 'App')
