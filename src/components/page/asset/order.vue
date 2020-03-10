<template>
  <div style="width: 100%;min-width: 1216px;background-color: #e3e8ee;padding: 32px 0;" id="order">
    <div style="width: 1216px;margin: 0 auto;">
      <div class="orderBox">
        <div class="orderBoxTitle">
          <div style="display:flex;align-items:center">
            <DatePicker
              :clearable="false"
              type="date"
              :placeholder="$t('public.start_date')"
              style="width:109px;"
              :options="options1"
              v-model="startDate"
              @on-change="changeStart"
              @on-open-change="startCheck"
            ></DatePicker>
            <span style="font-size:14px;width:8px;margin:0 8px;">~</span>
            <DatePicker
              :clearable="false"
              type="date"
              :placeholder="$t('public.end_date')"
              style="width:109px"
              :options="options2"
              v-model="endDate"
              @on-change="changeEnd"
              @on-open-change="endCheck"
            ></DatePicker>
          </div>
          <div>
            <RadioGroup v-model="selectDay" type="button" style="margin-right: 8px;">
              <Radio :label="'All'">{{ $t('asset.order.All')}}</Radio>
              <Radio :label="'30'">{{ $t('asset.order.30_Days')}}</Radio>
            </RadioGroup>
            <RadioGroup
              @on-change="changeTradeType"
              v-model="getUserOrderListParams.tradeType"
              type="button"
              style="margin-right: 8px;"
            >
              <Radio :label="0">{{ $t('asset.order.All')}}</Radio>
              <Radio :label="1">{{ $t('asset.order.Auction')}}</Radio>
              <Radio :label="2">{{ $t('asset.order.Trading')}}</Radio>
            </RadioGroup>
            <RadioGroup
              @on-change="tradeMethodChange"
              v-model="getUserOrderListParams.tradeMethod"
              type="button"
              style="margin-right: 8px;"
            >
              <Radio :label="0">{{ $t('asset.order.All')}}</Radio>
              <!--                :disabled="getUserOrderListParams.tradeType === 1"-->
              <Radio
                :label="1"
              >{{ $t('asset.order.Buy')}}</Radio>
<!--              :disabled="getUserOrderListParams.tradeType === 1"-->
              <Radio
                :label="2"
              >{{ $t('asset.order.Sell')}}</Radio>
            </RadioGroup>
            <RadioGroup
              @on-change="statusChange"
              v-model="getUserOrderListParams.status"
              type="button"
            >
<!--              :disabled="getUserOrderListParams.tradeType === 2"-->
              <Radio
                :label="1"
              >{{ $t('asset.order.Excuted')}}</Radio>
<!--              :disabled="getUserOrderListParams.tradeType === 2"-->
              <Radio
                :label="2"
              >{{ $t('asset.order.Open')}}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div class="bTHead">
          <div class="btC1">{{ $t('asset.order.Time')}}</div>
          <div class="btC1">{{ $t('asset.order.CopyrightOrTrading')}}</div>
          <div class="btC3">{{ $t('asset.order.Type')}}</div>
          <div class="btC1">{{ $t('asset.order.Qty')}}</div>
          <div class="btC2">
            <div>{{ $t('asset.order.Price')}}</div>
          </div>
          <div class="btC2">{{ $t('asset.order.Amount')}}</div>
          <div class="btC2">
            <div>{{ $t('asset.order.Fees')}}</div>
          </div>
          <div class="btC2">
            <div>{{ $t('asset.order.Settlement')}}</div>
          </div>
          <div class="btC2">
            <div>{{ $t('asset.order.Status')}}</div>
          </div>
        </div>
        <div class="bTBody">
          <div v-if="data.length!=0">
            <div class="row" v-for="(item, index) in data" :key="index">
              <div class="btC1" style="font-size: 12px;">
                <span>{{ fromTimestampToString(item.time) }}</span>
              </div>
              <div class="btC1">{{ item.copyright }}</div>
              <div
                class="btC3"
              >{{ item.type == 'Auction' ? $t('asset.order.Auction') : $t('asset.order.Trading') }}</div>
              <div class="btC1">{{ item.qty }}</div>
