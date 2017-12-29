import bridge from '../../services/bridge'
import device from '../../services/device'

const plugin = function (Vue, options = {}) {
  const {
    autoload = true
  } = options

  function setupBridgeIfNecessary() {
    if (device.detectIsApp()) {
      bridge.setup()
    }
  }

  if (autoload) {
    setupBridgeIfNecessary()
  }

  Vue.mixin({
    created: function () {
      this.$jsBridge = {
        setupIfNecessary: setupBridgeIfNecessary,
        ...bridge
      }
    }
  })
}

export default plugin
