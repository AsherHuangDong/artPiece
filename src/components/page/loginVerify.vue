<template>
  <div class="content">
    <div class="resset-box">
      <h3 style="position: relative;">{{ $t('Login_Verify.Login_Verify') }}
        <div style="position: absolute;top: 0;left: -400px;z-index: -1;"><img src="../../assets/bg8.png" alt=""></div>
        <div style="position: absolute;top: 0;right: -400px;z-index: -1;"><img src="../../assets/bg9.png" alt=""></div>
      </h3>
      <div
        class="tishi"
      >{{ $t('Login_Verify.content1') }}
      </div>
      <div class="one-step">
        <p>{{ codeMethod }}</p>
        <div class="input">
          <input v-model="verifyParams.verifyCode" type="text" class="one"
                 :placeholder="$t('Login_Verify.enter_code')"/>
        </div>
        <Button :loading="loading.verify" @click="verify" class="submit">{{ $t('Login_Verify.Verify') }}</Button>
      </div>
    </div>
    <SuccessModal :show="show.success" :text="$t('Login_Verify.SignIn_Success')"></SuccessModal>
    <FailedModal :show="show.failed" :text="$t('Login_Verify.SignIn_Failed')" :text2="failedMsg"></FailedModal>
  </div>
</template>

<script>
  import SuccessModal from "../modal/SuccessModal";
  import FailedModal from "../modal/FailedModal";

  export default {
    name: "loginVerify",
    components: {SuccessModal, FailedModal},
    data() {
      return {
        failedMsg: '',
        show: {
          success: false,
          failed: false
        },
        routeData: {},
        loading: {
          verify: false
        },
        verifyParams: {
          userId: sessionStorage.getItem('verifyUserId'),
          verifyCode: ''
        },
        codeMethod: ''
      }
    },
    watch: {
      $lang(n) {
        console.log(n)
        if (this.routeData.google === '') {
          this.codeMethod = this.$t('Login_Verify.Google_code')
        } else if (this.routeData.mobile) {
          this.codeMethod = this.$t('Login_Verify.Phone_code')
        } else {
          this.codeMethod = this.$t('Login_Verify.email') + ':' + sessionStorage.getItem('verifyEmail')
        }
      }
    },
    mounted() {
      this.checkLoginStyle()
    },
    methods: {
      checkLoginStyle() {
        this.routeData = this.$route.params.data
        console.log(this.routeData)
        if (this.routeData.google === '') {
          this.codeMethod = this.$t('Login_Verify.Google_code')
        } else if (this.routeData.mobile) {
          this.codeMethod = this.$t('Login_Verify.Phone_code')
          this.getPhoneCode()
        } else {
          this.codeMethod = this.$t('Login_Verify.email') + ':' + sessionStorage.getItem('verifyEmail')
        }
      },
      getPhoneCode() {
        const self = this
        let form = new FormData()
        form.append('mobile', this.routeData.mobile)
        form.append('use', self.$t('Login_Verify.Login_Verify'))
        let d = window.newVue.$lang.toString().replace(/-/g, "_")
        form.append('language', d)
        this.$post('/api/user/getVerifyCodeWithMobile', form)
      },
      getUserAp() {
        this.$post('/api/account/getUserAp').then(res => {
          console.log(res)
          try {
            this.$store.commit('setAp', res.data.availableAP.balance)
            // 0没登陆，1登录
            localStorage.setItem('isSign', '1')
          } catch (e) {
            this.$store.commit('isSign', '0')
            this.$store.commit('setAp', 0)
            this.$store.commit('setUserEmail', '')
          }
        })
      },
      verify() {
        this.loading.verify = true
        console.log('verify')
        let form = new FormData()
        for (let i in this.verifyParams) {
          form.append(i, this.verifyParams[i])
        }
        this.$post('/api/user/verify', form).then(res => {
          console.log(res)
          if (res.code === 0) {
            localStorage.setItem('token', res.data.token)
            this.$store.commit('isSign', '1') // 改变登录状态
            let a = res.data.email
            let b = a.substr(0, 2)
            let c = a.substr(a.length - 5, 5)
            res.data.email2 = res.data.email
            res.data.email = b + '****' + c
            localStorage.setItem('userInfo', JSON.stringify(res.data))
            this.$store.commit('setUserEmail', res.data.email)
            this.show.success = true
            localStorage.setItem('isSign', '1')
            this.$store.commit('isSign', '1')
            this.getUserAp()
            // 登陆成功，调一次语言接口
            let d = window.newVue.$lang.toString().replace(/-/g, "_");
            form.append("language", d);
            this.$post("/api/user/userLanguage", form);
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }else{
            this.show.failed = true
            this.failedMsg = res.msg
            setTimeout(() => {
              this.show.failed = false
            }, 2000)
          }
        }).finally(() => {
          this.loading.verify = false
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: CircularStd;
    src: url('../../assets/font/Main.ttf');
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

  .content {
    width: 100%;
    padding-bottom: 160px;

    .resset-box {
      width: 384px;
      margin: 80px auto 0;

      h3 {
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #32325d;
        margin-bottom: 8px;
      }

      .tishi {
        height: 40px;
        font-size: 14px;
        text-align: center;
        color: #32325d;
        margin-bottom: 16px;
        line-height: 20px;
      }

      .one-step {
        p {
          line-height: 20px;
          font-size: 14px;
          color: #32325d;
          padding-bottom: 6px;
        }

        .input {
          display: flex;
          justify-content: space-between;

          span {
            width: 79px;
            height: 40px;
            line-height: 38px;
            border-radius: 2px;
            border: solid 2px #abaddf;
            font-size: 14px;
            font-weight: 500;
            text-align: center;
            color: #565abf;
          }

          .one {
            width: 100%;
            height: 40px;
            border-radius: 2px;
            border: solid 1px #e6ebf1;
            background-color: #ffffff;
            margin-bottom: 8px;
            padding-left: 20px;
          }
        }
      }

      .three-step,
      .two-step {
        p {
          font-size: 14px;
          color: #32325d;
          padding-bottom: 6px;
          line-height: 20px;
        }

        input {
          height: 40px;
          border-radius: 2px;
          border: solid 1px #e6ebf1;
          background-color: #ffffff;
          padding-left: 20px;
          width: 100%;
          margin-bottom: 8px;
        }
      }

      .submit {
        margin-top: 8px;
        width: 100%;
        height: 48px;
        border-radius: 2px;
        background-color: #565abf;
        font-size: 14px;
        font-weight: 500;
        line-height: 32px;
        text-align: center;
        color: #ffffff;
      }
    }

    .fourth-step {
      width: 430px;
      margin: 80px auto 0;

      .icon {
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background: #aff1b6;
        margin: 0 auto;
      }

      h3 {
        font-size: 36px;
        font-weight: 500;
        line-height: 48px;
        letter-spacing: -1px;
        color: #32325d;
        margin-top: 16px;
      }

      .login {
        width: 76px;
        height: 40px;
        border-radius: 2px;
        background-color: #565abf;
        margin: 16px auto 0;
        font-size: 14px;
        font-weight: 500;
        line-height: 40px;
        text-align: center;
        color: #ffffff;
      }
    }
  }
</style>
