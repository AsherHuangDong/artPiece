<template>
  <div class="content" style="height: auto">
    <div class="box">
      <Breadcrumb separator="<b style='color:#32325d;'>></b>">
        <BreadcrumbItem to="/" style="color:#32325d;">{{ $t('support.Support') }}</BreadcrumbItem>
        <BreadcrumbItem style="color:#32325d;">{{ $t('support.receiptNotification') }}</BreadcrumbItem>
      </Breadcrumb>
      <div class="con">
        <div class="title">{{ $t('support.receiptNotification') }}</div>
        <div class="detail">
          <div class="row" style="height: auto">
            <div class="text">
              <div style="padding-top: 6px;" id="content"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import {formatData} from "../../../tool";

  export default {
    name: 'receiptNotification',
    data() {
      return {
        total: 0,
        selectNoticeInfoByPageParams: {
          currpage: 1,
          size: 5
        },
        notice: [],
      }
    },
    mounted() {
      this.selectNoticeInfoByPage()
      this.$store.commit("changeNavIndex", 4);
    },
    methods: {
      formatData(d) {
        return formatData(d)
      },
      pageChange(e) {
        this.selectNoticeInfoByPageParams.currpage = e
        this.selectNoticeInfoByPage()
      },
      selectNoticeInfoByPage() {
        let form = new FormData()
        form.append('type', '3')
        window.newVue._$lang.lang == "zh-CN"
          ? form.append("language", 1)
          : window.newVue._$lang.lang == "en-US"
          ? form.append("language", 3)
          : window.newVue._$lang.lang == "ko-KR"
            ? form.append("language", 4)
            : "";
        this.$post('/api/otherContent/getOtherContent', form).then(res => {
          console.log(res)
          this.data1 = res.data.content
          let ppData1 = document.getElementById('content')
          ppData1.innerHTML = this.data1
        })
      }
    }
  };
</script>
<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .ivu-page-item-jump-prev,
  .ivu-page-next,
  .ivu-page-prev {
    color: #32325d;
  }
  .ivu-page-next,
  .ivu-page-prev {
    background-color: transparent;
  }
  .ivu-page-item {
    color: #32325d;
    background-color: transparent;
    font-weight: normal;
  }
</style>
<style lang="scss" scoped>
  .content {
    height: 773px;
    padding-top: 40px;
    width: 100%;
    background-color: #e3e8ee;
    padding-bottom: 160px;
    .box {
      margin: 0 auto;
      width: 800px;
      .con {
        margin-top: 8px;
        width: 800px;
        border-radius: 4px;
        box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
        border: solid 1px #e6ebf1;
        background-color: #f7f9fc;
        .title {
          width: 799px;
          height: 40px;
          box-shadow: inset 0 -1px 0 0 #e6ebf1;
          background-color: #ffffff;
          font-family: CircularStd;
          font-size: 16px;
          font-weight: 500;
          line-height: 40px;
          color: #32325d;
          padding-left: 16px;
        }
        .detail {
          .row {
            padding: 16px;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 800px;
            height: 88px;
            box-shadow: inset 0 -1px 0 0 #e6ebf1;
          }

          .text {
            p:nth-of-type(1) {
              font-family: CircularStd;
              font-size: 12px;
              color: #565abf;

              span {
                color: #bdc6d4;
              }
            }

            p:nth-of-type(2) {
              font-family: CircularStd;
              font-size: 16px;
              color: #32325d;
            }
          }

          .page {
            height: 50px;
            line-height: 50px;
            text-align: center;
          }
        }
      }
    }
  }
</style>
