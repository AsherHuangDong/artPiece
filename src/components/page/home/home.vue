<template>
  <div id="home" class="home">
    <h3 style="position: relative;height:144px;">
      {{ $t('home.title1') }}
      <div style="position: absolute;right: -370px;top:-100px;z-index: -1;">
        <img src="../../../assets/bg1.png" alt />
      </div>
      <div style="position: absolute;right: 146px;top:29px;z-index: -1;">
        <img src="../../../assets/bg2.png" alt />
      </div>
      <div style="position: absolute;left: -438px;top:104px;z-index: -1;">
        <img src="../../../assets/bg3.png" alt />
      </div>
    </h3>
    <!--    轮播图-->
    <div class="banner" v-if="swiper.length">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(item, index) in swiper" :key="index">
          <div :myClick="JSON.stringify(item)">
            <div style="width:280px;height:280px;">
              <img style="width:100%;height:100%;object-fit: cover;" :src="item.bannerImgUrl" alt />
            </div>
            <div class="Fire">{{ item.bannerTittle }}</div>
            <div class="Artist-name">{{item.bannerSubtitle}}</div>
          </div>
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div id="prev" class="swiper-button-prev" slot="button-prev"></div>
        <div id="next" class="swiper-button-next" slot="button-next"></div>
      </swiper>
      <div @click="prev" class="swiper-button-prev"></div>
      <div @click="next" class="swiper-button-next"></div>
    </div>
    <div style="height: 347px;width: 1216px;margin-top: 105px;" v-if="!swiper.length">
    </div>
    <!--    版权列表-->
    <div class="mk">
      <div class="Rectangle-Copy-4" style="padding: 0 16px;">
        <div style="padding: 0 8px;display: inline-block">
          <div
            @click="selectList = 1"
            class="title"
            :class="selectList === 1 ? 'active' : ''"
          >{{$t('copyright')}}</div>
        </div>
<!--        <div style="padding: 0 8px;display: inline-block">-->
<!--          <div-->
<!--            @click="selectList = 2"-->
<!--            class="title"-->
<!--            :class="selectList === 2 ? 'active' : ''"-->
<!--          >{{$t('shuzihuobi')}}</div>-->
<!--        </div>-->
      </div>
<!--      版权-->
      <div v-if="selectList === 1">
        <div class="Rectangle-Copy-42">
          <div style="width: 24px;text-align: center;margin-right: 22px;">
            <img src="../../../assets/start2T.png" alt style="height: 18px;width: 18px;" />
          </div>
          <div style="width: 210px;text-align: left">{{$t('copyright')}}</div>
          <div style="width: 200px;text-align: right">{{$t('price')}}</div>
          <div style="width: 200px;text-align: right">{{$t('increase')}}</div>
          <div style="width: 154px;text-align: right">{{$t('amount')}}</div>
          <div style="width: 366px;text-align: right">{{$t('oneProfit')}}</div>
        </div>
        <div
          @click="clickCopyright(item, item.newcoinFlag)"
          class="Rectangle-Copy-43"
          v-for="(item, index) in copyRightList"
          :key="index"
        >
          <div style="width: 24px;text-align: center;margin-right: 22px;">
            <img
              @click.stop="star(item)"
              v-if="item.isStar !== 1"
              src="../../../assets/start2F.png"
              alt
              style="height: 18px;width: 18px;"
            />
            <img
              @click.stop="star(item)"
              v-if="item.isStar === 1"
              src="../../../assets/start2T.png"
              alt
              style="height: 18px;width: 18px;"
            />
          </div>
          <div
            style="width: 210px;text-align: left;display: flex;justify-content: flex-start;align-items: center;"
          >
            <img :src="item.image" alt style="height: 40px;width: 40px;" />
            <div class="AP" style="margin-left: 8px;">{{ item.base }}</div>
            <div class="new" v-if="index === 0">NEW</div>
          </div>
          <div style="width: 200px;text-align: center">
            <div class="AP">{{ item.close }} {{ item.quote}}</div>
            <div class="krw">{{publicRate[lang][item.quote] * item.close}} {{rateLogo}}</div>
          </div>
          <div style="width: 200px;text-align: right">
            <div :class="item.rose >= 0 ? 'increase' : 'down'">{{item.rose>=0?"+":""}}{{ (item.rose * 100).toFixed(2) }}%</div>
          </div>
          <div style="width: 154px;text-align: right">
            <div class="AP">{{ item.vol }}{{ item.quote }}</div>
            <div class="krw">{{publicRate[lang][item.quote] * item.vol }} {{rateLogo}}</div>
          </div>
          <div style="width: 350px;text-align: right">
            <div
              class="AP"
            >{{ !item.lastMonthProfitPerPiece ? 0 : item.lastMonthProfitPerPiece }} {{ item.quote}}</div>
            <div class="krw">
              {{ publicRate[lang][item.quote] * (!item.lastMonthProfitPerPiece ? 0 : item.lastMonthProfitPerPiece) }}
              {{rateLogo}}
            </div>
          </div>
        </div>
        <div style="text-align: right;margin-right: 25px;margin-top: 8px;">
          <Button
            style="min-width: 77px;"
            @click="toTrading(3)"
            class="login-body-loginBtn"
          >{{ $t('more') }}</Button>
        </div>
      </div>
