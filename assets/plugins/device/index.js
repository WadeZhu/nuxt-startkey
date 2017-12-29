import device from '../../services/device'

const plugin = function (Vue) {
  Vue.mixin({
    created: function () {
      this.$device = device
    }
  })
}

export default plugin
