<template>
  <div v-show="getShowWaitMessage">
    Aguarde...
  </div>
</template>
<script>
import {getShowWaitMessage} from './getters'

export default{
  vuex: {
        getters: {
          getShowWaitMessage
        }
    }
  }
</script>