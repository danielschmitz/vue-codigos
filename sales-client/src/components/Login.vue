<template>
<div class="container">
     <form class="form-signin">
        <h2 class="form-signin-heading">Sistema de Vendas</h2>
        <label for="inputEmail" class="sr-only">Email</label>
        <input type="email" id="inputEmail" class="form-control" placeholder="Email" required autofocus v-model="email">
        <label for="inputPassword" class="sr-only">Password</label>
        <input type="password" id="inputPassword" class="form-control" placeholder="Password" required v-model="password">
        <div class="checkbox">
          <label>
            <input type="checkbox" v-model="create_account"> Create Account
          </label>
        </div>
        <div v-show="create_account">
             <label for="inputName" class="sr-only">Name</label>
             <input type="Name" id="inputName" class="form-control" placeholder="Your Name" required v-model="name">
        </div>
        <br/>
        <button class="btn btn-lg btn-primary btn-block" type="submit">Ir</button>
      </form>
</div>


</template>
<script>export default{
    data() {
        return{
            email: "",
            password: "",
            create_account: false,
            name: ""
        }
    }
}
</script>
<style scoped>
.form-signin {
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
}
.form-signin .form-signin-heading,
.form-signin .checkbox {
  margin-bottom: 10px;
}
.form-signin .checkbox {
  font-weight: normal;
}
.form-signin .form-control {
  position: relative;
  height: auto;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
