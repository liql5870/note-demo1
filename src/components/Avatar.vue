<template>
  <!--  通过span，里面动态绑定了title属性，值默认是username-->
  <span :title="username">{{ slug }}</span>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
export default {
  data () {
    return {}
  },

  created () {
    this.setUser()
  },

  methods: {
    ...mapActions({
      setUser: 'checkLogin'
    })
  },

  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  }
}

</script>

<style lang='scss' scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #f2b81c;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
}
</style>
