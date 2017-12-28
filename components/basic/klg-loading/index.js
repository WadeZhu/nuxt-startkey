import Vue from 'vue'
import loadingVue from './loading.vue'

const LoadingConstructor = Vue.extend(loadingVue)

LoadingConstructor.prototype.close = function () {
  this.$el &&
    this.$el.parentNode &&
    this.$el.parentNode.removeChild(this.$el)
  this.$destroy()
}

const defaults = {
  text: '考拉奋力加载中...'
}

const Loading = (options = {}) => {
  options = {
    ...defaults,
    ...options
  }

  if (typeof options.target === 'string') {
    options.target = document.querySelector(options.target)
  }
  options.target = options.target || document.body

  let parent = options.body ? document.body : options.target
  let instance = new LoadingConstructor({
    el: document.createElement('div'),
    data: options
  })

  parent.appendChild(instance.$el)

  return instance
}

export default Loading
