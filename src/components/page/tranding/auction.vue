<template>
  <div id="trading" class="tranding">
    <div id="home">
      <div class="top">
<!--        <div class="customer">-->
<!--          <p>{{ $t('Tranding.jump') }}</p>-->
<!--          <p class="jump" @click="toCustomer">{{ $t('Tranding.Customer_center') }}</p>-->
<!--          <p class="jump" @click="toFAQ">{{ $t('Tranding.FAQ') }}</p>-->
<!--        </div>-->
        <div class="customer"></div>
        <div class="auction" style="position: relative;">
          <div style="position: absolute;top: 93px;left: -106px;z-index: -1;">
            <img src="../../../assets/bg11.png" alt />
          </div>
          <div style="position: absolute;top: 30px;right: -206px;z-index: -1;">
            <img src="../../../assets/bg10.png" alt />
          </div>
          <p>{{ $t('Tranding.Auction') }}</p>
          <p>{{ $t('Tranding.title1') }}</p>
        </div>
      </div>
      <div class="tab">
        <p
          :class="getAuctionListParams.status === 'All' ?'act':''"
          @click="changeTab(1, 'All')"
        >{{ $t('Tranding.All') }}</p>
        <p
          :class="getAuctionListParams.status === 'Live' ?'act':''"
          @click="changeTab(2, 'Live')"
        >{{ $t('Tranding.Live_auction') }}</p>
        <p
          :class="getAuctionListParams.status === 'Upcoming' ?'act':''"
          @click="changeTab(3, 'Upcoming')"
        >{{ $t('Tranding.Upcoming_auction') }}</p>
        <p
          :class="getAuctionListParams.status === 'Closed' ?'act':''"
          @click="changeTab(4, 'Closed')"
        >{{ $t('Tranding.Closed') }}</p>
      </div>
    </div>
    <div class="goodsList">
      <div class="layout">
        <div class="head">
          <h3>
            {{index==1?$t('Tranding.All'):index==2?$t('Tranding.Live_auction'):index==3?$t('Tranding.Upcoming_auction'):index==4?$t('Tranding.Closed'):''}}
            <span>{{ auctionCount }}</span>
          </h3>
          <div class="search" style="width: 400px;">
            <div class="box-one">
              <Select
                @on-change="countrySelect"
                id="selectCountry"
                v-model="getAuctionListParams.id"
                :placeholder="$t('Tranding.All')"
              >
                <Option value>{{ $t('Tranding.All') }}</Option>
                <Option
                  v-for="item in cityList"
                  :value="item.id"
                  :key="item.id"
                >{{ item.countryName }}</Option>
              </Select>
            </div>
            <div class="box-two">
              <Input
                @on-enter="getAuctionList(1)"
                style="height: 31px;margin-bottom: 0;"
                v-model="getAuctionListParams.Keyword"
                prefix="ios-search"
                :placeholder="$t('Tranding.Search')"
              />
            </div>
            <div style="line-height: 34px;width: 120px;margin-right: 14px">
              <Select
                @on-change="getAuctionList(1)"
                v-model="getAuctionListParams.type"
                :placeholder="$t('Tranding.All')"
              >
                <Option value>{{ $t('Tranding.All') }}</Option>
                <Option :value="1">{{ $t('Copyright_name') }}</Option>
                <Option :value="2">{{ $t('artist') }}</Option>
              </Select>
            </div>
          </div>
        </div>
        <div class="con">
          <div
            class="item"
            v-for="(item,index) in auctionList"
            :key="index"
          >
            <img :src="item.copyrightAuctionDetails.copyrightImgUrl" alt />
            <!--            <div class="name" v-for='(item1,index1) in item.list' :key='index1'>-->
            <div style="box-shadow: inset 0 -1px 0 0 #f7f9fc;padding-bottom:8px;box-sizing: border-box;margin-top:16px;">
              <p
                style="font-size: 20px;font-weight: 500;font-family: mFont,sans-serif;color: #32325d;line-height: 1.4;"
              >{{ item.copyrightAuctionDetails.copyrightName }}</p>
              <p
                style="font-size: 16px;font-family: mFont,sans-serif;color: #32325d;line-height: 1.5;"
              >{{ item.copyrightAuctionDetails.artist }}</p>
            </div>
            <!--            </div>-->
            <div class="price">
              <p>
                <span>{{ $t('Tranding.Starting_price') }}</span>
                <span class="span1">{{ item.copyrightAuctionDetails.startPrice }}</span>
              </p>
              <p>
                <span>{{ $t('Tranding.Current_highest_price') }}</span>
                <span class="span2">{{ item.copyrightAuctionDetails.currentHighestPrice }}</span>
              </p>
              <p>
                <span>{{ $t('Tranding.Quantity_sold') }}</span>
                <span class="span3">{{ item.copyrightAuctionDetails.quantitySold }}pieces</span>
              </p>
              <!-- <p>
                <span>{{ $t('Tranding.Sales_rate') }}</span>
                <span class="span3">
                  <span
                    v-if="item.copyrightAuctionDetails.quantitySold < item.issuanceTotalAmount"
                  >{{((item.copyrightAuctionDetails.quantitySold / item.issuanceTotalAmount) * 100).toFixed(2) + '%' }}</span>
                  <span
                    v-if="item.copyrightAuctionDetails.quantitySold >= item.issuanceTotalAmount"
                  >100%</span>
                </span>
              </p> -->
            </div>
            <div class="bottom">
              <p @click="toDetail(item)" class="pointer">{{ $t('Tranding.Bid') }}</p>
            </div>
          </div>
          <div
            v-if="auctionList.length!=0"
            style="position: absolute;left: 50%;margin-left:-75px;bottom: 20px;"
          >
            <Page
              @on-change="changePage"
              :page-size="8"
              :current="getAuctionListParams.currPage"
              :total="auctionCount"
              simple
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      auctionCount: 0,
      cityList: [],
      getAuctionListParams: {
        id: "",
        Keyword: "",
        currPage: 1,
        pageSize: 8,
        status: "Live"
      },
      index: 1,
      auctionList: []
    };
  },
  mounted() {
   // 默认选择进行中，之前的保存历史查询参数先注释
    // if (sessionStorage.getItem("getAuctionListParams")) {
    //   this.getAuctionListParams = JSON.parse(
    //     sessionStorage.getItem("getAuctionListParams")
    //   );
    // }
	// 通过路由参数获取先择的国家
    try {
      if (!isNaN(Number(this.$route.query.country))) {
        this.getAuctionListParams.id = Number(this.$route.query.country);
      }
      if (this.getAuctionListParams.id === null) {
        delete this.getAuctionListParams.id;
      }
    } catch {
      delete this.getAuctionListParams.id;
    }
    // this.$store.commit("changeNavIndex", 2);
    this.getAuctionList();
    this.homePage();
    this.$store.commit("changeNavIndex", 1);
  },
  methods: {
    homePage() {
      let form = new FormData();
      form.append("bannerCurrpage", "1");
      form.append("bannerPageSize", "16");
      form.append('language', window.newVue.$lang.toString().toLowerCase())
      // window.newVue._$lang.lang == "zh-CN"
      //   ? form.append("language", 1)
      //   : window.newVue._$lang.lang == "en-US"
      //   ? form.append("language", 3)
      //   : window.newVue._$lang.lang == "ko-KR"
      //   ? form.append("language", 4)
      //   : "";
      this.$post("/api/homeNotLog/homePage", form).then(res => {
        this.cityList = res.data[1];
      });
    },
    toFAQ() {
      this.$router.push({ name: "supportnotice" });
    },
    toCustomer() {
      this.$router.push({ name: "account" });
    },
    changePage(e) {
      this.getAuctionListParams.currPage = e;
      this.getAuctionList();
    },
    changeTab(index, v) {
      this.getAuctionListParams.currPage = 1;
      this.auctionCount = 0;
      this.index = index;
      this.getAuctionListParams.status = v;
      this.getAuctionList();
    },
    changeIndex(sort) {
      if (sort == "prev") {
        this.index -= 1;
        if (this.index < 1) {
          this.index = 1;
        }
      } else {
        this.index += 1;
        if (this.index > 4) {
          this.index = 4;
        }
      }
    },
    toDetail(item) {
      // 1拍卖  2抢购
      if (item.type === 1) {
        sessionStorage.setItem("item", JSON.stringify(item));
        this.$router.push({
          path: "/auctiondetail",
          query: { id: item.copyrightAuctionDetails.copyrightAuctionId }
        });
      } else {
        sessionStorage.setItem("item", JSON.stringify(item));
        this.$router.push({
          path: "/auctiondetail2",
          query: { id: item.copyrightAuctionDetails.copyrightAuctionId }
        });
      }
    },
    countrySelect(e) {
      this.$router.push({ path: "/auction", query: { country: e } });
      this.getAuctionList(1);
    },
    getAuctionList(flag) {
      sessionStorage.setItem(
        "getAuctionListParams",
        JSON.stringify(this.getAuctionListParams)
      );
      this.auctionList = [];
      this.auctionCount = 0;
      let form = new FormData();
      for (let i in this.getAuctionListParams) {
        if (
          this.getAuctionListParams[i] !== "" &&
          this.getAuctionListParams[i] !== undefined
        ) {
          form.append(i, this.getAuctionListParams[i]);
        }
      }
      // 如果是通过搜索输入框按回车搜索
      if(flag) {
        form.delete("currPage")
        form.append('currPage', '1')
      }
      this.$post(
        "/api/copyrightAuction/getCopyrightByCountryIdOrArtistList",
        form
      ).then(res => {
        console.log(res);
        if (res) {
          this.auctionList = res.data.records;
          this.auctionCount = res.data.total;
        }
      });
    }
  }
};
</script>
<style>
/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/
.jump:hover {
  cursor: pointer;
}
.ivu-input-prefix,
.ivu-input-suffix {
  left: 5px !important;
  top: 1px !important;
}
.ivu-select-placeholder {
  font-size: 14px !important;
}

