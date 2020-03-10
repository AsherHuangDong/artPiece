import echarts from 'echarts'

const install = function (Vue) {
  Object.defineProperties(Vue.prototype, {
    $chart: {
      get: function () {
        return {
          line2: function (id, graphical, noTitle) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            const myData = graphical[0].copyrightChartDataList
            const data = []
            for (let i in myData) {
              let temp = []
              temp.push(myData[i].xData.toString())
              temp.push(myData[i].yData)
              data.push(temp)
            }
            let dateList = data.map(function (item) {
              return item[0];
            });
            let valueList = data.map(function (item) {
              return item[1];
            });
            const option = {
              // 鼠标放上去显示数据
              // tooltip: {
              //   trigger: 'axis'
              // },
              title: [{
                left: 'left',
                text: graphical[0].totalTitle,
                textStyle: {
                  fontSize: 16,
                  color: '#32325d'
                },
                padding: [16, 16]
              }],
              xAxis: {
                nameTextStyle: {
                  color: 'red'
                },
                type: 'category',
                data: dateList,
                axisTick: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: '#bdc6d4'
                  }
                },
              },
              yAxis: {
                // 刻度线，小竖杠
                axisTick: {
                  show: false,
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#f7f9fc',
                    width: 1,
                    type: 'solid'
                  }
                },
                type: 'value',
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#bdc6d4'
                  }
                },
              },
              grid: [{
                left: '15%'
              }],
              series: [{
                showSymbol: false,
                hoverAnimation: false,
                color: '#f4496d',
                data: valueList,
                type: 'line',
                lineStyle: {
                  width: 2
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#f4496d'
                  }, {
                    offset: 1,
                    color: '#fff'
                  }])
                },
              }]
            }
            if (noTitle) {
              delete option.title
            }
            this.chart.setOption(option);
          },
          line3: function (id, t) {
            // console.log(t)
            const d = []
            for (let i in t) {
              let temp = []
              const a = t[i].ds
              const b = t[i].open
              temp.push(a)
              temp.push(b)
              d.push(temp)
            }
            this.chart = echarts.init(document.getElementById(id));
            // this.chart.clear();
            const data = d
            let dateList = data.map(function (item) {
              return item[0];
            });
            let valueList = data.map(function (item) {
              return item[1];
            });
            const option = {
              // Make gradient line here
              visualMap: [{
                show: false,
                type: 'continuous',
                seriesIndex: 0,
                min: valueList[0] * 0.99,
                max: valueList[0] * 1.01
              }],
              tooltip: {
                trigger: 'axis'
              },
              xAxis: [{
                data: dateList,
                show: false
              }],
              yAxis: [{
                splitLine: {show: false},
                show: false,
                type: 'value',
                scale: true,
                precision: 2,
                splitNumber: 9,
                boundaryGap: ['20%', '20%'], // 设置Y轴数值显示范围
                splitArea: {show: true}
              }],
              grid: [{
                width: '85%',
                height: '90%',
                bottom: '10%'
              }],
              series: [{
                type: 'line',
                showSymbol: false,
                data: valueList
              }]
            };
            this.chart.setOption(option);
          },
          line4: function (id, data) {
            console.log(data)
            this.chart = echarts.init(document.getElementById(id));
            let d = []
            for (let i in data) {
              d.push(data[i])
            }
            let t = new Date()
            let myXData = []
            for (let i = 6; i >= 1; i--) {
              let t1 = new Date(t.valueOf() - 2592000000 * i)
              let month = t1.getMonth() + 1
              let year = t1.getFullYear()
              let t1Show = year + '-' + month
              myXData.push(t1Show)
            }
            // 假数据
            // myXData.push('234')
            // d.push(123)
            const option = {
              // 鼠标放上去显示数据
              // tooltip: {
              //   trigger: 'axis'
              // },
              grid: [{
                width: '85%',
                height: '90%',
                bottom: 46
              }],
              xAxis: {
                nameTextStyle: {
                  fontWeight: 'bold'
                },
                type: 'category',
                data: myXData,
                axisTick: {
                  show: false,
                },
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#bdc6d4'
                  },
                },
              },
              yAxis: {
                // 刻度线，小竖杠
                axisTick: {
                  show: false,
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#f7f9fc',
                    width: 1,
                    type: 'solid'
                  }
                },
                type: 'value',
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#bdc6d4'
                  }
                },
              },
              series: [{
                showSymbol: false,
                hoverAnimation: false,
                color: '#f4496d',
                data: d,
                type: 'line',
                lineStyle: {
                  width: 2
                },
                areaStyle: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: '#f4496d'
                  }, {
                    offset: 1,
                    color: '#ffe'
                  }])
                },
              }]
            }
            this.chart.setOption(option);
          },
          bar1: function (id, graphical) {
            this.chart = echarts.init(document.getElementById(id));
            this.chart.clear();
            const myData = graphical[0].copyrightChartDataList
            const data = []
            for (let i in myData) {
              let temp = []
              temp.push(myData[i].xData.toString())
              temp.push(myData[i].yData)
              data.push(temp)
            }
            let dateList = data.map(function (item) {
              return item[0];
            });
            let valueList = data.map(function (item) {
              return item[1];
            });
            const option = {
              color: ['#87bbfc'],
              // Make gradient line here
              title: [{
                left: 'left',
                text: graphical[0].totalTitle,
                textStyle: {
                  fontSize: 16,
                  color: '#32325d'
                },
                padding: [16, 16]
              }],
              // xAxis: [{
              //   nameLocation: 'middle',
              //   name: graphical[0].xTitle,
              //   data: dateList,
              //   axisLine: {
              //     lineStyle: {
              //       color: '#bdc6d4'
              //     }
              //   },
              //   nameTextStyle: {
              //     padding: [8, 0, 8, 0]
              //   }
              // }],
              xAxis: {
                nameTextStyle: {
                  color: 'red'
                },
                type: 'category',
                data: dateList,
                axisTick: {
                  show: false,
                },
                axisLine: {
                  lineStyle: {
                    color: '#bdc6d4'
                  }
                },
              },
              yAxis: {
                // 刻度线，小竖杠
                axisTick: {
                  show: false,
                },
                splitLine: {
                  show: true,
                  lineStyle:{
                    color: '#f7f9fc',
                    width: 1,
                    type: 'solid'
                  }
                },
                type: 'value',
                axisLine: {
                  show: false,
                  lineStyle: {
                    color: '#bdc6d4'
                  }
                },
              },
              // yAxis: [{
              //   name: graphical[0].yTitle,
              //   splitLine: {show: false},
              //   axisLine: {
              //     lineStyle: {
              //       color: '#bdc6d4'
              //     }
              //   },
              //   nameTextStyle: {
              //     padding: [0, 0, 0, 0],
              //     lineHeight: 0,
              //     verticalAlign: 'top'
              //   }
              // }],
              grid: [{
                left: '15%',
                // bottom: '15%'
              }],
              series: [{
                type: 'bar',
                showSymbol: false,
                data: valueList,
                barWidth: 20
              }]
            };
            this.chart.setOption(option);
          }
        }
      }
    }
  })
}

export default {
  install
}
