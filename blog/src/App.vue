<template>
  <div id="app">
  
    <nav>
      <div class="nav-wrapper">
        <a href="#" class="brand-logo">Blog</a>
        <ul id="nav-mobile" class="right hide-on-med-and-down">
          <li v-link-active><a v-link="{ path: '/home' }">Home</a></li>
          <li v-link-active><a v-link="{ path: '/login' }">Login</a></li>
          <li v-link-active><a v-link="{ path: '/addPost' }">AddPost</a></li>
          <li v-link-active><a v-link="{ path: '/logout' }">Logout</a></li>
        </ul>
      </div>
    </nav>
    <br/>
    <div class="container">
     <router-view></router-view>
  </div>
  
</template>

<script>

export default {
  data () {
    return {
      msg: 'Hello Vue!'      
    }
  }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
</style>