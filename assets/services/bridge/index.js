import noop from 'lodash/noop'
import device from '../device'

const repeatCount = 5
const callPluginCount = {}
const registerPluginCount = {}

function setup() {
  const WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () {
    document.documentElement.removeChild(WVJBIframe)
  }, 100)
}

function callPlugin(fnName, params = {}, cbf = noop) {
  if (callPluginCount[fnName] === undefined) {
    callPluginCount[fnName] = repeatCount
  }
  if (window.WebViewJavascriptBridge) {
    WebViewJavascriptBridge.callHandler(fnName, params, cbf)
  } else if (callPluginCount[fnName]) {
    callPluginCount[fnName]--
    setTimeout(function () {
      callPlugin(fnName, params, cbf)
    }, 1000)
  }
}

function registerPlugin(fnName, cbf = noop) {
  if (registerPluginCount[fnName] === undefined) {
    registerPluginCount[fnName] = repeatCount
  }
  if (window.WebViewJavascriptBridge) {
    WebViewJavascriptBridge.registerHandler(fnName, cbf)
  } else if (registerPluginCount[fnName]) {
    registerPluginCount[fnName]--
    setTimeout(function () {
      registerPlugin(fnName, cbf)
    }, 1000)
  }
}

/**
 * Native 所有插件都可增加Appsee属性
 * @param  {object} params
 * @param  {string} params.appseeEvent     appsee后台的事件名称
 * @param  {object} params.properties     事件的属性值
 * eg: {"appseeEvent": "券点击事件", "properties" : {"chnl": "cuhuo", "ticketName": "14天定期"}}
 */

function share(shareInfo) {
  callPlugin('share', shareInfo)
}

function getUserInfo(callbackFn) {
  callPlugin('getUserInfo', null, callbackFn)
}

function refreshMainPage() {
  callPlugin('refreshMainPage')
}

/**
 * Native 右上角显示东西
 * @param  {object} params     [type]
 * @param  {number} params.type 显示类型 0.信息提示Icon, 1. 分享Icon, 2. 文字， 3. 图片
 * @param  {string} params.text 文字内容 type为2时所用
 * @param  {string} params.picLink 图片链接 type为3时所用
 * @param  {string} params.onClickCallback 点击后Native回调的方法，需要H5注册
 * @param  {function} callbackFn 显示完东西后的异步回调
 * @return {[type]}
 */
function showMenu(params, callbackFn) {
  callPlugin('showMenu', params, callbackFn)
}

/**
 * Native 当前H5页面是否添加下拉刷新功能
 * @param {object} params 
 * @param {function} callPlugin 
 */
function addRefreshComponent() {
  callPlugin('addRefreshComponent')
}

/**
 * Native 拨打客服联系电话
 * @param  {object} params     [type]
 * @param  {string} params.phone  联系电话（默认：4009633663）
 * @param  {string} params.title  popup 标题（默认：是否拨打电话联系考拉客服？）
 */
function contactPhone(params) {
  if (device.isApp) {
    callPlugin('contactPhone', params)
  } else {
    let phone = params && params.phone || '4009-633-663'
    let phoneAnchor = document.getElementById('phoneAnchor')
    if (!phoneAnchor) {
      let phoneElement = document.createElement('a')
      phoneElement.href = `tel: ${phone}`
      phoneElement.id = 'phoneAnchor'
      document.body.appendChild(phoneElement)
      document.getElementById('phoneAnchor').click()
    } else {
      phoneAnchor.click()
    }
  }
}

/**
 * Native 跳转App
 * @param  {object} params     [type]
 * @param  {string} params.app     weixin:表示去微信 qq:跳转qq  browser:打开浏览器
 * @param  {string} params.copyContent     app 为qq或weixin时，需要传跳转的微信号或者qq号
 * @param  {string} params.toastContent     吐司的文案
 * @param  {string} params.url     打开浏览器时的url
 */
function openApp(param = {}) {
  let params = {
    app: param.app || 'weixin',
    copyContent: param.copyContent || 'kaolalicai',
    toastContent: param.toastContent || '已复制微信号',
    url: param.url
  }
  callPlugin('openApp', params)
}

/**
 * Native 跳转App
 * @param  {object} params     [type]
 * @param  {string} params.app     weixin:表示去微信 qq:跳转qq  browser:打开浏览器
 * @param  {string} params.copyContent     app 为qq或weixin时，需要传跳转的微信号或者qq号
 * @param  {string} params.toastContent     吐司的文案
 * @param  {string} params.url     打开浏览器时的url
 */
function callApp(param) {
  callPlugin('openApp', param)
}

// 调用VIP页面
function redirectAppPageVip() {
  callPlugin('redirectAppPage', { page: 'vip' })
}

// 调用客服对话页面
function redirectCustomerService(params = {}) {
  const {
    callbackFn = noop
  } = params

  if (device.isApp) {
    callPlugin('redirectAppPage', { page: 'customerService' }, callbackFn)
  } else {
    contactPhone(params)
  }
}

export default {
  setup,
  share,
  showMenu,
  addRefreshComponent,
  getUserInfo,
  contactPhone,
  callPlugin,
  registerPlugin,
  callApp,
  openApp,
  refreshMainPage,
  redirectAppPageVip,
  redirectCustomerService
}
