import Vue from 'vue'
import device from '~/assets/services/device'

Vue.mixin({
  created: function () {
    this.$device = device
  }
})