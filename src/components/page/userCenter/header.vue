<template>
    <div>
        <div id="f1">
            <div style="display: flex;justify-content: center;align-items: center;height: 100%;">
                <router-link class="Acount" :class="this.$route.matched[2].path === '/account' ? 'active' : ''" to="/account">{{ $t('userCenter.Acount') }}</router-link>
                <router-link class="Safety-record" :class="this.$route.matched[2].path === '/safetyRecord' ? 'active' : ''" to="/safetyRecord">{{ $t('userCenter.Safety_record') }}</router-link>
            </div>
        </div>
        <router-view />
    </div>
</template>

<script>
  export default {
    name: "header",
      mounted() {
        console.log(this.$route.matched)
      }
  }
</script>

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
