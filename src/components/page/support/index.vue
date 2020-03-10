<template>
  <div id="support" class="content">
    <div class="box">
      <Breadcrumb separator="<b style='color:#32325d;'>></b>">
        <BreadcrumbItem to="/" style="color:#32325d;">{{ $t('support.Support') }}</BreadcrumbItem>
        <BreadcrumbItem style="color:#32325d;">{{ $t('support.Privacy_policy') }}</BreadcrumbItem>
      </Breadcrumb>
      <div class="con">
        <div class="title">{{ $t('support.Privacy_policy') }}</div>
        <div class="detail">
          <h3>{{ $t('support.Privacy_policy') }}</h3>
          <p id="cpdData2"></p>
          <!-- <h3>{{ $t('support.index.Collected_Personal_Data') }}</h3> -->
          <!-- <p id="cpdData2"></p> -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'support',
  data() {
    return {
      data1: '',
      data2: ''
    }
  },
  mounted() {
    this.$store.commit("changeNavIndex", 4)
    this.getOtherContent2()
  },
  methods: {
    getOtherContent2() {
      let form = new FormData()
      form.append('type', '2')
      window.newVue._$lang.lang == "zh-CN"
        ? form.append("language", 1)
        : window.newVue._$lang.lang == "en-US"
        ? form.append("language", 3)
        : window.newVue._$lang.lang == "ko-KR"
          ? form.append("language", 4)
          : "";
      this.$post('/api/otherContent/getOtherContent', form).then(res => {
        console.log(res)
        this.data2 = res.data.content
        let cpdData2 = document.getElementById('cpdData2')
        cpdData2.innerHTML = this.data2
      })
    }
  }
}
</script>
<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  #support img{
    width: auto !important;
    height: auto;
  }
</style>
<style lang="scss" scoped>
.content {
  padding-top: 40px;
  width: 100%;
  background-color: #e3e8ee;
  padding-bottom: 160px;
  .box {
    margin: 0 auto;
    width: 800px;
    .con {
      padding-bottom: 24px;
      margin-top: 8px;
      width: 800px;
      border-radius: 4px;
      box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
      border: solid 1px #e6ebf1;
      background-color: #f7f9fc;
      .title {
        border-radius: 4px 4px 0 0;
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
        h3 {
          padding-left: 16px;
          padding-top: 16px;
          font-family: CircularStd;
          font-size: 20px;
          font-weight: 500;
          line-height: 28px;
          color: #32325d;
        }
        h3:nth-of-type(2){
            padding-top:40px;
        }
        p {
          padding-left: 16px;
          padding-top: 8px;
          font-family: CircularStd;
          font-size: 16px;
          line-height: 24px;
          color: #32325d;
        }
      }
    }
  }
}
</style>
