<template>
  <div class="note-sidebar">
    <span class="btn add-note" @click="onAddNote">添加笔记</span>
    <el-dropdown class="notebook-title" @command="handleCommand" placement="bottom">
      <span class="el-dropdown-link">
        {{ curBook.title }} <i class="iconfont icon-down"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="notebook in notebooks" :key="notebook.id" :command="notebook.id">{{ notebook.title }}</el-dropdown-item>
        <el-dropdown-item command="trash">回收站</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <div class="menu">
      <div>更新时间</div>
      <div>标题</div>
    </div>
    <ul class="notes">
      <li v-for="note in notes" :key="note.id">
        <router-link :to="`/note?noteId=${note.id}&notebookId=${curBook.id}`">
          <span class="date">{{ note.updatedAtFriendly }}</span>
          <span class="title">{{ note.title }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import Notebooks from '@/apis/notebooks'
import Notes from '@/apis/notes'
import Bus from '@/helpers/bus'
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  created () {
    this.getNotebooks()
      .then(() => {
        this.setCurBook({ curBookId: this.$route.query.notebookId })
        return this.getNotes({ notebookId: this.curBook.id })
      }).then(() => {
        this.setCurNote({ curNoteId: this.$route.query.noteId })
      })
  },

  data () {
    return {}
  },

  computed: {
    ...mapGetters([
      'notebooks',
      'notes',
      'curBook'
    ])
  },

  methods: {
    ...mapMutations([
      'setCurBook',
      'setCurNote'
    ]),

    ...mapActions([
      'getNotebooks',
      'getNotes',
      'addNote'
    ]),

    handleCommand (notebookId) {
      if (notebookId === 'trash') {
        return this.$router.push({ path: '/trash' })
      }
      this.$store.commit('setCurBook', { curBookId: notebookId })
      this.getNotes({ notebookId })
    },

    onAddNote () {
      this.addNote({ notebookId: this.curBook.id })
    }

  }
}

</script>

<style lang='scss' scoped>
.note-sidebar {
  position: relative;
  width: 290px;
  border-right: 1px solid #ccc;
  background-color: #eee;

  .add-note {
    position: absolute;
    right: 5px;
    top: 12px;
    color: #666;
    font-size: 12px;
    padding: 2px 4px;
    box-shadow: 0 0 2px 0 #ccc;
    border: none;
    z-index: 1;
  }

  .notebook-title {
    font-size: 18px;
    font-weight: normal;
    color: #333;
    height: 45px;
    line-height: 45px;
    text-align: center;
    border-bottom: 1px solid #ccc;
    background-color: #f7f7f7;
    display: block;
  }

  .el-dropdown-link {
    cursor: pointer;
  }

  .el-dropdown-menu__item {
    width: 200px;
  }

  .menu {
    display: flex;

    div {
      font-size: 12px;
      padding: 2px 10px;
      flex: 1;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;

      &:last-child {
        border-right: none;
      }
    }

    .iconfont {
      font-size: 10px;
    }
  }

  .notes {
    li {

      &:nth-child(odd) {
        background-color: #f2f2f2;
      }

      a {
        display: flex;
        padding: 3px 0;
        font-size: 12px;
        border: 2px solid transparent;
      }

      .router-link-exact-active {
        border: 2px solid #81c0f3;
        border-radius: 3px;
      }

      span {
        padding: 0 10px;
        flex: 1;
      }
    }
  }
}

</style>
