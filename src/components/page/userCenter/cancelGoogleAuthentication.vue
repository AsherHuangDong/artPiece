<template>
  <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center') }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
        <div class="location1">{{ $t('userCenter.Google.Link_Google_authentication') }}</div>
      </div>
      <div class="Mask" style="height: 300px;">
        <div class="h">
          <div class="text">
            {{ $t('userCenter.Google.Link_Google_authentication') }}
          </div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div style="margin: 40px auto 0;width:386px;">
            <div class="label">{{ $t('userCenter.Google.Google_code') }}</div>
            <input v-model="googleCode" class="Field" type="text" :placeholder="$t('userCenter.Google.enter_googleCode')">
          </div>
          <Button @click="cancelGoogleAuthenticator" class="changeBtn"><div class="Text">{{ $t('userCenter.Google.turn_off') }}</div></Button>
        </div>
      </div>
      <SuccessModal :show="success" :text="successText" />
      <FailedModal :show="failed" :text="failedText1" :text2="failedText2"></FailedModal>
    </div>
  </div>
</template>

<script>
  import SuccessModal from "../../modal/SuccessModal";
  import FailedModal from "../../modal/FailedModal";
  export default {
    name: "cancelGoogleAuthentication",
    components: { SuccessModal, FailedModal },
    data() {
      return {
        failed: false,
        failedText1: '',
        failedText2: '',
        googleCode: '',
        success: false,
        successText: '',
        loading: {
          connect: false
        }
      }
    },
    mounted() {
    },
    methods: {
      // 解绑谷歌
      cancelGoogleAuthenticator() {
        let form = new FormData()
        form.append('googleCode', this.googleCode)
        this.$post('/api/user/cancelGoogleAuthenticator', form).then(res => {
          if( res.code === 0) {
            this.success = true
            this.successText = this.$t('userCenter.Google.cancelSuccessText')
            setTimeout(() => {
              this.success = false
              this.$router.go(-1)
            }, 2500)
          } else {
            this.failed = true
            this.failedText1 = this.$t('userCenter.Google.cancelFailedText')
            this.failedText2 = this.$t('userCenter.Google.cancelFailedText2')
            setTimeout(() => {
              this.failed = false
            }, 2500)
          }
        })
      }
  }
  }
</script>

<style lang="scss" scoped>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .changeBtn {
    float: right;
    width: 92px;
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
  .erDiv {
    position: relative;
    margin: 16px 0 48px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .erImg {
      width: 80px;
      height: 80px;
    }

    .erInput {
      padding: 14px 16px;
      width: 220px;
      height: 48px;
      border-radius: 2px;
      border: solid 1px #e6ebf1;
      background-color: #ffffff;
    }

    .copy {
      position: absolute;
      right: 14px;
      top: 28px;
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
    .copy:hover{
      cursor: pointer;
    }
  }

  .btnG {
    margin: 16px 0 48px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    align-content: flex-start;
    flex-wrap: wrap;
  }

  .btnGc {
    margin: 16px 0 0 0;
    width: 176px;
    height: 40px;
    border-radius: 2px;
    background-color: #565abf;
    text-align: center;

    .Text {
      line-height: 40px;
      font-family: CircularStd;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      letter-spacing: -0.4px;
      text-align: center;
      color: #ffffff;
    }
  }

  .c1 {
    width: 384px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .t1 {
    margin: 8px 0;
    width: 384px;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    letter-spacing: -1px;
    color: #32325d;
  }

  .Oval {
    text-align: center;
    line-height: 28px;
    border-radius: 50%;
    width: 28px;
    height: 28px;
    background-color: #76e5a1;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -0.4px;
    color: #ffffff;
  }

  .Mask {
    margin: 0 auto;
    width: 800px;
    height: 1300px;
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
