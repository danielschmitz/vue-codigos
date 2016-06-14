import Home from './Home.vue'
import Login from './Login.vue'
import AddPost from './AddPost.vue'
import Logout from './Logout.vue'

const Routes = {
    '/home': {
        component: Home          
    },
    '/login':{
        component: Login
    },
    '/logout':{
        component: Logout
    },
    '/addPost':{
       component: AddPost
    }
}

export default Routes;