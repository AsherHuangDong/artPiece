<template>
	<div class="nav">
		<div class="layout">
			<div style="position:relative;">
				<div class="pointer" @click="toBithumb" style="width: 127px;height: 31px;position: absolute;top: 13px;left: 0;"></div>
				<div class="pointer" @click="toHome" style="width: 100px;height: 31px;position: absolute;top: 13px;left: 133px;"></div>
				<img class="artpiceLogo" src="../../assets/artpiceLogo.png" alt />
			</div>
			<div class="rightNav">
				<div class="about">
					<router-link to="/about" :class="index==0?'act':''">{{ $t('Nav.About') }}</router-link>
				</div>
				<div class="trading" @mouseover="showModel(2)" @mouseout="hiddenModel()">
					<router-link to="/auction" :class="index==1?'act':''">{{ $t('Tranding.Auction') }}</router-link>
				</div>
				<div class="trading" @mouseover="showModel(2)" @mouseout="hiddenModel()">
					<router-link to="/trading" :class="index==2?'act':''">{{ $t('Nav.Trading') }}</router-link>
				</div>
				<div v-if="showMining === '1'" class="trading" @mouseover="showModel(2)" @mouseout="hiddenModel()">
					<router-link to="/mining" :class="index==5?'act':''">{{ $t('Nav.mining') }}</router-link>
				</div>
				<div class="asset" @mouseover="showModel(3)" @mouseout="hiddenModel()">
					<a href="javascript:;" :class="index==3?'act':''">{{ $t('Nav.Asset') }}</a>
					<div class="model" v-show="isShow==3" @click="hiddenModel()">
						<router-link to="/asset">{{ $t('Nav.wallet') }}</router-link>
<!--						<a @click="beforeDeposit">{{ $t('Nav.deposit_withdrawal') }}</a>-->
						<router-link to="/asset/order">{{ $t('Nav.order') }}</router-link>
						<router-link to="/asset/bithumbAssets">{{ 'Bithumb ' + $t('Asset')}}</router-link>
						<router-link to="/asset/bithumbWithdraw">{{ 'Bithumb ' + $t('asset.index.Withdrawal')}}</router-link>
					</div>
				</div>
				<div class="support" @mouseover="showModel(4)" @mouseout="hiddenModel()">
					<a href="javascript:;" :class="index==4?'act':''">{{ $t('Nav.Support') }}</a>
					<div class="model" v-show="isShow==4" @click="hiddenModel()">
						<a @click="toNotice">{{ $t('Nav.Notice') }}</a>
						<a @click="toPolicy">{{ $t('Nav.Guide') }}</a>
<!--						<a @click="toNews">{{ $t('Nav.News') }}</a>-->
<!--						<a @click="toAbout">{{ $t('support.aboutUs') }}</a>-->
						<a @click="toContact">{{ $t('support.contactUs') }}</a>
						<!--            原来的公告跳转-->
<!--						<router-link to="/supportnotice">{{ $t('Nav.Notice') }}</router-link>-->
<!--						<router-link to="/support">{{ $t('Nav.Guide') }}</router-link>-->
						<!--            <router-link to="/supportContact">{{ $t('Nav.Contact') }}</router-link>-->
<!--						<router-link to="/supportnews">{{ $t('Nav.News') }}</router-link>-->
						<!--            <router-link to="/help">帮助中心</router-link>-->
						<!--            <router-link to="/receiptNotification">{{ $t('support.receiptNotification') }}</router-link>-->
<!--						<router-link to="/aboutUs">{{ $t('support.aboutUs') }}</router-link>-->
<!--						<router-link to="/contactUs">{{ $t('support.contactUs') }}</router-link>-->
					</div>
				</div>
				<!--        <div class='support' @mouseover="showModel(4)" @mouseout="hiddenModel()">-->
				<!--          <a href='javascript:;' :class="index==4?'act':''">APC</a>-->
				<!--        </div>-->
			</div>
		</div>
		<FailedModal :show="show.failed" :text="show.failedText"></FailedModal>
	</div>
