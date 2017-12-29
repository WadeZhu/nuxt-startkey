import * as authService from '../../services/auth'

const plugin = {
  install (vue, options = {}) {
    const auth = {
      ...authService
    }

    if (!vue.$klg) {
      vue.$klg = {
        auth
      }
    } else {
      vue.$klg.auth = auth
    }

    vue.mixin({
      created: function () {
        this.$klg = vue.$klg
      }
    })
  }
}

export default plugin
export const install = plugin.install