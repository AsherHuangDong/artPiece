<template>
  <div class="Bithumb_account_notice">
    <div class="Bithumb_account_notice_box" v-if='isSuccess'>
      <div class="Bithumb_account_notice_title">Bithumb account notice</div>
      <div class="bithumb-artpiece">
        <div class="bithumb">
          <img src="@/assets/bithumb.png" alt />
        </div>
        <!-- <img src="@/assets/ge.png" alt="" class='ge'> -->
        <div class="artpiece">
          <img src="@/assets/bithumb.png" alt />
          <p>ArtPiece</p>
        </div>
      </div>
      <div class="success-icon">
        <img src="@/assets/success.png" alt />
      </div>
      <div class="tishi-words">Bithumb account linkage has been completed.</div>
      <div class="ok-button" @click='toHome'>OK</div>
    </div>
    <div class="Bithumb_account_notice_box" v-if='!isSuccess'>
      <div class="Bithumb_account_notice_title">Bithumb account notice</div>
      <div class="bithumb-artpiece">
        <div class="bithumb">
          <img src="@/assets/bithumb.png" alt />
        </div>
        <!-- <img src="@/assets/ge.png" alt="" class='ge'> -->
        <div class="artpiece">
          <img src="@/assets/bithumb.png" alt />
          <p>ArtPiece</p>
        </div>
      </div>
      <div class="success-icon">
        <img src="@/assets/failed.png" alt />
      </div>
      <div class="tishi-words">Lock of user information</div>
      <div class='tishi-words1'>Please confirm your previous sign-up on Art piece.</div>
      <div class="ok-button" @click='toHome'>OK</div>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            isSuccess:false
        }
    },
    methods:{
      toHome(){
        this.$router.push('/')
      },
    },
    mounted(){
      if(this.$route.query.status==1){
        this.isSuccess = true
        localStorage.token = this.$route.query.token
      }else{
        this.isSuccess = false
      }
    },
}
</script>
<style scoped>
.Bithumb_account_notice_box {
    padding-bottom:44px;
  width: 592px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.Bithumb_account_notice_title {
  padding: 32px 0 16px 0;
  font-family: CircularStd;
  font-size: 36px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 48px;
  letter-spacing: -1px;
  text-align: center;
  color: #32325d;
}
.bithumb-artpiece {
    position: relative;
  width: 384px;
  height: 64px;
  border-radius: 2px;
  background-color: #f3f8fe;
  padding: 0 35px 0 64px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
}
.bithumb img {
  width: 63px;
  height: 16px;
}
.artpiece {
  display: flex;
}
.artpiece img {
  width: 63px;
  height: 16px;
}
.artpiece p {
  font-size: 12px;
  color: #3a3a39;
  padding-left: 4px;
}
.success-icon {
  width: 64px;
  height: 64px;
  margin-top: 32px;
}
.success-icon img {
  width: 64px;
  height: 64px;
}
.tishi-words {
  margin-top: 8px;
  height: 36px;
  font-family: CircularStd;
  font-size: 24px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.5;
  letter-spacing: -1px;
  text-align: center;
  color: #32325d;
}
.tishi-words1{
    height: 20px;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.43;
  letter-spacing: -0.4px;
  text-align: center;
  color: #bdc6d4;
}
.ok-button {
  margin-top: 40px;
  width: 384px;
  height: 48px;
  line-height: 48px;
  text-align: center;
  border-radius: 2px;
  background-color: #565abf;
  font-family: CircularStd;
  font-size: 14px;
  font-weight: 500;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: -0.4px;
  text-align: center;
  color: #ffffff;
}
</style>