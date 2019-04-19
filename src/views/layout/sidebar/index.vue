<template>
  <div>
    <el-menu
      mode="vertical"
      :show-timeout="200"
      background-color="#324157"
      text-color="#fff"
      active-text-color="#ffd04b"
      unique-opened
      :default-active="active"
      :collapse="isCollapse">
      <sidebar-item :routes='permission_routers'></sidebar-item>

    </el-menu>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
export default {
  name: 'sidebar',
  components: {
    SidebarItem
  },
  computed: {
    ...mapGetters([
      'permission_routers',
      'sidebar'
    ]),
    isCollapse () {
      return !this.sidebar.opened
    },
    active () {
      return this.$route.meta.activeSideBar || this.$route.path
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    }
  }
}
</script>
