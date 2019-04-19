import Vue from 'vue'
// 兼容低版本浏览器(caniuse)，需要引入polyfill
import 'babel-polyfill'
import '@/bootstrap'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
import App from '@/App'
import router from '@/router'
import store from '@/store'
import '@/permission' // 权限
import { createI18n } from '@/lang'
import * as filters from '@/filters' // 全局filter
import * as directive from '@/directive' // 全局filter
import * as components from '@/components' // 全局components
/* 多语言 */
import ElementLocale from 'element-ui/lib/locale'
Vue.use(ElementUI, { size: 'mini' })

const i18n = createI18n()
ElementLocale.i18n((key, value) => i18n.t(key, value))
i18n.missing = (locale, key, vm) => {
  // handle translation missing
  let keys = key.split('.')
  return keys[keys.length - 1]
}
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})
// register global utility directive.
Object.keys(directive).forEach(key => {
  Vue.use(directive[key].install); // eslint-disable-line
})

// register global utility component.
Object.keys(components).forEach(key => {
  Vue.component(
    key,
    // 如果这个组件选项是通过 `export default` 导出的，
    // 那么就会优先使用 `.default`，
    // 否则回退到使用模块的根。
    components[key]
  )
})

Vue.config.productionTip = false

export default new Vue({
  el: '#app',
  i18n,
  router,
  store,
  template: '<App/>',
  components: { App }
})
