
let listenInputAction
let listenKeypressAction
export default {
  bind: function (el, binding) {
    listenInputAction = e => {
      console.log(e, e.target.type)
      if (e.inputType === 'insertCompositionText') {
        e.target.value = e.target.value.replace(/\D+/g, '')
        e.target.type = 'text'
      } else {
        e.target.value = e.target.value.replace(/\D+/g, '')
        e.target.type = 'number'
      }
      let { form, key } = binding.value
      console.log(form[key], e.target.value)
      form[key] = e.target.value
      console.log(e.target.value)
    }
    console.log(listenKeypressAction)
    listenKeypressAction = e => {
      // console.log(e, e.target.value)
      if (e.keyCode < 48 || e.keyCode > 57) {
        e.returnValue = false
      }
    }
    // el.addEventListener('keypress', listenKeypressAction)
    el.addEventListener('input', listenInputAction)
  },
  unbind: function (el, binding) {
    // el.removeEventListener('keypress', listenKeypressAction)
    el.removeEventListener('input', listenInputAction)
  }
}
