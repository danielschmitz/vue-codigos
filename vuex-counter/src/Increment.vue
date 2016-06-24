<template>
    <div>
        <button @click="incrementCounter">+1</button>
        <button @click="decrementCounter">-1</button>
    </div>
    <div>
        <input type="text" v-model="incrementValue">
        <button @click="tryIncrementCounterWithValue">increment</button>
    </div>
    <please-wait></please-wait>
</template>

<script>
import { incrementCounter, decrementCounter, incrementCounterWithValue  } from './actions'
import PleaseWait from './PleaseWait.vue'

export default {
    vuex: {
        actions: {
            incrementCounter,
            decrementCounter,
            incrementCounterWithValue
        }
    },
    components:{
      PleaseWait
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