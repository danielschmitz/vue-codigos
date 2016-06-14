import Home from './Home.vue'
import Login from './Login.vue'

const Routes = {
    '/home': {
        component: Home          
    },
    '/login':{
        component: Login
    },
    '/logout':{
        component:{
          template: "<b>logout</b>"
        }
    },
    '/addPost':{
       component:{
          template: "<b>addPost</b>"
        }
    },
    '/removePost':{
        component:{
          template: "<b>removePost</b>"
        }
    },
}

export default Routes;