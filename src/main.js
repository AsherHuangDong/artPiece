import Vue from 'vue'
import { VueReCaptcha } from 'vue-recaptcha-v3'
import App from './App.vue'
import router from './router'
import { $get, $post, $posts } from './http'
import iView from 'iview';
import '@/assets/css/reset.css'
import 'iview/dist/styles/iview.css';
import vueSwiper from 'vue-awesome-swiper'
import myCharts from './assets/js/echar.js'
import './language/index'
import selfConfig from "./selfConfig"
import bus from '@/bus'
Vue.use(myCharts)
import 'swiper/dist/css/swiper.css'
Vue.use(vueSwiper);
import store from './store/index'
import USCountry from './language/country/en-US'
import CNCountry from './language/country/zh-CN'
import KOCountry from './language/country/ko-KR'
Vue.use(iView)
// https://www.jianshu.com/p/9e0b9e8229da 如何使用V3验证
Vue.use(VueReCaptcha, { siteKey: '6Lcd7soUAAAAAK2wjNMziMY9_A1XZyJZnQJa-j3P',loaderOptions :{
  useRecaptchaNet:true,
  autoHideBadge:true
}})
Vue.config.productionTip = false
// Vue.prototype.$ = $
Vue.prototype.$get = $get
Vue.prototype.$post = $post
Vue.prototype.$posts = $posts
Vue.prototype.$selfConfig = selfConfig
Vue.prototype.$bus = bus
window.newVue = new Vue({
  store,
  render: h => h(App),
  router
}).$mount('#app')
window.newVue.en_US = USCountry
window.newVue.zh_CN = CNCountry
window.newVue.ko_KR = KOCountry
