<template>
  <div id="identityVerify" style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center')
          }}
        </div>
        <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
        <div class="location1">{{ $t('userCenter.Identity_verify.Identity_verify') }}</div>
      </div>
      <div class="Mask">
        <div class="h">
          <div class="text">
            {{ $t('userCenter.Identity_verify.Identity_verify') }}
          </div>
        </div>
        <div style="margin: 40px auto 0;width:386px;">
          <div class="label">{{ $t('userCenter.Identity_verify.Your_name') }}</div>
          <input id="name" v-model="iParams.name" class="Field" type="text"
                 :placeholder="$t('userCenter.Identity_verify.enter_your_name')">
          <div class="noticeSpan" v-if="show.name">
            <div class="noticeInner">{{ notice.name }}</div>
          </div>
          <div class="label">{{ $t('country') }}</div>
          <Select @on-change="changeCountry" v-model="iParams.countryCode" style="width:384px;line-height: 40px;"
                  :placeholder="$t('selectCountryFirst')">
            <Option v-for="(item, index) in countryList" :value="item[0]" :key="index">{{ item[2] }}</Option>
          </Select>
          <div class="label" style="margin-top: 16px;">{{ passPortTitle }}</div>
          <input :disabled="disabledInputIdCard" id="passportId" v-model="iParams.passportId" class="Field" type="text"
                 :placeholder="passPortPlaceholder">
          <div class="noticeSpan" v-if="show.passportId">
            <div class="noticeInner">{{ notice.passportId }}</div>
          </div>
          <div class="label">{{ $t('userCenter.Identity_verify.Passport_photo_front') }}</div>
          <div @click="addFrontPhoto">
            <Card class="addImg"><img :src="show.photoFrontSrc" alt=""></Card>
          </div>
          <div class="noticeSpan" v-if="show.photoFront">
            <div class="noticeInner">{{ notice.photoFront }}</div>
          </div>
          <input id="frontInput" style="opacity: 0;width: 0;height: 0;position:absolute;top:0;left:0;" type="file">
          <div class="label">{{ $t('userCenter.Identity_verify.Passport_photo_back') }}</div>
          <div @click="addBackPhoto">
            <Card class="addImg"><img :src="show.photoBackSrc" alt=""></Card>
          </div>
          <div class="noticeSpan" v-if="show.photoBack">
            <div class="noticeInner">{{ notice.photoBack }}</div>
          </div>
          <input id="backInput" style="opacity: 0;width: 0;height: 0;" type="file">
          <Button @click="confirm" class="changeBtn">
            <div class="Text">{{ $t('userCenter.Identity_verify.Change') }}</div>
          </Button>
        </div>
      </div>
      <FailedModal :text="failedText" :text2="failedText2" :show="showFailed"/>
      <SuccessModal :text="successText" :show="showSuccess"/>
    </div>
  </div>
</template>

