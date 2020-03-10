<template>
	<div id="loginHistory" style="min-width: 1216px;background-color: #e3e8ee;padding-bottom: 160px;">
		<div style="width:1216px;margin: 0 auto;padding-top: 16px;">
			<div class="Mask">
				<div class="h">
					<div class="text">{{ $t('userCenter.Login_History.Login_History') }}</div>
				</div>
				<div>
					<div class="f2N-2">
						<div style="width:100%;">
							<!-- <Table size="small" :loading="loadingTable" :columns="columns1" :data="data1"></Table> -->
							<div style=" width: 798px;height: 32px;background-color: #f7f9fc;display: flex;
							justify-content: space-between;align-items: center;padding: 7px 16px 9px;">
								<div class="tableHeaderText" style="width: 24%;">{{ $t("userCenter.Login_History.Time") }}</div>
								<div class="tableHeaderText" style="width: 24%;">{{ $t("userCenter.Login_History.Type") }}</div>
								<div class="tableHeaderText" style="width: 24%;text-align: right;">IP</div>
								<div class="tableHeaderText" style="width: 24%;text-align: right;">{{ $t("userCenter.Login_History.Status") }}</div>
							</div>
							<div class="tableBody" style="display: flex;
							justify-content: space-between;align-items: center;font-family: CircularStd;"
							v-for="(item, index) in data1" :key="index">
								<div class="tableHeaderText" style="width: 24%;">{{ item.resultLoginTime }}</div>
								<div class="tableHeaderText" style="width: 24%;">{{ item.loginType === 1 ? "PC" : "" }}</div>
								<div class="tableHeaderText" style="width: 24%;text-align: right;">{{ item.loginIp}}</div>
								<div class="tableHeaderText" style="width: 24%;text-align: right;">{{ item.loginStatus === 1 ?
								$t("userCenter.Login_History.success") :
								$t("userCenter.Login_History.failure") }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div style="margin: 16px auto;text-align: center;">
				<Page @on-change="pageChange" :total="page.total" size="small" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: "loginHistory",
		data() {
			const self = this;
			return {
				loadingTable: false,
				columns1: [{
						renderHeader: h => {
							return h("span", {}, [self.$t("userCenter.Login_History.Time")]);
						},
						render: (h, params) => {
							let result = "";
							if (params.row.loginTime) {
								if (params.row.loginTime.length === 6) {
									result += params.row.loginTime[0] + "-";
									result += params.row.loginTime[1] + "-";
									result += params.row.loginTime[2] + " ";
									result += params.row.loginTime[3] + ":";
									result += params.row.loginTime[4] + ":";
									result += params.row.loginTime[5];
								} else {
									result += params.row.loginTime[0] + "-";
									result += params.row.loginTime[1] + "-";
									result += params.row.loginTime[2] + " ";
									result += params.row.loginTime[3] + ":";
									result += params.row.loginTime[4] + ":";
									result += '00'
								}
							}
							return h("span", {}, [result]);
						}
					},
					{
						renderHeader: h => {
							return h("span", {}, [self.$t("userCenter.Login_History.Type")]);
						},
						render: (h, params) => {
							let result = params.row.loginType === 1 ? "PC" : "";
							return h("span", {}, result);
						}
					},
					{
						title: "IP",
						key: "loginIp",
						align: 'right',
					},
					{
						renderHeader: h => {
							return h("span", {}, [self.$t("userCenter.Login_History.Status")]);
						},
						align: 'right',
						render: (h, params) => {
							let result =
								params.row.loginStatus === 1 ?
								self.$t("userCenter.Login_History.success") :
								self.$t("userCenter.Login_History.failure");
							return h("span", {}, result);
						}
					}
				],
				data1: [],
				page: {
					page: 1,
					pageSize: 10,
					total: 0
				}
			};
		},
		mounted() {
			this.getRecord();
		},
		methods: {
			getRecord() {
				this.loadingTable = true;
				let form = new FormData();
				form.append("page", this.page.page);
				form.append("pageSize", this.page.pageSize);
				this.$post("/api/user/safetyRecord", form)
					.then(res => {
						console.log(res);
						this.data1 = res.data.records;
						this.page.page = res.data.current;
						this.page.total = res.data.total;
						for (let i in this.data1) {
							let result = ''
							if (this.data1[i].loginTime) {
								if (this.data1[i].loginTime.length === 6) {
									result += this.data1[i].loginTime[0] + "-";
									result += this.data1[i].loginTime[1] + "-";
									result += this.data1[i].loginTime[2] + " ";
									result += this.data1[i].loginTime[3] + ":";
									result += this.data1[i].loginTime[4] + ":";
									result += this.data1[i].loginTime[5];
								} else {
									result += this.data1[i].loginTime[0] + "-";
									result += this.data1[i].loginTime[1] + "-";
									result += this.data1[i].loginTime[2] + " ";
									result += this.data1[i].loginTime[3] + ":";
									result += this.data1[i].loginTime[4] + ":";
									result += '00'
								}
							}
							this.data1[i].resultLoginTime = result
						}
						this.data1 = JSON.parse(JSON.stringify(this.data1))
					})
					.finally(() => {
						this.loadingTable = false;
					});
			},
			pageChange(e) {
				this.page.page = e;
				this.getRecord();
			}
		}
	};
