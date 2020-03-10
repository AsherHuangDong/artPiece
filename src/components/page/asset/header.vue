<template>
  <div>
    <div id="f1">
      <div style="display: flex;justify-content: center;align-items: center;height: 100%;">
        <router-link :disabled="!depositSymbol.depositOpen"
                     class="Acount"
                     :class="!depositSymbol.depositOpen ? 'dis' : this.$route.matched[2].path === '/asset/deposit' ? 'active' : ''"
                     to="/asset/deposit">{{ $t('asset.Deposit') }}</router-link>
        <router-link :disabled="!depositSymbol.withdrawOpen"
                     class="Safety-record"
                     :class="!depositSymbol.withdrawOpen ? 'dis' : this.$route.matched[2].path === '/asset/withdraw' ? 'active' : ''"
                     to="/asset/withdraw">{{ $t('asset.Withdraw') }}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "header",
    data() {
      return {
        depositSymbol: {}
      }
    },
    mounted() {
      this.depositSymbol = JSON.parse(sessionStorage.getItem('depositSymbol'))
    }
  }
</script>
<style>
  .dis{
    color: #bbb !important;
  }
</style>
<style scoped>
  @font-face {
    font-family: CircularStd;
    src: url('../../../assets/font/Main.ttf');
  }
  #f1 {
    width: 100%;
    height: 48px;
    background-color: #f7f9fc;
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
    border-bottom: 2px solid #565abf;
    color: #565abf;
  }
</style>
