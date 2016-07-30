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

<!-- Modal new/edit -->

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

          <div class="row">

            <div class="form-group col-xs-12 col-sm-4">
              <label for="id">Id</label>
              <input type="input" class="form-control" id="id" placeholder="id" v-model="product.id" readonly>
            </div>

            <div class="form-group col-xs-12 col-sm-8">
              <label for="code">Código</label>
              <input type="input" class="form-control" id="code" placeholder="id" v-model="product.code">
            </div>

          </div>    

          <div class="row">

            <div class="form-group col-xs-12 col-sm-6">
              <label for="idCatgory">Categoria</label>
              <select id="idCategory" class="form-control">
               <option v-for="category in categories">
                {{category.name}}
               </option>
              </select>
              {{categories|json}}

            </div>

            <div class="form-group col-xs-12 col-sm-6">
             <label for="idSupplier">Fornecedor</label>
              <select class="form-control">
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
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

          <div class="row">

            <div class="form-group col-xs-12 col-sm-6">
              <label for="quantity">Quantidade em estoque</label>
              <input type="input" class="form-control" id="quantity" placeholder="Quantidade" v-model="product.quantity">
            </div>

            <div class="form-group col-xs-12 col-sm-6">
              <label for="minQuantity">Quantidade Mínima</label>
              <input type="input" class="form-control" id="minQuantity" placeholder="Quantidade Mínima" v-model="product.minQuantity">
            </div>

          </div>


          <div class="row">

            <div class="form-group col-xs-12 col-sm-6">
              <label for="price">Preço</label>
              <input type="input" class="form-control" id="price" placeholder="Preço" v-model="product.price">
            </div>

            <div class="col-xs-12 col-sm-6">
             <div class="checkbox">
              <label>
                <input type="checkbox" v-model="product.active">
                Ativo?
              </label>
            </div>
          </div>

        </div>


        <div class="row">
         <div class="form-group col-xs-12">
          <label for="description">Descrição</label>
          <textarea class="form-control" rows="5" id="description" v-model="product.description"></textarea>
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

  //services
  import CategoryService from '../services/Category.js'

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

     CategoryService.getAll().then(
      result=>{
        console.log("categories",result.json)
        this.$set('categories',result.json())
      },
      error=>{
        console.log(error)
      })

  },
  ready(){
    //temp
    $('#productModal').modal('show')
  },
  data(){
    return{
      keyword:"",
      products: [],
      categories: [],
      product: {
        id:null,
        idCategory: null,
        idSupplier: null,
        code:null,
        name:null,
        quantity: null,
        minQuantity: null,
        price: null,
        description: null,
        active: null
      },
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
