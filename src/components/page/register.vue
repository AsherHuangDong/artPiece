<template>
  <div id="register" class="content">
    <div class="login-box">
      <h3 style="position: relative;">
        {{ $t('register.Welcome') }}
        <div style="position: absolute;top: 0;left: -400px;z-index: -1;">
          <img src="../../assets/bg11.png" alt />
        </div>
        <div style="position: absolute;top: -50px;right: -400px;z-index: -1;">
          <img src="../../assets/bg10.png" alt />
        </div>
      </h3>
      <div class="item">
        <p>{{ $t('register.Email') }}</p>
        <input
          clearable
          id="emailInput"
          v-model="registerParams.email"
          type="text"
          :placeholder="$t('register.enter_email')"
        />
        <div
          id="emailNotice"
          style="display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;position: absolute;bottom: -17px;"
        >{{ formatNotice.email }}</div>
      </div>
      <div class="item" style="margin-bottom: 80px;">
        <p>{{ $t('register.Country') }}</p>
        <!--        <p style="float: left;line-height: 38px;">{{ countryCode }}</p>-->
        <Select
          id="countrySelect"
          v-model="registerParams.country"
          style="width: 100%;float: right"
        >
          <Option v-for="(item, index) in countryList" :value="item[0]" :key="index">{{ item[2] }}</Option>
        </Select>
        <div
          id="countryNotice"
          style="position: absolute;bottom: -59px;display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ formatNotice.countryNotice }}</div>
      </div>
      <div class="item" :style="{marginBottom: passwordTipDivGroupMargin + 'px'}">
        <p>{{ $t('register.Password') }}</p>
        <input
          id="passwordInput"
          v-model="registerParams.password"
          type="password"
          :placeholder="$t('register.enter_password')"
        />
        <div class="pointer" v-if="registerParams.password !== ''" style="position: absolute;right: 10px;top: 38px;">
          <img @click.stop="passwordClear" style="width: 17px;height: 17px;" src="../../assets/X.png" alt="">
        </div>
        <div
          id="passwordNotice"
          style="display: block;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ formatNotice.password1 }}</div>
      </div>
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
      <div class="item" style="margin-bottom: 40px;position: relative;">
        <p>{{ $t('register.Confirm_Password') }}</p>
        <input
          id="rPasswordInput"
          v-model="register.rPassword"
          type="password"
          :placeholder="$t('register.confirm_password')"
        />
        <div class="pointer" v-if="register.rPassword !== ''" style="position: absolute;right: 10px;top: 38px;">
          <img @click.stop="rPasswordClear" style="width: 17px;height: 17px;" src="../../assets/X.png" alt="">
        </div>
        <div
          id="rPasswordNotice"
          style="position: absolute;bottom: -17px;display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ formatNotice.password }}</div>
      </div>
      <div class="item">
        <p>{{ $t('register.Payment_password') }}</p>
        <input
          maxlength="4"
          id="payPasswordInput"
          v-model="registerParams.payPassword"
          type="password"
          :placeholder="$t('register.enter_payment_password')"
        />
        <div
          id="payPasswordNotice"
          style="position: absolute;bottom: -17px;display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ formatNotice.payPassword1 }}</div>
      </div>
      <div class="item" style="margin-bottom: 40px;">
        <p>{{ $t('register.Confirm_Payment_password') }}</p>
        <input
          maxlength="4"
          id="rPayPasswordInput"
          v-model="register.rPayPassword"
          type="password"
          :placeholder="$t('register.Please_confirm_payment_password')"
        />
        <div
          id="rPayPasswordNotice"
          style="position: absolute;bottom: -17px;display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ formatNotice.payPassword }}</div>
      </div>
      <div class="item mrb34">
        <p>{{ $t('register.Invite_code') }}</p>
        <input
          id="inviteInput"
          v-model="registerParams.inviteCode"
          type="text"
          :placeholder="$t('register.enter_invite_code')"
        />
        <div
          id="inviteNotice"
          style="position: absolute;bottom: -17px;display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ $t('register.Invitation_code_invalid') }}</div>
      </div>
      <div class="agree">
        <div style="display: flex;align-items: center;justify-content: flex-start;height: 20px;">
