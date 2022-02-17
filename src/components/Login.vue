<template>
  <div id="login">
    <h1>{{msg}}</h1>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Login',
  data () {
    return {
      msg: 'This is login page'
    }
  }
}
</script>

<style lang='scss' scoped>
h1{
  color: red;
}
</style>
