<template>
  <div id="deposit">
    <Header></Header>
    <div style="background-color: #e3e8ee;padding: 32px 0;">
      <div name="selectBank" id="box1">
        <div class="depositTitle">
          <div class="depositTitleText">{{ $t('asset.deposit.Deposit') }}</div>
        </div>
        <div class="box1Content">
          <p class="USDT">{{ depositSymbol.symbol }}</p>
          <div class="depositCard" style="border-radius: 2px 0 0 2px;">
            <div
              class="depositCardTitle"
              :title="toThousands(Number(depositSymbol.lockAP) + Number(depositSymbol.available))"
            >{{ toThousands(Number(depositSymbol.lockAP) + Number(depositSymbol.available)) }}</div>
            <div class="depositCardContent">{{ $t('asset.deposit.Balance') }}</div>
          </div>
          <div class="depositCard" style="border-radius: 0 2px 2px 0;">
            <div
              class="depositCardTitle"
              :title="toThousands(Number(depositSymbol.available))"
            >{{ toThousands(Number(depositSymbol.available)) }}</div>
            <div class="depositCardContent">{{ $t('asset.deposit.Available') }}</div>
          </div>
          <div style="display: flex;align-items: flex-start;justify-content: space-between">
            <div id="addressInput" style="display: inline-block;width: 70%;position: relative">
              <p
                style=" font-size: 14px;color: #32325d;letter-spacing: -0.4px;line-height: 1.43;margin-top:16px;margin-bottom: 4px;"
              >{{ $t('asset.deposit.Deposit_address') }}</p>
              <i-input :readonly="true" v-model="address" style="width: 384px;"/>
              <div
                style="position: absolute; left: 339px; top: 39px;"
                @click="copySecret"
                class="copy depositCopy"
              >{{ $t('asset.deposit.Copy') }}</div>
              <br />
              <div class="depositLongContent">{{ $t('asset.deposit.content1') }}</div>
            </div>
            <div style="display: inline-block;width: 28%;position: relative;">
              <p
                style=" font-size: 14px;color: #32325d;letter-spacing: -0.4px;line-height: 1.43;margin-top:16px;
                position: absolute;z-index: 100;left: -16px;"
              >{{ $t('asset.deposit.QRcode') }}</p>
              <!--              <canvas style="height: 120px;width: 120px;" id="depositQRCode"></canvas>-->
              <img
                style="width: 100px;height: 100px;position: absolute;top: 24px;left: -28px;"
                :src="addressQRCode"
                alt
              />
            </div>
          </div>
        </div>
      </div>
      <div id="box2">
        <div class="depositTitle">
          <div class="depositTitleText">{{ $t('asset.deposit.Deposit_History') }}</div>
        </div>
        <div class="box2Params">
          <div style="margin-left: 16px;display:flex;align-items:center">
            <DatePicker
              :clearable="false"
              style="width:109px"
              @on-change="symbolRechargeLog"
              v-model="startTime"
              type="date"
            ></DatePicker>
            <span style="font-size:14px;margin:0 8px">~</span>
            <DatePicker
              :clearable="false"
              style="width:109px"
              @on-change="symbolRechargeLog"
              v-model="endTime"
              type="date"
            ></DatePicker>
          </div>
          <div style="margin-right: 16px;">
            <RadioGroup
              @on-change="changeDay"
              type="button"
              style="margin-right: 8px;"
              :value="'7 Days'"
            >
              <Radio label="7 Days">{{7 + $t('asset.deposit.Days')}}</Radio>
              <Radio label="30 Days">{{30 + $t('asset.deposit.Days')}}</Radio>
            </RadioGroup>
            <RadioGroup @on-change="changeNewst" type="button" :value="'By newest'">
              <Radio label="By newest">{{ $t('asset.deposit.By_newest')}}</Radio>
              <Radio label="By past">{{$t('asset.deposit.By_past')}}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div>
          <Table :columns="columns1" :data="data1"></Table>
        </div>
        <div id="pages" v-if="data1.length!=0" style="text-align: center;margin-top:20px;">
          <span>
            <Page
              @on-change="pageChange"
              @on-page-size-change="pageSizeChange"
              :total="total"
              size="small"
            />
          </span>
        </div>
        <div
          class="nodata"
          style="margin-top: 12px;padding-bottom: 12px;"
          v-if="data1.length === 0"
        >
          <img src="../../../assets/noData2.png" alt />
          <p>{{$t('NoData')}}</p>
        </div>
      </div>
    </div>
    <FailedModal :show="show.failed" :text="show.failedText"></FailedModal>
  </div>
</template>

<script>
import Header from "./header";
// import QRCode from 'qrcode'
import FailedModal from "../../modal/FailedModal";
import { toThousands } from "../../../tool";