<!--      数字货币-->
      <div v-if="selectList === 2">
        <div class="Rectangle-Copy-42">
          <div style="width: 24px;text-align: center;margin-right: 22px;">
            <img src="../../../assets/start2T.png" alt style="height: 18px;width: 18px;" />
          </div>
          <div style="width: 210px;text-align: left">{{$t('shuzihuobi')}}</div>
          <div style="width: 200px;text-align: right">{{$t('price')}}</div>
          <div style="width: 200px;text-align: right">{{$t('increase')}}</div>
          <div style="width: 154px;text-align: right">{{$t('amount')}}</div>
          <div style="width: 366px;text-align: right">{{$t('market_value')}}</div>
        </div>
        <div
          @click="clickCopyright(item, 4)"
          class="Rectangle-Copy-43"
          v-for="(item, index) in auctionList"
          :key="index"
        >
          <div style="width: 24px;text-align: center;margin-right: 22px;">
            <img
              @click.stop="star(item)"
              v-if="item.isStar !== 1"
              src="../../../assets/start2F.png"
              alt
              style="height: 18px;width: 18px;"
            />
            <img
              @click.stop="star(item)"
              v-if="item.isStar === 1"
              src="../../../assets/start2T.png"
              alt
              style="height: 18px;width: 18px;"
            />
          </div>
          <div
            style="width: 210px;text-align: left;display: flex;justify-content: flex-start;align-items: center;"
          >
            <div class="AP" style="">{{ item.symbol }}</div>
          </div>
          <div style="width: 200px;text-align: center">
            <div class="AP">{{ item.close }} {{ item.quote}}</div>
            <div class="krw">{{publicRate[lang][item.quote] * item.close}} {{rateLogo}}</div>
          </div>
          <div style="width: 200px;text-align: right">
            <div :class="item.rose > 0 ? 'increase' : 'down'">{{item.rose>0?"+":""}}{{ (item.rose * 100).toFixed(2) }}%</div>
          </div>
          <div style="width: 154px;text-align: right">
            <div class="AP">{{ item.vol }}{{ item.quote }}</div>
            <div class="krw">{{publicRate[lang][item.quote] * item.vol }} {{rateLogo}}</div>
          </div>
          <div style="width: 366px;text-align: right">
            <div class="AP">{{ publicRate[lang][item.quote] * item.amount }} {{rateLogo}}</div>
          </div>
        </div>
        <div style="text-align: right;margin-right: 25px;margin-top: 8px;">
          <Button
            style="min-width: 77px;"
            @click="toTrading(4)"
            class="login-body-loginBtn"
          >{{ $t('more') }}</Button>
        </div>
      </div>
    </div>
    <!--    国家-->
    <div class="country">
      <div class="country-1" v-for="(item, index) in country" :key="index">
        <div class="country-1-1">
          <img @click="enterCountry(item)" class="countryImg" :src="item.url" alt />
        </div>
        <div class="country-1-2"></div>
        <div class="country-1-3"></div>
        <div class="country-1-4">
          <div class="countryText">
            <img :src="item.iconUrl" alt />
            {{ item.countryName }}
          </div>
        </div>
      </div>
    </div>
    <div class="noticeF" :style="{width: w + 'px', marginLeft: ((1216 - w) / 2) + 'px'}">
      <div style="width:1216px;margin: 0 auto;padding-bottom: 80px;">
        <!--        通知-->
        <div style="height: 1px;width:100%;"></div>
        <div class="Notice">{{ $t('home.Notice') }}</div>
        <div class="noticeDiv">
          <div
            v-for="(item, index) in notice"
            :key="index"
            class="noticeItem"
          >
            <div class="itemDate">{{ item.createTime }}</div>
            <div @click="toReadMoreNotice(item)" class="itemContent pointer">{{item.title}}</div>
