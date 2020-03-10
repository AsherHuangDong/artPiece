<template>
  <div id="withdraw">
    <Header></Header>
    <div style="background-color: #e3e8ee;padding: 32px 0;">
      <div id="withdrawBox1">
        <div class="withdrawTitle">
          <div class="withdrawTitleText">{{ $t('asset.Withdraw') }}</div>
        </div>
        <div style="display: flex;justify-content: space-between;align-items: flex-start">
          <div style="width: 400px;padding:16px;">
            <p
              class="USDT"
              style="margin-bottom:8px;width:200px;text-align: left;"
            >{{ withdrawalSymbol.symbol }}</p>
            <div class="withDrawLeftCard1" style="overflow: hidden;border-radius: 2px;border-right:none;">
              <div
                class="withDrawLeftCard1Title"
                style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                :title="withdrawalSymbol.allBalance"
              >{{ toThousands(withdrawalSymbol.allBalance) }}</div>
              <div class="withDrawLeftCard1Balance">{{ $t('asset.deposit.Balance') }}</div>
            </div>
            <div class="withDrawLeftCard1" style="overflow: hidden;border-radius: 2px;">
              <div
                class="withDrawLeftCard1Title"
                style="overflow: hidden;white-space: nowrap;text-overflow: ellipsis;"
                :title="withdrawalSymbol.available"
              >{{ toThousands(withdrawalSymbol.available) }}</div>
              <div class="withDrawLeftCard1Balance">{{ $t('asset.deposit.Available') }}</div>
            </div>
            <div style=" box-shadow: inset 0 -1px 0 0 #e6ebf1;padding-bottom: 8px;">
              <div class="withDrawRow">
                <div class="withDrawCredit1">{{ $t('asset.withdraw.Credit_today') }}</div>
                <div class="withDrawCredit2">
                  {{ toThousands(withdrawLimit.dayAmount) }} /
                  {{ toThousands(withdrawLimit.dayLimit) }} {{ withdrawalSymbol.symbol }}
                </div>
              </div>
              <div class="withDrawRow">
                <div class="withDrawCredit1">{{ $t('asset.withdraw.Credit_month') }}</div>
                <div class="withDrawCredit2">
                  {{ toThousands(withdrawLimit.monthAmount) }} /
                  {{ toThousands(withdrawLimit.monthLimit)}} {{ withdrawalSymbol.symbol }}
                </div>
              </div>
            </div>
            <div class="To-read-Instruction" v-if="withdrawQuotaExplain">
              <span class="text-style-1">{{ $t('asset.withdraw.To_read') }}</span>
              <a :href="withdrawQuotaExplain" target="_blank">
                {{
                $t('asset.withdraw.Instruction_Credit') }}
              </a>
            </div>
          </div>
          <!--          提现地址、数量、手续费-->
          <div class="withDrawRightCard">
            <Form
              style="margin-top: 12px;"
              ref="formValidate1"
              :model="doWithDrawParam"
              :rules="ruleValidate1"
              label-position="top"
            >
              <FormItem :label="$t('asset.withdraw.Withdraw_Address')" prop="address">
                <Input v-model="doWithDrawParam.address" />
              </FormItem>
              <FormItem
                :label="$t('asset.withdraw.Amount')"
                prop="amount"
                style="position: relative;"
              >
                <Input
                  type="number"
                  v-model="doWithDrawParam.amount"
                  :placeholder="$t('withdrawRange') + '  ' + withdrawRange"
                />
                <a
                  @click="setAllAmount"
                  style="position: absolute;top: 5px;right: 16px;color: #565abf;font-size: 14px;"
                >{{ $t('Tranding.All') }}</a>
              </FormItem>
              <FormItem :label="$t('asset.withdraw.Fee')" prop="fee">
                <Input
                  type="number"
                  v-model="doWithDrawParam.fee"
                  :placeholder="$t('handleRange') + '  ' + feeRange"
                />
              </FormItem>
            </Form>
            <div style="display: flex;justify-content: space-between;align-items: center">
              <div class="Total" style="float: left">{{ $t('asset.withdraw.AmountReceived') }}</div>
              <div
                class="Total"
                style="float:right;color: #565abf;"
              >{{ inHandsAmount }} {{ withdrawalSymbol.symbol }}</div>
            </div>
            <div style="margin-top: 16px;text-align: right">
              <!--              提现按钮-->
              <Button
                :disabled="(isSetGoogleAuthenticatorStatus === 0 && isBindMobileStatus === 0)"
                :loading="toWithdrawLoading"
                class="widthDrawBtn"
                @click="clickWithdraw"
              >{{ $t('asset.withdraw.Withdraw') }}</Button>
            </div>
            <!--            <div v-if="isIdentityVerify !== 1" class="withdrawNoKYC">-->
            <!--              <div class="withdrawNoKYCTitle">{{ $t('asset.withdraw.content1') }}</div>-->
            <!--              <Button @click="toIdentity" class="widthDrawBtn" style="width: auto">{{ $t('asset.withdraw.content2') }}-->
            <!--              </Button>-->
            <!--            </div>-->
            <div
              v-if="isSetGoogleAuthenticatorStatus === 0 && isBindMobileStatus === 0"
              class="withdrawNoKYC"
            >
              <div class="withdrawNoKYCTitle">{{ $t('pleaseBindGP') }}</div>
              <Button
                @click="toAccount"
                class="widthDrawBtn"
                style="width: auto"
              >{{ $t('toAccount') }}</Button>
            </div>
          </div>
        </div>
      </div>
      <div id="withdrawBox2">
        <div class="withdrawTitle">
          <div class="withdrawTitleText">{{ $t('asset.withdraw.Withdraw_History') }}</div>
        </div>
        <div class="box2Params">
          <div style="margin-left: 16px;">
            <DatePicker :clearable="false" style="width:109px" @on-change="transferCoinLog" v-model="startTime" type="date"></DatePicker>
            <span style="font-size:14px;margin:0 8px">~</span>
            <DatePicker :clearable="false" style="width:109px" @on-change="transferCoinLog" v-model="endTime" type="date"></DatePicker>
          </div>
          <div style="margin-right: 16px;">
            <RadioGroup
              @on-change="changeDay"
              type="button"
              style="margin-right: 8px;"
              :value="'7 Days'"
            >
              <Radio label="7 Days">7 {{ $t('asset.withdraw.Days') }}</Radio>
              <Radio label="30 Days">30 {{ $t('asset.withdraw.Days') }}</Radio>
            </RadioGroup>
            <RadioGroup @on-change="changeNewst" type="button" :value="'By newest'">
              <Radio label="By newest">{{ $t('asset.deposit.By_newest')}}</Radio>
              <Radio label="By past">{{$t('asset.deposit.By_past')}}</Radio>
            </RadioGroup>
          </div>
        </div>
        <div>
          <!-- <div v-if="data1.length === 0" style="position: absolute;top: 73px;left: 376px;z-index: 100">
            <img style="width: 40px;height: 40px;" src="../../../assets/noData2.png" alt="">
            <div class="Nodata">{{ $t('Nodata')}}</div>
          </div>
          <div v-if="data1.length === 0" style="height: 50px;width: 800px;z-index: 99;background-color: #fff;position: absolute;top: 87px;"></div>-->
          <Table :columns="columns1" :data="data1" />
        </div>
        <div v-if="data1.length!=0" style="text-align: center;margin-top:20px;">
          <span>
            <Page :total="total" size="small" />
          </span>
        </div>
        <div
          class="nodata"
          style="margin-top: 12px;padding-bottom: 12px;"
          v-if="data1.length === 0"
        >
          <img src="../../../assets/noData2.png" alt />
          <p>{{$t('NoData')}}</p>
        </div>
      </div>
    </div>
    <SuccessModal :show="show.success" :text="show.successText"></SuccessModal>
    <FailedModal :show="show.failed" :text="show.failedText" :text2="show.failedText2"></FailedModal>
    <!--    <Confirm :show="show.confirm" :text="ctext" :text2="ctext2" :self="this" :item="citme"-->
    <!--             :loading="cloading"></Confirm>-->
    <Modal v-model="show.confirm" width="384" :closable="false" :mask-closable="false">
      <div class="success">
        <div class="confirm">{{ ctext }}</div>
        <div class="Guide-text">{{ ctext2 }}</div>
      </div>
      <div slot="footer">
        <Button class="widthDrawBtn2" @click="cancelConfirm" type="default">{{ $t('modal.back')}}</Button>
        <Button
          style="background-color: #565abf"
          class="widthDrawBtn3"
          :loading="loading.confirm"
          @click="confirm(citme)"
        >{{ $t('modal.confirm')}}</Button>
      </div>
    </Modal>
    <Modal
      @on-cancel="cancel"
      v-model="showModal"
      width="504"
      :closable="false"
      :mask-closable="false"
    >
      <div class="success2">
        <div class="Security-verify" style="text-align: center">
          <Form
            style="margin-top: 12px;"
            ref="formValidate"
            :model="doWithDrawParam"
            :rules="ruleValidate"
            :label-width="120"
          >
            <FormItem
              v-if="isBindMobileStatus === 1"
              :label="$t('userCenter.changePhone.Phone_code')"
              prop="smsValidCode"
            >
              <Input v-model="doWithDrawParam.smsValidCode" />
            </FormItem>
            <FormItem
              v-if="isSetGoogleAuthenticatorStatus === 1"
              :label="$t('userCenter.changePhone.Google_Verification_code')"
              prop="googleCode"
            >
              <Input v-model="doWithDrawParam.googleCode" />
            </FormItem>
            <FormItem :label="$t('modal.payPwd')" prop="capitalPword">
              <Input type="password" v-model="doWithDrawParam.capitalPword" />
            </FormItem>
          </Form>
          <div style="text-align: center">
            <Button
              @click="cancel"
              style="background-color: #fff;color: #565abf;width: 86px;height: 40px;border-color:#565abf"
            >
              {{
              $t('Tranding.Cancel1') }}
            </Button>&nbsp;&nbsp;
            <Button
              :loading="loadingWithDraw"
              @click="handleSubmit('formValidate')"
              style="background-color: #565abf;color: #fff;width: 86px;height: 40px;"
            >{{ $t('Tranding.Submit') }}</Button>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