export default {
  name: "deposit",
  components: { Header, FailedModal },
  data() {
    return {
      addressQRCode: "",
      total: 0,
      startTime: "",
      endTime: "",
      address: "",
      isClickIssue: false,
      showVerify: this.isIdentityVerify === "1",
      isIdentityVerify: localStorage.getItem("isIdentityVerify"),
      data1: [],
      symbolRechargeLogParams: {
        symbol: "",
        page: 1,
        pageSize: 10,
        startTime: "",
        endTime: "",
        sort: 1
      },
      symbolRechargeParams: {
        symbol: "AP"
      },
      show: {
        failedText: "",
        failed: false,
        totalBalance: "",
        available: ""
      },
      depositSymbol: {
        available: 0,
        lockAP: 0,
        symbol: ""
      },
      symbolBalance: 0,
      symbolAvailable: 0
    };
  },
  computed: {
    columns1() {
      const self = this;
      return [
        {
          title: self.$t("asset.deposit.Time"),
          align: "left",
          render(h, param) {
            return h("span", {}, param.row.createdAt);
          }
        },
        {
          title: self.$t("asset.deposit.Coin"),
          key: "symbol",
          align: "left"
        },
        {
          title: self.$t("asset.deposit.Amount"),
          key: "amount",
          align: "right"
        },
        {
          title: self.$t("asset.deposit.Confirmation_times"),
          key: "confirmations",
          align: "right"
        },
        {
          title: self.$t("asset.deposit.Status"),
          key: "status",
          align: "right",
          render(h, param) {
            let re;
            if (param.row.status === 0) {
              re = self.$t("asset.deposit.unconfirmed");
            } else if (param.row.status === 1) {
              re = self.$t("asset.deposit.accomplish");
            } else {
              re = self.$t("asset.deposit.exception");
            }
            return h("span", {}, re);
          }
        }
      ];
    }
  },
  mounted() {
    this.depositSymbol = JSON.parse(sessionStorage.getItem("depositSymbol"));
    this.deposit();
    this.getUserBalance();
    // this.symbolRecharge()
    this.symbolRechargeLog();
    this.$post("/api/user/isIdentityVerify").then(res => {
      console.log("/api/user/isIdentityVerify", res);
      if (res.data === 1) {
        localStorage.setItem("isIdentityVerify", "1");
      }
    });
  },
  watch: {
    // address(n) {
    //   QRCode.toCanvas(document.getElementById('depositQRCode'), n, function (error) {
    //     if (error) console.error(error)
    //     console.log('success!');
    //   })
    // }
  },
  methods: {
    toThousands(n) {
      return toThousands(n);
    },
    // 获取用户某个币对的余额
    getUserBalance() {
      let form2 = new FormData();
      form2.append("symbol", this.depositSymbol.symbol);
      // 获取用户计价货币余额
      this.$post("/api/account/getUserBalance", form2).then(res => {
        try {
          this.symbolBalance = res.data.balance;
          this.symbolAvailable = res.data.available;
        } catch (e) {
          this.symbolBalance = 0;
          this.symbolAvailable = 0;
        }
      });
    },
    // 获取充值地址，链上webApi
    deposit() {
      const self = this;
      const param = {
        time: new Date().valueOf(),
        symbol: self.depositSymbol.symbol
      };
      this.$post(
        window.selfConfig.chainUrl + "/finance/get_charge_address",
        param
      ).then(res => {
        this.address = res.data.addressStr;
        this.addressQRCode = res.data.addressQRCode;
      });
    },
    // 查询条件day变化时
    changeDay(name) {
      console.log(name);
      if (name === "7 Days") {
        this.endTime = new Date();
        let temp = this.endTime.valueOf();
        this.startTime = new Date(temp - 604800000);
      } else {
        this.endTime = new Date();
        let temp = this.endTime.valueOf();
        this.startTime = new Date(temp - 2592000000);
      }
      this.symbolRechargeLog();
    },
    pageChange(e) {
      this.symbolRechargeLogParams.page = e;
      this.symbolRechargeLog();
    },
    pageSizeChange(e) {
      this.symbolRechargeLogParams.pageSize = e;
      this.symbolRechargeLogParams.page = 1;
      this.symbolRechargeLog();
    },
    copyText(text) {
      let flag = false;
      let textarea = document.createElement("input"); //创建input对象
      let currentFocus = document.getElementsByClassName("copy")[0]; //当前获得焦点的元素
      currentFocus.appendChild(textarea); //添加元素
      textarea.value = text;
      textarea.focus();
      if (textarea.setSelectionRange)
        textarea.setSelectionRange(0, textarea.value.length);
      //获取光标起始位置到结束位置
      else textarea.select();
      try {
        flag = document.execCommand("copy"); //执行复制
        this.$Message.success(this.$t("copy_success"));
      } catch (eo) {
        flag = false;
      }
      currentFocus.removeChild(textarea); //删除元素
      currentFocus.focus();
      return flag;
    },
    copySecret() {
      this.copyText(this.address);
    },
    // 充值记录查询条件，正序倒序
    changeNewst(v) {
      console.log(v);
      if (v === "By newest") {
        this.symbolRechargeLogParams.sort = 1;
      } else {
        this.symbolRechargeLogParams.sort = 2;
      }
      this.symbolRechargeLog();
    },
    // 获取充值记录
    symbolRechargeLog() {
      // depositSymbol.symbol
      let form = new FormData();
      for (let i in this.symbolRechargeLogParams) {
        form.append(i, this.symbolRechargeLogParams[i]);
      }
      form.delete("startTime");
      form.delete("endTime");
      form.delete("symbol");
      form.append("symbol", this.depositSymbol.symbol);
      // 重新计算时间条件
      if (this.startTime !== "") {
        this.symbolRechargeLogParams.startTime = this.startTime.valueOf();
        form.append("startTime", this.symbolRechargeLogParams.startTime);
      } else {
        form.append("startTime", "");
      }
      if (this.endTime !== "") {
        this.symbolRechargeLogParams.endTime = this.endTime.valueOf();
        form.append("endTime", this.symbolRechargeLogParams.endTime);
      } else {
        form.append("endTime", "");
      }
      if (
        this.symbolRechargeLogParams.startTime &&
        this.symbolRechargeLogParams.endTime &&
        this.symbolRechargeLogParams.startTime >=
          this.symbolRechargeLogParams.endTime
      ) {
        this.show.failed = true;
        this.show.failedText = this.$t(
          "Endtime_cannot _earlier_than_starttime"
        );
        setTimeout(() => {
          this.show.failed = false;
        }, 2000);
        return false;
      }
      this.$post("/api/account/symbolRechargeLog", form).then(res => {
        console.log(res);
        this.data1 = res.data.records;
        this.total = res.data.total;
      });
    },
    // /api/account/symbolRecharge
    symbolRecharge() {
      let form = new FormData();
      for (let i in this.symbolRechargeParams) {
        form.append(i, this.symbolRechargeParams[i]);
      }
      this.$post("/api/account/symbolRecharge", form).then(res => {
        console.log(res);
        this.address = res.data.address;
      });
    },
    issueVitual() {
      this.isClickIssue = true;
      this.showVerify = false;
    },
    toAccount() {
      this.$router.push("/account");
    }
  }
};
</script>

