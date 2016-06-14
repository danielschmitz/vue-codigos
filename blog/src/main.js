import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import VueValidator from 'vue-validator'

import Routes from './routes.js'
import Auth from './auth.js'

Vue.use(VueResource)
Vue.use(VueRouter)
Vue.use(VueValidator)

const router = new VueRouter({
    linkActiveClass: 'active',
})

router.redirect({
    '/': '/home'
  })

router.map(Routes)

router.start(App, 'App')