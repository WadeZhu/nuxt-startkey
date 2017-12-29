import Vue from 'vue'

export function loadJs(url, cbf) {
  let doc = document
  let head = doc.getElementsByTagName('head')[0] || doc.documentElement
  let jsNode = doc.createElement('script')
  jsNode.setAttribute('type', 'text/javascript')
  jsNode.async = true
  jsNode.src = url
  head.appendChild(jsNode)
  const supportOnload = 'onload' in jsNode
  if (supportOnload) {
    jsNode.onload = onload
    jsNode.onerror = function () {
      console.log('load url:' + url + 'failed')
      onload()
    }
  } else {
    jsNode.onreadystatechange = function () {
      if (/loaded|complete/.test(jsNode.readyState)) {
        onload()
      }
    }
  }

  function onload() {
    // Ensure only run once and handle memory leak in IE
    jsNode.onload = jsNode.onerror = jsNode.onreadystatechange = null
    head.removeChild(jsNode)
    // Dereference the node
    jsNode = null
    cbf && cbf()
  }
}

export function configHttpParams(params) {
  params = params || {}
  params.os = 'wap'
  return params
}

/**
 * 初始化微信分享
 * @param  {Object} options 微信分享所需配置信息
 *   @property {[String]} code 授权获取到的code
 *   @property {[Object]} data 微信分享数据
 * @return {Promise}        返回微信分享成功或失败的 promise
 */
export function initialize(options) {
  if (!options.code) {
    throw new Error('请提供授权获取到的code')
  }
  return getWechatAuthData({
    code: options.code,
    url: options.url || window.location.href
  }).then(function (wechatSDKConfig) {
    return menuShare(wechatSDKConfig, options.data)
  })
}

/**
 * 获取分享配置信息
 * @param  {Object} e.g. {code: 'inviteUser'}
 * @property {String} code 分享代码，由管理后台配置
 * @return {Promise}
 */
export function getShareSettingByCode(params) {
  if (typeof params === 'string') {
    params = {
      code: params
    }
  }
  return new Promise(function (resolve, reject) {
    Vue.http({
      url: '/activity/getShareSettingByCode',
      method: 'GET',
      params: configHttpParams(params)
    }).then(function (response) {
      const data = response.data
      if (data.code === 0) {
        return resolve(data.data)
      }
      return reject(data)
    })
  })
}

/**
 * 获取微信授权信息
 * @param  {Object} e.g. {code: 'xxx', url: location.href}
 *  @property {String}
 *    code 授权获取到的code，作为换取access_token的票据，每次用户授权带上的code将不一样，code只能使用一次，5分钟未被使用自动过期。
 *    https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421140842&token=&lang=zh_CN
 * @property {String} url 当前页面 url
 * @return {promise}
 */
export function getWechatAuthData(params) {
  return new Promise(function (resolve, reject) {
    Vue.http({
      url: '/wx/getAuthData',
      method: 'GET',
      params: configHttpParams(params)
    }).then(function (response) {
      var data = response.data
      if (data.code === 0) {
        return resolve(data.data.jsconfig)
      }
      return reject(data)
    })
  })
}

export function loadJsSdk(callback) {
  var url = 'https://res.wx.qq.com/open/js/jweixin-1.0.0.js'
  if (window.wx && typeof window.wx.config === 'function') {
    callback()
    return
  }
  loadJs(url, callback)
}

/**
 * 微信分享
 * http://mp.weixin.qq.com/wiki/7/aaa137b55fb2e0456bf8dd9148dd613f.html
 * @param  {Object} wechatSDKConfig from getWechatAuthData
 * @param  {Object} data
 *  @property {String} title   分享标题
 *  @property {String} desc    分享描述
 *  @property {String} imgUrl  分享图标
 *  @property {String} type    分享类型，music、video或link，不填默认为link
 *  @property {String} dataUrl 如果type是music或video，则要提供数据链接，默认为空
 * @return {Promise}
 */
export function wechartShare(url, shareData) {
  Vue.http({
    url: '/act_api/weixin/getJsconfig',
    method: 'GET',
    params: { url }
  }).then(function (response) {
    var data = response.data && response.data.data
    menuShare(data, shareData)
  })
}

export function menuShare(wechatSDKConfig, data) {
  return new Promise(function (resolve, reject) {
    loadJsSdk(function () {
      let wx = window.wx
      wx.config(wechatSDKConfig)
      wx.ready(function () {
        wx.checkJsApi({
          jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
        })
        const shareConfig = {
          title: data.title,
          desc: data.desc,
          imgUrl: data.imgUrl,
          link: data.link || window.location.href,
          type: data.type || 'link',
          success: resolve,
          cancel: reject
        }
        wx.onMenuShareTimeline(shareConfig)
        wx.onMenuShareAppMessage(shareConfig)
        // wx.onMenuShareQQ(shareConfig)
        // wx.onMenuShareWeibo(shareConfig)
        // wx.onMenuShareQZone(shareConfig)
      })
    })
  })
}
