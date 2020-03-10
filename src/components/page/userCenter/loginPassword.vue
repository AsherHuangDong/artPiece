<template>
  <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center') }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
        <div class="location1">{{ $t('userCenter.loginPassword.Change_password') }}</div>
      </div>
      <div class="Mask">
        <div class="h">
          <div class="text">
            {{ $t('userCenter.loginPassword.Change_login_password') }}
          </div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div class="label" style="color: #f7d269;">{{ $t('userCenter.changePWDCantDO') }}</div>
          <div class="label">{{ $t('userCenter.loginPassword.Old_Password') }}</div>
          <input v-model="modifyPwdParams.oldPwd" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.Please_old_password')">
          <div class="label">{{ $t('userCenter.loginPassword.New_Password') }}</div>
          <input id="newPasswordInput" v-model="modifyPwdParams.newPwd" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.Please_new_password')">
          <div id="newPasswordNotice" style="margin-top: -16px;display: none;color:red;font-weight: 500;">{{
            formatNotice.password1 }}
          </div>
          <!--          判断密码强度-->
          <div v-if="passwordTipDivGroup" class="passwordTipDivGroup">
            <div v-if="passwordTipDiv11" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconTrue.png" alt=""></div>
              <div class="passwordTip">{{ $t('register.No_8chracters') }}</div>
            </div>
            <div v-if="passwordTipDiv12" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('register.No_8chracters') }}</div>
            </div>
            <div v-if="passwordTipDiv21" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconTrue.png" alt=""></div>
              <div class="passwordTip">{{ $t('register.Numbers_included') }}</div>
            </div>
            <div v-if="passwordTipDiv22" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('register.Numbers_included') }}</div>
            </div>
            <div v-if="passwordTipDiv31" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconTrue.png" alt=""></div>
              <div class="passwordTip">{{ $t('register.Letters_included') }}</div>
            </div>
            <div v-if="passwordTipDiv32" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('register.Letters_included') }}</div>
            </div>
            <div v-if="passwordTipDiv41" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconTrue.png" alt=""></div>
              <div class="passwordTip">{{ $t('register.Special_chracters') }}</div>
            </div>
            <div v-if="passwordTipDiv42" class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('register.Special_chracters') }}</div>
            </div>
          </div>
          <!--          判断密码强度结束-->
          <div class="label">{{ $t('userCenter.loginPassword.Confirm_Password') }}</div>
          <input v-model="rPassword" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.again_new_password')">
          <div v-if="rPasswordNoticeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            rPasswordNotice }}
          </div>
          <div class="label">{{ $t('userCenter.loginPassword.Email_Verification_code') }}
            <div @click="getVerifyCodeWithoutAccount" class="send">{{ disabled.phoneCode ? timer.phoneCode + 's' :
              $t('userCenter.loginPassword.Send') }}
            </div>
          </div>
          <input v-model="modifyPwdParams.verifyCode" class="Field" type="text"
                 :placeholder="$t('userCenter.loginPassword.Please_email_verification')">
          <div v-if="isSetGoogleAuthenticatorStatus" class="label">{{
            $t('userCenter.loginPassword.Google_Verification_code') }}
          </div>
          <input v-if="isSetGoogleAuthenticatorStatus" v-model="modifyPwdParams.googleCode" class="Field" type="text"
                 :placeholder="$t('userCenter.loginPassword.Please_Google_verification')">
          <Button :loading="loading.confirm" @click="modifyPwd" class="changeBtn">
            <div class="Text">{{ $t('userCenter.loginPassword.Change') }}</div>
          </Button>
        </div>
      </div>
    </div>
    <FailedModal :show="showFailed" :text="failedText" :text2="failedText2"></FailedModal>
    <SuccessModal :show="showSuccess" :text="successText"></SuccessModal>
  </div>
</template>

