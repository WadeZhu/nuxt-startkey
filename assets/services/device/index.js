const ua = process.BROWSER_BUILD && navigator.userAgent
function detectIsApp() {
  return /kaolalicai/i.test(ua)
}

const isAndroid = /(Android);?[\s/]+([\d.]+)?/.test(ua)
const isIpad = /(iPad).*OS\s([\d_]+)/.test(ua)
const isIphone = !isIpad && /(iPhone\sOS)\s([\d_]+)/.test(ua)
const isIos = isIpad || isIphone
const isWechat = /micromessenger/i.test(ua)
const isApp = detectIsApp()

function getAppVersion() {
  if (isApp) {
    return ua.split('kaolalicai/')[1].split(' ')[0].split(';')[0]
  }
  return ''
}

export default {
  detectIsApp,
  getAppVersion,
  isAndroid,
  isIpad,
  isIos,
  isIphone,
  isWechat,
  isApp
}