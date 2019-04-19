<template>
  <div class="dashboard-container" v-loading.body="loading">
    <div class="g-search-box">
      <div class="refresh">
        <el-button type="primary" @click="refresh()">刷新</el-button>
      </div>
      <div class="statistics">
        <div>
          <p>在线会员人数</p>
            <router-link to="/page/onLineUsers">
              <span class="nums">{{sysNotice.on_line_amount}}</span>
            </router-link>
        </div>
        <div>
          <p>存款审核</p>
          <router-link to="/page/payment/deposit">
            <span class="nums">{{sysNotice.charge}}</span>
          </router-link>
        </div>
        <div>
          <p>取款审核</p>
          <router-link to="/page/payment/withdraw">
            <span class="nums">{{sysNotice.withdraw}}</span>
          </router-link>
        </div>
        <div>
          <p>支付管理(财务)</p>
          <router-link to="/page/payment/management">
            <span class="nums">{{sysNotice.withdrawFinance}}</span>
          </router-link>
        </div>
        <div>
          <p>佣金报表</p>
          <router-link to="/page/report/commission">
            <span class="nums">{{sysNotice.commission}}</span>
          </router-link>
        </div>
        <div>
          <p>日工资报表</p>
          <router-link to="/page/report/salary">
           <span class="nums">{{sysNotice.dailyWage}}</span>
          </router-link>
        </div>
        <div>
          <p>分红报表</p>
          <router-link to="/page/report/bonus">
            <span class="nums">{{sysNotice.dividend}}</span>
          </router-link>
        </div>
        <div>
          <p>活动审核列表</p>
          <router-link to="/page/activity/auditlist">
            <span class="nums">{{sysNotice.rewardProgram}}</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- <div class='dashboard-text'>name:{{user_info && user_info.username}}
      统计布局
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Home',
  data () {
    return {
      loading: false
    }
  },
  computed: {
    ...mapGetters([
      'user_info', 'sysNotice'
    ])
  },
  created () {
  },
  mounted () {
    // setTimeout(() => {
    //   console.log(this.sysNotice)
    // }, 2000)
  },
  methods: {
    refresh () {
      this.loading = true
      this.$store.dispatch('GetSysNotice').then(({ res, err }) => {
        // console.log(res, err)
        this.loading = false
      })
      // console.log(this.sysNotice)
      // this.$message.info('正在刷新中')
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard-container {
  .dashboard-text {
    font-size: 30px;
    line-height: 46px;
  }
  .g-search-box{
    flex-wrap: wrap !important;
    min-width: 1000px;
    .refresh{
      width: 100%;
      text-align: right;
      padding: 0px 15px 15px;
      padding-right: 15px;
    }
    .statistics{
      // flex-grow: 0;
      width: 100%;
      color: #606266;
      font-size: 16px;
      // display: flex;
      // justify-content: space-around;
      >div{
        // display: flex;
        padding: 4px 10px;
        border-top: 1px solid #ddd;
        // text-align: center;
        // background: turquoise;
        // border-radius: 15px;
        >p{
          display: inline-block;
          width: 150px;
        }
        .nums{
          color: red;
          font-size: 16px;
          line-height: 24px;
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