<!--              之前前端计算精度了-->
<!--              <div class="btC2">-->
<!--                <div>{{ Number(item.price).toFixed(coinList[item.quote].showPrecision)}} {{ item.quote }}</div>-->
<!--                <div class="priceB">={{ (item.price * rate[item.quote]).toFixed(2) }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--              <div class="btC2">-->
<!--                <div>{{ Number(item.amount).toFixed(coinList[item.quote].showPrecision) }} {{ item.quote }}</div>-->
<!--                <div class="priceB">={{ (item.price * rate[item.quote]).toFixed(2) }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--              <div class="btC2">-->
<!--                <div>-->
<!--                  {{ Number(item.fees).toFixed(coinList[item.quote].showPrecision) }}-->
<!--                  <span-->
<!--                    v-if="item.side==='BUY'"-->
<!--                  >{{ item.base }}</span>-->
<!--                  <span v-if="item.side!=='BUY'">{{ item.quote }}</span>-->
<!--                </div>-->
<!--                <div class="priceB">={{ (item.fees * rate[item.quote]).toFixed(2) }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--              <div class="btC2">-->
<!--                <div>{{ Number(item.settlement).toFixed(coinList[item.quote].showPrecision) }} {{ item.quote }}</div>-->
<!--                <div-->
<!--                  class="priceB"-->
<!--                >={{ (item.settlement * rate[item.quote]).toFixed(2) }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--直接取后端返回的结果，前端不用计算精度-->
              <div class="btC2">
                <div>{{ (item.price)}} {{ item.quote }}</div>
                <div class="priceB">={{ (item.price * rate[item.quote]) }} {{rateLogo}}</div>
              </div>
              <div class="btC2">
                <div>{{ (item.amount) }} {{ item.quote }}</div>
                <div class="priceB">={{ (item.price * rate[item.quote]) }} {{rateLogo}}</div>
              </div>
              <div class="btC2">
                <div>
                  {{ (item.fees) }}
                  <span
                    v-if="item.side==='BUY'"
                  >{{ item.base }}</span>
                  <span v-if="item.side!=='BUY'">{{ item.quote }}</span>
                </div>
                <div class="priceB">={{ (item.fees * rate[item.quote]) }} {{rateLogo}}</div>
              </div>
              <div class="btC2">
                <div>{{ (item.settlement) }} {{ item.quote }}</div>
                <div
                  class="priceB"
                >={{ (item.settlement * rate[item.quote]) }} {{rateLogo}}</div>
              </div>
              <div class="btC2" v-if="item.type=='Auction'">
                <div v-if="item.type=== 'Auction'">
                  {{ item.status === 1 ? $t('auctionDetail.Won') :
                  item.status === 2 ? $t('auctionDetail.Partially') :
                  item.status === 3 ? $t('auctionDetail.Wait_list') : '' }}
                </div>
              </div>
              <div class="btC2" v-if="item.type=='Trading'">
                <div v-if="item.type !== 'Auction'">
                  {{ item.status === 0 ? $t('init') :
                  item.status === 1 ? $t('new') :
                  item.status === 2 ? $t('filled') :
                  item.status === 3 ? $t('part_filled') :
                  item.status === 4 ? $t('canceled') :
                  item.status === 5 ? $t('pending_cancel') :
                  item.status === 6 ? $t('expired') : '' }}
                </div>
              </div>
              <div
                class="nodata"
                style="margin-top: 12px;padding-bottom: 12px;"
                v-if="data.length === 0"
              >
                <img src="../../../assets/noData2.png" alt />
                <p>{{$t('NoData')}}</p>
              </div>
            </div>
          </div>
          <div v-if="data.length!=0" class="page">
            <span>
              <Page
                :current="getUserOrderListParams.page"
                @on-change="pageChange"
                :total="total"
                :page-size="10"
                size="small"
              />
            </span>
          </div>
          <div
            class="nodata"
            style="margin-top: 32px;padding-bottom: 32px;"
            v-if="data.length === 0"
          >
            <img src="../../../assets/noData2.png" alt />
            <p>{{$t('NoData')}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fromTimestampToString } from "../../../tool";

export default {
  name: "order",
  data() {
    return {
      total: 0,
      data: [],
      tradeMethodDis: true,
      t: [new Date(new Date().valueOf() - 2592000000), new Date()],
      startDate: "",
      endDate: "",
      options1: {
        disabledDate(date) {
          return date && 0;
        }
      },
      options2: {
        disabledDate(date) {
          return date && 0;
        }
      },
      selectDay: "30",
      getUserOrderListParams: {
        page: 1,
        pageSize: 10,
        endTime: 0,
        startTime: 0,
        status: 1, // 订单状态 1-正在进行 2-已完成
        tradeMethod: 0, // 交易方式 0-全部 1-买 2-卖
        tradeType: 0, // 交易类型 0-全部 1-拍卖 2-交易
        // publicRate: JSON.parse(sessionStorage.getItem("public_info_v4")).market
        //   .rate,
        lang: window.newVue.$lang.toString().replace(/-/g, "_"),
        buy_unit: "AP"
      },
      publicRate: JSON.parse(sessionStorage.getItem("public_info_v4")).market
        .rate,
      lang: window.newVue.$lang.toString().replace(/-/g, "_"),
      buy_unit: "AP",
      coinList: JSON.parse(sessionStorage.getItem("public_info_v4")).market
        .coinList,
      showData: false
    };
  },
  computed: {
    rate() {
      const self = this;
      let a = "";
      try {
        a = this.publicRate[self.lang];
      } catch (e) {
        a = 1;
      }
      console.log(a);
      return a;
    },
    rateLogo() {
      if (window.newVue.$lang === "zh-CN") {
        return "CNY";
      } else if (window.newVue.$lang === "ko-KR") {
        return "KRW";
      } else {
        return "USD";
      }
    }
  },
  watch: {
    $lang() {
      this.lang = window.newVue.$lang.toString().replace(/-/g, "_");
    },
    selectDay(newV) {
      if (newV === "All") {
        this.t = null;
      } else {
        if (this.t[1] === "") {
          this.t = [new Date(new Date().valueOf() - 2592000000), new Date()];
        } else {
          const t1 = this.t[1].valueOf();
          this.t = [];
          this.t.push(new Date(t1 - 2592000000));
          this.t.push(new Date(t1));
        }
      }
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    }
  },
  mounted() {
    this.rate = this.publicRate[this.lang];
    this.getUserOrderList();
    // console.log(this.coinList)
  },
  methods: {
    fromTimestampToString(e) {
      return fromTimestampToString(e);
    },
    changeTradeType(e) {
      if (e === 1) {
        this.getUserOrderListParams.tradeMethod = 0;
      }
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    },
    pageChange(e) {
      this.getUserOrderListParams.page = e;
      this.getUserOrderList(e);
    },
    changeStart(start) {
      console.log(start)
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    },
    changeEnd(end) {
      console.log(end);
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    },
    tradeMethodChange() {
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    },
    statusChange() {
      this.getUserOrderListParams.page = 1
      this.getUserOrderList();
    },
    startCheck() {
      let self = this;
      if (!this.endDate) {
        this.options1 = {};
      } else {
        this.options1 = {
          disabledDate(date) {
            return date && date.valueOf() > self.endDate.valueOf();
          }
        };
      }
    },
    endCheck() {
      let self = this;
      if (!this.startDate) {
        this.options2 = {};
      } else {
        this.options2 = {
          disabledDate(date) {
            return date && date.valueOf() < self.startDate.valueOf();
          }
        };
      }
    },
    // 获取订单列表
    getUserOrderList(page) {
      console.log(page);
      if (page) {
        this.getUserOrderListParams.page = page;
      } else {
        this.getUserOrderListParams.page = 1;
      }
      if (this.startDate) {
        this.getUserOrderListParams.startTime = this.startDate.valueOf();
      } else {
        delete this.getUserOrderListParams.startTime;
      }
      if (this.endDate) {
        this.getUserOrderListParams.endTime = this.endDate.valueOf();
      } else {
        delete this.getUserOrderListParams.endTime;
      }
      let form = new FormData();
      console.log(this.getUserOrderListParams);
      for (let i in this.getUserOrderListParams) {
        form.append(i, this.getUserOrderListParams[i]);
      }
      // if (this.getUserOrderListParams.tradeType === 2) {
      //   form.delete("status");
      // }
      this.showData = false;
      this.$post("/api/copyrightAuctionOrder/getUserOrderList", form).then(
        res => {
          this.data = res.data.content;
          this.total = res.data.totalElements;
          for (let i in this.data) {
            // console.log(this.data[i].quote)
            this.data[i].quote = this.data[i].quote.toUpperCase();
          }
          this.showData = true;
        }
      );
    }
  }
};
</script>

<style>
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
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
}
.ivu-page-item-active a, .ivu-page-item-active:hover a{
  color: #565abf;
}
/* /deep/ .ivu-table-tip{
  display: none;
} */
#order .ivu-icon-ios-calendar-outline:before {
  content: "";
}
#order .ivu-input-with-suffix {
  padding: 0;
  padding-left: 8px;
  font-size: 14px;
  color: #32325d;
}
#order .ivu-input-suffix {
  left: auto !important;
  right: 0 !important;
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: cover;
  width: 10px;
  height: 13px;
  transition: none;
  margin: 7px 8px 0 0;
}
#order .ivu-input {
  height: 28px;
}

#order .priceB {
  height: 16px;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: right;
  color: #bdc6d4;
}

#order .page {
  margin-top: 16px;
  margin-bottom: 32px;
  text-align: center;
}

#order .bTBody .row {
  padding: 0 16px;
  width: 1216px;
  height: 64px;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 0 #f7f9fc;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}

#order .bTBody .nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#order .bTBody .nodata img {
  width: 50px;
  height: 50px;
}

#order .bTBody .nodata p {
  margin:0;
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

#order .btC1 {
  width: 10%;
}

#order .btC2 {
  width: 10%;
  text-align: right;
}

#order .btC3 {
  width: 5%;
  text-align: left;
}

#order .bTHead {
  width: 100%;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.4px;
  color: #32325d;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  height: 40px;
  background-color: #f7f9fc;
}

#order .orderBoxTitle {
  padding: 10px 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 49px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}

#order .orderBox {
  width: 1216px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

#order .ivu-tabs-nav .ivu-tabs-tab-active {
  color: #565abf;
  font-size: 16px;
  font-weight: 500;
}

#order .ivu-tabs-nav .ivu-tabs-tab {
  color: #bdc6d4;
  font-size: 16px;
  font-weight: 500;
}
</style>
