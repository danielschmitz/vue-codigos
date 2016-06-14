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
              <!-- <a href="#">This is a link</a> -->
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
        showProgress:true
      }
    },
    created: function(){
      console.log(Auth);
      this.showProgress=true;
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
</script>