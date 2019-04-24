<template>
  <div class="dashboard-container" v-loading.body="loading">
    <div class="info-box">
      <h3>商家信息</h3>
      <br />
      <br />
      <el-form :label-position="labelPosition" label-width="80px" :model="businessInfo">
        <el-form-item label="商家账号">
          <el-input v-model="businessInfo.user_name"></el-input>
        </el-form-item>
        <el-form-item label="商家名称">
          <el-input v-model="businessInfo.company_name"></el-input>
        </el-form-item>
        <el-form-item label="商家图片">
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
        <el-form-item label="定位">
          <el-input v-model="businessInfo.location"></el-input>
        </el-form-item>
        <el-form-item label="简介">
          <el-input v-model="businessInfo.company_intr" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="商家电话">
          <el-input v-model="businessInfo.phone_number"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="businessInfo.email"></el-input>
        </el-form-item>
        <el-form-item label="地区">
          <el-input style="width:80px;margin-right:10px" v-model="businessInfo.country"></el-input>
          <el-input style="width:80px;margin-right:10px" v-model="businessInfo.province"></el-input>
          <el-input style="width:80px;margin-right:10px" v-model="businessInfo.area"></el-input>
        </el-form-item>
 
        <el-form-item>
          <el-button type="primary" @click="handleModify">保存</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { scan_business, businessmodify } from '@/api/user'
import { getUserInfo } from '@/utils/auth'
export default {
  name: 'Home',
  data () {
    return {
      labelPosition: 'right',
      businessInfo: {
        fileImg: '',
        user_name:'',
        email:'',
        phone_number:'',
        country:'',
        province:'',
        area:'',
        company_name: '',
        company_intr: '',
        location: '',
      },
      loading: false,
      imageUrl: '',
      company_id: getUserInfo().slice(20),
    }
  },
  computed: {
    ...mapGetters([
      'user_info', 'sysNotice'
    ])
  },
  created () {
    this.getBusinessInfo()
  },
  mounted () {

  },
  methods: {
    getBusinessInfo(){
      this.loading = true
      scan_business({company_id:this.company_id}).then(res=>{
        this.businessInfo = res
        this.$set(this.businessInfo,'company_name',res.company['company_name'])
        this.$set(this.businessInfo,'company_intr',res.company['company_intr'])
        this.$set(this.businessInfo,'location',res.company['location'])
        this.imageUrl = res.user_Pic['user_pic_dir']
        this.loading = false
      })
    },
    handleModify(){
      this.loading = true
      let params = {}
      params['company_name'] = this.businessInfo['company_name']
      params['company_intr'] = this.businessInfo['company_intr']
      params['location'] = this.businessInfo['location']
      params['country'] = this.businessInfo['country']
      params['province'] = this.businessInfo['province']
      params['area'] = this.businessInfo['area']
      params['phone_number'] = this.businessInfo['phone_number']
      params['fileImg'] = this.businessInfo['fileImg']
      params['email'] = this.businessInfo['email']
      params['birth_date'] = '2000-01-01'
      params['phone_area'] = '86'
      params['face_type'] = '脸型'
      params['gender'] = '男'
      params['career'] = '职业'
      businessmodify(params).then(res=>{
        if(res.status==0){
          this.$message.success(res.msg)
        }else{
          this.$message.error(res.msg)
        }
        this.loading = false
      }
      )
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.businessInfo.fileImg = file.raw
    },
    beforeAvatarUpload(file) {
      return true
      // const isJPG = file.type === 'image/jpeg';
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error('上传头像图片只能是 JPG 格式!');
      // }
      // if (!isLt2M) {
      //   this.$message.error('上传头像图片大小不能超过 2MB!');
      // }
      // return isJPG && isLt2M;
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
  .info-box{
    padding: 10px;
    background: #fff;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04);
    margin-bottom: 5px;
    .refresh{
      width: 100%;
      text-align: right;
      padding: 0px 15px 15px;
      padding-right: 15px;
    }
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>
