<template>
  <div>
    <Modal v-model="showModal" width="384">
      <div class="success">
        <div class="successIcon">
          <img src="../../assets/failed.png" alt="">
        </div>
<!--        <div style="">{{ text }}</div>-->
<!--        <div style="">{{ text2 }}</div>-->
        <div class="failedText1">{{ text }}</div>
        <div class="failedText2">{{ text2 }}</div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "FailedModal",
    props: ['show', 'text', 'text2'],
    data() {
      return {
      }
    },
    computed: {
      showModal: {
        get() {
          return this.show
        },
        set(n) {
          console.log(n)
          this.$emit('failShow', n)
        }
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../assets/font/Main.ttf');
  }
  .failedText2 {
    margin-top: 5px;
    font-family: CircularStd;
    padding-top: 4px;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    text-align: center;
    color: #bdc6d4;
    line-height: 14px;
  }
  .ivu-modal-footer {
    border: 0;
  }
  .failedText1 {
    text-align: center;
    padding-top: 93px;
    line-height: 24px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
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
  .success {
    width: 384px;
    border-radius: 4px;
    background-color: #ffffff;
  }
</style>
