export const formatData = function(b){
  let remainingTime = ''
  remainingTime += b[0] + '-'
  remainingTime += b[1] + '-'
  remainingTime += b[2] + ' '
  remainingTime += b[3] < 10 ? '0' + b[3] + ':' : b[3] + ':'
  remainingTime += b[4] < 10 ? '0' + b[4] + ':' : b[4] + ':'
  remainingTime += b[5] ? b[5] < 10 ? '0' + b[5] : b[5] : '00'
  return remainingTime
}
// 时间戳转日期字符串
export const fromTimestampToString = function (timestamp) {
  let d = new Date(timestamp);    //根据时间戳生成的时间对象
  let h = d.getHours() >= 10 ? d.getHours() : '0' + d.getHours()
  let m = d.getMinutes() >= 10 ? d.getMinutes() : '0' + d.getMinutes()
  let s = d.getSeconds() >= 10 ? d.getSeconds() : '0' + d.getSeconds()
  let day = d.getDate() >= 10 ? d.getDate() : '0' + d.getDate()
  let month = d.getMonth() + 1 >= 10 ?  d.getMonth() + 1 : '0' + (d.getMonth() + 1)
  return (d.getFullYear()) + "-" +
    month + "-" +
    day + " " + h + ":" + m + ":" + s
}

// 时间戳转剩余时间 00:00:00
export const formatDataToTime = function (timestamp) {
  // console.log(timestamp)
  let result = ''
  let h = parseInt((timestamp / 3600000).toString()); // 1000 60 60
  h = h < 10 ? '0' + h : h
  let m = parseInt(((timestamp - 3600000 * h) / 60000).toString());
  m = m < 10 ? '0' + m : m
  let s = parseInt(
    ((timestamp - 3600000 * h - 60000 * m) / 1000).toString()
  );
  s = s < 10 ? '0' + s : s
  result = h + ":" + m + ":" + s;
  return result
}

// 格式化数字格式成为10,000.2333
export const toThousands = function(p) {
  let num = p // 防止引用类型
  // console.log('toThousands', num)
  let result = '', counter = 0;
  num = (num || 0).toString();
  let point = num.indexOf('.')
  let temp1 = ''
  if ( point !== -1) {
    let len = num.length
    temp1 = num.slice(point, len)
    num = num.slice(0, point)
  }
  // console.log('toThousands NoPointer', num)

  if (num >= 0) {
    for (let i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i !== 0) { result = ',' + result; }
    }
    return result + temp1;
  } else {
    num = num.slice(1, num.length)
    for (let i = num.length - 1; i >= 0; i--) {
      counter++;
      result = num.charAt(i) + result;
      if (!(counter % 3) && i !== 0) { result = ',' + result; }
    }
    return '-' + result + temp1;
  }
  // console.log('toThousands Result', result + temp1)

}
