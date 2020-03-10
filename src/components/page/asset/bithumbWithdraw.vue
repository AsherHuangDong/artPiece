<template>
  <div
    id="bithumbWithdraw"
    style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 80px;"
  >
    <div style="width:1216px;margin: 0 auto">
      <div class="location">
        <div class="location1">{{ $t("Asset") }}</div>
        <div style="margin: 0 6px;width:8px;height: 14px;">
          <img src="../../../assets/rA.png" alt="" />
        </div>
        <div class="location1">{{ $t("BTC_Withdraw") }}</div>
      </div>
      <div class="Mask">
        <div class="Rectangle-Copy-4 Security-Password">
          {{ $t("BTC_Withdraw") }}
        </div>
        <div style="width: 592px;margin: 16px auto 0;">
          <div class="Rectangle">
            <div style="width: 24px;margin-right: 8px;">
              <img src="../../../assets/ii.png" alt="" />
            </div>
            <div style="width: 554px;line-height: 16px;">
              <div
                style="display: flex;align-items: flex-start;justify-content: flex-start"
              >
                <div>-</div>
                &nbsp;
                <div>{{ $t("Withdrawal_application_time") }}
                  {{ showStartTime + '~' + showEndTime }}
                </div>
              </div>
              <div
                style="display: flex;align-items: flex-start;justify-content: flex-start"
              >
                <div>-</div>
                &nbsp;
                <div>
                  {{ $t("Withdrawal_application_time2") }}
                </div>
              </div>
              <div
                style="display: flex;align-items: flex-start;justify-content: flex-start"
              >
                <div>-</div>
                &nbsp;
                <div>{{ $t("Withdrawal_application_time3") }}</div>
              </div>
            </div>
          </div>
          <div class="fromRow">
            <div class="letfL">{{ $t("available_withdraw") }}</div>
            <div class="AP">{{ toThousands(availableAP) }} AP</div>
          </div>
          <div class="fromRow">
            <div class="letfL">
              {{ $t("Maximum_amount_for_a_single_withdrawal") }}
            </div>
            <div class="AP">{{ toThousands(withdrawMin) }} AP</div>
          </div>
          <div class="fromRow">
            <div class="letfL">{{ $t("withdraw_the_balance_in_one_day") }}</div>
            <div class="AP">{{ toThousands(dayLimit) }} AP</div>
          </div>
          <div class="fromRow" style="margin-top: 20px;">
            <div class="letfL">Bithumb BTC{{ $t("wallet_address") }}</div>
            <div
              style="display: flex;justify-content: flex-start;align-items: center"
              class="AP"
            >
              <div style="margin-right: 8px;">{{ param.address }}</div>
              <div
                @click="getWalletAddress"
                class="Field pointer"
                style="display: inline-block;line-height: 22px;"
              >
                {{ $t("search") }}
              </div>
            </div>
          </div>
          <div class="fromRow" style="margin-top: 22px;">
            <div class="letfL">{{ $t("please_enter_withdraw_amount") }}</div>
            <div
              style="display: flex;justify-content: flex-start;align-items: center;position: relative;"
              class="AP"
            >
              <input
                v-model="btcAmount"
                @focus="onfocus = 1"
                class="Field-Copy-2"
                type="text"
              />
              <div class="eq">=</div>
              <input
                v-model="apAmount"
                @focus="onfocus = 2"
                class="Field-Copy-2"
                style="margin-left: -4px;"
                type="text"
              />
              <div
                class="BTC-800000-AP"
                style="position: absolute;left: 0;bottom: -20px;"
              >
                1BTC = {{ rate }} AP
              </div>
              <div
                class="BTC-800000-AP"
                style="position: absolute;right: 0;bottom: -20px;"
              >
                <div
                  class="pointer"
                  style="text-decoration:underline;color: #565abf;display: inline-block;margin-right: 8px;"
                >
                  {{ $t("all") }}
                </div>
                <div
                  class="pointer"
                  style="text-decoration:underline;color: #f4496d;display: inline-block"
                >
                  {{ $t("clear") }}
                </div>
              </div>
            </div>
          </div>
          <div class="fromRow" style="margin-top: 38px;">
            <div class="letfL">{{ $t("withdraw_fee") }}</div>
            <div class="AP">0.001 BTC</div>
          </div>
          <div class="fromRow">
            <div class="letfL">{{ $t("arrival_amount") }}</div>
            <div class="AP">0.625 BTC ( = 5,001 AP)</div>
          </div>
          <div class="fromRow" style="margin-top: 22px;">
            <div class="letfL">{{ $t("SMS_code") }}</div>
            <div
              style="display: flex;justify-content: flex-start;align-items: center;position: relative;"
              class="AP"
            >
              <input
                style="width: 222px;"
                :placeholder="$t('please_enter6_code')"
                class="Field-Copy-2"
                type="text"
              />
              <div
                class="send pointer"
                style="position: absolute;right: 8px;bottom: 1px;"
              >
                {{ $t("send") }}
              </div>
              <div
                class="greenI"
                style="position: absolute;right: 0px;bottom: -20px;"
              >
                {{ $t("please_enter_bithumb_get_phone_code") }}
              </div>
            </div>
          </div>
          <div
            style="display: flex;justify-content: space-between;align-items: center"
          >
            <div></div>
            <div @click="withdraw" class="Field3 pointer">
              {{ $t("request_withdraw") }}
            </div>
          </div>
        </div>
      </div>
      <div class="Mask" style="height: auto;margin-top: 16px;">
        <div class="Rectangle-Copy-4 Security-Password">
          {{ $t("BTC_Withdraw_History") }}
        </div>
        <div class="orderBoxTitle">
          <div style="display:flex;align-items:center">
            <DatePicker
              :clearable="false"
              type="date"
              :placeholder="$t('public.start_date')"
              style="width:109px;height: 28px;"
            ></DatePicker>
            <span style="font-size:14px;width:8px;margin:0 8px;">~</span>
            <DatePicker
              :clearable="false"
              type="date"
              :placeholder="$t('public.end_date')"
              style="width:109px"
            ></DatePicker>
          </div>
          <div>
            <Select
              style="width: 82px; height: 28px;margin-right: 8px;"
              :placeholder="$t('Tranding.All')"
            >
              <Option value>{{ $t("Tranding.All") }}</Option>
            </Select>
            <RadioGroup type="button" style="margin-right: 8px;">
              <Radio :label="'All'">{{ $t("asset.order.All") }}</Radio>
              <Radio :label="'30'">{{ $t("asset.order.30_Days") }}</Radio>
            </RadioGroup>
            <RadioGroup type="button" style="">
              <Radio :label="'All'">By newest</Radio>
              <Radio :label="'30'">{{ $t("asset.order.30_Days") }}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="Rectangle-Copy-5">
          <div style="text-align: left;width:148px;">{{ $t("time") }}</div>
          <div style="text-align: left;width: 170px;">
            {{ $t("withdraw_address") }}
          </div>
          <div style="text-align: right;width: 107px">
            {{ $t("withdraw_amount") }}(AP)
          </div>
          <div style="text-align: right;width: 107px">
            {{ $t("withdraw_amount") }}(BTC)
          </div>
          <div style="text-align: right;width: 107px">
            {{ $t("withdraw_fee") }}
          </div>
          <div style="text-align: right;width: 107px">
            {{ $t("arrival_amount") }}
          </div>
          <div style="text-align: right;width: 107px">{{ $t("status") }}</div>
        </div>
        <div class="Rectangle-Copy-6">
          <div style="text-align: left;width:148px;">2019-08-16, 22:49:10</div>
          <div style="text-align: left;width: 170px;">
            18dfnjlnaffd99jkdf83lknsfasdfd
          </div>
          <div style="text-align: right;width: 107px">5,000</div>
          <div style="text-align: right;width: 107px">0.625</div>
          <div style="text-align: right;width: 107px">0.001 BTC</div>
          <div style="text-align: right;width: 107px">0.001 BTC</div>
          <div style="text-align: right;width: 107px">进行中</div>
        </div>
      </div>
      <div class="bottomI">
        <div class="Rectangle">
          <div style="width: 24px;margin-right: 8px;">
            <img src="../../../assets/ii.png" alt="" />
          </div>
          <div style="width: 554px;line-height: 16px;">
            - {{ $t("bithumb_withdraw_notice1") }}<br />
            - {{ $t("bithumb_withdraw_notice2") }}<br />
            - {{ $t("bithumb_withdraw_notice3") }}
          </div>
        </div>
      </div>
    </div>
    <FailedModal :show="showFiled" :text="failedText"></FailedModal>
    <SuccessModal :show="showSuccess" :text="successText"></SuccessModal>
  </div>
