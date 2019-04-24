<template>
  <el-menu class="navbar" mode="horizontal">
    <!-- <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger> -->
    <!-- <levelbar></levelbar> -->

    <!-- <screenfull class='screenfull'></screenfull> -->
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>
    <router-link to="/"><p class="title">管理后台</p></router-link>
    <!-- <RouterBreadcrumb class="breadcrumb-container"></RouterBreadcrumb> -->
    <!-- <Setting class="right-menu"></Setting> -->
    <div class="right-menu">
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="content">
          <div class="avatar-wrapper">
            {{user_info && user_info.username}}
            <i class="el-icon-caret-bottom"></i>
          </div>
        </div>
        <el-dropdown-menu class="user-dropdown" slot="dropdown">
          <router-link to="/page/modifyPassword"><el-dropdown-item>{{$t('module.modifyPassword')}}</el-dropdown-item></router-link>
          <span @click="logout"><el-dropdown-item divided>{{$t('logout')}}</el-dropdown-item></span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
// import RouterBreadcrumb from '@/components/RouterBreadcrumb'
// import Screenfull from '@/components/Screenfull'
// import Sticky from '@/components/Sticky'
// import Setting from '@/components/Setting'

export default {
  name: 'navBar',
  components: {
    // RouterBreadcrumb,
    Hamburger
    // Screenfull,
    // Sticky,
    // Setting
  },
  computed: {
    ...mapGetters([
      'sidebar', 'user_info',
      'sysNotice'
    ])
  },
  data () {
    return {
      nums: {
        withdraw: 0,
        withdrawFinance: 0,
        charge: 0,
        rewardProgram: 0,
        dailyWage: 0,
        dividend: 0,
        commission: 0
      },
      preventPlayAudio: Boolean(this.$store.state.user.sysAudio.preventPlayAudio),
      intervalInfo: null
    }
  },
  methods: {
    handleChangePrevent () {
      this.$store.commit('SET_PREVENTPLAYAUDIO', this.preventPlayAudio)
    },
    toggleSideBar () {
      this.$store.dispatch('ToggleSideBar')
    },
    logout () {
      let loadingInstance = this.$loading()
      this.$store.dispatch('LogOut').then(() => {
        loadingInstance.close()
        location.reload()
      }).catch(() => {
        loadingInstance.close()
      })
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        1: '正常',
        2: '#3A71A8',
        3: '#C03639'
      }
      return statusMap[status]
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.navbar {
  position: sticky;
  top: 0;
  width: 100%;
  min-height: 50px;
  line-height: 50px;
  // position: fixed;
  background: #fff;
  z-index: 100;
  border-radius: 0px !important;
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
  }
  .el-badge__content{
    top: 10px;
  }
  .el-badge{
    margin: 0px 15px;
  }

  .right-menu {
    float: right;
    height: 100%;
    &:focus{
      outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .avatar-container {
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        position: relative;
        font-size: 16px;
        .el-icon-caret-bottom {
          position: absolute;
          right: -15px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
  .title {
    float: left;
    width: 130px;
    text-align: center;
    font-size: 26px;
    font-weight: 600;
  }
  .el-checkbox{
    .el-checkbox__label{
        padding: 2px;
    }
  }
}
</style>
