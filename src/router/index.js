import Vue from 'vue'
import Router from 'vue-router'
import iView from "iview";
import userCenter from "./userCenter";
import asset from "./asset";

Vue.use(Router)
Vue.use(iView)
const router = new Router({
  mode: "hash",
  routes: [
    // {
    //     path:'/hello',
    //     name:'hello',
    //     component:()=>import("../components/page/hello")
    // },
    {
      path: '/',
      name: 'index',
      component: () => import("../components/page/index"),
      children: [
        {
          path: '/',
          name: 'home',
          component: () => import("../components/page/home/home")
        },
        {
          path: '/login',
          name: 'login',
          component: () => import("../components/page/login")
        },
        {
          path: '/BithumbAccountNotice',
          name: 'BithumbAccountNotice',
          component: () => import("../components/page/BithumbAccountNotice")
        },
        {
          path: '/loginVerify',
          name: 'loginVerify',
          component: () => import("../components/page/loginVerify")
        },
        {
          path: '/register',
          name: 'register',
          component: () => import("../components/page/register")
        },
        {
          path: '/SNSLogin',
          name: 'SNSLogin',
          component: () => import("../components/page/SNSLogin")
        },
        {
          path: '/forgetpwd',
          name: 'forgetpwd',
          component: () => import("../components/page/forgetPwd")
        },
        {
          path: '/trading',
          name: 'trading',
          component: () => import("../components/page/tranding/index")
        },
        {
          path: '/mining',
          name: 'mining',
          component: () => import("../components/page/tranding/mining")
        },
        {
          path: '/auction',
          name: 'auction',
          component: () => import("../components/page/tranding/auction")
        },
        {
          path: '/tradingInformation',
          name: 'tradingInformation',
          component: () => import("../components/page/tranding/information")
        },
        {
          path: '/auctiondetail',
          name: 'auctiondetail',
          component: () => import("../components/page/tranding/auctionDetail")
        },
        {
          path: '/auctiondetail2',
          name: 'auctiondetail2',
          component: () => import("../components/page/tranding/auctionDetail2")
        },
        {
          path: '/support',
          name: 'support',
          component: () => import("../components/page/support/index")
        },
        {
          path: '/termsofServices',
          name: 'termsofServices',
          component: () => import("../components/page/support/termsofServices")
        },
        {
          path: '/supportnotice',
          name: 'supportnotice',
          component: () => import("../components/page/support/supportNotice")
        },
        {
          path: '/supportnews',
          name: 'supportnews',
          component: () => import("../components/page/support/supportNews")
        },
        {
          path: '/help',
          name: 'help',
          component: () => import("../components/page/support/help")
        },
        {
          path: '/receiptNotification',
          name: 'receiptNotification',
          component: () => import("../components/page/support/receiptNotification")
        },
        {
          path: '/aboutUs',
          name: 'aboutUs',
          component: () => import("../components/page/support/aboutUs")
        },
        {
          path: '/contactUs',
          name: 'contactUs',
          component: () => import("../components/page/support/contactUs")
        },
        {
          path: '/supportContact',
          name: 'supportContact',
          component: () => import("../components/page/support/supportContact")
        },
        {
          path: '/about',
          name: 'about',
          component: () => import("../components/page/about/index")
        },
        userCenter,
        asset
      ]
    },
  ]
})
router.beforeEach((to, from, next) => {
  // console.log(to,from)
  if (!(from.name === 'trading' && to.name === 'trading')) {
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
  }

  // if(window.newVue) {
  //     console.log('clear')
  //     clearInterval(window.newVue.timer)
  //     window.newVue.timer = null
  //     if (window.newVue.wsConn) {
  //         window.newVue.wsConn.close()
  //     }
  // }
  next()
});
export default router;
