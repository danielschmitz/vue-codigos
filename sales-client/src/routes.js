import Users from './components/Users.vue'
import Suppliers from './components/Suppliers.vue'
import Categories from './components/Categories.vue'
import Products from './components/Products.vue'
import Sales from './components/Sales.vue'
import PDV from './components/PDV.vue'
import Logout from './components/Logout.vue'

const Routes = {
    '/users': {
        component: Users
    },
    '/suppliers': {
        component: Suppliers
    },
    '/categories': {
        component: Categories
    },
    '/products': {
        component: Products
    },
    '/sales': {
        component: Sales
    },
    '/pdv': {
        component: PDV
    },
    '/logout': {
        component: Logout
    },
}

export default Routes;
