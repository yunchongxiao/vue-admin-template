/**
 * Created by PanJiaChen on 16/11/18.
 */

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
  if (value.length < 4 || value.length > 16) {
    callback(new Error('用户名长度必须为4-16位'))
  } else if (!reg.test(value)) {
    callback(new Error('用户名只能包含字母、数字、下划线'))
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
