<template>
  <div>
    <div class="Mask" style="display: flex;justify-content: space-between;align-items: center;">
      <div style="display: flex;justify-content: flex-start;align-items: center;width: 712px; position: relative">
        <div v-if="showCopyright" style="display: flex;justify-content: space-between;align-items: center;width: 252px;">
          <div class="Rectangle">
            <img :src="copyrightImg" alt="">
          </div>
          <div class="mask-2">
            <div :title="artist" class="Artist-name flowDotted" style="width: 120px;">{{ artist }}</div>
            <div :title="copyrightName" class="Song-name flowDotted" style="width: 120px;">{{ copyrightName }}</div>
          </div>
        </div>
        <div v-if="!showCopyright"
             style="padding-left: 20px;">
          <span
          style="font-weight: normal;font-size: 17px;font-family: Trebuchet"
          >{{buy_unit2}}/{{buy_unit}}</span>
        </div>
<!--        <div style="display: flex;justify-content: space-between;align-items: center;">-->
        <div style="display: flex;justify-content: space-between;align-items: center;position: absolute;left: 252px;">
          <div class="mask-3">
            <div class="Artist-name">{{ $t('Tranding.artistHeader.Last_price') }}</div>
            <div style="width: 100%;height: 100%;display: flex;justify-content: flex-start;align-items: center;">
              <div class="Song-name" style="display: inline">{{ toThousands(ws_ticker.tick.close) }}</div>
              <div v-if="ws_ticker.tick.rose !== '--'" class="Rectangle2" style="line-height: 19px;"
                   :class="Number(ws_ticker.tick.rose) <= 0 ? 'red' : 'green'">{{(Number(ws_ticker.tick.close) - Number(ws_ticker.tick.open)).toFixed(2)}}
              </div>
              <div v-if="ws_ticker.tick.rose !== '--'" class="Rectangle2" style="line-height: 19px;"
                   :class="Number(ws_ticker.tick.rose) <= 0 ? 'red' : 'green'">{{(Number(ws_ticker.tick.rose) *
                100).toFixed(2)}}%
              </div>
              <div v-if="ws_ticker.tick.rose === '--'" class="Rectangle2" style="color: #000;width: 22px;">--</div>
            </div>
            <div v-if="ws_ticker.tick.close !== '--'" class="-KRW-Copy-3">={{ toThousands((ws_ticker.tick.close *
              rate).toFixed(2)) }} {{ rateLogo }}
            </div>
            <div v-if="ws_ticker.tick.close === '--'" class="-KRW-Copy-3">-- {{ rateLogo }}</div>
          </div>
          <div class="mask-2">
            <div class="Artist-name">24H {{ $t('Tranding.artistHeader.high') }}</div>
            <div class="Song-name">{{ toThousands(ws_ticker.tick.high) }}</div>
          </div>
          <div class="mask-2">
            <div class="Artist-name">24H {{ $t('Tranding.artistHeader.Lower') }}</div>
            <div class="Song-name">{{ toThousands(ws_ticker.tick.low) }}</div>
          </div>
          <div class="mask-2">
            <div class="Artist-name">24H {{ $t('Tranding.artistHeader.Value') }}</div>
            <div class="Song-name">{{ ws_ticker.vol2 }}</div>
          </div>
        </div>
      </div>
      <div id="mskImg"></div>
    </div>
  </div>
</template>

