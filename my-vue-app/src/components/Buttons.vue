<template>

<br/>

  <a @click="callUsers"
    class="waves-effect waves-light btn">Call Users</a>
  
  <a @click="countUsers" 
  class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>Count Users</a>
  
  <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>

<hr/>

<ul>
  <li v-for="user in users">{{user.name}}</li>
</ul>


  </template>
<script>
  export default{
     data() {
       return{
          users: null
       }
     },
      methods: {
        callUsers: function(){
             this.$http({url: '/users.json', method: 'GET'}).then(function (response) {
                this.users = response.data
            }, function (response) {
                Materialize.toast('Error: ' + response.statusText, 3000)
            });
        },
        countUsers: function(){
          Materialize.toast(this.users.length, 1000)
        }
      }
    }
</script>