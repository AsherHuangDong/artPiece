<template>
    <div class="header">
        <div class="content">
            <!--      <div>{{ $t('Nav.Asset') }}</div>-->
            <div v-if="isSign === '1'" class="Bithumb-Asset-16000">
                Bithumb {{ $t('Nav.Asset')}}
                <div @click="toAsset" class="text-style-1 pointer">0KRW</div>
            </div>
            <div v-if="isSign === '1'" class="Bithumb-Asset-16000">
                Artpiece {{ $t('Nav.Asset')}}
                <div @click="toAsset" class="text-style-1 pointer">{{ toThousands(ap) }} AP</div>
            </div>
            <div v-if="isSign === '1'" class="Bithumb-Asset-16000" style="position: relative;" @mouseover="showModel(5)"
                 @mouseout="hiddenModel()">
                <div class="text-style-1">{{ userEmail }}</div>
                <div class="userDrawDown"
                     style="top: 20px;left: 0;text-align:center;width:130px;height:90px;position: absolute;"
                     v-show="isShow==5" @click="hiddenModel()">
                    <a @click.stop="userCenter">{{ $t('Tranding.Customer_center') }}</a>
                    <a @click.stop="signOut">{{ $t('Nav.Sign_out') }}</a>
                </div>
            </div>
            <div v-if="isSign === '0'" class="Bithumb-Asset-16000" style="position: relative;">
                <div class="text-style-1 pointer" @click.stop="toLogin">{{ $t('Login.Login') }}</div>&nbsp;&nbsp;
                <span style="color: #fff">|</span>
                <div class="text-style-1 pointer" @click.stop="toSignUp">{{ $t('SignUp') }}</div>
            </div>
            <div class="rightNav" style="display: flex;justify-content: space-between;align-items: center;">
                <div class="support" style="margin-left: 12px;height: 20px;">
                    <!-- <img @click="userCenter" src="../../assets/User_circle.png" style="width:20px;height: 20px;" alt/> -->
                    <img src="../../assets/User_circle.png" style="width:20px;height: 20px;" alt/>
                </div>
                <div class="support" style="margin-left: 20px;" @mouseover="showModel(6)" @mouseout="hiddenModel()">
                    <img v-if="lang=='ko-KR'" style="width:24px;height: 24px;" src="../../assets/kr.png" alt/>
                    <img v-if="lang=='en-US'" style="width:24px;height: 24px;" src="../../assets/yingyu.png" alt/>
                    <img v-if="lang=='zh-CN'" style="width:24px;height: 24px;" src="../../assets/zhongwen.png" alt/>
                    <div class="model" style="left: -50px;padding-left:5px" v-show="isShow==6" @click="hiddenModel()">
                        <a @click="changeLanguage('ko-KR')">
                            <img src="../../assets/hanyu.png" style="width:20px;height:21px;vertical-align: middle"
                                 alt/>&nbsp;&nbsp;한국어
                        </a>
                        <a @click="changeLanguage('en-US')">
                            <img src="../../assets/yingyu.png" style="width:20px;height:21px;vertical-align: middle"
                                 alt/>&nbsp;&nbsp;english
                        </a>
                        <a @click="changeLanguage('zh-CN')">
                            <img src="../../assets/zhongwen.png" style="width:20px;height:21px;vertical-align: middle"
                                 alt/>&nbsp;&nbsp;中文
                        </a>
                    </div>
                </div>
            </div>
            <!--      <div>{{ ap }}AP</div>-->
            <!--      <div>= {{KRW}}KRW</div>-->
        </div>
    </div>
