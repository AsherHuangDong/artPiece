<template>
  <div class="content">
    <div class="login-box">
      <div class="loginTitle" style="position: relative;margin-bottom: 0;text-align: center;
    font-size: 36px;font-weight: 600;color: #32325d;">
        {{ $t('Login.Login') }}
        <div style="position: absolute;top: 0;left: -400px;z-index: -1;">
          <img src="../../assets/bg8.png" alt/>
        </div>
        <div style="position: absolute;top: 0;right: -400px;z-index: -1;">
          <img src="../../assets/bg9.png" alt/>
        </div>
      </div>
      <div class="item" style="width: 600px;">
        <!--        <input v-model="loginParams.account" type="text" :placeholder="$t('Login.enter_email')" />-->
        <!--        <input v-model="loginParams.password" type="password" :placeholder="$t('Login.enter_password')" />-->
        <!--        <Button :loading="loading.login" @click="login" class="submit">{{ $t('Login.Login') }}</Button>-->
        <!--        <div class="other">-->
        <!--          <span @click="toFindPwd">{{ $t('Login.Forgot_password') }}?</span>-->
        <!--          <span @click="toRegister">{{ $t('Login.Sign_up') }}</span>-->
        <!--        </div>-->
        <!--        <div style="display: flex;justify-content: center;align-items: center">-->
        <!--          <div-->
        <!--            @click="changeLogin(1)"-->
        <!--            :class="loginStyle === 1 ? 'active' : ''"-->
        <!--            class="Login-with-bithumb"-->
        <!--            style="margin-right: 12px;"-->
        <!--          >{{ $t('Login.Login_with_bithumb') }}</div>-->
        <!--          <div-->
        <!--            @click="changeLogin(2)"-->
        <!--            :class="loginStyle === 2 ? 'active' : ''"-->
        <!--            class="Login-with-bithumb"-->
        <!--          >{{ $t('Login.Login_with_artpiece') }}</div>-->
        <!--        </div>-->
        <div class="login-body">
          <div style="width: 384px;margin: 0 auto;">
            <div style="display: flex;justify-content: flex-start;align-items: center;">
              <img
                style="width: 20px;height: 20px;margin-right: 12px;"
                src="../../assets/i.png"
                alt
              />
              <span
                class="login-bodyTitle"
                style="line-height: 18px;"
              >{{ $t('Login.Please_confirm_whether_the_login_address_is') }}</span>
            </div>
            <div class="login-bodyYellow">https://bithumb.artpiece.com</div>
            <div class="login-bodyLabel">{{ $t('Login.Email_or_phone_number') }}</div>
            <Input
              v-model="loginParams.account"
              type="text"
              style="width: 100%"
              :placeholder="$t('Login.enter_email')"
            />
            <div class="login-bodyLabel">{{ $t('Login.Password') }}</div>
            <Input
              v-model="loginParams.password"
              type="password"
              style="width: 100%"
              :placeholder="$t('Login.enter_password')"
            />
            <!--            <div-->
            <!--              style="display: flex;justify-content: space-between;align-items: center;margin-top:16px;"-->
            <!--            >-->
            <!--              <div class="login-body-yellow2">{{ $t('Login.bottom') }}</div>-->
            <!--              <Button-->
            <!--                :loading="loading.login"-->
            <!--                v-if="!verify"-->
            <!--                @click="login"-->
            <!--                class="login-body-loginBtn"-->
            <!--              >{{ $t('Login.Login') }}</Button>-->
            <!--              <Button-->
            <!--                :loading="loading.login"-->
            <!--                v-if="verify"-->
            <!--                @click="isRobot"-->
            <!--                class="login-body-loginBtn"-->
            <!--              >{{ $t('Login.Login') }}</Button>-->
            <!--            </div>-->
            <Button
              :loading="loading.login"
              v-if="!verify"
              @click="login"
              style="width: 100%;margin-top: 16px;"
              class="login-body-loginBtn login"
            >{{ $t('Nav.Sign_in') }}
            </Button>
            <Button
              :loading="loading.login"
              v-if="verify"
              @click="isRobot"
              style="width: 100%;margin-top: 16px;"
              class="login-body-loginBtn isRobot"
            >{{ $t('Nav.Sign_in') }}
            </Button>
            <div style="text-align: center;margin-top:16px;">
              <span
                class="Sign-up-with-buthumb"
                @click="Signupwithbuthumb"
              >{{ $t('Login.Sign_bithumb') }}</span>
              <div style="width: 1px;height: 8px;background-color: #c0c8d6;display: inline-block;margin: 0 4px;"></div>
              <span
                @click="toRegister"
                class="Sign-up-with-buthumb"
              >{{ $t('Login.Sign_up') }}</span>
              <div style="width: 1px;height: 8px;background-color: #c0c8d6;display: inline-block;margin: 0 4px;"></div>
              <span
                @click="toFindPwd"
                class="Sign-up-with-buthumb"
              >{{ $t('Login.Forgot_password') }}?</span>
            </div>
          </div>
        </div>
      </div>
      <!--      下面第三方登录不要了-->
      <!--      <div class="wrap">-->
      <!--        <p></p>{{ $t('Login.or') }}-->
      <!--        <p></p>-->
      <!--      </div>-->
      <!--      <div class="login-type kakao" @click="SNSLogin"><img src="../../assets/kakao.png" alt="">{{-->
      <!--        $t('Login.Login_kakao') }}-->
      <!--      </div>-->
      <!--      <div class="login-type naver" @click="SNSLogin"><img src="../../assets/Naver.png" alt="">{{-->
      <!--        $t('Login.Login_Naver') }}-->
      <!--      </div>-->
      <!--      <div class="login-type facebook" @click="SNSLogin"><img src="../../assets/Facebook.png" alt="">{{-->
      <!--        $t('Login.Login_Facebook') }}-->
      <!--      </div>-->
      <!--      <div class="login-type google" @click="SNSLogin"><img src="../../assets/googleb.png" alt="">{{-->
      <!--        $t('Login.Login_Google') }}-->
      <!--      </div>-->
    </div>
    <!-- <div class="showCover">
      <VueGrecaptcha
        v-if="verify"
        ref="recaptcha"
        @verify="callback"
        sitekey="6Lcd7soUAAAAAK2wjNMziMY9_A1XZyJZnQJa-j3P"
        class="verify"
      ></VueGrecaptcha>
    </div>-->
    <FailedModal :show="showFailed" :text="failedText"></FailedModal>
    <!--    bithumb成功、失败登录提示-->
    <Modal @on-cancel="successOK" :mask-closable="false" v-model="show.success" width="592" height="432">
      <div style="text-align: center;padding-top: 32px;padding-bottom: 20px;">
        <div class="Bithumb-account-noti">{{ $t('Bithumb_account_notice') }}</div>
        <img src="../../assets/bithumb_artpiece.png" width="386" alt="" style="width: 386px;">
        <div style="width: 64px;height: 64px;margin: 32px auto 8px;">
          <img src="../../assets/success.png" alt="">
        </div>
        <div class="Bithumb-account-link">{{ $t('bithumb_link_success') }}</div>
        <div class="Bithumb-account-linkText pointer" @click="successOK">{{ $t('OK') }}</div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
    <Modal v-model="show.failed" :mask-closable="false" width="592" height="432">
      <div style="text-align: center;padding-top: 32px;padding-bottom: 20px;">
        <div class="Bithumb-account-noti">{{ $t('Bithumb_account_notice') }}</div>
        <img src="../../assets/bithumb_artpiece.png" width="386" alt="" style="width: 386px;">
        <div style="width: 64px;height: 64px;margin: 32px auto 8px;">
          <img src="../../assets/failed.png" alt="">
        </div>
        <div class="Bithumb-account-link" style="margin-bottom: 0;">{{ $t('lock_user_info') }}</div>
        <div class="Please-confirm-your">{{ show.failedText }}</div>
        <div class="Bithumb-account-linkText pointer" @click="failedOK">{{ $t('OK') }}</div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  // import VueGrecaptcha from "vue-recaptcha";
  import FailedModal from "../modal/FailedModal";

  export default {
    name: "login",
    components: {FailedModal},
    data() {
      return {
        show: {
          success: false,
          success2: false,
          failed: false,
          failed2: false,
          failedText: "",
          successText: '',
          failedText2: '',
          failed3: false,
          failedText3: ''
        },
        verify: false,
        loginStyle: 2,
        loginModal: true,
        showFailed: false,
        failedText: "",
        loading: {
          login: false
        },
        loginParams: {
          account: "",
          password: ""
        }
      };
    },
    beforeRouteEnter(to, from, next) {
      if (to.query.token && Number(to.query.status) < 2) {
        localStorage.setItem('token', to.query.token)
        window.newVue.$post('/api/user/getUserByToken').then(res => {
          if (res.code === 1001) {
            if (res.data === null) {
              window.newVue.$store.commit('isSign', '0') // 改变登录状态
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              window.newVue.$store.commit('setUserEmail', '')
              next('/login?status=4')
            } else {
              window.newVue.$post("/api/account/getUserAp").then(res => {
                if (res.code === 0) {
                  window.newVue.$store.commit("setAp", res.data.availableAP.balance)
                }
              })
              window.newVue.$store.commit('isSign', '1') // 改变登录状态
              let a = res.data.email
              let b = a.substr(0, 2)
              let c = a.substr(a.length - 5, 5)
              res.data.email2 = res.data.email
              res.data.email = b + '****' + c
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              window.newVue.$store.commit('setUserEmail', res.data.email)
              window.newVue.$store.commit('isBithumb', 1)
              next()
            }
          } else {
            next('/login')
          }
        })
      }
      else if(to.query.token === undefined && to.query.status >= 2) {
        window.newVue.$store.commit('isSign', '0') // 改变登录状态
        localStorage.setItem('userInfo', '')
        window.newVue.$store.commit('setUserEmail', '')
        next()
      } else if(to.query.status !== undefined) {
        next('/login')
      } else {
        next()
      }
    },
    mounted() {
      // 先获取谷歌人机验证的一些东西，防止人机验证没有拿到东西
      this.$recaptchaLoaded();
      // bithumb登录成功显示结果
      if (this.$route.query.status !== undefined) {
        this.successT = setTimeout(() => {
          this.show.successText = "";
          this.show.success = false;
          this.$store.commit("isSign", "1");
          this.$router.push('/')
        }, 5000);
        switch (this.$route.query.status) {
          case '0':
            this.show.successText = this.$t('success');
            this.show.success = true;
            break;
          case '1':
            clearTimeout(this.successT)
            this.$store.commit("isSign", "1");
            this.$router.push('/')
            break;
          case '2':
            this.show.failedText = this.$t('get_bit_userAu_failed');
            this.show.failed = true;
            clearTimeout(this.successT)
            break;
          case '3':
            this.show.failedText = this.$t('alreadyEx');
            this.show.failed = true;
            clearTimeout(this.successT)
            break;
          case '4':
            this.show.failedText = this.$t('get_bit_userInfo_failed');
            this.show.failed = true;
            clearTimeout(this.successT)
            break;
          case '5':
            this.show.failedText = this.$t('login_time_out');
            this.show.failed = true;
            clearTimeout(this.successT)
            break;
          case '6':
            this.show.failedText = this.$t('count_freeze');
            this.show.failed = true;
            clearTimeout(this.successT)
            break;
        }
      }
    },
    methods: {
      // bithumb成功\失败登录后点OK
      successOK() {
        clearTimeout(this.successT)
        this.show.successText = "";
        this.$store.commit("isSign", "1");
        this.show.success = false;
        this.$router.push('/')
      },
      failedOK() {
        this.$store.commit("isSign", "0");
        this.show.failedText = "";
        this.show.failed = false;
        // 退出登录后跳到首页
        // this.$router.push('/login')
        this.$router.push('/')
      },
      // 人机验证
      isRobot() {
        let self = this;
        // this.$recaptchaLoaded(); // 已经在mounted中执行了
        this.$recaptcha().then(token => {
          let form = new FormData();
          form.append("token", token);
          self.$post("/api/user/reCAPTCHA", form).then(res => {
            if (res.success && res.score > 0.8) {
              self.login();
            }
          });
        });
      },
      Signupwithbuthumb() {
        location.href = "/api/bithumb-family/callback/?memberCodeEnc=333";
      },
      changeLogin(n) {
        this.loginStyle = n;
      },
      login() {
        // 原来的登录
        this.verify = true;
        const self = this;
        this.loading.login = true;
        let form = new FormData();
        for (let i in this.loginParams) {
          form.append(i, this.loginParams[i]);
        }
        form.append("use", self.$t("Login.Login"));
        let d = window.newVue.$lang.toString().replace(/-/g, "_");
        form.append("language", d);
        this.$post("/api/user/login", form)
          .then(res => {
            console.log(res);
            if (res.code === 0) {
              sessionStorage.setItem("verifyEmail", res.data.email);
              sessionStorage.setItem("verifyUserId", res.data.userId);
              this.$router.push({
                name: "loginVerify",
                params: {data: res.data}
              });
            } else {
              this.verify = true;
              this.showFailed = true;
              this.failedText = res.msg
              setTimeout(() => {
                this.showFailed = false;
              }, 2000);
            }
          })
          .finally(() => {
            this.loading.login = false;
          });
      },
      SNSLogin() {
        this.$router.push("/SNSLogin");
      },
      toRegister() {
        this.$router.push("/register");
      },
      toFindPwd() {
        this.$router.push("/forgetpwd");
      }
    }
  };
