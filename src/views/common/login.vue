<template>
  <div class="login-container">
    <el-form @keyup.enter.native="handleLogin" autoComplete="on" :status-icon="true" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left" label-width="0px"
      class="card-box login-form">
      <h3 class="title">登录页面</h3>
      <el-form-item prop="account">
        <el-input name="account" type="text" v-model="loginForm.account" autoComplete="on" placeholder="账号" size="midium">
          <i slot="prefix" class="iconfont icon-profile"></i>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input name="password" type="password" v-model="loginForm.password" autoComplete="on"
          placeholder="密码" size="midium">
          <i slot="prefix" class="iconfont icon-password"></i>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          登录
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button  style="width:100%;"  @click.native.prevent="handleRegister">
          注册
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
// import { getCaptcha } from '@/api/login'
import store from '../../store'
export default {
  data(){
    return {
      loginForm: {
        account: '',
        password: '',
      },
      // GetMaintain: null, // 维护的轮询接口，暂不用
      loginRules: {
        account: [
          {
            required: true,
            trigger: 'blur',
            message: '请输入账号'
          }
        ],
        password: [
          { required: true, trigger: 'blur', message: '请输入账号' }
        ],
      },
      loading: false
    }
  },
  methods: {
    handleRegister(){
      this.$router.push({ path: '/page/register' })
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (!valid) return false
        this.loading = true
        let params = {}
        params['user_name'] = this.loginForm.account
        params['password'] = this.loginForm.password
        this.$store
          .dispatch('Login', params)
          .then(() => {
            this.loading = false
            this.$router.push({ path: '/' })
          })
          .catch((e) => {
            this.loading = false
            console.log(e)
          })
      })
    }
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
    line-height: 47px;
  }
  .el-input__inner,.el-button{
    font-size: 15px;
    height: 47px !important;
    line-height: normal !important;
  }
  .el-input__prefix {
    line-height: 47px;
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
    margin: 120px auto;
    .maintrin-title{
      color:#f65757;
      font-size: 17px;
      font-weight: 600;
      margin-bottom: 10px;
    }
  }
  .el-form-item {
    margin-bottom: 22px;
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
