<template>
  <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="toUserCenter">{{ $t('userCenter.loginPassword.User_center') }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
        <div class="location1">{{ $t('userCenter.loginPassword.Change_password') }}</div>
      </div>
      <div class="Mask">
        <div class="h">
          <div class="text">
            {{ $t('userCenter.paymentPassword.Change_password') }}
          </div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div class="label" style="color: #f7d269;">{{ $t('userCenter.changePWDCantDO') }}</div>
          <div class="label">{{ $t('userCenter.loginPassword.Old_Password') }}</div>
          <input id="oldPwd" v-model="modifyPwdParams.oldPwd" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.Please_old_password')">
          <div v-if="oldPwdNoticeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            oldPwdNotice }}
          </div>
          <div class="label">{{ $t('userCenter.loginPassword.New_Password') }}</div>
          <input id="newPwd" v-model="modifyPwdParams.newPwd" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.Please_new_password')">
          <div v-if="newPwdNoticeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            newPwdNotice }}
          </div>
          <div class="label">{{ $t('userCenter.loginPassword.Confirm_Password') }}</div>
          <input id="rPassword" v-model="rPassword" class="Field" type="password"
                 :placeholder="$t('userCenter.loginPassword.again_new_password')">
          <div v-if="rPasswordNoticeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            rPasswordNotice }}
          </div>
          <div class="label">{{ $t('userCenter.loginPassword.Email_Verification_code') }}
            <div @click="getVerifyCodeWithoutAccount" class="send">{{ disabled.phoneCode ? timer.phoneCode + 's' :
              $t('userCenter.loginPassword.Send')}}
            </div>
          </div>
          <input id="verifyCode" v-model="modifyPwdParams.verifyCode" class="Field" type="text"
                 :placeholder="$t('userCenter.loginPassword.Please_email_verification')">
          <div v-if="verifyCodeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            verifyCodeNotice }}
          </div>
          <div v-if="isSetGoogleAuthenticatorStatus" class="label">{{
            $t('userCenter.loginPassword.Google_Verification_code') }}
          </div>
          <input id="googleCode" v-if="isSetGoogleAuthenticatorStatus" v-model="modifyPwdParams.googleCode"
                 class="Field" type="text"
                 :placeholder="$t('userCenter.loginPassword.Please_Google_verification')">
          <div v-if="googleCodeF"
               style="margin-bottom: -17px; position: relative;bottom:17px; color:red;font-weight: 500;">{{
            googleCodeNotice }}
          </div>
          <Button :loading="loading.confirm" @click="modifyPwd" class="changeBtn Text" style="color: #fff">
            {{ $t('userCenter.loginPassword.Change') }}
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
    name: "paymentPassword",
    components: {FailedModal, SuccessModal},
    data() {
      return {
        showSuccess: false,
        successText: '',
        rPasswordNoticeF: false,
        rPasswordNotice: '',
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
          type: '2',
          verifyCode: ''
        },
        isSetGoogleAuthenticatorStatus: 0,
        oldPwdNoticeF: false,
        oldPwdNotice: '',
        newPwdNoticeF: false,
        newPwdNotice: '',
        verifyCodeF: false,
        verifyCodeNotice: '',
        googleCodeF: '',

      }
    },
    watch: {
      $lang() {
        this.rPasswordNotice = this.$t('userCenter.paymentPassword.content1')
      }
    },
    mounted() {
      this.isSetGoogleAuthenticator()
    },
    methods: {
      toUserCenter(){
        this.$router.go(-1)
      },
      //  是否绑定谷歌验证器
      isSetGoogleAuthenticator() {
        this.$post('/api/user/isSetGoogleAuthenticator').then(res => {
          // 已绑定 返回成功data:1
          // 未绑定 返回成功data:0
          this.isSetGoogleAuthenticatorStatus = res.data
          // this.isSetGoogleAuthenticatorStatus = 1
        })
      },
      modifyPwd() {
        // 数据校验
        let rPassword = document.getElementById('rPassword')
        let oldPwd = document.getElementById('oldPwd')
        let newPwd = document.getElementById('newPwd')
        let verifyCode = document.getElementById('verifyCode')
        let googleCode = document.getElementById('googleCode')
        if (this.modifyPwdParams.googleCode === ''&&this.isSetGoogleAuthenticatorStatus==1) {
          this.googleCodeF = true
          this.googleCodeNotice = this.$t('userCenter.paymentPassword.content8')
          googleCode.style.border = '1px red solid'
        } else {
          this.googleCodeF = false
        }
        if (this.modifyPwdParams.verifyCode === '') {
          this.verifyCodeF = true
          this.verifyCodeNotice = this.$t('userCenter.paymentPassword.content8')
          verifyCode.style.border = '1px red solid'
        } else {
          this.verifyCodeF = false
        }
        if (this.modifyPwdParams.newPwd === '') {
          this.newPwdNoticeF = true
          this.newPwdNotice = this.$t('userCenter.paymentPassword.content8')
          newPwd.style.border = '1px red solid'
        } else {
          this.newPwdNoticeF = false
        }
        if (this.modifyPwdParams.oldPwd === '') {
          this.oldPwdNoticeF = true
          this.oldPwdNotice = this.$t('userCenter.paymentPassword.content8')
          oldPwd.style.border = '1px red solid'
        } else {
          this.oldPwdNoticeF = false
        }
        if (this.rPassword !== this.modifyPwdParams.newPwd) {
          this.rPasswordNoticeF = true
          this.rPasswordNotice = this.$t('userCenter.paymentPassword.content1')
          rPassword.style.border = '1px red solid'
        } else {
          this.rPasswordNoticeF = false
        }
        if (this.rPasswordNoticeF || this.oldPwdNoticeF || this.newPwdNoticeF
        || this.verifyCodeF || this.googleCodeF) {
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
            this.successText = this.$t('userCenter.paymentPassword.content2')
            setTimeout(() => {
              this.$router.push('/account')
            }, 2000)
          } else {
            this.showFailed = true
            this.failedText = this.$t('Tranding.failed')
            this.failedText2 = res.msg
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
        form.append('use', self.$t('userCenter.paymentPassword.Change_password'))
        let d = window.newVue.$lang.toString().replace(/-/g, "_")
        form.append('language', d)
        this.$post('/api/user/getVerifyCodeWithoutAccount', form).then(res => {
          console.log(res)
          if (res.msg !== '成功') {
            t.clear()
            this.showFailed = true
            this.failedText = this.$t('userCenter.paymentPassword.content7')
            setTimeout(() => {
              this.showFailed = false
            }, 2000)
          }
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .pointer:hover {
    cursor: pointer;
  }
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .changeBtn {
    float: right;
    width: 96px;
    height: 40px;
    border-radius: 2px;
    background-color: #565abf;

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
    padding-bottom: 54px;
    margin: 0 auto;
    width: 800px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;

    .h {
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
