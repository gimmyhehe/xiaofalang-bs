<template>
  <div class="m-barber-list" v-loading.body="loading">
    <div class="g-search-box">
      <el-form :inline="true" :model="params" class="demo-form-inline" @keyup.enter.native="getList({})" >
        <el-form-item>
          <el-input v-model.trim="params.q.name" placeholder="套餐名称"></el-input>
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
        <el-button type="primary" @click="$router.push('add')">新增套餐</el-button>
      </div>
    </div>
    <template v-if="tableData">
      <el-table
        :data="tableData"
        border stripe
        style="width: 100%;"
        >
        <el-table-column prop="product_name" label="套餐名" align="center"></el-table-column>
        <el-table-column prop="product_price" label="价格" align="center"></el-table-column>
        <el-table-column prop="product_time" label="上架时间" align="center">
          <template slot-scope="scope">
            {{scope.row.product_time | parseTime}}
          </template>
        </el-table-column>
        <el-table-column prop="product_intr" label="简介" align="center"></el-table-column>
        <el-table-column prop="hairstyle_pic" label="图片" align="center" class='img-list'>
          <template slot-scope="scope">
            <img :src='server+scope.row.hairstyle_pic' width="30" height="30" alt="111">
          </template>
        </el-table-column>
        <el-table-column :label="$t('activity.state')" align="center" width="60px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_active === true?'success':'danger'">
              {{scope.row.is_active === true? $t('user.enable'): $t('user.disabled')}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation')" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="btn-style"
              :title="scope.row.is_active === true?$t('user.disabled'): $t('user.enable')"
              :type="scope.row.is_active === true?'danger':'success'"
              @click="toggleEnabled(scope.row.id,scope.row.is_active === true?false:true)"
              :disabled="buttonLoading">
              <i :class="`iconfont icon-${scope.row.is_active === true?'disabled':'enabled'}`"></i>
            </el-button>
            <el-button type="primary"
              class="btn-style"
              @click="$router.push(`/page/product/edit/${scope.row.product_id}`)">
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
import { getUserInfo } from '@/utils/auth'
import { SERVER } from '@/utils/config'
import { scan_products } from '@/api/product'
import { mapGetters } from 'vuex'
export default {
  name: 'ActivityList',
  data () {
    return {
      server:SERVER,
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
      allStateList: {
        0: this.$t('activity.blockUp'),
        1: this.$t('activity.startUsing')
      },
      tableData: []
    }
  },
  created () {
    this.getList()
  },
  computed: {
    ...mapGetters(['pm'])
  },
  methods: {
    getList () {
      this.loading = true
      let company_id = getUserInfo().slice(20)
      scan_products({company_id}).then(res=>{
        console.log(res)
        this.tableData = res.productlist
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
.m-barber-list {
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
  .img-list{
    img{
      width: 30px;
      height: 30px;
    }
  }
}
</style>
