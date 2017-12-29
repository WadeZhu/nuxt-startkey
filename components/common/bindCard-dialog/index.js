import Vue from 'vue'
import createDialog from '~/assets/utils/createDialog'

const DialogConstructor = Vue.extend(require('./index.vue'))

export default createDialog(DialogConstructor)