<template>
  <div>
    <div id="tv_chart_container"></div>
    <Header></Header>
    <div id="f2">
      <div class="f2N">
        <artistHeader :bodySelf="this" :selectComparisonValue="selectComparisonValue"
                      :timeType="timeType"></artistHeader>
        <div class="f2N-1">
          <div style="display: flex;flex-direction: column;justify-content: space-between;position: relative;">
            <!--            K线图-->
            <tradingView/>
            <div style="display: flex;justify-content: space-between;align-items: end">
              <!--              order history-->
              <div style="margin-right: 31px;" class="f2N-1D">
                <div class="f2N-1DH">
                  <div @click="order_history(1)" :class="orderHistory === 1 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                    $t("Tranding.Order") }}
                  </div>
                  <div @click="order_history(2)" :class="orderHistory === 2 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                    $t("Tranding.History") }}
                  </div>
                </div>
                <div v-if="orderHistory === 2">
                  <div class="f2N-1DH2">
                    <div class="Sell-amount" style="width: 35%">{{ $t("Tranding.trading_volume") }}</div>
                    <div class="price">{{ $t("Tranding.Price") }}</div>
                    <div class="Buy-amount" style="width: 45%">{{ $t("Tranding.Time") }}</div>
                  </div>
                  <div class="test-1" style="height: 325px;overflow-y: scroll">
                    <div v-for="(item, index) in trade_ticker" :key="index">
                      <div class="data1List" :class="item.side === 'BUY' ? 'green' : 'red'">
                        <div class="Sell-amountD" style="font-size: 12px;width: 35%">{{ item.vol }}</div>
                        <div class="priceD" style="font-size: 12px">{{ item.price }}</div>
                        <div class="Buy-amountD" style="font-size: 12px;width: 45%">{{ item.ds }}</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div v-if="orderHistory === 1">
                  <div class="f2N-1DH2">
                    <div class="Sell-amount">{{ $t("Tranding.Sell_amount") }}</div>
                    <div class="price">{{ $t("Tranding.Price") }}</div>
                    <div class="Buy-amount">{{ $t("Tranding.Buy_amount") }}</div>
                  </div>
                  <div class="test-1" style="height: 160px;overflow-y: scroll">
                    <div class="data1List" v-for="(item, index) in tick.asks" :key="index">
                      <div class="Sell-amountD" style="font-size: 12px;color: green">{{ item[1] }}</div>
                      <div class="priceD" style="font-size: 12px;color: green">{{ item[0] }}</div>
                      <div class="Buy-amountD" style="font-size: 12px;color: green">-</div>
                    </div>
                  </div>
                  <div class="test-1" style="height: 160px;overflow-y: scroll">
                    <div class="data1List" v-for="(item, index) in tick.buys" :key="index">
                      <div class="Sell-amountD" style="font-size: 12px;color: #f4496d">-</div>
                      <div class="priceD" style="font-size: 12px;color: #f4496d">{{ item[0] }}</div>
                      <div class="Buy-amountD" style="font-size: 12px;color: #f4496d">{{ item[1] }}</div>
                    </div>
                  </div>
                </div>
              </div>
              <!--buy sell-->
              <div class="f2N-1D">
                <div class="f2N-1DH">
                  <div @click="buySellSelect('BUY')" :class="buySell === 'BUY' ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                    $t("Tranding.Buy") }}
                  </div>
                  <div @click="buySellSelect('SELL')" :class="buySell === 'SELL' ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                    $t("Tranding.Sell") }}
                  </div>
                  <div class="Oval">i</div>
                </div>
                <div class="Field">
                  <div class="Field1">{{ $t("Tranding.Price") }}</div>
                  <div class="Field2">
                    <Input style="width: 160px" @on-blur="changeOrderPrice" type="number" v-model="createOrderParams.price"/>
                  </div>
                  <div class="Field3">{{ buy_unit }}</div>
                </div>
                <div class="Field" style="margin-top: 8px;">
                  <div class="Field1">{{ $t("Tranding.Amount") }}</div>
                  <div class="Field2">
                    <Input style="width: 160px" @on-blur="changeOrderVolume" type="number" v-model="createOrderParams.volume"/>
                  </div>
                  <div class="Field3" :title="buy_unit2" style="overflow:hidden;text-overflow:ellipsis;white-space: nowrap;">{{ buy_unit2 }}</div>
                </div>
                <div class="Minimum-order-amount">
                  <div class="Oval2"><img src="../../../assets/A.png" alt=""></div>
                  <div class="Minimum-order-amount2">{{ $t("Tranding.Minimum_order_amount") }} {{ limitVolumeMin }}</div>
                  <div class="Avalable-3000">{{ $t("Tranding.Avalable") }} <span class="text-style-1">{{ symbolBalance }}</span></div>
                </div>
                <div class="Rectangle4">
                  <div class="orderAmount">
                    <div class="orderAmountC">
                      <div class="orderAmountC1">
                        <div class="orderAmountC1L">{{ $t("Tranding.Ordered_Amount") }}</div>
                        <div>
                          <div class="orderAmountC1R1">{{createOrderParams.volume * createOrderParams.price}} {{ buy_unit }}</div>
                          <div class="orderAmountC1R2">={{(createOrderParams.volume * createOrderParams.price *
                            rate).toFixed(2)}} KRW
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="orderAmountC">
                      <div class="orderAmountC1">
                        <div class="orderAmountC1L">{{ $t("Tranding.Fee") }}</div>
                        <div>
                          <div class="orderAmountC1R1">{{ handingFee }} {{ buy_unit }}</div>
                          <div class="orderAmountC1R2">={{ (handingFee * rate).toFixed(2) }} KRW</div>
                        </div>
                      </div>
                    </div>
                    <div class="total">
                      <div class="Total-1">{{ $t("Tranding.Total") }}</div>
                      <div>
                        <div class="totalAp">{{createOrderParams.volume * createOrderParams.price}} {{ buy_unit }}</div>
                        <div class="totalKrw">={{(createOrderParams.volume * createOrderParams.price *
                          rate).toFixed(2)}} KRW
                        </div>
                      </div>
                    </div>
                    <Button type="primary" :disabled="isSign === '0'" @click="createOrder" class="buttonBuy">{{ isSign === '0' ? $t('request.pleaseLogin') : buySell === 'BUY' ? $t("Tranding.Buy") :
                      $t("Tranding.Sell") }}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--          右侧多国家-->
          <div class="f2N-1D" style="height: 816px;">
            <div class="f2N-1DH">
              <div @click="zone = 3" :class="zone === 3 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                $t("Tranding.Copyright_trading_zone") }}
              </div>
              <div @click="zone = 4" :class="zone === 4 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                $t("Tranding.Digital_currency_trading_zone") }}
              </div>
              <div @click="zone = 5" :class="zone === 5 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
                $t("Tranding.Platform_trading_area") }}
              </div>
              <!--              <div class="f2N-1DHN">{{ $t("Tranding.Usa") }}</div>-->
            </div>
            <div class="f2N-3D">
              <div class="f2N-3Dh1" style="margin-right:-10px;"><img src="../../../assets/blueStart.png" alt=""></div>
              <div class="f2N-3Dh2" style="width:20%;">{{ $t("Tranding.SongArtist") }}</div>
              <div class="f2N-3Dh2" style="width:18%;text-align: right;">{{ $t("Tranding.Price") }}</div>
              <div class="f2N-3Dh2" style="width:16%;text-align: right;">{{ $t("Tranding.Change") }}</div>
              <div class="f2N-3Dh2" style="width:16%;text-align: left;">{{ $t("Tranding.Volume") }}</div>
            </div>
            <!--            现在改为调接口获取币对，再调ws获取变化率-->
            <div class="test-1" style="height: 743px;overflow-y: scroll;overflow-x: hidden">
              <div v-for="(value, key) in comparison2" :key="key">
                <div class="f2N-3DD" @click="selectComparison(value.symbol, value)">
                  <div class="f2N-3Dh1" style="margin-right:-10px;padding-top:2px;"><img
                    src="../../../assets/blueStart.png" alt=""></div>
                  <div class="f2N-3DD1" style="width:20%;">
                    <div style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;">{{value.symbol}}</div>
                    <div class="f2N-3DD12">Buzz</div>
                  </div>
                  <div class="f2N-3DD1" style="width:18%;text-align: right;font-size: 12px;">{{ value.close }}</div>
                  <div class="f2N-3DD1" style="width:16%;text-align: right;font-size: 12px;">
                    <div :class="value.rose > 0 ? 'green' : 'red'" style="font-size: 12px;">{{ (value.rose *
                      100).toFixed(2)}}%
                    </div>
                  </div>
                  <div :title="value.vol" class="f2N-3DD1" style="width:16%;text-align: left;font-size: 12px;">{{
                    value.vol }}
                  </div>
                </div>
              </div>
            </div>
            <!--            以下为原来调ws获得的24小时行情的币对数据-->
            <!--            <div class="test-1" style="height: 743px;overflow-y: scroll;overflow-x: hidden">-->
            <!--              <div v-for="(value, key) in comparison" :key="key">-->
            <!--                <div class="f2N-3DD" @click="selectComparison(key, value)">-->
            <!--                  <div class="f2N-3Dh1" style="margin-right:-10px;padding-top:2px;"><img-->
            <!--                    src="../../../assets/blueStart.png" alt=""></div>-->
            <!--                  <div class="f2N-3DD1" style="width:20%;">-->
            <!--                    <div>{{key}}</div>-->
            <!--                    <div class="f2N-3DD12">Buzz</div>-->
            <!--                  </div>-->
            <!--                  <div class="f2N-3DD1" style="width:18%;text-align: right;font-size: 12px;">{{ value.close }}</div>-->
            <!--                  <div class="f2N-3DD1" style="width:16%;text-align: right;font-size: 12px;">-->
            <!--                    <div :class="value.rose > 0 ? 'green' : 'red'" style="font-size: 12px;">{{ (value.rose *-->
            <!--                      100).toFixed(2)}}%-->
            <!--                    </div>-->
            <!--                  </div>-->
            <!--                  <div :title="value.vol" class="f2N-3DD1" style="width:16%;text-align: left;font-size: 12px;">{{-->
            <!--                    value.vol }}-->
            <!--                  </div>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
        <!--        下方Order-->
        <div class="f2N-2">
          <div class="f2N-1DH" style="width: 100%;">
            <div @click="orderSelect(1)" :class="selectOrder === 1 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
              $t("Tranding.Open_order") }}
            </div>
            <div @click="orderSelect(2)" :class="selectOrder === 2 ? 'f2N-1DHActive' : 'f2N-1DHN'">{{
              $t("Tranding.Close_order") }}
            </div>
          </div>
          <div v-if="selectOrder === 1">
            <div style="width:100%;">
              <Table size="small" :columns="columns1" :data="data1"></Table>
            </div>
            <div style="margin: 15px auto;text-align: center;">
              <Page @on-change="data1PageChange" :total="total" size="small"/>
            </div>
          </div>
          <div v-if="selectOrder === 2">
            <div style="width:100%;">
              <Table size="small" :columns="columns2" :data="data2"></Table>
            </div>
            <div style="margin: 15px auto;text-align: center;">
              <Page @on-change="data2PageChange" :total="total2" size="small"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    确认取消提示框-->
    <Modal :closable="false" v-model="showCancelConfirm" width="384">
      <div class="success2" style="padding: 16px 16px 0 16px;">
        <div class="confirm2" style="text-align: left;">{{ cancelOrderConfirmT1 }}</div>
        <div class="Guide-text2">{{ cancelOrderT2 }}</div>
      </div>
      <div slot="footer">
        <Button style="border-radius: 2px;background-color: #fff;border-color:#565abf;height: 40px;font-size:14px;font-family: CircularStd;" @click="showCancelConfirm = false" type="default">{{ $t('modal.back')}}</Button>
        <Button style="border-radius: 2px;background-color: #565abf;border-color:#565abf;height: 40px;font-size:14px;font-family: CircularStd;" :loading="loadingCancel" @click="confirm" type="primary">{{ $t('modal.confirm')}}</Button>
      </div>
    </Modal>
    <!--    <Confirm :show="showCancelConfirm" :text="cancelOrderConfirmT1"-->
    <!--    :text2="cancelOrderT2" :self="this" :item="cancelOrderItem"-->
    <!--             :loading="loadingCancel"></Confirm>-->
    <SuccessModal :show="successShow" :text="successText" />
    <FailedModal :show="failedShow" :text="failedText1" :text2="failedText2"/>
  </div>
