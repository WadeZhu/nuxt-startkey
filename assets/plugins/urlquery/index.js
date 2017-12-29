import { queryString } from '~/assets'

let query
try {
  query = queryString.parse(location.search)
} catch (error) {
  console.log(error)
}

const plugin = function (Vue) {
  Vue.mixin({
    created: function () {
      this.$urlQuery = query
    }
  })
}

export default plugin
