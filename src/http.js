import axios from 'axios'
// import iView from 'iview'

let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
window.myLocationHref = window.location.search.substr(1).match(reg);
axios.defaults.baseURL = window.myLocationHref

axios.interceptors.request.use(config => {
  // 如果有token 那么我们要带上token请求
  config.headers["exchange-token"] = localStorage.token;
  config.headers["exchange-language"] = window.newVue.$lang.toString().replace(/-/g, "_")
  if (config.url.indexOf('webapi') === -1) {
    // web端登录为1
    config.headers["login-type"] = 1;
    config.headers["timeZone"] = window.Intl.DateTimeFormat().resolvedOptions().timeZone
    config.headers["language"] = window.newVue.$lang.toString().replace(/-/g, "_")
  }
  return config;
}, error => Promise.reject(error));
// 响应拦截器
const RejectRouter = ['/asset', '/account']
axios.interceptors.response.use(
  response => {
    try {
      // 判断是否是1001
      if (response.data.code === 10001) {
        response.data.msg = window.newVue.$t('System_exception')
      } else if (response.data.code === 0) {
        response.data.msg = window.newVue.$t('success')
      }
      // 验证token
      if ((response.data.msg).indexOf('token') !== -1) {
        // 由于存在token在后端失效的情况，所以检查token错误肯定能验证用户是否登录
        // 比如用户登录了但是过了几分钟没有操作，此时浏览器的缓存是显示用户处于登录状态，但后端token已经失效
        // noTokenSkipToLogin === 1 可以提示token

        if (localStorage.getItem('noTokenSkipToLogin') !== '0') {
          window.newVue.$store.commit('isSign', '0')
          window.newVue.$store.commit('setAp', 0)
          window.newVue.$store.commit('setUserEmail', '')
          console.log(window.location.hash)
          for (let i in RejectRouter) {
            if (window.location.hash.indexOf(RejectRouter[i]) !== -1) {
              localStorage.clear()
              window.location.hash = '#/'
              localStorage.setItem('isSign', '0')
              setTimeout(() => {
                localStorage.setItem('noTokenSkipToLogin', '1')
              }, 5000) // 5秒后才能弹出提示token失效
              window.newVue.$Notice.error({
                title: window.newVue.$t('request.pleaseLogin')
              });
              localStorage.setItem('noTokenSkipToLogin', '0')
            }
          }
        }
      }
    } catch (e) {
      return response.data
    }
    return response.data
  },
)

// axios.post 请求

/* eslint-disable */
export const $post = async (path, data = {}) => await axios.post(path, data);

// axios.get 请求

/* eslint-disable */
export const $get = async (path, params = {}) => await axios.get(path, {
  params
});
/*  */
export const $posts = async (path, data = {}) => await axios.post(path, data, {
  headers: {
    'content-type': 'application/x-www-form-urlencoded'
  }
});
