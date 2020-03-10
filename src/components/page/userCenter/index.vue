<template>
  <div>
    <div id="f2">
      <div class="f2-1">
        <div class="Rectangle-Copy-4">
          <div class="Profile">{{ $t('userCenter.index.Profile') }}</div>
        </div>
        <div class="f2-1C">
          <div class="avatar"><img src="../../../assets/User_circle@3x.png" alt=""></div>
          <div class="userInfo">
            <div class="artpiecegmailcom">{{ userInfo.email }}</div>
            <div class="id-10065">id : {{ userInfo.id }}</div>
          </div>
        </div>
      </div>
      <div class="f2-2">
        <div class="f2-2H">
          <div class="Security-Password">
            {{ $t('userCenter.index.Security_Password') }}
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/lock@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.Login_password') }}</div>
            <div class="Login-password-b">***********</div>
          </div>
          <div v-if="$store.state.isBithumb !== 1" class="f2-2C-3">
            <div @click="toChangePassword" class="Change">{{ $t('userCenter.index.Change') }}</div>
          </div>
          <div v-if="$store.state.isBithumb === 1" class="f2-2C-3">
            <div @click="isBithumbNotice" class="Change">{{ $t('userCenter.index.Change') }}</div>
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/payment@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.Payment_password') }}</div>
            <div v-if="isBindMobileStatus === 0 && $store.state.isBithumb !== 1" class="Login-password-b">{{
              $t('userCenter.index.Please__security') }}
            </div>
          </div>
          <div v-if="$store.state.isBithumb !== 1" class="f2-2C-3">
            <div class="Change" @click="toPaymentPassword">{{ $t('userCenter.index.Change') }}</div>
          </div>
          <div v-if="$store.state.isBithumb === 1" class="f2-2C-3">
            <div class="Change" @click="isBithumbNotice">{{ $t('userCenter.index.Change') }}</div>
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/verification@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.Phone_verification') }}</div>
            <div v-if="isBindMobileStatus !== 0 && $store.state.isBithumb !== 1" class="Login-password-b">{{
              isBindMobileStatusNumber }}
            </div>
            <div v-if="isBindMobileStatus === 0 && $store.state.isBithumb !== 1" class="Login-password-b">{{
              $t('userCenter.index.Phone_verification') }}
            </div>
          </div>
          <div v-if="$store.state.isBithumb !== 1" class="f2-2C-3" style="width: 300px;text-align: right">
            <Button v-if="isBindMobileStatus === 0" @click="changePhone" class="Change">{{
              $t('userCenter.index.Binding_mobile') }}
            </Button>
            <Button v-if="isBindMobileStatus !== 0" @click="trunOffPhone" class="Change">{{
              $t('userCenter.index.turnOff') }}
            </Button>
          </div>
          <div v-if="$store.state.isBithumb === 1" class="f2-2C-3" style="width: 300px;text-align: right">
            <Button @click="isBithumbNotice" class="Change">{{
              $t('userCenter.index.Binding_mobile') }}
            </Button>
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/verify@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.Identify_verify') }}</div>
            <div v-if="isIdentityVerify !== 2 && $store.state.isBithumb !== 1" class="Login-password-b">{{
              $t('userCenter.index.Please_KYC_security') }}
            </div>
            <div v-if="isIdentityVerify === 2 && $store.state.isBithumb !== 1" class="Login-password-b"
                 style="color:#F4496D">{{ identityVerify }}
            </div>
          </div>

          <div v-if="$store.state.isBithumb !== 1" class="f2-2C-3">
            <span @click="toIdentFy" v-if="isIdentityVerify === -1" class="Change"
                  style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.uncertificated') }}</span>
            <span v-if="isIdentityVerify === 0" class="Change"
                  style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.waiting_audit') }}</span>
            <span v-if="isIdentityVerify === 1" class="Change"
                  style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.pass_the_audit') }}</span>
            <div v-if="isIdentityVerify === 2" style="display: flex;flex-direction:column;align-items: flex-end">
              <span @click="toIdentFy" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.audit_refused') }}</span>
              <span style="font-size:12px;margin-top: -8px;display: block;text-align: right;width:180px;">{{ $t('userCenter.index.Please_resubmit_your_application') }}</span>
            </div>
          </div>
          <div v-if="$store.state.isBithumb === 1" class="f2-2C-3">
            <span @click="isBithumbNotice" class="Change"
                  style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.uncertificated') }}</span>
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/store@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.Proof_of_Address') }}</div>
            <div v-if="(isAddressVerify !== 2 || isIdentityVerify !== 1) && $store.state.isBithumb !== 1"
                 class="Login-password-b">{{ $t('userCenter.index.Please_KYC_security') }}
            </div>
            <div v-if="isAddressVerify === 2 && isIdentityVerify === 1 && $store.state.isBithumb !== 1"
                 class="Login-password-b" style="color:#F4496D">{{ addressverifyMsg }}
            </div>
          </div>
          <div class="f2-2C-3">
            <div v-if="isIdentityVerify === 1 && $store.state.isBithumb !== 1">
              <span @click="toProofAddress" v-if="isAddressVerify === -1" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.uncertificated') }}</span>
              <span v-if="isAddressVerify === 0" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.waiting_audit') }}</span>
              <span v-if="isAddressVerify === 1" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.pass_the_audit') }}</span>
              <div v-if="isAddressVerify === 2" style="display: flex;flex-direction:column;align-items: flex-end">
              <span @click="toProofAddress" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.audit_refused') }}</span>
                <span style="font-size:12px;margin-top: -8px;display: block;text-align: right;width:180px;">{{ $t('userCenter.index.Please_resubmit_your_application') }}</span>
              </div>
            </div>
            <div v-if="$store.state.isBithumb === 1">
              <span @click="isBithumbNotice" class="Change"
                    style="border:0;line-height: 20px;width: 120px;text-align: right;">{{ $t('userCenter.index.uncertificated') }}</span>
            </div>
            <div v-if="isIdentityVerify !== 1 && $store.state.isBithumb !== 1">
              <div style="display: flex;flex-direction:column;align-items: flex-end">
              <span class="Change"
                    style="border:0;line-height: 20px;width: 300px;text-align: right;">{{ $t('userCenter.idFirst') }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/google@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">Google OTP</div>
            <div class="Login-password-b">{{ $t('userCenter.index.Used__settings') }}</div>
          </div>
          <div v-if="$store.state.isBithumb !== 1" class="f2-2C-3">
            <Button v-if="isSetGoogleAuthenticatorStatus" @click="toCancelGoogle" class="Change">{{
              $t('userCenter.index.Turn_off') }}
            </Button>
            <Button v-if="!isSetGoogleAuthenticatorStatus" @click="toGoogleAuthentication" class="Change">{{
              $t('userCenter.index.Bind') }}
            </Button>
          </div>
          <div v-if="$store.state.isBithumb === 1" class="f2-2C-3">
            <Button @click="isBithumbNotice" class="Change">{{
              $t('userCenter.index.Bind') }}
            </Button>
          </div>
        </div>
      </div>
      <div class="f2-3">
        <div class="f2-2H">
          <div class="Security-Password">
            {{ $t('userCenter.index.Others') }}
          </div>
        </div>
        <div class="f2-2C">
          <div class="f2-2C-1"><img src="../../../assets/mail@3x.png" alt=""></div>
          <div class="f2-2C-2">
            <div class="Login-password">{{ $t('userCenter.index.My_invitation_Code') }}</div>
            <div class="Login-password-b">{{ $t('userCenter.index.Please__security') }}</div>
          </div>
          <div class="f2-2C-3" style="padding-top:2px;">
            <div class="Field view" @click="viewInvitationCode">
              <div class="Text">{{ $t('userCenter.index.Verify') }}</div>
            </div>
          </div>
          <Modal v-model="show.invitationCode" width="592">
            <p slot="header" style="font-size: 22px;font-weight: bold;text-align:center;padding:20px 0">{{
              $t('userCenter.index.My_code') }}</p>
            <div style="padding: 16px;">
              <div class="invitationCode">
                <p style="font-size: 14px;">{{ $t('userCenter.index.invitation_code') }}</p>
                <div>
                <span
                  style="font-weight: 600;font-size: 16px;line-height: 26px;color:#565ABF">{{ invitationCode }}</span>
                  <span @click="copyText(invitationCode)" class="copy1">{{ $t('userCenter.index.Copy') }}</span>
                </div>
              </div>
              <div class="invitationCode">
                <p style="font-size: 14px;margin-top: 10px;">{{ $t('userCenter.index.invitation_link') }}</p>
                <div>
                  <span style="display: block;width: 90%;font-weight: 600;font-size: 14px;line-height: 26px;">{{ invitationUrl }}</span>
                  <span @click="copyText(invitationUrl)" class="copy1">{{ $t('userCenter.index.Copy') }}</span>
                </div>
              </div>
              <div class="invitationCode" style="position: relative;height:286px;">
                <p style="font-size: 14px;margin-top: 10px;margin-bottom:25px">{{ $t('userCenter.index.QR_code') }}</p>
                <div>
                  <canvas style="position: absolute;left:35%;width:136px;height:134px;" class="erImg"
                          id="canvas"></canvas>
                </div>
              </div>
            </div>
            <div slot="footer" style="margin-right:43px;">
              <Button @click="show.invitationCode=false">{{ $t('cancel') }}</Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
    <InfoModal :show="show.info" :text="show.infoText"></InfoModal>
  </div>
</template>

<script>
  import QRCode from 'qrcode'
  import InfoModal from "../../modal/InfoModal";
  export default {
    name: "userCenter",
    components: {InfoModal},
    data() {
      return {
        bithumbUser: 0,
        invitationUrl: '',
        invitationCode: '',
        show: {
          invitationCode: false,
          info: false,
          infoText: ''
        },
        userInfo: JSON.parse(localStorage.getItem('userInfo')),
        isAddressVerify: -1,
        isIdentityVerify: -1,
        isBindMobileStatus: 0,
        isBindMobileStatusNumber: '',
        isSetGoogleAuthenticatorStatus: 0,
        addressverifyMsg: '', // 地址认证返回备注信息
      }
    },
    mounted() {
      this.isBithumb()
      this.isAddressVerifyF()
      this.isIdentityVerifyF()
      this.isBindMobile()
      this.$post('/api/user/reCAPTCHA').then(res => {
        console.log(res)
      })
      // 获取邀请码
      this.$post('/api/user/getInviteCode').then(res => {
        // console.log('/api/user/getInviteCode', res)
        this.invitationCode = res.data
        this.invitationUrl = window.location.origin + '/#/register?invitationCode=' + this.invitationCode
        QRCode.toCanvas(document.getElementById('canvas'), this.invitationUrl, function (error) {
          if (error) console.error(error)
          console.log('success!');
        })
      })
      this.isSetGoogleAuthenticator()
    },
    methods: {
      // bithumb不能操作的提示
      isBithumbNotice() {
        this.show.info = true
        this.show.infoText = this.$t('bithumb_cant_op')
        setTimeout(() => {
          this.show.info = false
          this.show.infoText = ''
        }, 2000)
      },
      // 根据token判断是否是bithumb账户
      isBithumb() {
        this.$post('/api/user/isBithumb').then((res) => {
          this.$store.commit('isBithumb', res.data)
          // this.$store.commit('isBithumb', 1)
        })
      },
      // 获取实名认证状态
      isIdentityVerifyF() {
        this.$post('/api/user/isIdentityVerify').then(res => {
          //-1：未认证 ，0：待审核，1：审核通过，2：审核拒绝
          this.isIdentityVerify = res.data.authStatus
          this.identityVerify = res.data.reason
        })
      },
      // 获取地址认证状态
      isAddressVerifyF() {
        this.$post('/api/user/isAddressVerify').then(res => {
          //-1：未认证 ，0：待审核，1：审核通过，2：审核拒绝
          this.isAddressVerify = res.data.verifyStatus
          this.addressverifyMsg = res.data.verifyMsg
        })
      },
      // 是否绑定手机
      isBindMobile() {
        this.$post('/api/user/isBindMobile').then(res => {
          // 成功的data code:1 msg:手机号
          // 失败的data code:0 msg:
          this.isBindMobileStatus = res.data.code
          this.isBindMobileStatusNumber = res.data.msg
          this.isBindMobileStatusNumber = this.isBindMobileStatusNumber.substring(0, 3) + '***' + this.isBindMobileStatusNumber.substring(7, 11)
          console.log(this.isBindMobileStatus)
        })
      },
      //  是否绑定谷歌验证器
      isSetGoogleAuthenticator() {
        this.$post('/api/user/isSetGoogleAuthenticator').then(res => {
          // 已绑定 返回成功data:1
          // 未绑定 返回成功data:0
          this.isSetGoogleAuthenticatorStatus = res.data
        })
      },
      copyText(text) {
        let flag = false;
        let textarea = document.createElement("input");//创建input对象
        let currentFocus = document.getElementsByClassName('copy1')[0];//当前获得焦点的元素
        currentFocus.appendChild(textarea);//添加元素
        textarea.value = text;
        textarea.focus();
        if (textarea.setSelectionRange)
          textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
        else
          textarea.select();
        try {
          flag = document.execCommand("copy");//执行复制
          this.$Message.success(this.$t('copy_success'));
        } catch (eo) {
          flag = false;
        }
        currentFocus.removeChild(textarea);//删除元素
        currentFocus.focus();
        return flag;
      },
      viewInvitationCode() {
        this.show.invitationCode = true
      },
      toChangePassword() {
        this.$router.push('/account/loginPassword')
      },
      toProofAddress() {
        this.$router.push('/account/proofAddress')
      },
      toGoogleAuthentication() {
        this.$router.push('/account/googleAuthentication')
      },
      // 前往解绑谷歌
      toCancelGoogle() {
        this.$router.push('/account/cancelGoogleAuthentication')
      },
      changePhone() {
        this.$router.push('/account/changePhone')
      },
      // 前往关闭手机验证
      trunOffPhone() {
        this.$router.push('/account/cancelPhone')
      },
      toIdentFy() {
        this.$router.push('/account/identityVerify')
      },
      toPaymentPassword() {
        this.$router.push('/account/paymentPassword')
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }

  .copy1 {
    position: absolute;
    right: 31px;
    top: 52px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    text-align: right;
    color: #565abf;
  }

  .copy1:hover {
    cursor: pointer;
  }

  .view:hover {
    cursor: pointer;
  }
</style>
<style scoped>

  #f2 {
    width: 100%;
    height: 787px;
    background-color: #e3e8ee;
    padding-top: 16px;
  }

  .f2-1 {
    margin: 0 auto 16px;
    left: -400px;
    width: 800px;
    height: 144px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #ffffff;
  }

  .Rectangle-Copy-4 {
    padding-top: 8px;
    padding-left: 16px;
    width: 100%;
    height: 40px;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
  }

  .Profile {
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: bold;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .f2-1C {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 22px;
  }

  .avatar {
    display: inline-block;
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  .userInfo {
    display: inline-block;
    height: 60px;
    padding-left: 22px;
    padding-top: 5px;
  }

  .artpiecegmailcom {
    font-weight: bold;
    width: 139px;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .id-10065 {
    width: 100%;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.8;
    letter-spacing: -0.4px;
    color: #bdc6d4;
  }

  .f2-2 {
    margin: 0 auto 16px;
    width: 800px;
    height: 447px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .f2-2H {
    padding: 8px 16px;
    margin: 0 auto;
    width: 798px;
    height: 40px;
    border-radius: 2px;
    box-shadow: inset 0 -1px 0 0 #e6ebf1;
    background-color: #ffffff;
  }

  .Security-Password {
    width: 100%;
    height: 24px;
    font-family: CircularStd;
    font-size: 16px;
    font-weight: 600;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -0.65px;
    color: #32325d;
  }

  .f2-2C {
    height: 64px;
    padding: 14px 16px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
  }

  .f2-2C-1 {
    width: 41px;
    height: 36px;
    border-radius: 50%;
  }

  .f2-2C-1 img {
    width: 36px;
    height: 36px;
  }

  .f2-2C-2 {
    padding-left: 16px;
    width: 100%;
  }

  .Login-password {
    width: 100%;
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

  .Login-password-b {
    width: 100%;
    height: 16px;
    font-family: CircularStd;
    font-size: 12px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.53;
    letter-spacing: normal;
    color: #bdc6d4;
  }

  .Change {
    background-color: #f7f9fc;
    margin-left: 8px;
    padding-top: 7px;
    text-align: center;
    display: inline-block;
    border-radius: 2px;
    border: solid 1px #565abf;
    width: 80px;
    height: 32px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 16px;
    letter-spacing: -0.4px;
    color: #565abf;
  }

  .Change:hover {
    cursor: pointer;
  }

  .Field {
    padding-top: 7px;
    width: 78px;
    height: 32px;
    border-radius: 2px;
    background-color: #565abf;
  }

  .Text {
    margin: auto;
    width: 36px;
    height: 20px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 17px;
    letter-spacing: -0.4px;
    text-align: center;
    color: #ffffff;
  }

  .f2-3 {
    margin: 0 auto 16px;
    width: 800px;
    height: 102px;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
    border: solid 1px #e6ebf1;
    background-color: #f7f9fc;
  }

  .invitationCode {
    width: 445px;
    padding: 25px 31px;
    margin: 9px 73px;
    background: #F7F9FC;
    position: relative;
  }
</style>
