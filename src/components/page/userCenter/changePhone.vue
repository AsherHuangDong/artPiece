<template>
  <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center') }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;">
          <img src="../../../assets/rA.png" alt />
        </div>
        <div class="location1">{{ $t('userCenter.changePhone.Change_phone_verification') }}</div>
      </div>
      <div class="Mask">
        <div class="h">
          <div class="text">{{ $t('userCenter.changePhone.Change_phone_verification') }}</div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div class="label">{{ $t('userCenter.changePhone.Country_code') }}</div>
           <Select v-model="bindMobileParams.countryCode" :placeholder="$t('userCenter.changePhone.enter_country_code')">
            <Option v-for="(item, index) in codeList" :value="item[0]" :key="index">{{ item[2] }}</Option>
          </Select>
          <!-- <input
            v-model="bindMobileParams.countryCode"
            class="Field"
            type="text"
            :placeholder="$t('userCenter.changePhone.enter_country_code')"
          /> -->
          <div class="label" style="margin-top:15px">{{ $t('userCenter.changePhone.Phone_number') }}</div>
          <input
            v-model="bindMobileParams.mobile"
            class="Field"
            type="text"
            :placeholder="$t('userCenter.changePhone.enter_phone_number')"
          />
          <div class="label">
            {{ $t('userCenter.changePhone.Phone_code') }}
            <Button
              @click="getPhoneCode"
              class="send"
              :disabled="disabled.getPhoneCode"
            >{{ disabled.getPhoneCode ? timer.getPhoneCode + "s" : $t('userCenter.changePhone.Send') }}</Button>
          </div>
          <input
            v-model="bindMobileParams.mobileCode"
            class="Field"
            type="text"
            :placeholder="$t('userCenter.changePhone.enter_phone_code')"
          />
          <div class="label">
            {{ $t('userCenter.changePhone.Email_code') }}
            <Button
              @click="getEmailCode"
              class="send"
              :disabled="disabled.getEmailCode"
            >{{ disabled.getEmailCode ? timer.getEmailCode + "s" : $t('userCenter.changePhone.Send') }}</Button>
          </div>
          <input
            v-model="bindMobileParams.emailCode"
            class="Field"
            type="text"
            :placeholder="$t('userCenter.changePhone.enter_email_code')"
          />
          <div v-if="isSetGoogleAuthenticatorStatus" class="label">
            {{
            $t('userCenter.changePhone.Google_Verification_code') }}
          </div>
          <input
            v-if="isSetGoogleAuthenticatorStatus"
            v-model="bindMobileParams.googleCode"
            class="Field"
            type="text"
            :placeholder="$t('userCenter.changePhone.Google_Verification_code')"
          />
<!--          <div class="label">-->
<!--            {{ $t('userCenter.changePhone.Google_Verification_code') }}-->
<!--          </div>-->
<!--          <input-->
<!--            v-model="bindMobileParams.googleCode"-->
<!--            class="Field"-->
<!--            type="text"-->
<!--            :placeholder="$t('userCenter.changePhone.Google_Verification_code')"-->
<!--          />-->
          <div @click="confirm" class="changeBtn">
            <div class="Text">{{ $t('userCenter.changePhone.Change') }}</div>
          </div>
        </div>
      </div>
    </div>
    <FailedModal :text="failedText" :text2="failedText2" :show="showFailed" />
    <SuccessModal :text="successText" :show="showSuccess" />
  </div>
</template>

<script>
import FailedModal from "../../modal/FailedModal";
import SuccessModal from "../../modal/SuccessModal";

