let reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
const a = window.location.search.substr(1).match(reg);
export default {
  baseUrl: a,
  // chainUrl: 'http://test111webapi.chaindown.com/finance/get_charge_address'
  chainUrl: a
}
