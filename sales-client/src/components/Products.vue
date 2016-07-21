<template>
  <div class="panel panel-default">
    <div class="panel-heading">
      <div class="row">
        <div class="col-xs-6">
          <h4>Produtos <small>({{total}})</small></h4>
        </div>
        <div class="col-xs-6">
          <button @click.prevent="newProduct" class="btn btn-default pull-right">Novo</button>
        </div>
      </div>
    </div>
    <div class="panel-body">
      <div class="row">
        <div class="col-md-12">


          <div class="form-group form-inline">
            <input type="input"  class="form-control" id="keyword" name="keyword" placeholder="Buscar por nome" v-model="keyword">
            <button @click.prevent="search" class="btn btn-default">Buscar</button><Loading></Loading>
          </div>


          <table class="table table-bordered table-hover">
            <thead>
              <tr>
                <th>Id</th>
                <th width="100%">Nome</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products">
                <td>{{product.id}}</td>
                <td role="button" @click.prevent="edit(product)"><a>{{product.name}}</a></td>
              </tr>
            </tbody>
          </table>

          <div class="text-center">
            <Pagination :total="total" :itens-per-page="itensPerPage" :page="page" @change-page="onChangePage"></Pagination>
          </div>

        </div>
      </div>
    </div>
  </div>
</div>

<!-- MOdal new/edit -->

<div id="productModal" class="modal fade" tabindex="-1" role="dialog">
  <div class="modal-dialog">

    <div class="modal-content">
     <div class="modal-header">
      <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
      <h4 class="modal-title">{{product.id==null?'Novo':'Editar'}} Produto</h4>
    </div>
    <div class="modal-body">
      <Error></Error>
      <validator name="validateForm">
        <form>
          <div class="form-group">
            <label for="name">Id</label>
            <input type="input" class="form-control" id="id" placeholder="id" v-model="product.id" readonly>
          </div>
          
          <div class="form-group">
            <label for="name">Nome</label>
            <input type="input" class="form-control" id="name" placeholder="Nome" v-model="product.name" v-validate:name="{ required: true, minlength: 2 }">
            <div v-show="$validateForm.invalid">
              <span class="label label-info" v-if="$validateForm.name.required">Campo requerido</span>
              &nbsp;
              <span class="label label-info" v-if="$validateForm.name.minlength">Mínimo 2 caracteres</span>
            </div>
          </div>

               <div class="form-group">
            <label for="name">Nome</label>
            <input type="input" class="form-control" id="name" placeholder="Nome" v-model="product.name" v-validate:name="{ required: true, minlength: 2 }">
            <div v-show="$validateForm.invalid">
              <span class="label label-info" v-if="$validateForm.name.required">Campo requerido</span>
              &nbsp;
              <span class="label label-info" v-if="$validateForm.name.minlength">Mínimo 2 caracteres</span>
            </div>
          </div>




        
        </form>
      </validator>
    </div>
    <div class="modal-footer">
      <button @click.prevent="saveProduct" class="btn btn-default" :disabled="isLoading||$validateForm.invalid" >Salvar</button>
      <Loading></Loading>
    </div>
  </div><!-- /.modal-content -->
</div><!-- /.modal-dialog -->
</div><!-- /.modal -->


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
    this.loadProducts(this.keyword)
  },
  data(){
    return{
      keyword:"",
      products: [],
      product: {},
      total: 1,
      page: 1
    }
  },
  methods:{
    newProduct(){
      this.product = {}
      $('#productModal').modal('show')
    },
    saveProduct(){
      this.showLoading();
      let t = this;
      this.$http.post(`${URL}/product`, this.product).then(response =>
      {
        t.product = response.json()
      },
      error => {
        t.setError(error.body)
      }
      ).finally(function () {
        t.hideLoading();
        t.loadProducts();
      })
    },
    edit(product){
      this.product=product
    },
    onChangePage(page){
      this.page = page
      this.loadProducts();
    },
    search(){
      this.page = 1
      this.loadProducts()
    },
    deleteProduct(){
      if (confirm(`Deseja apagar "${this.product.name}"s ?`)){
        this.showLoading()
        let t = this;
        this.$http.delete(`${URL}/product/${this.product.id}`).then(response => {
          t.product={}
        },
        error => {
         t.setError(error.body)
       }
       ).finally(function () {
        t.hideLoading()
        this.loadProducts();
      })
     }
   },
   loadProducts(){
    this.showLoading();
    let start = (this.page * this.itensPerPage) - (this.itensPerPage - 1);
    let keywordString=""
    if (this.keyword!=""){
      keywordString=`&q=${this.keyword}`
    }
    let t = this;
    this.$http.get(`${URL}/products?start=${start}&limit=${this.itensPerPage}${keywordString}`).then(
      response => {
        t.products = response.json()
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
