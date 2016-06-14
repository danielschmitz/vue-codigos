import Home from './Home.vue'

const Routes = {
    '/home': {
        component: Home          
    },
    '/login':{
        component:{
          template: "<b>login</b>"
        }
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