<!--            <div v-html="item.body" class="itemContent"></div>-->
          </div>
        </div>
        <Button @click="toReadMoreNotice2" class="Field">{{ $t('home.Read_more') }}</Button>
        <!--        新闻-->
        <div class="News">{{ $t('home.News') }}</div>
        <div class="newsContent">
          <div v-for="(item, index) in news" :key="index">
            <div class="newsItem" :style="{ marginRight: (index + 1) % 4 === 0 ? '0' : '32px'}">
              <div class="Rectangle">
                <img :src="item.img" alt />
              </div>
              <div class="White-House-Weighs-L">{{item.title}}</div>
              <div class="Read-more pointer" @click="toReadMoreNews(item)">{{ $t('home.Read_more') }}</div>
            </div>
          </div>
        </div>
        <Button @click="toReadMoreNews2" class="Field">{{ $t('home.Read_more') }}</Button>
      </div>
    </div>
    <FailedModal :show="failedShow" :text="failedText1" :text2="failedText2" />
  </div>
</template>
<script>
// import { createChart } from 'lightweight-charts';
import pako from "pako";
import FailedModal from "../../modal/FailedModal";
export default {
  components: { FailedModal },
  data() {
    return {
      failedShow: false,
      failedText1: '',
      failedText2: '',
      auctionList: [],
      transactionShowParam: {
        page: 1,
        pageSize: 6
      },
      selectList: 1,
      copyRightList: [],
      selectOrder: 1,
      notice: [],
      country: [],
      swiper: [],
      news: [],
      w: 0,
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 30,
        slidesPerGroup: 4,
        loop: true,
        autoplay: {
          delay: 5000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        on: {
          click(item) {
            let a = JSON.parse(item.path[2].getAttribute("myClick")).url;
            console.log(a);
            if (a.indexOf("http") === -1) {
              window.open("https://" + a);
            } else {
              window.open(a);
            }
          }
        },
        loopFillGroupWithBlank: true,
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev"
        }
      },
      wsCon: null,
      wsCon2: null,
      publicRate: JSON.parse(sessionStorage.getItem('public_info_v4')).market.rate,
      lang: window.newVue.$lang.toString().replace(/-/g, "_")
    };
  },
  mounted() {
    const self = this;
    this.$store.commit("changeNavIndex", -1);
    // 设置 noticeF DIV的宽度
    this.w =
      document.documentElement.clientWidth < 1216
        ? 1216
        : document.documentElement.clientWidth;
    window.onresize = function() {
      self.w =
        document.documentElement.clientWidth < 1216
          ? 1216
          : document.documentElement.clientWidth;
    };
    this.homePage();
    // this.getCopyrightByCountryIdOrArtistList()
    this.transactionShow(1);
    this.transactionShow(2);
    // this.chainPublic();
    // this.homeWs();
  },
  computed: {
    rateLogo() {
      if (window.newVue.$lang === "zh-CN") {
        return "CNY";
      } else if (window.newVue.$lang === "ko-KR") {
        return "KWR";
      } else {
        return "USD";
      }
    }
  },
  watch: {
    $lang(n) {
      this.homePage(n);
      this.lang = window.newVue.$lang.toString().replace(/-/g, "_");
      this.homePage()
    }
  },
  beforeDestroy() {
    this.wsCon.close();
    this.wsCon2.close();
  },
  methods: {
    // 点击星星收藏
    star(value) {
      let form = new FormData();
      form.append("symbol", value.symbol);
      this.$post("/api/copyright/stars", form).then(res => {
        if (res.code === 0) {
          if (value.isStar === 1) {
            value.isStar = 0;
          } else {
            value.isStar = 1;
          }
        } else {
          this.failedText2 = res.msg
          this.failedText1 = this.$t('collectionFailed')
          this.failedShow = true
          setTimeout(() => {
            this.failedShow = false
          }, 1500)
        }
      });
    },
    toTrading(zone) {
      this.$router.push({ name: "trading", query: { zone: zone } });
    },
    // ws发送事件及初始化
    sendMsg(symbol) {
      for (let i = 0; i < symbol.length; i++) {
        let initSend = {
          event: "sub",
          params: {
            channel: "market_" + symbol[i] + "_ticker",
            cb_id: symbol[i]
          }
        };
        this.wsCon.send(JSON.stringify(initSend));
      }
    },
    test1(symbol) {
      const self = this;
      self.wsCon = new WebSocket(window.selfConfig.wsUrl);
      self.wsCon.binaryType = "arraybuffer";
      self.wsCon.onopen = function() {
        for (let i = 0; i < symbol.length; i++) {
          let initSend = {
            event: "sub",
            params: {
              channel: "market_" + symbol[i] + "_ticker",
              cb_id: symbol[i]
            }
          };
          self.wsCon.send(JSON.stringify(initSend));
        }
      };
      self.wsCon.onmessage = function(evt) {
        let raw_data = evt.data;
        let ua = new Uint8Array(raw_data);
        if (ua.length > 0) {
          let json = pako.inflate(ua, { to: "string" });
          let data = JSON.parse(json);
          if (data["ping"]) {
            self.wsCon.send(JSON.stringify({ pong: data["ping"] }));
          } else {
            // console.log(data)
            const a = data.channel.indexOf("_ticker");
            const b = data.channel.indexOf("_");
            const c = data.channel.slice(b + 1, a); // 获取返回的币对
            for (let i in self.copyRightList) {
              if (self.copyRightList[i].symbol === c) {
                // console.log(c + '**')
                self.copyRightList[i].rose = data.tick.rose;
                self.copyRightList[i].close = data.tick.close;
                self.copyRightList[i].amount = data.tick.amount;
                self.copyRightList[i].vol = data.tick.vol;
                break;
              }
            }
          }
        }
      };
    },
    test2(symbol) {
      const self = this;
      self.wsCon2 = new WebSocket(window.selfConfig.wsUrl);
      // self.wsCon2 = new WebSocket('wss://ws.chaindown.com/kline-api/ws')
      self.wsCon2.binaryType = "arraybuffer";
      self.wsCon2.onopen = function() {
        for (let i = 0; i < symbol.length; i++) {
          let initSend = {
            event: "sub",
            params: {
              channel: "market_" + symbol[i] + "_ticker",
              cb_id: symbol[i]
            }
          };
          self.wsCon2.send(JSON.stringify(initSend));
        }
      };
      self.wsCon2.onmessage = function(evt) {
        let raw_data = evt.data;
        let ua = new Uint8Array(raw_data);
        if (ua.length > 0) {
          let json = pako.inflate(ua, { to: "string" });
          let data = JSON.parse(json);
          if (data["ping"]) {
            self.wsCon2.send(JSON.stringify({ pong: data["ping"] }));
          } else {
            // console.log(data)
            const a = data.channel.indexOf("_ticker");
            const b = data.channel.indexOf("_");
            const c = data.channel.slice(b + 1, a); // 获取返回的币对
            for (let i in self.auctionList) {
              if (self.auctionList[i].symbol === c) {
                // console.log(c + '**' + data)
                self.auctionList[i].rose = data.tick.rose;
                self.auctionList[i].close = data.tick.close;
                self.auctionList[i].amount = data.tick.amount;
                self.auctionList[i].vol = data.tick.vol;
                break;
              }
            }
          }
        }
      };
    },
    // 点击版权列表的某一项
    clickCopyright(item, zone) {
      console.log(item);
      sessionStorage.setItem("selectComparisonValue", item.symbol);
      this.$router.push({
        name: "trading",
        query: {
          symbol: item.symbol,
          quote: item.quote,
          base: item.base,
          zone: zone
        },
        params: { handlingFee: item.handlingFee }
      });
    },
    // 点击国家图片，跳到该国家下所有版权信息
    enterCountry(item) {
      this.$router.push({ path: "/auction", query: { country: item.id } });
    },
    toReadMoreNews(item) {
      window.open(item.html_url, "_blank")
    },
    toReadMoreNews2() {
      switch (this.$lang) {
        case 'en-US':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007174194-Important-news', "_blank")
          break
        case 'zh-CN':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007174194-Important-news', "_blank")
          break
        case 'ko-KR':
          window.open('https://artpiecehelp.zendesk.com/hc/ko/sections/360007174194-Important-news', "_blank")
          break
      }
    },
    toReadMoreNotice(item) {
      window.open(item.html_url, "_blank")
    },
    toReadMoreNotice2() {
      console.log('in2')
      switch (this.$lang) {
        case 'en-US':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
          break
        case 'zh-CN':
          window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
          break
        case 'ko-KR':
          window.open('https://artpiecehelp.zendesk.com/hc/ko/sections/360007210593-Important-Notice', "_blank")
          break
      }
    },
    // 创建ws,用于两个首页的列表获取涨跌幅等信息，测试用
    homeWs() {
      // let ws = new WebSocket('wss://ws.chaindown.com/kline-api/ws')
      let ws = new WebSocket(window.selfConfig.wsUrl);
      ws.binaryType = "arraybuffer";
      ws.onopen = function() {
        // 当ws连接成功时
        // console.log('ws online', initSend)
        // 订阅24小时行情，返回数据包含涨幅
        // const a = {"event":"sub","params":{"channel":"market_ethbtc_ticker","cb_id":"ethbtc"}}
        // const a = {"event":"sub","params":{"channel":"market_测试AP_ticker","cb_id":"测试AP"}}
        const a = { event: "req", params: { channel: "review" } };
        ws.send(JSON.stringify(a));
      };
      ws.onmessage = function(evt) {
        let raw_data = evt.data;
        let ua = new Uint8Array(raw_data);
        if (ua.length > 0) {
          let json = pako.inflate(ua, { to: "string" });
          let data = JSON.parse(json);
          console.log('{"event":"req","params":{"channel":"review"}}');
          console.log(data);
          if (data["ping"]) {
            ws.send(JSON.stringify({ pong: data["ping"] }));
          }
        }
      };
    },
    // 获取首页表格
    transactionShow(n) {
      let form = new FormData();
      for (let i in this.transactionShowParam) {
        form.append(i, this.transactionShowParam[i]);
      }
      form.append("type", n);
      this.$post("/api/copyright/transactionShow", form).then(res => {
        if (n === 1) {
          const a = res.data.length;
          if (a > 6) {
            res.data = res.data.slice(0, 6);
          }
          this.copyRightList = res.data;
          let tmp1 = [];
          for (let i in this.copyRightList) {
            this.copyRightList[i].rose = 0;
            this.copyRightList[i].close = 0;
            this.copyRightList[i].vol = 0;
            this.copyRightList[i].amount = 0;
            tmp1.push(this.copyRightList[i].symbol);
          }
          this.copyRightList = JSON.parse(JSON.stringify(this.copyRightList));
          this.test1(tmp1);
        } else {
          const a = res.data.length;
          if (a > 6) {
            res.data = res.data.slice(0, 6);
          }
          this.auctionList = res.data;
          let tmp1 = [];
          for (let i in this.auctionList) {
            this.auctionList[i].rose = 0;
            this.auctionList[i].close = 0;
            this.auctionList[i].vol = 0;
            this.auctionList[i].amount = 0;
            tmp1.push(this.auctionList[i].symbol);
          }
          this.auctionList = JSON.parse(JSON.stringify(this.auctionList));
          this.test2(tmp1);
        }
      });
    },
    orderSelect(value) {
      this.listNewParams.page = 1;
      this.selectOrder = value;
      value === 1 ? this.listNew() : this.entrustHistory();
    },
    homePage() {
      let form = new FormData();
      form.append("bannerCurrpage", "1");
      form.append("bannerPageSize", "16");
      form.append("countryCurrpage", "1");
      form.append("countryPageSize", "16");
      form.append('language', window.newVue.$lang.toString().toLowerCase())
      // window.newVue._$lang.lang == "zh-CN"
      //   ? form.append("language", 1)
      //   : window.newVue._$lang.lang == "en-US"
      //   ? form.append("language", 3)
      //   : window.newVue._$lang.lang == "ko-KR"
      //   ? form.append("language", 4)
      //   : "";
      this.$post("/api/homeNotLog/homePage", form).then(res => {
        console.log(res);
        this.swiper = res.data[0].records;
        this.country = res.data[1];
        localStorage.setItem("countryArray", JSON.stringify(res.data[1]));
        // this.notice = res.data[2].records;
        // for (let i = 0; i < this.notice.length; i++) {
        //   let time = "";
        //   time += this.notice[i].createTime[0] + "-";
        //   time += this.notice[i].createTime[1] + "-";
        //   time += this.notice[i].createTime[2] + " ";
        //   this.notice[i].createTime = time;
        // }
        this.notice = res.data[2]
        for (let i = 0; i < this.notice.length; i++) {
          this.notice[i].createTime = (this.notice[i].updated_at).toString().replace(/T/g, " ").replace(/Z/g, "")
        }
        this.news = res.data[3];
      });
    },
    prev() {
      let prev = document.getElementById("prev");
      prev.click();
    },
    next() {
      let next = document.getElementById("next");
      next.click();
    }
  }
};
</script>
<style>
#home .login-body-loginBtn {
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  height: 40px;
  border-radius: 2px;
  background-color: #565abf !important;
}

