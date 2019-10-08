<template>
  <div class="m-barber-list" v-loading.body="loading">
    <div class="g-search-box">
      <el-form :inline="true" :model="params" class="demo-form-inline" @keyup.enter.native="getList({})" >
        <el-form-item>
          <el-input v-model.trim="params.q.name" placeholder="订单号"></el-input>
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
    </div>
    <template v-if="tableData">
      <el-table
        :data="tableData"
        border stripe
        style="width: 100%;"
        >
        <el-table-column prop="order_id" label="订单号" align="center"></el-table-column>
        <el-table-column prop="product_name" label="套餐名" align="center"></el-table-column>
        <el-table-column prop="order_price" label="价格" align="center"></el-table-column>
        <el-table-column prop="other_info" label="备注" align="center"></el-table-column>
        <el-table-column prop="hairstyle.hairstyle_name" label="发型师" align="center"></el-table-column>
        <!-- <el-table-column prop="order_time" label="预约时间" align="center">
          <template slot-scope="scope">
              {{scope.row.order_time | parseTime('yyyy-mm-dd') }}
          </template>
        </el-table-column> -->
     
        <el-table-column :label="$t('activity.state')" align="center" width="80px">
          <template slot-scope="scope">
            <el-tag :type="scope.row.is_active === 1?'success':'danger'">
              {{status[scope.row.is_active]}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column :label="$t('operation')" align="center" fixed="right">
          <template slot-scope="scope">
            <el-button
              class="btn-style"
              :title="scope.row.is_active === 1? '商家接单' : '不可操作'"
              :type="scope.row.is_active != 1?'danger':'success'"
              @click="acceptOrder(scope.row.order_id,scope.row.is_active === 1?true:false)"
              :disabled="buttonLoading">
              <i :class="`iconfont icon-${scope.row.is_active === true?'disabled':'enabled'}`"></i>
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
import { findorderbycompany_id, ordersuccess } from '@/api/order'
import { mapGetters } from 'vuex'
import { setTimeout } from 'timers';
export default {
  name: 'ActivityList',
  data () {
    return {
      server:SERVER,
      status:['已完成','预约中','预约成功','取消'],
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
      let tList = []
      findorderbycompany_id({company_id}).then(res=>{
        console.log('res',res)
        let productlist = res.productlist
        if(productlist && productlist.length>0){
          productlist.forEach(item => {
            if( item.order && item.order.length>0){
              for(let i=0 ;i< item.order.length;i++){
                item.order[i]['product_name'] = item['product_name']
                item.order[i]['product_price'] = item['product_price']
                tList.push(item.order[i])
              }
            }
          });
        }

        this.tableData = tList
        this.loading = false
      })
    },
    acceptOrder(order_id,status){
      if(status){
        ordersuccess({order_id}).then(
          ()=>{
            successMsg('接单成功');
            setTimeout(()=>{
              this.$router.go(0)
            },300)
            
          }
        )
      }
      return ;
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
