<template>
    <div style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
        <div style="width:1216px;margin: 0 auto">
            <div class="location">
                <div class="location1">User center</div>
                <div style="margin: 0 6px;width:8px;height: 14px;"><img src="../../../assets/rA.png" alt=""></div>
                <div class="location1">Modift password</div>
            </div>
            <div class="Mask">
                <div class="h">
                    <div class="text">
                        Movile associated
                    </div>
                </div>
                <div style="margin: 40px auto 0;width:386px;">
                    <div class="label">Email verification code<div class="send">Send</div></div>
                    <input class="Field" type="text" placeholder="Please enter your password">
                    <div class="label">Nationalty</div>
                    <input class="Field" type="text" placeholder="Please enter your password">
                    <div class="label">Mobile number</div>
                    <input class="Field" type="text" placeholder="Please enter your password">
                    <div class="label">SMS Verification code<div class="send">Send</div></div>
                    <input class="Field" type="text" placeholder="Please enter your password">
                    <div class="label">Google Verification code</div>
                    <input class="Field" type="text" placeholder="Please enter your password">
                    <div class="changeBtn"><div class="Text">Change</div></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "movileAssociated"
  }
</script>

<style lang="scss" scoped>
    @font-face {
        font-family: CircularStd;
        src: url('../../../assets/font/Main.ttf');
    }
    .changeBtn {
        float: right;
        width: 92px;
        height: 40px;
        border-radius: 2px;
        background-color: #565abf;
        padding: 10px 22px;
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
    .send {
        position: absolute;
        top: 35px;
        right: 16px;
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
    .Field {
        margin-bottom: 16px;
        display: inline-block;
        padding:10px 16px;
        width: 384px;
        height: 40px;
        border-radius: 2px;
        border: solid 1px #e6ebf1;
        background-color: #ffffff;
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
    .Mask {
        margin: 0 auto;
        width: 800px;
        height: 554px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
        border: solid 1px #e6ebf1;
        background-color: #ffffff;

        .h {
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
