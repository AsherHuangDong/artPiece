<template>
  <div>
    <Header></Header>
    <div id="f2">
      <div class="f2N">
        <artistHeader :body-self="this" :selectComparisonValue="selectComparisonValue"
                      :copyrightImg="copyrightImg"
                      :copyrightName="copyrightName"
                      :artist="artist"
                      :rate="rate"
                      :rateLogo="rateLogo"
                      :showCopyright="true"></artistHeader>
        <div id="f3">
          <div class="f3-1" style="margin-right: 16px;">
            <div class="Rectangle-Copy-1">
              <div class="Infromation">{{ $t('auctionDetail.Infromation')}}</div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Term')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.term }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Last__average')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.Last12MonThs ? getTradingCopyrightInformation.information.Last12MonThs : '--' }} AP</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Publishing_date')}}</div>
                <div v-if="getTradingCopyrightInformation.information.publishTime" class="Until-70-years-after">{{ formatData(getTradingCopyrightInformation.information.publishTime) }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Artist')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.Artist }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Composer')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.composer }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Songwriter')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.songwriter }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Arranger')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.arranger }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Trustee')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.trustee }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('auctionDetail.Royalty_distributor')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.information.royaltyDistributor }}</div>
              </div>
            </div>
          </div>
          <div class="f3-1">
            <div class="Rectangle-Copy-1">
              <div class="Infromation">{{ $t('detail.detail')}}</div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.sources')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.sources }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('rightToCopy')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.rightToCopy }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.commercialPerformences')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.commercialPerformences }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.publicTransmissionRight')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.publicTransmissionRight }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.exhibbitionRight')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.exhibbitionRight }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.rightToDistribute')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.rightToDistribute }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.rentalRight')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.rentalRight }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term">{{ $t('detail.secondaryWorkRight')}}</div>
                <div class="Until-70-years-after">{{ getTradingCopyrightInformation.copyrightDetails.secondaryWorkRight }}</div>
              </div>
            </div>
            <div class="Rectangle-Copy-4">
              <div class="Rectangle-Copy-5">
                <div class="Term"> </div>
                <div class="Until-70-years-after"> </div>
              </div>
            </div>
          </div>
        </div>
        <div id="f4">
          <div class="Mask2" id="mask7">
            <img style="z-index: 999;height: 50px;width: 49px;margin: 88px auto 0;display: block;" src="../../../assets/noData2.png"
                 alt />
            <div style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;">{{ $t('NoData')}}</div>
          </div>
          <div class="Mask2" id="mask8">
            <img style="z-index: 999;height: 50px;width: 49px;margin: 88px auto 0;display: block;" src="../../../assets/noData2.png"
                 alt />
            <div style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;">{{ $t('NoData')}}</div>
          </div>
          <div class="Mask2" id="mask9">
            <img style="z-index: 999;height: 50px;width: 49px;margin: 88px auto 0;display: block;" src="../../../assets/noData2.png"
                 alt />
            <div style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;">{{ $t('NoData')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Header from "./header";
  import artistHeader from "./artistHeader";
  import {formatData} from "../../../tool"
  import { createChart } from 'lightweight-charts';

  export default {
    name: 'tradingInformation',
    components: {
      Header,
      artistHeader
    },
    watch: {
      $lang() {
        this.lang = window.newVue.$lang.toString().replace(/-/g, "_")
      }
    },
    computed:{
      timeType: {
        get() {
          return this.$store.state.timeType
        },
        set(n) {
          this.$store.commit('timeType', n)
        }
      },
      rate() {
        const self = this
        let a = ''
        try {
          a = this.publicRate[self.lang][self.buy_unit]
        } catch (e) {
          a = 1
        }
        return a
      },
      rateLogo() {
        if (window.newVue.$lang === 'zh-CN') {
          return 'CNY'
        } else if (window.newVue.$lang === 'ko-KR') {
          return 'KWR'
        } else {
          return 'USD'
        }
      },
    },
    data() {
      return {
        copyrightImg: '',
        copyrightName: '',
        artist: '',
        lang: window.newVue.$lang.toString().replace(/-/g, "_"),
        getTradingCopyrightInformation: {
          copyrightDetails:{},
          information: {}
        },
        buy_unit: sessionStorage.getItem('buy_unit'),
        selectComparisonValue: sessionStorage.getItem('selectComparisonValue'),
        publicRate: {}
      }
    },
    mounted() {
      this.initShowCPY()
      // 获取webapi public_info
      if (sessionStorage.getItem('public_info_v4')) {
        this.publicRate = JSON.parse(sessionStorage.getItem('public_info_v4')).market.rate
      } else {
        this.chainPublic()
      }
      this.$store.commit('changeTradingIndex', 2)
      this.$store.commit('changeNavIndex', 2)
      this.getTradingCopyrightInformation = JSON.parse(sessionStorage.getItem("getTradingCopyrightInformation"))
      // this.$chart.line2('maskTrading')
      // console.log(this.getTradingCopyrightInformation.graphical.blinedOne)
      // console.log(this.getTradingCopyrightInformation.graphical.blinedOne[0].copyrightChartDataList)
      // this.mask7()
      if (this.getTradingCopyrightInformation.graphical.blinedOne.length !== 0) {
        this.$chart.line2('mask7', this.getTradingCopyrightInformation.graphical.blinedOne)
      }
      if (this.getTradingCopyrightInformation.graphical.cGraph.length !== 0) {
        this.$chart.bar1('mask9', this.getTradingCopyrightInformation.graphical.cGraph)
      }
      if (this.getTradingCopyrightInformation.graphical.blinedTwo.length !== 0) {
        this.$chart.line2('mask8', this.getTradingCopyrightInformation.graphical.blinedTwo)
      }
      // this.listNew()
    },
    methods: {
      // 画mask7, 由于light-chart横轴只能是时间，所以先不用
      mask7() {
          this.chart = createChart(document.getElementById('mask7'), {
            width: 384,
            height: 264,
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
          this.areaSeries = this.chart.addAreaSeries({
            topColor: 'rgba(233, 16, 169, 0.35)',
            bottomColor: 'rgba(233, 16, 169, 0)',
            lineColor: 'rgba(244, 73, 109, 1)',
            lineWidth: 2,
          });
          this.areaSeries.applyOptions({
            priceLineVisible: false,
          });
          let data = []
          for (let i in this.getTradingCopyrightInformation.graphical.blinedOne[0].copyrightChartDataList) {
            let tmp = {
              time: this.getTradingCopyrightInformation.graphical.blinedOne[0].copyrightChartDataList[i].xData,
              value: this.getTradingCopyrightInformation.graphical.blinedOne[0].copyrightChartDataList[i].yData
            }
            data.push(tmp)
          }
          // console.log(data)
          this.areaSeries.setData(data);
      },
      // 显示版权图片、艺术家、 歌曲名
      initShowCPY() {
        let a = null
        if(sessionStorage.getItem('getTradingCopyrightInformation')){
          a = JSON.parse(sessionStorage.getItem('getTradingCopyrightInformation'))
          this.copyrightImg = a.copyright.copyrightImg
          this.copyrightName = a.copyright.copyrightName
          this.artist = a.copyright.artist
        }
      },
      // webapi公共接口，用于获取汇率、交易对列表
      chainPublic() {
        this.$post(window.selfConfig.chainUrl + '/common/public_info_v4').then(res => {
          this.publicRate = res.data.market.rate
          sessionStorage.setItem('public_info_v4', JSON.stringify(res.data))
        })
      },
      formatData(n) {
        return formatData(n)
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
  }

  #f2 {
    min-width: 1216px;
    background-color: #e3e8ee;
    padding-top: 16px;
  }

  .f2N {
    padding: 32px 0;
    margin: 0 auto;
    width: 1216px;
  }

  .Mask {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 1216px;
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
    width: 100%;
    height: 32px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    color: #32325d;
  }

  .mask-3 {
    margin-right: 33px;
    width: 122px;
    position: relative;
  }

  .-KRW-Copy-3 {
    position: absolute;
    bottom: -16px;
    width: auto;
    height: 16px;
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
    background-color: #f4496d;
  }

  .mskImg {
    position: absolute;
    right: 0;
    width: 488px;
    height: 104px;
    background-color: #bbb;
  }

  #f3 {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    width: 100%;
    margin-top: 32px;
  }

  .f3-1 {
    display: inline-block;
    width: 592px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .Rectangle-Copy-1 {
    width: 590px;
    height: 40px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
    background-color: #ffffff;
  }

  .Infromation {
    padding: 8px 16px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .Rectangle-Copy-4 {
    width: 590px;
    border-radius: 2px;
    background-color: #f7f9fc;
  }

  .Rectangle-Copy-5 {
    display: flex;
    justify-content: space-between;
    padding: 6px 16px;
    width: 590px;
    height: 32px;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
  }

  .Term {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Until-70-years-after {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #32325d;
  }

  #f4 {
    margin-top: 32px;
    min-width: 1216px;
    display: flex;
    justify-content: space-between;
  }

  .Mask2 {
    width: 384px;
    height: 264px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #fff;
  }
</style>
