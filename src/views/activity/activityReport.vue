<template>
  <div class="m-activity-report"  v-loading.body="loading">
    <div class="g-search-box">
      <el-form :inline="true" :model="params" class="demo-form-inline" @keyup.enter.native="getTopList({})">
        <el-form-item >
          <el-input v-model.trim="params.username" placeholder="帐号"></el-input>
        </el-form-item>
        <el-form-item >
          <el-input v-model.trim="params.q.rp_name" placeholder="活动名称"></el-input>
        </el-form-item>
        <el-form-item >
          <el-select v-model="params.q.rp_type" clearable>
            <el-option :label="$t('activity.allType')" value=""></el-option>
            <el-option v-for="(item,key) in typeList" :label="item" :value="key" :key="key"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('detailsDate')">
          <!-- 时间 -->
          <date-time-picker :dataTime.sync="time" format="yyyy-MM-dd HH:mm:ss" type="datetimerange"></date-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="getTopList({})">{{$t('search')}}</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 因为同一个接口，就不用局部table的data来做局部的loading的效果，逻辑and判断太多 -->
    <template v-if="tableData">
      <el-table :data="tableData" @row-click="expanRow" ref="activity" style="width:100%" @expand-change="spread" stripe>
        <el-table-column  type="expand">
          <template slot-scope="props">
            <el-table :data="operator[props.row.rp_id]" class="operator-table" :ref="`${props.row.rp_id}operator`" @expand-change="spread"
            @row-click="(row, event, column)=>{expanRow(row, event, column,`${props.row.rp_id}operator`)}"
            :row-class-name="tableRowClassName"  >
              <el-table-column type="expand" width="30px" >
                <template slot-scope="props" >
                  <el-table :data="agency[String(props.row.rp_id)+String(props.row.username)]" :ref="String(props.row.rp_id)+String(props.row.username)"
                    class="agency-table" :row-class-name="tableRowClassName">
                    <el-table-column prop="username" label="高级总代名称"></el-table-column>
                    <el-table-column prop="amount" align="right"  label="总派发笔数"></el-table-column>
                    <el-table-column prop="money" align="right" :formatter="utils.toThousandslsFM(2,'')"  label="总派发金额"></el-table-column>
                  </el-table>
                </template>
              </el-table-column>
              <el-table-column prop="username" label="经营者名称"></el-table-column>
              <el-table-column prop="amount" align="right"   label="总派发笔数"></el-table-column>
              <el-table-column prop="money" align="right" :formatter="utils.toThousandslsFM(2,'')"    label="总派发金额"></el-table-column>
                <!-- <el-table-column label="活动类型">
                  <template slot-scope="scope">
                    {{typeList[scope.row.rp_type]}}
                  </template>
                </el-table-column> -->
            </el-table>
          </template>
        </el-table-column>
        <el-table-column prop="rp_name" label="活动名称"></el-table-column>
        <el-table-column label="活动类型">
          <template slot-scope="scope">
            {{typeList[scope.row.rp_type]}}
          </template>
        </el-table-column>
        <el-table-column prop="amount" align="right"  label="总派发笔数"></el-table-column>
        <el-table-column prop="money"  align="right" :formatter="utils.toThousandslsFM(2,'')"   label="总派发金额"></el-table-column>
      </el-table>
      <!-- <div class="pagination">
        <el-pagination @current-change="getTopList" :current-page.sync="pagination.page"
          layout="prev, pager, next" :total="total" :page-size="pagination.pagesize">
        </el-pagination>
      </div> -->
      <u-pagination
        :pagesize.sync="pagination.pagesize"
        :page.sync="pagination.page"
        :total="pagination.total"
        @paramsChange="getTopList"
      ></u-pagination>
    </template>
  </div>
</template>
<script>
// 活动列表-经营者列表-高级总代列表
import { dateTimePicker } from '@/utils/tools'
import { typeList } from './config'
export default {
  name: 'ActivityReport',
  data () {
    return {
      params: {
        username: '',
        member_id: '',
        q: {
          rp_name: '',
          rp_type: '',
          rp_id: ''
        }
      },
      pagination: {
        pagesize: 30,
        page: 1,
        total: 0
      },
      tableName: '', // 用来判断操作的
      time: dateTimePicker.getDateRange('currentWeek', '{y}-{m}-{d} {h}:{i}:{s}'),
      tableData: null,
      typeList: typeList,
      loading: false,
      operator: {},
      agency: {},
      cacheUsername: '' // 查询成功缓存的username，用于特殊行事件
    }
  },
  created () {
    // this.getTopList({})
  },
  methods: {
    expanRow (row, event, column, tableName = 'activity') {
      this.tableName = tableName
      this.$refs[tableName].toggleRowExpansion(row)
    },
    spread (row, expandedRows) {
      // 由行的展开和收缩去触发事件，这里可以判断是否展开或者收缩
      let status = expandedRows.indexOf(row) >= 0
      // true是展开 false是收缩，所有展开的行的row会被记录在expandedRows这个数组里面
      if (status && this.tableName) {
        let rp_id = ''
        let member_id = ''
        if (this.tableName === 'activity') {
        // 活动-经营者
          rp_id = row.rp_id
        } else if (this.tableName.includes('operator')) {
        // 经营者-高级总代
          member_id = row.member_id
        }
        // 搜索再做处理
        let params = {
          member_id,
          q: {
            rp_id,
            gte_updated_at: '',
            lte_updated_at: ''
          }
        };
        // 查询层次二、三的时候，用层次一的时间参数
        [params.q.gte_updated_at, params.q.lte_updated_at] = [this.params.q.gte_updated_at || null, this.params.q.lte_updated_at || null]
        this.getList(params)
      }
    },
    getTopList ({ page }) {
      // 查找
      this.params.q.rp_id = ''
      this.params.member_id = ''
      this.tableName = ''
      let params = {}
      // if (!currentPage) {
      //   // 查询经营者或者高级总代的时候，清空不上传  搜索做个初始化传个1就好了
      //   params = this.params
      // } else {
      this.pagination.page = page || 1
      params = Object.assign(this.params, this.pagination);
      [params.q.gte_updated_at, params.q.lte_updated_at] = this.time || []
      // }
      this.getList(params)
    },
    getList (params) {
    },
    tableRowClassName ({ row, rowIndex }) {
      if (row.username === this.cacheUsername) {
        return 'pitch-on'
      }
    }

  }
}
</script>
<style rel="stylesheet/scss" lang="scss">

.m-activity-report{
  .current-row>td{
  background-color: #ffffff !important;
  }
  .el-table__expand-column{
      opacity: 0.99;
    .el-table__expand-icon{
      z-index:-1;
    }
  }
  .el-table__expanded-cell[class*=cell]{
    padding: 0px;
  }
  .operator-table{
    border: 5px solid #dcebf7;
    margin-right: 30px;
  }
  .agency-table{
    border:10px  solid #7795d9;
    border-left-width: 30px;
    border-right-width: 5px;
  }
  .operator-table,.agency-table{
    .el-table__row {
      // >td{
      background: #f5f7fa ;
      // }
    }
  }
  .pitch-on{
    //  .el-table__row{
      background-color: #c4f9c1f2 !important;
    // }
  }
}
</style>