<!--          <Checkbox style="margin-right: 0" v-model="agree"></Checkbox>-->
          <div style="margin-right: 4px;height: 20px;" class="pointer" v-if="!agree" @click="agree = true"><img style="width: 20px;height: 20px;" src="../../assets/checkOff.png" alt=""></div>
          <div style="margin-right: 4px;height: 20px;" class="pointer" v-if="agree" @click="agree = false"><img style="width: 20px;height: 20px;" src="../../assets/checkOn.png" alt=""></div>
          <!--          <span @click='isAgree'>{{agree?'√':''}}</span>-->
          {{ $t('register.I_agree_with') }}&nbsp;
          <div class="pointer" @click="toDisclaimerNotices" style='color:#565abf;text-decoration: underline'>{{ $t('register.Terms_of_service') }}</div>,&nbsp;
          <div class="pointer" @click="toPolicy" style='color:#565abf;text-decoration: underline'>{{ $t('register.Privacy_Policies') }}</div>,&nbsp;
          <div class="pointer" @click="toNotice" style='color:#565abf;text-decoration: underline'>{{ $t('register.Service_ads') }}</div>
        </div>
        <div
          id="agreeNotice"
          style="display: none;color:red;font-weight: 500;font-size: 12px;height: 18px;line-height: 18px;"
        >{{ $t('register.please_click_agree') }}</div>
      </div>
      <div class="submit" @click="signUp">{{ $t('register.Sign_up') }}</div>
    </div>
    <!--    <Button @click="test" type="primary">Text</Button>-->
    <Modal v-model="modal.modalSuccess" width="384">
      <div class="success">
        <div class="successIcon">
          <img src="../../assets/success.png" alt />
        </div>
        <div class="successful">{{ $t('register.Sign_up_successful') }} !</div>
      </div>
      <div slot="footer"></div>
    </Modal>
    <FailedModal :show="show.failed" :text="show.failedText" :text2="show.failedText2"></FailedModal>
  </div>