</script>
<style>
	#loginHistory .tableBody {
		font-family: CircularStd;
		width: 798px;
		height: 32px;
		padding: 7px 16px 9px;
		box-shadow: inset 0 -1px 0 0 #f7f9fc;
	}
	#loginHistory .tableHeaderText {
		font-family: CircularStd;
		height: 16px;
		font-size: 12px;
		font-weight: normal;
		font-stretch: normal;
		font-style: normal;
		line-height: 1.33;
		letter-spacing: -0.4px;
		color: #32325d;
	}

	#loginHistory .ivu-page-disabled {
		background-color: #fff !important;
	}

	#loginHistory .ivu-page-prev {
		background-color: transparent;
	}

	#loginHistory .ivu-table:before {
		background-color: #fff;
	}

	.ivu-table-wrapper {
		border: none;
	}

	.ivu-table th {
		background-color: #f7f9fc;
	}

	.ivu-table td,
	.ivu-table th {
		border-bottom: 1px solid #f7f9fc;
	}

	.ivu-page-item {
		background-color: transparent;
	}

	.ivu-page-item:hover a {
		color: #565abf;
	}

	/* .ivu-page-item-active a, .ivu-page-item-active:hover a {
    color: #565abf;
} */
	.ivu-page-item a {
		color: #32325d;
	}

	.ivu-page-next {
		background-color: transparent;
	}
</style>
<style lang="scss" scoped>
	/*@font-face {
  font-family: CircularStd;
  src: url("../../../assets/font/Main.ttf");
}*/

	.changeBtn {
		float: right;
		width: 92px;
		height: 40px;
		border-radius: 2px;
		background-color: #565abf;
		padding: 10px 22px;

		.Text {
			height: 20px;
			font-family: CircularStd;
			font-size: 14px;
			font-weight: 500;
			font-style: normal;
			font-stretch: normal;
			line-height: 1.43;
			letter-spacing: -0.4px;
			text-align: center;
			color: #ffffff;
		}
	}

	.send {
		position: absolute;
		top: 35px;
		right: 16px;
		height: 20px;
		font-family: CircularStd;
		font-size: 14px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: -0.4px;
		text-align: right;
		color: #565abf;
	}

	.Field {
		margin-bottom: 16px;
		display: inline-block;
		padding: 10px 16px;
		width: 384px;
		height: 40px;
		border-radius: 2px;
		border: solid 1px #e6ebf1;
		background-color: #ffffff;
	}

	input::placeholder {
		height: 20px;
		font-family: CircularStd;
		font-size: 14px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: -0.4px;
		color: #bdc6d4;
	}

	.label {
		position: relative;
		margin-bottom: 6px;
		width: 384px;
		height: 20px;
		font-family: CircularStd;
		font-size: 14px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: -0.4px;
		color: #32325d;
	}

	.Mask {
		margin: 0 auto;
		padding-bottom: 6px;
		width: 800px;
		border-radius: 4px;
		box-shadow: 0 2px 4px 0 rgba(50, 50, 93, 0.1);
		border: solid 1px #e6ebf1;
		background-color: #ffffff;

		.h {
			border-radius: 4px 4px 0 0;
			padding: 8px 16px;
			width: 798px;
			height: 40px;
			box-shadow: inset 0 -1px 0 0 #e6ebf1;
			background-color: #ffffff;

			.text {
				height: 24px;
				font-family: CircularStd;
				font-size: 16px;
				font-weight: 500;
				font-style: normal;
				font-stretch: normal;
				line-height: 1.5;
				letter-spacing: -0.65px;
				color: #32325d;
			}
		}
	}

	.location {
		margin: 0 auto;
		width: 800px;
		padding: 8px 0;
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}

	.location1 {
		height: 20px;
		opacity: 0.8;
		font-family: CircularStd;
		font-size: 14px;
		font-weight: normal;
		font-style: normal;
		font-stretch: normal;
		line-height: 1.43;
		letter-spacing: -0.4px;
		color: #32325d;
	}
</style>