</template>

<script>
import { toThousands } from "../../../tool";
import SuccessModal from "../../modal/SuccessModal";
import FailedModal from "../../modal/FailedModal";
export default {
  name: "bithumbWithdraw",
  components: { SuccessModal, FailedModal },
  data() {
    return {
      showFiled: false,
      showSuccess: false,
      failedText: '',
      successText: '',
      showStartTime: '',
      showEndTime: '',
      startTime: { h: 0, m: 0 },
      endTime: { h: 0, m: 0 },
      param: {
        address: "",
        fromAmount: "",
        fromSymbol: "",
        toAmount: "",
        toSymbol: "BTC",
        fee: "",
        feeSymbol: "",
        realAmount: ""
      },
      onfocus: 1, // 用户光标在 1BTC  2AP 进行输入，输入时按照方向进行换算
      availableAP: 0,
      dayLimit: 0,
      withdrawMin: 0,
      rate: 1, // ap和btc之间的汇率,通过rate2、rate3计算
      rate2: 1, // bithumb的BTC——KRW汇率
      rate3: JSON.parse(sessionStorage.getItem("public_info_v4")).market.rate
        .ko_KR.AP, // 链上的AP——KRW汇率
      apAmount: 0,
      btcAmount: 0
    };
  },
  watch: {
    apAmount(n, o) {
      let reg = /^([0-9]+(\.[0-9]*|\.|))?$/;
      if (!reg.test(n)) {
        this.apAmount = o;
      } else {
        if (this.onfocus === 2) {
          this.btcAmount = Number(n) / this.rate;
        }
      }
    },
    btcAmount(n, o) {
      let reg = /^([0-9]+(\.[0-9]*|\.|))?$/;
      if (!reg.test(n)) {
        this.btcAmount = o;
      } else {
        if (this.onfocus === 1) {
          this.apAmount = Number(n) * this.rate;
        }
      }
    }
  },
  mounted() {
    this.getUserAp();
    this.getWithdrawLimit();
    // this.getRate()
    this.getExchangeRate();
    this.getWalletAddress();
  },
  methods: {
    // /api/bithumbPay/getWalletAddress
    getWalletAddress() {
      let form = new FormData();
      form.append("symbol", "BTC");
      this.$post("/api/bithumbPay/getWalletAddress", form).then(res => {
        console.log(res);
      });
    },
    // 提现
    withdraw() {
      let form = new FormData();
      form.append("address", this.param.address);
      form.append("fromAmount", this.apAmount);
      form.append("fromSymbol", "AP");
      form.append("toAmount", this.btcAmount);
      form.append("toSymbol", "BTC");
      form.append("fee", "1");
      form.append("feeSymbol", "AP");
      form.append("realAmount", this.param.realAmount);
      this.$post("/api/bithumbPay/withdraw", form).then(res => {
        console.log(res);
        if(res.code === 0 ) {
          this.showSuccess = true
          this.successText = res.msg
          setTimeout(() => {
            this.showSuccess = false
            this.successText = ''
          }, 2000)
        } else {
          this.showFiled = true
          this.failedText = res.msg
          setTimeout(() => {
            this.showFiled = false
            this.failedText = ''
          }, 2000)
        }
      });
    },
    // 获取汇率
    getExchangeRate() {
      this.$post("/api/bithumbPay/getExchangeRate").then(res => {
        console.log(res);
        this.rate = res.data;
      });
    },
    getRate() {
      const self = this;
      let httpRequest = new XMLHttpRequest(); //第一步：建立所需的对象
      httpRequest.open(
        "GET",
        "https://testapi.bithumb.com/public/ticker/BTC_KRW",
        true
      ); //第二步：打开连接  将请求参数写在url中  ps:"./Ptest.php?name=test&nameone=testone"
      httpRequest.send(); //第三步：发送请求  将请求参数写在URL中
      /**
       * 获取数据后的处理程序
       */
      httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4 && httpRequest.status === 200) {
          let json = httpRequest.responseText; //获取到json字符串，还需解析
          console.log(json);
          self.rate2 = JSON.parse(json).data.closing_price;
          self.rate = self.rate2 / self.rate3; // BTC / AP,也就是 1BTC = this.rate个AP
          console.log(self.rate, self.rate2, self.rate3);
        }
      };
    },
    toThousands(n) {
      return toThousands(n);
    },
    getUserAp() {
      this.$post("/api/account/getUserAp").then(res => {
        this.availableAP = res.data.availableAP.balance;
      });
    },
    // 获取提现额度
    getWithdrawLimit() {
      let form = new FormData();
      form.append("symbol", "AP");
      this.$post("/api/account/getWithdrawLimit", form).then(res => {
        this.dayLimit = res.data.dayLimit - res.data.dayAmount;
        // 单日可提现余额 = 今天提了的 - 每日提现额度
        this.withdrawMin = res.data.withdrawMax;
        // 允许提现的时间范围
        const start = new Date(res.data.withdrawLimit.startTime);
        const end = new Date(res.data.withdrawLimit.endTime);
        this.startTime.h = start.getHours();
        this.startTime.m = start.getMinutes();
        this.showStartTime =
          (this.startTime.h < 10 ? "0" + this.startTime.h : this.startTime.h) + ' : ' +
          (this.startTime.m < 10 ? "0" + this.startTime.m : this.startTime.m)
        this.endTime.h = end.getHours();
        this.endTime.m = end.getMinutes();
        this.showEndTime =
          (this.endTime.h < 10 ? "0" + this.endTime.h : this.endTime.h) + ' : ' +
          (this.endTime.m < 10 ? "0" + this.endTime.m : this.endTime.m)
      });
    }
  }
};
</script>
<style>
.ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
  border-color: #565abf !important;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
  border-color: #565abf !important;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #565abf !important;
}
#bithumbWithdraw .ivu-icon-ios-arrow-down:before {
  content: "";
}
#bithumbWithdraw .ivu-icon-ios-arrow-down {
  left: auto !important;
  right: 0 !important;
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: cover;
  width: 10px;
  height: 13px;
  transition: none;
  margin: 0 5px 0 0;
}
#bithumbWithdraw .ivu-select-single .ivu-select-selection {
  height: 28px;
}
#bithumbWithdraw .ivu-select-placeholder {
  line-height: 28px;
  height: 28px;
}
#bithumbWithdraw .ivu-input-suffix {
  left: auto !important;
  right: 0 !important;
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: cover;
  width: 10px;
  height: 13px;
  transition: none;
  margin: 7px 8px 0 0;
}
#bithumbWithdraw .ivu-icon-ios-calendar-outline:before {
  content: "";
}
#bithumbWithdraw .ivu-input-with-suffix {
  height: 28px;
  line-height: 28px;
}
#bithumbWithdraw .ivu-radio-group-button .ivu-radio-wrapper {
  height: 28px;
  line-height: 28px;
}
</style>
<style scoped>
.bottomI {
  margin: 16px auto 0;
  width: 1008px;
  height: 64px;
  border-radius: 2px;
  background-color: #f7f9fc;
}
.Rectangle-Copy-6 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px 9px;
  width: 1008px;
  height: 32px;
  background-color: #f7f9fc;
}
.Rectangle-Copy-5 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 16px 9px;
  width: 1008px;
  height: 32px;
  background-color: #f7f9fc;
}
.orderBoxTitle {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 49px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}