#home .login-body-loginBtn:hover {
  color: #ffffff;
  background-color: #565abf !important;
}

.home .ivu-btn {
  background-color: #f7f9fc;
}

.Rectangle-Copy-43:hover {
  cursor: pointer;
  background-color: #f7f9fc;
}

/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/

.countryImg:hover {
  cursor: pointer;
}

.Rectangle-Copy-43 .new {
	margin-bottom: 2px;
  margin-left: 4px;
  text-align: center;
  width: 36px;
  height: 16px;
  border-radius: 2px;
  background-color: #f7d269;
  font-family: CircularStd;
  font-size: 11px;
  font-weight: 600;
  font-stretch: normal;
  font-style: normal;
  line-height: 18px;
  letter-spacing: -0.49px;
  color: #32325d;
}

.Rectangle-Copy-43 .increase {
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: right;
  color: #3ecf8e;
}

.Rectangle-Copy-43 .krw {
  height: 16px;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: normal;
  text-align: right;
  color: #bdc6d4;
}

.Rectangle-Copy-43 .AP {
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: right;
  color: #32325d;
}

#home .active {
  border-bottom: 2px #565abf solid;
  color: #565abf !important;
}

#home .mk .Rectangle-Copy-4 .title:hover {
  cursor: pointer;
}

