<template>
  <div id="f1">
    <div class="f1C">
      <div style="">
        <router-link class="Acount" :class="tradingIndex===1?'active':''" to="/trading">{{ $t('Tranding.header.Trading') }}</router-link>
        <router-link v-if="canClickInfo" class="Safety-record" to="/tradingInformation" :class="tradingIndex===2?'active': canClickInfo ? '' : 'linkDisabled'">{{ $t('Tranding.header.Information') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Header",
    data() {
      return {
        ws: {}
      }
    },
    computed: {
      tradingIndex() {
        return this.$store.state.tradingIndex;
      },
      canClickInfo() {
        return this.$store.state.canClickInfo;
      }
    },
    mounted() {
      if (window.location.hash === '#/tradingInformation') {
        this.$store.commit('setCanClickInfo', true)
      }
    },
    methods: {
    }
  }
</script>

<style scoped>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  .linkDisabled{
    color: #c5c8ce !important;
  }
  .linkDisabled:hover{
    cursor: not-allowed;
  }
  #f1 {
    min-width: 1216px;
    height: 48px;
    background-color: #f7f9fc;
  }
  .f1C{
    margin: 0 auto;
    min-width: 1216px;
    height: 100%;
  }
  .f1C>div{
    width:1216px;margin: 0 auto;display: flex;justify-content: center;align-items: center;height: 100%;
  }
  .Acount {
    margin-right: 20px;
    height: 100%;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.4;
    letter-spacing: -1px;
    color: #32325d;
  }
  .Safety-record {
    height: 100%;
    font-family: CircularStd;
    font-size: 20px;
    font-weight: 500;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.4;
    letter-spacing: -1px;
    color: #32325d;
  }
  .active {
    color: #565abf;
    border-bottom: 2px solid #565abf;
  }
</style>