<script>
  import {initWs} from "../../../wsPakoConfig";
  import {toThousands} from "../../../tool";
  import { createChart } from 'lightweight-charts';

  export default {
    props: ['buy_unit', 'buy_unit2', 'showCopyright', 'bodySelf', 'selectComparisonValue', 'rateLogo', 'rate', 'copyrightImg', 'copyrightName', 'artist'],
    name: "artistHeader",
    data() {
      return {
        chart: null,
        areaSeries: null,
        kLineOption: [{}],
        wsConnect: false,
        ws: null,
        ws_ticker: {
          tick: {
            close: '--',
            rose: '--',
            high: '--',
            low: '--'
          },
          vol2: '--'
        },
        ws_depth: {}
      }
    },
    computed: {
      oldKlineData: {
        get() {
          return this.$store.state.oldKlineData
        },
        set(n) {
          this.$store.commit('oldKlineData', n)
        }
      },
      fullKLineData: {
        get() {
          return this.$store.state.fullKLineData
        },
        set(n) {
          this.$store.commit('fullKLineData', n)
        }
      },
      timeType: {
        get() {
          return this.$store.state.timeType
        },
        set(n) {
          this.$store.commit('timeType', n)
        }
      },
      kLineData: {
        get() {
          return this.$store.state.kLineData
        },
        set(n) {
          this.$store.commit('kLineData', n)
        }
      },
      kLineUpDate: {
        get() {
          return this.$store.state.kLineUpDate
        },
        set(n) {
          this.$store.commit('kLineUpDate', n)
        }
      },
      fulloOldKLineData: {
        get() {
          return this.$store.state.fulloOldKLineData
        },
        set(n) {
          this.$store.commit('fulloOldKLineData', n)
        }
      }
    },
    mounted() {
      this.initLightChart()
      this.webSocket()
    },
    watch: {
      // 完整的Kline信息，包括channel和获取时间
      fullKLineData(){
        // console.log(n)
        // console.log(o)
        // if (n.channel === o.channel && n.ts > o.ts){
        //   // console.log(this.oldKlineData)
        //   // this.oldKlineData.unshift.apply(this.oldKlineData, n.data)
        //   // this.kLineData = this.oldKlineData
        //   if (this.fulloOldKLineData.channel !== n.channel) {
        //     this.kLineData.push.apply(this.kLineData, o.data)
        //   } else {
        //     this.kLineData.push.apply(this.kLineData, this.oldKlineData)
        //   }
        //   this.oldKlineData = JSON.parse(JSON.stringify(this.kLineData))
        //   console.log(this.kLineData)
        //   console.log('appendSet')
        //   this.setData()
        // } else {
        //   console.log('set')
        //   this.setData()
        // }
        // this.fulloOldKLineData = o
        this.setData()
      },
      // 监听币对变化
      selectComparisonValue(newV) {
        // this.$chart.line3('mskImg', [])
        console.log(newV)
        this.ws_ticker = {
          tick: {
            close: '--',
            rose: '--',
            high: '--',
            low: '--'
          },
          vol2: '--'
        }
        // // 不需要刷新连接
        if (this.wsConnect) {
          this.webSocketSend()
        }
      },
      // 监听更新时间
      timeType(newV) {
        console.log(newV)
        // // 不需要刷新连接
        if (this.wsConnect) {
          this.webSocketSend()
        }
      },
      // 监听ws是否连接
      wsConnect(newV) {
        const self = this
        if (newV) {
          console.log(newV)
          self.webSocketSend()
        }
      },
      ws_ticker(newV) {
        // console.log(newV)
        // console.log(newV.tick.vol)
        if (newV.tick.vol === undefined) {
          this.ws_ticker.vol2 = '--'
        } else {
          this.ws_ticker.vol2 = toThousands(Number(newV.tick.vol))
        }
      },
      kLineUpDate() {
        this.updateData()
      },
      // kLineData(n, o) {
      //   this.oldKlineData = o
      // }
    },
    beforeDestroy() {
      window.newVue.wsConn.close()
    },
    methods: {
      setData() {
        let t = JSON.parse(JSON.stringify(this.kLineData))
        let data = []
        for (let i in t) {
          let tmp = {
            time: (new Date(t[i].ds)).valueOf(),
            value: t[i].close
          }
          data.push(tmp)
        }
        // console.log(data)
        this.areaSeries.setData(data);
      },
      updateData() {
        // console.log(this.kLineUpDate)
        if (this.kLineUpDate.data !== null) {
          let data = []
          for (let i in this.kLineUpDate) {
            let tmp = {
              time: (new Date(this.kLineUpDate[i].ds)).valueOf(),
              value: this.kLineUpDate[i].close
            }
            data.push(tmp)
          }
          this.areaSeries.updateData(data);
        }
      },
      // 使用light-chart初始化右上角的图
      initLightChart() {
        this.chart = createChart(document.getElementById('mskImg'), {
          width: 488,
          height: 104,
          priceScale: {
            position: 'none',
            borderVisible: false,
          },
          grid: {
            vertLines: {
              visible: false,
            },
            horzLines: {
              visible: false,
            },
          },
          layout: {
            backgroundColor: '#fff',
          },
          series: {

          }
        });
        this.chart.applyOptions({
          layout: {
            backgroundColor: "#f7f9fc",
          },
          timeScale: {
            visible: false,
          }
        });
        this.areaSeries = this.chart.addAreaSeries({
          // topColor: 'rgba(233, 16, 169, 0.35)',
          topColor: 'rgba(244, 73, 109, 0.35)',
          bottomColor: 'rgba(233, 16, 169, 0)',
          lineColor: 'rgba(244, 73, 109, 1)',
          lineWidth: 2,
        });
        this.areaSeries.applyOptions({
          priceLineVisible: false,
        });
        let data = []
        for (let i in this.kLineData) {
          let tmp = {
            time: (new Date(this.kLineData[i].ds)).valueOf(),
            value: this.kLineData[i].close
          }
          data.push(tmp)
        }
        // console.log(data)
        this.areaSeries.setData(data);
      },
      toThousands(n) {
        return toThousands(n)
      },
      webSocket() {
        // 首页，请求24小时行情
        window.newVue.wsConn = this.ws = initWs(this, {"event": "req", "params": {"channel": "review"}})
      },
      webSocketSend() {
        const self = this
        // K线
        const b = {
          "event": "req",
          "params": {
            "channel": "market_" + self.selectComparisonValue + "_kline_" + self.timeType,
            "cb_id": self.selectComparisonValue
          }
        }
        this.ws.send(JSON.stringify(b))
        // 盘口
        const c = {
          "event": "sub",
          "params": {"channel": "market_" + self.selectComparisonValue + "_ticker", "cb_id": self.selectComparisonValue}
        }
        this.ws.send(JSON.stringify(c))
        // 请求成交信息
        const d = {
          "event": "req",
          "params": {
            "channel": "market_" + self.selectComparisonValue + "_trade_ticker",
            "cb_id": self.selectComparisonValue,
            "top": 100
          }
        }
        this.ws.send(JSON.stringify(d))
        // 订阅实时成交信息
        const e = {
          "event": "sub",
          "params": {
            "channel": "market_" + self.selectComparisonValue + "_trade_ticker",
            "cb_id": self.selectComparisonValue,
            "top": 100
          }
        }
        this.ws.send(JSON.stringify(e))
        // 深度，买卖历史
        const f = {
          "event": "sub",
          "params": {
            "channel": "market_" + self.selectComparisonValue + "_depth_step0",
            "cb_id": self.selectComparisonValue
          }
        }
        this.ws.send(JSON.stringify(f))
      }
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }

  #mskImg {
    background-color: #f7f9fc;
    width: 488px;
    height: 104px;
  }

  #f1 {
    min-width: 1216px;
    height: 48px;
    background-color: #f7f9fc;
  }

  .f1C {
    margin: 0 auto;
    width: 1216px;
    height: 100%;
  }

  .Acount {
    margin-right: 20px;
    height: 100%;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.4;
    letter-spacing: -1px;
    color: #32325d;
  }

  .Safety-record {
    height: 100%;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.4;
    letter-spacing: -1px;
    color: #565abf;
  }

  .active {
    border-bottom: 2px solid #565abf;
  }

  .Mask {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1216px;
    margin: 0 auto;
    height: 104px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .Rectangle {
    margin: 16px;
    width: 72px;
    height: 72px;
    border-radius: 2px;
    box-shadow: 0 10px 20px 0 rgba(86, 90, 191, 0.2);
  }

  .mask-2 {
    margin: 12px 32px 12px 0;
  }

  .Artist-name {
    width: 100%;
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

  .Song-name {
    font-size: 24px;
    width: 100%;
    height: 32px;
    font-family: CircularStd;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    color: #32325d;
  }

  .mask-3 {
    margin-top:12px;
    margin-right: 32px;
    position: relative;
  }

  .-KRW-Copy-3 {
    width: auto;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: normal;
    color: #bdc6d4;
  }

  .Rectangle2 {
    color: #fff;
    font-size: 10px;
    -webkit-transform: scale(0.8);
    margin-left: 2px;
    padding: 0 5px 0 4px;
    display: inline-block;
    height: 18px;
    border-radius: 12px;
    text-align: center;
  }

  .red {
    background-color: #f4496d;
  }

  .green {
    background-color: green;
  }
</style>
