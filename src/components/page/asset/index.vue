<template>
  <div class="assetIndex">
    <div style="width: 1216px;margin: 0 auto">
      <div id="assetIndexBox1">
        <div class="left">
          <div class="leftContent">
            <!--            用户总资产-->
            <div
              class="toptitle"
              style="width: 100%;text-align: center"
            >{{ $t('asset.index.Total_Balance') }}
            </div>
            <div v-if="showTotalBalance" class="title" style="text-align: center;">
              <span>
                <div class="title1" style="position: relative;">
                  {{ toThousands(Number(totalBalance).toFixed(coinList[totalBalanceSymbol].showPrecision)) }} {{ totalBalanceSymbol }}
                  <div class="title2" style="position: absolute;right: -40px;top:0;"></div>
                </div>
              </span>
              <div class="title4">
                {{ '=' + toThousands(totalBalance * showRate) }}
                <span>{{ $lang === 'zh-CN' ? 'CNY' : $lang === 'ko-KR' ? 'KRW' : 'USD' }}</span>
              </div>
            </div>
            <!--            用户资产-->
            <div class="table">
              <div class="head">
                <div class="head1">{{ $t('asset.index.Asset') }}</div>
                <div class="head2">{{ $t('asset.index.Balence') }}</div>
                <div class="head2">{{ $t('asset.index.Available') }}</div>
                <div class="head3">{{ $t('asset.index.Operate') }}</div>
              </div>
              <div class="test-1" style="font-size: 16px;height: 375px;overflow-y: scroll;" v-if="showPersonAsset">
                <div
                  style="display: flex;justify-content: space-between;align-items: center;"
                  v-for="(item, index) in userAsset"
                  :key="index"
                  class="contentAsset"
                >
                  <div class="head1" :title="item.symbol">{{ item.symbol }}</div>
                  <div
                    class="head2"
                    style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                    :title="item.showTotal"
                  >{{ item.showTotal }}
                  </div>
                  <div
                    class="head2"
                    style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                    :title="item.showBalance"
                  >{{ item.showBalance }}
                  </div>
                  <div class="head3">
                    <span
                      v-if="item.depositOpen"
                      @click="toDeposit(item)"
                    >{{ $t('asset.index.Deposit') }}</span>
                    <div v-if="item.depositOpen && item.withdrawOpen"
                         style="display: inline-block;width: 1px;height: 8px;background-color: #e6ebf1;margin-right: 8px;margin-left: 8px;"></div>
                    <span
                      v-if="item.withdrawOpen"
                      @click="toWithdrawal(item)"
                    >{{ $t('asset.index.Withdrawal') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="picBox">
          <!--          盈利图-->
          <div id="mask1" style="height: 262px;"></div>
<!--          <div id="mask1" style="height: 262px;padding: 39px 30px 0 30px;"></div>-->
          <!--          盈利-->
          <div
            v-if="showUserRevenue"
            style="margin:0 16px;width: 560px;"
          >
            <div class="picB" style="width: 560px">
              <div class="title">{{ $t('asset.index.Trading_Profits') }}</div>
              <div class="contentAsset" style="margin-top: 16px;margin-bottom: 8px;">
                <div class="content1">{{ $t('asset.index.Total_purchased') }}</div>
                <div
                  class="content1"
                  style="text-align: right"
                >{{ (userRevenue.totalPurchased).toFixed(showPrecision) }} AP
                </div>
                <div
                  class="content2"
                >={{ (rate * userRevenue.totalPurchased).toFixed(2) }} {{rateLogo}}
                </div>
              </div>
              <div class="contentAsset" style="margin-bottom: 8px;">
                <div class="content1">{{ $t('asset.index.Gain_Loss') }}</div>
                <div class="content1" style="text-align: right">{{(userRevenue.gainAndLoss).toFixed(showPrecision)}}
                  AP
                </div>
                <div class="content2">={{ (rate * userRevenue.gainAndLoss).toFixed(2) }} {{rateLogo}}</div>
              </div>
              <div style="margin-bottom: 8px;" class="contentAsset">
                <div class="content1">{{ $t('asset.index.Profit_rate') }}</div>
                <div class="content1" style="text-align: right">{{(userRevenue.profitRate).toFixed(showPrecision)}} AP
                </div>
                <div class="content2">={{(rate * userRevenue.profitRate).toFixed(2)}} {{rateLogo}}</div>
              </div>
              <div style="margin-bottom: 8px;" class="contentAsset">
                <div class="content1">{{ $t('asset.index.Last_month_royalties') }}</div>
                <div
                  class="content1"
                  style="text-align: right"
                >{{ (userRevenue.lastMonthRoyaltyRevenue).toFixed(showPrecision) }} AP
                </div>
                <div
                  class="content2"
                >={{ (userRevenue.lastMonthRoyaltyRevenue * rate).toFixed(2) }} {{rateLogo}}
                </div>
              </div>
              <div class="contentAsset">
                <div class="content1">{{ $t('asset.index.Last_6_month_royalties') }}</div>
                <div
                  class="content1"
                  style="text-align: right"
                >{{ (userRevenue.lastSixMonthsRoyalties).toFixed(showPrecision) }} AP
                </div>
                <div
                  class="content2"
                >={{ (userRevenue.lastSixMonthsRoyalties * rate).toFixed(2) }} {{ rateLogo }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="assetIndexBox2">
        <div class="assets-tab">
          <div class="tab-box">
            <span
              class="pointer"
              :class="tabsName==0?'sel-span':''"
              @click="tabsChange(0)"
            >{{$t('asset.index.Auction')}}</span>
            <span
              class="pointer"
              :class="tabsName==1?'sel-span':''"
              @click="tabsChange(1)"
            >{{$t('asset.index.Trading')}}</span>
          </div>
          <div class="search">
            <Input
              style="height: 28px;"
              @on-enter="search"
              v-model="keywords"
              prefix="ios-search"
              :placeholder="$t('Tranding.Search')"
            />
          </div>
        </div>
        <!--        下方用户所持的拍卖、交易-->
        <div class="asets-table" v-if="tabsName===0">
          <div class="bTHead">
            <div class="btC1">{{ $t('img') }}</div>
            <div class="btC1">{{ $t('asset.index.Copyright') }}</div>
            <div class="btC2">{{ $t('asset.index.Qty') }}</div>
            <!-- <div class="btC2">
                <div>{{ $t('asset.index.Average') }}</div>
                <div>{{ $t('asset.index.buying_price') }}</div>
            </div>-->
            <div class="btC2">
              <div>{{ $t('asset.index.Revenue') }}</div>
              <div>{{ $t('asset.index.last_month') }}</div>
            </div>
            <div class="btC2">
              <div>{{ $t('asset.index.Monthly') }}</div>
              <div>{{ $t('asset.index.average_profit') }}</div>
            </div>
            <div class="btC2">
              <div>{{ $t('asset.index.Monthly_average') }}</div>
              <div>{{ $t('asset.index.profit_rate') }}</div>
            </div>
            <div class="btC2"></div>
          </div>
          <!--          钱包-拍卖，根据public_info返回的精度显示数据-->
<!--          <div class="bTBody">-->
<!--            <div class="row" v-for="(item, index) in myCopyright1" :key="index">-->
<!--              <div class="btC1" style="height: 48px;">-->
<!--                <img style="width:48px;" :src="item.image" alt/>-->
<!--              </div>-->
<!--              <div class="btC1">{{ item.copyright }}</div>-->
<!--              <div class="btC2">{{ item.Qty }}</div>-->
<!--              <div class="btC2">-->
<!--                <div>{{ (item.revenueLastMonth).toFixed(showPrecision) }} AP</div>-->
<!--                <div class="priceB">={{ item.revenueLastMonth * rate }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--              <div class="btC2">-->
<!--                <div>{{ (item.monthlyAverageProfit).toFixed(showPrecision) }} AP</div>-->
<!--                <div class="priceB">={{ item.monthlyAverageProfit * rate }} {{rateLogo}}</div>-->
<!--              </div>-->
<!--              <div class="btC2" :class="item.monthlyAverageProfitRate > 0 ? 'rate' : 'rate2'">-->
<!--                {{-->
<!--                item.monthlyAverageProfitRate}}%-->
<!--              </div>-->
<!--              <div class="btC2">-->
<!--                <Button @click="more(item)" class="more"><span class="Text">{{ $t('asset.order.More') }}</span></Button>-->
<!--              </div>-->
<!--            </div>-->
<!--          </div>-->
<!--          钱包-拍卖，数据直接拿接口-->
          <div class="bTBody">
            <div class="row" v-for="(item, index) in myCopyright1" :key="index">
              <div class="btC1" style="height: 48px;">
                <img style="width:48px;" :src="item.image" alt/>
              </div>
              <div class="btC1">{{ item.copyright }}</div>
              <div class="btC2">{{ item.Qty }}</div>
              <div class="btC2">
                <div>{{ item.revenueLastMonth }} AP</div>
                <div class="priceB">={{ item.revenueLastMonth * rate }} {{rateLogo}}</div>
              </div>
              <div class="btC2">
                <div>{{ item.monthlyAverageProfit }} AP</div>
                <div class="priceB">={{ item.monthlyAverageProfit * rate }} {{rateLogo}}</div>
              </div>
              <div class="btC2" :class="item.monthlyAverageProfitRate > 0 ? 'rate' : 'rate2'">
                {{
                item.monthlyAverageProfitRate}}%
              </div>
              <div class="btC2">
                <Button @click="more(item)" class="more"><span class="Text">{{ $t('asset.order.More') }}</span></Button>
              </div>
            </div>
          </div>
          <div
            class="row"
            v-if="myCopyright1.length === 0"
            style="text-align: center;margin: 12px 0;"
          >
            <img style="width:49px;" src="../../../assets/noData2.png" alt/>
            <div
              style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;"
            >{{ $t('NoData')}}
            </div>
          </div>
        </div>
        <div class="page" v-if="tabsName===0">
            <span>
              <Page :current="showMyCopyrightParams1.page" @on-change="pageChange1" :total="total1" :page-size="5" size="small"/>
            </span>
        </div>
        <div class="asets-table" v-if="tabsName===1">
          <div class="bTHead">
            <div class="btC1">{{ $t('img') }}</div>
            <div class="btC1">{{ $t('asset.index.Copyright') }}</div>
            <div class="btC2">{{ $t('asset.index.Qty') }}</div>
            <div class="btC2">
              <div>{{ $t('asset.index.Average') }}</div>
              <div>{{ $t('asset.index.buying_price') }}</div>
            </div>
            <!--              <div class="btC2">{{ $t('asset.index.Buy_price') }}</div>-->
            <div class="btC2">
              <div>{{ $t('asset.index.Current') }}</div>
              <div>{{ $t('asset.index.Value') }}(KRW)</div>
            </div>
            <div class="btC2">
              <div>{{ $t('asset.index.Profit') }} &</div>
              <div>{{ $t('asset.index.Loss') }}(KRW)</div>
            </div>
            <div class="btC2">
              <div>{{ $t('asset.index.Return') }}(%)</div>
            </div>
            <div class="btC2"></div>
          </div>
          <div class="bTBody">
            <div class="row" v-for="(item, index) in myCopyright2" :key="index">
              <div class="btC1" style="height: 48px;">
                <img style="width:48px;" :src="item.image" alt/>
              </div>
              <div class="btC1">{{ item.copyright }}</div>
              <div class="btC2">{{ item.Qty }}</div>
              <div class="btC2">
                <div>{{ item.averageBuyingPrice }} AP</div>
                <div class="priceB">={{ item.averageBuyingPrice * rate }} {{rateLogo}}</div>
              </div>
              <!--                <div class="btC2">-->
              <!--                  <div>{{ item.buyPrice }} AP</div>-->
              <!--                  <div class="priceB">={{ item.buyPrice * rate }} KRW</div>-->
              <!--                </div>-->
              <div class="btC2">
                <div>{{item.currentValue }} AP</div>
                <div class="priceB">={{ item.currentValue * rate }} {{rateLogo}}</div>
              </div>
              <div class="btC2">
                <div>{{ item.profitAndLoss }} AP</div>
                <div class="priceB">={{ item.profitAndLoss * rate }} {{rateLogo}}</div>
              </div>
              <div class="btC2" :class="item.return > 0 ? 'rate' : 'rate2'">{{ item.return }}%</div>
              <div class="btC2">
                <Button
                  v-if="item.isOpen==1"
                  @click="toShortCut(item)"
                  class="more"
                >{{ $t('asset.index.ShortCut')}}
                </Button>
              </div>
            </div>
          </div>
          <div
            class="row"
            v-if="myCopyright2.length === 0"
            style="text-align: center;margin: 12px 0;"
          >
            <img style="width:49px;" src="../../../assets/noData2.png" alt/>
            <div
              style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;"
            >{{ $t('NoData')}}
            </div>
          </div>
        </div>
        <div class="page" v-if="tabsName===1">
            <span>
              <Page :current="showMyCopyrightParams2.page" @on-change="pageChange2" :total="total2" :page-size="5" size="small"/>
            </span>
        </div>
      </div>
    </div>
    <SuccessModal :show="show.success" :text="show.successText"></SuccessModal>
    <FailedModal :show="show.failed" :text="show.failedText"></FailedModal>
  </div>
</template>
<script>
  import {toThousands} from "../../../tool";
  import SuccessModal from "../../modal/SuccessModal";
  import FailedModal from "../../modal/FailedModal";
  import {createChart} from 'lightweight-charts';

  export default {
    name: "asset",
    components: {FailedModal, SuccessModal},
    data() {
      return {
        showTotalBalance: false,
        chart: null,
        areaSeries: null,
        keywords: "",
        total1: 0,
        total2: 0,
        userRevenue: {
          lastMonthRoyaltyRevenue: 0,
          lastSixMonthsRoyalties: 0,
          totalPurchased: 0
        },
        myCopyright1: [],
        myCopyright2: [],
        showMyCopyrightParams1: {
          page: 1,
          pageSize: 5,
          type: 1
        },
        showMyCopyrightParams2: {
          page: 1,
          pageSize: 5,
          type: 2
        },
        show: {
          failed: false,
          failedText: "",
          success: false,
          successText: ""
        },
        coinSymbolExchangeParams: {
          formAmount: 0, // 转出金额
          formSymbol: "", // 转出货币代号，KRW，AP，USDT
          // symbolExchangeOrder: '',
          toAmount: 0, // 转入金额
          toSymbol: "", // 转入货币代号，KRW，AP，USDT
          toUid: JSON.parse(localStorage.getItem("userInfo")).id // 转入账号id
        },
        totalBalance: 0,
        totalBalanceSymbol: "",
        totalAvailable: 0,
        userAsset: [],
        KRWTOTAL: 0,
        KRW: 0,
        tabsName: 0,
        coinRate: 1,
        comparison2: JSON.parse(sessionStorage.getItem("comparisonData")),
        coinList: JSON.parse(sessionStorage.getItem("public_info_v4")).market.coinList,
        publicRate: JSON.parse(sessionStorage.getItem("public_info_v4")).market
          .rate,
        lang: window.newVue.$lang.toString().replace(/-/g, "_"),
        buy_unit: "AP",
        showPrecision: JSON.parse(sessionStorage.getItem("public_info_v4")).market
          .coinList["AP"].showPrecision,
        showPersonAsset: false,
        showUserRevenue: false
      };
    },
    mounted() {
      this.showMyCopyright1();
      this.showMyCopyright2();
      this.getUserAp();
      this.$store.commit("changeNavIndex", 3);
      this.getUserRevenue();
      this.accountBalance(); // 查询用户资产, 链上的，仅用总资产
      this.chainPublic();
      this.getUserAsset(); // 义斌的获取个人资产
    },
    watch: {
      $lang(n) {
        this.lang = window.newVue.$lang.toString().replace(/-/g, "_");
        this.chart.applyOptions({
          localization: {
            locale: n
          }
        });
      }
    },
    computed: {
      showRate() {
        const self = this;
        if (self.totalBalanceSymbol !== "") {
          let a = this.$lang.replace(/-/g, "_");
          return this.coinRate[a][self.totalBalanceSymbol];
        } else {
          return 1;
        }
      },
      rate() {
        const self = this;
        let a = "";
        try {
          a = this.publicRate[self.lang][self.buy_unit];
        } catch (e) {
          a = 1;
        }
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
      },
      ap() {
        return this.$store.state.ap;
      },
      lockAp() {
        return this.$store.state.lockAp;
      }
    },
    methods: {
      // webapi公共接口，用于获取汇率
      chainPublic() {
        this.$post(window.selfConfig.chainUrl + "/common/public_info_v4").then(
          res => {
            this.coinRate = res.data.market.rate;
          }
        );
      },
      // 查询用户资产, 义斌之前的接口
      getUserAsset() {
        this.showPersonAsset = false
        this.$post("/api/account/getUserAsset").then(res => {
          console.log(res);
          this.userAsset = res.data;
          for (let i in this.userAsset) {
            // 可能会有拿不到精度的情况
            if (this.coinList[this.userAsset[i].symbol] === undefined) {
              this.coinList[this.userAsset[i].symbol] = {showPrecision: 2}
            }
            if (this.coinList[this.userAsset[i].symbol].showPrecision >= 100) {
              this.coinList[this.userAsset[i].symbol].showPrecision = 2
            }
            // 根据显示精度计算
            if (isNaN(Number(this.userAsset[i].available + this.userAsset[i].lockAP).toFixed(this.coinList[this.userAsset[i].symbol].showPrecision))) {
              this.userAsset[i].showTotal = toThousands(Number(this.userAsset[i].available + this.userAsset[i].lockAP))
            } else {
              this.userAsset[i].showTotal = toThousands(Number(this.userAsset[i].available + this.userAsset[i].lockAP).toFixed(this.coinList[this.userAsset[i].symbol].showPrecision))
            }
            if (isNaN(Number(this.userAsset[i].available).toFixed(this.coinList[this.userAsset[i].symbol].showPrecision))) {
              this.userAsset[i].showBalance = toThousands(Number(this.userAsset[i].available))
            } else {
              this.userAsset[i].showBalance = toThousands(Number(this.userAsset[i].available).toFixed(this.coinList[this.userAsset[i].symbol].showPrecision))
            }
          }
          this.showPersonAsset = true
        });
      },
      // 获取用户所有资产
      accountBalance() {
        this.$post(
          window.selfConfig.chainUrl + "/finance/v4/account_balance",
          {}
        ).then(res => {
          this.totalBalance = res.data.totalBalance;
          this.totalBalanceSymbol = res.data.totalBalanceSymbol;
          this.showTotalBalance = true
        });
      },
      // more是跳拍卖页的
      more(item) {
        let form = new FormData();
        form.append("code", item.copyrightCode);
        this.$post("/api/copyrightAuction/getLatestAuctionId", form).then(res => {
          console.log(res.data);
          sessionStorage.setItem("item", JSON.stringify(res.data));
          if (res.data.type === 1) {
            this.$router.push({
              name: "auctiondetail",
              query: {id: res.data.id}
            });
          } else {
            this.$router.push({
              name: "auctiondetail2",
              query: {id: res.data.id}
            });
          }
        });
        // this.$router.push('/auction')
      },
      toShortCut(value) {
        this.$router.push({
          name: "trading",
          query: {symbol: value.symbol, zone: 3}
        });
      },
      toThousands(d) {
        return toThousands(d);
      },
      pageChange1(e) {
        this.showMyCopyrightParams1.page = e;
        this.showMyCopyright1();
      },
      pageChange2(e) {
        this.showMyCopyrightParams2.page = e;
        this.showMyCopyright2();
      },
      // 查询用户收益
      getUserRevenue() {
        this.showUserRevenue = false
        this.$post("/api/account/getUserRevenue").then(res => {
          if (res.code !== 10001) {
            this.userRevenue = res.data;
            this.$chart.line4("mask1", this.userRevenue.chart);
            // this.initLightChart() // 先不用lightChart
            this.showUserRevenue = true
          }
        });
      },
      initLightChart() {
        const self = this
        this.chart = createChart(document.getElementById('mask1'), {
          width: 530,
          height: 207,
          priceScale: {
            scaleMargins: {
              top: 0.2,
              bottom: 0.2,
            },
            borderVisible: false,
          },
          timeScale: {
            borderVisible: false,
          },
          layout: {
            backgroundColor: '#ffffff',
            textColor: '#333',
          },
          grid: {
            horzLines: {
              color: '#eee',
            },
            vertLines: {
              color: '#ffffff',
            },
          },
        });
        this.chart.applyOptions({
          localization: {
            locale: self.$lang
          }
        })
        this.areaSeries = this.chart.addAreaSeries({
          topColor: 'rgba(255, 82, 82, 0.56)',
          bottomColor: 'rgba(255, 82, 82, 0.04)',
          lineColor: 'rgba(255, 82, 82, 1)',
          lineWidth: 2,
        });
        this.areaSeries.applyOptions({
          priceLineVisible: false,
        });
        let x = new Date()
        let data = []
        for (let i in this.userRevenue.chart) {
          let a = new Date(x - (6 - i) * 2592000000)
          let b = a.getFullYear()
          let c = a.getMonth() + 1
          let d = a.getDay() + 1
          let tmp = {
            time: b + '-' + c + '-' + d,
            value: this.userRevenue.chart[i]
          }
          // console.log(tmp.time)
          data.push(tmp)
        }
        this.areaSeries.setData(data);
      },
      // 下方切换tabs
      tabsChange(n) {
        console.log(n);
        this.keywords = "";
        this.tabsName = n;
        if (this.tabsName === 0) {
          this.showMyCopyright1();
        } else if (this.tabsName === 1) {
          this.showMyCopyright2();
        }
      },
      // 下方搜索框回车
      search() {
        if (this.tabsName === 0) {
          this.showMyCopyright1();
        } else if (this.tabsName === 1) {
          this.showMyCopyright2();
        }
      },
      // 展示我的版权
      showMyCopyright1() {
        let form = new FormData();
        for (let i in this.showMyCopyrightParams1) {
          form.append(i, this.showMyCopyrightParams1[i]);
        }
        form.append("keywords", this.keywords);
        this.$post("/api/copyright/showMyCopyright", form).then(res => {
          if (res.data != null) {
            this.myCopyright1 = res.data.content;
            this.total1 = res.data.totalElements;
          } else {
            this.myCopyright1 = [];
            this.total1 = 0;
          }
        });
      },
      showMyCopyright2() {
        let form = new FormData();
        for (let i in this.showMyCopyrightParams2) {
          form.append(i, this.showMyCopyrightParams2[i]);
        }
        form.append("keywords", this.keywords);
        this.$post("/api/copyright/showMyCopyright", form).then(res => {
          if (res.data != null) {
            this.myCopyright2 = res.data.content;
            this.total2 = res.data.totalElements;
          } else {
            this.myCopyright2 = [];
            this.total2 = 0;
          }
        });
      },
      // /account/coinSymbolExchange 用户币种兑换AP
      coinSymbolExchange() {
        this.$post(
          "/api/account/coinSymbolExchange",
          this.coinSymbolExchangeParams
        ).then(res => {
          if (res.code === 0) {
            this.show.success = true;
            this.show.successText = "Switch Success";
            setTimeout(() => {
              this.show.success = false;
            }, 2000);
          } else {
            this.show.failed = true;
            this.show.failedText = "Switch Failed";
            setTimeout(() => {
              this.show.failed = false;
            }, 2000);
          }
        });
      },
      // /account/getUserAp 查询用户AP余额
      getUserAp() {
        this.$post("/api/account/getUserAp").then(res => {
          this.totalBalance = res.data.balance * this.rate;
          this.totalBalance = toThousands(this.totalBalance);
          this.$store.commit("setAp", res.data.availableAP.balance);
          this.$store.commit("setLockAp", res.data.lockAP.balance);
        });
      },
      toDeposit(item) {
        sessionStorage.setItem("depositSymbol", JSON.stringify(item));
        this.$router.push("/asset/deposit");
      },
      toWithdrawal(item) {
        sessionStorage.setItem("depositSymbol", JSON.stringify(item));
        this.$router.push("/asset/withdraw");
      }
    }
  };
</script>

<style>
  #assetIndexBox2 .page{
    text-align: center;
    position: absolute;
    bottom: 16px;
    width: 100%;
  }
  #assetIndexBox2 {
    position: relative;
  }
	.assetIndex .ivu-input-prefix{
		left: 1px !important;
		top: -2px !important;
	}
	.assetIndex .ivu-btn:hover {
		color: #565abf;
	}
.search input{
  width: 100%;
  height: 100%;
  padding-left: 30px;
  border-radius: 4px;
}
  .assetIndex .ivu-page-item-active a {
    font-family: CircularStd;
    color: #565abf !important;
  }
  .assetIndex .ivu-page-item a{
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #32325d;
  }
  .assetIndex .ivu-input-prefix i {
    /* color: #ffe; */
    /* line-height: 28px; */
  }
.ivu-input-prefix i, .ivu-input-suffix i{
  font-size: 17px;
  line-height: 34px;
}
  .assets-tab {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #e6ebf1;
  }

  .tab-box {
    display: flex;
  }

  .tab-box span {
    margin-left: 16px;
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #bdc6d4;
  }

  .tab-box .sel-span {
    color: #565abf;
    border-bottom: 2px solid #565abf;
  }
<<<<<<< HEAD
  @font-face {
    font-family: mFont;
    src: url("../../../assets/font/Main.ttf");
  }
=======

  /*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
>>>>>>> 183a5e5b1592636ce9c4f4ff4308debee16b7829

  .test-1::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    margin-right: -10px;
  }

  .test-1::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
  }

  .test-1::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #f1f1f1;
  }

  .more {
    line-height: 0;
    height: 32px;
    border-radius: 2px;
    border: solid 1px #565abf;
  }
  .more:hover {
    line-height: 0;
    height: 32px;
    border-radius: 2px;
    border: solid 1px #565abf;
  }
  .more .Text {
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #565abf;
  }

  .rate {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #f4496d;
  }

  .rate2 {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #b6ec5b;
  }

  .priceB {
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

  .bTBody .row {
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

  .btC1 {
    width: 10%;
  }

  .btC2 {
    width: 10%;
    text-align: right;
  }

  .bTHead {
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
    width: 100%;
    height: 40px;
    background-color: #f7f9fc;
    box-sizing: border-box;
  }

  .ivu-tabs-bar {
    margin-bottom: 0 !important;
  }

  .search {
    width: 280px;
    z-index: 100;
    margin-right: 16px;
  }

  #assetIndexBox1 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 32px;
  }

  #assetIndexBox2 {
    position: relative;
    width: 1216px;
    height: 456px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .exchange {
    position: absolute;
    top: 70%;
    left: 50%;
    margin-left: -11px;
  }

  .exchange:hover {
    cursor: pointer;
  }

  .assetBottomRight {
    background-color: #565abf;
  }

  .assetBottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 590px;
    height: 56px;
    background-color: #f7f9fc;
    margin: 0 -16px -16px -16px;
    padding: 16px;
  }

  .Text {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
  }

  .assetBottomLeft {
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

  .contentRight {
    height: 20px;
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

  .contentLeft {
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

  .bFContent {
    height: 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
  }

  .bFTitle {
    margin-bottom: 4px;
    width: 216px;
    height: 20px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .bF {
    padding: 16px;
    width: 248px;
    height: 124px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .fT .input {
    margin-bottom: 8px;
    width: 248px;
    background-color: #ffffff;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .fT .fTTitle {
    margin-bottom: 6px;
    width: 248px;
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

  .fT .fTContent {
    width: 248px;
  }

  .fT {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    position: relative;
  }

  .leftContent .table .content {
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 34px;
    letter-spacing: -0.4px;
    color: #32325d;
    width: 590px;
    height: 32px;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
  }

  .leftContent .head1 {
    width: 14%;
    padding-left: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .leftContent .head2 {
    width: 26%;
    text-align: right;
  }

  .leftContent .head3 {
    width: 30%;
    text-align: right;
    padding-right: 16px;
  }

  .head3 span {
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .head3 span:hover {
    cursor: pointer;
    /*line-height: 32px;*/
  }

  .leftContent .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 24px;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .leftContent .table {
    margin: 26px -16px -16px;
    width: 590px;
    height: 24px;
    background-color: #f7f9fc;
  }

  .leftContent .title {
    position: relative;
    margin: 0 auto;
  }

  .leftContent .title1 {
    display: inline-block;
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

  .leftContent .title2 {
    padding-top: 10px;
    display: inline-block;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .toptitle {
    width: 590px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    text-align: center;
    color: #32325d;
  }

  .leftContent .title4 {
    width: 100%;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    text-align: center;
    color: #bdc6d4;
  }

  .leftContent .title3 {
    position: absolute;
    bottom: -22px;
    left: 50%;
    margin-left: -47px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    text-align: center;
    color: #bdc6d4;
  }

  .assetIndex {
    min-width: 1216px;
    padding: 32px 0 160px;
    background-color: #e3e8ee;
  }

  .left {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    width: 592px;
    height: 540px;
  }

  .leftContent {
    padding: 16px;
    width: 592px;
    height: 540px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .contentAsset {
    height: 32px;
    line-height: 32px;
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
  }

  .picB .content2 {
    top: 18px;
    right: 0;
    position: absolute;
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

  .picB .content1 {
    height: 20px;
    width: 50%;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .picB {
    height: 264px;
    padding: 16px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .picB .title {
    width: 216px;
    height: 20px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    line-height: normal;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .picBox {
    width: 592px;
    height: 540px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }
</style>
