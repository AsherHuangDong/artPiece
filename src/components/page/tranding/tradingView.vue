<template>
  <div style="background: #fff; margin-bottom:32px;width: 800px;height: 392px;">
    <div style="position: absolute;top: 3px;left: 220px;z-index: 999">
      <RadioGroup v-model="timeType">
        <template v-for="(item, index) in baseTimeArry">
          <Radio :key="index" :label="item">
            <span>{{item}}</span>
          </Radio>
        </template>

      </RadioGroup>
    </div>
    <div class="f2N-1D" id="mainKLine" style="width:100%;height: 392px;"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      widget: null,
      symbolCurrent: sessionStorage.getItem('selectComparisonValue') || null,
      MywebSocket: null,
      lastTimeS: '30min',
      // timeType: '30min', // 从$store拿
      lTime: null,
      lSytm: null,
      fTime: 0,
    }
  },
  computed:{
    baseTimeArry() {
      return ['1min','5min','15min','30min','60min','1day','1week','1month'];
    },
    timeType: {
      get() {
        return this.$store.state.timeType
      },
      set(n) {
        this.$store.commit('timeType', n)
      }
    },
    timeArry() {
      const a = [];
      if (this.baseTimeArry.length) {
        this.baseTimeArry.forEach((it) => {
          const t = [];
          if (it.indexOf('min') > -1) {
            t.push(it, parseFloat(it));
          } else if (
            it.toLowerCase().indexOf('h') > -1
            && it.indexOf('month') < 0
          ) {
            t.push(it, parseFloat(it) * 60);
          } else if (it.indexOf('day') > -1) {
            t.push(it, parseFloat(it) * 24 * 60);
          } else if (it.indexOf('week') > -1) {
            t.push(it, parseFloat(it) * 7 * 24 * 60);
          } else if (it.indexOf('month') > -1) {
            t.push(it, parseFloat(it) * 30 * 24 * 60);
          }
          a.push(t);
        });
      }
      return a;
    },
  },
  mounted() {
    this.$bus.$on('CURRENT_SYMBOL', (val) => {
      if (val !== this.symbolCurrent) {
        this.symbolCurrent = val;
      }
    })
    this.$bus.$on('WS', (val) => {
      this.MywebSocket = val
    })
    this.init();
  },
  watch: {
    // 监听刻度改变
    timeType(val) {
      this.timeClike(val);
    },
    // 监听币对改变
    symbolCurrent(val, oldVal) {
      const changeSymbol = val;
      if (window.tvWidget && oldVal) {
        setTimeout(() => {
          window.tvWidget.setSymbol(
            changeSymbol,
            this.getTimeMin(true, this.lastTimeS),
            () => {
              this.widget.chart().executeActionById('chartReset');
            },
          );
        }, 100);
      }

    },
  },
  methods: {
    init() {
      window.TradingView.onready(this.createWidget());
    },
    // 创建 TradingView
    createWidget() {
      class F extends window.TradingView.widget {}
      window.tvWidget = new F({
        autosize: true,
        timezone: window.jstz.determine().name(),
        symbol: this.symbolCurrent,
        container_id: 'mainKLine', // DOM id
        datafeed: this.udf_datafeed(), // 配置 生命周期
        library_path: '/charting_library/', // 静态文件路径
        locale: 'zh', // 语言
        disabled_features: [
          'header_symbol_search',
          'timeframes_toolbar',
          'volume_force_overlay',
          'header_saveload',
          'header_resolutions',
          'header_compare',
          'header_screenshot',
          'header_undo_redo',
          'adaptive_logo',
          'header_fullscreen_button',
          'timezone_menu',
          'scales_context_menu',
          'legend_context_menu',
          'symbol_search_hot_key',
          // 'use_localstorage_for_settings',
          // 'show_chart_property_page',
          // 'timeframes_toolbar',
          // 'symbol_info',
          // 'header_widget_dom_node',
          // 'header_indicators',
          // 'header_widget',
          // 'pane_context_menu',
          // 'header_fullscreen_button',
          // 'display_market_status',
          // 'header_chart_type',
        ],
        enabled_features: [
          'hide_left_toolbar_by_default',
        ],
        charts_storage_url: `${window.location.protocol}//saveload.tradingview.com`,
        charts_storage_api_version: '1.1',
        client_id: 'tradingview.com',
        user_id: 'public_user',
      });
      this.widget = window.tvWidget;
    },
    // TV 生命周期
    udf_datafeed() {
      const self = this;
      return {
        onReady(callback) {
          const cnf = {
            supported_resolutions: self.getTimeMin(false, 1), // 数组
            supports_group_request: false,
            supports_marks: true,
            supports_search: false,
            supports_timescale_marks: false,
          };
          setTimeout(() => {
            callback(cnf);
          }, 0);
        },
        // 切换币对后
        resolveSymbol(symbolName, onSymbolResolvedCallback) {
          setTimeout(() => {
            onSymbolResolvedCallback({
              name: symbolName,
              'exchange-traded': '',
              'exchange-listed': '',
              minmov: 1,
              minmov2: 0,
              pointvalue: 1,
              session: '0000-2400:1234567',
              has_intraday: true,
              has_no_volume: false,
              volume_precision: 1,
              description: symbolName.toUpperCase(),
              type: 'bitcoin',
              supported_resolutions: self.getTimeMin(false, 1),
              pricescale: 10000, // 设置价格精度
              ticker: symbolName.toUpperCase(),
              timezone: window.jstz.determine().name(),
            });
          }, 0);
        },
        // tradingview 获取历史数据
        getBars( symbolInfo, resolution, from, to,  onHistoryCallback, onErrorCallback,firstDataRequest) {
          if (firstDataRequest) {
            self.lTime = false;
          }
          const b = {
            "event":"req",
            "params": {
              "channel":`market_${self.symbolCurrent}_kline_${self.lastTimeS}`,
              // "endIdx": self.lTime || null, // endIdx先不需要
              "endIdx": null,
              "cb_id": self.symbolCurrent
            }
          }
          if (self.MywebSocket && self.MywebSocket.readyState === 1) {
            self.MywebSocket.send(JSON.stringify(b))
          }
          self.$bus.$off('WS_KLINE_DATA');
          self.$bus.$on('WS_KLINE_DATA', (data) => {
            const channelArr = data.channel.split('_');
            const Ntime = channelArr[channelArr.length - 1];
            let [, symbolType] = data.channel.split('_');
            if (data.event_rep === 'rep' && symbolType === self.symbolCurrent && self.lastTimeS === Ntime) {
              // let klData = data.data;
              let arrData = [];
              if (data.data && data.data.length) {
                data.data.forEach((item) => {
                  arrData.push(self.setData(item));
                });
                self.fTime = arrData[arrData.length - 1].time;
                if (self.lTime === data.data[0].id && symbolType === self.lSytm) {
                  onHistoryCallback([], { noData: true });
                } else {
                  self.lTime = data.data[0].id;
                  self.lSytm = symbolType;
                  onHistoryCallback(arrData);
                }
              } else {
                onHistoryCallback([], { noData: true });
              }
            }
          });
        },
        // tradingview 获取实时数据
        subscribeBars(symbolInfo, resolution, onRealtimeCallback) {
          const v = {
            "event":"sub",
            "params": {
              "channel":`market_${self.symbolCurrent}_kline_${self.lastTimeS}`,
              "cb_id": self.symbolCurrent
            }
          }
          self.MywebSocket.send(JSON.stringify(v))
          // 获取实时数据
          self.$bus.$off('KLINE_DATA_SUB');
          self.$bus.$on('KLINE_DATA_SUB', (data) => {
            const channelArr = data.channel.split('_');
            const Ntime = channelArr[channelArr.length - 1];
            const [, symbolType] = data.channel.split('_');
            if (
              data.tick
              && symbolType === self.symbolCurrent
              && Ntime === self.lastTimeS
            ) {
              const tickData = self.setData(data.tick);
              if (self.fTime < tickData.time) {
                onRealtimeCallback(tickData);
              }
            }
          });
        },
        // tradingview 取消订阅上一 币对 / 刻度
        unsubscribeBars(subscriberUID) {
          const arr = subscriberUID.split('_');
          const symbol = arr[0].toLowerCase();
          const lastTimeS = self.getTimeMin(true, parseFloat(arr[1]));
          const unsub = {
            "event":"unsub",
            "params": {
              "channel":`market_${symbol}_kline_${lastTimeS}`,
              "cb_id": symbol
            }
          }
          self.MywebSocket.send(JSON.stringify(unsub))
        },
      };
    },
    // 格式化数据
    setData(obj) {
      return {
        time: obj.id * 1000,
        close: obj.close,
        open: obj.open,
        high: obj.high,
        low: obj.low,
        volume: obj.vol,
      };
    },
    // 格式化时间刻度
    getTimeMin(only, type) {
      if (only) {
        let t = null;
        if (this.timeArry.length) {
          this.timeArry.forEach((item) => {
            const s = item.indexOf(type);
            if (s > -1) {
              t = s === 0 ? item[1] : item[0];
            }
          });
        }
        return t;
      }
      const t = [];
      this.timeArry.forEach((item) => {
        t.push(item[type]);
      });
      return t;
    },
    // 切换刻度
    timeClike(v) {
      if (v !== this.lastTimeS) {
        this.lastTimeS = v;
        const resolution = this.widget.chart().resolution();
        if (resolution !== '1') {
          this.widget.chart().setResolution('1', () => {
            this.widget.chart().setChartType(3); // 折线图
          });
        } else if (resolution === '1') {
          this.widget.chart().setChartType(3);
        }
        if (resolution === '1' && v === '1min') {
          this.widget.chart().setChartType(1); // 蜡烛图
        } else {
          const timeS = this.getTimeMin(true, v);
          this.widget.chart().setResolution(timeS.toString(), () => {
            this.widget.chart().setChartType(1);
            this.widget.chart().executeActionById('chartReset');
          });
        }
      }
    },

  }
}
</script>
