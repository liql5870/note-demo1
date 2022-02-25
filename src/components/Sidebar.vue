<template>
  <div id="sidebar">
    <!--    引入了avatar组件-->
    <avatar></avatar>
    <!--    使用的是阿里的iconfont资源库，使用了fontcss的引入方法-->
    <!--    首先在根组件中引入了三个icons 并且通过router-link进行包裹这几个包裹-->
    <div class="icons">
      <router-link to="/note" title="笔记"><i class="iconfont icon-note"></i></router-link>
      <router-link to="/notebooks" title="笔记本"><i class="iconfont icon-notebook"></i></router-link>
      <router-link to="/trash" title="回收站"><i class="iconfont icon-trash"></i></router-link>
    </div>
    <div class="logout">
      <!--      同样是使用了图标，并且调用了logout方法-->
      <i class="iconfont icon-logout" @click="logout" title="退出"></i>
    </div>
  </div>
</template>

<script>
import avatar from '@/components/Avatar.vue'
import { mapActions } from 'vuex'

export default {
  components: {
    avatar
  },
  methods: {
    // ...mapActions(['logout']),
    //
    // onLogout () {
    //   this.logout({ path: '/login' })
    // }
    logout () {
      return this.$router.push({ path: './login' })
    }
  }
}
</script>

<style lang="scss" scoped>

#sidebar {
  //使用了相对定位，并且宽度固定，并设置里面的文本对齐。
  position: relative;
  width: 56px;
  text-align: center;
  background-color: #efabc4;
  //#2c333c
  .icons {
    margin-top: 15px;

    > a {
      padding: 12px 0;
      display: block;
      //router-link-active 是vue自动绑定上去的，帮助去绑定在页面中
      &.router-link-active {
        background-color: #d9b2c1;
      }
    }

  }

  .logout {
    position: absolute;
    bottom: 20px;
    width: 100%;
    text-align: center;
    cursor: pointer;

  }

  .iconfont {
    color: #fff;
  }
}

</style>
