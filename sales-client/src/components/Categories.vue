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


                    <div class="form-group form-inline">
                        <input type="input"  class="form-control" id="keyword" name="keyword" placeholder="Buscar por nome" v-model="keyword">
                        <button @click.prevent="trySearch" class="btn btn-default">Buscar</button>
                    </div>


                    <table class="table table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th width="100%">Nome</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="category in getCategories">
                                <td>{{category.id}}</td>
                                <td role="button" @click.prevent="tryEdit(category)"><a>{{category.name}}</a></td>
                            </tr>
                        </tbody>
                    </table>

                    <div class="text-center">
                        <Pagination :total="getTotalCategories" :itens-per-page="getItensPerPage" :page="getCategoryPage" @change-page="onChangePage"></Pagination>
                    </div>

                </div>
                <div class="col-md-6">
                    <Error></Error>
                    <form>
                        <div class="form-group">
                            <label for="name">Id</label>
                            <input type="input" class="form-control" id="id" placeholder="id" v-model="getCategory.id" readonly>
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
import {setCategory,saveCategory,loadCategories,changeCategoriesPage} from '../vuex/actions.js'
import {getCategory,getCategories,getTotalCategories,isLoading,getCategoryPage,getItensPerPage} from '../vuex/getters.js'
import Loading from '../controls/Loading.vue'
import Error from '../controls/Error.vue'
import Pagination from '../controls/Pagination.vue'

export default{
    components: {
			Loading, Error,Pagination
		},
    vuex:{
        actions:{
            setCategory,saveCategory,loadCategories,changeCategoriesPage
        },
        getters:{
            getCategory,isLoading,getCategories,getTotalCategories,getCategoryPage,getItensPerPage
        }
    },
    created(){
        this.loadCategories(this.keyword);
    },
    data(){
        return{
            keyword:""
        }
    },
    methods:{
        newCategory(){
            this.setCategory({});
        },
        trySaveCategory(){
            this.saveCategory();
        },
        tryEdit(category){
             this.setCategory(category);
        },
        onChangePage(page){
          this.changeCategoriesPage(page)
        },
        trySearch(){
            this.loadCategories(this.keyword)
        }
    }


}</script>
