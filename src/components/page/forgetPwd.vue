<template>
  <div class="content">
    <div class="resset-box" v-show="steps!=4">
      <h3 style="position: relative;">
        {{ $t('forgetPwd.Reset_password') }}
        <div style="position: absolute;top: 0;left: -400px;z-index: -1;">
          <img src="../../assets/bg8.png" alt />
        </div>
        <div style="position: absolute;top: 0;right: -400px;z-index: -1;">
          <img src="../../assets/bg9.png" alt />
        </div>
      </h3>
      <div class="tishi">{{ $t('forgetPwd.content1') }}</div>
      <div class="one-step" v-show="steps==1">
        <p>{{ $t('forgetPwd.Email') }}</p>
        <div class="input">
          <input
            v-model="sendEmail"
            type="text"
            class="one"
            style="width: 298px"
            :placeholder="$t('forgetPwd.enter_email')"
          />
          <Button :loading="loading.vEmail" @click="verifyEmail" class="verify1">
            <span>{{ $t('Login_Verify.Verify') }}</span>
          </Button>
        </div>
        <Button
          :loading="loading.steps1"
          class="submit"
          @click="verifyStep1"
        >{{ $t('forgetPwd.Next') }}</Button>
      </div>
      <div class="two-step" v-show="steps==2">
        <p v-if="isGoogle">{{ $t('forgetPwd.Google_Code') }}</p>
        <input
          v-if="isGoogle"
          v-model="step2Params.googleCode"
          type="text"
          class="one"
          :placeholder="$t('forgetPwd.enter_google_code')"
        />
        <p>{{ $t('forgetPwd.Email_Code') }}</p>
        <input
          v-model="step2Params.emailCode"
          type="text"
          class="one"
          :placeholder="$t('forgetPwd.enter_email_code')"
        />
        <Button
          :loading="loading.steps2"
          class="submit"
          @click="verifyEmailCode"
        >{{ $t('forgetPwd.Next') }}</Button>
      </div>
      <div class="three-step" v-show="steps==3">
        <p>{{ $t('forgetPwd.New_password') }}</p>
        <input
          id="passwordInput"
          v-model="password"
          type="password"
          class="one"
          :placeholder="$t('forgetPwd.enter_New_password')"
        />
        <div
          id="passwordNotice"
          style="display: none;color:red;font-weight: 500;"
        >{{ formatNotice.password1 }}</div>
        <div v-if="passwordTipDivGroup" class="passwordTipDivGroup">
          <div v-if="passwordTipDiv11" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconTrue.png" alt />
            </div>
            <div class="passwordTip">{{ $t('register.No_8chracters') }}</div>
          </div>
          <div v-if="passwordTipDiv12" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconFalse.png" alt />
            </div>
            <div class="passwordTipFalse">{{ $t('register.No_8chracters') }}</div>
          </div>
          <div v-if="passwordTipDiv21" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconTrue.png" alt />
            </div>
            <div class="passwordTip">{{ $t('register.Numbers_included') }}</div>
          </div>
          <div v-if="passwordTipDiv22" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconFalse.png" alt />
            </div>
            <div class="passwordTipFalse">{{ $t('register.Numbers_included') }}</div>
          </div>
          <div v-if="passwordTipDiv31" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconTrue.png" alt />
            </div>
            <div class="passwordTip">{{ $t('register.Letters_included') }}</div>
          </div>
          <div v-if="passwordTipDiv32" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconFalse.png" alt />
            </div>
            <div class="passwordTipFalse">{{ $t('register.Letters_included') }}</div>
          </div>
          <div v-if="passwordTipDiv41" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconTrue.png" alt />
            </div>
            <div class="passwordTip">{{ $t('register.Special_chracters') }}</div>
          </div>
          <div v-if="passwordTipDiv42" class="passwordTipDiv">
            <div class="passwordIcon">
              <img src="../../assets/passwordIconFalse.png" alt />
            </div>
            <div class="passwordTipFalse">{{ $t('register.Special_chracters') }}</div>
          </div>
        </div>
        <p>{{ $t('forgetPwd.Confirm_password') }}</p>
        <input
          v-model="rPassword"
          type="password"
          class="one"
          :placeholder="$t('forgetPwd.Confirm_password')"
        />
        <Button
          :loading="loading.steps3"
          class="submit"
          @click="rePassword"
        >{{ $t('forgetPwd.Next') }}</Button>
      </div>
    </div>
    <div class="fourth-step" v-show="steps==4">
      <div class="icon">
        <img src="../../assets/success.png" alt />
      </div>
      <h3 style="position: relative;text-align: center;">
        {{ $t('forgetPwd.Reset_password_successful') }}
        <div style="position: absolute;top: 0;left: -400px;z-index: -1;">
          <img src="../../assets/bg11.png" alt />
        </div>
        <div style="position: absolute;top: -100px;right: -400px;z-index: -1;">
          <img src="../../assets/bg10.png" alt />
        </div>
      </h3>
      <div class="login" @click="toLogin">{{ $t('forgetPwd.Login') }}</div>
    </div>
    <SuccessModal :show="showSuccess" :text="successText"></SuccessModal>
    <FailedModal :show="showFailed" :text="failedText" :text2="failedText2"></FailedModal>
  </div>
