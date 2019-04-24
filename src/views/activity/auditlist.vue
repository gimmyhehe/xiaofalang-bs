<template>
  <div class="m-activity-auditlist" v-loading.body = "loading">
    <div class="g-search-box">
      <el-form :inline="true" :model="params" class="demo-form-inline" @keyup.enter.native="getRewardList({})">
        <el-form-item v-if="!isQuickReview">
          <el-input v-model.trim="params.q.username" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item >
          <!-- 活动名称 -->
          <el-input v-model.trim="params.q.rp_name" :placeholder="$t('activity.name')"></el-input>
        </el-form-item>

        <el-form-item >
           <!-- 活动类型 -->
          <el-select v-model="params.q.rp_type" clearable>
            <el-option :label="$t('activity.allType')" value="" ></el-option>
            <el-option v-for="(item,key) in typeList" :label="item" :value="Number(key)" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item >
          <!-- 状态 -->
          <el-select v-model="params.q.in_status" class="multi-select" :multiple-limit='4' placeholder="默认为全部状态" clearable multiple>
            <el-option label="不填为全部类型" disabled value=""></el-option>
            <el-option v-for="(item,key) in stateList" :label="item" :value="Number(key)" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-select v-model="dateFilterType.value" @change="getRewardList({})" class="u-mini-input">
          <el-option v-for="item in dateFilterType.options" :key="item.value" :label="item.text" :value="item.value"></el-option>
        </el-select>
        <el-form-item>
          <!-- 时间 -->
          <date-time-picker :dataTime.sync="time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange"></date-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getRewardList({})">{{$t('search')}}</el-button>
        </el-form-item>
      </el-form>
      <div class="search-right" v-if="!isQuickReview">
        <!-- 查询 用setInterval自动计时，用clearInterval停止，异步任务-->
        <el-checkbox v-model="refresh" @change="startCountDown">{{$t('activity.refresh')}}</el-checkbox>
      </div>
    </div>
    <div class="g-search-box" v-if="$store.state.app.ENV_CONFIG !== 'prod' && !isQuickReview">
      <el-form>
        <el-form-item :label="$t('time')">
          <el-date-picker
            type="date"
            v-model="tempDate"
            value-format="yyyy-MM-dd"
            >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="clearing">结算</el-button>
        </el-form-item>
      </el-form>
    </div>
    <template v-if="tableData">
      <el-table :data="tableData" border style="width: 100%;" @selection-change="handleSelectionChange">
        <el-table-column v-if="!isQuickReview" type="selection" width="30">
        </el-table-column>
        <el-table-column prop="rp_name" :label="$t('activity.name')" min-width="150px">
        </el-table-column>
        <el-table-column prop="created_at" :label="$t('created_at')" min-width="130px">
        </el-table-column>
        <el-table-column prop="id" label="订单号"  min-width="150px">
        </el-table-column>
        <el-table-column prop="rp_type" :label="$t('activity.type')" width="80px" align="center">
          <template slot-scope="scope">
            {{typeList[scope.row.rp_type]}}
          </template>
        </el-table-column>
        <el-table-column prop="money" align="right" :label="$t('activity.amountOfBonus')" width="100px" class-name="money-negative">
          <template slot-scope="scope">
            {{scope.row.money | toThousandslsFilter(2,'')}}
          </template>
        </el-table-column>
        <el-table-column prop="shareholder_username" width="100px" align="center" :label="$t('userType.shareholders')">
        </el-table-column>
        <el-table-column prop="upline_username" width="100px" align="center" :label="$t('user.online')">
        </el-table-column>
        <el-table-column prop="username" width="100px" align="center" :label="$t('payment.username')">
        </el-table-column>
        <el-table-column prop="status" :label="$t('status')" width="80px" align="center">
          <template slot-scope="scope">
            <!-- 进行中蓝色，审核通过和已派发为绿色，其他状态为红色 -->
            <el-tag v-if="scope.row.status === 1" type="">{{stateList[scope.row.status]}}</el-tag>
            <el-tag v-else :type="`${[2,3,7].includes(scope.row.status)?'success':'danger'}`">{{stateList[scope.row.status]}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="admin_name" :label="$t('activity.auditor')" width="100px">
        </el-table-column>
        <el-table-column prop="admin_remark" :label="$t('activity.auditRemark')" show-overflow-tooltip>
        </el-table-column>
        <el-table-column v-if="!isQuickReview" :label="$t('operation')" fixed="right" width="80px">
          <template slot-scope="scope">
            <template v-if="[1].includes(scope.row.status)">
              <!-- 分红状态,1:待审核,2:已审核,3:已入账,4:取消 -->
              <el-button type="success" size="small"
                :title="$t('pass')"
                icon="el-icon-check"
                :disabled="buttonLoading"
                class="btn-style" @click="auditUpdata(scope.row.id,2)">
              </el-button>
              <el-button type="danger" size="small"
                :title="$t('reject')"
                icon="el-icon-close"
                :disabled="buttonLoading"
                class="btn-style" @click="auditUpdata(scope.row.id,4)">
              </el-button>
            </template>
            <el-button v-else-if="[2,7].includes(scope.row.status)" @click="moneyUpdata(scope.row.id)" :disabled="buttonLoading" type="text">{{$t('payout')}}</el-button>
            <b v-else-if="[3,4,5,6].includes(scope.row.status)">{{scope.row.updated_at}}</b>
          </template>
        </el-table-column>
      </el-table>
      <div v-if="!isQuickReview" class="handle-bar">
        <el-button type="success" @click="auditUpdata(null,2)" :disabled="buttonLoading">{{$t('pass')}}</el-button>
        <el-button type="danger"  @click="auditUpdata(null,4)" :disabled="buttonLoading" >{{$t('reject')}}</el-button>
        <el-button type="primary" @click="moneyUpdata(null)"   :disabled="buttonLoading">{{$t('payout')}}</el-button>
      </div>
      <!-- <div class="pagination">
        <el-pagination @current-change="getRewardList" :current-page.sync="params.page"
          layout="prev, pager, next" :total="total" :page-size="params.pagesize">
        </el-pagination>
      </div> -->
      <u-pagination
        :pagesize.sync="params.pagesize"
        :page.sync="params.page"
        :total="params.total"
        @paramsChange="getRewardList"
      ></u-pagination>
    </template>
  </div>
</template>
<script>
import { dateTimePicker, successMsg } from '@/utils/tools'
import { typeList, stateList } from './config'

export default {
  name: 'ActivityAuditList',
  props: {
    isQuickReview: {// 是否快速查询,快速查询有一些操作需要隐藏
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      tempDate: null,
      refresh: false, // 是否60s自动刷新
      params: {
        q: {
          rp_type: '',
          username: '', // 会员名称
          rp_name: '', // 活动名称
          in_status: [1, 2, 7], // 状态
          gte_created_at: '', // 开始时间
          lte_created_at: '' // 结束时间
        },
        pagesize: 30,
        page: 1,
        total: 0
      },
      dateFilterType: {
        value: 'created_at',
        options: [
          { value: 'created_at', text: '创建时间' },
          { value: 'updated_at', text: '操作时间' }
        ]
      },
      time: dateTimePicker.getDateRange('currentWeek', '{y}-{m}-{d} {h}:{i}:{s}'),
      multipleSelection: [], // 用于全选的table
      buttonLoading: false, // 按钮禁用
      loading: false,
      countDown: null, // 60s刷新的开关
      typeList: typeList,
      stateList: stateList,
      tableData: null
    }
  },
  created () {
    // this.getRewardList({})
  },
  methods: {
    clearing () {
      if (!this.tempDate) { return alert('请选择结算时间') }
      request.get({
        url: `/test/deal-rp/${this.tempDate}`
      }).then(({ res, err }) => {
        if (!err) {
          alert('结算成功!')
          this.getRewardList({})
        }
      })
    },
    getList () {
      this.getRewardList()
    },
    getRewardList (p_params) {
      let { page } = p_params || {}
      this.loading = true
      this.params.page = page || 1
      let _temParams = _.cloneDeep(this.params);
      [_temParams.q[`gte_${this.dateFilterType.value}`], _temParams.q[`lte_${this.dateFilterType.value}`]] = this.time || []
      activityRewardList(_temParams).then(({ res, err }) => {
        if (!err) {
          this.params.total = res.total
          this.tableData = res.data
        }
        this.loading = false
      })
    },
    auditUpdata (id, status) {
      // 审核的操作
      // 如果为null就是全选
      if (!id && this.multipleSelection.length === 0) return false
      this.$prompt(this.$t('activity.inputRemark'), this.$t('tips'), {
        confirmButtonText: this.$t('confirm'),
        cancelButtonText: this.$t('cancel')
      })
        .then(({ value }) => {
          let params = {
            ids: id ? [id] : _.map(this.multipleSelection, 'id'),
            op: status,
            admin_remark: value
          }
          this.buttonLoading = true
          activityAudit(params).then(({ res, err }) => {
            if (!err) {
              successMsg()
              this.getRewardList({ page: this.params.page })
            }
            this.buttonLoading = false
          })
        })
    },
    moneyUpdata (id) {
      // 派发的操作
      if (!id && this.multipleSelection.length === 0) return false
      let params = {
        ids: id ? [id] : _.map(this.multipleSelection, 'id')
      }
      this.buttonLoading = true
      activitySendReward(params).then(({ res, err }) => {
        if (!err) {
          successMsg()
          this.getRewardList({ page: this.params.page })
        }
        this.buttonLoading = false
      })
    },
    startCountDown (value) {
    // 是否自动刷新
      if (value) {
        this.countDown = setInterval(() => { this.getRewardList({ page: this.params.page }) }, 60000)
      } else {
        clearInterval(this.countDown)
      }
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    }
  },
  beforeDestroy () {
    clearInterval(this.countDown)
  }
}
</script>
<style rel="stylesheet/scss" lang="scss">
.m-activity-auditlist {
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
  .handle-bar{
    margin-top:5px;
    button{
      border-radius: 0;
    }
  }
}
</style>
