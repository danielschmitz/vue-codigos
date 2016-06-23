<template>
  <div>
    <button @click="incrementCounter">+1</button>
    <button @click="decrementCounter">-1</button>
  </div>
</template>

<script>
import { incrementCounter, decrementCounter } from './actions'

export default {
    vuex: {
        actions: {
            incrementCounter,decrementCounter
        }
    }
}
</script>