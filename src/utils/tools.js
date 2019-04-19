import { Message, MessageBox } from 'element-ui'
// import store from '@/store'
import main from '@/main'

const WINDOWGROUP = { // 窗口管理
  'messageUniq': {}
}
/**
 * elementui的message组件的封装
 * @param {*} option
 */
export function eleMessage (option) {
  let {
    message = '', type = 'info', iconClass = '', dangerouslyUseHTMLString = false, customClass = '', duration = 3000,
    showClose = false, center = '', onClose = null
  } = option || {}
  let _mark = `_toast${customClass}${type}${message}`// 在全局管理modal里面保存
  if (WINDOWGROUP['messageUniq'][_mark]) { // 不重复弹出相同mark的toast
    return false
  }
  let _mes = Message({
    message, type, iconClass, dangerouslyUseHTMLString, duration, showClose, center, customClass,
    onClose: (data) => {
      WINDOWGROUP['messageUniq'][_mark] = null
      delete WINDOWGROUP['messageUniq'][_mark]
      if (onClose && typeof onClose === 'function') {
        onClose(data)
      }
    }
    // message: text || main.$t('member.submit_suc')
  })
  WINDOWGROUP['messageUniq'][_mark] = _mes
  return _mes
}

export function successMsg (text) {
  eleMessage({
    type: 'success',
    message: text || main.$t('submitSuc')
  })
}

/**
 * 格式化根据游戏大类分类的游戏信息
 * @param availableGameList
 */
export function nameFormatter (GameList) {
  return GameList && GameList.map((item) => {
    // 把各级的name初始化为当前级别的名称
    item.name = main.$t(`game.${item.type}`)
    item.channels = item.channels.map((channel) => {
      channel.name = channel.channel_name
      return channel
    })
    return item
  })
}

// 确认弹窗'confirm','prompt','alert'
export function eleMessageBox ({ action = 'confirm', content = '', title = main.$t('tips'), confirm = main.$t('confirm'), cancel = main.$t('cancel'), dangerouslyUseHTMLString = false, distinguishCancelAndClose = false }, type = 'info') {
  return MessageBox[action](content, title, {
    confirmButtonText: confirm,
    cancelButtonText: cancel,
    type: action === 'confirm' && type,
    dangerouslyUseHTMLString,
    closeOnClickModal: false,
    closeOnPressEscape: false,
    distinguishCancelAndClose
  })
}

// 计算时间范围的文字表达
export function dateRange (start, end, seperate = ' 至 ') {
  if (start || end) {
    return ` ${start || '截止'} ${seperate} ${end || '现在'} `
  } else {
    return '全部'
  }
}

export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    /**
     * 在Safari和IE8上执行 new Date('2017-12-8 11:36:45'); 会得到Invalid Date
     */
    time = typeof time === 'string' ? String(time).replace(/-/g, '/') : time// 兼容safari,不然new Date会出错
    date = new Date(time)
  }
  // 判断是否转换为时间戳，是的话直接return
  if (format === 'timestamp') return (date.getTime())
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

class DateTimePicker {
  // 按时间戳来查找，查询参数为   start 开始时间  end  结束时间 formatType类型  如果只有开始时间则返回当天的日期
  data (formatType, start, end = start) {
    let time = []
    time = [this.starttime(new Date(start), formatType), this.endtime(new Date(end), formatType)]
    return time
  }
  // 类型转换
  starttime (data, formatType) {
    data.setHours(0)
    data.setMinutes(0)
    data.setSeconds(0)
    data.setMilliseconds(0)
    return parseTime(data, formatType)
  }
  endtime (data, formatType) {
    data.setHours(23)
    data.setMinutes(59)
    data.setSeconds(59)
    data.setMilliseconds(999)
    return parseTime(data, formatType)
  }
  // 常规操作
  // 自定义请传递 formatType 返回格式 start 开始时间戳 end 结束时间戳 到data方法
  getDateRange (type, formatType) {
    let starttime, endtime
    let returnTime = []
    let _now = new Date()
    const formatObj = {
      year: _now.getFullYear(),
      month: _now.getMonth(),
      date: _now.getDate(),
      // h: _now.getHours(),
      // i: _now.getMinutes(),
      // s: _now.getSeconds(),
      day: _now.getDay(),
      timestamp: _now.getTime()
    }
    let _currentTime = _now.getTime()
    let day = 24 * 60 * 60 * 1000
    // 当天
    switch (type) {
      case 'today':
        // 今天
        starttime = _currentTime
        break
      case 'yesterday':
        // 昨天
        starttime = (_currentTime - day)
        break
      case 'cycleLastWeek':
        // 上一个周
        let curWeekDays = formatObj['day'] || 7// 0代表周日
        starttime = _currentTime - day * (curWeekDays + 6)
        endtime = _currentTime - day * (curWeekDays)
        break
      case 'currentWeek':
        // 近七天
        starttime = _currentTime - day * 6
        endtime = _currentTime
        break
      case 'cycleWeek': {
        // 本周
        let curWeekDays = formatObj['day'] || 7// 0代表周日
        starttime = _currentTime - day * (curWeekDays - 1)
        endtime = _currentTime + day * (7 - curWeekDays)
        break
      }
      case 'cycleLastMonth':
        // 上月  日期传0默认为尾数
        starttime = new Date(formatObj['year'], formatObj['month'] - 1, 1).getTime()
        endtime = new Date(formatObj['year'], formatObj['month'], 0).getTime()
        break
      case 'currentMonth':
        // 当前时间计算的一个月
        starttime = _currentTime - day * 29
        endtime = _currentTime
        break
      case 'cycleMonth':
        // 本月
        starttime = new Date(formatObj['year'], formatObj['month'], 1).getTime()
        endtime = new Date(formatObj['year'], formatObj['month'] + 1, 0).getTime()
        break
      default:
        return
    }
    returnTime = this.data(formatType, starttime, endtime)
    return returnTime
  }
}

export const dateTimePicker = new DateTimePicker()