import Header from "./header";
import SuccessModal from "../../modal/SuccessModal";
import FailedModal from "../../modal/FailedModal";
import { toThousands } from "../../../tool";

export default {
  name: "withdraw",
  components: { Header, SuccessModal, FailedModal },
  data() {
    return {
      withdrawQuotaExplain: "",
      loading: {
        confirm: false
      },
      code: "",
      payPwd: "",
      showModal: false,
      verifyLoading: false,
      verifyText: "",
      toWithdrawLoading: false,
      doWithDrawParam: {
        address: "", // 提币地址
        amount: "", // 提币数量
        fee: "", // 手续费
        capitalPword: "", // 资金密码
        // smsCode: '', // 短信验证码
        smsValidCode: "", // 短信验证码
        googleCode: "", // google验证码
        emailCode: "", // 邮箱验证码
        symbol: "", // 币种
        time: new Date().valueOf(), // 时间戳
        label: ""
      },
      loadingWithDraw: false,
      startTime: "",
      endTime: "",
      cloading: false,
      citme: "",
      ctext2: "",
      ctext: "",
      totalBalance: 0,
      show: {
        confirm: false,
        failed: false,
        failedText: "",
        failedText2: "",
        totalBalance: "",
        success: false,
        successText: "",
        available: ""
      },
      rate: Number(localStorage.getItem("rate")),
      initiateWithdrawalParams: {
        amount: 0,
        symbol: "AP"
      },
      clickIssue: false,
      isIdentityVerify: "",
      data1: [],
      transferCoinParams: {
        symbol: "",
        toAddress: "",
        amount: 0,
        fee: 0
      },
      transferCoinLogParams: {
        page: 1,
        pageSize: 10,
        symbol: "",
        startTime: "",
        endTime: "",
        sort: 1
      },
      total: 0,
      phoneConfirm: false,
      googleCodeConfirm: false,
      emailConfirm: false,
      withdrawalSymbol: {
        available: 0,
        allBalance: 0,
        lockAP: 0,
        symbol: ""
      },
      withdrawLimit: {
        dayAmount: 0,
        dayLimit: 0,
        monthAmount: 0,
        monthLimit: 0,
        defaultHandlingFee: "",
        maxHandlingFee: 0,
        minHandlingFee: 0,
        withdrawMax: 100000,
        withdrawMin: 1
      },
      isBindMobileStatus: 0,
      isSetGoogleAuthenticatorStatus: 0,
      isLastTimeEditPwdTillNow: 0
    };
  },
  computed: {
    inHandsAmount() {
      let a = this.doWithDrawParam.amount - this.doWithDrawParam.fee;
      if (a < 0) {
        return this.toThousands(0);
      } else {
        return this.toThousands(a);
      }
    },
    ruleValidate() {
      const self = this;
      return {
        smsValidCode: [
          {
            required: true,
            message: self.$t("public.notEmpty"),
            trigger: "blur"
          }
        ],
        googleCode: [
          {
            required: true,
            message: self.$t("public.notEmpty"),
            trigger: "blur"
          }
        ],
        // emailCode: [
        //   {required: true, message: self.$t('public.notEmpty'), trigger: 'blur'}
        // ],
        capitalPword: [
          {
            required: true,
            message: self.$t("public.notEmpty"),
            trigger: "blur"
          }
        ]
      };
    },
    ruleValidate1() {
      const self = this;
      return {
        address: [
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "change"
          }
        ],
        amount: [
          { required: true, validator: self.validateSequence, trigger: "blur" },
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "change"
          },
          {
            required: true,
            validator: self.validateSequence3,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence3,
            trigger: "change"
          },
          {
            required: true,
            validator: self.validateSequence2,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence2,
            trigger: "change"
          }
        ],
        fee: [
          { required: true, validator: self.validateSequence, trigger: "blur" },
          {
            required: true,
            validator: self.validateSequence,
            trigger: "change"
          },
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence5,
            trigger: "change"
          },
          {
            required: true,
            validator: self.validateSequence4,
            trigger: "blur"
          },
          {
            required: true,
            validator: self.validateSequence4,
            trigger: "change"
          }
        ]
      };
    },
    columns1() {
      const self = this;
      return [
        {
          title: self.$t("asset.withdraw.Time"),
          key: "createdAt",
          align: "left"
        },
        {
          title: self.$t("asset.withdraw.Coin"),
          key: "symbol",
          align: "left"
        },
        {
          title: self.$t("asset.withdraw.Amount"),
          key: "amount",
          align: "right"
        },
        {
          title: self.$t("asset.withdraw.Fee"),
          key: "fee",
          align: "right"
        },
        {
          title: self.$t("asset.withdraw.Notes"),
          key: "address",
          align: "right"
        },
        {
          title: self.$t("asset.withdraw.Status"),
          key: "status",
          align: "right",
          render(h, param) {
            let res;
            // 0未审核；1审核通过；2审核拒绝；3支付中已经打币；4支付失败；5完成；6已撤销
            if (param.row.status === 0) {
              res = self.$t("asset.withdraw.status0");
            } else if (param.row.status === 1) {
              res = self.$t("asset.withdraw.status1");
            } else if (param.row.status === 2) {
              res = self.$t("asset.withdraw.status2");
            } else if (param.row.status === 3) {
              res = self.$t("asset.withdraw.status3");
            } else if (param.row.status === 4) {
              res = self.$t("asset.withdraw.status4");
            } else if (param.row.status === 5) {
              res = self.$t("asset.withdraw.status5");
            } else if (param.row.status === 6) {
              res = self.$t("asset.withdraw.status6");
            }
            return h("span", {}, res);
          }
        },
        {
          title: self.$t("asset.withdraw.Action"),
          align: "right",
          render(h, param) {
            let re = self.$t("asset.withdraw.cancel");
            return h(
              "a",
              {
                on: {
                  click() {
                    self.ctext = self.$t("modal.confirmWithdraw");
                    self.show.confirm = true;
                    self.citme = param.row;
                  }
                }
              },
              re
            );
          }
        }
      ];
    },
    //手续费范围
    feeRange() {
      const self = this;
      if (
        self.withdrawLimit.minHandlingFee === "" &&
        self.withdrawLimit.maxHandlingFee === ""
      ) {
        return self.$t("unlimited");
      } else if (
        self.withdrawLimit.minHandlingFee === "" &&
        self.withdrawLimit.maxHandlingFee !== ""
      ) {
        return "0 - " + toThousands(self.withdrawLimit.maxHandlingFee);
      } else if (
        self.withdrawLimit.minHandlingFee !== "" &&
        self.withdrawLimit.maxHandlingFee === ""
      ) {
        return (
          toThousands(self.withdrawLimit.minHandlingFee) +
          " - " +
          self.$t("unlimited")
        );
      } else {
        return (
          toThousands(self.withdrawLimit.minHandlingFee) +
          " - " +
          toThousands(self.withdrawLimit.maxHandlingFee)
        );
      }
    },
    //提现范围
    withdrawRange() {
      const self = this;
      if (
        self.withdrawLimit.withdrawMin === "" &&
        self.withdrawLimit.withdrawMax === ""
      ) {
        return self.$t("unlimited");
      } else if (
        self.withdrawLimit.withdrawMin === "" &&
        self.withdrawLimit.withdrawMax !== ""
      ) {
        return "0 - " + toThousands(self.withdrawLimit.withdrawMax);
      } else if (
        self.withdrawLimit.withdrawMin !== "" &&
        self.withdrawLimit.withdrawMax === ""
      ) {
        return (
          toThousands(self.withdrawLimit.withdrawMin) +
          " - " +
          self.$t("unlimited")
        );
      } else {
        return (
          toThousands(self.withdrawLimit.withdrawMin) +
          " - " +
          toThousands(self.withdrawLimit.withdrawMax)
        );
      }
    }
  },
  mounted() {
    this.withdrawalSymbol = JSON.parse(sessionStorage.getItem("depositSymbol"));
    this.withdrawalSymbol.available = Number(this.withdrawalSymbol.available);
    this.withdrawalSymbol.allBalance = Number(
      this.withdrawalSymbol.available + this.withdrawalSymbol.lockAP
    );
    console.log(this.withdrawalSymbol);
    this.isBindMobile();
    this.isSetGoogleAuthenticator();
    this.transferCoinLog();
    this.isIdentityVerifyF();
    this.getWithdrawLimit();
    this.lastTimeEditPwdTillNow(); // 判断是否改完密码，24小时内不能提现
  },
  methods: {
    // 判断是否改完密码，24小时内不能提现
    lastTimeEditPwdTillNow() {
      this.$post("/api/user/lastTimeEditPwdTillNow").then(res => {
        this.isLastTimeEditPwdTillNow = res.data;
      });
    },
    // 取消确认弹框
    cancelConfirm() {
      this.show.confirm = false;
    },
    // 用户点击取消
    cancel() {
      this.showModal = false;
      this.doWithDrawParam.googleCode = "";
      this.doWithDrawParam.smsValidCode = "";
      this.doWithDrawParam.emailCode = "";
      this.doWithDrawParam.capitalPword = "";
    },
    // 将用户可提现最大值输入到amount
    setAllAmount() {
      // 今日、本月额度
      const a = Number(
        this.withdrawLimit.dayLimit - this.withdrawLimit.dayAmount
      );
      const b = Number(
        this.withdrawLimit.monthLimit - this.withdrawLimit.monthAmount
      );
      // available
      const c = Number(this.withdrawalSymbol.available);
      this.doWithDrawParam.amount = Math.min(a, b, c);
      console.log(this.doWithDrawParam.amount);
    },
    toThousands(n) {
      return toThousands(n);
    },
    // 不能为空
    validateSequence5(rule, value, callback) {
      if (value === "") {
        callback(new Error(this.$t("public.notEmpty")));
      } else {
        callback();
      }
    },
    // 手续费范围限制
    validateSequence4(rule, value, callback) {
      const self = this;
      if (
        self.withdrawLimit.minHandlingFee === "" &&
        self.withdrawLimit.maxHandlingFee === ""
      ) {
        callback();
      } else if (
        self.withdrawLimit.minHandlingFee === "" &&
        self.withdrawLimit.maxHandlingFee !== ""
      ) {
        if (value > self.withdrawLimit.maxHandlingFee) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      } else if (
        self.withdrawLimit.minHandlingFee !== "" &&
        self.withdrawLimit.maxHandlingFee === ""
      ) {
        if (value < self.withdrawLimit.minHandlingFee) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      } else {
        if (
          value < self.withdrawLimit.minHandlingFee ||
          value > self.withdrawLimit.maxHandlingFee
        ) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      }
    },
    // amount额度,个人额度。今日额度和本月额度都要考虑。还要考虑个人余额
    validateSequence3(rule, value, callback) {
      const a = this.withdrawLimit.dayLimit - this.withdrawLimit.dayAmount;
      const b = this.withdrawLimit.monthLimit - this.withdrawLimit.monthAmount;
      if (value > this.withdrawalSymbol.available) {
        callback(new Error(this.$t("not_sufficient_funds")));
      } else if (value > a) {
        callback(new Error(this.$t("asset.withdraw.overCreditToday")));
      } else if (value > b) {
        callback(new Error(this.$t("asset.withdraw.overCreditMonth")));
      } else {
        callback();
      }
    },
    // amount范围,所有人
    validateSequence2(rule, value, callback) {
      const self = this;
      if (
        self.withdrawLimit.withdrawMin === "" &&
        self.withdrawLimit.withdrawMax === ""
      ) {
        callback();
      } else if (
        self.withdrawLimit.withdrawMin === "" &&
        self.withdrawLimit.withdrawMax !== ""
      ) {
        if (value > self.withdrawLimit.withdrawMax) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      } else if (
        self.withdrawLimit.withdrawMin !== "" &&
        self.withdrawLimit.withdrawMax === ""
      ) {
        if (value < self.withdrawLimit.withdrawMin) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      } else {
        if (
          value < self.withdrawLimit.withdrawMin ||
          value > self.withdrawLimit.withdrawMax
        ) {
          callback(new Error(self.$t("notInAmount")));
        } else {
          callback();
        }
      }
    },
    validateSequence(rule, value, callback) {
      if (value < 0) {
        // callback(new Error('不能小于0'));
        callback(new Error(this.$t("cantLessThan0")));
      } else {
        callback();
      }
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.doWithdraw();
        }
      });
    },
    // 是否绑定手机
    isBindMobile() {
      this.$post("/api/user/isBindMobile").then(res => {
        // 成功的data code:1 msg:手机号
        // 失败的data code:0 msg:
        this.isBindMobileStatus = res.data.code;
      });
    },
    //  是否绑定谷歌验证器
    isSetGoogleAuthenticator() {
      this.$post("/api/user/isSetGoogleAuthenticator").then(res => {
        // 已绑定 返回成功data:1
        // 未绑定 返回成功data:0
        this.isSetGoogleAuthenticatorStatus = res.data;
      });
    },
    // 获取提现额度
    getWithdrawLimit() {
      const self = this;
      let form = new FormData();
      form.append("symbol", self.withdrawalSymbol.symbol);
      // form.append('symbol', 'BTC')
      this.$post("/api/account/getWithdrawLimit", form).then(res => {
        console.log(res);
        // 如果返回数据有值
        this.withdrawQuotaExplain = res.data.withdrawQuotaExplain;
        if (JSON.stringify(res.data) != "{}") {
          this.doWithDrawParam.fee = res.data.defaultHandlingFee;
          this.withdrawLimit = res.data;
          console.log("withdrawLimit", this.withdrawLimit);
        }
      });
    },
    widthDrawCallBack(code, payPwd) {
      this.doWithdraw(code, payPwd);
    },
    // 当弹窗取消时
    // 点击提现，进行是否绑定谷歌等验证，进而获取验证码
    clickWithdraw() {
      // 先验证是否是24小时内修改密码，进入这个页面状态已通过接口获得
      if (this.isLastTimeEditPwdTillNow === 0) {
        this.show.failed = true;
        this.show.failedText = this.$t("Tranding.failed");
        this.show.failedText2 = this.$t("userCenter.changePWDCantDO");
        setTimeout(() => {
          this.show.failed = false;
        }, 1500);
        return null;
      }
      // 先验证输入的地址、额度、手续费
      this.$refs["formValidate1"].validate(valid => {
        if (valid) {
          const self = this;
          let form = new FormData();
          form.append("use", self.$t("asset.Withdraw"));
          let d = window.newVue.$lang.toString().replace(/-/g, "_");
          form.append("language", d);
          this.$post("/api/user/getVerifyCodeWhenWithdraw", form);
          this.toWithdrawLoading = true;
          this.$post("/api/user/isSetGoogleAuthenticator").then(res => {
            this.showModal = true;
            if (res.data === 1) {
              self.toWithdrawLoading = false;
              self.googleCodeConfirm = true;
              self.verifyText = self.$t("modal.Google_OTP");
            } else {
              self.$post("/api/user/isBindMobile").then(res => {
                if (res.data.code === 0) {
                  self.phoneConfirm = true;
                  self.verifyText = self.$t("modal.phoneCode");
                } else {
                  self.emailConfirm = true;
                  self.verifyText = self.$t("modal.emailCode");
                }
                self.toWithdrawLoading = false;
              });
            }
          });
        }
      });
      this.$refs["formValidate"].resetFields();
    },
    // 提现，调链上的接口
    doWithdraw() {
      this.loadingWithDraw = true;
      const self = this;
      // if (self.googleCodeConfirm) {
      //   self.doWithDrawParam.googleCode = self.code
      // } else if (self.phoneConfirm) {
      //   self.doWithDrawParam.smsCode = self.code
      // } else {
      //   self.doWithDrawParam.emailCode = self.code
      // }
      if (self.doWithDrawParam.smsValidCode === "") {
        delete self.doWithDrawParam.smsValidCode;
      }
      if (self.doWithDrawParam.googleCode === "") {
        delete self.doWithDrawParam.googleCode;
      }
      if (self.doWithDrawParam.emailCode === "") {
        delete self.doWithDrawParam.emailCode;
      }
      self.verifyLoading = true;
      self.doWithDrawParam.label = self.withdrawalSymbol.symbol;
      self.doWithDrawParam.symbol = self.withdrawalSymbol.symbol;
      this.$post(
        window.selfConfig.chainUrl + "/finance/do_withdraw_v4",
        self.doWithDrawParam
      )
        .then(res => {
          if (res.code === 0) {
            self.doWithDrawParam.smsValidCode = "";
            self.doWithDrawParam.googleCode = "";
            self.doWithDrawParam.emailCode = "";
            self.doWithDrawParam.capitalPword = "";
            self.showModal = false;
            self.show.success = true;
            self.show.successText = self.$t("Tranding.success");
            //  如果提现成功了，清空表单数据
            self.$refs["formValidate1"].resetFields();
            self.$refs["formValidate"].resetFields();
            setTimeout(() => {
              self.show.success = false;
              self.googleCodeConfirm = false;
            }, 2000);
          } else {
            self.show.failed = true;
            self.show.failedText = self.$t("Tranding.failed");
            self.show.failedText2 = res.msg;
            setTimeout(() => {
              self.show.failed = false;
            }, 2000);
          }
          self.verifyLoading = false;
        })
        .finally(() => {
          this.loadingWithDraw = false;
        });
    },
    // 提现记录查询条件，正序倒序
    changeNewst(v) {
      console.log(v);
      if (v === "By newest") {
        this.transferCoinLogParams.sort = 1;
      } else {
        this.transferCoinLogParams.sort = 2;
      }
      this.transferCoinLog();
    },
    // 前往身份认证
    toIdentity() {
      this.$router.push("/account/identityVerify");
    },
    // 查询条件day变化时
    changeDay(name) {
      console.log(name);
      if (name === "7 Days") {
        this.endTime = new Date();
        let temp = this.endTime.valueOf();
        this.startTime = new Date(temp - 604800000);
      } else {
        this.endTime = new Date();
        let temp = this.endTime.valueOf();
        this.startTime = new Date(temp - 2592000000);
      }
      this.transferCoinLog();
    },
    // 确认取消提现，自己的接口
    confirm(item) {
      this.$post("/api/account/cancelTransferCoin", { id: item.id }).then(
        res => {
          if (res.code === 0) {
            this.show.success = true;
            setTimeout(() => {
              this.show.success = false;
              this.show.successText = "";
            }, 2000);
          } else {
            this.show.failed = true;
            this.show.failedText = res.msg;
            setTimeout(() => {
              this.show.failed = false;
              this.show.failedText = '';
            }, 2000);
          }
        }
      );
    },
    // 获取实名认证状态
    isIdentityVerifyF() {
      this.$post("/api/user/isIdentityVerify").then(res => {
        //-1：未认证 ，0：待审核，1：审核通过，2：审核拒绝
        this.isIdentityVerify = res.data.authStatus;
      });
    },
    // 自己的提现接口
    transferCoin() {
      this.$post("/api/account/transferCoin", this.transferCoinParams).then(
        res => {
          console.log(res);
          this.$Message.info(res.msg);
        }
      );
    },
    // 获取提现流水
    transferCoinLog() {
      let form = new FormData();
      for (let i in this.transferCoinLogParams) {
        form.append(i, this.transferCoinLogParams[i]);
      }
      form.delete("startTime");
      form.delete("endTime");
      form.delete("symbol");
      form.append("symbol", this.withdrawalSymbol.symbol);
      if (this.startTime !== "") {
        this.transferCoinLogParams.startTime = this.startTime.valueOf();
        form.append("startTime", this.transferCoinLogParams.startTime);
      } else {
        form.append("startTime", "");
      }
      if (this.endTime !== "") {
        this.transferCoinLogParams.endTime = this.endTime.valueOf();
        form.append("endTime", this.transferCoinLogParams.endTime);
      } else {
        form.append("endTime", "");
      }
       if (
        this.transferCoinLogParams.startTime &&
        this.transferCoinLogParams.endTime &&
        this.transferCoinLogParams.startTime >=
          this.transferCoinLogParams.endTime
      ) {
        this.show.failed = true;
        this.show.failedText = this.$t(
          "Endtime_cannot _earlier_than_starttime"
        );
        this.transferCoinLogParams.startTime='';
        setTimeout(() => {
          this.show.failed = false;
        }, 2000);
        return false;
      }
      this.$post("/api/account/transferCoinLog", form).then(res => {
        console.log(res);
        this.data1 = res.data.records;
        this.total = res.data.total;
      });
    },
    selfToThousands(num) {
      let n = num;
      num = toThousands(n);
      return num;
    },
    clickAll() {
      this.initiateWithdrawalParams.amount = this.totalBalance;
    },
    toAccount() {
      this.$router.push("/account");
    }
  }
};
</script>

