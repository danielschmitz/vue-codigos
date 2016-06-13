import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import Routes from './routes.js'

Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active'
})

router.map(Routes)

router.start(App, 'App')