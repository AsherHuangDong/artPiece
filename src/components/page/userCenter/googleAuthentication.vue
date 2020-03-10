<template>
    <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
        <div style="width:1216px;margin: 0 auto">
            <div class="location">
                <div class="location1 pointer" @click="$router.push('/account')">{{ $t('userCenter.loginPassword.User_center') }}</div>
                <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
                <div class="location1">{{ $t('userCenter.Google.Link_Google_authentication') }}</div>
            </div>
            <div class="Mask">
                <div class="h">
                    <div class="text">
                        {{ $t('userCenter.Google.Link_Google_authentication') }}
                    </div>
                </div>
                <div style="margin: 40px auto 0;width:386px;">
                    <div class="Oval">1</div>
                    <div class="t1">{{ $t('userCenter.Google.App__APP') }}</div>
                    <div class="c1">{{ $t('userCenter.Google.content1') }}</div>
                    <div class="btnG">
                        <div class="btnGc">
                            <div class="Text">{{ $t('userCenter.Google.App_Store') }}</div>
                        </div>
                        <div class="btnGc">
                            <div class="Text">{{ $t('userCenter.Google.Google_Play') }}</div>
                        </div>
                        <div class="btnGc">
                            <div class="Text">{{ $t('userCenter.Google.Android') }}</div>
                        </div>
                    </div>
                    <div class="Oval">2</div>
                    <div class="t1">{{ $t('userCenter.Google.content2') }}</div>
                    <div class="c1">{{ $t('userCenter.Google.content3') }}</div>
                    <div class="erDiv">
                        <div class="erImg"><canvas class="erImg" id="canvas" width=80 heigt=80></canvas></div>
                        <span class="erInput">{{ secret }}</span>
                        <div @click="copySecret" class="copy">{{ $t('userCenter.Google.Copy') }}</div>
                    </div>
                    <!-- <div style="height: 50px"></div> -->
                    <div class="Oval">3</div>
                    <div class="t1">{{ $t('userCenter.Google.Complete_binding') }}</div>
                    <div class="c1"
                         style="display: flex; align-items: flex-start;justify-content: space-between;margin-bottom: 16px;">
                        <div style="width:20px;height: 20px;"><img src="../../../assets/i.png" alt=""></div>
                        <div style="width:360px;">
                            {{ $t('userCenter.Google.content4') }}
                        </div>
                    </div>
                    <div class="label">{{ $t('userCenter.Google.Password') }}</div>
                    <input id="Password" v-model="setGoogleAuthenticatorParams.password" class="Field" type="password" :placeholder="$t('userCenter.Google.enter_password')">
                    <div id="PasswordNotice" style="margin-top: -16px;display: none;color:red;font-weight: 500;">{{
                        passwordAuthentication }}
                    </div>
                    <div class="label">{{ $t('userCenter.Google.Google_code') }}</div>
                    <input id="googleCode" v-model="setGoogleAuthenticatorParams.googleCode" class="Field" type="text" :placeholder="$t('userCenter.Google.enter_googleCode')">
                    <div id="googleCodeNotice" style="margin-top: -16px;display: none;color:red;font-weight: 500;">{{
                        googleCodeAuthentication }}
                    </div>
                    <Button :loading="loading.connect" style="color: #fff" @click="setGoogleAuthenticator" class="changeBtn">
                        {{ $t('userCenter.Google.Connect') }}
                    </Button>
                </div>
            </div>
            <SuccessModal :show="success" :text="successText" />
        </div>
    </div>
</template>