<style>
#deposit .nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#deposit .nodata img {
  width: 50px;
  height: 50px;
}

#deposit .nodata p {
  margin: 0;
  margin-top: 5px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: center;
  color: #bdc6d4;
}
#addressInput input {
  height: 40px;
  font-size: 14px;
  padding-left: 20px;
  padding-right: 89px;
}
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
/* #box2 .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
  border-color: #565abf;
  border-left: 0px solid #565abf;
}
#box2 .ivu-radio-group-button .ivu-radio-wrapper {
  color: #bdc6d4;
  font-size: 14px;
}
#box2 .ivu-radio-group-button .ivu-radio-wrapper-checked {
  border-color: #565abf;
  color: #565abf;
  box-shadow: -1px 0 0 0 #565abf;
}
#box2 .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
  border-color: #565abf;
  color: #565abf !important;
} */
.ivu-table-tip {
  display: none;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
  border-color: #565abf;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked {
  color: #565abf !important;
  border-color: #565abf !important;
  box-shadow: -1px 0 0 0 #565abf;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
  border-color: #565abf;
  color: #565abf !important;
}
.ivu-radio-group-button .ivu-radio-wrapper-checked:before {
  background: #565abf !important;
}
.ivu-radio-group-button .ivu-radio-wrapper {
  color: #bdc6d4;
  font-size: 14px;
}
#box2 .ivu-input-suffix {
  left: auto !important;
  right: 0 !important;
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: cover;
  width: 10px;
  height: 13px;
  transition: none;
  margin: 7px 8px 0 0;
}
#box2 .ivu-icon-ios-calendar-outline:before {
  content: "";
}
#box2 .ivu-input {
  padding: 0;
  padding-left: 8px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
  height: 28px;
}
.ivu-table th {
  color: #32325d;
  background-color: #f7f9fc;
}
.depositLongContent {
  margin-top: 16px;
  width: 384px;
  height: 32px;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  color: #f7d269;
}
.depositCopy:hover {
  cursor: pointer;
}

.depositCopy {
  margin-top: 10px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: left;
  color: #565abf;
}

.depositAddress {
  position: relative;
  padding: 10px 20px;
  width: 384px;
  height: 40px;
  border-radius: 2px;
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.depositCardContent {
  width: 47px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #bdc6d4;
}

.depositCardTitle {
  width: 88px;
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

.depositCard {
  padding: 11px 32px;
  display: inline-block;
  width: 296px;
  height: 74px;
  border-radius: 2px;
  border: solid 1px #e6ebf1;
  background-color: #f7f9fc;
}

.USDT {
  margin-bottom: 8px;
  min-width: 32px;
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

#box3 div {
  text-align: center;
}
.ivu-input-suffix {
  margin-right: 16px;
}

.box2Params {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 798px;
  height: 49px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}

#box2 {
  padding-bottom: 20px;
  margin: 32px auto 32px;
  width: 800px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.box1Content {
  width: 600px;
  margin: 22px auto 0;
}

.depositTitleText {
  height: 24px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.65px;
  color: #32325d;
  line-height: 22px;
}

.depositTitle {
  width: 798px;
  height: 40px;
  padding: 8px 16px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}

#box1 {
  padding-bottom: 38px;
  margin: auto;
  width: 800px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}
</style>