<script>
  import FailedModal from "../../modal/FailedModal"
  import SuccessModal from "../../modal/SuccessModal";

  export default {
    name: "identityVerify",
    components: {FailedModal, SuccessModal},
    data() {
      const self = this
      return {
        countryList: [],
        failedText: '',
        failedText2: '',
        successText: '',
        showFailed: false,
        showSuccess: false,
        show: {
          name: false,
          passportId: false,
          photoBack: false,
          photoFront: false,
          photoBackSrc: '',
          photoFrontSrc: '',
        },
        loading: {
          confirm: false
        },
        notice: {
          name: '',
          passportId: '',
          photoBack: '',
          photoFront: ''
        },
        iParams: {
          name: '',
          passportId: '',
          photoBack: '',
          photoFront: '',
          countryCode: ''
        },
        passPortTitle: self.$t('selectCountryFirst'),
        disabledInputIdCard: true,
        passPortPlaceholder: ''
      }
    },
    watch: {
      $lang() {
        let d = window.newVue.$lang.toString().replace(/-/g, "_")
        this.countryList = window.newVue[d]
      }
    },
    mounted() {
      let d = window.newVue.$lang.toString().replace(/-/g, "_")
      this.countryList = window.newVue[d]
    },
    methods: {
      // 当选择国家发生变化时，改变'护照id'的文案
      changeCountry(e) {
        this.disabledInputIdCard = false
        if (e === '82') {
          this.passPortTitle = this.$t('idCard')
          this.passPortPlaceholder = this.$t('userCenter.Identity_verify.enter_your_passportId2')
        } else {
          this.passPortTitle = this.$t('passPort')
          this.passPortPlaceholder = this.$t('userCenter.Identity_verify.enter_your_passportId')
        }
      },
      confirm() {
        let flag = true
        if (this.iParams.name === '') {
          this.notice.name = this.$t('userCenter.Identity_verify.please_input_name')
          this.show.name = true
          flag = false
        } else {
          this.show.name = false
        }
        if (this.iParams.passportId === '') {
          this.notice.passportId = this.$t('userCenter.Identity_verify.please_input_passportId')
          this.show.passportId = true
          flag = false
        } else {
          this.show.passportId = false
        }
        if (!this.iParams.photoBack) {
          this.notice.photoBack = this.$t('userCenter.Identity_verify.please_input_photoBack')
          this.show.photoBack = true
          flag = false
        } else {
          this.show.photoBack = false
        }
        if (!this.iParams.countryCode) {
          this.notice.photoBack = this.$t('userCenter.Identity_verify.please_select_the_country_code')
          this.show.photoBack = true
          flag = false
        } else {
          this.show.photoBack = false
        }
        if (!this.iParams.photoFront) {
          this.notice.photoFront = this.$t('userCenter.Identity_verify.please_input_photoFront')
          this.show.photoFront = true
          flag = false
        } else {
          this.show.photoFront = false
        }
        if (flag) {
          this.loading.confirm = true
          let form = new FormData()
          for (let i in this.iParams) {
            form.append(i, this.iParams[i])
          }
          console.log(this.iParams)
          this.$post('/api/user/identityVerify', form).then(res => {
            console.log(res)
            if (res.code === 0) {
              this.showSuccess = true
              this.successText = this.$t('userCenter.Identity_verify.upLoad_success')
              setTimeout(() => {
                this.showSuccess = false
                this.$router.push('/account')
              }, 1500)
            } else {
              this.showFailed = true
              this.failedText = this.$t('userCenter.Identity_verify.upLoad_failed')
              setTimeout(() => {
                this.showFailed = false
              }, 1500)
            }
          }).finally(() => {
            this.loading.confirm = false
          })
        }
      },
      addFrontPhoto() {
        const self = this
        let front = document.getElementById('frontInput')
        front.click()
        front.onchange = function () {
          console.log(this.files[0])
          self.show.photoFront = false
          const files = this.files
          self.zPress(files, 'photoFront')
        }
      },
      addBackPhoto() {
        const self = this
        let back = document.getElementById('backInput')
        back.click()
        back.onchange = function () {
          console.log(this.files[0])
          self.show.photoBack = false
          const files = this.files
          self.zPress(files, 'photoBack')
        }
      },
      zPress(files, param, timeF) {
        const self = this
        const oFReader = new FileReader()
        oFReader.readAsDataURL(files[0]) // 单文件直接用this.files[0]，就不要循环了
        let time = 1
        if (timeF) {
          time = timeF
        } else {
          // 初步判断
          if (files[0].size > 4000000) {
            time = 12
          } else if (files[0].size > 1000000) {
            time = 10
          } else if (files[0].size > 500000) {
            time = 8
          } else if (files[0].size > 100000) {
            time = 6
          } else if (files[0].size > 50000) {
            time = 4
          }
        }
        oFReader.onload = function (oFREvent) {
          self.show[param + 'Src'] = oFREvent.target.result// base64
          // 压缩图片
          let image = new Image() //新建一个img标签（还没嵌入DOM节点)
          image.src = oFREvent.target.result
          image.onload = function () {
            let canvas = document.createElement('canvas'),
              context = canvas.getContext('2d'),
              imageWidth = image.width / time,    //压缩后图片的大小
              imageHeight = image.height / time

            canvas.width = imageWidth
            canvas.height = imageHeight
            context.drawImage(image, 0, 0, imageWidth, imageHeight)
            //压缩完成
            canvas.toBlob((blobObj) => {
              self.iParams[param] = blobObj
              console.log(self.iParams[param])
              // 如果比50K大，倍率加1，重新压一边
              if (blobObj.size > 50000) {
                self.zPress(files, param, time + 1)
              }
            })
          }
        }
      }
    }
  }
</script>

<style>
  #identityVerify .ivu-select-input {
    padding-left: 16px !important;
  }
  .ivu-select-placeholder {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 16px !important;
  }

  .ivu-select-selected-value {
    height: 40px !important;
    line-height: 40px !important;
    padding-left: 16px !important;
  }

  .ivu-select-selection {
    height: 40px !important;
  }

  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }

  .ivu-card-body {
    padding: 0;
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
    padding-bottom: 55px;
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
