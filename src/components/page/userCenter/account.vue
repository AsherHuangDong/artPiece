<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: "account",
    beforeRouteEnter(to,from,next) {
      if (localStorage.getItem('isSign') === '1') {
        next()
      } else {
        if ((window.location.hash).indexOf('/asset') !== -1){
          // 退出登录后跳到首页
          // this.$router.push('/login')
          this.$router.push('/')
        }
        return window.newVue.$Notice.error({
          title: window.newVue.$t('request.pleaseLogin')
        });
      }
    }
  }
</script>

<style scoped>

</style>
