import Vue from 'vue'

const DialogConstructor = Vue.extend(require('./main.vue'))
let toastPool = []

let getAnInstance = () => {
  if (toastPool.length > 0) {
    let instance = toastPool[0]
    toastPool.splice(0, 1)
    return instance
  }
  return new DialogConstructor({
    el: document.createElement('div')
  })
}

let returnAnInstance = instance => {
  if (instance) {
    toastPool.push(instance)
  }
}

let removeDom = event => {
  if (event.target.parentNode) {
    event.target.parentNode.removeChild(event.target)
  }
}

DialogConstructor.prototype.close = function() {
  this.visible = false
  this.$el.addEventListener('transitionend', removeDom)
  this.closed = true
  returnAnInstance(this)
}

let Dialog = (options = {}) => {
  let instance = getAnInstance()
  instance.closed = false
  instance.isShowDialog = true
  instance.amount = options.amount
  instance.redirectUrl = options.redirectUrl
  clearTimeout(instance.timer)
  document.body.appendChild(instance.$el)
  Vue.nextTick(function() {
    instance.visible = true
    instance.$el.removeEventListener('transitionend', removeDom)
  })
  return instance
}

export default Dialog
