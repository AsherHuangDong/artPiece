import pako from 'pako'

// 实例化ws
export const initWs = function (self, initSend) {
  let ws = new WebSocket(window.selfConfig.wsUrl)
  // let ws = new WebSocket('wss://ws.chaindown.com/kline-api/ws')
  // let ws = new WebSocket('ws://test111ws.chaindown.com/kline-api/ws')
  // let ws = new WebSocket('wss://testws.artpiece.com/kline-api/ws')
  ws.binaryType = "arraybuffer"
  ws.onopen = function () {
    self.wsConnect = true // 当ws连接成功时
    // console.log('ws online', initSend)
    ws.send(JSON.stringify(initSend));
    self.$bus.$emit('WS', ws);
  };
  ws.onmessage = function (evt) {
    let raw_data = evt.data;
    let ua = new Uint8Array(raw_data);
    if (ua.length > 0) {
      let json = pako.inflate(ua, {to: "string"});
      let data = JSON.parse(json);
      if (data["ping"]) {
        ws.send(JSON.stringify({"pong": data["ping"]}));
      } else {
        // console.log(data);
        if (data.channel.indexOf('_trade_ticker') !== -1) { // 订阅实时成交信息
          // console.log(data)
          if (data.event_rep === 'rep'){
            // self.bodySelf.trade_ticker = data.data // 获取历史信息
            self.$store.commit("trade_ticker", data.data)
          } else {
            self.bodySelf.trade_ticker.unshift(data.tick.data[0]); // 订阅信息，向开头添加数据
          }
        } else if (data.channel.indexOf('_ticker') !== -1) { // 头部数据
          console.log(data)
          self.ws_ticker = data;
        } else if (data.channel.indexOf('_kline') !== -1) { // 获取K线历史，再获得订阅数据
          // const a = data.channel.indexOf('_kline')
          // const b = data.channel.indexOf('_')
          // const c = data.channel.slice(b + 1, a) // 获取返回的币对
          if (data.data !== null) { // 如果是获取K线历史
            // console.log(data)
            // console.log(data.data)
            self.ws_kline = data.data
            // console.log(data.channel.indexOf('30min'))
            // if (data.channel.indexOf('30min') !== -1) {
            //   console.log('30300303003')
            self.$store.commit('fullKLineData', data)
              self.$store.commit('kLineData', data.data)
            // }
            // self.$chart.kLine('mainKLine', data.data, c)
            // const v = {"event": "sub", "params": {"channel": "market_" + c + "_kline_" + self.timeType, "cb_id": c}} // 订阅
            // self.ws.send(JSON.stringify(v))
            self.$bus.$emit('WS_KLINE_DATA', data);
          } else {
            // console.log(data)
            self.ws_kline.shift()
            self.ws_kline.push(data.tick) // 去头添尾，刷新折线数据
            // console.log(self.ws_kline)
            // self.$chart.line3('mskImg', self.ws_kline)
            // self.$store.commit('kLineUpDate', data)
            // self.$chart.kLine('mainKLine', self.ws_kline, c)
            self.$bus.$emit('KLINE_DATA_SUB', data);
          }
          // self.kLineOption = data;
          // console.log('_kline_')
        } else if (data.channel.indexOf('_depth') !== -1) {  // 深度，左侧的当前委托
          // console.log(data.channel.indexOf(self.selectComparisonValue))
          if (data.channel.indexOf(self.selectComparisonValue) !== -1) {
            // console.log(data.tick)
            // 排序
            // let temp = []
            // for (let i = data.tick.asks.length - 1; i >= 0; i--) {
            //   temp.push(data.tick.asks[i])
            // }
            // data.tick.asks = temp
            // 盘口
            // console.log(data)
            let asksArray = []
            for (let i in data.tick.asks) {
              asksArray.push(data.tick.asks[i][1])
            }
            let buysArray = []
            for (let i in data.tick.buys) {
              buysArray.push(data.tick.buys[i][1])
            }
            self.bodySelf.askMax = Math.max.apply(null, asksArray);
            self.bodySelf.buysMax = Math.max.apply(null, buysArray);
            self.bodySelf.tick = data.tick;
            self.bodySelf.scrollHandicap()
            // console.log(self.bodySelf.askMax)
            // console.log(self.bodySelf.buysMax)
          }
        } else {
          // console.log(data)
          self.bodySelf.comparison = data.data
        }
        // self.data = data;
      }
    }
  };
  return ws
}


