function prefixNumber(number) {
  return number > 9 ? number : '0' + number;
}

/**
 * 秒数 =====>  Time Obj
 * @param  {Number} seconds 秒
 * @return {Object}
 *
 * @example
 *
 * secondToTime(27774)
 * // { days: '00', hours: '07', minutes: 42 }
 */
export default function secondToTime (seconds) {
  let date = new Date(1970, 0, 1)
  date.setSeconds(seconds)
  return {
    days: prefixNumber(date.getDate() - 1),
    hours: prefixNumber(date.getHours()),
    minutes: prefixNumber(date.getMinutes())
  }
}
