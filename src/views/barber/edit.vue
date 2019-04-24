<template>
  <div class="m-activity-edit g-container" v-loading.body="loading">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <!-- 活动名称 -->
      <el-form-item label="发型师名字" prop="hairstyle_name" >
          <el-input v-model="ruleForm.hairstyle_name"></el-input>
      </el-form-item>
      <!-- 活动简介 -->
      <el-form-item label="职称" prop="hairstyle_level" >
          <el-input v-model="ruleForm.hairstyle_level"></el-input>
      </el-form-item>
      <el-form-item label="简介" prop="hairstyle_intr" >
          <el-input v-model="ruleForm.hairstyle_intr" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="发型师图片" prop="fileImg">
        <el-upload
          class="avatar-uploader"
          action="http://localhost:3101/post/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload">
          <img v-if="imageUrl" :src="imageUrl | fillImg" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { mapGetters } from 'vuex'
import { successMsg } from '@/utils/tools'
import { SERVER } from '@/utils/config'
import { addhairstyle, modifyhairstyle, onehairstyle } from '@/api/barber'

export default {
  name: 'editActivity',
  components: {
  },
  data () {
    return {
      imageUrl: '',
      server: SERVER,
      loading: false, // 页面的加载loading
      ruleForm: {
        fileImg: null,
        hairstyle_name:null,
        hairstyle_intr:null,
        hairstyle_level:null
      },
      rules: {
        hairstyle_name: [
          { required: true, message: '请输入发型师姓名', trigger: 'change' }
        ],
        hairstyle_intr: [
          { required: true, message: '请输入发型师简介', trigger: 'change' }
        ],
        hairstyle_level: [
          { required: true, message: '请输入发型师职称', trigger: 'change' }
        ],
        fileImg: [
          { required: true, message: '请上传发型师照片', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters(['token']),
    barberid () { // 发型师ID
      return this.$route.params.id || false
    },
  },
  beforeRouteEnter (to, from, next) {
    let hairstyle_id = to.params.id || false
    if(hairstyle_id){
      onehairstyle({hairstyle_id}).then(barberInfo=>{
        next(vm => vm.setInitInfo(barberInfo))
      })
    }
    next()
  },
  methods: {
    setInitInfo(barberInfo){
      this.loading = true
      this.ruleForm = barberInfo
      this.imageUrl = barberInfo['hairstyle_pic']
      this.loading = false
    },
    submitForm (formName) {
      // 提交
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.loading = true
          if (!this.barberid) {
            // 新增
            addhairstyle(this.ruleForm).then(res => {
            let data = res
            if (data.status==0) {
              successMsg(data.msg)
              this.$nextTick(() => {
                this.$refs['ruleForm'].resetFields()
              })
            }else{
              this.$message.error(data.msg)
            }
            this.loading = false
          })
          } else {
            // 编辑
            modifyhairstyle(this.ruleForm).then(res=>{
                if(res.status==0){
                  successMsg(res.msg)
                }else{
                  this.$message.error(res.msg)
                }
                this.loading = false
              })
          }
        } else {
          this.$message.error(this.$t('activity.errorHint'))
        }
      })
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
    beforeAvatarUpload(file) {
        const isJPG = ['image/jpeg', 'image/png'].includes(file.type);
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
    onProgress (data) {
      // 上传时的钩子
      this.uploadLoading[data] = true
    },
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.m-activity-edit {
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
