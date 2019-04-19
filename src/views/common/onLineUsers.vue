<template>
  <div class="user-active-num" v-loading.body="loading">
    <div class="refresh">
      <el-button type="primary" @click="getList(null)">刷新</el-button>
    </div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="username"  label="用户名" ></el-table-column>
      <el-table-column prop="money"  :formatter="utils.toThousandslsFM(2,'')" label="金额" ></el-table-column>
      <el-table-column prop="money"  label="会员等级">
        <template slot-scope="{row}">
          {{row.level}}
        </template>
      </el-table-column>
      <el-table-column align="center" label="登录信息" width="200" >
        <template slot-scope="scope">
          <p>时间 : {{scope.row.login_info.login_time || ''}}</p>
          <p>区域 : {{`${scope.row.login_info.login_ip || ''}`}}
            <span v-if="scope.row.login_info.login_area">
              {{`(${scope.row.login_info.login_area.country || ''} ${scope.row.login_info.login_area.province || ''} ${scope.row.login_info.login_area.city || ''})`}}
            </span>
          </p>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination @current-change="getList" layout="prev, pager, next"  :page-size="params.pagesize" :total="total"></el-pagination>
    </div>
  </div>

</template>
<script>

import { getOnLineUsers } from '@/api/login'
export default {
  name: 'onLineUsers',
  data () {
    return {
      params: {
        pagesize: 30,
        page: 1
      },
      total: 0,
      loading: false,
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  methods: {
    getList (page) {
      this.loading = true
      this.params.page = page || 1
      getOnLineUsers(this.params).then(({ res, err }) => {
        if (!err) {
          this.total = this.$store.getters.sysNotice.on_line_amount = res.total
          this.tableData = res.data
        }
        this.loading = false
      })
    }
  }
}
</script>
<style lang="scss" >
.user-active-num{
  .refresh{
    width: 100%;
    text-align: right;
    padding: 0px 15px 15px;
    padding-right: 15px;
  }
}
</style>