#home .mk .Rectangle-Copy-4 .title {
  padding: 7px 0;
  height: 100%;
  display: inline-block;
  font-family: SpoqaHanSans;
  font-size: 16px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #bdc6d4;
}

#home .mk .Rectangle-Copy-43 {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 21px;
  width: 1216px;
  height: 56px;
  border-radius: 2px;
  box-shadow: inset 0 -1px 0 0 #f7f9fc;
}

#home .mk .Rectangle-Copy-42 {
  color: #32325d;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 1214px;
  height: 40px;
  background-color: #f7f9fc;
  padding: 10px 16px 10px 21px;
}

#home .mk .Rectangle-Copy-4 {
  width: 1216px;
  height: 40px;
  box-shadow: inset 0 -1px 0 0 #e6ebf1;
}

#home .mk {
  width: 1216px;
  height: 473px;
  margin-top: 80px;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}
</style>
<style lang="scss">
.home {
  h3 {
    width: 592px;
    font-family: CircularStd;
    font-size: 64px;
    font-weight: 500;
    text-align: center;
    color: #32325d;
    margin: 124px auto 0;
  }

  .banner {
    margin-top: 105px;
    position: relative;

    img:hover {
      cursor: pointer;
    }
  }

  .swiper-slide {
    padding: 0 15px;
  }

  .swiper-button-prev {
    position: absolute;
    width: 64px;
    height: 64px;
    box-shadow: 0 8px 16px 0 rgba(86, 90, 191, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
    border-radius: 50%;
    left: -22px;
    z-index: 100;
    top: 35%;
    margin-top: -32px;
    background-image: url("../../../assets/p.png");
    background-size: 12px 19px;
  }

  .swiper-button-next {
    background-image: url("../../../assets/n.png");
    background-size: 12px 19px;
    position: absolute;
    width: 64px;
    height: 64px;
    box-shadow: 0 8px 16px 0 rgba(86, 90, 191, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
    border-radius: 50%;
    right: -34px;
    top: 35%;
    margin-top: -32px;
    z-index: 100;
  }

  .Fire {
    width: 280px;
    padding: 8px 0;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.4;
    letter-spacing: -1px;
    color: #32325d;
    overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .Artist-name {
    width: 280px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #32325d;
     overflow: hidden;
    text-overflow: ellipsis;
    -o-text-overflow: ellipsis;
    -webkit-text-overflow: ellipsis;
    -moz-text-overflow: ellipsis;
    white-space: nowrap;
  }

  .country {
    margin-top: 80px;
    width: 1216px;
    display: flex;
    flex-wrap: wrap;
  }

  .country-1 {
    position: relative;
    width: 176px;
    height: 188px;
    margin-right: 32px;
    margin-bottom: 40px;
  }
  .country-1:nth-of-type(6n) {
    margin-right: 0;
  }
  .country-1-1 {
    position: absolute;
    bottom: 0;
    z-index: 3;
    width: 176px;
    height: 176px;
    background-color: #aaa;
    border-radius: 4px;
  }
  .country-1-1 img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
  }
  .country-1-2 {
    z-index: 2;
    position: absolute;
    left: 8px;
    bottom: 0;
    width: 160px;
    height: 184px;
    border-radius: 4px;
    background-color: #e6ebf1;
  }

  .country-1-3 {
    z-index: 1;
    position: absolute;
    bottom: 0;
    left: 16px;
    width: 144px;
    height: 188px;
    border-radius: 4px;
    background-color: #f7f9fc;
  }

  .country-1-4 {
    display: flex;
    justify-content: flex-start;
    width: 176px;
    height: 24px;
    position: absolute;
    bottom: -26px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .countryIcon {
    display: inline-block;
    background-image: url("../../../assets/Flag_KR.png");
    width: 24px;
    height: 24px;
    object-fit: cover;
    margin-right: 15px;
  }

  .countryText {
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .countryText img {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 8px;
  }
  .noticeF {
    width: 100%;
    margin-top: 120px;
    background-color: #f7f9fc;
  }

  .Notice {
    margin-top: 80px;
    margin-bottom: 16px;
    height: 52px;
    font-family: CircularStd;
    font-size: 36px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.18;
    letter-spacing: -1px;
    color: #32325d;
  }
  .News {
    margin-top: 80px;
    margin-bottom: 16px;
    width: 89px;
    height: 48px;
    font-family: CircularStd;
    font-size: 36px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -1px;
    color: #32325d;
  }
  .noticeDiv {
    padding: 0;
  }

  .noticeItem {
    width: 100%;
    min-height: 48px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
  }

  .itemDate {
    padding-top: 4px;
    width: 100%;
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

  .itemContent {
    width: 1216px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Field {
    margin-top: 32px;
    width: 110px;
    height: 40px;
    border-radius: 2px;
    border: solid 1px #565abf;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: -0.4px;
    text-align: center;
    color: #565abf;
  }

  .newsContent {
    display: flex;
    /*justify-content: space-between;*/
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  .newsItem {
    width: 280px;
  }

  .Rectangle {
    width: 280px;
    height: 172px;
  }
  .Rectangle img {
    object-fit: cover;
  }

  .White-House-Weighs-L {
    margin: 8px 0;
    width: 280px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .Read-more {
    margin-top: 8px;
    width: 280px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #565abf;
  }
}

.down {
  color: #f4496d;
}
</style>