</template>
<script>
  import Header from "./header";
  import artistHeader from "./artistHeader";
  import pako from 'pako'
  import tradingView from "./tradingView"
  import SuccessModal from "../../modal/SuccessModal";
  import FailedModal from "../../modal/FailedModal";
  export default {
    name: 'information',
    components: {Header, artistHeader, tradingView, FailedModal, SuccessModal},
    data() {
      const self = this
      return {
        handingFee: 0,
        limitVolumeMin: 0,
        symbolBalance: 0, // 用户的计价货币余额
        isSign: localStorage.getItem('isSign'),
        cancelOrderP: {},
        successText: '',
        successShow: false,
        failedShow: false,
        failedText1: '',
        failedText2: '',
        showCancelConfirm: false,
        cancelOrderConfirmT1: '',
        cancelOrderT2: '',
        cancelOrderItem: {},
        loadingCancel: false,
        zone: 3,
        comparison2: [],
        buy_unit: '',
        buy_unit2: '',
        total: 0,
        timeType: '30min',
        selectOrder: 1,
        buySell: 'BUY',
        selectComparisonValue: 'BTCUSDT',
        comparison: {},
        tick: {
          asks: [],
          buys: []
        },
        ws: window.newVue.wsConn,
        orderHistory: 1,
        columns1: [
          {
            key: 'created_at',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Time"));
            }
          },
          {
            key: 'side',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Type"));
            }
          },
          {
            key: 'price',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Price"));
            }
          },
          {
            key: 'remain_volume',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Qty"));
            }
          },
          {
            key: 'total_price',
            renderHeader: function (h) {
              return h("span", {}, self.selectComparisonValue + ' ' + self.$t("Tranding.AP_Amount"));
            }
          },
          {
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Executed_All"));
            },
            render(h, params) {
              // 0 初始化，1，新订单，2，已成交，3,部分成交，4,已取消，5,正在取消，6,无效订单
              // 0 init，1 new，2 filled，3 part_filled，4 canceled，5 pending_cancel，6 expired',
              let result = ''
              switch (params.row.status) {
                case 0:
                  result = self.$t('init');
                  break;
                case 1:
                  result = self.$t('new');
                  break;
                case 2:
                  result = self.$t('filled');
                  break;
                case 3:
                  result = self.$t('part_filled');
                  break;
                case 4:
                  result = self.$t('canceled');
                  break;
                case 5:
                  result = self.$t('pending_cancel');
                  break;
                case 6:
                  result = self.$t('expired');
              }
              return h('span', {}, result)
            }
          },
          {
            key: 'cancel',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Cancel"));
            },
            render(h, param) {
              return h('Button', { props: {type: 'primary', size: 'small'},
                style: {
                  backgroundColor: '#565abf',
                  borderColor:'#565abf'
                },
                on: {
                  click() {
                    // console.log(param)
                    self.cancelOrder(param.row)
                  }
                }
              }, self.$t('Tranding.Cancel'))
            }
          }
        ],
        columns2: [
          {
            key: 'created_at',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Time"));
            }
          },
          {
            key: 'side',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Type"));
            }
          },
          {
            key: 'price',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Price"));
            }
          },
          {
            key: 'remain_volume',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Qty"));
            }
          },
          {
            key: 'total_price',
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.AP_Amount"));
            }
          },
          {
            renderHeader: function (h) {
              return h("span", {}, self.$t("Tranding.Executed_All"));
            },
            render(h, params) {
              // 0 初始化，1，新订单，2，已成交，3,部分成交，4,已取消，5,正在取消，6,无效订单
              // 0 init，1 new，2 filled，3 part_filled，4 canceled，5 pending_cancel，6 expired',
              let result = ''
              switch (params.row.status) {
                case 0:
                  result = self.$t('init');
                  break;
                case 1:
                  result = self.$t('new');
                  break;
                case 2:
                  result = self.$t('filled');
                  break;
                case 3:
                  result = self.$t('part_filled');
                  break;
                case 4:
                  result = self.$t('canceled');
                  break;
                case 5:
                  result = self.$t('pending_cancel');
                  break;
                case 6:
                  result = self.$t('expired');
              }
              return h('span', {}, result)
            }
          },
          // {
          //   key: 'cancel',
          //   renderHeader: function (h) {
          //     return h("span", {}, self.$t("Tranding.Cancel"));
          //   },
          //   render(h, param) {
          //     return h('Button', { props: {type: 'primary', size: 'small'},
          //       style: {
          //         backgroundColor: '#565abf',
          //         borderColor:'#565abf'
          //       },
          //       on: {
          //         click() {
          //           // console.log(param)
          //           self.cancelOrder(param.row)
          //         }
          //       }
          //     }, self.$t('Tranding.Cancel'))
          //   }
          // }
        ],
        data1: [],
        createOrderParams: {
          price: 0,
          side: self.$t("Tranding.Buy"),
          symbol: self.selectComparisonValue,
          type: 1,
          volume: 0
        },
        listNewParams: {
          page: 1,
          pageSize: 10,
          symbol: self.selectComparisonValue
        },
        listNewParams2: {
          page: 1,
          pageSize: 10,
          symbol: self.selectComparisonValue
        },
        data2: [],
        total2: 0
      }
    },
    watch: {
      trade_ticker(n) {
        console.log(n)
      },
      selectComparisonValue(n) {
        sessionStorage.setItem('selectComparisonValue', n)
        this.$bus.$emit('CURRENT_SYMBOL', n);
      },
      // 当切换交易区时
      zone(n) {
        this.getTransactionSymbol(n)
      }
    },
    computed: {
      trade_ticker: {
        get() {
          return this.$store.state.trade_ticker
        },
        set(n) {
          this.$store.commit('trade_ticker', n)
        }
      },
      rate() {
        return this.$store.state.rate
      }
    },
    mounted() {
      if (sessionStorage.getItem('selectComparisonValue')) {
        this.selectComparisonValue = sessionStorage.getItem('selectComparisonValue')
      } else {
        sessionStorage.setItem('selectComparisonValue', this.selectComparisonValue)
      }
      // 轮询调委托列表, 接口不通先不调，报错的话刷新不出来K线
      const self = this
      self.listNew()
      self.entrustHistory()
      window.newVue.timer = setInterval(() => {
        self.listNew()
        self.entrustHistory()
      }, 20000)
      this.$store.commit('changeNavIndex', 2)
      this.$store.commit('changeTradingIndex', 1)
      setTimeout(() => {
        this.getBaseQuoteBySymbol(sessionStorage.getItem('selectComparisonValue'))
      }, 10)
      this.getTransactionSymbol(3)
      // this.createWidget()
      // this.test()
      // this.test2('ltcusdt')
      // this.test2('测试2号ap')
      this.chainPublic()
    },
    methods: {
      // 链上全站公共接口，用于获取分区币对信息
      chainPublic() {
        this.$post(window.selfConfig.chainUrl + '/common/public_info_v4')
      },
      // 确认取消委托
      confirm(){
        const self = this
        this.loadingCancel = true
        const param = {
          orderId: self.cancelOrderP.id,
          symbol: self.cancelOrderP.baseCoin + self.cancelOrderP.countCoin
        }
        this.$post(window.selfConfig.chainUrl + '/order/cancel', param).then(res => {
          if (res.code === 0) {
            this.successShow = true
            this.successText = this.$t('CancelSuccess')
            setTimeout(() => {
              this.successShow = false
            }, 1800)
          } else {
            this.failedShow = true
            this.failedText1 = this.$t('CancelFailed')
            this.failedText2 = res.msg
            setTimeout(() => {
              this.failedShow = false
            }, 1800)
          }
          this.listNew()
          this.loadingCancel = false
          this.showCancelConfirm = false
        })
      },
      cancelOrder(param) {
        const self = this
        self.cancelOrderP = param
        self.showCancelConfirm = true
        self.cancelOrderItem = param
        self.cancelOrderConfirmT1 = self.$t('CancelOrder')
      },
      // ws发送事件及初始化
      sendMsg(symbol) {
        for (let i = 0; i < symbol.length; i++) {
          let initSend = {"event": "sub", "params": {"channel": "market_" + symbol[i] + "_ticker", "cb_id": symbol[i]}}
          this.wsCon.send(JSON.stringify(initSend));
        }
      },
      test2(symbol) {
        const self = this
        self.wsCon = new WebSocket(window.selfConfig.wsUrl)
        // let ws = new WebSocket('wss://ws.chaindown.com/kline-api/ws')
        self.wsCon.binaryType = "arraybuffer"
        self.wsCon.onopen = function () {
          for (let i = 0; i < symbol.length; i++) {
            let initSend = {"event": "sub", "params": {"channel": "market_" + symbol[i] + "_ticker", "cb_id": symbol[i]}}
            self.wsCon.send(JSON.stringify(initSend));
          }
        };
        self.wsCon.onmessage = function (evt) {
          let raw_data = evt.data;
          let ua = new Uint8Array(raw_data);
          if (ua.length > 0) {
            let json = pako.inflate(ua, {to: "string"});
            let data = JSON.parse(json);
            if (data["ping"]) {
              self.wsCon.send(JSON.stringify({"pong": data["ping"]}));
            } else {
              console.log(data)
              const a = data.channel.indexOf('_ticker')
              const b = data.channel.indexOf('_')
              const c = data.channel.slice(b + 1, a) // 获取返回的币对
              for(let i in self.comparison2) {
                if (self.comparison2[i].symbol === c) {
                  // console.log(c + '**')
                  self.comparison2[i].rose = data.tick.rose
                  self.comparison2[i].close = data.tick.close
                  self.comparison2[i].vol = data.tick.vol
                  break
                }
              }
            }
          }
        }
      },
      changeOrderPrice(e) {
        const self = this
        if (Number(e.target.value) < 0) {
          self.createOrderParams.price = 0
        }
      },
      changeOrderVolume(e) {
        const self = this
        if (Number(e.target.value) < 0) {
          self.createOrderParams.volume = 0
        }
      },
      test() {
        this.$get('http://test111.chaindown.com/exchange-open-api/open/api/get_ticker?symbol=btcusdt')
        // this.$get('https://www.chaindown.com/exchange-open-api/open/api/get_ticker?symbol=btcusdt')
      },
      // 获取交易币对
      getTransactionSymbol(n) {
        // 版权交易区 3
        // 数字货币交易区 4
        // 平台交易区 5
        let form = new FormData()
        form.append('tradingArea', n)
        this.$post('/api/copyright/getTransactionSymbol', form).then(res => {
          // this.$post('https://testweb.artpiece.com/api/copyright/getTransactionSymbol').then(res => {
          this.comparison2 = res.data
          let temp = []
          for (let i in this.comparison2) {
            this.comparison2[i].close = '--'
            this.comparison2[i].rose = 0
            this.comparison2[i].vol = '--'
            temp.push(this.comparison2[i].symbol)
          }
          this.comparison2 = JSON.parse(JSON.stringify(this.comparison2))
          if(this.wsCon) {
            this.sendMsg(temp)
          } else {
            this.test2(temp)
          }
        })
      },
      orderSelect(value) {
        this.listNewParams.page = 1
        this.selectOrder = value
        value === 1 ? this.listNew() : this.entrustHistory()
      },
      data2PageChange(e) {
        this.listNewParams2.page = e
        this.entrustHistory()
      },
      entrustHistory() {
        this.listNewParams2.symbol = this.selectComparisonValue
        this.$post(window.selfConfig.chainUrl + '/order/entrust_history', this.listNewParams2).then(res => {
          // console.log(res)
          try {
            this.data2 = res.data.orderList
            this.total2 = res.data.count
          } catch (e) {
            console.log('/order/entrust_history未登录')
          }
        })
      },
      data1PageChange(e) {
        this.listNewParams.page = e
        this.listNew()
      },
      listNew() {
        this.listNewParams.symbol = this.selectComparisonValue
        this.$post(window.selfConfig.chainUrl + '/order/list/new', this.listNewParams).then(res => {
          // console.log(res)
          try {
            this.data1 = res.data.orderList
            this.total = res.data.count
          } catch (e) {
            console.log('/order/list/new用户未登录')
          }
        })
      },
      buySellSelect(value) {
        this.buySell = value
      },
      order_history(i) {
        this.orderHistory = i
      },
      // *****当选择右边的币对时
      selectComparison(key, value) {
        // console.log(key, value)
        this.getBaseQuoteBySymbol(key, value)
        this.selectComparisonValue = key
        this.handingFee = value.handlingFee ? value.handlingFee : 0
        this.buy_unit = value.quote
        this.buy_unit2 = value.base
        this.limitVolumeMin = value.limitVolumeMin
        // 刷新下方委托
        this.listNew()
        this.entrustHistory()
      },
      // 获取版权信息
      getTradingCopyrightInformation(key) {
        let form2 = new FormData()
        form2.append('copyrightCode', key)
        this.$post('/api/copyrightAuction/getTradingCopyrightInformation', form2).then(res => {
          console.log(res)
          this.$store.commit("setCanClickInfo", res.data !== null)
          sessionStorage.setItem("getTradingCopyrightInformation", JSON.stringify(res.data))
        })
      },
      // ***根据币对获取交易对信息
      getBaseQuoteBySymbol(key, value) {
        // let form = new FormData()
        // form.append('symbol', key)
        // this.$post('/api/copyright/getBaseQuoteBySymbol', form).then(res => {
        this.getTradingCopyrightInformation(value.base)
        let form2 = new FormData()
        form2.append('symbol', this.buy_unit)
        // 获取用户计价货币余额
        this.$post('/api/account/getUserBalance', form2).then(res => {
          try {
            this.symbolBalance = res.data.balance
          } catch (e) {
            this.symbolBalance = 0
          }
        })
        // })
      },
      // 生成委托
      createOrder() {
        this.createOrderParams.symbol = this.selectComparisonValue
        this.createOrderParams.side = this.buySell
        this.$post(window.selfConfig.chainUrl + '/order/create', this.createOrderParams).then(res => {
          // console.log(res)
          if (res.code === 0) {
            this.successShow = true
            this.successText = this.$t('OrderConfirm')
            setTimeout(() => {
              this.successShow = false
            }, 1800)
          } else {
            this.failedShow = true
            this.failedText1 = this.$t('OrderFiled')
            this.failedText2 = res.code
            setTimeout(() => {
              this.failedShow = false
            }, 1800)
          }
          this.listNew()
        })
      }
    }
  }
