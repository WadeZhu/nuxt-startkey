import device from '../device'

export function send(data = {}) {
  if (device.isApp) data.text += '-app'
  if (device.isWechat) data.text += '-wexin'
  if (device.isAndroid) data.text += '-android'
  if (device.isIos) data.text += '-ios'
  if (window.ga) {
    window.ga('send', {
      'hitType': 'event',
      'eventCategory': data.cat || 'button',
      'eventAction': data.action || 'click',
      'eventLabel': data.text || 'buttons click',
      'eventValue': data.pos || 0
    })
  }

  /*
  *_hmt.push([‘_trackEvent’, category, action, opt_label,opt_value])
  *category：要监控的目标的类型名称，通常是同一组目标的名字，比如”视频”、”音乐”、”软件”、”游戏”等等。该项必选。
  *action：用户跟目标交互的行为，如”播放”、”暂停”、”下载”等等。该项必选。
  *opt_label：事件的一些额外信息，通常可以是歌曲的名称、软件的名称、链接的名称等等。该项可选。
  *opt_value：事件的一些数值信息，比如权重、时长、价格等等，在报表中可以看到其平均值等数据。该项可选。
  */
  if (window._hmt) {
    _hmt.push(['_trackEvent', data.cat || 'button', data.action || 'click', data.text || 'buttons click', data.pos || 0]);
  }
}