<script>
    import QRCode from 'qrcode'
    import SuccessModal from "../../modal/SuccessModal";
  export default {
    name: "googleAuthentication",
      components: { SuccessModal },
      data() {
        return {
            success: false,
            successText: this.$t('Authentication_success'),
            loading: {
                connect: false
            },
            secret:'',
            qrCode: '',
            passwordAuthentication:'',
            googleCodeAuthentication:'',
            setGoogleAuthenticatorParams: {
                secret:'',
                password:'',
                googleCode:''
            }
        }
      },
      mounted() {
          this.$post('/api/user/getGoogleAuthenticator').then(res => {
              console.log(res)
              this.secret = res.data.secret
              this.qrCode = res.data.qrCode
              QRCode.toCanvas(document.getElementById('canvas'), this.qrCode, function (error) {
                  if (error) console.error(error)
                  console.log('success!');
              })
          })
      },
      methods: {
          copyText(text) {
              let flag = false;
              let textarea = document.createElement("input");//创建input对象
              let currentFocus = document.getElementsByClassName('copy')[0];//当前获得焦点的元素
              currentFocus.appendChild(textarea);//添加元素
              textarea.value = text;
              textarea.focus();
              if(textarea.setSelectionRange)
                  textarea.setSelectionRange(0, textarea.value.length);//获取光标起始位置到结束位置
              else
                  textarea.select();
              try {
                  flag = document.execCommand("copy");//执行复制
                  this.$Message.success('copy success');
              } catch(eo) {
                  flag = false;
              }
              currentFocus.removeChild(textarea);//删除元素
              currentFocus.focus();
              return flag;
          },
          copySecret() {
              this.copyText(this.secret)
          },
          setGoogleAuthenticator() {
              let PasswordNotice = document.getElementById('PasswordNotice')
              let Password = document.getElementById('Password')
              let googleCodeNotice = document.getElementById('googleCodeNotice')
              let googleCode = document.getElementById('googleCode')
              if (this.setGoogleAuthenticatorParams.password == '') {
                Password.style.border = '1px red solid'
                PasswordNotice.style.display = 'block'
                this.passwordAuthentication = this.$t('register.password_empty')
              } else {
                PasswordNotice.style.display = 'none'
                Password.style.border = 'solid 1px #e6ebf1'
              }
              if (this.setGoogleAuthenticatorParams.googleCode == '') {
                googleCode.style.border = '1px red solid'
                googleCodeNotice.style.display = 'block'
                this.googleCodeAuthentication = this.$t('userCenter.loginPassword.Google_verification_code_cannot_be_empty')
              } else {
                googleCodeNotice.style.display = 'none'
                googleCode.style.border = 'solid 1px #e6ebf1'
              }

              this.loading.connect = true
              this.setGoogleAuthenticatorParams.secret = this.secret
              let form = new FormData()
              for(let i in this.setGoogleAuthenticatorParams){
                  form.append(i, this.setGoogleAuthenticatorParams[i])
              }
              this.$post('/api/user/setGoogleAuthenticator', form).then(res => {
                  console.log(res)
                  if(res.code === 0){
                      this.success = true
                      setTimeout(() => {
                          this.$router.push('/userCenter')
                      }, 1500)
                  } else {
                      this.$Message.error(res.msg)
                  }
              }).finally(() => {
                  this.loading.connect = false
              })
          }
      }
  }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: CircularStd;
        src: url('../../../assets/font/Main.ttf');
    }
    .changeBtn {
        float: right;
        height: 40px;
        background-color: #565abf;

        .Text {
            height: 20px;
            font-family: CircularStd;
            font-size: 14px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            line-height: 1.43;
            letter-spacing: -0.4px;
            text-align: center;
            color: #ffffff;
        }
    }
    .Field {
        margin-bottom: 16px;
        display: inline-block;
        padding: 10px 16px;
        width: 384px;
        height: 40px;
        border-radius: 2px;
        border: solid 1px #e6ebf1;
        background-color: #ffffff;
    }

    input::placeholder {
        height: 20px;
        font-family: CircularStd;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: -0.4px;
        color: #bdc6d4;
    }

    .label {
        position: relative;
        margin-bottom: 6px;
        width: 384px;
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
    .erDiv {
        position: relative;
        margin: 16px 0 48px;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .erImg {
            width: 80px !important;
            height: 80px !important;
        }

        .erInput {
            padding: 14px 16px;
            width: 280px;
            height: 48px;
            border-radius: 2px;
            border: solid 1px #e6ebf1;
            background-color: #ffffff;
        }

        .copy {
            position: absolute;
            right: 14px;
            top: 28px;
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
        .copy:hover{
            cursor: pointer;
        }
    }

    .btnG {
        margin: 32px 0 48px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        align-content: flex-start;
        flex-wrap: wrap;
    }

    .btnGc {
        margin: 16px 0 0 0;
        width: 176px;
        height: 40px;
        border-radius: 2px;
        background-color: #565abf;
        text-align: center;

        .Text {
            line-height: 40px;
            font-family: CircularStd;
            font-size: 14px;
            font-weight: 500;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: -0.4px;
            text-align: center;
            color: #ffffff;
        }
    }

    .c1 {
        width: 384px;
        font-family: CircularStd;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.5;
        letter-spacing: -0.4px;
        color: #bdc6d4;
    }

    .t1 {
        margin: 8px 0;
        width: 384px;
        font-family: CircularStd;
        font-size: 20px;
        font-weight: 500;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.4;
        letter-spacing: -1px;
        color: #32325d;
    }

    .Oval {
        text-align: center;
        line-height: 28px;
        border-radius: 50%;
        width: 28px;
        height: 28px;
        background-color: #76e5a1;
        font-family: CircularStd;
        font-size: 16px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        letter-spacing: -0.4px;
        color: #ffffff;
    }

    .Mask {
		min-height: 1168px;
        margin: 0 auto;
        width: 800px;
        padding-bottom:80px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
        border: solid 1px #e6ebf1;
        background-color: #ffffff;

        .h {
            border-radius: 4px 4px 0 0;
            padding: 8px 16px;
            width: 798px;
            height: 40px;
            box-shadow: inset 0 -1px 0 0 #e6ebf1;
            background-color: #ffffff;

            .text {
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
        }
    }

    .location {
        margin: 0 auto;
        width: 800px;
        padding: 8px 0;
        display: flex;
        justify-content: flex-start;
        align-items: center;
    }

    .location1 {
        height: 20px;
        opacity: 0.8;
        font-family: CircularStd;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: -0.4px;
        color: #32325d;
    }
</style>
