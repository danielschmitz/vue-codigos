import Vue from 'vue'
import App from './App.vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'

import HelloWorldRouter from './components/HelloWorldRouter.vue'
import Card from './components/Card.vue'
import Buttons from './components/Buttons.vue'


Vue.use(VueResource)
Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active'
})
router.map({
    '/foo': {
        component: HelloWorldRouter
    },
    '/card': {
        component: Card,
        auth: true
    },
    '/buttons': {
        component: Buttons
    }
});

router.beforeEach(function (transition) {
    //SIMULAÇÃO:
    let authenticated = false;
    console.log(transition);
  if (transition.to.auth && !authenticated) {
    transition.redirect('/login')
  } else {
    transition.next()
  }
})

router.start(App, 'App')