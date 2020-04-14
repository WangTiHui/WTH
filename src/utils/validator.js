/**
 * 项目中 通用校验规则
 */
const nickNameExp = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,12}$/
const phoneExp = /^1[3|4|5|7|8][0-9]\d{8}$/
const chinesOrletterExp = /^[a-zA-Z\u4e00-\u9fa5]{1,}$/

export default {
  checkNickName(rule, value, callback) { // 校验会员昵称
    if (value === '') {
      callback('请输入会员昵称')
    } else if (nickNameExp.test(value) === false) {
      callback(rule.msg || '会员昵称格式不对')
    } else {
      callback()
    }
  },
  checkPhone(rule, value, callback) { // 校验手机号
    if (value === '') {
      callback('请输入手机号')
    } else if (phoneExp.test(value) === false) {
      callback(rule.msg || '手机号格式错误')
    } else {
      callback()
    }
  },
  integerValidator(rule, value, callback) { // 整数校验
    if (isNaN(value)) {
      return callback('请输入有效的数字')
    }
    if (value < 1 || parseInt(value) !== Number(value)) {
      return callback(rule.msg || '请输入正整数')
    }
    callback()
  },
  checkChinesOrletter(rule, value, callback) { // 校验汉字或者字母
    if (value === '') {
      callback(rule.msg || '不为空')
    } else if (chinesOrletterExp.test(value) === false) {
      callback('请输入汉字或字母')
    } else {
      callback()
    }
  }
}