</script>
<style>
  .Please-confirm-your {
    margin-bottom: 20px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 20px;
    letter-spacing: -0.4px;
    text-align: center;
    color: #bdc6d4;
  }

  .Bithumb-account-linkText {
    margin: 0 auto;
    background-color: #565abf;
    width: 384px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    color: #ffffff;
  }

  .Bithumb-account-link {
    margin-bottom: 40px;
    height: 36px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -1px;
    text-align: center;
    color: #32325d;
  }

  .Bithumb-account-noti {
    height: 48px;
    font-family: CircularStd;
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    text-align: center;
    color: #32325d;
  }

  .verify {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position: fixed;
    display: flex;
    justify-content: center;
    padding-top: 100px;
  }

  @font-face {
    font-family: CircularStd;
    src: url("../../assets/font/Main.ttf");
  }

  .Sign-up-with-buthumb:hover {
    cursor: pointer;
  }

  .Login-with-bithumb:hover {
    color: #565abf;
    cursor: pointer;
  }

  .loginTitle {
    font-family: CircularStd;
    font-weight: 600;
  }

  .Sign-up-with-buthumb {
    width: 132px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #32325d;
  }

  .login-body-loginBtn {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
    height: 40px;
    border-radius: 2px;
    background-color: #565abf !important;
  }

  .login-body-yellow2 {
    width: 278px;
    height: 32px;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.6px;
    color: #f7d269;
  }

  .login-body .ivu-input {
    height: 40px;
  }

  .login-bodyLabel {
    margin-top: 13px;
    margin-bottom: 6px;
    width: 384px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .login-bodyYellow {
    padding: 4px 8px;
    margin-top: 6px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
    width: 100%;
    height: 24px;
    border-radius: 2px;
    background-color: #f7e9c1;
  }

  .login-bodyTitle {
    width: 360px;
    height: 16px;
    font-family: NotoSansCJKkr;
    font-size: 12px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.6px;
    color: #32325d;
  }

  .login-body {
    padding: 32px 0;
    margin: 0 auto;
    width: 592px;
    height: 372px;
    /*background-color: #f7f9fc;*/
  }

  .Login-with-bithumb {
    padding: 8px 0;
    height: 45px;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.4;
    letter-spacing: -1px;
    color: #32325d;
  }

  .active {
    color: #565abf;
    border-bottom: 2px solid #565abf;
  }

  .loginModalHeader {
    width: 384px;
    height: 48px;
    font-family: CircularStd;
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    text-align: center;
    color: #32325d;
  }
</style>
<style lang="scss" scoped>
  .content {
    width: 100%;
    padding-bottom: 160px;

    .login-box {
      width: 600px;
      margin: 80px auto 0;

      h3 {
        font-size: 36px;
        font-weight: 500;
        text-align: center;
        color: #32325d;
        margin-bottom: 32px;
      }

      .item {
        margin-bottom: 42px;

        input {
          height: 48px;
          border-radius: 2px;
          border: solid 1px #e6ebf1;
          background-color: #ffffff;
          padding-left: 20px;
          width: 100%;
          margin-bottom: 8px;
        }

        input::-webkit-input-placeholder {
          font-family: CircularStd;
          font-size: 14px;
          font-weight: normal;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.43;
          letter-spacing: -0.4px;
          color: #bdc6d4;
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

        .other {
          display: flex;
          justify-content: space-between;
          margin-top: 16px;
          font-size: 14px;
          font-weight: 500;
          color: #565abf;

          span {
            cursor: pointer;
          }
        }
      }

      .wrap {
        width: 360px;
        margin: 0 auto;
        text-align: center;
        display: flex;
        font-size: 14px;
        line-height: 0;
        color: #bdc6d4;

        p {
          width: 176px;
          height: 1px;
          background-color: #f7f9fc;
        }
      }

      .login-type {
        margin: 0 auto 8px;
        position: relative;
        font-size: 14px;
        color: #3b1e1e;
        width: 60%;
        height: 40px;
        line-height: 40px;
        text-align: center;
        border-radius: 2px;
      }

      .login-type img {
        position: absolute;
        top: 10px;
        left: 18px;
        width: 20px;
        height: 20px;
      }

      .kakao {
        margin-top: 40px;
        color: #3b1e1e;
        background: #fce800;
      }

      .naver {
        color: #ffffff;
        background: #00c73c;
      }

      .facebook {
        color: #fff;
        background: #3b5998;
      }

      .google {
        color: #32325d;
        background: #f7f9fc;
      }
    }
  }
</style>
