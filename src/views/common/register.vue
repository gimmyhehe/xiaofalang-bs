<template>
  <div class="login-container">
    <el-form @keyup.enter.native="handleLogin" autoComplete="on" :status-icon="true" :model="registerForm" :rules="loginRules" ref="registerForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">注册页面</h3>
      <el-form-item  prop="fileImg">
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
      <el-form-item prop="user_name" >
        <el-input name="user_name" type="text" v-model="registerForm.user_name" autoComplete="on" placeholder="账号" size="midium">
          <i slot="prefix" class="iconfont icon-profile"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" v-model="registerForm.password" autoComplete="on"
          placeholder="密码" size="midium">
          <i slot="prefix" class="iconfont icon-password"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="confirm_psw">
        <el-input name="password" type="password" v-model="registerForm.confirm_psw" autoComplete="on"
          placeholder="密码" size="midium">
          <i slot="prefix" class="iconfont icon-password"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="company_name">
        <el-input name="company_name" type="text" v-model="registerForm.company_name" autoComplete="on"
          placeholder="商家名" size="midium">
        </el-input>
      </el-form-item>
      <el-form-item prop="phone_number">
        <el-input name="phone_number" type="text" v-model="registerForm.phone_number" autoComplete="on"
          placeholder="手机" size="midium">
        </el-input>
      </el-form-item>
      <el-form-item prop="email">
        <el-input name="email" type="text" v-model="registerForm.email" autoComplete="on"
          placeholder="邮箱" size="midium">
        </el-input>
      </el-form-item>

      <el-form-item prop="location">
        <el-input name="location" type="text" v-model="registerForm.location" autoComplete="on"
          placeholder="地址" size="midium">
        </el-input>
      </el-form-item>
      <el-form-item prop="company_intr">
        <el-input name="company_intr" type="textarea"  v-model="registerForm.company_intr" autoComplete="on"
          placeholder="商家详情" size="midium">
        </el-input>
      </el-form-item>
      <el-form-item class="three-row">
        <el-input name="country" type="text" v-model="registerForm.country" autoComplete="on"
          placeholder="国家" size="small">
        </el-input>
        <el-input name="province" type="text" v-model="registerForm.province" autoComplete="on"
          placeholder="省份" size="small">
        </el-input>
        <el-input name="area" type="text" v-model="registerForm.area" autoComplete="on"
          placeholder="城市" size="small">
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { bussinessregi } from '@/api/user'
import { successMsg } from '@/utils/tools'
import store from '../../store'
export default {
  data(){
    return {
      imageUrl: null,
      registerForm: {
        fileImg: null,
        user_name: '',
        password: '',
        confirm_psw:'',
        phone_number:'',
        email:'',
        company_name:'',
        location:'',
        company_intr:'',
      },
      // GetMaintain: null, // 维护的轮询接口，暂不用
      loginRules: {
        user_name: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入账号'
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入密码' }
        ],
        confirm_psw:[ { required: true, trigger: 'blur', message: '请输入密码' }]
      },
      loading: false
    }
  },
  methods: {
    handleRegister(){
      console.log(this.registerForm)
      this.$refs.registerForm.validate(valid => {
        if (!valid) return false
        this.loading = true
        let params = this.registerForm
        delete params['confirm_psw']
        params['user_type'] = 1
        bussinessregi(params).then(res=>{
          if(res.status == 0){
            successMsg(res.msg)
            this.loading = false
            this.$router.push({ path: '/page/login' })
          }
          else{
            this.$message.error(res.msg)
            this.loading = false
          }
        })
      })
    },
   handleAvatarSuccess (res, file) {
      successMsg('上传成功')
      // this.uploadLoading[data] = false
      this.imageUrl = URL.createObjectURL(file.raw);
      this.registerForm['fileImg'] = file.raw
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
  },
}
</script>

<style rel="stylesheet/scss" lang="scss">
@import "src/styles/mixin.scss";
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;
.login-container {
  @include relative;
  height: 100vh;
  background-color: $bg;
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important;
    -webkit-text-fill-color: #fff !important;
  }
  textarea{
    background: rgb(40, 52, 67);
    border: none;
    color: #eee;
  }
  .three-row{
    .el-form-item__content{
      display: flex;
      justify-content: space-between;
    }
    .el-input{
      width: 30%!important;
      display: inline-block;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
  }
  input {
    background: transparent;
    border: 0px;
    border-radius: 0px;
    padding: 12px 5px 12px 15px;
    color: $light_gray;
  }
  .el-input {
    display: inline-block;
    width: 100% !important;
  }
  .el-input__prefix {
    line-height: 36px;
  }
  .el-input__inner,.el-button{
    font-size: 15px;
    height: 36px !important;
    line-height: normal !important;
  }
  .el-input__prefix {
    line-height: 36px;
  }
  .title {
    font-size: 26px;
    font-weight: 400;
    color: $light_gray;
    margin: 0px auto 40px auto;
    text-align: center;
    font-weight: bold;
  }
  .login-form {
    position: absolute;
    left: 0;
    right: 0;
    width: 420px;
    padding: 35px 35px 15px 35px;
    margin: 0 auto;
    .maintrin-title{
      color:#f65757;
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  .el-form-item {
    margin-bottom: 5px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
  .captcha {
    display: block;
    cursor: pointer;
  }
}
</style>
