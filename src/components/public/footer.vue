<template>
  <div class="footer">
    <div id="home">
      <div class="top">
        <div class="one">
          <div style="width:32px;height: 32px;margin-bottom: 8px;"><img src="../../assets/SymbolTypeface_gray.png" alt=""></div>
          ©2020 Artpiece. All Rights Reserved</div>
        <div class="two">
          <p style="color: #32325d;">{{ $t('footer.Company') }}</p>
          <p><router-link style="color: #bdc6d4" to="/about">{{ $t('Nav.About') }}</router-link></p>
        </div>
        <div class="three">
          <p style="color: #32325d;">{{ $t('footer.Service') }}</p>
          <p><router-link style="color: #bdc6d4" to="/trading">{{ $t('Nav.Tranding') }}</router-link></p>
          <p><router-link style="color: #bdc6d4" to="/asset">{{ $t('Nav.Asset') }}</router-link></p>
          <p><a style="color: #bdc6d4" @click="toNews">{{ $t('Nav.Support') }}</a></p>
        </div>
        <div class="four">
          <p>{{ $t('footer.Resources') }}</p>
          <p><a style="color: #bdc6d4" @click="toDisclaimerNotices">{{ $t('footer.Disclaimer_Notices') }}</a></p>
          <p><a style="color: #bdc6d4" @click="toSupport">{{ $t('Nav.Support') }}</a></p>
          <p><a style="color: #bdc6d4" @click="toPrivacyTerms">{{ $t('footer.Privacy_terms') }}</a></p>
        </div>
      </div>
      <div style="display: flex;justify-content: space-between;align-items: center;padding-top:20px; padding-bottom:35px;height:128px">
        <div class="bottom">
          ㈜아트피스 서울특별시 강남구 테헤란로12길 아트피스빌딩 | 대표이사 김대표 | 고객센터 1661-0000
          사업자등록번호 000-00-00000 | 사업자정보확인 통신판매업 신고번호 : 제2019-서울강남-00000호
        </div>
        <div style="">
          <div style="width: 20px;height: 18px; display: inline-block;margin-right: 16px;"><img src="../../assets/qdialog.png" alt=""></div>
          <div style="width: 10px;height: 19px; display: inline-block;margin-right: 16px;"><img src="../../assets/fa.png" alt=""></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'footer',
    data() {
      return {}
    },
    mounted() {
    },
    methods: {
      // 前往免责声明通知
      toDisclaimerNotices() {
        // let a = window.selfConfig.notice.replace(/language/, this.$lang.toString().toLowerCase())
        // console.log(a)
        // window.open(a, "_blank")
        switch (this.$lang) {
          case 'en-US':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163654-Disclaimer-Notices', "_blank")
            break
          case 'zh-CN':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163654-Disclaimer-Notices', "_blank")
            break
          case 'ko-KR':
            window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042163654-Disclaimer-Notices', "_blank")
            break
        }
      },
      // 前往隐私策略(footer)
      toPrivacyTerms() {
        // let a = window.selfConfig.policy.replace(/language/, this.$lang.toString().toLowerCase())
        // console.log(a)
        // window.open(a, "_blank")
        switch (this.$lang) {
          case 'en-US':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
            break
          case 'zh-CN':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
            break
          case 'ko-KR':
            window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042647933-Privacy-terms', "_blank")
            break
        }
      },
      // 前往新闻
      toNews() {
        let a = window.selfConfig.news.replace(/language/, this.$lang.toString().toLowerCase())
        console.log(a)
        window.open(a, "_blank")
        // window.open(window.selfConfig.news, "_blank")
      },
      // 前往关于我们
      toAbout() {
        let a = window.selfConfig.aboutUs.replace(/language/, this.$lang.toString().toLowerCase())
        console.log(a)
        window.open(a, "_blank")
        // window.open(window.selfConfig.aboutUs, "_blank")
      },
      // 前往支持(footer)
      toSupport() {
        // let a = window.selfConfig.connectUs.replace(/language/, this.$lang.toString().toLowerCase())
        // console.log(a)
        // window.open(a, "_blank")
        switch (this.$lang) {
          case 'en-US':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us', "_blank")
            break
          case 'zh-CN':
            window.open('https://artpiecehelp.zendesk.com/hc/en-us', "_blank")
            break
          case 'ko-KR':
            window.open('https://artpiecehelp.zendesk.com/hc/ko', "_blank")
            break
        }
      },
    }
  }
</script>
<style lang="scss">
@font-face {
  font-family: CircularStd;
  src: url('../../assets/font/Main.ttf');
}
.footer {
  width: 100%;
  padding: 39px 0;
  height:330px;
  box-shadow: inset 0 1px 0 0 #f7f9fc;
  .top {
    margin-right: 136px;
    width: 100%;
    height: 163px;
    box-shadow: inset 0 -1px 0 0 #f7f9fc;
    display: flex;
    justify-content: space-between;
    .one {
      width: 176px;
      line-height: 20px;
      font-size: 14px;
      color: #bdc6d4;
    }
    .two,
    .three,
    .four {
      font-size: 14px;
      color: #bdc6d4;
      p {
        font-size: 14px;
        line-height: 20px;
        color: #bdc6d4;
        margin-bottom: 15px;
      }
    }
  }
  .bottom {
    width: 580px;
    font-family: SpoqaHanSans;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: -0.34px;
    color: #bdc6d4;
  }
}
</style>
