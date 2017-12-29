import { queryString } from '~/assets'

let query
try {
  let search = process.BROWSER_BUILD && loaction.search
  query = queryString.parse(search)
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
