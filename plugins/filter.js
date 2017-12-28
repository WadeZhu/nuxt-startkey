import Vue from 'vue'
import filterUtils from '~/assets/filters'

// 置入Filter
Object.keys(filterUtils).forEach(key => {
  Vue.filter(key, filterUtils[key])
})