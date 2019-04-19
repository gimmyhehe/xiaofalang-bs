<template>
  <div class="u-pagination clearfix" :style="customStyle">
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="page"
      :page-sizes="[5,15,20,30,100]"
      :page-size="pagesize"
      :layout="layout"
      :total="total"
      v-bind="customText"
      >
    </el-pagination>
  </div>
</template>

<script>
export default {
  props: {
    page: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pagesize: {
      type: Number,
      default: 15
    },
    layout: {
      type: String,
      default: 'total, prev, pager, next, sizes, jumper'
    },
    customStyle: {
      type: Object,
      default: null
    },
    customText: {
      type: Object,
      default: null
    }

  },
  data () {
    return {}
  },
  methods: {
    handlePageChange (page) {
      this.$emit('update:page', page)
      this.$emit('paramsChange', { page, pagesize: this.pagesize })
    },
    handleSizeChange (pagesize) {
      // this.pagesize = pagesize
      this.$emit('update:pagesize', pagesize)
      this.$emit('paramsChange', { page: 1, pagesize })
    }
  }
}
</script>

<style lang="scss">
.u-pagination{
  // background: rgba(66, 66, 66, .7);
  // padding: 10px;
  margin:5px 0 10px;
  .el-pagination{
    width: 100%;
    .btn-next,.btn-prev {
      padding: 0 10px;
    }
    &.is-background{
      .btn-next, .btn-prev, .el-pager li {
        border: 1px solid rgb(220, 223, 230);
        background-color: #fff;
        border-radius: 5px;
      }
    }
  }
  .el-pagination__total,.el-pagination__jump{
    // color:#fff;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    // background-color: darken(@global-primary-color,10%);
    // color: #fff;
  }
  // .btn-prev,.el-pager,.btn-next,.el-pagination__jump{
  //   float:right
  // }
  .el-pagination__sizes{
     margin-right: 0;
  }
  .el-pagination__total{
    margin-right: 20px;
  }
}
</style>
