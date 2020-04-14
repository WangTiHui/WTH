export function regExpFilter(value) {
    var regExpf =  new RegExp("[`~!@#$%^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    var r = regExpf.test(value)
    return r;
}
export function keepTwoDecimalPlaces(value,max){
    var regExpf = new RegExp("[`~!@#$^&*()=|{}':;'_+,\\[\\]<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    var i = value.toString().indexOf('.')>0
    var f = (value.toString().length-value.toString().indexOf('.'))>3
    var l = value.toString().split('.')
    var m = value>max
    if(value.toString().indexOf('..')>0||value.toString().indexOf('-')!=-1||/[\u4E00-\u9FA5]/g.test(value)||/^[a-zA-Z]+$/.test(value)||regExpf.test(value)||(i&&f)||m||l.length>2||(l.length==2&&l[0]=='')){
        return true;
    }
}
export function keepTwoDecimalPlacesNoMax(value){
    var regExpf = new RegExp("[`~!@#$^&*()=|{}':;'_+,\\[\\]<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？ ]")
    var i = value.toString().indexOf('.')>0
    var f = (value.toString().length-value.toString().indexOf('.'))>3
    var l = value.toString().split('.')
    if(value.toString().indexOf('..')>0||value.toString().indexOf('-')!=-1||/[\u4E00-\u9FA5]/g.test(value)||/^[a-zA-Z]+$/.test(value)||regExpf.test(value)||(i&&f)||l.length>2||(l.length==2&&l[0]=='')){
        return true;
    }
}
export function decimalPoint(value){
    var reg = /^(?!0+(?:\.0+)?$)(?:[1-9]\d*|0)(?:\.\d{1,2})?$/;
    return reg.test(value);
}
export function integer(value) {
	var reg = /^\+?[1-9][0-9]*$/;
	return reg.test(value);
}
export function checkPhone(value){ 
    if(!(/^1[3456789]\d{9}$/.test(value))){ 
        return false; 
    }else {
    	return true;
    }
}
// 校验手机号
export function regExpPhone(value){
  var regPhone = new RegExp("^(13[0-9]|14[5-9]|15[0-3,5-9]|16[2,5,6,7]|17[0-8]|18[0-9]|19[0-3,5-9])\\d{8}$");
  var p = regPhone.test(value)
  return p
}