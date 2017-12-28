/**
 * Created by fernando on 17-9-8.
 */
export default function timeFormat (time, format = 'YY-MM-DD') {
  let y = time.getFullYear()
  let m = time.getMonth() + 1
  let d = time.getDate()
  switch (format) {
    case 'YY-MM-DD':
      return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d)
      break;
    case 'YY-MM':
      return y + '-' + (m < 10 ? '0' + m : m)
      break;
    case 'YY':
      return y
      break;
    default:
      break;
  }
}
