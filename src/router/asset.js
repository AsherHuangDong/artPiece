export default {
  path:'/asset',
  name:'asset',
  redirect: '/asset',
  component:()=>import("../components/page/asset/asset"),
  children: [
    {
      path:'/asset',
      name:'asset',
      component:()=>import("../components/page/asset/index")
    },
    {
      path:'/asset/deposit',
      name:'deposit',
      component:()=>import("../components/page/asset/deposit")
    },
    {
      path:'/asset/withdraw',
      name:'withdraw',
      component:()=>import("../components/page/asset/withdraw")
    },
    {
      path:'/asset/order',
      name:'assetOrder',
      component:()=>import("../components/page/asset/order")
    },
    {
      path:'/asset/bithumbAssets',
      name:'bithumbAssets',
      component:()=>import("../components/page/asset/bithumbAssets")
    },
    {
      path:'/asset/bithumbWithdraw',
      name:'bithumbWithdraw',
      component:()=>import("../components/page/asset/bithumbWithdraw")
    }
  ]
}
