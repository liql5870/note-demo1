<template>
  <div id="app">
    <sidebar></sidebar>
    <router-view/>
    <div id="nav">
    </div>

  </div>
</template>
<script >
import sidebar from '@/components/Sidebar.vue'

export default {
  name: 'app',
  components: { sidebar },
  methods: {
  }

}

</script>
<style lang="scss">
@import '//at.alicdn.com/t/font_496303_kqrjhri8l25d0a4i.css';
@import '//at.alicdn.com/t/font_3147561_v7chzyu8hx.css';

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html, body, #app {
  height: 100%;
}

body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  background-color: #eee;
}

a {
  text-decoration: none;
  color: #444;
}

ul, li {
  list-style: none;
}

.btn {
  color: #666;
  font-size: 12px;
  padding: 2px 4px;
  background-color: #fff;
  box-shadow: 0 0 2px 0 #ccc;
  border: none;
  cursor: pointer;
  display: inline-block;
}

#app {
  display: flex;
  align-items: stretch;
}
</style>
