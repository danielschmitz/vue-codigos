<template>

    <div class="panel panel-default">
        <div class="panel-heading">
            <div class="row">
                <div class="col-xs-6">
                    <h4>Categorias <small>({{getTotalCategories}})</small></h4>
                </div>
                <div class="col-xs-6">
                    <button @click.prevent="newCategory" class="btn btn-default pull-right">Novo</button>
                </div>
            </div>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-6">
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th width="100%">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="category in getCategories">
                                <td>{{category.id}}</td>
                                <td>{{category.name}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="col-md-6">
                    <Error></Error>
                    <form>
                         <div class="form-group">
                            <label for="name">Id</label>
                            <input type="input" class="form-control" id="id" placeholder="id" v-model="getCategory.id" readonly >
                        </div>
                        <div class="form-group">
                            <label for="name">Nome</label>
                            <input type="input" class="form-control" id="name" placeholder="Nome" v-model="getCategory.name">
                        </div>
                        <button @click.prevent="trySaveCategory" class="btn btn-default" :disabled="isLoading">Salvar</button>
                        <Loading></Loading>
                    </form>
                </div>
            </div>
        </div>
    </div>
 </div>
</template>
<script>
import {setCategory,saveCategory,loadCategories} from '../vuex/actions.js'
import {getCategory,getCategories,getTotalCategories,isLoading} from '../vuex/getters.js'
import Loading from '../controls/Loading.vue'
import Error from '../controls/Error.vue'

export default{
    components: {
			Loading, Error
		},
    vuex:{
        actions:{
            setCategory,saveCategory,loadCategories
        },
        getters:{
            getCategory,isLoading,getCategories,getTotalCategories
        }
    },
    created(){
        this.loadCategories();
    },
    methods:{
        newCategory(){
            this.setCategory({});
        },
        trySaveCategory(){
            this.saveCategory();
        }
    }


}</script>
