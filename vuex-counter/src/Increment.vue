<template>
    <div>
        <button @click="tryIncrementCounter">+1</button>
        <button @click="decrementCounter">-1</button>
    </div>
    <div>
        <input type="text" v-model="incrementValue">
        <button @click="tryIncrementCounterWithValue">increment</button>
    </div>
    <div v-show="waitMessage">
      Aguarde...
      </div>
</template>

<script>
import { incrementCounter, decrementCounter, incrementCounterWithValue  } from './actions'

export default {
    vuex: {
        actions: {
            incrementCounter,
            decrementCounter,
            incrementCounterWithValue
        }
    },
    data () {
        return{
            incrementValue:0,
            waitMessage:false
        }
    },
    methods: {
      tryIncrementCounter(){
        let t = this;
        this.waitMessage=true;
        this.incrementCounter(function(){
          t.waitMessage=false;
        });
      },
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