</template>
<script>
  import {toThousands} from "../../tool";

  export default {
    data() {
      return {
        isShow: 0,
        lang: window.newVue.$lang
      };
    },
    watch: {
      $route() {
        this.hiddenModel();
      }
    },
    mounted() {
      this.$store.commit("setAp", 0);
      this.$store.commit("setUserEmail", "");
      this.getUserInfoByToken()
      this.getUserAp();
      try {
        let a = JSON.parse(localStorage.getItem("userInfo"));
        this.$store.commit("setUserEmail", a.email);
      } catch (e) {
        this.$store.commit("setUserEmail", "");
      }
      if (sessionStorage.getItem('lang')) {
        this.lang = sessionStorage.getItem('lang')
      }
      this.changeLanguage(this.lang);
    },
    methods: {
      toThousands(n) {
        return toThousands(n)
      },
      getUserInfoByToken() {
        this.$post('/api/user/getUserByToken').then(res => {
          if (res.code === 0) {
            if (res.data === null) {
              window.newVue.$store.commit('isSign', '0') // 改变登录状态
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              window.newVue.$store.commit('setUserEmail', '')
            } else {
              window.newVue.$store.commit('isSign', '1') // 改变登录状态
              let a = res.data.email
              let b = a.substr(0, 2)
              let c = a.substr(a.length - 5, 5)
              res.data.email2 = res.data.email
              res.data.email = b + '****' + c
              localStorage.setItem('userInfo', JSON.stringify(res.data))
              window.newVue.$store.commit('setUserEmail', res.data.email)
              window.newVue.$store.commit('isBithumb', 1)
            }
          }
        })
      },
      toAsset() {
        this.$router.push('/asset')
      },
      // 现在的登录注册跳转到bithumb   https://www.bithumb.com/member_operation/join
      toLogin() {
        // this.$router.push("/login");
        window.open(' https://www.bithumb.com/member_operation/join', "_blank")
      },
      toSignUp() {
        // this.$router.push("/register");
        window.open(' https://www.bithumb.com/member_operation/join', "_blank")
      },
      changeLanguage(v) {
        window.newVue._$lang.lang = v;
        sessionStorage.setItem('lang', v);
        this.lang = v;
        let form = new FormData();
        let d = window.newVue.$lang.toString().replace(/-/g, "_");
        form.append("language", d);
        this.$post("/api/user/userLanguage", form);
      },
        // 退出登录
      signOut() {
        this.$post('/api/user/logout').then(res => {
            console.log(res)
            console.log("sign out");
            localStorage.clear();
            this.$store.commit("isSign", "0");
            this.$router.push('/');
        });
        // this.$router.push({
        //   name: "login"
        // });
      },
      userCenter() {
        console.log(localStorage.getItem("token"));
        if (localStorage.getItem("token") === null) {
            // 退出登录后跳到首页
            // this.$router.push('/login')
            this.$router.push('/')
        } else {
          this.$router.push("/userCenter");
        }
      },
      showModel(index) {
        this.isShow = index;
      },
      hiddenModel() {
        this.isShow = 0;
      },
      // 获取webapi全站信息
      info() {
        this.$post(window.selfConfig.chainUrl + "/common/user_info");
      },
      // 获取目前登录的用户的可用AP
      // 页面头部需要获取用户AP，所以刷新页面肯定会调获取用户ap的接口，来判断用户是否登录（将的登录状态存到本地）
      // 所以不在响应拦截器作判断，而是根据调用获取用户ap的接口返回数据判断用户是否登录
      // 在跳转用户中心、资产路由时根据isSign判断是否能跳转
      getUserAp() {
        if (localStorage.getItem("isSign") === "0") {
          this.$store.commit("isSign", "0");
          this.$store.commit("setAp", 0);
          this.$store.commit("setUserEmail", "");
        } else {
          this.$post("/api/account/getUserAp").then(res => {
            console.log(res);
            try {
              this.$store.commit("setAp", res.data.availableAP.balance);
              // 0没登陆，1登录
              localStorage.setItem("isSign", "1");
            } catch (e) {
              this.$store.commit("isSign", "0");
              this.$store.commit("setAp", 0);
              this.$store.commit("setUserEmail", "");
            }
          });
        }
      }
    },
    computed: {
      index() {
        return this.$store.state.navIndex;
      },
      ap() {
        return this.$store.state.ap;
      },
      isSign() {
        return this.$store.state.isSign;
      },
      userEmail() {
        return this.$store.state.userEmail;
      },
      /**
       * @return {number}
       */
      KRW() {
        return this.$store.state.rate * this.$store.state.ap;
      }
    }
  };
</script>
<style lang="scss">
    .userDrawDown {
        z-index: 100;
        border-radius: 4px;
        width: 80px;
        padding: 10px 0;
        background: #fff;
        position: absolute;
        border: 1px solid #eee;

        a {
            display: block;
            height: 35px;
            line-height: 35px;
            color: #32325e;
        }
    }

    @font-face {
        font-family: CircularStd;
        src: url("../../assets/font/Main.ttf");
    }

    .header {
        min-width: 1216px;
        height: 32px;
        box-shadow: inset 0 -1px 0 0 #2b2a55;
        background: -webkit-linear-gradient(to left, #2f3e53, #151f32);
        /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(to left, #2f3e53, #151f32);
        /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradientto(left, #2f3e53, #151f32);
        /* Firefox 3.6 - 15 */
        background: linear-gradient(to left, #2f3e53, #151f32);

        /* 标准的语法（必须放在最后） */
        .content {
            height: 32px;
            margin: 0 auto;
            width: 1216px;
            display: flex;
            justify-content: flex-end;
            align-items: center;

            .Bithumb-Asset-16000 {
                margin-left: 12px;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                height: 20px;
                font-family: CircularStd;
                font-size: 14px;
                font-weight: 500;
                font-stretch: normal;
                font-style: normal;
                line-height: 1.43;
                letter-spacing: -0.4px;
                text-align: center;
                color: #87bbfc;

                .text-style-1 {
                    margin-left: 8px;
                    color: #ffffff;
                }
            }
        }
    }

    .rightNav {
        display: flex;

        .trading,
        .about,
        .asset,
        .support {
            position: relative;

            a {
                height: 80px;
                color: #fff;
                font-size: 14px;
                font-family: CircularStd;
                font-weight: 500;
                font-style: normal;
                font-stretch: normal;
                display: flex;
            }

            .model {
                z-index: 100;
                border-radius: 4px;
                width: 80px;
                padding: 10px 0;
                background: #fff;
                position: absolute;
                left: 0;
                top: 28px;
                border: 1px solid #eee;

                a {
                    display: block;
                    height: 35px;
                    line-height: 35px;
                    color: #32325e;
                }
            }

            .act {
                color: #fff;
                border-bottom: 2px solid #fff;
            }
        }
    }
</style>
