<template>
    <div class="content">
        <div class="login-box">
            <h3 style="position: relative;">Login
                <div style="position: absolute;top: 0;left: -400px;z-index: -1;"><img src="../../assets/bg8.png" alt=""></div>
                <div style="position: absolute;top: 0;right: -400px;z-index: -1;"><img src="../../assets/bg9.png" alt=""></div>
            </h3>
            <div class="Please-fill-in-all-i">Please fill in all info below to finish registration</div>
            <div class="item">
                <p>Email</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="item" style="margin-bottom: 40px;">
                <p>Country</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="item">
                <p>Password</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="item" style="margin-bottom: 40px;">
                <p>Confirm Password</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="item">
                <p>Payment password</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="item" style="margin-bottom: 40px;">
                <p>Confirm Payment password</p>
                <input type="text" placeholder="Please enter your password" />
            </div>
            <div class="submit" @click='signUp'>Sign up</div>
        </div>
    </div>
</template>
<script>
  export default {
    name: 'SNSLogin',
    data(){
      return {
        agree:false
      }
    },
    methods:{
      isAgree(){
        this.agree = !this.agree
      },
      signUp(){
        this.$router.push('/')
      }
    }
  }
</script>
<style lang="scss" scoped>
    @font-face {
        font-family: CircularStd;
        src: url('../../assets/font/Main.ttf');
    }
    input::placeholder{
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
    .Please-fill-in-all-i {
        margin-bottom: 32px;
        width: 384px;
        height: 20px;
        font-family: CircularStd;
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 1.43;
        letter-spacing: -0.4px;
        text-align: center;
        color: #32325d;
    }
    .content {
        width: 100%;
        padding-bottom:160px;
        .login-box {
            width: 384px;
            margin: 80px auto 0;
            h3 {
                font-size: 36px;
                font-weight: 500;
                text-align: center;
                color: #32325d;
                margin-bottom: 8px;
            }
            .item {
                margin-bottom: 16px;
                p {
                    font-size: 14px;
                    color: #32325d;
                    padding-bottom: 6px;
                }
                input {
                    padding-left: 20px;
                    width: 100%;
                    height: 40px;
                    border-radius: 2px;
                    border: 1px solid #e6ebf1;
                    font-size: 14px;
                    color: #bdc6d4;
                    background-color: #fff;
                }
            }
            .agree {
                font-size: 14px;
                color: #32325d;
                p {
                    span {
                        margin-right:3px;
                        display:inline-block;
                        vertical-align: middle;
                        width: 17px;
                        height: 17px;
                        line-height:17px;
                        text-align: center;
                        border-radius: 2px;
                        background-color: #32325d;
                        color:#87bbfc;
                    }
                }
            }
            .submit {
                margin-top: 20px;
                text-align: center;
                width: 100%;
                height: 48px;
                line-height: 48px;
                border-radius: 2px;
                background-color: #565abf;
                font-size: 14px;
                color: #ffffff;
            }
        }
    }
</style>
