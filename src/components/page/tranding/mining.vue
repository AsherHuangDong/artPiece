<template>
  <div style="background-color: #e3e8ee;padding: 32px 0;" id="mining">
    <div class="miningBox1">
      <div class="Trade-mining">{{ $t('mining.Trade_mining')}}</div>
      <div>
        <div class="Mining-output" style="float: left;">{{ $t('mining.Mining_output')}}</div>
        <div class="Mining-output" style="float: right;">{{ $t('mining.Total_amount_mine')}}</div>
        <Progress
          :percent="(tradeMining.miningOutput / tradeMining.totalAmountOfMine) * 100"
          status="success"
          hide-info
        />
        <div
          class="miningPiece"
          style="float:right;text-align: right"
        >{{ tradeMining.totalAmountOfMine }}APC</div>
        <!--        <div :style="{marginLeft: 1216 * 0.45 - 50 + 'px'}" class="miningPiece">195,000 piece</div>-->
        <div class="miningPiece">{{ tradeMining.miningOutput }}APC</div>
        <div class="Trade-mining-Bottom">
          <div
            style="display: flex;align-items: center;justify-content: center;width: 600px;margin: 0 auto;padding-top:16px;"
          >
            <div>
              <div class="Mining-outputs-today">{{ $t('mining.Mining_outputs_today')}}</div>
              <div class="-APC" id="AP">
                {{ tradeMining.miningOutputsToday }}
                <span class="text-style-1">APC</span>
              </div>
            </div>
            <div
              style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
          margin:0 16px;
        "
            ></div>
            <div>
              <div class="Mining-outputs-today">{{ $t('mining.Charge_incurred_today')}}</div>
              <div class="-APC" id="AP">
                {{ tradeMining.chargeIncurredToday}}
                <span class="text-style-1">AP</span>
              </div>
            </div>
            <div
              style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
          margin:0 16px;
        "
            ></div>
            <div>
              <div class="Mining-outputs-today">{{ $t('mining.Mining_outputs_yesterday')}}</div>
              <div class="-APC" id="AP">
                {{ tradeMining.chargeIncurredToday}}
                <span class="text-style-1">APC</span>
              </div>
            </div>
            <div
              style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
          margin:0 16px;
        "
            ></div>
            <div>
              <div class="Mining-outputs-today">{{ $t('mining.Charge_incurred_yestoday')}}</div>
              <div class="-APC" id="AP">
                {{ tradeMining.chargeIncurredYesterday}}
                <span class="text-style-1">AP</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      style="width:1216px;margin: 32px auto;display: flex;justify-content: space-between;align-items: center"
    >
      <div class="miningBox2">
        <div class="miningBox2Title">{{ $t('mining.My_mining_income')}}</div>
        <div style="display: flex;justify-content: flex-start;align-items: center;padding: 16px;">
          <div>
            <div style="margin-right:16px">
              <div
                class="Mining-outputs-today"
                style="color: #bdc6d4;"
              >{{ $t('mining.Cumulative_revenue')}}</div>
              <div class="-APC" style="text-align:start">
                {{ myMiningIncome.cumulativeMiningRevenue }}
                <span class="text-style-1">APC</span>
              </div>
            </div>
          </div>
          <div
            style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
        "
          ></div>
          <div style="margin-left: 16px;">
            <div>
              <div
                class="Mining-outputs-today"
                style="color: #bdc6d4;"
              >{{ $t('mining.My_revenue_today')}}</div>
              <div class="-APC" style="text-align:start">
                {{ myMiningIncome.myRevenueToday }}
                <span class="text-style-1">APC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="miningBox2">
        <div class="miningBox2Title">{{ $t('mining.My_Profits')}}</div>
        <div style="display: flex;justify-content: flex-start;align-items: center;padding: 16px;">
          <div style="margin-right:16px">
            <div>
              <div
                class="Mining-outputs-today"
                style="color: #bdc6d4;"
              >{{ $t('mining.Cumulative_profits')}}</div>
              <div class="-APC" style="text-align:start">
                {{ myProfits.cumulativeProfits }}
                <span class="text-style-1">APC</span>
              </div>
            </div>
          </div>
          <div
            style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
        "
          ></div>
          <div style="margin-left: 16px;">
            <div>
              <div
                class="Mining-outputs-today"
                style="color: #bdc6d4;"
              >{{ $t('mining.My_profits_yesterday')}}</div>
              <div class="-APC" style="text-align:start">
                {{ myProfits.myProfitsYesterday }}
                <span class="text-style-1">APC</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="miningBottom">
      <div class="miningBottomTitle">{{ $t('mining.Bonus_details')}}</div>
      <div>
        <Table :no-data-text="''" :columns="columns1" :data="data1"></Table>
      </div>
      <div v-if="data1.length!=0" style="text-align: center;margin-top:20px;">
        <span>
          <Page :total="total1" size="small" @on-change="pageChange" />
        </span>
      </div>
      <div class="nodata" style="margin-top: 32px;padding-bottom: 32px;" v-if="data1.length === 0">
        <img src="../../../assets/noData2.png" alt />
        <p>{{$t('NoData')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "mining",
  data() {
    return {
      total1: 0,
      data1: [],
      myMiningIncome: "",
      myProfits: "",
      tradeMining: "",
      miningDetailsTodayParams: {
        page: 1,
        pageSize: 10
      },
      depositHistoryParam: {
        page: 1,
        pageSize: 6
      }
    };
  },
  computed: {
    columns1() {
      const self = this;
      return [
        {
          title: self.$t("mining.time"),
          key: "time",
          align: "left"
        },
        {
          title: self.$t("mining.Total_fees"),
          key: "totalFees",
          align: "left"
        },
        {
          title: self.$t("mining.Output"),
          key: "output",
          align: "right"
        },
        {
          title: self.$t("mining.Status"),
          key: "status",
          align: "right",
          render: function(h) {
            return h("span", {}, self.$t("mining.noSend"));
          }
        }
      ];
    }
  },
  mounted() {
    this.miningDetailsToday();
    this.getMiningInfo();
    this.depositHistory();
    this.$store.commit("changeNavIndex", 5);
  },
  methods: {
    pageChange(e) {
      this.depositHistoryParam.page = e;
      this.depositHistory();
    },
    // 下方列表
    depositHistory() {
      let form = new FormData();
      for (let i in this.depositHistoryParam) {
        form.append(i, this.depositHistoryParam[i]);
      }
      this.$post("/api/mining/depositHistory", form).then(res => {
        console.log(res);
        this.data1 = res.data.content;
        this.total = res.data.totalElements;
      });
    },
    getMiningInfo() {
      this.$post("/api/mining/getMiningInfo").then(res => {
        console.log(res);
        this.myMiningIncome = res.data.myMiningIncome;
        this.myProfits = res.data.myProfits;
        this.tradeMining = res.data.tradeMining;
      });
    },
    miningDetailsToday() {
      let form = new FormData();
      for (let i in this.miningDetailsTodayParams) {
        form.append(i, this.miningDetailsTodayParams[i]);
      }
      this.$post("/api/mining/miningDetailsToday", form).then(res => {
        console.log(res);
        this.total = res.data.total;
        this.miningDetailsTodayParams.page = res.data.current;
        // this.data1 = res.data.
      });
    }
  }
};
</script>

<style>
.ivu-progress-success .ivu-progress-bg {
  background-color: #76e5a1;
}
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
#mining .ivu-table {
  color: #32325d;
}
#mining .nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#mining .nodata img {
  width: 50px;
  height: 50px;
}

