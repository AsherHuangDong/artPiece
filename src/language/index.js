/**
 * 引入vue-i18n
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n';
Vue.use(VueI18n);

/**
 * 导入iview自带语言包
 */
import zh from 'iview/dist/locale/zh-CN';
import en from 'iview/dist/locale/en-US';
import ko from 'iview/dist/locale/ko-KR';

/**
 * 导入APP json语言包
 */
import app_zh from './zh-CN.json'
import app_en from './en-US.json';
import app_ko from './ko-KR.json';

/**
 * 多语言配置
 * Object.assign(zh,app_zh)
 * zh       : iview 语言包
 * app_zh   : App json语言包
 */
Vue.locale('zh-CN',Object.assign(zh,app_zh))
Vue.locale('en-US',Object.assign(en,app_en))
Vue.locale('ko-KR',Object.assign(ko,app_ko))

// 自动设置语言
// 获取本机系统语言
const navLang = navigator.language;

// const localLang = (navLang === 'zh-CN' || navLang === 'en-US') ? navLang : false;
/**
 * localStorage.getItem(key):获取指定key本地存储的值
 * localStorage.setItem(key,value)：将value存储到key字段
 * localStorage.removeItem(key):删除指定key本地存储的值
 */


//配置默认语言
if (localStorage.getItem('navLang')) {
  Vue.config.lang = localStorage.getItem('navLang')
} else {
  Vue.config.lang = navLang
}
// Vue.config.lang = 'zh-CN'; // 默认为中文
// Vue.config.lang = 'en-US';  // 默认为英文
// Vue.config.lang = 'ko-KR';  // 默认为韩语
// Vue.config.lang = lang;
export default{}
