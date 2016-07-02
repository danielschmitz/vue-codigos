<template>
  <div id="app">
    <h1>Plugin</h1>
    <p>{{ valor | real }}
  </div>

</template>

<script>
export default {
  data () {
    return {
      valor: 123456
    }
  }
}
</script>

<style>
body {
  font-family: Helvetica, sans-serif;
}
</style>