</template>
<script>
import FailedModal from "../modal/FailedModal";
export default {
  components: { FailedModal },
  data() {
    return {
      show: {
        failed: false,
        failedText: "",
        failedText2: ""
      },
      countryCode: "",
      countryList: [],
      modal: {
        modalSuccess: false
      },
      formatNotice: {
        countryNotice: "",
        email: "",
        password: "",
        password1: "",
        payPassword: "",
        payPassword1: ""
      },
      register: {
        rPassword: "",
        rPayPassword: ""
      },
      registerParams: {
        email: "",
        country: "",
        password: "",
        payPassword: "",
        inviteCode: "",
        sns: 0
      },
      agree: false,
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
      emailInput: null,
      emailNotice: null
    };
  },
  watch: {
    "registerParams.email"(n) {
      const self = this;
      console.log(n)
      // const myReg = /^[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+(com|cn|net|org)$/;
      const myReg = /^\w+(.|-|_|\w)*@\w+(.|-|_|\w)*\.\w+(.|-|_|\w)*$/;
      if (!myReg.test(n)) {
        self.emailInput.style.border = "1px red solid";
        self.emailNotice.style.display = "block";
        self.formatNotice.email = self.$t("register.Email_format_error");
      } else {
        self.emailInput.style.border = "1px #e6e8f1 solid";
        self.emailNotice.style.display = "none";
      }
      console.log(2)
    },
    "registerParams.payPassword"(n) {
      let b = document.getElementById("payPasswordInput");
      let d = document.getElementById("payPasswordNotice");
      if (/^[0-9]+$/.test(n)) {
        //这是用正则表达是检查
        b.style.border = "1px #e6ebf7 solid";
        d.style.display = "hidden";
        this.formatNotice.payPassword1 = "";
      } else {
        b.style.border = "1px red solid";
        d.style.display = "block";
        this.formatNotice.payPassword1 = this.$t("onlyNum");
      }
    },
    $lang() {
      let d = window.newVue.$lang.toString().replace(/-/g, "_");
      this.countryList = window.newVue[d];
      this.signUp()
    },
    // 国家校验
    "registerParams.country"() {
      console.log("adf");
      const self = this;
      let countrySelect = document.getElementById("countrySelect");
      let countryNotice = document.getElementById("countryNotice");
      if (self.registerParams.country === "") {
        countrySelect.style.border = "1px red solid";
        countryNotice.style.display = "block";
        self.formatNotice.countryNotice = self.$t("pleaseSelectCountry");
      } else {
        countrySelect.style.border = "none";
        countryNotice.style.display = "none";
      }
    },
    "registerParams.password"() {
      setTimeout(() => {
        let passwordInput = document.getElementById("passwordInput");
        let passwordNotice = document.getElementById("passwordNotice");
        if (
          this.passwordTipDiv12 ||
          this.passwordTipDiv22 ||
          this.passwordTipDiv32 ||
          this.passwordTipDiv42
        ) {
          passwordInput.style.border = "1px red solid";
          passwordNotice.style.display = "block";
          this.formatNotice.password1 = this.$t(
            "register.password_format_error"
          );
        } else {
          passwordInput.style.border = "1px #e6e8f1 solid";
          passwordNotice.style.display = "none";
        }
      }, 1);
    },
    "register.rPassword"() {
      let rPasswordInput = document.getElementById("rPasswordInput");
      let rPasswordNotice = document.getElementById("rPasswordNotice");
      if (this.registerParams.password !== this.register.rPassword) {
        rPasswordInput.style.border = "1px red solid";
        rPasswordNotice.style.display = "block";
        this.formatNotice.password = this.$t("register.passwords_match");
      } else {
        rPasswordInput.style.border = "1px #e6e8f1 solid";
        rPasswordNotice.style.display = "none";
      }
    },
    "register.rPayPassword"() {
      let rPayPasswordInput = document.getElementById("rPayPasswordInput");
      let rPayPasswordNotice = document.getElementById("rPayPasswordNotice");
      if (this.registerParams.payPassword !== this.register.rPayPassword) {
        rPayPasswordInput.style.border = "1px red solid";
        rPayPasswordNotice.style.display = "block";
        this.formatNotice.payPassword = this.$t("register.payPasswords_match");
      } else {
        rPayPasswordInput.style.border = "1px #e6e8f1 solid";
        rPayPasswordNotice.style.display = "none";
      }
    }
  },
  mounted() {
    const self = this;
    self.emailInput = document.getElementById("emailInput");
    self.emailNotice = document.getElementById("emailNotice");
    let d = window.newVue.$lang.toString().replace(/-/g, "_");
    this.countryList = window.newVue[d];
    // 自动填写邀请码
    console.log(this.$route.query.invitationCode);
    if (this.$route.query.invitationCode) {
      this.registerParams.inviteCode = this.$route.query.invitationCode;
    }
    // 密码强度提示
    const passwordInput = document.getElementById("passwordInput");
    passwordInput.onfocus = function() {
      self.passwordTipDivGroupMargin = 5;
      self.passwordTipDivGroup = true;
    };
    passwordInput.onblur = function() {
      self.passwordTipDivGroupMargin = 16;
      self.passwordTipDivGroup = false;
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
    // 前往公告
    toNotice() {
      // let a = window.selfConfig.notice.replace(/language/, this.$lang.toString().toLowerCase())
      // console.log(a)
      // window.open(a, "_blank")
      switch (this.$lang) {
        case 'en-US':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
          break
        case 'zh-CN':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
          break
        case 'ko-KR':
          window.open('https://artpiecehelp.zendesk.com/hc/ko/sections/360007210593-Important-Notice', "_blank")
          break
      }
    },
    // 前往隐私策略
    toPolicy() {
      // let a = window.selfConfig.policy.replace(/language/, this.$lang.toString().toLowerCase())
      // window.open(a, "_blank")
      switch (this.$lang) {
        case 'en-US':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
          break
        case 'zh-CN':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
          break
        case 'ko-KR':
          window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042647933-Privacy-terms', "_blank")
          break
      }
    },
    // 前往免责声明通知
    toDisclaimerNotices() {
      // let a = window.selfConfig.notice.replace(/language/, this.$lang.toString().toLowerCase())
      // console.log(a)
      // window.open(a, "_blank")
      console.log('in')
      switch (this.$lang) {
        case 'en-US':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163654-Disclaimer-Notices', "_blank")
          break
        case 'zh-CN':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163654-Disclaimer-Notices', "_blank")
          break
        case 'ko-KR':
          window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042163654-Disclaimer-Notices', "_blank")
          break
      }
    },
    // 清除输入框
    passwordClear() {
      this.registerParams.password = ''
    },
    rPasswordClear() {
      this.register.rPassword = ''
    },
    // 人机验证
    isRobot() {
      let self = this;
      this.$recaptchaLoaded();
      this.$recaptcha().then(token => {
        let form = new FormData();
        form.append("token", token);
        self.$post("/api/user/reCAPTCHA", form).then(res => {
          if (res.success && res.score > 0.8) {
            self.signUp();
          }
        });
      });
    },
    // /user/register
    signUp() {
      let flag = true;
      let countrySelect = document.getElementById("countrySelect");
      let countryNotice = document.getElementById("countryNotice");
      let emailInput = document.getElementById("emailInput");
      let emailNotice = document.getElementById("emailNotice");
      let rPasswordInput = document.getElementById("rPasswordInput");
      let rPasswordNotice = document.getElementById("rPasswordNotice");
      let rPayPasswordInput = document.getElementById("rPayPasswordInput");
      let rPayPasswordNotice = document.getElementById("rPayPasswordNotice");
      let payPasswordInput = document.getElementById("payPasswordInput");
      let payPasswordNotice = document.getElementById("payPasswordNotice");
      let passwordInput = document.getElementById("passwordInput");
      let passwordNotice = document.getElementById("passwordNotice");
      let agreeNotice = document.getElementById("agreeNotice");
      // 判断密码强度
      console.log(flag);
      if (
        this.passwordTipDiv12 ||
        this.passwordTipDiv22 ||
        this.passwordTipDiv32 ||
        this.passwordTipDiv42
      ) {
        passwordInput.style.border = "1px red solid";
        passwordNotice.style.display = "block";
        console.log(passwordInput, passwordNotice);
        this.formatNotice.password1 = this.$t("register.password_format_error");
        flag = false;
      }
      // else {
      //   if(this.registerParams.password === ''){
      //     passwordInput.style.border = '1px red solid'
      //     passwordNotice.style.display = 'block'
      //     this.formatNotice.password1 = this.$t('register.password_empty')
      //     flag = false
      //   } else {
      //     passwordInput.style.border = '1px #e6e8f1 solid'
      //     passwordNotice.style.display = 'none'
      //   }
      // }
      // 判断密码强度结束
      const myReg = /^\w+(.|-|_|\w)*@\w+(.|-|_|\w)*\.\w+(.|-|_|\w)*$/;
      if (!this.agree) {
        agreeNotice.style.display = "block";
        flag = false;
      } else {
        agreeNotice.style.display = "none";
      }
      if (this.registerParams.country === "") {
        countrySelect.style.border = "1px red solid";
        countryNotice.style.display = "block";
        this.formatNotice.countryNotice = this.$t("pleaseSelectCountry");
        flag = false;
      } else {
        countrySelect.style.border = "none";
        countryNotice.style.display = "none";
      }
      if (!myReg.test(this.registerParams.email)) {
        emailInput.style.border = "1px red solid";
        emailNotice.style.display = "block";
        this.formatNotice.email = this.$t("register.Email_format_error");
        flag = false;
      } else {
        emailInput.style.border = "1px #e6e8f1 solid";
        emailNotice.style.display = "none";
      }
      if (this.registerParams.payPassword === "") {
        payPasswordInput.style.border = "1px red solid";
        payPasswordNotice.style.display = "block";
        this.formatNotice.payPassword1 = this.$t("register.payPassword_empty");
        flag = false;
      } else {
        payPasswordInput.style.border = "1px #e6e8f1 solid";
        payPasswordNotice.style.display = "none";
      }
      if (this.registerParams.password !== this.register.rPassword) {
        rPasswordInput.style.border = "1px red solid";
        rPasswordNotice.style.display = "block";
        this.formatNotice.password = this.$t("register.passwords_match");
        flag = false;
      } else {
        rPasswordInput.style.border = "1px #e6e8f1 solid";
        rPasswordNotice.style.display = "none";
      }
      if (this.registerParams.payPassword.length !== 4) {
        payPasswordInput.style.border = "1px red solid";
        payPasswordNotice.style.display = "block";
        this.formatNotice.payPassword1 = this.$t("cantLessThan4");
        flag = false;
      } else {
        payPasswordInput.style.border = "1px #e6e8f1 solid";
        payPasswordNotice.style.display = "none";
      }
      if (this.registerParams.payPassword !== this.register.rPayPassword) {
        rPayPasswordInput.style.border = "1px red solid";
        rPayPasswordNotice.style.display = "block";
        this.formatNotice.payPassword = this.$t("register.payPasswords_match");
        flag = false;
      } else {
        rPayPasswordInput.style.border = "1px #e6e8f1 solid";
        rPayPasswordNotice.style.display = "none";
      }
      if (this.formatNotice.payPassword1 !== "") {
        flag = false;
      }
      console.log(this.registerParams);
      if (flag) {
        console.log("enter");
        let form = new FormData();
        for (let i in this.registerParams) {
          form.append(i, this.registerParams[i]);
        }
        if (this.registerParams.inviteCode === "") {
          form.delete("inviteCode");
        }
        this.$post("/api/user/register", form).then(res => {
          console.log(res);
          let inviteNotice = document.getElementById("inviteNotice");
          let inviteInput = document.getElementById("inviteInput");
          if (res.code !== 0) {
            this.show.failed = true;
            this.show.failedText = res.msg
            setTimeout(() => {
              this.show.failed = false;
              this.show.failedText = ''
            }, 2000);
          } else {
            inviteNotice.style.display = "none";
            inviteInput.style.border = "1px #e6e8f1 solid";
            this.modal.modalSuccess = true;
            setTimeout(() => {
              // this.modal.modalSuccess = false
              this.$router.push("/login");
            }, 1500);
          }
          // this.$router.push('/')
        });
      }
    },
    isAgree() {
      this.agree = !this.agree;
    }
  }
};
</script>
<style>
#register .ivu-select-selected-value {
  padding-left: 16px;
  line-height: 38px;
}
#register .ivu-select-placeholder {
  padding-left: 16px;
  line-height: 38px;
}
@font-face {
  font-family: CircularStd;
  src: url("../../assets/font/Main.ttf");
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
.ivu-input {
  width: 384px;
  height: 40px;
  border-radius: 2px;
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
  padding-left: 20px;
}

</style>
<style lang="scss" scoped>
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
.content {
  width: 100%;
  padding-bottom: 160px;
  .login-box {
    width: 384px;
    margin: 80px auto 0;
    h3 {
      font-size: 36px;
      font-weight: 500;
      text-align: center;
      color: #32325d;
      margin-bottom: 32px;
    }
    .mrb34 {
      margin-bottom: 34px;
    }
    .mrb40 {
      margin-bottom: 40px;
    }
    .item {
      position: relative;
      margin-bottom: 16px;
      p {
        font-size: 14px;
        color: #32325d;
        padding-bottom: 6px;
        height: 27px;
      }
      input {
        padding-left: 20px;
        width: 100%;
        height: 40px;
        border-radius: 2px;
        border: 1px solid #e6ebf1;
        font-size: 14px;
        color: #bdc6d4;
        background-color: #fff;
      }
    }
    .agree {
      font-size: 14px;
      color: #32325d;
      .Options {
        font-family: CircularStd;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        font-style: normal;
        line-height: 1.43;
        letter-spacing: -0.4px;
        color: #565abf;
        text-decoration: underline;
      }
      p {
        span {
          margin-right: 3px;
          display: inline-block;
          vertical-align: middle;
          width: 17px;
          height: 17px;
          line-height: 17px;
          text-align: center;
          border-radius: 2px;
          background-color: #32325d;
          color: #565abf;
        }
      }
    }
    .submit {
      margin-top: 20px;
      text-align: center;
      width: 100%;
      height: 48px;
      line-height: 48px;
      border-radius: 2px;
      background-color: #565abf;
      font-size: 14px;
      color: #ffffff;
    }
  }
}
</style>
