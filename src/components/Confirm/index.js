import Confirm from './confirm.vue'
const VueComponent = {
  install: function(Vue) {
    Vue.component('confirm', Confirm)
  }
}
// 这里的判断很重要
if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(VueComponent)
}
export default VueComponent