<style>
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
  font-size: 14px;
}
#withdrawBox2 .ivu-input-suffix {
  left: auto !important;
  right: 0 !important;
  background: url("../../../assets/select.png") center center no-repeat;
  background-size: cover;
  width: 10px;
  height: 13px;
  transition: none;
  margin: 7px 8px 0 0;
}
#withdrawBox2 .ivu-icon-ios-calendar-outline:before {
  content: "";
}
#withdrawBox2 .ivu-input {
  padding: 0;
  padding-left: 8px;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
  height: 28px;
}
#withdraw .nodata {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#withdraw .nodata img {
  width: 50px;
  height: 50px;
}

#withdraw .nodata p {
  margin: 0;
  margin-top: 5px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.4px;
  text-align: center;
  color: #bdc6d4;
}
#withdraw .ivu-btn[disabled] {
  background-color: #bdc6d4;
  color: #fff;
}
.ivu-table-wrapper{
  border:0;
}
.ivu-table:before{
  height: 0;
}
.ivu-table:after{
  width: 0;
}
.ivu-table th {
  color: #32325d;
  background-color: #f7f9fc;
  font-size: 12px;
  line-height: 1.33;
}
.Guide-text {
  width: 320px;
  height: 40px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}
.ivu-modal-footer {
  border: 0;
}
.confirm {
  width: 100%;
  text-align: center;
  position: absolute;
  top: 45%;
  margin-top: 10px;
  height: 36px;
  font-family: CircularStd;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -1px;
  color: #32325d;
}
.ivu-modal-body {
  position: relative;
  padding: 0 !important;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}

