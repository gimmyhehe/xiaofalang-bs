<template>
  <div class="g-container m-modify-password">
    <el-form ref="modify" :model="modify" :rules="rules" @keyup.enter.native="submitForm" label-width="120px">
      <el-form-item prop="oldPwd" :label="$t('modifyPass.oldPass')">
        <el-input v-model="modify.oldPwd" type="password">></el-input>
      </el-form-item>
      <el-form-item prop="password" :label="$t('modifyPass.newPass')"  :placeholder="$t('sys.pwdTip')">
        <el-input v-model="modify.password" type="password"></el-input>
      </el-form-item>
      <el-form-item prop="password_confirmation" :label="$t('user.ensurePwd')">
        <el-input v-model="modify.password_confirmation" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitForm" type="primary" class="wrap-width" v-loading="buttomLoading">{{$t('submit')}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { modifyPwd } from '@/api/admin'
import { successMsg } from '@/utils/tools'
export default {
  name: 'modifyPassword',
  data () {
    return {
      buttomLoading: false,
      modify: {
        oldPwd: '',
        password: '',
        password_confirmation: ''
      },
      rules: {
        oldPwd: [
          { required: true, message: this.$t('required'), trigger: 'change' }
        ],
        password: [
          { required: true, min: 8, max: 16, message: this.$t('sys.pwdTip'), trigger: 'blur,change' }
          // { required: true, message: this.$t('required'), trigger: 'blur' }
        ],
        password_confirmation: [
          { validator: this.validateConfirmPwd, trigger: 'blur,change' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs['modify'].validate((valid) => {
        if (!valid) return false
        this.buttomLoading = true
        modifyPwd(this.modify).then(({ err, res }) => {
          if (!err) {
            successMsg('您的登录密码已修改，请重新登录')
            this.$store.dispatch('clearUserInfo')
            this.$router.push('/')
            // 重置表单
            // this.$refs['modify'].resetFields()
          }
          this.buttomLoading = false
        })
      })
    },
    validateConfirmPwd (rule, value, callback) {
      if (value !== this.modify.password) {
        callback(new Error(this.$t('sys.warnNotSamePwd')))
      } else {
        callback()
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
.m-modify-password {
}
</style>
