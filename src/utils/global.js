import main from '@/main'
import store from '@/store'

export default {
  toThousandslsFM,
  onlyNumber,
  getSummary,
  commonFormatter,
  toThousandsls,
  changeSourcesOrigin
}

export function commonFormatter (row, column, cellValue) {
  return cellValue || '-'
}
/**
 * 千分位数加逗号
 * @param {*} num 要转换的参数
 * @param {*} floatLength 保留的小数位数
 * @param {*} defaultPlacement 非法数字默认显示符合
 * @param {*} mathOperation 数字的操作,例如四舍五入
 */
export function toThousandsls (num, floatLength = 0, defaultPlacement) {
  // 如果需要给空值默认显示值需要传defaultPlacement
  if (![undefined, null].includes(defaultPlacement) && isNaN(num)) return defaultPlacement
  let pointNFloatLengthp = Number(floatLength) === 0 ? 0 : floatLength + 1
  // console.log('----------------', Math[mathOperation]((+num || 0) * floatPow) / floatPow)
  // (Math[mathOperation](parseInt((+num || 0) * floatPow)) / floatPow)
  let result = String(num || 0)
  if (!result.includes('.')) { result += '.' }
  return result
    .replace(/\.\d*$/g, m => m.substr(0, pointNFloatLengthp).padEnd(pointNFloatLengthp, '0'))// 小数位数截断
    .replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))// 每千分位逗号隔开
}

// 用于element表格的数字千分位格式化
export function toThousandslsFM (floatLength = 0, defaultPlacement) {
  return (row, column, cellValue, index) => {
    return toThousandsls(cellValue, floatLength, defaultPlacement)
  }
}

/*
event触发事件的dom对象
data组件绑定的对象
key组件绑定的对象键值
除了数字禁用输入和筛选多余的值
*/
export function onlyNumber (data = false, key, mode = 'float', event) {
  // console.log(event)
  // console.log(data[key])
  data[key] = data[key] + ''
  if (!data || !data[key]) return false
  if (mode === 'float') {
    data[key] = data[key].replace(/^0+/g, '0').replace(/^\D*([0-9]\d*\.?\d{0,2})?.*$/, '$1')
  } else if (mode === 'int') {
    // 替换掉多个0开头的输入
    data[key] = data[key].replace(/^(0+)/g, '').replace(/[^0123456789]/g, '') || 0
  } else {
    data[key] = data[key].replace(/^(0+)/g, '').replace(/[^0123456789]/g, '') || 0
  }
  // export function onlyNumber(event, data = false, key, regular = /[^0123456789.]/g) {
  //   event.target.oninput = function(events) {
  //     if (data === false) {
  //       events.target.value = events.target.value.replace(regular, '')
  //     } else {
  //       data[key] = events.target.value = events.target.value.replace(regular, '')
  //     }
  //   }
  //   // 当存在第一个小数点的时候，不能再输入小数点了，因为更改value依旧无法阻止掉被清空
  event.target.onkeypress = function (events) {
    // 不能输入两个小数点,因为小数点也符合第二个条件，所以要用if - elseif
    if (events.keyCode === 46) {
      if (events.target.value.includes('.')) {
        events.returnValue = false
      }
    } else if (events.keyCode < 48 || events.keyCode > 57) {
      // 过滤非数字输入
      events.returnValue = false
    }
  }
}

// 计算表格数据的本页总计还有总计
// 如果append不传的话就只计算本页总计
// isCouuntCurr 是否计算本页汇总,
/**
 * 计算表格数据的本页总计还有总计
 * 如果append不传的话就只计算本页总计
 * @param {*} countCurrent 是否计算本页汇总, 如果该参数为对象，
 */
export function getSummary ({ data, append, firstCol, columns, countCurrent = true, sumData = {} }) {
  // 如果数组为空即不计算
  if (data && data.length === 0) {
    return data
  }
  let curr_summary = {}
  let total_summary
  if (append) {
    total_summary = { ...append }
    total_summary[firstCol] = main.$t('total_summary')
  }
  // curr_summary = handleSumData(curr_summary, data, columns)
  columns.forEach((column, index) => {
    if (countCurrent) {
      if (countCurrent[column] || Number(countCurrent[column]) === 0) {
        // 要做多个等于0的情况， 不然汇总数据等于0的时候，还是会计算列
        curr_summary[column] = typeof countCurrent[column] === 'function' ? countCurrent[column](data, column) : String(countCurrent[column])
      } else {
        curr_summary[column] = _.sumBy(data, function (o) { return Number(o[column] || 0) })
      }
    }
    if (sumData[column] || Number(countCurrent[column]) === 0) {
      total_summary[column] = typeof sumData[column] === 'function' ? sumData[column](data, column) : String(sumData[column])
    } else if (append) {
      total_summary[column] = Number(total_summary[column] || 0)
    }
  })

  // 将本页总计和总计添加到到原数据里面
  let summary = []
  if (countCurrent) {
    curr_summary[firstCol] = main.$t('curr_summary')
    summary.push(curr_summary)
  }
  if (append) summary.push(total_summary)
  return data.concat(summary)
}

/**
 * 改变url的origin
 * @param {*} from
 * @param {*} to
 */
export function changeSourcesOrigin (from, to) {
  if (!from) { return '' }
  to = to || store.getters.app_api_origin
  // 把域名+/storage/这样格式的路径替换
  return String(from).replace(new RegExp('(https?)?:?/{0,2}.*?/storage/', 'i'), to)
}
