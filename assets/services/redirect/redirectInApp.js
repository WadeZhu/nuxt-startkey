import Const from '../../const'
import noop from 'lodash/noop'
import get from 'lodash/get'
import { buildUrl, Router } from './redirectInWeb'
import jsBridge from '../bridge'

export function callCordovaKoalaDo(params = [], successCbf = noop, errorCbf = noop) {
  const callPlugin = get(window.KLG, 'plugins.koala.do')
  callPlugin && callPlugin(params, successCbf, errorCbf)
}

/**
 * 普通 H5 页面，使用 openSecondPage 插件打开
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUrlInApp(params = {}) {
  const { url, query, callbackFn = noop } = params
  if (!url) { throw new Error('redirectUrlInApp url required') }
  const prefix = String(url).indexOf('//') > 0 ? '' : location.protocol + '//' + location.host
  const fullurl = buildUrl(prefix + url, query)
  return jsBridge.callPlugin('openWebPage', {url: fullurl})
}

/**
 * 登录页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectLoginInApp(params = {}) {
  const {
    type,   // 跳转类型. 1.H5 2.智能存入页 3.快转购买页 4.定期购买页 5.活转定 6.挖宝页 9.资产页
    query: {
      redirect_uri  // 跳转类型为H5时跳转路由
    } = {},
    callbackFn
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'login'}, callbackFn)
}

/**
 * 注册页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRegisterInApp(params = {}) {
  const {
    callbackFn
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'register'}, callbackFn)
}

/**
 * 首页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectIndexInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'index'}, callbackFn)
}

/**
 * 存管总资产页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUserAssetsInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'asset'}, callbackFn)
}

/**
 * 投资列表页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAssetInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'productList'}, callbackFn)
}

/**
 * 开户页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectExpandInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'expand'}, callbackFn)
}

/**
 * 充值页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRechargeInApp(params = {}) {
  const {
    query: {
      amount = 0,
      channel
    } = {},
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {
    amount,
    channel,
    page: 'recharge'
  }, callbackFn)
}

/**
 * 提现页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWithdrawInApp(params = {}) {
  const {
    query: {
      amount = 0
    } = {},
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {
    amount,
    page: 'withdraw'
  }, callbackFn)
}

/**
 * 我的奖励页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRewardInApp(params = {}) {
  return redirectUrlInApp({
    url: '/koala_app/reward',
    ...params
  })
}

/**
 * 自动投资页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAutoInvestInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'lazyInvest'}, callbackFn)
}

/**
 * 挖宝页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWabaoInApp(params = {}) {
  const {
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {page: 'wabao'}, callbackFn)
}

/**
 * 订单详情页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAssetsDetailInApp(params = {}) {
  const {
    query: {
      assetId,
      isRebuy
    } = {},
    callbackFn = noop
  } = params

  return jsBridge.callPlugin('redirectAppPage', {
    page: 'assetsDetail',
    assetId,
    isRebuy
  }, callbackFn)
}

/**
 * 通用购买页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectInvestInApp(params = {}) {
  const {
    query: {
      amount = 0,
      channel = '',
      payMethod = '',
      ticketId = '',
      productId,
      fixedAmount
    } = {},
    callbackFn = noop
  } = params
  return jsBridge.callPlugin('redirectAppPage', {
    amount,
    channel,
    ticketId,
    productId,
    payMethod,
    fixedAmount,
    page: 'invest'
  }, callbackFn)
}
