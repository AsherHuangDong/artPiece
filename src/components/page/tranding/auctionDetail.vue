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
      <!--			头部版权信息-->
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
        "></div>
          <div class="item">
            <p>{{ $t('auctionDetail.Current_hightest_Price')}}</p>
            <p>{{ toThousands(rItem.copyrightAuctionDetails.currentHighestPrice) }}</p>
            <p>={{ toThousands((rItem.copyrightAuctionDetails.currentHighestPrice * rate).toFixed(2)) }} {{rateLogo}}</p>
          </div>
        </div>
      </div>
      <div class="part2">
        <div class="item" style="height: 432px;">
          <h3>{{ $t('auctionDetail.Section_Label')}}</h3>
          <div style="display: flex;justify-content: space-between; align-items: center;" class="title">
            <span style="width: 20%;text-align: left">{{ $t('auctionDetail.Cumulative_Qty')}}</span>
            <span style="width: 30%;">{{ $t('auctionDetail.Bid_Price')}}</span>
            <span style="width: 30%;">{{ $t('auctionDetail.Status')}}</span>
          </div>
          <div class="orderListBody" style="height: 358px;overflow: scroll">
            <div style="display: flex;justify-content: space-between; align-items: center;position: relative"
                 class="tr"
                 v-for="(item,index) in orderList" :key="index">
              <div :style="{width: (item.amount / getDetailData.copyrightAuction.totalPieces) * 585 + 'px' }"
                   style="position: absolute;background-color:orange;height: 100%;left: 0;z-index: 0;opacity: 0.2"></div>
              <span style="width: 20%;text-align: left">{{ item.amount }}</span>
              <span style="width: 30%;">
								{{ toThousands((item.bidPrice).toFixed(priceAccuracy)) }} {{item.bidSymbol}}
								<strong>={{ toThousands((item.bidPrice * rate).toFixed(2)) }} {{rateLogo}}</strong>
							</span>
              <span style="width: 30%;">
								{{ item.status === 1 ?
                $t('auctionDetail.Won') : item.status === 2 ?
                $t('auctionDetail.Partially') : item.status === 3 ?
                $t('auctionDetail.Wait_list') : item.status === 4 ?
                $t('auctionDetail.cancel') : $t('auctionDetail.finish')}}
							</span>
            </div>
          </div>
        </div>
        <div class="item item2" style="height: 432px;">
          <div class="tab">
            <span class="pointer" :class="tableAct === 1 ? 'tableAct' : ''" style="padding: 0;margin-right: 12px;"
                  @click="tableChange(1)">{{ $t('auctionDetail.Bid')}}</span>
            <span class="pointer" v-if="isSign === '1'" :class="tableAct === 2 ? 'tableAct' : ''"
                  style="padding: 0;margin-right: 12px;"
                  @click="tableChange(2)">{{ $t('auctionDetail.History')}}</span>
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
					<!--          拍卖-->
          <div v-if="tableAct === 1" class="bid">
            <div class="price">
              <span>{{ $t('auctionDetail.Price')}}</span>
              <input v-model="placeOrderParams.price" class="input"/>
              <span>AP</span>
            </div>
            <div class="amount">
              <span>{{ $t('auctionDetail.Amount')}}</span>
              <input v-model="placeOrderParams.amount" class="input"/>
              <span>{{ $t('auctionDetail.Piece')}}</span>
            </div>
            <div class="tips">
              <div class="tips1">
                <img src="../../../assets/failed.png" style="width:12px;height:12px;margin-right:4px" alt/>
                <span>{{ $t('auctionDetail.Minimum_order_amount')}} {{ toThousands(rItem.minAuctionNumber) }}{{ $t('auctionDetail.Piece')}}</span>
              </div>
              <div class="tips2">
                <span>{{ $t('auctionDetail.Avalable')}}&nbsp;</span>
                <span>{{ toThousands(userBalance.availableAP.balance) }}AP</span>
              </div>
            </div>
            <RadioGroup @on-change="changeAmountPercent" class="options" type="button" v-model="amountPercent">
              <Radio :label="25">25%</Radio>
              <Radio :label="50">50%</Radio>
              <Radio :label="75">75%</Radio>
              <Radio :label="100">100%</Radio>
            </RadioGroup>
            <div class="bottom">
              <div class="free">
                <div class="free1">
                  <p>
                    <span>{{ $t('auctionDetail.Ordered_Amount')}}</span>
                    <span style="display: flex;justify-content: flex-start;flex-direction: column;">
											<div style="height: 20px;">{{ toThousands((placeOrderParams.price * placeOrderParams.amount).toFixed(priceAccuracy)) }} AP</div>
											<i style="height: 12px;">={{ toThousands((placeOrderParams.price * placeOrderParams.amount * rate).toFixed(2)) }} {{rateLogo}}</i>
										</span>
                  </p>
                  <p>
                    <span>{{ $t('auctionDetail.Fee')}}</span>
                    <span style="display: flex;justify-content: flex-start;flex-direction: column;"
                          v-if="getDetailData.map.isFree !== 1">
											<div style="height: 20px;">
												{{ toThousands((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100).toFixed(priceAccuracy)) }} AP
											</div>
											<i style="height: 12px;">={{ toThousands(((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100) * rate).toFixed(2)) }}
												{{rateLogo}}</i>
										</span>
                    <span style="display: flex;justify-content: flex-start;flex-direction: column;"
                          v-if="getDetailData.map.isFree === 1">
											<div style="height: 20px;">0 AP</div>
											<span style="height: 12px;">=0 {{rateLogo}}</span>
										</span>
                  </p>
                </div>
              </div>
              <div class="total">
                <p>{{ $t('auctionDetail.Total')}}</p>
                <p style="display: flex;justify-content: flex-start;flex-direction: column;"
                   v-if="getDetailData.map.isFree !== 1">
									<span style="height: 24px;display: inline-block;color: #565abf;font-size: 16px;">
										{{ toThousands(((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100) + placeOrderParams.price * placeOrderParams.amount).toFixed(priceAccuracy)) }} AP
									</span>
                  <span style="height: 12px;display: inline-block">={{toThousands((((getDetailData.map.fee + getDetailData.map.feePercent * placeOrderParams.price * placeOrderParams.amount / 100) + placeOrderParams.price * placeOrderParams.amount) * rate).toFixed(2)) }}
										{{rateLogo}}</span>
                </p>
                <p style="display: flex;justify-content: flex-start;flex-direction: column;"
                   v-if="getDetailData.map.isFree === 1">
									<span style="height: 24px;display: inline-block;color: #565abf;font-size: 16px;">
									{{ toThousands((placeOrderParams.price * placeOrderParams.amount).toFixed(priceAccuracy)) }} AP
									</span>
                  <span style="height: 12px;display: inline-block">={{toThousands(((placeOrderParams.price * placeOrderParams.amount) * rate).toFixed(2)) }} {{rateLogo}}</span>
                </p>
              </div>
              <Button :disabled="showRemainTime === '00:00:00' && isBegin || !isBegin || isSign === '0'"
                      :loading="loading.bid"
                      @click="placeOrder" class="button">
                <span>{{ $t('auctionDetail.Bid')}}</span>
                <!-- <span v-if="isSign === '0'">{{ $t('request.pleaseLogin') }}</span> -->
              </Button>
            </div>
          </div>
