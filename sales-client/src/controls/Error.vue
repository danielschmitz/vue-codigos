<template>
  <div class="alert alert-danger"
  v-show="hasError">
  {{getError}}</div>
</template>
<script>
import {getError,hasError} from '../vuex/getters'

  export default{
    vuex: {
      getters: {  
        getError,hasError
      }
    }
  }
</script>