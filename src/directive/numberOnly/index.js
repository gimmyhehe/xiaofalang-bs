import numberOnly from './numberOnly'

const install = function (Vue) {
  Vue.directive('numberOnly', numberOnly)
}

if (window.Vue) {
  window.numberOnly = numberOnly
  Vue.use(install); // eslint-disable-line
}

numberOnly.install = install
export default numberOnly
