import Vue from 'vue'
import createDialog from 'common/utils/createDialog'

const DialogConstructor = Vue.extend(require('./main.vue'))

export default createDialog(DialogConstructor)