input[type="number"] {
  -moz-appearance: textfield;
}

.withDrawRightCard label {
  padding: 0 0 6px 0 !important;
  font-family: CircularStd;
  font-size: 14px !important;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
}

.withDrawRightCard input {
  height: 40px;
  font-size: 14px;
}

/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/

.verifyText {
  margin-top: 16px;
  margin-bottom: 6px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}

.Security-verify {
  text-align: left;
  padding: 32px;
  height: 32px;
  font-family: CircularStd;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -1px;
  color: #32325d;
}

.Security-verify .ivu-input {
  height: 40px;
  font-size: 14px;
}

.ivu-modal-footer {
  border: 0;
}

.successful {
  width: 100%;
  padding-top: 100px;
  text-align: center;
  font-family: CircularStd;
  font-size: 24px;
  font-weight: 500;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.5;
  letter-spacing: -1px;
  color: #32325d;
}

.successIcon {
  width: 48px;
  height: 48px;
  position: absolute;
  top: 50%;
  margin-top: -44px;
  left: 50%;
  margin-left: -24px;
}

.ivu-modal-body {
  position: relative;
  padding: 0 !important;
}

.success2 {
  width: 484px;
  height: 260px;
  border-radius: 4px;
  background-color: #ffffff;
}

#withdraw .ivu-input-suffix {
  left: auto !important;
  right: 0 !important;
}

