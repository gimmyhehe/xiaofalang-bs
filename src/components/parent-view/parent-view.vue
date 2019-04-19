<template>
  <keep-alive :include="cacheListName">
    <router-view ref="child"></router-view>
  </keep-alive>
</template>
<script>
export default {
  name: 'ParentView',
  computed: {
    cacheList () {
      return this.$store.state.app.cacheRoute.cacheList
    },
    cacheListName () {
      return ['ParentView', ...this.cacheList.length ? this.cacheList.map(item => item.components.default.name) : []]
    }
  }
}
</script>
