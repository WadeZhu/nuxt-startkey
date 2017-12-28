import Const from '../../const'
import queryString from '../../tools/query-string'

export const Router = {
  LOGIN: '/msite/login',
  REGISTER: '/msite/login',
  HOME: '/msite/home',
  ASSET: '/msite/assets',
  TREASURE: '/koala_app/new_user',
  PURCHASE: '/wx/buy_v2',
  BUY_DEMAND: '/wx/buy_demand',
  INVEST: '/msite/invest',
  BUY_TIME_COUPON: '/wx/buy_time_coupon',
  REWARD: '/koala_app/reward',
  EXPAND: '/msite/user_active',
  RECHARGE: '/msite/recharge',
  WITHDRAW: '/msite/withdraw',
  USER_ASSETS: '/msite/user_center',
  WABAO: '/msite/wabao',
  AUTOINVEST: '/msite/autoinvest',
  ASSETSDETAIL: '/msite/assets_detail'
}

export function buildUrl(url, query = {}) {
  const [fixedUrl, urlSearchAndHash] = String(url).split('?')
  const [urlSearch, urlHash] = urlSearchAndHash && urlSearchAndHash.split('#') || []
  const urlQuery = queryString.parse(urlSearch)
  query = {
    ...urlQuery,
    ...query
  }
  const search = queryString.stringify(query, {encode: false})
  const fullurl = search ? fixedUrl + '?' + search : url
  return urlHash ? fullurl + '#' + urlHash : fullurl
}

export function redirectCommonInWeb(url, query) {
  window.location.href = buildUrl(url, query)
}

/**
 * 普通 H5 页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUrlInWeb(params = {}) {
  const { url, query } = params
  if (!url) { throw new Error('redirectUrlInWeb url required') }
  const prefix = String(url).indexOf('//') > 0 ? '' : location.protocol + '//' + location.host
  const fullurl = prefix + url
  redirectCommonInWeb(fullurl, query)
}

/**
 * 登录页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectLoginInWeb({query} = {}) {
  redirectCommonInWeb(Router.LOGIN, query)
}

/**
 * 注册页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRegisterInWeb({query} = {}) {
  redirectCommonInWeb(Router.REGISTER, query)
}

/**
 * 首页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectIndexInWeb({query} = {}) {
  redirectCommonInWeb(Router.HOME, query)
}

/**
 * 我的资产页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectUserAssetsInWeb({query} = {}) {
  redirectCommonInWeb(Router.USER_ASSETS, query)
}

/**
 * 投资列表页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAssetInWeb({query} = {}) {
  redirectCommonInWeb(Router.ASSET, query)
}

/**
 * 开户页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectExpandInWeb({query} = {}) {
  redirectCommonInWeb(Router.EXPAND, query)
}

/**
 * 充值页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRechargeInWeb({query} = {}) {
  redirectCommonInWeb(Router.RECHARGE, query)
}

/**
 * 提现页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWithdrawInWeb({query} = {}) {
  redirectCommonInWeb(Router.WITHDRAW, query)
}

/**
 * 挖宝页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectTreasureInWeb({query} = {}) {
  redirectCommonInWeb(Router.TREASURE, query)
}

/**
 * 我的奖励页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectRewardInWeb({query} = {}) {
  redirectCommonInWeb(Router.REWARD, query)
}

/**
 * 通用购买页面
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectInvestInWeb({query} = {}) {
  redirectCommonInWeb(Router.INVEST, query)
}

/**
 * 新挖宝页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectWabaoInWeb({query} = {}) {
  redirectCommonInWeb(Router.WABAO, query)
}

/**
 * 自动投资页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAutoInvestInWeb({query} = {}) {
  redirectCommonInWeb(Router.AUTOINVEST, query)
}

/**
 * 订单详情页
 * @param  {Object} params [description]
 * @return {[type]}        [description]
 */
export function redirectAssetsDetailInWeb({query} = {}) {
  redirectCommonInWeb(Router.ASSETSDETAIL, query)
}