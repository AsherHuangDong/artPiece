<template>
  <div class="auctionDetail">
    <div v-if="!canShowTime" class="time"></div>
    <div v-if="canShowTime" class="time">
      <p class="date">
        {{ $t('auctionDetail.Publish_date')}} {{thisPublishTime}}&nbsp;&nbsp;&nbsp;&nbsp;
        <span v-if="isBegin">{{$t('auctionDetail.Remaining')}}</span>
        <span v-if="!isBegin">{{$t('Distance_start_time')}}</span>
        {{showRemainTime}}
      </p>
    </div>
    <div id="home">
      <div class="top">
        <img :src="getDetailData.copyrightAuction.copyrightImg" alt/>
        <div class="name">
          <p>{{ getDetailData.information.Artist }}</p>
          <p>{{ getDetailData.information.composer }}</p>
        </div>
        <div class="detail">{{getDetailData.copyrightAuction["copyrightIntroduction"]}}</div>
        <div class="price">
          <div class="item">
            <p>{{ $t('auctionDetail.Total_piece')}}</p>
            <p>{{toThousands(getDetailData.copyrightAuction.totalPieces)}}</p>
            <p>={{toThousands((getDetailData.copyrightAuction.totalPieces * rate).toFixed(2))}} {{rateLogo}}</p>
          </div>
          <div style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
          margin:0 16px;
        "></div>
          <div class="item">
            <p>{{ $t('auctionDetail.Starting_Price')}}</p>
            <p>{{toThousands(getDetailData.copyrightAuction["startingPrice"])}}</p>
            <p>={{toThousands((getDetailData.copyrightAuction["startingPrice"] * rate).toFixed(2))}} {{rateLogo}}</p>
          </div>
          <div style="
          width: 1px;
          height: 16px;
          background-color: #e6ebf1;
          margin:0 16px;
        "
          ></div>
          <div class="item">
            <p>{{ $t('auctionDetail.Current_hightest_Price')}}</p>
            <p>{{ toThousands(rItem.copyrightAuctionDetails.currentHighestPrice) }}</p>
            <p>={{ toThousands((rItem.copyrightAuctionDetails.currentHighestPrice * rate).toFixed(2)) }}
              {{rateLogo}}</p>
          </div>
        </div>
      </div>
      <div class="auctionDetailStatus">
        <div class="auctionDetailStatusTitle">{{ $t('auctionDetail.Status')}}</div>
        <div style="padding:0 16px;margin: 16px auto;">
          <Progress
            :percent="Number(((getDetailData.copyrightAuction.sellNum / getDetailData.copyrightAuction.totalPieces) * 100).toFixed(2))"
            :stroke-width="40"
            text-inside
            hide-info
            status="success"
          />
          <div class="progress">
            <span>0%</span>
            <span>10%</span>
            <span>20%</span>
            <span>30%</span>
            <span>40%</span>
            <span>50%</span>
            <span>60%</span>
            <span>70%</span>
            <span>80%</span>
            <span>90%</span>
            <span>100%</span>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="item item2" style="">
          <div class="tab">
            <span
              style="padding: 0;margin-right: 12px;"
              @click="tableChange(1)"
            >{{ $t('auctionDetail.Bid')}}</span>
            <div class="Oval">
              <Poptip placement="bottom" word-wrap width="370" trigger="hover">
                <span style="float:right;right: 10px;top:2px;width:20px;height: 20px;padding:0;">
                  <img src="../../../assets/i.png" alt/>
                </span>
                <div slot="content" style="margin:0;padding:0;border:0;background:#F7E9C1">
                  <p style="padding:10px 24px;">{{ $t('tishitext1') }}</p>
                  <p style="padding:10px 24px;">{{ $t('tishitext2') }}</p>
                </div>
              </Poptip>
            </div>
          </div>
          <div class="bid">
            <div
              style="width: 100%;height: 48px;background-color: #f7f9fc;padding: 12px 16px;
              display: flex;justify-content: space-between;align-items: center;margin-bottom:16px"
            >
              <div style="font-size: 16px;font-family: CircularStd;">{{ $t('auctionDetail.Price')}}</div>
              <div>
                <div
                  style="color: #565abf;font-family: CircularStd;font-size: 16px;text-align: right"
                >{{ toThousands((placeOrderParams.price).toFixed(priceAccuracy)) }}
                </div>
                <div style="color: #bdc6d4;font-family: CircularStd;font-size: 12px;">
                  = {{ toThousands((placeOrderParams.price * rate).toFixed(2)) }} {{rateLogo}}
                </div>
              </div>
            </div>
            <div class="amount">
              <span>{{ $t('auctionDetail.Amount')}}</span>
              <input
                @keypress="clearAmountPercent"
                v-model="placeOrderParams.amount"
                class="input"
              />
              <span>{{ $t('auctionDetail.Piece')}}</span>
            </div>
            <div class="tips">
              <div class="tips1">
                <img
                  src="../../../assets/failed.png"
                  style="width:12px;height:12px;margin-right:4px"
                  alt
                />
                <span>{{ $t('auctionDetail.Minimum_order_amount')}} {{ rItem.minAuctionNumber }} {{ $t('auctionDetail.Piece')}}</span>
              </div>
              <div class="tips2">
                <span>{{ $t('auctionDetail.Avalable')}}&nbsp;</span>
                <span>{{ toThousands(userBalance.availableAP.balance) }}AP</span>
              </div>
            </div>
            <RadioGroup
              @on-change="changeAmountPercent"
              class="options"
              type="button"
              v-model="amountPercent"
            >
              <Radio :label="25">25%</Radio>
              <Radio :label="50">50%</Radio>
              <Radio :label="75">75%</Radio>
              <Radio :label="100">100%</Radio>
            </RadioGroup>
            <div class="bottom">
              <div class="free">
                <p style="margin-bottom: 8px;">
                  <span>{{ $t('auctionDetail.Ordered_Amount')}}</span>
                  <span style="display: flex;justify-content: flex-start;flex-direction: column;">
                    <div style="height: 20px;">{{ toThousands((placeOrderParams.price * placeOrderParams.amount).toFixed(priceAccuracy)) }} AP</div>
                    <i style="height: 12px">={{ toThousands((placeOrderParams.price * placeOrderParams.amount * rate).toFixed(2)) }} {{rateLogo}}</i>
                  </span>
                </p>
                <p>
                  <span>{{ $t('auctionDetail.Fee')}}</span>
                  <span style="display: flex;justify-content: flex-start;flex-direction: column;"
                        v-if="getDetailData.map.isFree !== 1">
                    <div style="height: 20px;">{{ toThousands((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100).toFixed(priceAccuracy)) }} AP</div>
                    <i style="height: 12px">={{ toThousands(((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100) * rate).toFixed(2)) }} {{rateLogo}}</i>
                  </span>
                  <span v-if="getDetailData.map.isFree === 1">
                    0 AP
                    <span>=0 {{rateLogo}}</span>
                  </span>
                </p>
              </div>
              <div class="total">
                <p>{{ $t('auctionDetail.Total')}}</p>
                <p v-if="getDetailData.map.isFree !== 1">
                  {{ toThousands(((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price *
                  placeOrderParams.amount / 100) + placeOrderParams.price *
                  placeOrderParams.amount).toFixed(priceAccuracy)) }} AP
                  <span>={{(((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100) + placeOrderParams.price * placeOrderParams.amount) * rate).toFixed(2) }} {{rateLogo}}</span>
                </p>
                <p v-if="getDetailData.map.isFree === 1">
                  {{ toThousands((placeOrderParams.price * placeOrderParams.amount).toFixed(priceAccuracy)) }} AP
                  <span>={{ toThousands(((placeOrderParams.price * placeOrderParams.amount) * rate).toFixed(2)) }} {{rateLogo}}</span>
                </p>
              </div>
              <Button
                :disabled="showRemainTime === '0:0:0' && isBegin || !isBegin || isSign === '0'"
                :loading="loading.bid"
                @click="placeOrder"
                class="button"
              >
                <span>{{ $t('auctionDetail.Bid')}}</span>
              </Button>
            </div>
          </div>
        </div>
        <div class="item item2">
          <p class="tab">
            <span
              style="padding: 0;margin-right: 12px;"
              @click="tableChange(2)"
            >{{ $t('auctionDetail.History')}}</span>
          </p>
          <div class="bid">
            <div
              style="display: flex;justify-content: space-between; align-items: center;"
              class="title"
            >
              <span style="width: 15%;text-align: left">{{ $t('auctionDetail.Time')}}</span>
              <span style="width: 15%;text-align: center">{{ $t('auctionDetail.Amount')}}</span>
              <span style="width: 25%;text-align: right">{{ $t('auctionDetail.Price')}}</span>
              <span style="width: 25%;">{{ $t('auctionDetail.Total')}}</span>
              <!--              <span style="width: 30%;">operation</span>-->
            </div>
            <div v-if="historyLength!==0" class="orderListBody">
              <div
                style="display: flex;justify-content: space-between; align-items: center"
                class="tr"
                v-for="(item,index) in history"
                :key="index"
              >
                <span style="width: 15%;text-align: left;height: auto">
                  <div style="height: 16px;line-height: 1">{{ item.createTime }}</div>
                  <div style="height: 16px;line-height: 1">{{ item.tF }}</div>
                </span>
                <span style="width: 15%;text-align: center">{{ item.amount }}</span>
                <!--                bidPrice-->
                <span
                  style="width: 25%;text-align: right;display: flex;flex-direction: column;line-height: 20px;"
                >
                  {{ toThousands((item.bidPrice).toFixed(priceAccuracy)) }} {{item.bidSymbol}}
                  <strong
                    style="color: #bdc6d4;font-size: 12px;font-weight: normal;"
                  >={{ toThousands((item.bidPrice * rate).toFixed(2)) }} {{rateLogo}}</strong>
                </span>
                <span
                  style="width: 25%;text-align: right;display: flex;flex-direction: column;line-height: 20px;"
                >
                  {{ toThousands((item.bidPrice * item.amount).toFixed(priceAccuracy)) }} {{item.bidSymbol}}
                  <strong
                    style="color: #bdc6d4;font-size: 12px;font-weight: normal;"
                  >={{ toThousands((item.bidPrice * item.amount * rate).toFixed(2)) }} {{rateLogo}}</strong>
                </span>
              </div>
            </div>
            <div style="display:flex;justify-content:center;align-items:center;margin-top:100px;"
                 v-if="historyLength===0">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="../../../assets/noData2.png" style="width:40px;height:40px" alt="">
                <span style="color:#bdc6d4;text-align: center;font-size: 14px;margin-top:5px">{{$t('NoData')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f4">
        <div class="Mask2" id="mask1" style="height: 328px;">
          <img
            style="z-index: 999;height: 50px;width: 49px;margin: 120px auto 0;display: block;"
            src="../../../assets/noData2.png"
            alt
          />
          <div
            style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;height: 21px;line-height: 21px;"
          >{{ $t('NoData')}}
          </div>
        </div>
        <!--        <div class="Mask2" id="mask2"></div>-->
        <!--        信息-->
        <div class="Mask">
          <div class="h">{{ $t('auctionDetail.Infromation')}}</div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Term')}}</div>
            <div class="br">{{ getDetailData.information.term }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Last__average')}}</div>
            <div class="br">{{ getDetailData.information.Last12MonThs ? getDetailData.information.Last12MonThs : '--' }}
              AP
            </div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Publishing_date')}}</div>
            <div class="br">{{ getDetailData.information.publishTime }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Artist')}}</div>
            <div class="br">{{ getDetailData.information.Artist }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Composer')}}</div>
            <div class="br">{{ getDetailData.information.composer }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Songwriter')}}</div>
            <div class="br">{{ getDetailData.information.songwriter }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Arranger')}}</div>
            <div class="br">{{ getDetailData.information.arranger }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Royalty_distributor')}}</div>
            <div class="br">{{ getDetailData.information.royaltyDistributor }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Trustee')}}</div>
            <div class="br">{{ getDetailData.information.trustee }}</div>
          </div>
        </div>
        <div class="Mask2" id="mask3" style="height: 328px;">
          <img
            style="z-index: 999;height: 50px;width: 49px;margin: 120px auto 0;display: block;"
            src="../../../assets/noData2.png"
            alt
          />
          <div
            style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;height: 21px;line-height: 21px;"
          >{{ $t('NoData')}}
          </div>
        </div>
      </div>
      <div class="f4">
        <div class="Mask" style="width:100%">
          <div class="h" style="width:100%">{{ $t('auctionDetail.Rules')}}</div>
          <div class="roleContent">
            <div style="font-weight: bold;font-size: 14px;">{{ $t('auctionDetail.Auction_rules')}}</div>
            <div id="auctionRules"></div>
            <div
              style="font-weight: bold;font-size: 14px;margin-top:12px;"
            >{{ $t('auctionDetail.Auction__policy')}}
            </div>
            <div id="auctionCancel"></div>
          </div>
        </div>
      </div>
      <div class="part4">
        <h3>{{ $t('auctionDetail.Recommend')}}</h3>
        <div class="banner con" v-if="showDetail" style="position: relative;">
          <swiper :options="swiperOption">
            <swiper-slide class="item" v-for="(item,index) in getDetailData.recommend" :key="index">
              <div :myClick="JSON.stringify(item)">
                <img :src="item.copyrightAuctionDetails.copyrightImgUrl" alt/>
                <div class="name">
                  <p>{{item.copyrightAuctionDetails.copyrightName}}</p>
                  <p>{{item.copyrightAuctionDetails.artist}}</p>
                </div>
                <div class="price">
                  <p>
                    <span>{{ $t('auctionDetail.Starting_price')}}</span>
                    <span class="span1">{{item.copyrightAuctionDetails.startPrice}}</span>
                  </p>
                  <p>
                    <span>{{ $t('auctionDetail.Current__price')}}</span>
                    <span class="span2">{{ item.copyrightAuctionDetails.currentHighestPrice }}</span>
                  </p>
                  <p>
                    <span>{{ $t('auctionDetail.Quantity_sold')}}</span>
                    <span
                      class="span3"
                    >{{ item.copyrightAuctionDetails.quantitySold }}{{ $t('auctionDetail.pieces')}}</span>
                  </p>
                </div>
                <div class="bottom">
                  <p class="pointer" @click="toDetail(item)">{{ $t('auctionDetail.Bid')}}</p>
                </div>
              </div>
            </swiper-slide>
            <div
              class="swiper-pagination"
              slot="pagination"
              v-if="recommendLength > 4"
            ></div>
            <div
              id="prev"
              class="swiper-button-prev"
              slot="button-prev"
              v-if="recommendLength > 4"
            ></div>
            <div
              id="next"
              class="swiper-button-next"
              slot="button-next"
              v-if="recommendLength > 4"
            ></div>
          </swiper>
          <div
            @click="prev"
            class="swiper-button-prev"
            style="top: 241px;"
            v-if="recommendLength > 4"
          ></div>
          <div
            @click="next"
            class="swiper-button-next"
            style="top: 241px;"
            v-if="recommendLength > 4"
          ></div>
        </div>
      </div>
    </div>
    <FailedModal :show="show.failed" :text="show.failedText" :text2="show.failedText2"></FailedModal>
    <SuccessModal :show="show.success" :text="show.successText"></SuccessModal>
    <Confirm
      :show="show.confirm"
      :text="show.confirmText"
      :self="this"
      :item="cancelOrderItem.item"
      :loading="loading.confirm"
    ></Confirm>
  </div>
</template>
<script>
  import FailedModal from "../../modal/FailedModal";
  import SuccessModal from "../../modal/SuccessModal";
  import Confirm from "../../modal/Confirm";
  import {
    formatData, formatDataToTime, fromTimestampToString, toThousands
  } from "../../../tool";

  export default {
    name: "auctiondetail2",
    components: {
      FailedModal,
      SuccessModal,
      Confirm
    },
    data() {
      // const self = this;
      return {
        thisStartTime: '',
        showDetail: false,
        recommendLength: 0,
        canShowTime: false,
        isSign: localStorage.getItem("isSign"),
        isBegin: false,
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
          loop: true,
          loopFillGroupWithBlank: true,
          // on: {
          //   click(item) {
          //     let a = JSON.parse(item.path[1].getAttribute("myClick"));
          //     // console.log(a);
          //     self.toDetail(a);
          //   }
          // },
          pagination: {
            el: ".swiper-pagination",
            clickable: true
          },
          navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
          }
        },
        percent: 0,
        percentText: "",
        cancelOrderItem: {
          item: {}
        },
        cancelOrderParams: {
          copyrightAuctionId: JSON.parse(sessionStorage.getItem("item")).id,
          copyrightAuctionOrderId: ""
        },
        history: [],
        historyLength: 0,
        tableAct: 1,
        showRemainTime: "",
        amountPercent: 0,
        show: {
          failed: false,
          failedText: "",
          failedText2: "",
          success: false,
          successText: "",
          confirmText: "Do you want to cancel order?",
          confirm: false
        },
        orderList: [],
        orderFlag: false,
        rItem: JSON.parse(sessionStorage.getItem("item")),
        routeItem: {
          copyrightAuctionDetails: {}
        },
        userBalance: {
          availableAP: {},
          lockAP: {}
        }, // 当前登陆的余额
        thisPublishTime: "",
        getDetailData: {
          map: {},
          copyrightDetails: {
            copyrightDetails: "",
            rightToCopy: "",
            commercialPerformences: "",
            publicTransmissionRight: "",
            exhibbitionRight: "",
            rightToDistribute: "",
            rentalRight: "",
            secondaryWorkRight: ""
          },
          copyrightImg: "",
          copyrightAuction: {
            totalPieces: 1,
            sellNum: 0
          },
          recommend: [],
          information: {}
        },
        loading: {
          confirm: false
        },
        placeOrderParams: {
          amount: '',
          price: 1
        },
        priceAccuracy: 0,
        publicRate: JSON.parse(sessionStorage.getItem("public_info_v4")).market
          .rate,
        lang: window.newVue.$lang.toString().replace(/-/g, "_"),
        buy_unit: "AP"
      };
    },
    computed: {
      rate: {
        get() {
          const self = this;
          let a = "";
          try {
            a = this.publicRate[self.lang][self.buy_unit];
          } catch (e) {
            a = 1;
          }
          return a;
        },
        set(n) {
          console.log(n)
        }
      },
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
      $lang() {
        this.lang = window.newVue.$lang.toString().replace(/-/g, "_");
      },
      "placeOrderParams.amount"(n, o) {
        // console.log(n, o)
        let reg = /^[0-9]*[1-9][0-9]*$/;
        if (!reg.test(n)) {
          if (n === '') {
            this.placeOrderParams.amount = ''
          } else {
            this.placeOrderParams.amount = o;
          }
        }
      }
    },
    beforeDestroy() {
      clearInterval(this.timer)
    },
    mounted() {
      this.init();
      this.rate = this.publicRate[this.lang][this.buy_unit];
      this.priceAccuracy = JSON.parse(
        sessionStorage.getItem("item")
      ).priceAccuracy;
    },
    methods: {
      toThousands(n) {
        return toThousands(n)
      },
      percentF() {
        let percentText = document.getElementsByClassName(
          "ivu-progress-inner-text"
        )[0];
        percentText.style.marginRight = "14px";
        this.percent = (
          Number(
            this.getDetailData.copyrightAuction.sellNum /
            this.getDetailData.copyrightAuction.totalPieces
          ) * 100
        ).toFixed(2);
        //this.getDetailData.copyrightAuction.sellNum = (this.getDetailData.copyrightAuction.sellNum || 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,');
        percentText.innerText =
          toThousands(this.getDetailData.copyrightAuction.sellNum) + " piece";
        //+ this.percent + "%";
      },
      prev() {
        let prev = document.getElementById("prev");
        prev.click();
      },
      next() {
        let next = document.getElementById("next");
        next.click();
      },
      // /copyrightAuctionOrder/cancelOrder 取消此版权拍卖订单
      cancelOrder(item) {
        this.cancelOrderItem.item = item;
        this.show.confirm = true;
      },
      confirm(item) {
        this.loading.confirm = true;
        this.cancelOrderParams.copyrightAuctionOrderId = item.id;
        let form = new FormData();
        for (let i in this.cancelOrderParams) {
          form.append(i, this.cancelOrderParams[i]);
        }
        this.$post("/api/copyrightAuctionOrder/cancelOrder", form)
          .then(res => {
            // console.log(res);
            if (res.code === 0) {
              this.show.successText = "Cancel Success";
              this.show.success = true;
              this.tableChange(2);
              this.getOrderList();
              setTimeout(() => {
                this.show.success = false;
              }, 1500);
            } else {
              this.show.failedText = "Cancel Failed";
              this.show.failed = true;
              setTimeout(() => {
                this.show.failed = false;
              }, 1500);
            }
          })
          .finally(() => {
            this.loading.confirm = false;
            this.show.confirm = false;
          });
      },
      tableChange(int) {
        this.tableAct = int;
        if (int === 2 && localStorage.getItem('isSign') === '1') {
          // /copyrightAuctionOrder/getCopyrightAuctionOrderByUserId 获取该用户的拍卖列表
          let form = new FormData();
          form.append(
            "copyrightAuctionId",
            JSON.parse(sessionStorage.getItem("item")).id
          );
          this.$post(
            "/api/copyrightAuctionOrder/getCopyrightAuctionOrderByUserId",
            form
          ).then(res => {
            // console.log(res);
            this.history = res.data;
            try {
              this.historyLength = res.data.length
            } catch (e) {
              this.historyLength = 0
            }
            // console.log(this.history);
          });
        }
      },
      // 当输入amount时清除百分比
      clearAmountPercent() {
        // console.log(this.amountPercent);
        this.amountPercent = 0;
      },
      // 当输入选择百分比时，自动计算amount
      changeAmountPercent(value) {
        this.placeOrderParams.amount = (
          ((this.userBalance.availableAP.balance / this.placeOrderParams.price) *
            value) /
          100
        ).toFixed(0);
      },
      // 判断小数位数
      numberPoint(x) {
        const y = String(x).indexOf(".") + 1; //获取小数点的位置
        const count = String(x).length - y; //获取小数点后的个数
        if (y > 0) {
          // console.log(count);
          this.orderFlag =
            count <= JSON.parse(sessionStorage.getItem("item")).priceAccuracy;
        } else {
          this.orderFlag = true;
        }
      },
      init(f) {
        if (!f) {
          console.log('in')
          this.returnTop();
        }
        this.tableAct = 1;
        let auctionRules = document.getElementById("auctionRules");
        auctionRules.innerHTML = JSON.parse(
          sessionStorage.getItem("item")
        ).auctionRules;
        let auctionCancel = document.getElementById("auctionCancel");
        auctionCancel.innerHTML = JSON.parse(
          sessionStorage.getItem("item")
        ).cancelAuctionRules;
        clearInterval(this.timer);
        this.getUserAp();
        this.getOrderList();
        this.getDetail();
        this.tableChange(2);
        // this.$chart.line3('mskImg')
      },
      // /api/account/getUserAp 获取目前登录的用户的可用AP
      getUserAp() {
        if (localStorage.getItem("isSign") === "1") {
          this.$post("/api/account/getUserAp").then(res => {
            if (res.msg.indexOf('token') !== -1) {
              localStorage.setItem("isSign", "0");
              // console.log("isSign", localStorage.getItem("isSign"));
              this.userBalance.availableAP.balance = "--";
              this.$store.commit("setAp", 0);
              this.$store.commit("setUserEmail", "");
              return null;
            }
            try {
              this.userBalance = res.data;
              this.$store.commit("setAp", res.data.availableAP.balance);
              // 0没登陆，1登录
              localStorage.setItem("isSign", "1");
            } catch (e) {
              localStorage.setItem("isSign", "0");
              this.userBalance.availableAP.balance = "--";
              this.$store.commit("setAp", 0);
              this.$store.commit("setUserEmail", "");
            }
          });
        } else {
          localStorage.setItem("isSign", "0");
          this.userBalance.availableAP.balance = "--";
          this.$store.commit("setAp", 0);
          this.$store.commit("setUserEmail", "");
        }
      },
      // 滚动到顶部
      returnTop() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
      },
      placeOrder() {
        if (localStorage.getItem("isSign") === "0") {
          // 退出登录后跳到首页
          // this.$router.push('/login')
          this.$router.push('/')
          return false;
        }
        if (this.rItem.minAuctionNumber > this.placeOrderParams.amount) {
          this.show.failed = true;
          this.show.failedText = this.$t("auctionDetail.Bidding_failure");
          this.show.failedText2 = this.$t("auctionDetail.content9");
          setTimeout(() => {
            this.show.failed = false;
          }, 2500);
          return null;
        }
        this.numberPoint(this.placeOrderParams.price);
        if (!this.orderFlag) {
          this.show.failed = true;
          this.show.failedText = "Price input error";
          this.show.failedText2 =
            "Price accuracy cannot be greater than " +
            JSON.parse(sessionStorage.getItem("item")).priceAccuracy;
          setTimeout(() => {
            this.show.failed = false;
          }, 1500);
          return null;
        }
        let form = new FormData();
        for (let i in this.placeOrderParams) {
          form.append(i, this.placeOrderParams[i]);
        }
        form.append("copyrightAuctionId", this.$route.query.id);
        form.append("bidSymbol", "AP");
        this.getDetailData.map.isFree === 1 ?
          form.append("handlingFee", "0") :
          form.append(
            "handlingFee",
            this.getDetailData.map.fee +
            (this.getDetailData.map.feePercent *
              this.placeOrderParams.price *
              this.placeOrderParams.amount) /
            100
          );
        let url = "/api/copyrightAuctionOrder/snappingCopyright";
        this.$post(url, form).then(res => {
          // console.log(res);
          if (res.code === 0) {
            this.placeOrderParams.amount = ''
            this.show.success = true;
            this.show.successText = this.$t("auctionDetail.success");
            setTimeout(() => {
              this.show.success = false;
            }, 2500);
          } else {
            this.show.failed = true;
            this.show.failedText = this.$t("auctionDetail.failure");
            this.show.failedText2 = res.msg;
            setTimeout(() => {
              this.show.failed = false;
            }, 2500);
          }
          this.init(true);
        });
      },
      getOrderList() {
        let form = new FormData();
        form.append("copyrightAuctionId", this.$route.query.id);
        let url = "/api/copyrightAuctionOrder/getOrderList";
        this.$post(url, form).then(res => {
          // console.log(res);
          this.orderList = res.data;
        });
      },
      getDetail() {
        this.canShowTime = false
        let form = new FormData();
        form.append("id", this.$route.query.id);
        // form.append('userId', JSON.parse(localStorage.getItem('userInfo')).id)
        let url = "/api/copyrightAuction/getCopyrightByCountryIdOrArtistById";
        this.$post(url, form).then(res => {
          // // console.log(res);
          this.showDetail = true
          if (!res.data.map) {
            res.data.map = {
              fee: 0,
              feePercent: 0,
              isFree: 0
            };
          }
          // 画图
          if (res.data.graphical.blinedOne.length !== 0) {
            this.$chart.line2("mask1", res.data.graphical.blinedOne);
          }
          // 第二条线先不要
          // this.$chart.line2('mask2', res.data.graphical.blinedTwo)
          if (res.data.graphical.cGraph.length !== 0) {
            this.$chart.bar1("mask3", res.data.graphical.cGraph);
          }
          this.getDetailData = res.data;
          this.recommendLength = res.data.recommend.length
          this.placeOrderParams.price = this.getDetailData.copyrightAuction.startingPrice;
          if (res.data.information.publishTime) {
            this.getDetailData.information.publishTime = formatData(
              this.getDetailData.information.publishTime
            );
          }
          // 版权发行时间
          this.thisPublishTime = "";
          this.thisPublishTime = fromTimestampToString(res.data.copyrightAuction.publishTime)
          this.thisEndTime = res.data.copyrightAuction.endTime
          this.thisStartTime = res.data.copyrightAuction.startTime
          let a = new Date(res.data.copyrightAuction.startTime);
          let b = new Date();
          let remainingTime = "";
          if (b.valueOf() < a.valueOf()) {
            // console.log("还没开始");
            this.isBegin = false;
            remainingTime = this.thisStartTime;
            const now = new Date().getTime();
            this.remainingTime = remainingTime - now;
            // console.log(this.remainingTime);
            // 先算出remainingTime
            if (this.remainingTime < 0) {
              clearInterval(this.timer);
              this.remainingTime = "1";
            }
            this.remainingTime -= 1000;
            this.showRemainTime = formatDataToTime(this.remainingTime)
            this.timer = setInterval(() => {
              if (this.remainingTime < 0) {
                clearInterval(this.timer);
                this.remainingTime = "1";
              }
              this.remainingTime -= 1000;
              this.showRemainTime = formatDataToTime(this.remainingTime)
            }, 1000);
          } else {
            // console.log("开始了");
            this.isBegin = true;
            remainingTime = this.thisEndTime;
            const now = new Date().getTime();
            this.remainingTime = remainingTime - now;
            // 先算出remainingTime
            if (this.remainingTime < 0) {
              clearInterval(this.timer);
              this.remainingTime = "1";
            }
            this.remainingTime -= 1000;
            this.showRemainTime = formatDataToTime(this.remainingTime)
            this.timer = setInterval(() => {
              if (this.remainingTime < 0) {
                clearInterval(this.timer);
                this.remainingTime = "1";
              }
              this.remainingTime -= 1000;
              this.showRemainTime = formatDataToTime(this.remainingTime)
            }, 1000);
          }
          this.canShowTime = true
          this.percentF();
        });
      },
      getCopyrightAuctionOrderByUserId() {
        if (localStorage.getItem('isSign') === '1') {
          let form = new FormData();
          form.append("copyrightAuctionId", this.$route.query.id);
          form.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
          let url = "/api/copyrightAuctionOrder/getCopyrightAuctionOrderByUserId";
          this.$post(url, form).then(res => {
            console.log(res);
          });
        }
      },
      toDetail(item) {
        // 1拍卖  2抢购
        if (item.type === 1) {
          sessionStorage.setItem("item", JSON.stringify(item));
          this.$router.push({
            path: "/auctiondetail",
            query: {
              id: item.id
            }
          });
        } else {
          sessionStorage.setItem("item", JSON.stringify(item));
          this.$router.push({
            path: "/auctiondetail2",
            query: {
              id: item.id
            }
          });
          this.init();
        }
      }
    }
  };
</script>
<style>
  /*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/

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
    top: 50%;
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
    right: -22px;
    top: 50%;
    margin-top: -32px;
    z-index: 100;
  }

  .auctionDetailStatusTitle {
    padding: 8px 16px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
    width: 100%;
    height: 40px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
    background-color: #ffffff;
  }

  .auctionDetailStatus {
    margin-top: 32px;
    width: 1216px;
    height: 134px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .progress {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 6px;
  }

  .progress span {
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .tableAct {
    color: blue;
    border-bottom: 1px solid blue;
  }

  .orderListBody::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 5px;
    /*高宽分别对应横竖滚动条的尺寸*/
    height: 1px;
    margin-right: -10px;
  }

  .orderListBody::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c1c1c1;
  }

  .orderListBody::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background: #f1f1f1;
  }

  .ivu-progress-success .ivu-progress-bg {
    background-color: #76e5a1;
  }

  .ivu-progress-bg,
  .ivu-progress-inner {
    border-radius: 0;
  }

  .ivu-progress-inner-text {
    color: #32325d;
  }

  .ivu-progress-inner {
    background-color: #e6ebf1;
  }
</style>
<style lang="scss" scoped>
  .Oval {
    text-align: center;
    position: absolute;
    right: 16px;
    top: 4px;
  }

  /deep/ .ivu-poptip-body {
    padding: 0;
  }

  /deep/ .ivu-poptip-arrow,
  .ivu-poptip-arrow:after {
    display: none;
  }

  .orderListBody {
    overflow-y: scroll;
    height: 360px;
  }

  .roleContent {
    padding: 16px 16px 52px 16px;
    font-family: AppleSDGothicNeo;
    font-size: 14px;
    font-weight: 300;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;

    div {
      font-family: CircularStd;
      font-weight: normal;
    }
  }

  .Mask {
    width: 384px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;

    .h {
      padding: 8px 16px;
      width: 382px;
      height: 40px;
      box-shadow: inset 0 -1px 0 0 #e6ebf1;
      background-color: #ffffff;
      font-family: CircularStd;
      font-size: 16px;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 1.5;
      letter-spacing: -0.65px;
      color: #32325d;
    }

    .b {
      width: 382px;
      height: 32px;
      border-radius: 2px;
      box-shadow: inset 0 -1px 0 0 #f7f9fc;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 6px 16px;

      .bl {
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

      .br {
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
    }
  }

  .f4 {
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

  .auctionDetail {
    min-width: 1216px;
    background: #e3e8ee;
    //padding-top: 122px;
    padding-bottom: 160px;

    .time {
      width: 1216px;
      margin: 0 auto;
      height: 122px;

      .date {
        padding-top: 23px;
        font-family: CircularStd;
        font-size: 14px;
        line-height: 20px;
        text-align: right;
        color: #bdc6d4;
        //padding-right: 16px;
      }
    }

    #home {
      .top {
        width: 100%;
        background: #fff;
        position: relative;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
        border: solid 1px #e6ebf1;

        img {
          width: 176px;
          height: 176px;
          position: absolute;
          top: -88px;
          left: 50%;
          margin-left: -88px;
          border-radius: 4px;
          box-shadow: 0 10px 20px 0 rgba(86, 90, 191, 0.4);
        }

        .name {
          margin-top: 94px;

          p:nth-of-type(1) {
            text-align: center;
            font-family: CircularStd;
            font-size: 24px;
            font-weight: 500;
            line-height: 32px;
            letter-spacing: -1px;
            color: #32325d;
          }

          p:nth-of-type(2) {
            text-align: center;
            font-family: CircularStd;
            font-size: 14px;
            line-height: 20px;
            color: #32325d;
          }
        }

        .detail {
          margin: 12px auto 20px;
          width: 592px;
          font-family: CircularStd;
          font-size: 14px;
          line-height: 20px;
          text-align: center;
          color: #bdc6d4;
        }

        .price {
          display: flex;
          height: 96px;
          background: #f7f9fc;
          justify-content: center;
          align-items: center;

          .item {
            font-family: CircularStd;

            p:nth-of-type(1) {
              //padding-top: 14px;
              font-size: 12px;
              line-height: 16px;
              text-align: center;
              color: #32325d;
            }

            p:nth-of-type(2) {
              //padding-top: 4px;
              font-size: 24px;
              line-height: 36px;
              text-align: center;
              color: #32325d;
              margin: 0 33px;
            }

            p:nth-of-type(3) {
              font-size: 12px;
              line-height: 16px;
              text-align: center;
              color: #bdc6d4;
            }
          }
        }
      }

      .part2 {
        padding-top: 32px;
        display: flex;
        justify-content: space-between;

        .item {
          width: 592px;
          height: 452px;
          border-radius: 4px;
          box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
          border: solid 1px #e6ebf1;
          background-color: #ffffff;

          h3 {
            padding-top: 4px;
            width: 100%;
            padding-left: 16px;
            height: 40px;
            box-shadow: inset 0 -1px 0 0 #e6ebf1;
            font-family: CircularStd;
            font-size: 16px;
            font-weight: 500;
            line-height: 40px;
            letter-spacing: -0.65px;
            color: #32325d;
          }

          .title,
          .tr {
            position: relative;
            padding: 0 16px;
            display: flex;
            justify-content: space-between;
            width: 100%;
            height: 32px;
            line-height: 32px;
            border-radius: 2px;
            background-color: #f7f9fc;

            span {
              font-family: CircularStd;
              font-size: 14px;
              text-align: right;
              color: #32325d;
            }
          }

          .tr {
            height: 42px;
            line-height: 42px;
            box-shadow: inset 0 -1px 0 0 #f7f9fc;
            background: #fff;

            span:nth-of-type(2) {
              display: flex;
              flex-direction: column;
              line-height: 20px;

              strong {
                color: #bdc6d4;
                font-size: 12px;
                font-weight: normal;
              }
            }
          }
        }

        .item2 {
          width: 592px;
          height: 432px;
          border-radius: 4px;
          box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
          border: solid 1px #e6ebf1;
          background-color: #ffffff;

          .tab {
            position: relative;
            padding-left: 16px;
            display: flex;
            height: 40px;
            box-shadow: inset 0 -1px 0 0 #e6ebf1;

            span {
              font-family: CircularStd;
              font-size: 16px;
              font-weight: 500;
              line-height: 40px;
              letter-spacing: -0.65px;
              padding-right: 10px;
              color: #32325d;
            }
          }

          .bid {
            .price,
            .amount {
              width: 560px;
              margin: 0 auto;
              position: relative;

              span:nth-of-type(1) {
                font-family: CircularStd;
                font-size: 14px;
                color: #565abf;
                position: absolute;
                top: 10px;
                left: 17px;
              }

              span:nth-of-type(2) {
                font-family: CircularStd;
                font-size: 14px;
                color: #32325d;
                position: absolute;
                top: 10px;
                right: 16px;
              }

              .input {
                padding-left: 93px;
                padding-right: 50px;
                width: 560px;
                height: 40px;
                border-radius: 2px;
                border: solid 1px #e6ebf1;
                background-color: #ffffff;
                margin-bottom: 8px;
              }
            }

            .amount .input {
              margin-bottom: 0px;
            }

            .tips {
              padding: 4px 16px 0 16px;
              font-family: CircularStd;
              font-size: 12px;
              display: flex;
              justify-content: space-between;
              align-items: center;

              .tips1 {
                display: flex;
                align-items: center;

                span:nth-of-type(1) {
                  color: #f4496d;
                }
              }

              .tips2 {
                span:nth-of-type(1) {
                  color: #bdc6d4;
                  //padding-left: 100px;
                }

                span:nth-of-type(2) {
                  color: #87bbfc;
                }
              }
            }

            .options {
              margin: 8px auto 0;
              display: flex;
              width: 560px;
              height: 40px;
              background-color: #ffffff;

              label {
                flex: 1;
                height: 40px;
                font-family: CircularStd;
                font-size: 14px;
                line-height: 40px;
                text-align: center;
              }
            }

            .bottom {
              width: 100%;
              height: 204px;
              background-color: #f7f9fc;
              margin-top: 16px;
              padding-bottom: 16px;

              .free {
                padding: 8px 16px;
                box-shadow: inset 0 -1px 0 0 #e6ebf1;

                p {
                  display: flex;
                  justify-content: space-between;
                  font-family: CircularStd;
                  font-size: 14px;
                  color: #32325d;

                  span:nth-of-type(2) {
                    display: flex;
                    text-align: right;
                    flex-direction: column;

                    i {
                      color: #bdc6d4;
                      font-size: 12px;
                    }
                  }
                }
              }

              .total {
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 8px 16px 0;
                font-family: CircularStd;
                font-size: 16px;
                font-weight: 500;
                color: #32325d;

                p:nth-of-type(2) {
                  display: flex;
                  flex-direction: column;
                  text-align: right;
                  font-size: 16px;
                  color: #565abf;

                  span {
                    font-size: 12px;
                    color: #bdc6d4;
                  }
                }
              }

              .button {
                margin: 8px 16px 0 16px;
                width: 560px;
                height: 40px;
                border-radius: 4px;
                background-color: #565abf;
                font-family: CircularStd;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                color: #ffffff;
              }
            }
          }
        }
      }

      .part4 {
        margin-top: 40px;

        h3 {
          font-family: CircularStd;
          font-size: 24px;
          font-weight: 500;
          color: #32325d;
        }

        .con {
          display: flex;
          flex-wrap: wrap;
          padding-bottom: 140px;
          margin-top: 16px;

          .item {
            margin-right: 22px;
            box-sizing: border-box;
            width: 280px;
            padding: 16px;
            border-radius: 4px;
            box-shadow: 0 8px 16px 0 rgba(50, 50, 93, 0.1);
            background-color: #ffffff;

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
                line-height: 28px;
                letter-spacing: -1px;
                color: #32325d;
                margin-top: 8px;
              }

              p:nth-of-type(2) {
                font-family: CircularStd;
                font-size: 16px;
                line-height: 24px;
                letter-spacing: -0.4px;
                color: #32325d;
              }
            }

            .price {
              p {
                padding-top: 8px;
                display: flex;
                justify-content: space-between;
                font-family: CircularStd;
                font-size: 12px;
                line-height: 16px;
                color: #32325d;

                .span1 {
                  color: #565abf;
                }

                .span2 {
                  color: #f4496d;
                }

                .span3 {
                  color: #f7d269;
                }
              }
            }

            .bottom {
              padding-top: 16px;
              display: flex;
              justify-content: flex-end;

              p {
                width: 62px;
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