.ivu-input-prefix i,
.ivu-input-suffix i {
  font-size: 20px;
  line-height: 32px;
  color: #bdc6d4;
}

.ivu-input-prefix,
.ivu-input-suffix {
  text-align: center;
  position: absolute;
  left: 10px;
  top: 3px;
  z-index: 1;
}

#trading .ivu-input-wrapper {
  width: 198px;
}
.ivu-icon-ios-arrow-down:before {
  /* background: url('../../../assets/select.png') center center no-repeat;
  background-size: cover; */
  content: "";
}
.ivu-select-arrow {
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: 20px;
  width: 10px;
  height: 13px;
  transition: none;
}
.ivu-input {
  border-radius: 0;
  border: 1px solid #e6ebf1;
}
.ivu-select-selection {
  border-radius: 0;
  border: 1px solid #e6ebf1;
}
.ivu-select-single .ivu-select-selection .ivu-select-placeholder {
  color: #515a6e;
}
</style>
<style lang="scss" scoped>
.tranding {
  #home {
    .top {
      display: flex;

      .customer {
        margin-top: 104px;

        p:nth-of-type(1) {
          width: 116px;
          height: 16px;
          font-family: CircularStd;
          font-size: 12px;
          letter-spacing: normal;
          color: #bdc6d4;
        }

        p:nth-of-type(2) {
          padding-top: 10px;
          width: 130px;
          font-family: CircularStd;
          font-size: 16px;
          line-height: 24px;
          color: #32325d;
          text-decoration: #32325d underline;
        }
        p:nth-of-type(3) {
          padding-top: 10px;
          font-family: CircularStd;
          font-size: 16px;
          line-height: 24px;
          color: #32325d;
          text-decoration: #32325d underline;
        }
      }

      .auction {
        padding-left: 406px;
        padding-top: 76px;

        p:nth-of-type(1) {
          width: 65px;
          font-family: CircularStd;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          letter-spacing: -1px;
          color: #87bbfc;
        }

        p:nth-of-type(2) {
          padding-top: 10px;
          width: 592px;
          font-family: CircularStd;
          font-size: 44px;
          font-weight: 500;
          line-height: 52px;
          letter-spacing: -1px;
          color: #32325d;
        }
      }
    }

    .tab {
      display: flex;
      margin-top: 130px;

      p {
        font-family: CircularStd;
        font-size: 20px;
        font-weight: 500;
        line-height: 28px;
        letter-spacing: -1px;
        color: #32325d;
        margin: 0 32px 0 0;
        padding-bottom: 10px;
      }
      p:hover {
        cursor: pointer;
      }

      .act {
        color: #565abf;
        border-bottom: 2px solid #565abf;
      }
    }
  }

  .goodsList {
    min-width: 1216px;
    background-color: #f7f9fc;

    .layout {
      width: 1216px;
      margin: 0 auto;

      .head {
        position: relative;
        display: flex;
        justify-content: space-between;
        padding: 20px 0 36px 0;
        h3 {
          //padding: 44px 0 36px 0;
          line-height: 32px;
          font-family: CircularStd;
          font-size: 24px;
          font-weight: 500;
          letter-spacing: -1px;
          color: #32325d;

          span {
            color: #87bbfc;
          }
        }

        .search {
          display: flex;
          justify-content: space-between;
          align-items: center;
          //padding: 40px 0 33px 0;

          .box-one {
            margin-right: 8px;
            width: 150px;
            line-height: 34px;
            position: relative;

            .change {
              display: flex;
              position: absolute;
              flex-direction: column;
              top: 14px;
              right: 10px;

              .ivu-icon {
                line-height: 0;
                width: 10px;
                height: 10px;
                color: #32325d;
              }
            }
          }

          .box-two {
            display: flex;
            line-height: 40px;
            background-color: #ffffff;
            box-sizing: border-box;
            .ivu-input-prefix {
              left: 5px !important;
              top: 1px !important;
            }
            .tosearch {
              width: 82px;
              padding-left: 9px;
              position: relative;
              border-left: solid 1px #e6ebf1;
              color: #32325d;

              .change {
                display: flex;
                position: absolute;
                flex-direction: column;
                top: 14px;
                right: 10px;

                .ivu-icon {
                  line-height: 0;
                  width: 10px;
                  height: 10px;
                  color: #32325d;
                }
              }
            }
          }
        }
      }

      .con {
        position: relative;
        display: flex;
        flex-wrap: wrap;
        padding-bottom: 140px;

        .item {
          margin-right: 22px;
          box-sizing: border-box;
          width: 280px;
          padding: 16px;
          height: 472px;
          border-radius: 4px;
          box-shadow: 0 8px 16px 0 rgba(50, 50, 93, 0.1);
          background-color: #ffffff;
          margin-bottom: 32px;

          img {
            width: 248px;
            height: 248px;
            border-radius: 2px;
            box-shadow: 0 10px 20px 0 rgba(86, 90, 191, 0.2);
          }

          .name {
            padding-bottom: 8px;
            border-bottom: 1px solid #f7f9fc;

            p:nth-of-type(1) {
              font-family: CircularStd;
              font-size: 20px;
              font-weight: 500;
              line-height: 1.4;
              letter-spacing: -1px;
              color: #32325d;
            }

            p:nth-of-type(2) {
              font-family: CircularStd;
              font-size: 16px;
              line-height: 1.5;
              letter-spacing: -0.4px;
              color: #32325d;
            }
          }

          .price {
            margin-top: 8px;
            p {
              display: flex;
              justify-content: space-between;
              font-family: CircularStd;
              font-size: 14px;
              line-height: 1.43;
              color: #32325d;

              // .span1 {
              //   color: #565abf;
              // }

              // .span2 {
              //   color: #f4496d;
              // }

              // .span3 {
              //   color: #f7d269;
              // }
            }
          }

          .bottom {
            padding-top: 8px;
            display: flex;
            justify-content: flex-end;

            p {
              width: 63px;
              height: 40px;
              line-height: 40px;
              text-align: center;
              border-radius: 2px;
              border: solid 1px #565abf;
              font-family: CircularStd;
              font-size: 14px;
              font-weight: 500;
              color: #565abf;
            }
          }
        }

        .item:nth-of-type(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
