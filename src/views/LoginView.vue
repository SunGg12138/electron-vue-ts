<template>
  <div class="login-view" :style="{width: windowSize.width + 'px'}">
    <div style="padding-bottom: 26px; padding-top: 60px;">
      <img alt="logo" src="@/assets/imgs/logo.png" height="60" style="vertical-align: middle;">
      <span style="font-size: 18px; font-weight: 600; margin-left: 10px;">登录</span>
    </div>
    <div class="form-box">
      <el-form :model="loginForm" status-icon ref="loginForm" label-width="0px" :rules="rules">
        <el-form-item label="" prop="loginName">
          <el-input v-model="loginForm.loginName" placeholder="请输入登录名"></el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
          <el-input type="password" v-model="loginForm.password" autocomplete="off" placeholder="请输入密码" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%;" @click="submitForm()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import * as SizeConst from '@/const/size'

export default Vue.extend({
  name: 'LoginView',
  data () {
    return {
      loginForm: {
        loginName: '',
        password: ''
      },
      windowSize: SizeConst.LoginWindow,
      rules: {
        loginName: [
          { required: true, message: '请输入登录名', trigger: 'blur' },
          { min: 3, max: 16, message: '登录名应该是3~16个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm () {
      (this.$refs.loginForm as any).validate((valid: boolean) => {
        if (valid) {
          this.toLogin()
          return true
        } else {
          return false
        }
      })
    },
    async toLogin () {
      const { success } = await window.api.login(this.loginForm)
      if (success) {
        window.api.send('login/success')
      }
    }
  },
  components: {

  }
})
</script>

<style scoped lang="scss">
.login-view {
  margin: 0 auto;
  .form-box {
    padding: 0 40px;
  }
}
</style>
