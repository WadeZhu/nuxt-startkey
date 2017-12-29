// From https://github.com/ElemeFE/mint-ui/blob/master/packages/infinite-scroll/index.js
import InfiniteScroll from './directive'
import Vue from 'vue'

const install = function(Vue) {
  Vue.directive('InfiniteScroll', InfiniteScroll)
}

if (window.Vue) {
  window.infiniteScroll = InfiniteScroll
  Vue.use(install) // eslint-disable-line
}

InfiniteScroll.install = install
export default InfiniteScroll