#mining .nodata p {
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
.miningBottomTitle {
  padding: 8px 16px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #32325d;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}
.miningBottom {
  margin: 16px auto 160px;
  width: 1216px;
  /* height: 288px; */
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  /* border: solid 1px #e6ebf1; */
  background-color: #ffffff;
}
.miningBox2Title {
  padding: 8px 16px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #32325d;
  width: 588px;
  height: 40px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
  background-color: #ffffff;
}
.miningBox2 {
  width: 590px;
  height: 124px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}
.Mining-outputs-today {
  height: 16px;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.4px;
  text-align: center;
  color: #32325d;
}
.-APC {
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
.-APC .text-style-1 {
  font-size: 14px;
  letter-spacing: -0.58px;
}
.Trade-mining-Bottom {
  width: 100%;
  margin: 24px -16px;
  height: 84px;
  border-radius: 4px;
  background-color: #f7f9fc;
}
.miningPiece {
  width: 100px;
  height: 20px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: normal;
  letter-spacing: -0.53px;
  color: #76e5a1;
}
.Mining-output {
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
.Trade-mining {
  height: 48px;
  font-family: CircularStd;
  font-size: 36px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -1px;
  text-align: center;
  color: #32325d;
}
.miningBox1 {
  padding: 44px 16px 0;
  margin: 0 auto;
  width: 1216px;
  height: 261px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}
.ivu-table th {
  background-color: #f7f9fc;
}
.ivu-table td,
.ivu-table th {
  border-bottom: none;
  box-shadow: inset 0 -1px 0 0 #f7f9fc;
}
.ivu-table-wrapper {
  border: none;
}
.ivu-table:before {
  height: 0;
}
#AP {
  color: #565abf;
}
.ivu-table-tip{
  display: none;
}
</style>
