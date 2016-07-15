<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="row">
        <div class="col-xs-6">
          <h4>Fornecedores <small>({{total}})</small></h4>
        </div>
        <div class="col-xs-6">
          <button @click.prevent="newSupplier" class="btn btn-default pull-right">Novo</button>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-6">


          <div class="form-group form-inline">
            <input type="input"  class="form-control" id="keyword" name="keyword" placeholder="Buscar por nome" v-model="keyword">
            <button @click.prevent="search" class="btn btn-default">Buscar</button>
          </div>


          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th width="100%">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="supplier in suppliers">
                <td>{{supplier.id}}</td>
                <td role="button" @click.prevent="edit(supplier)"><a>{{supplier.name}}</a></td>
              </tr>
            </tbody>
          </table>

          <div class="text-center">
            <Pagination :total="total" :itens-per-page="itensPerPage" :page="page" @change-page="onChangePage"></Pagination>
          </div>

        </div>
        <div class="col-md-6">
          <Error></Error>
          <validator name="validateForm">
            <form>
              <div class="form-group">
                <label for="name">Id</label>
                <input type="input" class="form-control" id="id" placeholder="id" v-model="supplier.id" readonly>
              </div>
              <div class="form-group">
                <label for="name">Nome</label>
                <input type="input" class="form-control" id="name" placeholder="Nome" v-model="supplier.name" v-validate:name="{ required: true, minlength: 2 }">
                <div v-show="$validateForm.invalid">
                  <span class="label label-info" v-if="$validateForm.name.required">Campo requerido</span>
                  &nbsp;
                  <span class="label label-info" v-if="$validateForm.name.minlength">Mínimo 2 caracteres</span>
                </div>
                 <label for="name">Endereço</label>
                 <textarea class="form-control" rows="5" id="address" v-model="supplier.address"></textarea>

              </div>
              <button @click.prevent="saveSupplier" class="btn btn-default" :disabled="isLoading||$validateForm.invalid" >Salvar</button>
              <Loading></Loading>
              <button @click.prevent="deleteSupplier" class="btn btn-default pull-right" :disabled="isLoading||supplier.id==null">Apagar</button>
            </form>
          </validator>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
<script>
  import {isLoading,itensPerPage} from '../vuex/getters.js'
  import {showLoading,hideLoading,setError} from '../vuex/actions.js'
  import Loading from '../controls/Loading.vue'
  import Error from '../controls/Error.vue'
  import Pagination from '../controls/Pagination.vue'
  import {URL} from '../config.js'

  export default{
    components: {
     Loading, Error,Pagination
   },
   vuex:{
    getters:{
      isLoading,itensPerPage
    },
    actions:{
      showLoading,hideLoading,setError
    }
  },
  created(){
    this.loadSuppliers(this.keyword);
  },
  data(){
    return{
      keyword:"",
      suppliers: [],
      supplier: {},
      total: 1,
      page: 1
    }
  },
  methods:{
    newSupplier(){
      this.supplier = {}
    },
    saveSupplier(){
      this.showLoading();
      let t = this;
      this.$http.post(`${URL}/supplier`, this.supplier).then(response =>
      {
        t.supplier = response.json()
      },
      error => {
        t.setError(error.body)
      }
      ).finally(function () {
        t.hideLoading();
        t.loadSuppliers();
      })
    },
    edit(supplier){
      this.supplier=supplier
    },
    onChangePage(page){
      this.page = page
      this.loadSuppliers();
    },
    search(){
      this.page = 1
      this.loadSuppliers()
    },
    deleteSupplier(){
      if (confirm(`Deseja apagar "${this.supplier.name}"s ?`)){
          this.showLoading()
          let t = this;
          this.$http.delete(`${URL}/supplier/${this.supplier.id}`).then(response => {
            t.supplier={}
          },
          error => {
             t.setError(error.body)
          }
          ).finally(function () {
            t.hideLoading()
            this.loadSuppliers();
          })
      }
    },
    loadSuppliers(){
      this.showLoading();
      let start = (this.page * this.itensPerPage) - (this.itensPerPage - 1);
      let keywordString=""
      if (this.keyword!=""){
        keywordString=`&q=${this.keyword}`
      }
      let t = this;
      this.$http.get(`${URL}/suppliers?start=${start}&limit=${this.itensPerPage}${keywordString}`).then(
        response => {
          t.suppliers = response.json()
          t.total= response.headers['x-total-count']
        },
        error => {
          t.setError(error.body)
        }
        ).finally(function () {
          t.hideLoading();
        })
      }
    }


  }
</script>
