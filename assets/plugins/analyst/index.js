import * as analyst from '../../services/analyst'
const plugin = function (Vue) { 
  Vue.mixin({ 
    created: function () { 
      this.$analyst = analyst
    }
  }) 
}
export default plugin