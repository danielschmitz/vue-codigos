<template>
  <div v-show="showProgress" class="progress">
    <div class="indeterminate"></div>
  </div>
  <div class="row" v-for="post in posts">
    <div class="col s12">
      <div class="card  blue lighten-5">
        <div class="card-content black-text">
          <span class="card-title">{{post.title}}</span>
          <p>{{post.text}}</p>
        </div>
        <div class="card-action">
          <span><i class="material-icons">perm_identity</i> {{post.user.name}}</span>
          <a href="#" @click="remove(post)" class="right blue-text" v-if="login.token!=null && login.id==post.user._id">Remove</a>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import Auth from './auth.js'
  export default {
    data (){
      return {
        posts: null,
        showProgress:true,
        login:Auth.getLogin()
      }
    },
    created: function(){
      //console.log(Auth.getLogin());
      this.showProgress=true;
     this.loadPosts();
    },
    methods: {
      remove: function(post){
        post.token = Auth.getLogin().token;
        this.$http.delete('/api/posts/'+post._id,post).then(function(response){
          this.loadPosts();
      },function(error){
        //console.log(error)
        Materialize.toast('Error: ' + error.data.message, 3000)
      });
      },loadPosts:function(){
       this.$http.get('/api/posts').then(function(response){
          this.showProgress=false
          this.posts = response.data
          console.log(this.posts);
      },function(error){
          this.showProgress=false
          Materialize.toast('Error: ' + error.statusText, 3000)
      })
    }
   }
  }
</script>