.Field3 {
  padding: 0 22px;
  width: auto;
  margin-top: 54px;
  line-height: 42px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  height: 40px;
  border-radius: 2px;
  background-color: #565abf;
}

.greenI {
  height: 16px;
  font-family: SpoqaHanSans;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.5px;
  text-align: right;
  color: #3ecf8e;
}

.Field-Copy-2 {
  color: #000;
}

.Field-Copy-2::-webkit-input-placeholder {
  /* Chrome/Opera/Safari */
  font-family: SpoqaHanSans;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.45px;
  color: #bdc6d4;
}

.Field-Copy-2::-moz-placeholder {
  /* Firefox 19+ */
  font-family: SpoqaHanSans;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.45px;
  color: #bdc6d4;
}

.send {
  height: 20px;
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

.BTC-800000-AP {
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

.eq {
  z-index: 100;
  line-height: 22px;
  margin-left: -4px;
  text-align: center;
  width: 24px;
  height: 24px;
  border-radius: 12px;
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.Field-Copy-2 {
  padding: 4px 16px;
  width: 176px;
  height: 28px;
  border-radius: 2px;
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.fromRow {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.Field {
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: center;
  color: #565abf;
  padding: 5px 16px;
  height: 32px;
  border-radius: 2px;
  border: solid 1px #565abf;
}

.AP {
  height: 24px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 24px;
  letter-spacing: -0.4px;
  text-align: right;
  color: #32325d;
}

.letfL {
  height: 24px;
  font-family: SpoqaHanSans;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.51px;
  color: #32325d;
}

.Rectangle {
  padding: 8px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  width: 592px;
  /*height: 64px;*/
  border-radius: 2px;
  background-color: #f7f9fc;
}

.Security-Password {
  height: 24px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #32325d;
}

.Rectangle-Copy-4 {
  padding: 8px 16px;
  width: 1006px;
  height: 40px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}

.Mask {
  margin: 0 auto;
  width: 1008px;
  height: 608px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.location {
  margin: 0 auto;
  width: 1008px;
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
