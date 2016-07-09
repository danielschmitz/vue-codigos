<template>

    <nav class="navbar  navbar-inverse">
        <div class="container">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1"
                    aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
                <a class="navbar-brand" href="#">Sistema de vendas</a>
            </div>
            <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                <ul class="nav navbar-nav navbar-right">
                    <li v-link-active><a v-link="{ path: '/users' }">Usuários</a></li>
                    <li v-link-active><a v-link="{ path: '/suppliers' }">Fornecedores</a></li>
                    <li v-link-active><a v-link="{ path: '/categories' }">Categorias</a></li>
                    <li v-link-active><a v-link="{ path: '/products' }">Produtos</a></li>
                    <li v-link-active><a v-link="{ path: '/sales' }">Vendas</a></li>
                    <li v-link-active><a v-link="{ path: '/pdv' }">PDV</a></li>
                    <li v-link-active><a v-link="{ path: '/logout' }">Logout</a></li>
                </ul>
            </div>
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>

</template>
<script>
export default{

}
</script>
<style></style>
