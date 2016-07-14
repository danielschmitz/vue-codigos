<template>
    <nav>
        <ul class="pagination ">
            <li>
                <a href="#" aria-label="Previous" v-show="showPreviousButton"  @click.prevent="goPreviousPage()">
                    <span aria-hidden="true" >&laquo;</span>
                </a>
            </li>
            <li><a href="#" @click.prevent="goPreviousPage" v-show="showPreviousButton">{{page-1}}</a></li>
            <li class="active"><a>{{page}}</a></li>
            <li><a href="#" @click.prevent="goNextPage" v-show="showNextButton">{{page+1}}</a></li>
            <li>
                <a href="#" aria-label="Next" v-show="showNextButton" @click.prevent="goNextPage()">
                    <span aria-hidden="true"  >&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>
<script>
  export default{
    props: ["total","page","itensPerPage"],
    computed: {
      totalPages: function(){
        return Math.ceil(this.total / this.itensPerPage)||1
      },
      showNextButton: function(){
       return  this.page!=this.totalPages
      },
      showPreviousButton: function(){
       return this.page!=1
      }
    },
    methods: {
      goNextPage: function(){
        this.$emit('change-page',this.page+1)
      },
      goPreviousPage: function(){
        this.$emit('change-page',this.page-1)
      },
      goFirstPage: function(){
        this.$emit('change-page',1)
      },
      goLastPage: function(){
        this.$emit('change-page',this.totalPages)
      },
      goPage: function(page){
        this.$emit('change-page',page)
      }
    }
  }
</script>