<!--					历史-->
          <div v-if="tableAct === 2" class="bid">
            <div style="display: flex;justify-content: space-between; align-items: center;margin-top:-16px;"
                 class="title">
              <span style="width: 15%;text-align: left">{{ $t('auctionDetail.Time')}}</span>
              <span style="width: 15%;text-align: center">{{ $t('auctionDetail.Qty')}}</span>
              <span style="width: 25%;text-align: right">{{ $t('auctionDetail.Bid_Price')}}</span>
              <span style="width: 15%;">{{ $t('auctionDetail.Status')}}</span>
              <span style="width: 30%;">{{ $t('auctionDetail.operation')}}</span>
            </div>
            <div v-if="history.length!=0" class="orderListBody" style="height: 358px;overflow: scroll;">
              <div style="display: flex;justify-content: space-between; align-items: center" class="tr"
                   v-for="(item,index) in history"
                   :key="index">
								<span style="width: 15%;text-align: left;height: auto">
									<div style="height: 16px;line-height: 1">{{ item.tH }}</div>
									<div style="height: 16px;line-height: 1">{{ item.tF }}</div>
								</span>
                <span style="width: 15%;text-align: center">{{ item.amount }}</span>
                <span style="width: 25%;text-align: right;display: flex;flex-direction: column;line-height: 20px;">
									{{ toThousands((item.bidPrice).toFixed(priceAccuracy)) }} {{item.bidSymbol}}
									<strong style="color: #bdc6d4;font-size: 12px;font-weight: normal;">={{ toThousands((item.bidPrice * rate).toFixed(2)) }}
										{{rateLogo}}</strong>
								</span>
                <span style="width: 15%;">{{ item.status === 1 ? $t('auctionDetail.Won') : item.status === 2 ? $t('auctionDetail.Partially') : item.status === 3 ? $t('auctionDetail.Wait_list') : item.status === 4 ? $t('auctionDetail.cancel') : $t('auctionDetail.finish')}}</span>
                <span style="width: 30%;">
									<Button v-if="item.status !== 4" @click="cancelOrder(item)" type="primary">{{ $t('auctionDetail.Cancel_Order')}}</Button>
								</span>
              </div>
            </div>
            <div style="display:flex;justify-content:center;align-items:center;margin-top:100px;"
                 v-if="history.length==0">
              <div style="display:flex;flex-direction:column;align-items:center;">
                <img src="../../../assets/noData2.png" style="width:40px;height:40px" alt="">
                <span style="color:#bdc6d4;text-align: center;font-size: 14px;margin-top:5px">{{$t('NoData')}}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="f4">
        <!--        v-if="getDetailData.graphical.blinedOne.length === 0"-->
        <div class="Mask2" id="mask1" style="height: 328px;">
          <img style="z-index: 999;height: 50px;width: 49px;margin: 120px auto 0;display: block;"
               src="../../../assets/noData2.png"
               alt/>
          <div style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;height: 21px;line-height: 21px;">{{ $t('NoData')}}</div>
        </div>
        <!--        <div class="Mask2" id="mask2"></div>-->
        <div class="Mask" style="height: 328px;overflow: hidden;">
          <div class="h">{{ $t('auctionDetail.Infromation')}}</div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Term')}}</div>
            <div class="br">{{ getDetailData.information.term }}</div>
          </div>
          <div class="b">
            <div class="bl">{{ $t('auctionDetail.Last__average')}}</div>
            <div class="br">{{ getDetailData.information.Last12MonThs ? getDetailData.information.Last12MonThs : '--'}}
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
          <img style="z-index: 999;height: 50px;width: 49px;margin: 120px auto 0;display: block;"
               src="../../../assets/noData2.png"
               alt/>
          <div style="width: 100%;color:#bdc6d4;text-align: center;font-size: 14px;height: 21px;line-height: 21px;">{{ $t('NoData')}}</div>
        </div>
      </div>
      <div class="f4">
        <div class="Mask" style="width: 100%;">
          <div class="h" style="width: 100%;">{{ $t('auctionDetail.Rules')}}</div>
          <div class="roleContent">
            <div style="font-weight: bold;font-size: 14px;">{{ $t('auctionDetail.Auction_rules')}}</div>
            <div id="auctionRules"></div>
            <div style="font-weight: bold;font-size: 14px;margin-top: 28px">{{ $t('auctionDetail.Auction__policy')}}
            </div>
            <div id="auctionCancel"></div>
          </div>
        </div>
      </div>
      <div class="part4">
        <h3>{{ $t('auctionDetail.Recommend')}}</h3>
        <div class="banner con" v-if="getDetailData.recommend.length" style="position: relative;">
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
                    <span class="span1">{{toThousands(item.copyrightAuctionDetails.startPrice)}}</span>
                  </p>
                  <p>
                    <span>{{ $t('auctionDetail.Current__price')}}</span>
                    <span class="span2">{{ toThousands(item.copyrightAuctionDetails.currentHighestPrice) }}</span>
                  </p>
                  <p>
                    <span>{{ $t('auctionDetail.Quantity_sold')}}</span>
                    <span class="span3">{{ toThousands(item.copyrightAuctionDetails.quantitySold) }}</span>
                  </p>
                </div>
                <div class="bottom">
                  <p class="pointer" @click="toDetail(item)">{{ $t('auctionDetail.Bid')}}</p>
                </div>
              </div>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination" v-if="getDetailData.recommend.length > 4"></div>
            <div id="prev" class="swiper-button-prev" slot="button-prev"
                 v-if="getDetailData.recommend.length > 4"></div>
            <div id="next" class="swiper-button-next" slot="button-next"
                 v-if="getDetailData.recommend.length > 4"></div>
          </swiper>
          <div @click="prev" class="swiper-button-prev" style="top: 241px;"
               v-if="getDetailData.recommend.length > 4"></div>
          <div @click="next" class="swiper-button-next" style="top: 241px;"
               v-if="getDetailData.recommend.length > 4"></div>
        </div>
      </div>
    </div>
    <FailedModal :show="show.failed" :text="show.failedText" :text2="show.failedText2"></FailedModal>
    <SuccessModal :show="show.success" :text="show.successText"></SuccessModal>
    <Confirm :show="show.confirm" :text="show.confirmText" :self="this" :item="cancelOrderItem.item"
             :loading="loading.confirm"></Confirm>
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
    name: "auctiondetail",
    components: {
      FailedModal,
      SuccessModal,
      Confirm
    },
    data() {
      // const self = this;
      return {
        canShowTime: false,
        isBegin: false,
        isSign: localStorage.getItem("isSign"),
        swiperOption: {
          slidesPerView: 4,
          spaceBetween: 30,
          slidesPerGroup: 4,
          loop: true,
          loopFillGroupWithBlank: true,
          // on: {
          //   click(item) {
          //     let a = JSON.parse(item.path[1].getAttribute("myClick"));
          //     console.log(a);
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
        percent: 80,
        percentText: "",
        cancelOrderItem: {
          item: {}
        },
        cancelOrderParams: {
          copyrightAuctionId: JSON.parse(sessionStorage.getItem("item")).id,
          copyrightAuctionOrderId: ""
        },
        history: [],
        tableAct: 1,
        showRemainTime: "",
        thisPublishTime: '',
        amountPercent: 0,
        show: {
          failed: false,
          failedText: "",
          failedText2: "",
          success: false,
          successText: "",
          confirmText: "",
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
        thisStartTime: "", // 拍卖开始时间
        getDetailData: {
          graphical: {
            blinedOne: []
          },
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
            totalPieces: ""
          },
          recommend: {},
          information: {}
        },
        loading: {
          confirm: false,
          bid: false
        },
        placeOrderParams: {
          amount: '',
          price: ''
        },
        priceAccuracy: 0,
        thisEndTime: "",
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
          return "KRW";
        } else {
          return "USD";
        }
      }
    },
    watch: {
      $lang() {
        this.lang = window.newVue.$lang.toString().replace(/-/g, "_");
      },
      "placeOrderParams.price"(n, o) {
        let reg = /^([0-9]+(\.[0-9]*|\.|))?$/;
        if (!reg.test(n)) {
          if (n === '') {
            this.placeOrderParams.price = ''
          } else {
            this.placeOrderParams.price = o;
          }
        }
      },
      "placeOrderParams.amount"(n, o) {
        let reg = /^([0-9]+(\.[0-9]*|\.|))?$/;
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
      // 输入的数量、价格不能是负数
      blurOrderPrice(e) {
        const self = this;
        if (Number(e.target.value) < 0) {
          self.placeOrderParams.price = 0;
        }
      },
      blurOrderAmount(e) {
        const self = this;
        if (Number(e.target.value) < 0) {
          self.placeOrderParams.amount = 0;
        }
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
        this.show.confirmText = this.$t("auctionDetail.cancelconfirmText");
      },
      // 确认取消订单
      confirm(item) {
        this.loading.confirm = true;
        this.cancelOrderParams.copyrightAuctionOrderId = item.id;
        let form = new FormData();
        for (let i in this.cancelOrderParams) {
          form.append(i, this.cancelOrderParams[i]);
        }
        this.$post("/api/copyrightAuctionOrder/cancelOrder", form)
          .then(res => {
            console.log(res);
            if (res.code === 0) {
              this.show.successText = this.$t("auctionDetail.CancelSuccess");
              this.show.success = true;
              this.tableChange(2);
              this.getOrderList();
              setTimeout(() => {
                this.show.success = false;
              }, 1500);
            } else {
              // 后端做翻译了，直接取msg
              // // 获取分钟数
              // const a = res.msg.indexOf("分钟前不可撤销！");
              // const b = 6;
              // const c = res.msg.substring(b, a);
              this.show.failedText = res.msg
              this.show.failedText2 = ''
                // this.$t("auctionDetail.cantCancelContent1") +
                // c +
                // this.$t("auctionDetail.cantCancelContent2");
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
        if (int === 2) {
          // /copyrightAuctionOrder/getCopyrightAuctionOrderByUserId 获取该用户的拍卖列表
          let form = new FormData();
          form.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
          form.append(
            "copyrightAuctionId",
            JSON.parse(sessionStorage.getItem("item")).id
          );
          this.$post(
            "/api/copyrightAuctionOrder/getCopyrightAuctionOrderByUserId",
            form
          ).then(res => {
            console.log(res);
            // this.history = [{}]
            this.history = res.data;
            for (let i in this.history) {
              const index = this.history[i].createTime.indexOf(" ");
              this.history[i].tH = this.history[i].createTime.slice(0, index);
              this.history[i].tF = this.history[i].createTime.slice(index);
            }
          });
        }
      },
      // 不允许用户输入小数点
      handleInput(e) {
        console.log(e.target.value);
        e.target.value.indexOf(".") > -1 ?
          (e.target.value = e.target.value.substring(
            0,
            e.target.value.indexOf(".")
          )) :
          "";
        this.placeOrderParams.amount = e.target.value;
        // console.log(e.target.value.indexOf('.'))
      },
      // 当输入amount时清除百分比
      clearAmountPercent() {
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
          console.log(count);
          this.orderFlag =
            count <= JSON.parse(sessionStorage.getItem("item")).priceAccuracy;
        } else {
          this.orderFlag = true;
        }
      },
      init(f) {
        if (!f) {
          this.returnTop()
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
        // this.$chart.line3('mskImg')
      },
      // 获取目前登录的用户的可用AP
      getUserAp() {
        if (localStorage.getItem("isSign") === "1") {
          this.$post("/api/account/getUserAp").then(res => {
            console.log(res);
            if (res.msg.indexOf('token') !== -1) {
              localStorage.setItem("isSign", "0");
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
      // /copyrightAuctionOrder/placeOrder 添加拍卖订单
      placeOrder() {
        if (localStorage.getItem("isSign") === "0") {
          // 退出登录后跳到首页
          // this.$router.push('/login')
          this.$router.push('/')
          return false;
        }
        if (!this.placeOrderParams.price) {
          this.show.failed = true;
          this.show.failedText = this.$t("auctionDetail.Bidding_failure");
          this.show.failedText2 = this.$t("auctionDetail.content18");
          setTimeout(() => {
            this.show.failed = false;
          }, 2500);
          return null;
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
        // 判断价格精度
        this.numberPoint(this.placeOrderParams.price);
        // this.numberPoint(this.placeOrderParams.amount);
        if (!this.orderFlag) {
          this.show.failed = true;
          this.show.failedText = this.$t("auctionDetail.Price_input_error");
          this.show.failedText2 =
            this.$t("auctionDetail.content8") +
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
        let url = "/api/copyrightAuctionOrder/placeOrder";
        this.loading.bid = true;
        this.$post(url, form).then(res => {
          this.loading.bid = false;
          console.log(res);
          if (res.code === 0) {
            this.placeOrderParams.price = ''
            this.placeOrderParams.amount = ''
            this.show.success = true;
            this.show.successText = this.$t("auctionDetail.Bidding_success");
            setTimeout(() => {
              this.show.success = false;
            }, 2500);
          } else {
            this.show.failed = true;
            this.show.failedText = this.$t("auctionDetail.Bidding_failure");
            this.show.failedText2 = res.msg;
            setTimeout(() => {
              this.show.failed = false;
            }, 2500);
          }
          this.init(true);
        });
      },
      // 获取左侧订单列表
      getOrderList() {
        let form = new FormData();
        form.append("copyrightAuctionId", this.$route.query.id);
        let url = "/api/copyrightAuctionOrder/getOrderList";
        this.$post(url, form).then(res => {
          console.log(res);
          this.orderList = res.data;
          // 当前最高价
          try {
            this.rItem.copyrightAuctionDetails.currentHighestPrice =
              res.data[0].bidPrice;
          } catch (e) {
            this.rItem.copyrightAuctionDetails.currentHighestPrice = 0;
          }
        });
      },
      // 获取版权详情
      getDetail() {
        this.canShowTime = false
        let form = new FormData();
        form.append("id", this.$route.query.id);
        // form.append('userId', JSON.parse(localStorage.getItem('userInfo')).id)
        let url = "/api/copyrightAuction/getCopyrightByCountryIdOrArtistById";
        this.$post(url, form).then(res => {
          console.log(res);
          if (!res.data.map) {
            res.data.map = {
              fee: 0,
              feePercent: 0,
              isFree: 0
            };
            this.getDetailData = res.data;
          } else {
            this.getDetailData = res.data;
          }
          // 画图
          if (res.data.graphical.blinedOne.length !== 0) {
            this.$chart.line2("mask1", res.data.graphical.blinedOne);
          }
          // this.$chart.line2('mask2', res.data.graphical.blinedTwo)
          if (res.data.graphical.cGraph.length !== 0) {
            this.$chart.bar1("mask3", res.data.graphical.cGraph);
          }
          // 版权的发行日期
          if (this.getDetailData.information.publishTime) {
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
            console.log("还没开始");
            this.isBegin = false;
            remainingTime = this.thisStartTime;
            const now = new Date().getTime();
            this.remainingTime = remainingTime - now;
            console.log(this.remainingTime);
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
            console.log("开始了");
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
        });
      },
      getCopyrightAuctionOrderByUserId() {
        let form = new FormData();
        form.append("copyrightAuctionId", this.$route.query.id);
        form.append("userId", JSON.parse(localStorage.getItem("userInfo")).id);
        let url = "/api/copyrightAuctionOrder/getCopyrightAuctionOrderByUserId";
        this.$post(url, form).then(res => {
          console.log(res);
        });
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
          this.init();
        } else {
          sessionStorage.setItem("item", JSON.stringify(item));
          this.$router.push({
            path: "/auctiondetail2",
            query: {
              id: item.id
            }
          });
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

  .tableAct {
    color: #565abf;
    border-bottom: 2px solid #565abf;
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
	.orderListBody2::-webkit-scrollbar {
		/*滚动条整体样式*/
		width: 0;
		/*高宽分别对应横竖滚动条的尺寸*/
		height: 0;
	}

	.orderListBody2::-webkit-scrollbar-thumb {
		/*滚动条里面小方块*/
		border-radius: 0;
	}

	.orderListBody2::-webkit-scrollbar-track {
		/*滚动条里面轨道*/
	}

  .ivu-radio-group-button .ivu-radio-wrapper-checked:first-child {
    border-color: #565abf;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked {
    color: #565abf !important;
    border-color: #565abf !important;
    box-shadow: -1px 0 0 0 #565abf;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked:hover {
    border-color: #565abf;
    color: #565abf !important;
  }

  .ivu-radio-group-button .ivu-radio-wrapper-checked:before {
    background: #565abf !important;
  }

  .ivu-radio-group-button .ivu-radio-wrapper {
    color: #bdc6d4;
  }
</style>
<style lang="scss" scoped>
<<<<<<< HEAD
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

	.roleContent {
		//overflow-y: scroll;
		padding: 16px 16px 52px 16px;
		//height: 287px;
		font-family: AppleSDGothicNeo;
		font-size: 14px;
		font-weight: 300;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: -0.4px;
		color: #32325d;

		div {
			font-family: mFont;
			font-weight: normal;
		}
	}

	.Mask {
		//width: 384px;
		//height: 328px;
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
			font-family: mFont;
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
				font-family: mFont;
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
				font-family: mFont;
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
		min-width: 1200px;
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
		min-width: 1200px;
		background: #e3e8ee;
		//padding-top: 122px;
		padding-bottom: 160px;

		.time {
			width: 1200px;
			margin: 0 auto;
			height: 122px;

			.date {
				padding-top: 23px;
				font-family: mFont;
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

				.date {
					padding-top: 12px;
					font-family: mFont;
					font-size: 14px;
					line-height: 20px;
					text-align: right;
					color: #32325d;
					//padding-right: 16px;
				}

				.name {
					margin-top: 94px;

					p:nth-of-type(1) {
						text-align: center;
						font-family: mFont;
						font-size: 24px;
						font-weight: 500;
						line-height: 32px;
						letter-spacing: -1px;
						color: #32325d;
					}

					p:nth-of-type(2) {
						text-align: center;
						font-family: mFont;
						font-size: 14px;
						line-height: 20px;
						color: #32325d;
					}
				}

				.detail {
					margin: 12px auto 20px;
					width: 592px;
					font-family: mFont;
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
						font-family: mFont;

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
					height: 432px;
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
						font-family: mFont;
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
							font-family: mFont;
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
					height: 452px;
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
							font-family: mFont;
							font-size: 16px;
							font-weight: 500;
							line-height: 40px;
							letter-spacing: -0.65px;
							padding-right: 10px;
						}
					}

					.bid {
						padding: 16px 0;

						.price,
						.amount {
							width: 560px;
							margin: 0 auto;
							position: relative;

							span:nth-of-type(1) {
								font-family: mFont;
								font-size: 14px;
								color: #565abf;
								position: absolute;
								top: 10px;
								left: 17px;
							}

							span:nth-of-type(2) {
								font-family: mFont;
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
							padding: 4px 16px 12px 16px;
							font-family: mFont;
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
							margin: 0px auto 0;
							display: flex;
							width: 560px;
							height: 40px;
							background-color: #ffffff;

							label {
								flex: 1;
								height: 40px;
								font-family: mFont;
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

								.free1 {
									box-shadow: inset 0 -1px 0 0 #e6ebf1;
									padding-bottom: 8px;

									p {
										margin-top: 6px;
										display: flex;
										justify-content: space-between;
										font-family: mFont;
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

											span {
												color: #bdc6d4;
												font-size: 12px;
											}
										}
									}
								}
							}

							.total {
								width: 100%;
								display: flex;
								justify-content: space-between;
								padding: 0 16px;
								font-family: mFont;
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
								margin: 8px auto 0;
								width: 560px;
								height: 40px;
								border-radius: 4px;
								background-color: #565abf;
								font-family: mFont;
								font-size: 14px;
								font-weight: 500;
								text-align: center;
								margin-left: 16px;
								color: #ffffff;
							}
						}
					}
				}
			}

			.part4 {
				margin-top: 40px;

				h3 {
					font-family: mFont;
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
								font-family: mFont;
								font-size: 20px;
								font-weight: 500;
								line-height: 28px;
								letter-spacing: -1px;
								color: #32325d;
								margin-top: 8px;
							}

							p:nth-of-type(2) {
								font-family: mFont;
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
								font-family: mFont;
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
								font-family: mFont;
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
=======
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
    //width: 384px;
    //height: 328px;
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

        .date {
          padding-top: 12px;
          font-family: CircularStd;
          font-size: 14px;
          line-height: 20px;
          text-align: right;
          color: #32325d;
          //padding-right: 16px;
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
          height: 452px;
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
            }
          }

          .bid {
            padding: 16px 0;

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
              padding: 4px 16px 12px 16px;
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
              margin: 0px auto 0;
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
              height: 195px;
              background-color: #f7f9fc;
              margin-top: 16px;
              padding-bottom: 16px;

              .free {
                padding: 8px 16px;

                .free1 {
                  box-shadow: inset 0 -1px 0 0 #e6ebf1;
                  padding-bottom: 8px;

                  p {
                    margin-top: 6px;
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

                      span {
                        color: #bdc6d4;
                        font-size: 12px;
                      }
                    }
                  }
                }
              }

              .total {
                width: 100%;
                display: flex;
                justify-content: space-between;
                padding: 0 16px;
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
                margin: 8px auto 0;
                width: 560px;
                height: 40px;
                border-radius: 4px;
                background-color: #565abf;
                font-family: CircularStd;
                font-size: 14px;
                font-weight: 500;
                text-align: center;
                margin-left: 16px;
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
>>>>>>> 183a5e5b1592636ce9c4f4ff4308debee16b7829
</style>
