<template>
  <div class="m-activity-list" v-loading.body="loading">
    <div class="g-search-box">
      <el-form :inline="true" :model="params" class="demo-form-inline" @keyup.enter.native="getList({})" >
        <el-form-item>
          <el-input v-model.trim="params.q.name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.q.type" clearable>
            <el-option :label="$t('activity.allActivity')" value="" ></el-option>
            <el-option v-for="(item,key) in typeList" :label="item" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="params.q.status" clearable>
            <el-option :label="$t('activity.allStatus')"  value="" ></el-option>
            <el-option v-for="(item,key) in allStateList" :label="item" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getList({})">{{$t('search')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="search-right">
        <el-button type="primary" @click="$router.push('add')">{{$t('module.AddActivity')}}</el-button>
      </div>
    </div>
    <template v-if="tableData">
      <el-table
        :data="tableData"
        border stripe
        style="width: 100%;"
        >
        <el-table-column prop="order" label="排列顺序" align="center" width="60px"></el-table-column>
        <el-table-column prop="name" :label="$t('activity.name')" align="center" min-width="150px"></el-table-column>
        <el-table-column prop="created_at" :label="$t('created_at')" align="center" min-width="75px">
        </el-table-column>
        <el-table-column prop="time_limit" :label="$t('activity.times')" align="center" min-width="150px">
          <template slot-scope="scope">
            {{scope.row.time_limit===0?$t('activity.unlimited'):`${scope.row.begin_date}${$t('to')}${scope.row.end_date}`}}
            <!-- {{scope.row.time_limit===0?`${scope.row.begin_date}${$t('to')}${$t('activity.unlimited')}`:`${scope.row.begin_date}${$t('to')}${scope.row.end_date}`}} -->
          </template>
        </el-table-column>
        <el-table-column prop="type" :label="$t('activity.type')" align="center">
          <template slot-scope="scope">
            {{typeList[scope.row.type]}}
          </template>
        </el-table-column>
        <!-- <el-table-column prop="is_percent" :label="$t('activity.preferentialType')" align="center">
          <template slot-scope="scope">
            {{discountsTypeList[scope.row.is_percent]}}
          </template>
        </el-table-column> -->
        <el-table-column :label="$t('activity.state')" align="center" width="60px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.status === 1?'success':'danger'">
              {{scope.row.status === 1? $t('user.enable'): $t('user.disabled')}}
            </el-tag>
          </template>
        </el-table-column>
        <!-- <el-table-column prop="remark" :label="$t('remark')" align="center" width="60px">
          <template slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content"  class="remark"><div v-html="scope.row.remark"></div></div>
              <el-button type="primary" class="btn-style" icon="el-icon-view" :title="$t('remark')"></el-button>
            </el-tooltip>
          </template>
        </el-table-column> -->
        <!-- 参加方式 -->
        <el-table-column
          :label="$t('activity.join')"
          align="center"
          width="60px">
          <template slot-scope="scope" >
            <template v-if="scope.row.type !==7">
            {{scope.row.participate_type===1?'自动':'手动'}}
            </template>
            <template v-else>
              -
            </template>
          </template>
        </el-table-column>
        <!-- 领取方式 -->
        <el-table-column
          :label="$t('activity.draw')"
          align="center"
          width="60px">
          <template slot-scope="scope">
            <template v-if="scope.row.type !==7">
            {{scope.row.award_type===1?$t('activity.getMannerServiceGetManner'):$t('activity.getMannerByOneself')}}
            </template>
            <template v-else>
              -
            </template>
          </template>
        </el-table-column>
        <!-- 需要审核 -->
        <el-table-column
          :label="$t('activity.audit')"
          align="center"
          width="60px">
          <template slot-scope="scope">
            <template  v-if="scope.row.type !==7">
              <i class="el-icon-check text-success" v-if="scope.row.need_audit===1"></i>
              <i class="el-icon-close text-danger" v-else></i>
            </template>
            <template v-else>-</template>
          </template>
        </el-table-column>
        <el-table-column label="测试功能" align="center" fixed="right" v-if="$store.state.app.ENV_CONFIG !== 'prod'">
          <template slot-scope="scope">
            <el-button type="text" @click="clearingReset(scope.row.id)">重置活动</el-button>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation')" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="btn-style"
              :title="scope.row.status === 1?$t('user.disabled'): $t('user.enable')"
              :type="scope.row.status === 1?'danger':'success'"
              @click="toggleEnabled(scope.row.id,scope.row.status === 1?0:1)"
              :disabled="buttonLoading">
              <i :class="`iconfont icon-${scope.row.status === 1?'disabled':'enabled'}`"></i>
            </el-button>
            <el-button type="primary"
              class="btn-style"
              @click="$router.push(`/page/activity/edit/${scope.row.id}`)">
              <i class="iconfont icon-edit"></i>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination @current-change="getList" :current-page.sync="params.page"
          layout="prev, pager, next" :total="total" :page-size="params.pagesize">
        </el-pagination>
      </div> -->
      <u-pagination
        :pagesize.sync="params.pagesize"
        :page.sync="params.page"
        :total="params.total"
        @paramsChange="getList"
      ></u-pagination>
    </template>
  </div>