</script>
<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .ivu-modal-footer {
    border-top: 0 !important;
  }
  .green {
    color: green;
  }

  .red {
    color: #f4496d;
  }

  .test-1::-webkit-scrollbar { /*滚动条整体样式*/
    width: 5px; /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    margin-right: -10px;
  }

  .test-1::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
  }

  .test-1::-webkit-scrollbar-track { /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #f1f1f1;
  }
</style>
<style scoped>
  .Guide-text2 {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }
  .ivu-modal-footer {
    border: 0;
  }
  .confirm2 {
    width: 100%;
    text-align: center;
    margin-top: 10px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -1px;
    color: #32325d;
  }
  .ivu-modal-body {
    position: relative;
    padding: 0 !important;
  }
  .success2 {
    border-radius: 4px;
    background-color: #ffffff;
  }
  .f2N-2 {
    margin-top: 32px;
    width: 1216px;
    height: 462px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .f2N-3DD12 {
    position: absolute;
    bottom: -12px;
    width: 26px;
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

  .f2N-3DD1 {
    position: relative;
    width: 47px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .f2N-3DD {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 4px 20px;
    width: 382px;
    height: 48px;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
    cursor: pointer;
  }

  .f2N-3DD:hover {
    background-color: #f2f6fa;
  }

  .f2N-3Dh2 {
    width: 57px;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .f2N-3D {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 20px;
    width: 382px;
    height: 32px;
    border-radius: 2px;
    background-color: #f7f9fc;
  }

  .buttonBuy {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
    margin-top: 24px;
    width: 352px;
    height: 40px;
    border-radius: 2px;
    background-color: #565abf;
  }

  .totalKrw {
    height: 12px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: #bdc6d4;
  }

  .totalAp {
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    text-align: right;
    color: #565abf;
  }

  .Total-1 {
    width: 33px;
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

  .total {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .orderAmountC1R2 {
    height: 12px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    text-align: right;
    color: #bdc6d4;
  }

  .orderAmountC1R1 {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #32325d;
  }

  .orderAmountC1L {
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

  .orderAmountC1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .orderAmountC {
    margin-bottom: 8px;
  }

  .orderAmount {
    padding: 8px 0 12px;
    margin: 0 auto;
    width: 352px;
    height: 88px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
  }

  .Rectangle4 {
    position: absolute;
    bottom: 0;
    width: 382px;
    height: 204px;
    background-color: #f7f9fc;
  }

  .Avalable-3000 {
    position: absolute;
    right: 2px;
    width: 159px;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    text-align: right;
    color: #bdc6d4;
  }

  .Avalable-3000 .text-style-1 {
    color: #87bbfc;
  }

  .Minimum-order-amount2 {
    height: 12px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #f4496d;
  }

  .Oval2 {
    margin-right: 4px;
    width: 12px;
    height: 12px;
    opacity: 0.4;
    background-color: #f4496d;
  }

  .Minimum-order-amount {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 4px 15px;
    width: 352px;
    height: 12px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1;
    letter-spacing: normal;
    color: #f4496d;
  }

  .Field3 {
    width: 20%;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #32325d;
  }

  .Field2 {
    width: 50%;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Field1 {
    width: 25%;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #565abf;
  }

  .Field {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 16px auto 8px;
    padding: 10px 17px;
    width: 352px;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .Oval {
    text-align: center;
    position: absolute;
    right: 16px;
    top: 8px;
    width: 20px;
    height: 20px;
    opacity: 0.4;
    background-color: #f7d269;
  }

  .Buy-amountD {
    text-align: right;
    width: 35%;
    height: 16px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
  }

  .priceD {
    text-align: right;
    width: 20%;
    height: 16px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
  }

  .Sell-amountD {
    width: 45%;
    height: 16px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
  }

  .data1List {
    padding: 4px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 32px;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
  }

  .Buy-amount {
    text-align: right;
    width: 35%;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .price {
    text-align: right;
    width: 20%;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Sell-amount {
    width: 45%;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .f2N-1DH2 {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 4px 16px;
    height: 24px;
    background-color: #f7f9fc;
  }

  .f2N-1DHN {
    margin-right: 8px;
    height: 32px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #bdc6d4;
  }

  .f2N-1DHActive {
    margin-right: 8px;
    border-bottom: 2px solid #565abf;
    height: 32px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .f2N-1DH {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 8px 16px;
    width: 384px;
    height: 40px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
  }

  .f2N-1 {
    margin-top: 32px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  .f2N-1D {
    position: relative;
    width: 384px;
    height: 392px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .active {
    border-bottom: 2px solid #565abf;
  }

  #f2 {
    min-width: 1216px;
    background-color: #e3e8ee;
    padding-top: 16px;
  }

  .f2N {
    padding: 32px 0 168px;
    margin: 0 auto;
    width: 1216px;
  }
</style>
