<template>
<h4>Add Post</h4>
  <validator name="validateForm">
    <form class="col s12">

      <div class="row">

        <div class="input-field col s12">
          <input id="login" type="text" v-model="post.title" v-validate:login="{ required: false, minlength: 3 }" />
          <label for="login">Title</label>
          <div>
            <span class="chip red lighten-5 right" v-if="$validateForm.login.required">Campo requerido</span>
            <span class="chip red lighten-5 right" v-if="$validateForm.login.minlength">Mínimo 4 caracteres</span>
          </div>
        </div>
        <div class="input-field col s12">
           <textarea id="textarea1" class="materialize-textarea" v-model="post.text"></textarea>
          <label for="textarea1">Texto</label>
        </div>
      </div>
      <div class="input-field col s12">
        <button class="waves-effect waves-light btn right" @click="add" v-if="$validateForm.valid">Enviar</button>
      </div>
    </form>
  </validator>

   <div v-show="showProgress" class="progress">
      <div class="indeterminate"></div>
  </div>

</template>
<script>
 import Auth from './Auth.js'

export default{
  data (){
    return{
      post:{
        title:"",
        token:"",
        text:"",
        user:{
            _id:""
        }
      }
    }
  },
  created:function(){
    let login = Auth.getLogin();
    if (login.token==null){
      this.$router.go("/login")
    }else{
      this.post.user._id=login.id;
      this.post.token=login.token;
    }
  },
  methods:{
    add:function(){
      this.$http.post('/api/posts',this.post).then(function(response){
        this.$router.go("/home");
      },function(error){
        //console.log(error)
        Materialize.toast('Error: ' + error.data.message, 3000)
      });
    }
  }

}

</script>