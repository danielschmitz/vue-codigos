<template>
    <div>
        <button @click="incrementCounter">+1</button>
        <button @click="decrementCounter">-1</button>
    </div>
    <div>
        <input type="text" v-model="incrementValue">
        <button @click="tryIncrementCounterWithValue">increment</button>
    </div>
    <div v-show="getShowWaitMessage">
      Aguarde...
      </div>
</template>

<script>
import { incrementCounter, decrementCounter, incrementCounterWithValue  } from './actions'
import {getShowWaitMessage} from './getters'

export default {
    vuex: {
        actions: {
            incrementCounter,
            decrementCounter,
            incrementCounterWithValue
        },
        getters: {
          getShowWaitMessage
        }
    },
    data () {
        return{
            incrementValue:0
          }
    },
    methods: {
        tryIncrementCounterWithValue(){
            try{
                this.incrementCounterWithValue(this.incrementValue)
            } catch (error) {
                alert(error)
            }
        }
    }
}
</script>