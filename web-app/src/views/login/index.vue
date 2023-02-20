<template>
  <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" autocomplete="on"
        label-position="left">
        <div class="title-container">
          <img :src="logo" class="login-logo" />
          <span class="title">
            {{ $t('login.title') }}
          </span>
          <lang-select class="set-language" />
        </div>
        <div class="subtitle-container">
          {{ $t('login.subtitle') }}
        </div>
        <div class="formtip-container">
          {{ $t('login.formtip') }}
        </div>
        <el-form-item prop="username">
          <span class="svg-container">
            <svg-icon icon-class="loginuser" />
          </span>
          <el-input ref="username" v-model="loginForm.username" :placeholder="$t('login.username')" name="username"
            type="text" tabindex="1" autocomplete="on" />
        </el-form-item>

        <el-tooltip v-model="capsTooltip" content="Caps lock is On" placement="right" manual>
          <el-form-item prop="password">
            <span class="svg-container">
              <svg-icon icon-class="loginlock" />
            </span>
            <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType"
              :placeholder="$t('login.password')" name="password" tabindex="2" autocomplete="on"
              @keyup.native="checkCapslock" @blur="capsTooltip = false" @keyup.enter.native="handleLogin" />
            <span class="show-pwd" @click="showPwd">
              <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
            </span>
          </el-form-item>
        </el-tooltip>

        <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;height: 47px;border-radius: 2px;"
          @click.native.prevent="handleLogin">
          {{ $t('login.logIn') }}
        </el-button>
      </el-form>
    </div>
</template>

<script>
  import {
    validUsername
  } from '@/utils/validate'
  import LangSelect from '@/components/LangSelect'
  import SocialSign from './components/SocialSignin'
  import Logo from '@/assets/logo.svg'

  export default {
    name: 'Login',
    components: {
      LangSelect,
      SocialSign
    },
    data() {
      const validateUsername = (rule, value, callback) => {
        if (!validUsername(value)) {
          callback(new Error('Please enter the correct user name'))
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (value.length < 6) {
          callback(new Error('The password can not be less than 6 digits'))
        } else {
          callback()
        }
      }
      return {
        logo: Logo,
        loginForm: {
          type: '1',
          username: 'argus',
          password: 'argus'
        },
        loginRules: {
          // username: [{ required: true, trigger: 'blur', validator: validateUsername }],
          // password: [{ required: true, trigger: 'blur', validator: validatePassword }]
        },
        passwordType: 'password',
        capsTooltip: false,
        loading: false,
        redirect: undefined,
        otherQuery: {}
      }
    },
    watch: {
      $route: {
        handler: function (route) {
          const query = route.query
          if (query) {
            this.redirect = query.redirect
            this.otherQuery = this.getOtherQuery(query)
          }
        },
        immediate: true
      }
    },
    created() {
      // window.addEventListener('storage', this.afterQRScan)
    },
    mounted() {
      if (this.loginForm.username === '') {
        this.$refs.username.focus()
      } else if (this.loginForm.password === '') {
        this.$refs.password.focus()
      }
    },
    destroyed() {
      // window.removeEventListener('storage', this.afterQRScan)
    },
    methods: {
      checkCapslock(e) {
        const {
          key
        } = e
        this.capsTooltip = key && key.length === 1 && (key >= 'A' && key <= 'Z')
      },
      showPwd() {
        if (this.passwordType === 'password') {
          this.passwordType = ''
        } else {
          this.passwordType = 'password'
        }
        this.$nextTick(() => {
          this.$refs.password.focus()
        })
      },
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('user/login', this.loginForm)
              .then(() => {
                this.$router.push({
                  path: this.redirect || '/',
                  query: this.otherQuery
                })
                this.loading = false
              })
              .catch(() => {
                this.loading = false
              })
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      getOtherQuery(query) {
        return Object.keys(query).reduce((acc, cur) => {
          if (cur !== 'redirect') {
            acc[cur] = query[cur]
          }
          return acc
        }, {})
      }
    }
  }

</script>

<style lang="scss">
  /* 修复input 背景不协调 和光标变色 */
  /* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

  $bg:#F0F3F7;
  $light_gray:#4E5969;
  $cursor: #fff;

  @supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
    .login-container .el-input input {
      color: $cursor;
    }
  }

  /* reset element-ui css */
  .login-container {
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: url('../../assets/image/loginbg.png') no-repeat;
    background-size: 100% 100%;

    .el-input {
      display: inline-block;
      height: 40px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 40px;
        caret-color: $cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: $cursor !important;
        }
      }
    }

    .el-form-item {
      border: 1px solid #C9CDD4;
      background: #fff;
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style lang="scss" scoped>
  $bg:#F0F3F7;
  $dark_gray:#1d87ff;
  $light_gray:#1D2129;

  .login-container {
    min-height: 100%;
    width: 100%;
    background-color: $bg;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 220px 35px 0;
      margin: 0 auto;
      overflow: hidden;
    }

    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;

      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .title-container {
      position: relative;
      text-align: center;

      margin: 0px auto 40px auto;

      .login-logo {
        width: 57px;
        height: 42px;
        vertical-align: middle;
      }

      .title {
        font-size: 33px;
        color: $light_gray;
        font-weight: bold;
        vertical-align: middle;
      }

      .set-language {
        color: #fff;
        position: absolute;
        top: 3px;
        font-size: 18px;
        right: 0px;
        cursor: pointer;
      }
    }
.subtitle-container{
  position: relative;
      text-align: center;
      margin: 0px auto 40px auto;
font-size: 21px;
font-family: PingFangSC-Medium, PingFang SC;
font-weight: 500;
color: #4E5969;
line-height: 22px;
}
.formtip-container{
  width: 96px;
height: 24px;
font-size: 16px;
font-family: PingFangSC-Regular, PingFang SC;
font-weight: 400;
color: #0077FF;
line-height: 24px;
margin: 34px 0 24px 0;
}
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }


    @media only screen and (max-width: 470px) {
      .thirdparty-button {
        display: none;
      }
    }
  }

</style>
