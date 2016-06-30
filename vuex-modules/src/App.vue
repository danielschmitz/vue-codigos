<template>
  <div id="app">
    <button v-show="!isLogged" @click="doLogin">Login</button>
    <div v-show="isLogged">
        <button  @click="doLogout"> Logout</button>
        <button  > Users</button>
        <button  @click="setProducts">Products</button>
        <button  > Suppliers</button>

        <br>

        <div v-show="hasProducts">
            <h4>Products</h4>
            <table border="1">
                <thead>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>quantity</td>
                        </tr>
                </thead>
                <tbody>
                    <tr v-for="p in getProducts">
                        <td>{{p.id}}</td>
                        <td>{{p.name}}</td>
                        <td>{{p.quantity}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
  </div>
</template>

<script>
import store from './store'
import {doLogin,doLogout} from './modules/login/actions'
import {setProducts} from './modules/product/actions'
import {isLogged} from './modules/login/getters'
import {hasProducts,getProducts} from './modules/product/getters'

export default {
  data () {
    return {
      msg: 'Hello Vue!'
    }
  },
  vuex :{
      actions :{
          doLogin,doLogout,
          setProducts
      },
      getters : {
          isLogged,
          hasProducts,getProducts
      }
  },
  store
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
