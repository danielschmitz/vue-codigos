<template>
	<div class="container">
	<div class="row">
			<validator name="validation">
				<form class="form-signin" novalidate >
					<h2 class="center-block">Sales System Login</h2>

					<label for="email" class="sr-only">Email</label>
					<input type="email" id="email"
					class="form-control"
					placeholder="Email"
					autofocus
					v-model="user.email"
					v-validate:email="{ minlength: 4 }"
					>

					<label for="inputPassword" class="sr-only">Password</label>

					<input type="password" id="inputPassword"
					class="form-control"
					placeholder="Password"
					required v-model="user.password"
					v-validate:password="{ minlength: 6 }">

					<div class="checkbox">
						<label>
							<input type="checkbox"
							v-model="user.create_account">
							Create Account
						</label>
					</div>
					<div v-if="user.create_account">
						<label for="inputName" class="sr-only">Name</label>
						<input type="Name" id="inputName"
						class="form-control"
						placeholder="Your Name"
						v-model="user. name"
						v-validate:name="{ minlength: 4 }"
						>

						<label for="inputName" class="sr-only">Role</label>
						<div class="radio">
							<label>
								<input type="radio" name="optionsRadios"
								id="optionsRadios1"
								value="Employee"
								checked v-model="user.role">
								Employee
							</label>
						</div>
						<div class="radio">
							<label>
								<input type="radio" name="optionsRadios"
								id="optionsRadios2"
								value="Customer"
								v-model="user.role">
								Customer
							</label>
						</div>
					</div>
					<br/>
					<button class="btn btn-lg btn-primary btn-block"
					@click.prevent="tryLogin"
					:disabled="!$validation.valid||isLoading">
					Ir</button>

					<loading></loading>

					<br/>

					<div  class="alert alert-danger"
					v-show="$validation.email.touched&&$validation.email.minlength">
					Email too short</div>

					<div class="alert alert-danger"
					v-show="$validation.password.touched&&$validation.password.minlength">
					Password too short</div>

					<div class="alert alert-danger"
					v-show="$validation.name&&$validation.name.touched&&$validation.name.minlength">
					Name too short</div>

				</form>
			</validator>
		</div>
	</div>
</template>
<script>
	import {setLogin} from '../vuex/actions'
	import Loading from '../controls/Loading.vue'
	import {isLoading} from '../vuex/getters'

	export default{
		components: {
			Loading
		},
		data() {
			return{
				user: {
					email: "",
					password: "",
					create_account: false,
					name: "",
					role: ""
				}
			}
		},
		methods: {
			tryLogin(){
				this.setLogin(this.user);
			}
		},
		vuex: {
			actions: {
				setLogin
			},
			getters: {
				isLoading
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
