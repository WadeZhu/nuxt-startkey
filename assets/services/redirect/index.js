import Const from '../../const'
import device from '../device'
import bridge from '../bridge'
import * as app from './redirectInApp'
import * as web from './redirectInWeb'
import Toast from '../../components/klg-toast/index.js'

export function buildUrl(url, query) {
  return web.buildUrl(url, query)
}

/**
 * 普通 H5 页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUrl (params = {}) {
  device.detectIsApp() ? app.redirectUrlInApp(params) : web.redirectUrlInWeb(params)
}

/**
 * 登录页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectLogin (params = {}) {
  device.detectIsApp() ? app.redirectLoginInApp(params) : web.redirectLoginInWeb(params)
}

/**
 * 注册页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRegister (params = {}) {
  device.detectIsApp() ? app.redirectRegisterInApp(params) : web.redirectRegisterInWeb(params)
}

/**
 * 首页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectIndex (params = {}) {
  device.detectIsApp() ? app.redirectIndexInApp(params) : web.redirectIndexInWeb(params)
}

/**
 * 投资列表页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAsset (params = {}) {
  device.detectIsApp() ? app.redirectAssetInApp(params) : web.redirectAssetInWeb(params)
}

/**
 * 我的资产页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUserAssets (params = {}) {
  device.detectIsApp() ? app.redirectUserAssetsInApp(params) : web.redirectUserAssetsInWeb(params)
}

/**
 * 开户页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectExpand (params = {}) {
  device.detectIsApp() ? app.redirectExpandInApp(params) : web.redirectExpandInWeb(params)
}

/**
 * 充值页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRecharge (params = {}) {
  device.detectIsApp() ? app.redirectRechargeInApp(params) : web.redirectRechargeInWeb(params)
}

/**
 * 提现页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWithdraw (params = {}) {
  device.detectIsApp() ? app.redirectWithdrawInApp(params) : web.redirectWithdrawInWeb(params)
}

/**
 * 我的奖励页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectReward (params = {}) {
  device.detectIsApp() ? app.redirectRewardInApp(params) : web.redirectRewardInWeb(params)
}

/**
 * 通用购买页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectInvest (params) {
  device.detectIsApp() ? app.redirectInvestInApp(params) : web.redirectInvestInWeb(params)
}

/**
 * 自动投资页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAutoInvest (params) {
  device.detectIsApp() ? app.redirectAutoInvestInApp(params) : web.redirectAutoInvestInWeb(params)
}

/**
 * 挖宝页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWabao (params) {
  device.detectIsApp() ? app.redirectWabaoInApp(params) : web.redirectWabaoInWeb(params)
}

/**
 * 订单详情页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAssetsDetail (params) {
  device.detectIsApp() ? app.redirectAssetsDetailInApp(params) : web.redirectAssetsDetailInWeb(params)
}

/**
 * 根据JUMPTYPE跳转不同页面
 * @param  {Object} params [传接口返回的action对象就行了]
 * @param  {Object} {query} [传自己想再url带的参数]
 */
export function redirectByJumptype (params = {}) {
  let {type, query, message, orderChnl, productId, defaultAmount, linkUrl} = params
  if (orderChnl) {
    Object.assign(query, {channel: orderChnl})
  }
  if (productId) {
    Object.assign(query, {productId})
  }
  if (defaultAmount) {
    Object.assign(query, {amount: defaultAmount})
  }
  if (!type) {
    throw new Error('type require')
  }
  switch (type) {
    // H5 页面
    case Const.JUMPTYPE.H5:
      redirectUrl({
        url: linkUrl,
        query
      })
      break
    // 首页
    case Const.JUMPTYPE.HOME:
      redirectIndex({
        query
      })
      break
    // 投资列表页
    case Const.JUMPTYPE.ASSETS:
      redirectAsset({
        query
      })
      break
    // 挖宝页
    case Const.JUMPTYPE.WABAO:
      redirectWabao({
        query
      })
      break
    // 我的资产
    case Const.JUMPTYPE.USER_ASSET:
      redirectUserAssets({
        query
      })
      break
    // 开户
    case Const.JUMPTYPE.USER_ACTIVE:
      redirectExpand({
        query
      })
      break
    // 购买页
    case Const.JUMPTYPE.INVEST:
      redirectInvest({
        query
      })
      break
    // 充值页
    case Const.JUMPTYPE.RECHARGE:
      redirectRecharge({
        query
      })
      break
    // 自动投标页面
    case Const.JUMPTYPE.AUTOINVEST:
      redirectAutoInvest({
        query
      })
      break
    // 吐司提示
    case Const.JUMPTYPE.TOAST:
      Toast({
        message: message
      })
      break
    // VIP会员页面
    case Const.JUMPTYPE.VIP:
      bridge.redirectAppPageVip()
      break
    default:
      break
  }
}
