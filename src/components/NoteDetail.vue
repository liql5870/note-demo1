<template>
  <div id="note-detail">
    <h1>{{msg}} : {{ $route.params.noteId }}</h1>
  </div>
</template>

<script  lang='ts'>
export default {
  name: 'Login',
  data () {
    return {
      msg: '笔记详情页'
    }
  }
}

</script>

<style lang='scss' scoped>

</style>
