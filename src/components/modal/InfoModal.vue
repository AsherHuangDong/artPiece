<template>
  <div>
    <Modal v-model="showModal" width="384">
      <div class="success">
        <div class="successIcon">
          <img src="../../assets/ii.png" alt="">
        </div>
        <div class="successful">{{ text }}</div>
      </div>
      <div slot="footer">
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "InfoModal",
    props: ['show', 'text'],
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
  .success {
    text-align: center !important;
    width: 384px;
    height: 156px;
    border-radius: 4px;
    background-color: #ffffff;
  }
</style>
