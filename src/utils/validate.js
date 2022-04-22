/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * 检查用户名格式
 * @param rule
 * @param value
 * @param callback
 */
export function validateUsername(rule, value, callback) {
  const reg = /^\w+$/
  if (!reg.test(value)) {
    callback(new Error('用户名只能包含字母、数字、下划线'))
  } else if (value.length < 4 || value.length > 16) {
    callback(new Error('用户名长度必须为4-16位'))
  } else {
    callback()
  }
}

/**
 * 检查密码格式
 * @param rule
 * @param value
 * @param callback
 */
export function validatePassword(rule, value, callback) {
  const reg = /^(\d|[a-z]|[A-Z])+$/
  if (value.length < 4 || value.length > 16) {
    callback(new Error('密码长度必须为4-16位'))
  } else if (!reg.test(value)) {
    callback(new Error('密码只能包含字母、数字'))
  } else {
    callback()
  }
}

/**
 * 检查邮箱格式
 * @param rule
 * @param value
 * @param callback
 */
export function validateEmail(rule, value, callback) {
  const reg = /^\w+@[a-zA-Z0-9]{2,10}(?:\.[a-z]{2,4}){1,3}$/
  if (!reg.test(value)) {
    callback(new Error('邮箱格式不正确'))
  } else {
    callback()
  }
}

export function validatePhone(rule, value, callback) {
  // TODO 这里是手机电话的检验格式，如果是传真、座机则不会通过，可能需要修改该检验函数
  const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
  if (!reg.test(value)) {
    callback(new Error('手机格式不正确'))
  } else {
    callback()
  }
}

/**
 * @param {string} url
 * @returns {Boolean}
 */
export function validURL(url) {
  const reg = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/
  return reg.test(url)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validLowerCase(str) {
  const reg = /^[a-z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validUpperCase(str) {
  const reg = /^[A-Z]+$/
  return reg.test(str)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function validAlphabets(str) {
  const reg = /^[A-Za-z]+$/
  return reg.test(str)
}

/**
 * @param {string} email
 * @returns {Boolean}
 */
export function validEmail(email) {
  const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return reg.test(email)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
export function isString(str) {
  if (typeof str === 'string' || str instanceof String) {
    return true
  }
  return false
}

/**
 * @param {Array} arg
 * @returns {Boolean}
 */
export function isArray(arg) {
  if (typeof Array.isArray === 'undefined') {
    return Object.prototype.toString.call(arg) === '[object Array]'
  }
  return Array.isArray(arg)
}
