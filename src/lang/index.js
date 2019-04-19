import en from './en'
import zh from './zh'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const language = {
  en,
  zh
}

export function createI18n () {
  return new VueI18n({
    locale: 'zh', // set locale
    fallbackLocale: 'zh',
    messages: language // set locale messages
  })
}