</template>
<script>
import SuccessModal from "../modal/SuccessModal";
import FailedModal from "../modal/FailedModal";

export default {
  name: "forgetPwd",
  components: { SuccessModal, FailedModal },
  data() {
    return {
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
      isGoogle: 0, // 是否绑定谷歌，如果绑定那么需要谷歌验证码
      formatNotice: {
        email: "",
        password: "",
        password1: "",
        payPassword: "",
        payPassword1: "",
        invite: "Invitation code invalid"
      },
      userId: "",
      password: "",
      rPassword: "",
      step2Params: {
        emailCode: "",
        googleCode: ""
      },
      loading: {
        vEmail: false,
        steps1: false,
        steps2: false,
        steps3: false
      },
      showSuccess: false,
      successText: "",
      showFailed: false,
      failedText: "",
      failedText2: "",
      sendEmail: "",
      steps: 1,
      isVerify: false
    };
  },
  mounted() {
    const self = this;
    // 密码强度提示
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.onfocus = function() {
      self.passwordTipDivGroupMargin = 5;
      self.passwordTipDivGroup = true;
      let passwordNotice = document.getElementById("passwordNotice");
      let passwordInput = document.getElementById("passwordInput");
      passwordInput.style.border = "1px #e6ebf1 solid";
      passwordNotice.style.display = "none";
    };
    passwordInput.onblur = function() {
      self.passwordTipDivGroupMargin = 16;
      self.passwordTipDivGroup = false;
      if (
        self.passwordTipDiv12 ||
        self.passwordTipDiv22 ||
        self.passwordTipDiv32 ||
        self.passwordTipDiv42
      ) {
        let passwordNotice = document.getElementById("passwordNotice");
        let passwordInput = document.getElementById("passwordInput");
        passwordInput.style.border = "1px red solid";
        passwordNotice.style.display = "block";
        self.formatNotice.password1 = self.$t("register.password_format_error");
      }
    };
    passwordInput.oninput = function() {
      if (this.value.length >= 8) {
        self.passwordTipDiv11 = true;
        self.passwordTipDiv12 = false;
      } else {
        self.passwordTipDiv11 = false;
        self.passwordTipDiv12 = true;
      }
      const r = /[0-9]/g;
      if (this.value.match(r) !== null) {
        self.passwordTipDiv21 = true;
        self.passwordTipDiv22 = false;
      } else {
        self.passwordTipDiv21 = false;
        self.passwordTipDiv22 = true;
      }
      const s = /[a-z]/g;
      const t = /[A-Z]/g;
      if (this.value.match(s) !== null && this.value.match(t) !== null) {
        self.passwordTipDiv31 = true;
        self.passwordTipDiv32 = false;
      } else {
        self.passwordTipDiv31 = false;
        self.passwordTipDiv32 = true;
      }
      const pattern = /[`_\-~!@#$^&*()=|{}':;',\\[\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]/g;
      if (this.value.match(pattern) !== null) {
        self.passwordTipDiv41 = true;
        self.passwordTipDiv42 = false;
      } else {
        self.passwordTipDiv41 = false;
        self.passwordTipDiv42 = true;
      }
    };
    // 密码强度提示 end
  },
  methods: {
    rePassword() {
      // 判断密码强度
      if (
        this.passwordTipDiv12 ||
        this.passwordTipDiv22 ||
        this.passwordTipDiv32 ||
        this.passwordTipDiv42
      ) {
        let passwordNotice = document.getElementById("passwordNotice");
        let passwordInput = document.getElementById("passwordInput");
        passwordInput.style.border = "1px red solid";
        passwordNotice.style.display = "block";
        this.formatNotice.password1 = this.$t("register.password_format_error");
        return null;
      }
      // 判断密码强度结束
      if (this.password !== this.rPassword) {
        this.showFailed = true;
        this.failedText = this.$t("forgetPwd.passwords_not_match");
        setTimeout(() => {
          this.showFailed = false;
        }, 2000);
        return null;
      }
      let form = new FormData();
      form.append("password", this.password);
      form.append("userId", this.userId);
      this.loading.steps3 = true;
      this.$post("/api/user/forgetPwd3", form)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.nextStep();
          } else {
            this.showFailed = true;
            this.failedText = this.$t("forgetPwd.Reset_failed");
            setTimeout(() => {
              this.showFailed = false;
            }, 2000);
          }
        })
        .finally(() => {
          this.loading.steps3 = false;
        });
    },
    verifyEmailCode() {
      let form = new FormData();
      for (let i in this.step2Params) {
        if (this.step2Params[i] !== "") {
          form.append(i, this.step2Params[i]);
        }
      }
      form.append("userId", this.userId);
      this.loading.steps2 = true;
      this.$post("/api/user/forgetPwd2", form)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.nextStep();
          } else {
            this.showFailed = true;
            this.failedText = this.$t("forgetPwd.Verification_code_error");
            setTimeout(() => {
              this.showFailed = false;
            }, 2000);
          }
        })
        .finally(() => {
          this.loading.steps2 = false;
        });
    },
    //验证邮箱是否存在
    verifyEmail() {
      const self = this;
      let form = new FormData();
      if (!this.sendEmail) {
        this.showFailed = true;
        this.failedText = this.$t("forgetPwd.enter_email");
        setTimeout(() => {
          this.showFailed = false;
        }, 2000);
        return false;
      }
      this.loading.vEmail = true;
      form.append("email", this.sendEmail);
      form.append("use", self.$t("userCenter.loginPassword.retrieve_password"));
      let t = window.newVue.$lang.toString().replace(/-/g, "_");
      form.append("language", t);
      this.$post("/api/user/forgetPwd1", form)
        .then(res => {
          console.log(res);
          if (res.code === 0) {
            this.isVerify = true;
            this.userId = res.data.userId;
            this.isGoogle = res.data.isGoogle;
            this.$post("/api/user/getVerifyCodeWithEmail", form).then(res => {
              console.log(res);
            });
            this.showSuccess = true;
            this.successText = this.$t("forgetPwd.Verify_success");
            setTimeout(() => {
              this.showSuccess = false;
            }, 2000);
            //this.nextStep();
          } else {
            this.isVerify = false;
            this.showFailed = true;
            this.failedText = this.$t("forgetPwd.Mailbox_not_exist");
            setTimeout(() => {
              this.showFailed = false;
            }, 2000);
          }
        })
        .finally(() => {
          this.loading.vEmail = false;
        });
    },
    //下一步
    verifyStep1() {
      if (this.isVerify) {
        this.nextStep();
      } else {
        this.showFailed = true;
        this.failedText = this.$t("forgetPwd.Verify_failed");
        setTimeout(() => {
          this.showFailed = false;
        }, 2000);
      }
    },
    nextStep() {
      this.steps == 1
        ? (this.steps = 2)
        : this.steps == 2
        ? (this.steps = 3)
        : this.steps == 3
        ? (this.steps = 4)
        : "";
    },
    toLogin() {
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: CircularStd;
  src: url("../../assets/font/Main.ttf");
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
.login:hover {
  cursor: pointer;
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
        align-items: center;
        margin-bottom: 8px;
        .one {
          width: 298px;
          height: 40px;
          border-radius: 2px;
          border: solid 1px #e6ebf1;
          background-color: #ffffff;
          padding-left: 20px;
        }
        .verify1 {
          background: #ffffff;
          border-radius: 2px;
          border: solid 1px #565abf;
          width: 79px;
          height: 40px;
          cursor: pointer;
          span {
            font-family: CircularStd;
            font-size: 14px;
            font-weight: 500;
            font-stretch: normal;
            font-style: normal;
            line-height: 1.43;
            letter-spacing: -0.4px;
            text-align: center;
            color: #565abf;
          }
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
      line-height: 37px;
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
