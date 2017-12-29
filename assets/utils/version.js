/**
 * 版本工具
 */

import _padStart from 'lodash/padStart'
import _isString from 'lodash/isString'
import _map from 'lodash/map'
import _reduce from 'lodash/reduce'

export default {
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
  compare: function (left, right, separator) {
    left = this.versionToNumber(left, separator)
    right = this.versionToNumber(right, separator)

    if (left && right) {
      return left - right
    }

    return null
  },

  /**
   * 版本号转成数字
   *
   * @param String version 版本号字符串
   * @param String seperator 版本分隔符
   * @return Number 数字版本号 or null 格式不正确
   *
   */
  versionToNumber: function (version, separator) {
    if (!_isString(version)) {
      return null
    }

    separator = separator || '.'
    var result = version.trim().split(separator)

    // 格式不正确返回null
    if (result.length !== 3) return null
    for (var index in result) {
      var elem = result[index]
      if (elem.length > 4 || elem.length === 0) return null
      for (var i = 0; i < elem.length; i++) {
        if (elem[i].charCodeAt() < '0'.charCodeAt() || elem[i].charCodeAt() > '9'.charCodeAt()) return null
      }
    }

    // 默认子版本号最大4位
    result = _map(result, function (elem) {
      return _padStart(elem, 4, 0)
    })

    result = _reduce(result, function (memo, num, index) {
      return memo + num
    }, '')

    result = parseInt(result)

    return result
  }
}
