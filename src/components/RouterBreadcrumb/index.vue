<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index)  in levelList" :key="item.path" v-if='item.name'>
        <span v-if='item.redirect==="noredirect"||index==levelList.length-1' class="no-redirect">{{generateTitle(item)}}</span>
        <router-link v-else :to="item.redirect||item.path">{{generateTitle(item)}}</router-link>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
export default {
  created () {
    this.getBreadcrumb()
  },
  data () {
    return {
      levelList: null
    }
  },
  watch: {
    $route () {
      this.getBreadcrumb()
    }
  },
  methods: {
    generateTitle (item) {
      const hasKey = this.$te('module.' + item.name)
      const translatedTitle = this.$t('module.' + item.name) // $t :this method from vue-i18n, inject in @/lang/index.js

      if (hasKey) {
        return translatedTitle
      }
      return item.name
    },
    getBreadcrumb () {
      let matched = this.$route.matched.filter(item => item.name)
      const first = matched[0]
      if (first && first.name !== 'dashboard') {
        matched = [{ name: 'Home', path: '/' }].concat(matched)
      }
      this.levelList = matched
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .app-breadcrumb.el-breadcrumb {
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    .no-redirect {
      color: #97a8be;
      cursor: text;
    }
  }
</style>
