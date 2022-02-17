<template>
  <div id="notebook-list">
    <h1>{{ msg }}</h1>
    <ul>
      <li>
        <router-link to="/note/1">笔记本1</router-link>
        <router-link to="/note/2">笔记本2</router-link>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
export default {
  name: 'Login',
  data () {
    return {
      msg: '笔记本列表'
    }
  }
}

</script>

<style lang='scss' scoped>

</style>
