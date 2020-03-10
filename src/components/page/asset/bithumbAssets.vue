<template>
  <div>
    <div class="bithumbAssets-box">
      <div class="assets-box">
        <div class="assets-title">{{ $t('Asset') }}</div>
        <div class="assets-type">
          <div class="type-box">
            <div class="type1">
              <p>Bithumb</p>
              <p>
                {{assetsData.availableBalance_bithumb}}
                <span>KRW</span>
              </p>
              <!-- <div class="select-more">More</div> -->
            </div>
            <div class="type1">
              <p>Art piece</p>
              <p>
                {{assetsData.availableBalance_ap}}
                <span>AP</span>
              </p>
              <!-- <div class="select-more">More</div> -->
            </div>
          </div>
        </div>
      </div>
      <div class="Charging-box">
        <div class="charging-title">{{ $t('Charging') }}</div>
        <form action="https://qa-pg-relay.bithumb.com/v1/ExecutePay/login" name="pay_form" class="form-horizontal"
              method="post">
        </form>
        <div class="Charging-action-box">
          <div class="amount-box">
            <span>{{ $t('Amount') }}</span>
            <input
              type="text"
              class="amount-input"
              v-model="amount"
              maxlength="16"
            />
            <p>KRW</p>
          </div>
          <div class="number-box">
            <p v-for="item in amountList" :key="item" @click="getAddAmount(item)">￦{{item}}</p>
            <p @click="clearAmount">{{ $t('Reset') }}</p>
          </div>
          <div class="fee-box"></div>
          <div class="Total-box">
            <span>Total</span>
            <span>{{amount}} KRW</span>
          </div>
          <div class="charging-tishi">
            <div class="tishi-item">
              <img src="@/assets/BI.png" alt/>
              <p>{{ $t('bithumbAssets_content1') }}</p>
            </div>
            <div class="tishi-item">
              <img src="@/assets/BI.png" alt/>
              <p>{{ $t('bithumbAssets_content2') }} 100,000 KRW {{ $t('bithumbAssets_content3') }}1,000 KRW</p>
            </div>
            <div class="tishi-item">
              <img src="@/assets/BI.png" alt/>
              <p>{{ $t('bithumbAssets_content4')}}5,000,000 KRW{{ $t('bithumbAssets_content5') }}50,000,000 KRW</p>
            </div>
          </div>
          <div class="submit-box pointer">
            <p @click="charge">{{ $t('Charge') }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-cover" v-if="modal">
      <div class="modal">
        <div class="modal-title">{{ $t('bithumbAssets_content6') }}</div>
        <div class="modal-con">{{ $t('bithumbAssets_content7')}}</div>
        <div class="modal-bottom">
          <div class="money-item">
            <p>{{ $t('bithumbAssets_content8')}}</p>
            <p>2,000,000 KRW</p>
          </div>
          <div class="money-item">
            <p>{{ $t('bithumbAssets_content9')}}</p>
            <p>2,000,000 KRW</p>
          </div>
          <div class="money-item">
            <p>{{ $t('bithumbAssets_content10')}}</p>
            <p>2,000,000 KRW</p>
          </div>
          <div class="Email_code">
            <p>{{ $t('Email_code')}}</p>
            <div class="input-button">
              <input type="text" :placeholder="$t('Login.enter_email')"/>
              <div class="Verify_button">{{ $t('Verify') }}</div>
            </div>
          </div>
          <div class="Bithumb_password">
            <p>Bithumb {{ $t('Login.Password') }}</p>
            <div class="Bithumb_password_input">
              <input type="text" :placeholder="$t('Login.enter_password')"/>
            </div>
          </div>
          <div class="Veify_submit">
            <p>{{ $t('Verify') }}</p>
          </div>
        </div>
      </div>
    </div>
    <SuccessModal :show="show.success2" :text="show.successText"></SuccessModal>
    <FailedModal :show="show.failed2" :text="show.failedText" :text2="show.failedText2"></FailedModal>
    <FailedModal :show="show.failed" :text="show.failedText" :text2="show.failedText"></FailedModal>
<!--    判断是否是bithumb用户，不是的话点取消遮罩层会返回上一个页面-->
    <Modal @on-cancel="failed3Show(false)" v-model="show.failed3" width="592" height="432">
      <div style="text-align: center;padding-top: 32px;padding-bottom: 20px;">
        <div style="width: 64px;height: 64px;margin: 32px auto 8px;">
          <img src="../../../assets/failed.png" alt="">
        </div>
        <div class="Bithumb-account-link" style="margin-bottom: 0;">{{ show.failedText3 }}</div>
        <div style="margin-top: 20px" class="Bithumb-account-linkText pointer" @click="toBithumb">{{ $t('toBithumb') }}</div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>
<script>
  import SuccessModal from "../../modal/SuccessModal";
  import FailedModal from "../../modal/FailedModal";

  export default {
    components: {SuccessModal, FailedModal},
    data() {
      return {
        successT: null,
        failedT: null,
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
        modal: false,
        assetsData: {},
        amount: 0,
        amountList: [100, 1000, 10000]
      };
    },
    watch: {
      amount(n, o) {
        let reg = /^([0-9]+(\.[0-9]{0,2}|\.|))?$/;
        if (!reg.test(n)) {
          if (n === '') {
            this.amount = ''
          } else {
            this.amount = o;
          }
        }
      }
    },
    mounted() {
      this.isBithumb()
      this.getData();
      let ms = new Date().getTime();
      let script = document.createElement("script");
      script.type = "text/javascript";
      script.src =
        "https://qa-pg-relay.bithumb.com/v1/js/bithumb-cash.min.js?v=" + ms;
      document.getElementsByTagName("head")[0].appendChild(script);
      // 转币成功后回调 显示返回结果
      if (this.$route.query.type !== undefined) {
        if (this.$route.query.type === '1') {
          this.show.success2 = true
          this.show.successText = this.$t('success')
          setTimeout(() => {
            this.show.success2 = false
            this.show.successText = ''
          },2000)
        } else if (this.$route.query.type === '2') {
          this.show.failed2 = true
          this.show.failedText = this.$t('trad_cancel')
          setTimeout(() => {
            this.show.failed2 = false
            this.show.failedText = ''
          },2000)
        }
      }
    },
    methods: {
      // 前往bithumb
      toBithumb() {
        window.open('https://www.bithumb.com', "_blank")
      },
      isBithumb() {
        // 判断是bithumb用户还是ap用户，用于跳转过来的判断
        // 根据token判断是否是bithumb账户
        this.$post('/api/user/isBithumb').then(res => {
          this.$store.commit('isBithumb', res.data)
          if (res.data !== 1) {
            this.show.failed3 = true
            this.show.failedText3 = this.$t('apuser_cant_access')
          }
        })
      },
      failed3Show(n) {
        if (!n) {
          this.$router.go(-1)
          console.log(n)
        }
      },
      // 点击charge
      charge() {
        if (!this.amount) {
          this.show.failed = true;
          this.show.failedText = this.$t('please_enter_amount');
          setTimeout(() => {
            this.show.failedText = "";
            this.show.failed = false;
          }, 2500);
          return false;
        }
        document.body.style.overflowY = 'hidden'
        let form = new FormData();
        form.append("amt", this.amount);
        this.$post("/api/bithumbPay/ready", form).then(res => {
          console.log(res.data);
          let script = document.createElement("script");
          script.type = "text/javascript";
          script.src = res.data;
          document.getElementsByTagName("head")[0].appendChild(script);
          // location.href = res.data
          window.BithumbCASH.pay('pay_form')
          // let a = setInterval(() => {
          //   let iframe = document.getElementsByTagName('iframe')[0]
          //   let cD = iframe.contentWindow
          //   let bt = cD.document.getElementsByClassName('bg_icon')[0]
          //   console.log(bt)
          //   if(bt) {
          //     bt.onclick = function () {
          //       let dim = document.getElementsByClassName('bp_modal-dim')[0]
          //       let bp = document.getElementsByClassName('bp_modal')[0]
          //       dim.remove()
          //       bp.remove()
          //     }
          //     console.log('ok')
          //     clearInterval(a)
          //   }
          // }, 1000)
        });
        // this.modal = true;
      },
      // 快捷添加数量
      getAddAmount(item) {
        this.amount = Number(this.amount);
        this.amount += item;
        // 最大16位
        if (this.amount > 9999999999999999) {
          this.amount = 9999999999999999;
        }
      },
      // 重置数量
      clearAmount() {
        this.amount = 0;
      },
      // 获取个人资产
      getData() {
        this.$get("/api/bithumbPay/userAsset").then(res => {
          this.assetsData = res.data;
        });
      }
    }
  };
</script>
<style>
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
  .ivu-icon-ios-close{
    display: none;
  }
</style>
<style scoped>
  .bithumbAssets-box {
    margin: 80px auto 160px;
    width: 800px;
  }

  .assets-box {
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .assets-title {
    border-bottom: 1px solid #e6ebf1;
    height: 40px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 40px;
    letter-spacing: -0.65px;
    color: #32325d;
    padding-left: 16px;
  }

  .assets-type {
    padding: 32px 104px;
  }

  .type-box {
    display: flex;
    width: 592px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .type1 {
    padding: 16px 0;
    width: 296px;
    box-sizing: border-box;
    padding-left: 32px;
    border-right: solid 1px #e6ebf1;
  }

  .type1 p:nth-of-type(1) {
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

  .type1 p:nth-of-type(2) {
    height: 30px;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #565abf;
  }

  .type1 p:nth-of-type(2) span {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
    padding-left: 3px;
  }

  .select-more {
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #565abf;
  }

  .Charging-box {
    margin-top: 10px;
    width: 100%;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .charging-title {
    height: 40px;
    line-height: 40px;
    padding-left: 16px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.65px;
    color: #32325d;
    border-bottom: 1px solid #e6ebf1;
  }

  .Charging-action-box {
    padding: 32px 208px 23px;
    background-color: #f7f9fc;
  }

  .amount-box {
    width: 384px;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
    display: flex;
    align-items: center;
  }

  .amount-box span {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    color: #bdc6d4;
    padding-left: 17px;
  }

  .amount-box .amount-input {
    width: 268px;
    padding-left: 24px;
    box-sizing: border-box;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
    border: none;
  }

  .amount-box p {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .number-box {
    margin-top: 8px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    display: flex;
    background-color: #ffffff;
  }

  .number-box p {
    width: 96px;
    height: 40px;
    line-height: 40px;
    border-right: solid 1px #e6ebf1;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #bdc6d4;
    flex: 1;
  }

  .Total-box {
    margin-top: 8px;
    display: flex;
    justify-content: space-between;
  }

  .Total-box span:nth-of-type(1) {
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 24px;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .Total-box span:nth-of-type(2) {
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    text-align: right;
    color: #565abf;
  }

  .charging-tishi {
    padding-top: 16px;
  }

  .tishi-item {
    display: flex;
  }

  .tishi-item img {
    width: 16px;
    height: 16px;
  }

  .tishi-item p {
    font-family: SpoqaHanSans;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
    padding-left: 4px;
    margin-bottom: 4px;
  }

  .submit-box {
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  }

  .submit-box p {
    width: 89px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 2px;
    background-color: #565abf;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
  }

  .modal-cover {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    position: fixed;
    top: 0;
    left: 0;
  }

  .modal {
    width: 592px;
    background: #fff;
    border-radius: 2px;
    padding: 32px 0 0;
    box-sizing: border-box;
    position: absolute;
    top: 150px;
    left: 50%;
    margin-left: -296px;
  }

  .modal-title {
    padding: 0 98px;
    height: 48px;
    font-family: SpoqaHanSans;
    font-size: 36px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    text-align: center;
    color: #32325d;
  }

  .modal-con {
    padding: 0 98px;
    font-family: SpoqaHanSans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.71;
    letter-spacing: -0.39px;
    text-align: center;
    color: #87bbfc;
  }

  .modal-bottom {
    margin-top: 32px;
    width: 100%;
    background-color: #f7f9fc;
    padding: 16px 104px 32px;
  }

  .money-item {
    display: flex;
    justify-content: space-between;
    height: 36px;
    border-bottom: 1px solid #e6ebf1;
    align-items: center;
  }

  .money-item p {
    font-family: SpoqaHanSans;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Email_code {
    padding-top: 16px;
  }

  .Email_code p {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .input-button {
    display: flex;
    margin-top: 6px;
  }

  .input-button input {
    width: 296px;
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
    color: #bdc6d4;
    padding-left: 16px;
    box-sizing: border-box;
  }

  .Verify_button {
    margin-left: 9px;
    width: 79px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    border-radius: 2px;
    border: solid 1px #565abf;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #565abf;
  }

  .Bithumb_password {
    padding-top: 8px;
  }

  .Bithumb_password p {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 20px;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Bithumb_password_input {
    padding-top: 6px;
  }

  .Bithumb_password_input input {
    width: 384px;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
    padding-left: 16px;
    box-sizing: border-box;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .Veify_submit {
    padding-top: 16px;
    display: flex;
    justify-content: flex-end;
  }

  .Veify_submit p {
    width: 87px;
    height: 48px;
    border-radius: 2px;
    background-color: #565abf;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 48px;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
  }
</style>
