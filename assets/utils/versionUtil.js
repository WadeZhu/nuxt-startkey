/**
 * 版本工具
 */
import isString from 'lodash/isString'
import map from 'lodash/map'
import reduce from 'lodash/reduce'

function leftPad(str, len, ch) {
  if (!ch && ch !== 0) ch = ' ';
  var len = len - str.length,
    total = ''
  while (true) {
    // 如果len是基数，total上就加一个ch
    if (len & 1 == 1) total += ch;
    if (len == 1) return total + str;;
    // 每次ch都变成chch
    ch += ch;
    //长度减半
    len = len>>1;
  }
}

/**
 * 版本号转成数字
 *
 * @param String version 版本号字符串
 * @param String seperator 版本分隔符
 * @return Number 数字版本号 or null 格式不正确
 *
 */

function versionToNumber (version, separator) {
  if (!isString(version)) {
    return null;
  }

  separator = separator || '.'
  let result = version.trim().split(separator)

  // 格式不正确返回null
  if (result.length !== 3) return null
  for (const index in result) {
    const elem = result[index]
    if (elem.length > 4 || elem.length === 0) return null
    for (let i = 0; i < elem.length; i++) {
      if (elem[i].charCodeAt() < '0'.charCodeAt() || elem[i].charCodeAt() > '9'.charCodeAt()) return null
    }
  }

  // 默认子版本号最大4位
  result = map(result, function (elem) {
    return leftPad(elem, 4, 0)
  });

  result = reduce(result, function (memo, num, index) {
    return memo + num
  }, '')

  result = parseInt(result)

  return result
}

/**
 * 比较版本
 *
 * @param String left 左边版本号
 * @param String right 右边版本号
 * @param String seperator 版本分隔符
 * @return Number
 *   < 0: 小于
 *   = 0: 等于
 *   > 0: 大于
 *   null:格式错误
 */
export function compare (left, right, separator){
  left = versionToNumber(left, separator)
  right = versionToNumber(right, separator)

  if (left && right) {
    return left - right
  }

  return null

}
