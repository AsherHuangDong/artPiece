<template>
  <div>
    <div style="width: 1216px;margin: 0 auto;">
      <div id="bg">
        <img src="../../../assets/bg6.png" alt />
      </div>
      <!-- <div id="bg2"><img src="../../../assets/bg7.png" alt=""></div> -->
      <div id="f1" style="position: relative">
        <div class="The-new-platform">{{ $t('Nav.About') }}</div>
        <div class="listening-music-to-o">
          {{ $t('about.title1') }}
          <p class="From-listening-music">{{ $t('about.title2') }}</p>
        </div>
        <div id="bg5">
          <img src="../../../assets/bg21.png" alt />
        </div>
        <div id="bg4">
          <img src="../../../assets/bg22.png" alt />
        </div>
      </div>
      <div id="f2">
        <div>
          <div class="Investment">{{ $t('about.title3') }}</div>
          <div class="title-content">
            <div>
              <div class="title-img">
                <img src="../../../assets/music.png" alt />
              </div>
              <div class="title">{{ $t('about.title4') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c1') }}</div>
            </div>
            <div>
              <div class="title-img">
                <img src="../../../assets/snow.png" alt />
              </div>
              <div class="title">{{ $t('about.title5') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c2') }}</div>
            </div>
            <div>
              <div class="title-img">
                <img src="../../../assets/searchHeart.png" alt />
              </div>
              <div class="title">{{ $t('about.title6') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c3') }}</div>
            </div>
          </div>
        </div>
      </div>
      <div id="f3">
        <div>
          <div class="Investment">{{ $t('about.Contribute') }}</div>
          <div class="title-content">
            <div>
              <div class="title-img">
                <img src="../../../assets/wallet.png" alt />
              </div>
              <div class="title">{{ $t('about.title7') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c4') }}</div>
            </div>
            <div>
              <div class="title-img">
                <img src="../../../assets/searchFile.png" alt />
              </div>
              <div class="title">{{ $t('about.title8') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c5') }}</div>
            </div>
            <div>
              <div class="title-img">
                <img src="../../../assets/newStart.png" alt />
              </div>
              <div class="title">{{ $t('about.title9') }}</div>
              <div class="Lorem-ipsum-dolor-si2">{{ $t('about.c6') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="f4">
      <div class="f4Title">{{ $t('about.title10') }}</div>
      <div style="width: 100%;text-align: center;margin-top: 16px;">
        <Button @click="toLogin" class="aboutButton">
          <span>{{ isSign == 0 ?$t('about.Sign_up'): isSign == 1 ?$t('userCenter.index.Profile'):$t('about.Sign_up')}}</span>
        </Button>
        <Button @click="toAuction" class="aboutButton2">
          <span>{{ $t('about.Watch_or_bid') }}</span>
        </Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      isSign: localStorage.getItem("isSign")
    };
  },
  mounted() {
    console.log("111=", this.isSign);
    this.$store.commit("changeNavIndex", 0);
  },
  methods: {
    toLogin() {
      if (this.isSign == 0 || !this.isSign) {
        this.$router.push({ name: "register" });
      } else {
        this.$router.push({
          path: "/account"
        });
      }
    },
    toAuction() {
      this.$router.push({ name: "auction" });
    }
  }
};
</script>

<style scoped>
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
.aboutButton2 {
  width: 130px;
  height: 48px;
  border-radius: 2px;
  border: solid 1px #565abf;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #565abf;
  background: rgb(0, 0, 0, 0);
}
.aboutButton span {
  width: 46px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
}
.aboutButton {
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
  width: 102px;
  height: 48px;
  border-radius: 2px;
  background-color: #565abf;
  margin-right: 16px;
}
.aboutButton2 span {
  width: 79px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #565abf;
}
#f4 {
  position: relative;
  padding: 40px 0;
  width: 100%;
  height: 248px;
  background-color: #f3f8fe;
  background-image: url("../../../assets/bm.png");
  background-repeat: no-repeat;
  background-position: center;
}

.f4Title {
  position: relative;
  margin: 0 auto;
  width: 800px;
  height: 104px;
  font-family: CircularStd;
  font-size: 44px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.18;
  letter-spacing: -1px;
  text-align: center;
  color: #32325d;
}

#bg4 {
  width: 608px;
  height: 140px;
  position: absolute;
  top: 247px;
  left: -122px;
  z-index: -1;
}

#bg5 {
  position: absolute;
  width: 415px;
  height: 92px;
  top: 128px;
  right: -134px;
  z-index: -1;
}

#bg {
  overflow: hidden;
  position: absolute;
  top: -220px;
  left: 0;
  z-index: -2;
}

#bg img {
  width: 1914px;
  height: 758px;
}

#bg2 {
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -2;
}

#bg2 img {
  width: 1914px;
  height: 758px;
}

#f1 {
  width: 100%;
  height: 400px;
}

.listening-music-to-o {
  width: 493px;
  margin-left: 208px;
  left: -296px;
  top: -72px;
  height: 144px;
  font-family: CircularStd;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  letter-spacing: -1px;
  text-align: left;
  color: #32325d;
  font-size: 44px;
  line-height: 1.18;
}

.The-new-platform {
  margin: 80px 208px 0 208px;
  left: -78px;
  top: -14px;
  width: 156px;
  height: 28px;
  font-family: CircularStd;
  font-size: 20px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.4;
  letter-spacing: -1px;
  color: #87bbfc;
}

.From-listening-music {
  margin-top: 17px;
  width: 592px;
  height: 28px;
  font-family: CircularStd;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.4;
  letter-spacing: -1px;
  color: #32325d;
}

#f2 {
  width: 100%;
  margin-bottom: 80px;
}

#f2 > div {
  position: relative;
}

.Investment {
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

.Lorem-ipsum-dolor-si {
  width: 686px;
  height: 24px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #32325d;
}

.title-content {
  margin-top: 39px;
  display: flex;
  justify-content: space-between;
}

.title-img {
  width: 80px;
  height: 80px;
  background-color: #69d3f8;
  border-radius: 50%;
}

.title {
  margin: 16px 0 8px 0;
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

.Lorem-ipsum-dolor-si2 {
  width: 384px;
  padding-right: 20px;
  height: 48px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  color: #32325d;
}

#f3 {
  width: 100%;
  margin-bottom: 80px;
}

#f3 > div {
  position: relative;
}
</style>
