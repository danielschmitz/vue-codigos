<template>

  <validator name="validateForm">
    <form class="col s12">

      <div class="row">

        <div class="input-field col s12">
          <i class="material-icons prefix">account_circle</i>
          <input id="login" type="text" v-model="user.login" v-validate:login="{ required: false, minlength: 4 }" />
          <label for="login">Login</label>
          <div>
            <span class="chip red lighten-5 right" v-if="$validateForm.login.required">Campo requerido</span>
            <span class="chip red lighten-5 right" v-if="$validateForm.login.minlength">Mínimo 4 caracteres</span>
          </div>
        </div>

        <div class="input-field col s12">
          <i class="material-icons prefix">vpn_key</i>
          <input id="password" type="password" v-model="user.password" v-validate:password="{ required: false, minlength: 4 }" />
          <label for="password">Password</label>
          <div>
            <span class="chip red lighten-5 right" v-if="$validateForm.password.required">Campo requerido</span>
            <span class="chip red lighten-5 right" v-if="$validateForm.password.minlength">Mínimo 4 caracteres</span>
          </div>
        </div>

        <div class="input-field col s12 m3">
          <input type="checkbox" id="createaccount" v-model="user.isNew" />
          <label for="createaccount">Create Account?</label>
        </div>

        <div class="input-field col s12 m9" v-show="user.isNew">
          <input id="name" type="text" v-model="user.name" />
          <label for="name">Your Name</label>
        </div>

      </div>

      <div class="input-field col s12">
        <button class="waves-effect waves-light btn right" @click="doLogin" v-if="$validateForm.valid">Enviar</button>
      </div>

    </form>
  </validator>

   <div v-show="showProgress" class="progress">
      <div class="indeterminate"></div>
  </div>

</template>
<script>

import Auth from "./auth.js"

  export default{
    data () {
      return {
        showProgress:false,
        user: {
          name:"",
          password:"",
          login:"",
          isNew:false
      }
    }
  },
  created: function(){
    let login = Auth.getLogin()
    console.log(login)
    if (login.token!=null){
      this.$router.go('/home');
    }
  },
  methods:{
    doLogin:function(){
      this.showProgress=true
      this.$http.post('/api/login',this.user).then(function(response){
        
        this.showProgress=false
      
        Auth.setLogin(response.data)

        this.$router.go("/home")
        
      },function(error){
        this.showProgress=false
        //console.log(error)
        Materialize.toast('Error: ' + error.data, 3000)
      });
    }
  }
}
</script>