.withdrawNoKYCTitle {
  margin-bottom: 8px;
  width: 334px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}

.withdrawNoKYC {
  padding: 8px 17px;
  margin-top: 16px;
  width: 368px;
  border-radius: 2px;
  border: solid 1px #e6ebf1;
  background-color: #ffffff;
}

.widthDrawBtn {
  width: 105px;
  height: 40px;
  background-color: #565abf;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #fff;
}
.widthDrawBtn3 {
  width: 105px;
  height: 40px;
  border-radius: 2px;
  background-color: #565abf;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #fff;
}
.widthDrawBtn3:hover {
  color: #fff;
  border-color: #565abf;
}
.widthDrawBtn2 {
  width: 105px;
  height: 40px;
  border-radius: 2px;
  background-color: #fff;
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
.widthDrawBtn2:hover {
  color: #565abf;
}

.Total {
  height: 24px;
  font-family: CircularStd;
  font-size: 16px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #32325d;
}

.withDrawRightCard {
  padding: 16px;
  width: 400px;
  background-color: #f7f9fc;
}

.withdrawRightCardTitle {
  margin: 6px 0;
  width: 368px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}

.To-read-Instruction {
  margin-top: 16px;
  height: 16px;
  font-family: CircularStd;
  font-size: 12px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.33;
  letter-spacing: -0.4px;
  color: #565abf;
}
.To-read-Instruction a {
  color: #565abf;
}

.To-read-Instruction .text-style-1 {
  color: #32325d;
}

.withDrawRow {
  margin: 8px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.withDrawCredit2 {
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: right;
  color: #87bbfc;
}

.withDrawCredit1 {
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #32325d;
}

.withDrawLeftCard1Balance {
  width: 119px;
  height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  color: #bdc6d4;
}

.withDrawLeftCard1Title {
  width: 119px;
  height: 30px;
  font-family: CircularStd;
  font-size: 20px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -0.65px;
  color: #565abf;
}

.withDrawLeftCard1 {
  margin-bottom: 8px;
  display: inline-block;
  padding: 11px 32px;
  width: 183px;
  height: 74px;
  border: solid 1px #e6ebf1;
  background-color: #f7f9fc;
}

.widthDrawBottomB .ivu-input-default {
  padding-left: 80px;
}
.ivu-table-tip{
  display: none;
}
</style>
<style lang="scss" scoped>
#withdraw {
  .withdrawNotice {
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;

    .text-style-1 {
      color: #87bbfc;
    }
  }

  .withRowBtn {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
    width: 105px;
    height: 40px;
    border-radius: 2px;
    background-color: #565abf;
  }

  .withRow div {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  .withRow {
    margin-bottom: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .Avalable-3000 {
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

  .Avalable-3000 .text-style-1 {
    color: #87bbfc;
  }

  .inputRight {
    position: absolute;
    right: 20px;
    top: 38px;
    width: 16px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .inputRight:hover {
    cursor: pointer;
  }

  .Amount {
    position: absolute;
    top: 38px;
    left: 17px;
    z-index: 100;
    width: 52px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .widthDrawBottomBI {
    width: 384px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .widthDrawBottomB {
    position: relative;
    padding: 32px 0;
    margin: 0 auto;
    width: 384px;
  }

  .widthDrawBottom {
    margin-top: 32px;
    width: 798px;
    height: 276px;
    background-color: #f7f9fc;
  }

  .threeBoxIn12 {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .threeBoxIn11 {
    height: 30px;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .threeBoxIn1 {
    width: 197px;
    display: inline-block;
    padding: 11px 32px;
    border-radius: 2px;
    border-right: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .threeBoxIn {
    margin: 44px auto 8px;
    position: relative;
    width: 592px;
    height: 74px;
    border-radius: 4px;
    border: solid 1px #e6ebf1;
    border-right: none;
    background-color: #ffffff;
  }

  .Change-account {
    position: absolute;
    right: 0;
    top: -25px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .Change-account:hover {
    cursor: pointer;
  }

  .Credit-for-today-10 {
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #87bbfc;
  }

  .Credit-for-today-10 .text-style-1 {
    color: #32325d;
  }

  .To-get-your-AP-plea {
    position: absolute;
    top: -20px;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.33;
    letter-spacing: -0.4px;
    color: #32325d;
  }

  #withdrawBox4 {
    padding-bottom: 20px;
    margin: 0 auto 32px;
    width: 800px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .Bank-Copy {
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .Kookmin-bank {
    height: 30px;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .bank1 {
    padding: 11px 32px;
    display: inline-block;
    width: 294px;
    height: 74px;
    border-radius: 2px;
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .bank1:hover {
    cursor: pointer;
  }

  .Bank {
    position: relative;
    margin: 36px auto;
    width: 592px;
    height: 74px;
    border-radius: 2px;
    background-color: #ffffff;
  }

  .box3Button {
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: center;
    color: #565abf;
    width: 179px;
    height: 32px;
    border-radius: 2px;
    border: solid 1px #565abf;
  }

  .You-could-create-you {
    margin-bottom: 8px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    text-align: center;
    color: #bdc6d4;
  }

  #withdrawBox3 div {
    text-align: center;
  }

  #withdrawBox3 {
    padding-bottom: 32px;
    margin: 32px auto 32px;
    width: 800px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .box2Params {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 798px;
    height: 49px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
    background-color: #ffffff;
  }

  #withdrawBox2 {
    padding-bottom: 20px;
    margin: 32px auto 32px;
    width: 800px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .box1Content {
    width: 384px;
    margin: 20px auto 0;
  }

  .withdrawTitleText {
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 600;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: -0.65px;
    color: #32325d;
    line-height: 22px;
  }

  .withdrawTitle {
    width: 798px;
    height: 40px;
    padding: 8px 16px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
    background-color: #ffffff;
  }

  #withdrawBox1 {
    margin: auto;
    width: 800px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }
}
</style>


