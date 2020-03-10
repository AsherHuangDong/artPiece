<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: "app",
  watch: {
    $lang(n) {
      localStorage.setItem("navLang", n);
    }
  },
  mounted() {
    document.addEventListener('touchstart', this.handler, true);
  },
  methods: {
    handler() {

    }
  }
};
</script>

<style>
  .ivu-icon-ios-close {
    display: none !important;
  }
  .test-2::-webkit-scrollbar { /*滚动条整体样式*/
    width: 0; /*高宽分别对应横竖滚动条的尺寸*/
    height: 0;
    margin-right: -10px;
  }

  .test-2::-webkit-scrollbar-thumb { /*滚动条里面小方块*/
    border-radius: 0;
    /*-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    /*background: #c1c1c1;*/
  }

  .test-2::-webkit-scrollbar-track { /*滚动条里面轨道*/
    /*-webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);*/
    border-radius: 0;
    /*background: #f1f1f1;*/
  }
  .ivu-page-next:hover {
    background-color: #f7f9fc !important;
  }
  .ivu-page-prev:hover {
    background-color: #f7f9fc !important;
  }
  .ivu-page-next a:hover {
    color: #32325d !important;
  }
  .ivu-page-prev a:hover {
    color: #32325d !important;
  }
  .ivu-page-disabled a:hover {
    color: #ccc !important;
  }
	.ivu-page-disabled {
		background-color: #fff !important;
	}
	.ivu-page-prev {
		background-color: transparent;
	}
  .Nodata {
    font-family: CircularStd;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    line-height: 1.5;
    letter-spacing: -0.4px;
    text-align: center;
    color: #bdc6d4;
  }
  .flowDotted {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
.ivu-tabs-nav .ivu-tabs-tab-active {
  color: #565abf !important;
  font-size: 16px;
  font-weight: 500;
}
.ivu-tabs-nav .ivu-tabs-tab {
  color: #bdc6d4;
  font-size: 16px;
  font-weight: 500;
}
.ivu-tabs-ink-bar {
  background-color: #565abf !important;
}
#app {
  position: relative;
  min-width: 1216px;
  overflow: hidden;
}
.pointer:hover {
  cursor: pointer;
}
</style>