<script>
  import FailedModal from "../../modal/FailedModal";
  import SuccessModal from "../../modal/SuccessModal";

  export default {
    name: "loginPassword",
    components: {FailedModal, SuccessModal},
    data() {
      const self = this
      return {
        showSuccess: false,
        successText: self.$t('userCenter.loginPassword.changed_successfully'),
        rPasswordNoticeF: false,
        rPasswordNotice: self.$t('userCenter.loginPassword.inconsistent_password'),
        rPassword: '',
        showFailed: false,
        failedText: '',
        failedText2: '',
        loading: {
          confirm: false
        },
        disabled: {
          phoneCode: false
        },
        timer: {
          phoneCode: 60
        },
        modifyPwdParams: {
          googleCode: '',
          newPwd: '',
          oldPwd: '',
          type: '1',
          verifyCode: ''
        },
        isSetGoogleAuthenticatorStatus: 0,
        passwordTipDivGroup: false,
        passwordTipDivGroupMargin: 16,
        passwordTipDiv11: false,
        passwordTipDiv21: false,
        passwordTipDiv31: false,
        passwordTipDiv41: false,
        passwordTipDiv12: true,
        passwordTipDiv22: true,
        passwordTipDiv32: true,
        passwordTipDiv42: true,
        formatNotice: {
          password1: ''
        }
      }
    },
    mounted() {
      const self = this
      // 密码强度提示
      const passwordInput = document.getElementById('newPasswordInput')
      passwordInput.onfocus = function () {
        self.passwordTipDivGroupMargin = 5
        self.passwordTipDivGroup = true
      }
      passwordInput.onblur = function () {
        self.passwordTipDivGroupMargin = 16
        self.passwordTipDivGroup = false
      }
      passwordInput.oninput = function () {
        if (this.value.length >= 8) {
          self.passwordTipDiv11 = true
          self.passwordTipDiv12 = false
        } else {
          self.passwordTipDiv11 = false
          self.passwordTipDiv12 = true
        }
        const r = /[0-9]/g
        if (this.value.match(r) !== null) {
          self.passwordTipDiv21 = true
          self.passwordTipDiv22 = false
        } else {
          self.passwordTipDiv21 = false
          self.passwordTipDiv22 = true
        }
        const s = /[a-z]/g
        const t = /[A-Z]/g
        if (this.value.match(s) !== null && this.value.match(t) !== null) {
          self.passwordTipDiv31 = true
          self.passwordTipDiv32 = false
        } else {
          self.passwordTipDiv31 = false
          self.passwordTipDiv32 = true
        }
        const pattern = /[`_\-~!@#$^&*()=|{}':;',\\[\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g
        if (this.value.match(pattern) !== null) {
          self.passwordTipDiv41 = true
          self.passwordTipDiv42 = false
        } else {
          self.passwordTipDiv41 = false
          self.passwordTipDiv42 = true
        }
      }
      // 密码强度提示 end
      this.isSetGoogleAuthenticator()
      this.test2()
    },
    methods: {
      // 测试
      test2() {
        this.$post('/api/account/getUserRevenue', {})
      },
      //  是否绑定谷歌验证器
      isSetGoogleAuthenticator() {
        this.$post('/api/user/isSetGoogleAuthenticator').then(res => {
          // 已绑定 返回成功data:1
          // 未绑定 返回成功data:0
          this.isSetGoogleAuthenticatorStatus = res.data
        })
      },
      modifyPwd() {
        // 判断密码强度
        let newPasswordNotice = document.getElementById('newPasswordNotice')
        let newPasswordInput = document.getElementById('newPasswordInput')
        if (this.passwordTipDiv12 || this.passwordTipDiv22 || this.passwordTipDiv32 || this.passwordTipDiv42) {
          newPasswordInput.style.border = '1px red solid'
          newPasswordNotice.style.display = 'block'
          this.formatNotice.password1 = this.$t('register.password_format_error')
          return null
        }
        newPasswordNotice.style.display = 'none'
        newPasswordInput.style.border = 'solid 1px #e6ebf1'
        // 判断密码强度结束
        if (this.rPassword !== this.modifyPwdParams.newPwd) {
          this.rPasswordNoticeF = true
          return null
        }
        this.rPasswordNoticeF = false
        this.loading.confirm = true
        let form = new FormData()
        for (let i in this.modifyPwdParams) {
          form.append(i, this.modifyPwdParams[i])
        }
        this.$post('/api/user/modifyPwd', form).then(res => {
          console.log(res)
          if (res.code === 0) {
            this.showSuccess = true
            setTimeout(() => {
              // 退出登录后跳到首页
              // this.$router.push('/login')
              this.$router.push('/')
            }, 2000)
          } else {
            this.showFailed = true
            this.failedText = this.$t('userCenter.loginPassword.changed_failed')
            this.failedText2 = this.$t('userCenter.loginPassword.captcha_correctly')
            setTimeout(() => {
              this.showFailed = false
              this.failedText = ''
              this.failedText2 = ''
            }, 2000)
          }
        }).finally(() => {
          this.loading.confirm = false
        })
      },
      time(d) {
        const self = this
        const timer = setInterval(() => {
          self.timer[d]--
        }, 1000)
        const timer2 = setTimeout(() => {
          self.timer[d] = 60
          self.disabled[d] = false
          clearInterval(timer)
        }, 60000)
        const clear = function () {
          clearTimeout(timer)
          clearTimeout(timer2)
          this.disabled[d] = false
          this.timer[d] = 60
        }
        return {timer: timer, timer2: timer2, clear: clear}
      },
      getVerifyCodeWithoutAccount() {
        const self = this
        let t = this.time('phoneCode')
        this.disabled.phoneCode = true
        let form = new FormData()
        form.append('use', self.$t('userCenter.index.change_password'))
        let d = window.newVue.$lang.toString().replace(/-/g, "_")
        form.append('language', d)
        this.$post('/api/user/getVerifyCodeWithoutAccount', form).then(res => {
          console.log(res)
          if (res.msg !== '成功') {
            t.clear()
            this.showFailed = true
            this.failedText = this.$t('userCenter.loginPassword.get_code_failed')
            setTimeout(() => {
              this.showFailed = false
            }, 2000)
          }
        })
      }
    }
  }
</script>
<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .item .ivu-select-input {
    padding-left: 20px;
    width: 100%;
    height: 36px;
    border-radius: 2px;
    font-size: 14px;
  }

  .item .ivu-select-single .ivu-select-selection {
    height: 38px !important;
  }

  .successful {
    width: 100%;
    padding-top: 100px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -1px;
    text-align: center;
    color: #32325d;
  }

  .successIcon {
    width: 48px;
    height: 48px;
    position: absolute;
    top: 50%;
    margin-top: -44px;
    left: 50%;
    margin-left: -24px;
  }

  .ivu-modal-body {
    position: relative;
    padding: 0 !important;
  }

  .success {
    width: 384px;
    height: 156px;
    border-radius: 4px;
    background-color: #ffffff;
  }

  .ivu-modal-close {
    display: none;
  }

  .ivu-modal-footer {
    border: 0 !important;
    padding: 0 !important;
  }
</style>
<style lang="scss" scoped>
  .pointer:hover {
    cursor: pointer;
  }
  .submit:hover {
    cursor: pointer;
  }

  input {
    color: #000 !important;
  }

  .passwordTipDivGroup {
    margin-bottom: 16px;
  }

  .passwordTipDiv {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .passwordIcon {
    width: 13.3px;
    height: 13.3px;
    border-radius: 10px;
  }

  .passwordTipFalse {
    margin-top: 3px;
    margin-left: 6px;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #bdc6d4;
  }

  .passwordTip {
    margin-top: 3px;
    margin-left: 6px;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  input::placeholder {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .changeBtn {
    float: right;
    width: 92px;
    height: 40px;
    //border-radius: 2px;
    background-color: #565abf;
    padding: 10px 22px;

    .Text {
      height: 20px;
      font-family: CircularStd;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.43;
      letter-spacing: -0.4px;
      text-align: center;
      color: #ffffff;
    }
  }

  .send {
    position: absolute;
    top: 35px;
    right: 16px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .send:hover {
    cursor: pointer;
  }

  .Field {
    margin-bottom: 16px;
    display: inline-block;
    padding: 10px 16px;
    width: 384px;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  input::placeholder {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .label {
    position: relative;
    margin-bottom: 6px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Mask {
    margin: 0 auto;
    width: 800px;
    height: 570px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;

    .h {
      border-radius: 4px 4px 0 0;
      padding: 8px 16px;
      width: 798px;
      height: 40px;
      box-shadow: inset 0 -1px 0 0 #e6ebf1;
      background-color: #ffffff;

      .text {
        height: 24px;
        font-family: CircularStd;
        font-size: 16px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: -0.65px;
        color: #32325d;
      }
    }
  }

  .location {
    margin: 0 auto;
    width: 800px;
    padding: 8px 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .location1 {
    height: 20px;
    opacity: 0.8;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }
</style>
