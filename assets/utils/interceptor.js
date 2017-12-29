import Toast from '~/components/basic/klg-toast'
import { getUserInfo } from '../services/auth'
import device from '../services/device'
import { redirectLogin, redirectRecharge } from '../services/redirect'
import ExpandDialog from '~/components/common/expand-dialog/index.js'
import BindCardDialog from '~/components/common/bindCard-dialog/index.js'

const RESPONSE = {
  SUCCESS: 0,   // 成功
  FAILURE: 1,   // 错误
  ERROR: 2,     // 历史原因，一些错误会使用这个code
  INTERRUPT: 3,   // 登录信息过期
  NO_EXPAND: 4,   // 未开户
  BALANCE_NOT_ENOUGH: 5,   // 余额不足
  NO_BANKCARD: 6,   // 未绑卡
  RETRY_PAY: 4000
}

let os = 'wap'
if (device.isApp) {
  if (device.isAndroid) {
    os = 'android_wap'
  } else if (device.isIos) {
    os = 'ios_wap'
  }
}

export default function interceptor (request, next) {
  // 加入用户认证信息
  request.params = {
    os: os,
    longTtl: true,
    ...getUserInfo(),
    ...request.params
  }

  // 处理返回
  next(response => {
    const { body, status } = response
    let redirectUrl = encodeURIComponent(location.href)
    if (body.code === RESPONSE.SUCCESS) {
      response.body = body.data
      // 用于显示挖宝页红点
      if (body.hasTicketNews) {
        Object.assign(response.body, {hasTicketNews: body.hasTicketNews})
      }
    } else {
      if (body.code === RESPONSE.NO_EXPAND) {
        ExpandDialog({isShowDialog: true, redirectUrl})
      } else if (body.code === RESPONSE.NO_BANKCARD) {
        BindCardDialog({redirectUrl})
      } else {
        Toast({
          message: status === 503 ? '抱歉，考拉打瞌睡了' : body.msg
        })
      }
      setTimeout(() => {
        if (body.code === RESPONSE.INTERRUPT) {
          redirectLogin({
            query: {
              redirect_uri: redirectUrl
            }
          })
        } else if (body.code === RESPONSE.BALANCE_NOT_ENOUGH) {
          redirectRecharge()
        }
      }, 1000)

      // reject the body
      return body
    }
  })
}