<template>
  <div>
    <Header></Header>
    <Nav></Nav>
    <router-view/>
    <Footer></Footer>
  </div>
</template>
<script>
  import Header from '../public/header'
  import Nav from '../public/nav'
  import Footer from '../public/footer'

  export default {
    components: {
      Header,
      Nav,
      Footer
    },
    beforeRouteEnter(to, from, next) {
      let count = 0
      let comparisonData = []
      // webapi公共接口，用于获取汇率、交易对列表
      window.newVue.$post(window.selfConfig.chainUrl + '/common/public_info_v4').then(res => {
        sessionStorage.setItem('public_info_v4', JSON.stringify(res.data))
        count ++
        if (count === 4) {
          setTimeout(() => {
            next()
          }, 1)
        }
      })
      // 在进入页面之前，先获取一个交易区的币对信息，以免新用户登录时没有数据信息，在交易页面拿不到值而报错
      // 版权交易区 3
      // 数字货币交易区 4
      // 平台交易区 5
      let form = new FormData()
      form.append('tradingArea', '3')
      window.newVue.$post('/api/copyright/getTransactionSymbol', form).then(res => {
        comparisonData.push.apply(comparisonData, res.data)
        sessionStorage.setItem('comparisonData', JSON.stringify(comparisonData))
        count ++
        if (count === 4) {
          setTimeout(() => {
            next()
          }, 1)
        }
      })
      let form2 = new FormData()
      form2.append('tradingArea', '4')
      window.newVue.$post('/api/copyright/getTransactionSymbol', form2).then(res => {
        comparisonData.push.apply(comparisonData, res.data)
        sessionStorage.setItem('comparisonData', JSON.stringify(comparisonData))
        count ++
        if (count === 4) {
          setTimeout(() => {
            next()
          }, 1)
        }
      })
      let form3 = new FormData()
      form3.append('tradingArea', '5')
      window.newVue.$post('/api/copyright/getTransactionSymbol', form3).then(res => {
        comparisonData.push.apply(comparisonData, res.data)
        sessionStorage.setItem('comparisonData', JSON.stringify(comparisonData))
        count ++
        if (count === 4) {
          setTimeout(() => {
            next()
          }, 1)
        }
      })
    },
    mounted() {
      this.isBithumb()
    },
    methods: {
      // 判断用户是不是bithumb用户
      isBithumb() {
        this.$post('/api/user/isBithumb').then(res => {
          this.$store.commit('isBithumb', res.data)
        })
      }
    }
  }
</script>
<style>
  .ivu-page-item-active a {
    color: #565abf !important;
  }
  .ivu-page-item a{
    color: #32325d;
    font-size: 14px;
    font-family: CircularStd;
  }
  body {
    font-family: CircularStd;
    padding: 0 !important;
    overflow-x: visible !important;
    overflow-y: scroll;
  }
</style>
