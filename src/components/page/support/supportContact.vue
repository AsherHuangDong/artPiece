<template>
  <div class="content">
    <div class="box">
      <Breadcrumb separator="<b style='color:#32325d;'>></b>">
        <BreadcrumbItem to="/" style="color:#32325d;">{{ $t('support.Support') }}</BreadcrumbItem>
        <BreadcrumbItem style="color:#32325d;">{{ $t('support.Contact') }}</BreadcrumbItem>
      </Breadcrumb>
      <div class="con">
        <div class="title">{{ $t('support.Contact') }}</div>
        <div class="detail">
          <div class="row" v-for="(item,index) in contact" :key="index">
            <div class="text">
              <p>{{ item.announcementTittle }}&nbsp;&nbsp;&nbsp;&nbsp; <span>{{ item.createTime }}</span></p>
              <P style="padding-top: 6px;" class="contactP"></P>
            </div>
          </div>
          <div class="page">
            <Page @on-change="pageChange" :page-size="5" :total="total" size="small"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'SupportContact',
    data() {
      return {
        total: 0,
        selectNewByPageParams: {
          currpage: 1,
          pageSize: 5
        },
        contact: [],
      }
    },
    mounted() {
      this.selectNoticeInfoByPage()
      this.$store.commit("changeNavIndex", 4);
    },
    methods: {
      pageChange(e) {
        this.selectNewByPageParams.currpage = e
        this.selectNoticeInfoByPage()
      },
      selectNoticeInfoByPage() {
        let form = new FormData()
        for (let i in this.selectNewByPageParams) {
          form.append(i, this.selectNewByPageParams[i])
        }
        this.$post('/api/announcement/selectNewByPage', form).then(res => {
          console.log(res)
          this.contact = res.data.records
          for (let i = 0; i < this.contact.length; i++) {
            let temp = ''
            temp += this.contact[i].createTime[0] + '-'
            temp += this.contact[i].createTime[1] + '-'
            temp += this.contact[i].createTime[2] + ' '
            this.contact[i].createTime = temp
          }
          this.total = res.data.total
          setTimeout(() => { // 先让dom加载出来，再渲染
            for (let i = 0; i < this.contact.length; i++) {
              let p = document.getElementsByClassName('contactP')[i]
              p.innerHTML = this.contact[i].announcementContent
            }
          }, 1)

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
