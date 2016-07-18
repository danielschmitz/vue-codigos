<template>
      <img src="loading.gif" v-if="isLoading">
</div>
</template>
<script>
  import {isLoading} from '../vuex/getters'
  export default{
    vuex: {
      getters: {
        isLoading
      }
    }
  } 
</script>