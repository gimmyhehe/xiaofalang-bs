<template>
  <div class="m-product-edit g-container" v-loading.body="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <!-- 活动名称 -->
      <el-form-item label="套餐名称" prop="product_name" >
          <el-input v-model="ruleForm.product_name"></el-input>
      </el-form-item>
      <!-- 活动简介 -->
      <el-form-item label="价格" prop="product_price" >
          <el-input v-model="ruleForm.product_price"></el-input>
      </el-form-item>
      <el-form-item label="数量" prop="product_amount" >
          <el-input v-model="ruleForm.product_amount"></el-input>
      </el-form-item>
      <el-form-item label="套餐详情" prop="product_intr" >
          <el-input v-model="ruleForm.product_intr" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="详情图片" >
       <el-upload
          action="http://localhost:3101/post/"
          list-type="picture-card"
          multiple
          :file-list="fileList"
          :limit='6'
          :on-change="handelChange"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <!-- 状态 -->
      <!-- 保存 -->
      <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">{{$t('activity.preserve')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { successMsg } from '@/utils/tools'
import { GAME_TYPE } from '@/utils/config'
import { addproduct, modify_product, oneproduct } from '@/api/product'

export default {
  name: 'editActivity',
  components: {
  },
  data () {
    return {
      dialogImageUrl: '',
      fileList:[],
      dialogVisible: false,
      loading: false, // 页面的加载loading
      centerDialogVisible: false, // dialog的状态
      dialogStatus: null, // dialog内层显示的状态
      uploadUrl: `${this.$store.getters.app_base_api}backend/upload-img`, // 上传图片的url
      time: null,
      ipValue: '', // 黑名单的作用域
      uploadLoading: {
        web_img: false,
        mobile_img: false
      },
      gameType: GAME_TYPE,
      cities: [], // 用来过滤值
      calculateTime: [2, 1], // 用来选择统计周期
      ruleForm: {
        product_name:null,
        product_price:null,
        product_intr:null,
        product_amount:null,
      },
      width: null,
      height: null,
      rules: {
        product_name: [
          { required: true, message: '请输套餐名称', trigger: 'change' }
        ],
        product_price: [
          { required: true, message: '请输入套餐价格', trigger: 'change' }
        ],
        product_intr: [
          { required: true, message: '请输入套餐简介', trigger: 'change' }
        ],
        product_amount: [
          { required: true, message: '请输入套餐简介', trigger: 'change' }
        ],
      }
    }
  },
  computed: {
    productid () { // 套餐ID
      return this.$route.params.id || false
    },
  },
  beforeRouteEnter (to, from, next) {
    let product_id = to.params.id || false
    if(product_id){
      oneproduct({product_id}).then(barberInfo=>{
        next(vm => vm.setInitInfo(barberInfo))
      })
    }
    next()
  },
  methods: {
    handelChange(file, fileList){
      console.log('file',file,'filelist',fileList)
      this.fileList = fileList
    },
    blackIP (value) {
      // 换行为格式标准
      this.ruleForm.ip_black_list = value.split('\n')
    },
    // 条件的数组校验
    setInitData (vipList, userData) {
      // 获取会员列表和处理编辑状态下的数据
      this.loading = true
      if (vipList && !vipList.err) {
        this.vipList = vipList.res
      }
      if (userData && !userData.err) {
        // 编辑状态
        this.ruleForm = Object.assign(this.ruleForm, userData.res, { rewards: JSON.parse(userData.res.rewards) || [] }, { levels: JSON.parse(userData.res.levels) || [] }, { ip_black_list: JSON.parse(userData.res.ip_black_list) || [] }, { conditions: JSON.parse(userData.res.conditions) || [] })
        // //  新加功能 兼容旧数据
        // this.ruleForm.end_date = this.ruleForm.time_limit === 0 ? null : this.ruleForm.end_date
        this.ipValue = this.ruleForm.ip_black_list.join('\n')
        this.calculateTime = [this.ruleForm.stat_freq, this.ruleForm.freq_day || null]
        this.showParams()
      }
      this.loading = false
    },
    submitForm (formName) {
      // 提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          let params = this.ruleForm
          for(let index in this.fileList){
            params[`fileImg${index}`] = this.fileList[index]['raw']
          }
          addproduct(params).then(res => {
            let data = res
            if (data.status==0) {
              successMsg(data.msg)
              this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
              })
            }else{
              alert(1234)
            }
            this.loading = false
          })
          // if (!this.activityid) {
          //   // 新增
          //   activityAdd(this.ruleForm).then(({ res, err }) => {
          //     if (!err) {
          //       successMsg()
          //       this.initialize()
          //       // 触发类型为默认为注册活动的数据类型，否则prop会查找默认不存在的值，导致错误
          //       this.ruleForm.type = 1
          //       this.resetRewards()
          //       this.calculateTime = [2]
          //       this.$nextTick(() => {
          //         this.$refs['ruleForm'].resetFields()
          //       })
          //     }
          //     this.loading = false
          //   })
          // } else {
          //   // 编辑
          //   activityEdit(this.ruleForm).then(({ res, err }) => {
          //     if (!err) {
          //       successMsg()
          //     }
          //     this.loading = false
          //   })
          // }
        } else {
          this.$message.error(this.$t('activity.errorHint'))
        }
      })
    },
    conditionParams () {
      // 奖励条件的提交数据
      this.ruleForm.conditions = []
      this.cities.forEach((item, index) => {
        // 当有带其他参数的参数时，直接对象赋值
        if ([102, 108, 109, 110, 111, 112, 114, 115, 116].includes(item)) {
          this.ruleForm.conditions.push(this.citiesList[item])
        } else {
          // 否则只有传递类型值
          this.ruleForm.conditions.push({ type: item, content: [] })
        }
      })
    },
    showParams () {
      // 数组的情况下进行条件参数的逆操作
      // if (Array.isArray(this.ruleForm.condition)) {
      this.ruleForm.conditions.forEach((item) => {
        this.cities.push(item.type)
        if ([102, 108, 109, 110, 111, 112, 114, 115, 116].includes(item.type)) {
          this.citiesList[item.type] = item
        }
      })
      // }
    },
    verifyDate (rule, value, callback) {
      // 时间校验
      if (this.ruleForm.time_limit === 1 && this.time === null) {
        callback(new Error(this.$t('activity.selectTime')))
      } else {
        callback()
      }
      // if (this.ruleForm.time_limit && !value) {
      //   callback(new Error('请选择活动结束日期'))
      // } else {
      //   callback()
      // }
    },
    verifyPastDue (rule, value, callback) {
      // 过期天数校验
      if (this.ruleForm.be_expired === 1 && !this.ruleForm.expire_day) {
        callback(new Error(this.$t('activity.selectDate')))
      } else {
        callback()
      }
    },
    handleAvatarSuccess (res, file) {
      successMsg('上传成功')
      // this.uploadLoading[data] = false
      this.imageUrl = URL.createObjectURL(file.raw);
      this.ruleForm['fileImg'] = file.raw
    },
    upLoadError (datakey) {
      this.$message.error('上传图片失败')
      this.uploadLoading[datakey] = false
    },
    handleRemove(file, fileList) {
        console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    onProgress (data) {
      // 上传时的钩子
      this.uploadLoading[data] = true
    },
    initialize () {
      // 初始化条件
      this.citiesList = {
        102: { type: 102, content: { max_single_bonus: null } },
        108: { type: 108, content: { amount: null } },
        109: { type: 109, content: { times: null } },
        110: { type: 110, content: { times: null } },
        111: { type: 111, content: { days: null } },
        112: { type: 112, content: { days: null, times: null, total: null } },
        114: { type: 114, content: { amount: null } },
        115: { type: 115, content: { times: null } },
        116: { type: 115, content: { balance: null } }
      }
      this.ruleForm.rewards = {
        // 奖励数组拆分
        1: [{ amount: null }],
        2: [{ amount: null, bet_min: null, bet_max: null }],
        3: [{ amount: null, charge_min: null, charge_max: null }]
      }
      this.cities = []
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.m-product-edit {
  padding: 30px 20px;
  background: #fff;
  .el-tag + .el-tag {
    margin-left: 10px;
  }
  .tips{
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    color: #5a5e66;
  }
  .el-tag--mini{
  height: 25px;
  line-height:25px;
  }
  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
  }
  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
  }
  .condition {
    .el-checkbox {
      display: block;
    }
    .money{
    width: 80px;
    margin: 3px;
    }
    .timeday{
      width: 60px;
      margin: 3px;
    }
    .el-form-item{
      vertical-align: middle;
      display: inline-block;
      margin-bottom: 0;
      .el-form-item__error{
        position:relative
      }
    }
  }
  .condition-premise{
      margin-bottom: 10px;
  }
  .upload-img-mobile{
    width: 267px !important;
    .el-upload-dragger{
      height: 160px !important;
    }
  }
  .upload-img{
    // 加个padding值
    width: 712px;
    height: auto;
    display: inline-block;
    .el-upload{
    width: 100%;
    height: 100%;
    .el-upload-dragger{
      width: 100%;
      height: auto;
      padding: 15px;
    }
  }
    // .addupload{
    //   width: 200px;
    //   height: 120px;
    //   margin: auto;
    // }
  }
  .gameaudit{
    margin: 5px 0px;
  }
  .viplist{
    max-height:300px;
    overflow-y: auto;
    .el-checkbox{
      display: block;
    }
    .el-checkbox+.el-checkbox{
      margin: auto
    }
  }
  .awardlist{
    .el-input{
      margin: 0px 5px;
    }
    .el-form-item{
      display: inline-block
    }
    .hint{
      margin-bottom: 15px;
    }
  }
  .area {
    color: #606266;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 5px;
    .el-input {
      width: 100px;
    }
    .area-title {
      margin: 0px 10px;
    }
    .area-register {
      display: flex;
      align-items: center;
      width: 100%;
    }
  }
  .confirm {
    .el-button {
      line-height: 16px;
      width: 340px;
      font-size: 16px;
    }
  }
  .timescope {
    float: left;
    margin-right:7px;
  }
  .expiredCondition {
    .expiredConditiontime {
      width: 50px;
    }
    label {
      display: block;
      float: left;
      width: 100%;
      margin: 7px 0px;
    }
  }
}
</style>