</template>
<script>
	import FailedModal from "../modal/FailedModal";
	export default {
		name: "nav",
		components: {
			FailedModal
		},
		data() {
			return {
				showMining: "0",
				isShow: 0,
				show: {
					failed: false,
					failedText: ""
				}
			};
		},
		computed: {
			index() {
				console.log('pp', this.$store.state.navIndex)
				return this.$store.state.navIndex;
			},
			isLogin: {
				get() {
					return this.$store.state.isLogin;
				},
				set(n) {
					this.$store.state.isLogin = n;
				}
			}
		},
		mounted() {
			// console.log(this.isLogin)
			this.$store.commit("changeNavIndex", 2);
			if (localStorage.getItem("token")) {
				this.$store.commit("isSign", "1");
			}
			this.isShowMining();
		},
		methods: {
			// 前往bithumb
			toBithumb() {
				window.open('https://www.bithumb.com', "_blank")
			},
			// 前往公告
			toNotice() {
				// let a = window.selfConfig.notice.replace(/language/, this.$lang.toString().toLowerCase())
				// console.log(a)
				// window.open(a, "_blank")
				switch (this.$lang) {
					case 'en-US':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
						break
					case 'zh-CN':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/sections/360007210593-Important-Notice', "_blank")
						break
					case 'ko-KR':
						window.open('https://artpiecehelp.zendesk.com/hc/ko/sections/360007210593-Important-Notice', "_blank")
						break
				}
			},
			// 前往隐私策略
			toPolicy() {
				// let a = window.selfConfig.policy.replace(/language/, this.$lang.toString().toLowerCase())
				// window.open(a, "_blank")
				switch (this.$lang) {
					case 'en-US':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
						break
					case 'zh-CN':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042647933-Privacy-terms', "_blank")
						break
					case 'ko-KR':
						window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042647933-Privacy-terms', "_blank")
						break
				}
			},
			// 前往新闻
			toNews() {
				let a = window.selfConfig.news.replace(/language/, this.$lang.toString().toLowerCase())
				console.log(a)
				window.open(a, "_blank")
				// window.open(window.selfConfig.news, "_blank")
			},
			// 前往关于我们
			toAbout() {
				let a = window.selfConfig.aboutUs.replace(/language/, this.$lang.toString().toLowerCase())
				console.log(a)
				window.open(a, "_blank")
				// window.open(window.selfConfig.aboutUs, "_blank")
			},
			// 前往联系我们
			toContact() {
				// let a = window.selfConfig.connectUs.replace(/language/, this.$lang.toString().toLowerCase())
				// window.open(a, "_blank")
				switch (this.$lang) {
					case 'en-US':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163574-Contact-Us', "_blank")
						break
					case 'zh-CN':
						window.open('https://artpiecehelp.zendesk.com/hc/en-us/articles/360042163574-Contact-Us', "_blank")
						break
					case 'ko-KR':
						window.open('https://artpiecehelp.zendesk.com/hc/ko/articles/360042163574-Contact-Us', "_blank")
						break
				}
			},
			// 是否显示挖矿
			isShowMining() {
				this.$post("/api/homeNotLog/isMining", {}).then(res => {
					this.showMining = res.data;
				});
			},
			// 在选择进入充值提现前，判断是否已选择币对
			beforeDeposit() {
				if (localStorage.getItem("isSign") !== "1") {
					window.newVue.$Notice.error({
						title: window.newVue.$t("request.pleaseLogin")
					});
					return null;
				}
				if (!JSON.parse(sessionStorage.getItem("depositSymbol"))) {
					this.show.failed = true;
					this.show.failedText = this.$t('please_select_currency_on_wallet');
					setTimeout(() => {
						this.show.failed = false;
						this.show.failedText = "";
					}, 2000);
					this.$router.push("/asset");
				} else {
					this.$router.push("/asset/deposit");
				}
			},
			changeLanguage(v) {
				window.newVue._$lang.lang = v;
				let form = new FormData();
				let d = window.newVue.$lang.toString().replace(/-/g, "_");
				form.append("language", d);
				this.$post("/api/user/userLanguage", form);
			},
			toHome() {
				this.$router.push("/");
				// window.open('https://bithumb.artpiece.com', "_blank")
			},
			showModel(index) {
				this.isShow = index;
			},
			hiddenModel() {
				this.isShow = 0;
			},
			userCenter() {
				console.log(localStorage.getItem("token"));
				if (localStorage.getItem("token") === null) {
					// 退出登录后跳到首页
					// this.$router.push('/login')
					this.$router.push('/')
				} else {
					this.$router.push("/userCenter");
				}
			},
			signOut() {
				console.log("sign out");
				localStorage.clear();
				this.$store.commit("isSign", "0");
				this.isLogin = "0";
			}
		}
	};
</script>
<style>
	.artpiceLogo {
		width: 229px;
		height: 31px;
	}
</style>
<style lang="scss">
	@font-face {
		font-family: CircularStd;
		src: url("../../assets/font/Main.ttf");
	}

	.nav {
		background: -webkit-linear-gradient(to left, #2f3e53, #151f32);
		/* Safari 5.1 - 6.0 */
		background: -o-linear-gradient(to left, #2f3e53, #151f32);
		/* Opera 11.1 - 12.0 */
		background: -moz-linear-gradientto(left, #2f3e53, #151f32);
		/* Firefox 3.6 - 15 */
		background: linear-gradient(to left, #2f3e53, #151f32);
		/* 标准的语法（必须放在最后） */
		/* background-image: linear-gradient(to left, #2f3e53 100%, #151f32);*/
		width: 100%;
		min-width: 1216px;
		height: 80px;
		line-height: 80px;
		box-shadow: inset 0 -1px 0 0 #f7f9fc;

		.layout {
			width: 1216px;
			margin: 0 auto;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.logo {
				color: #32325d;
				font-size: 16px;
			}

			.rightNav {
				display: flex;

				.trading,
				.about,
				.asset,
				.support {
					position: relative;

					a {
						height: 80px;
						margin-left: 32px;
						color: #fff;
						font-size: 14px;
						font-family: CircularStd;
						font-weight: 500;
						font-style: normal;
						font-stretch: normal;
						display: flex;
					}

					.model {
						z-index: 100;
						border-radius: 4px;
						width: 200px;
						padding: 10px 0;
						background: #fff;
						position: absolute;
						left: 0;
						top: 80px;
						border: 1px solid #eee;

						a {
							display: block;
							height: 40px;
							line-height: 40px;
							color: #32325e;
						}
					}

					.act {
						color: #fff;
						border-bottom: 2px solid #fff;
					}
				}
			}
		}
	}
</style>
