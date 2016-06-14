<template>
  Logout
</template>
<script>
  import Auth from './auth.js'
  export default {
    data (){
      return {

      }
    },
    created:function(){
      Auth.logout();
      console.log(Auth.getLogin());
      this.$router.go('/home');
    }
  }
</script>