</template>
<script>
import { successMsg } from '@/utils/tools'
// import { activityList, activityEdit } from '@/api/rewardProgram'
import { typeList } from './config'
import { mapGetters } from 'vuex'
export default {
  name: 'ActivityList',
  data () {
    return {
      params: {
        page: 1,
        pagesize: 15,
        total: 0, // 总页数
        q: {
          name: null, // 活动名称
          type: '', // 活动类型
          is_percent: '', // 优惠类型
          status: ''
        }
      },
      buttonLoading: false, // 按钮的状态
      loading: false,
      time: null, // 时间控件
      typeList: typeList,
      // discountsTypeList: {
      //   0: this.$t('yuan'),
      //   1: '%'
      // },
      allStateList: {
        0: this.$t('activity.blockUp'),
        1: this.$t('activity.startUsing')
      },
      tableData: [{award_type: 1,begin_date: null,created_at: "2019-03-29",display: 0,end_date: null,id: 115,name: "充值奖励",need_audit: 1,order: 1,participate_type: 1,remark: null,status: 1,time_limit: 0,type: 4},
      {award_type: 1,begin_date: null,created_at: "2019-03-29",display: 0,end_date: null,id: 115,name: "充值奖励",need_audit: 1,order: 1,participate_type: 1,remark: null,status: 1,time_limit: 0,type: 4},
      {award_type: 1,begin_date: null,created_at: "2019-03-29",display: 0,end_date: null,id: 115,name: "充值奖励",need_audit: 1,order: 1,participate_type: 1,remark: null,status: 1,time_limit: 0,type: 4},
      {award_type: 1,begin_date: null,created_at: "2019-03-29",display: 0,end_date: null,id: 115,name: "充值奖励",need_audit: 1,order: 1,participate_type: 1,remark: null,status: 0,time_limit: 0,type: 4}]
    }
  },
  created () {
    // this.getList({})
  },
  computed: {
    ...mapGetters(['pm'])
  },
  methods: {
    clearingReset (id) {
      if (!id) { return alert('请选择结算时间') }
      request.get({
        url: `/test/reset-rp/${id}`
      }).then(({ res, err }) => {
        if (!err) {
          alert('重置成功!')
          this.getList({ page: this.params.page })
        }
      })
    },
    getList ({ page }) {
      this.loading = true
      this.params.page = page || 1
      activityList(this.params).then(({ res, err }) => {
        if (!err) {
          this.tableData = res.data
          this.params.total = res.total
        }
        this.loading = false
      })
    },
    toggleEnabled (id, status) {
      // 启用停用
      this.buttonLoading = true
      activityEdit({ id, status }).then(({ res, err }) => {
        if (!err) {
          successMsg()
          this.getList({ page: this.params.page })
        }
        this.buttonLoading = false
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.m-activity-list {
  .screen {
    padding: 30px 20px;
    background: #fff;
  }
  .remark{
    max-width:1160px;
    width:100%;
    background:#1b1c1e;
    padding:24px 10%;
  }
  .information {
    padding: 30px 20px;
    .el-table th {
      background-color: rgba(215, 215, 215, 1) !important;
      border: none;
      color: #333333;
    }
    .cell {
      margin: 5px 25px 5px;
    }
  }
}
</style>
