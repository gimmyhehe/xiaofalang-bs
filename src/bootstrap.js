// Load method categories.
import Vue from 'vue'
import { Request } from './utils/request'
import utils from '@/utils/global'

window.request = Request
Vue.prototype.utils = utils
window._ = {
  map: require('lodash/map'),
  find: require('lodash/find'),
  intersection: require('lodash/intersection'),
  groupBy: require('lodash/groupBy'),
  forEach: require('lodash/forEach'),
  sumBy: require('lodash/sumBy'),
  flattenDeep: require('lodash/flattenDeep'),
  join: require('lodash/join'),
  keyBy: require('lodash/keyBy'),
  sortBy: require('lodash/sortBy'),
  filter: require('lodash/filter'),
  defaultsDeep: require('lodash/defaultsDeep'),
  uniqBy: require('lodash/uniqBy'),
  cloneDeep: require('lodash/cloneDeep'),
  merge: require('lodash/merge')
}
