<template>
  <div>
    <Modal v-model="show" width="384" :closable="false" :mask-closable="false">
      <div class="success">
        <div class="confirm">{{ text }}</div>
        <div class="Guide-text">{{ text2 }}</div>
      </div>
      <div slot="footer">
        <Button @click="cancel" type="default">{{ $t('modal.back')}}</Button>
        <Button :loading="loading" @click="confirm" type="primary">{{ $t('modal.confirm')}}</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  export default {
    name: "Confirm",
    props: ['show', 'text', 'text2', 'self', 'item', 'loading'],
    data() {
      return {
      }
    },
    computed: {
      showM: {
        get() {
          return this.show
        },
        set(n) {
          this.show = n
        }
      }
    },
    methods: {
      cancel() {
        this.self.show.confirm = false
      },
      confirm() {
        this.self.confirm(this.item)
      }
    }
  }
</script>

<style>
  @font-face {
    font-family: CircularStd;
    src: url('../../assets/font/Main.ttf');
  }
  .Guide-text {
    width: 320px;
    height: 40px;
    font-family: CircularStd;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.43;
    letter-spacing: -0.4px;
    color: #32325d;
  }
  .ivu-modal-footer {
    border: 0;
  }
  .confirm {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 45%;
    margin-top: 10px;
    height: 36px;
    font-family: CircularStd;
    font-size: 24px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 1.5;
    letter-spacing: -1px;
    color: #32325d;
  }
  .ivu-modal-body {
    position: relative;
    padding: 0 !important;
  }
  .success {
    width: 384px;
    height: 156px;
    border-radius: 4px;
    background-color: #ffffff;
  }
</style>
