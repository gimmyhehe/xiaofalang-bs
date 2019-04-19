
<template>
  <div class="app-setting-operation">
    <div class="operation-wrapper">
     <el-tooltip :content="$t('module.accountRecovery')" placement="bottom" effect="light">
        <router-link to="/page/user/recovery">
          <el-badge :value="1">
            <i class="iconfont icon-recycling"></i>
          </el-badge>
        </router-link>
      </el-tooltip>
      <el-tooltip content="存款审核" placement="bottom" effect="light">
        <el-badge :value="1">
          <i class="iconfont icon-deposit"></i>
          </el-badge>
        </el-tooltip>
      <el-tooltip content="取消审核" placement="bottom" effect="light">
        <el-badge :value="1">
          <i class="iconfont icon-bell"></i>
        </el-badge>
      </el-tooltip>
    </div>
    <el-dropdown class="setting-container" trigger="click">
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
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'settings',
  props: {
    avatar: {
      type: String
    }
  },
  data () {
    return {
    }
  },
  methods: {
    logout () {
      let loadingInstance = this.$loading()
      this.$store.dispatch('LogOut').then(() => {
        loadingInstance.close()
        location.reload()
      }).catch(() => {
        loadingInstance.close()
      })
      // this.$store.dispatch('LogOut').then(() => {
      //   location.reload()  // 为了重新实例化vue-router对象 避免bug
      // })
    }
  },
  computed: {
    ...mapGetters([
      'user_info'
    ])
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.app-setting-operation {
  .operation-wrapper {
    position: absolute;
    right: 90px;
    i {
      cursor: pointer;
      padding: 0 25px;
      font-size: 20px;
    }
    .el-badge__content.is-fixed {
      top: 13px;
      right: 24px;
    }
  }
  .setting-container {
    height: 50px;
    display: inline-block;
    position: absolute;
    right: 35px;
    .content {
      display: flex;
    }

    .avatar-wrapper {
      cursor: pointer;
      position: relative;
      font-size: 16px;
      .user-avatar {
        padding: 10px;
        .svg {
          width: 1em;
          height: 1em;
          vertical-align: -0.15em;
          fill: currentColor;
          overflow: hidden;
        }
      }

      .el-icon-caret-bottom {
        position: absolute;
        right: -20px;
        top: 18px;
        font-size: 14px;
      }
    }
  }
}

</style>
