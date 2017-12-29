import Vue from 'vue'
import VueResource from 'vue-resource'
import {filterUtils} from '~/assets/'
import DevicePlugin from '~/assets/plugins/device'
import UrlQueryPlugin from '~/assets/plugins/urlquery'
import AuthPlugin from '~/assets/plugins/auth'
import GaPlugin from '~/assets/plugins/analyst'
// import RedirectPlugin from '~/assets/plugins/redirect'
// import BridgePlugin from '~/assets/plugins/bridge'
// import interceptor from '~/assets/utils/interceptor'

// 置入Filter
Object.keys(filterUtils).forEach(key => {
  Vue.filter(key, filterUtils[key])
})

// 置入组件
Vue.use(VueResource)
Vue.use(DevicePlugin)
Vue.use(UrlQueryPlugin)
Vue.use(AuthPlugin)
Vue.use(GaPlugin)
// Vue.use(RedirectPlugin)
// Vue.use(BridgePlugin)
// Vue.http.interceptors.push(interceptor)