export default {
  name: "changePhone",
  components: { FailedModal, SuccessModal },
  data() {
    const self = this;
    return {
      showSuccess: false,
      successText: self.$t("userCenter.changePhone.Binding_success"),
      failedText: self.$t("userCenter.changePhone.Get_Code_Failed"),
      failedText2: self.$t("userCenter.changePhone.fail__entered"),
      showFailed: false,
      codeList:[],
      timer: {
        getPhoneCode: 60,
        getEmailCode: 60
      },
      disabled: {
        getPhoneCode: false,
        getEmailCode: false
      },
      bindMobileParams: {
        mobile: "",
        mobileCode: "",
        emailCode: "",
        googleCode: "",
        countryCode: ""
      },
      isSetGoogleAuthenticatorStatus: 0
    };
  },
  watch: {
    $lang() {
      const self = this;
      self.successText = self.$t("userCenter.changePhone.Binding_success");
      self.failedText = self.$t("userCenter.changePhone.Get_Code_Failed");
      self.failedText2 = self.$t("userCenter.changePhone.fail__entered");
      let d = window.newVue.$lang.toString().replace(/-/g, "_")
      self.codeList = window.newVue[d]
    }
  },
  mounted() {
    let d = window.newVue.$lang.toString().replace(/-/g, "_")
    this.codeList = window.newVue[d]
    this.isSetGoogleAuthenticator();
  },
  methods: {
    //  是否绑定谷歌验证器
    isSetGoogleAuthenticator() {
      this.$post("/api/user/isSetGoogleAuthenticator").then(res => {
        // 已绑定 返回成功data:1
        // 未绑定 返回成功data:0
        this.isSetGoogleAuthenticatorStatus = res.data;
      });
    },
    confirm() {
      let form = new FormData();
      if (!this.bindMobileParams.mobile) {
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.phone_cannot_empty");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      if (!this.bindMobileParams.mobileCode) {
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.isKong");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      if (!this.bindMobileParams.emailCode) {
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.isKong");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      if (!this.bindMobileParams.countryCode) {
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.isKong");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      if (
        !this.bindMobileParams.googleCode &&
        this.isSetGoogleAuthenticatorStatus == 1
      ) {
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.isKong");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      for (let i in this.bindMobileParams) {
        form.append(i, this.bindMobileParams[i]);
      }
      this.$post("/api/user/bindMobile", form).then(res => {
        if (res.code === 0) {
          this.showSuccess = true;
          setTimeout(() => {
            this.$router.push("/userCenter");
          }, 2000);
        } else {
          this.showFailed = true
          this.failedText2 = res.msg
          setTimeout(() => {
            this.showFailed = false
          }, 2000);
        }
        // else if (res.msg === "您输入的邮箱验证码有误！") {
        //   this.showFailed = true;
        //   this.failedText = this.$t("userCenter.changePhone.email_verification_code_wrong");
        //   this.failedText2 = "";
        //   setTimeout(() => {
        //     this.showFailed = false;
        //   }, 1500);
        //   return false;
        // } else if (res.msg === "您输入的谷歌验证码有误！") {
        //   this.showFailed = true;
        //   this.failedText = this.$t("userCenter.changePhone.google_verification_code_wrong");
        //   this.failedText2 = "";
        //   setTimeout(() => {
        //     this.showFailed = false;
        //   }, 1500);
        //   return false;
        // } else if (res.msg === "您输入的国家代码有误！") {
        //   this.showFailed = true;
        //   this.failedText = this.$t("userCenter.changePhone.country_code_wrong");
        //   this.failedText2 = "";
        //   setTimeout(() => {
        //     this.showFailed = false;
        //   }, 1500);
        //   return false;
        // }
      });
    },
    time(d) {
      const self = this;
      const timer = setInterval(() => {
        self.timer[d]--;
      }, 1000);
      const timer2 = setTimeout(() => {
        self.timer[d] = 60;
        self.disabled[d] = false;
        clearInterval(timer);
      }, 60000);
      return { timer: timer, timer2: timer2 };
    },
    getPhoneCode() {
      // if(!(/^1[3456789]\d{9}$/.test(this.bindMobileParams.mobile))){
      if (this.bindMobileParams.mobile === "") {
        // :text="failedText" :text2="failedText2" :show="showFailed"
        this.showFailed = true;
        this.failedText = this.$t("userCenter.changePhone.phone_cannot_empty");
        this.failedText2 = "";
        setTimeout(() => {
          this.showFailed = false;
        }, 1500);
        return false;
      }
      const self = this;
      const t = this.time("getPhoneCode");
      this.disabled.getPhoneCode = true;
      let form = new FormData();
      form.append("mobile", this.bindMobileParams.mobile);
      form.append("countryCode", this.bindMobileParams.countryCode);
      form.append("use", self.$t("userCenter.changePhone.changePhone"));
      let d = window.newVue.$lang.toString().replace(/-/g, "_");
      form.append("language", d);
      this.$post("/api/user/getVerifyCodeWithMobile", form).then(res => {
        console.log(res);
        if (res.msg !== "成功") {
          clearTimeout(t.timer);
          clearTimeout(t.timer2);
          this.disabled.getPhoneCode = false;
          this.timer.getPhoneCode = 60;
          this.showFailed = true;
          setTimeout(() => {
            this.showFailed = false;
          }, 2000);
        }
      });
    },
    getEmailCode() {
      const self = this;
      const t = this.time("getEmailCode");
      this.disabled.getEmailCode = true;
      let form = new FormData();
      form.append("email", JSON.parse(localStorage.getItem("userInfo")).email2);
      form.append("use", self.$t("userCenter.changePhone.changePhone"));
      let d = window.newVue.$lang.toString().replace(/-/g, "_");
      form.append("language", d);
      this.$post("/api/user/getVerifyCodeWithEmail", form).then(res => {
        console.log(res);
        if (res.msg !== "成功") {
          clearTimeout(t.timer);
          clearTimeout(t.timer2);
          this.disabled.getEmailCode = false;
          this.timer.getEmailCode = 60;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
.changeBtn {
  float: right;
  width: 92px;
  height: 40px;
  border-radius: 2px;
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
  line-height: 2px;
  letter-spacing: -0.4px;
  text-align: right;
  color: #565abf;
  background-color: #fff;
  border: 0;
}

.send:hover {
  background-color: #fff;
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
  width: 384px;
  height: 20px;
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
  height: 554px;
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
