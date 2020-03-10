import vuex from "vuex"
import vue from "vue"

vue.use(vuex)
const state = {
  isBithumb: 0,
  timeType: '30min',
  kLineFresh: true,
  kLineData: [],
  fullKLineData: {},
  oldKlineData: [],
  fulloOldKLineData: {},
  kLineUpDate: {},
  trade_ticker: [], // 交易页面左侧成交历史
  isSign: localStorage.getItem('isSign'), // 是否登录中 0：未登录   1：以登录
  userEmail: '', // 页面头部显示的邮箱
  canClickInfo: false, // 在交易页是否可以点击information
  ap: 0, // 用户当前资产AP
  lockAp: 0, // 当前用户lockAp
  navIndex: 1,
  tradingIndex: 0,
  rate: 0
}
const mutations = {
  isBithumb(state, val) {
    state.isBithumb = val
  },
  fulloOldKLineData(state, val) {
    state.fulloOldKLineData = val
  },
  oldKlineData(state, val) {
    state.oldKlineData = val
  },
  fullKLineData(state, val) {
    state.fullKLineData = val
  },
  timeType(state, val) {
    // console.log(val)
    state.timeType = val
  },
  kLineUpDate(state, val) {
    state.kLineUpDate = val
  },
  kLineData(state, val) {
    if (state.kLineFresh) {
      state.kLineData = val
      state.kLineFresh = false
      setTimeout(() => {
        state.kLineFresh = true
      }, 100)
    }
  },
  trade_ticker(state, val) {
    sessionStorage.setItem('trade_ticker', JSON.stringify(val))
    state.trade_ticker = val
  },
  isSign(state, val) {
    localStorage.setItem('isSign', val)
    state.isSign = val
  },
  setUserEmail(state, val) {
    state.userEmail = val
  },
  setCanClickInfo(state, val) {
    state.canClickInfo = val
  },
  setAp(state, val) {
    state.ap = val
  },
  setLockAp(state, val) {
    state.lockAp = val
  },
  changeNavIndex(state, val) {
    state.navIndex = val
  },
  changeTradingIndex(state, val) {
    // console.log(val)
    state.tradingIndex = val
  },
  changeRate(state, val) {
    state.rate = val
  },
}
const getters = {
  trade_ticker(state) {
    state.trade_ticker = JSON.parse(sessionStorage.getItem('trade_ticker'))
    return state.trade_ticker
  },
  isSign(state) {
    state.isSign = localStorage.getItem('isSign')
    return state.isSign
  },
  getShowPersonalData: state => {
    return state.showPersonalData
  }
}
export default new vuex.Store({
  state,
  mutations,
  getters
});
