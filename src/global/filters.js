export function formatTime(timestamp) {
  if (!Number(timestamp)) {
    return '-'
  }
  const date = new Date(timestamp * 1000);
  const y = date.getFullYear();
  let MM = date.getMonth() + 1;
  MM = MM < 10 ? "0" + MM : MM;
  let d = date.getDate();
  d = d < 10 ? "0" + d : d;
  let h = date.getHours();
  h = h < 10 ? "0" + h : h;
  let m = date.getMinutes();
  m = m < 10 ? "0" + m : m;
  let s = date.getSeconds();
  s = s < 10 ? "0" + s : s;
  return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
}

// 聊天的时间控制
export function chatTime(timestamp) {
    if (!Number(timestamp)) {
        return '-'
    }
    const date = new Date(timestamp*1000);
    const y = date.getFullYear();
    const yy = y.toString().substr(2, 2)
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myddy = date.getDay();//获取存储当前日期,星期
    let days = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() - timestamp*1000) / (24 * 60 * 60 * 1000)
    if (days < 0) {
        return h + ":" + m
    } else if (days > 0 && days < 1) {
        return '昨天' + ' ' + h + ":" + m
    } else if (days > 1 && days < 7) {
        return weekday[myddy] + ' ' + h + ":" + m
    } else if (days > 7) {
        return yy + "/" + MM + "/" + d;
    }
}
export function chatContentTime(timestamp) {
    if (!Number(timestamp)) {
        return '-'
    }
    const date = new Date(timestamp*1000);
    const y = date.getFullYear();
    const yy = y.toString().substr(2, 2)
    let MM = date.getMonth() + 1;
    MM = MM < 10 ? "0" + MM : MM;
    let d = date.getDate();
    d = d < 10 ? "0" + d : d;
    let h = date.getHours();
    h = h < 10 ? "0" + h : h;
    let m = date.getMinutes();
    m = m < 10 ? "0" + m : m;
    let s = date.getSeconds();
    s = s < 10 ? "0" + s : s;
    var weekday = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var myddy = date.getDay();//获取存储当前日期,星期
    let days = (new Date(new Date().setHours(0, 0, 0, 0)).getTime() - timestamp*1000) / (24 * 60 * 60 * 1000)
    if (days < 0) {
        return h + ":" + m
    } else if (days > 0 && days < 1) {
        return '昨天' + ' ' + h + ":" + m
    } else if (days > 1 && days < 7) {
        return weekday[myddy] + ' ' + h + ":" + m
    } else if (days > 7) {
        return y + "年" + MM + "月" + d + "日" + " " + h + ":" + m
    }
}
export function objList(dataVal) {
    var data = {};
    var arrayVal = dataVal;
    for(let i in arrayVal){
    	if (arrayVal[i]) {
    		data[i] = arrayVal[i]
    	}
    }
    return data;
}

export function gender(sex) { // 性别 1:男  2:女  0:无
  if (!Number(sex)) {
    return '-'
  } else {
    return sex === '1' ? '男' : '女'
  }
}

export function accountStaus(status) { // 状态 1:正常 2:禁用
  if (!status) {
    return '-'
  } else {
    return status === '1' ? '正常' : '禁用'
  }
}

export function commission(val) { // 佣金类型：self:自购，share推荐提成
  return val === 'self' ? '自购' : '推荐提成'
}

export function settlement(settle) { // 结算状态：1为已结算,2为未结算	
  return settle === '1' ? '已结' : '未结'
}

export function orderTtype(type) { // 订单类型 1 淘宝 2京东 3 拼多多	
  return type === '1' ? '淘宝' : type === '2' ? '京东' : '拼多多'
}

export function ellipsis (value) {
      if (!value) return ''
      if (value.length > 20) {
        return value.slice(0,20) + '...'
      }
      return value
}

export function moneyFilter(value){
  if(!value) {
    return '0.00'
  }else if(typeof(value)=='number'&&value.toString().indexOf('.')!=-1||typeof(value)=='number'&&value.toString().indexOf('.')==-1){
    value += ''
  }
  let floatPart;
  let isDolt = false;
  let value2Array;
  if(value.indexOf('.')!=-1){
    floatPart = value.split(".")[1];
    value2Array = value.split(".");
    isDolt = true
  }else{
    isDolt = false
    value2Array = [value]
  }
  let intPartFormat;
  intPartFormat = value2Array[0].replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //将整数部分逢三一断
  //=2表示数据有小数位
  return isDolt?intPartFormat + '.'+ floatPart:intPartFormat;
}