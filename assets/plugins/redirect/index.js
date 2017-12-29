import * as redirectService from '../../services/redirect'

const plugin = {
  install (vue, options = {}) {
    const redirect = {
      ...redirectService
    }

    if (!vue.$klg) {
      vue.$klg = {
        redirect
      }
    } else {
      vue.$klg.redirect = redirect
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