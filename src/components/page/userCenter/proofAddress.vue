<template>
  <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center') }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
        <div class="location1">{{ $t('userCenter.Proof_address.Proof_address') }}</div>
      </div>
      <div class="Mask">
        <div class="h">
          <div class="text">
            {{ $t('userCenter.Proof_address.Proof_address') }}
          </div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div class="label">{{ $t('userCenter.Proof_address.Your_name') }}</div>
          <input v-model="iParams.name" class="Field" type="text"
                 :placeholder="$t('userCenter.Proof_address.enter_name')">
          <div class="noticeSpan" v-if="show.name">
            <div class="noticeInner">{{ notice.name }}</div>
          </div>
          <div class="label">{{ $t('userCenter.Proof_address.residence_address') }}</div>
          <input v-model="iParams.address" class="Field" type="text"
                 :placeholder="$t('userCenter.Proof_address.enter_address')">
          <div class="noticeSpan" v-if="show.address">
            <div class="noticeInner">{{ notice.address }}</div>
          </div>
          <div class="label">{{ $t('userCenter.Proof_address.Address_photo') }}</div>
          <div @click="addPhoto">
            <Card class="addImg"><img :src="show.photoSrc" alt=""></Card>
          </div>
          <div class="noticeSpan" v-if="show.photo">
            <div class="noticeInner">{{ notice.photo }}</div>
          </div>
          <input id="photoInput" style="opacity: 0;width: 0;height: 0;" type="file">
          <div v-if="true" class="passwordTipDivGroup">
            <div class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconTrue.png" alt=""></div>
              <div class="passwordTip">{{ $t('userCenter.Proof_address.L___t') }}</div>
            </div>
            <div class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('userCenter.Proof_address.L___t') }}</div>
            </div>
            <div class="passwordTipDiv">
              <div class="passwordIcon"><img src="../../../assets/passwordIconFalse.png" alt=""></div>
              <div class="passwordTipFalse">{{ $t('userCenter.Proof_address.L___t') }}</div>
            </div>
          </div>
          <Button :loading="loading.confirm" @click="confirm" class="changeBtn">
            <div class="Text">{{ $t('userCenter.Proof_address.Change') }}</div>
          </Button>
        </div>
      </div>
      <Modal v-model="modal.modalSuccess" width="384">
        <div class="success">
          <div class="successIcon">
            <img src="../../../assets/success.png" alt="">
          </div>
          <div class="successful">{{ $t('userCenter.Proof_address.successfully') }}</div>
        </div>
        <div slot="footer">
        </div>
      </Modal>
    </div>
    <FailedModal :show="showFail" :text="faileText" :text2="faileText2"></FailedModal>
  </div>
</template>

<script>
  import FailedModal from "../../modal/FailedModal";
  export default {
    name: "identityVerify",
    components: { FailedModal },
    data() {
      return {
        showFail: false,
        faileText: '',
        faileText2: '',
        modal: {
          modalSuccess: false
        },
        loading: {
          confirm: false
        },
        show: {
          photoSrc: '',
          photo: false,
          address: false,
          name: false
        },
        notice: {
          photo: ''
        },
        iParams: {
          housePhoto: '',
          address: '',
          name: ''
        }
      }
    },
    methods: {
      confirm() {
        let flag = true
        console.log(this.iParams)
        if (this.iParams.housePhoto === '') {
          this.show.photo = true
          this.notice.photo = this.$t('userCenter.Proof_address.please_add_photo')
          flag = false
        } else {
          this.show.photo = false
        }
        if (this.iParams.address === '') {
          this.show.address = true
          this.notice.address = this.$t('userCenter.Proof_address.please_enter_address')
          flag = false
        } else {
          this.show.address = false
        }
        if (this.iParams.name === '') {
          this.show.name = true
          this.notice.name = this.$t('userCenter.Proof_address.please_enter_name')
          flag = false
        } else {
          this.show.name = false
        }
        if (flag) {
          this.loading.confirm = true
          let form = new FormData()
          for (let i in this.iParams) {
            form.append(i, this.iParams[i])
          }
          this.$post('/api/user/addressVerify', form).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.modal.modalSuccess = true
              setTimeout(() => {
                this.$router.push('/userCenter')
              }, 1500)
            } else {
              this.showFail = true
              this.faileText =  this.$t('userCenter.proofAddressFailed')
              if(res.msg==="请先进行实名认证！"){
                this.faileText2 = this.$t('userCenter.Please-name-authentication-first')
              }
              setTimeout(() => {
                this.showFail = false
              }, 1500)
            }
          }).finally(() => {
            this.loading.confirm = false
          })
        }
      },
      addPhoto() {
        const self = this
        let front = document.getElementById('photoInput')
        front.click()
        front.onchange = function () {
          console.log(this.files[0])
          self.show.photo = false
          const files = this.files
          const oFReader = new FileReader()
          oFReader.readAsDataURL(files[0]) // 单文件直接用this.files[0]，就不要循环了
          oFReader.onload = function (oFREvent) {
            self.show.photoSrc = oFREvent.target.result// base64
          }
          let img = new FormData()
          img.append('img', this.files[0])
          self.$post('/api/upload/image', img).then(res => {
            console.log(res)
            if (res.code === 0) {
              self.$Message.success(self.$t('userCenter.Proof_address.add_photo_success'))
              self.iParams.housePhoto = res.data[0]
            }
          })
        }
      },
    }
  }
</script>
<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .successful {
    width: 100%;
    padding-top: 100px;
    text-align: center;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -1px;
    color: #32325d;
  }

  .ivu-modal-footer {
    padding-bottom: 10px;
    border: 0;
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

  .noticeInner {
    position: absolute;
    top: -26px;
  }

  .noticeSpan {
    position: relative;
    display: inline-block;
    color: red;
    height: 0;
    width: 100%;
    margin-bottom: 0
  }

  .ivu-card-body {
    padding: 0;
  }

  .addImg {
    margin-bottom: 16px;
    width: 384px;
    height: 150px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #f3f8fe;
    background-image: url("../../../assets/addImg.png");
    background-repeat: no-repeat;
    background-position: center;
  }

  .addImg img {
    width: 384px;
    height: 150px;
  }

  .addImg:hover {
    cursor: pointer;
  }
</style>
<style lang="scss" scoped>
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
    background-color: #aff1b6;
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
    letter-spacing: normal;
    color: #32325d;
  }

  .addImg {
    margin-bottom: 16px;
    position: relative;
    width: 384px;
    height: 150px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #f3f8fe;
  }

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
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
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
    height: 604px;
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
