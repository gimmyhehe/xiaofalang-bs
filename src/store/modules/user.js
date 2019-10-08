import { login, logout, statiStical } from '@/api/login'
import { Loading } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { _pageTransfer } from '@/store/libs/tools'
import { Message, MessageBox } from 'element-ui'
const user = {
  state: {
    token: getToken(),
    notice: {
      on_line_amount: 0, // 在线会员人数
      charge: 0, // 存款审核
      withdraw: 0, // 取款审核
      withdrawFinance: 0, // 取款审核（财务）
      commission: 0, // 佣金
      dailyWage: 0, // 日工资
      dividend: 0, // 分红
      rewardProgram: 0 // 优惠活动
    },
    sysAudio: {// 音频对象，每新增一个新的音频文件都要对应到 key = 文件名
      preventPlayAudio: localStorage.preventPlayAudio, // 是否不允许播放音频
      startQueue: [], // 这个是音频执行队列
      playStatus: false, // 音频播放状态，一次只播放一次
      charge: {
        domObj: null// intervalTime: null // 几毫秒内能重复播放
      },
      withdraw: {
        domObj: null// intervalTime: null
      }
    },
    info: localStorage.getItem('userinfo') && JSON.parse(localStorage.getItem('userinfo')),
    pm: JSON.parse(localStorage.getItem('pm')) || [], // 权限列表
    isInit: false
  },

  getters: {
    isInit: (state) => {
      return state.isInit
    },
    sysNotice: (state) => {
      return state.notice
    },
    hasExportXls: (state) => { // 是否有导出报表的权限
      return state.pm.includes('ExportXls')
    },
    sysAudio (state) { // 音频的对象
      return state.sysAudio
    }
  },

  mutations: {
    SET_TOKEN: (state, { handleTransfer = true, data }) => {
      let { token, time } = data || {}
      if (token) {
        setToken({ token, time })
      } else {
        removeToken()
      }
      token = token || ''
      if (handleTransfer) {
        _pageTransfer({ type: 'SET_TOKEN', data: token ? { token, time } : { token } })
      } else if (Boolean(token) !== Boolean(state.token)) { // 当是页面收到通知,并且两者其中一个为空的情况下
        location.href = '/'
      }
      state.token = token // 这个需要放在上面判断的最后,以防当前页面自己收到自己的通知，当前窗口不刷新，会由401状态统一弹一个提示窗口出来,
    },
    SET_INFO: (state, info) => {
      localStorage.setItem('userinfo', JSON.stringify(info))
      state.info = info
    },
    SET_NOTICE: (state, { withdraw = state.notice.withdraw, withdrawFinance = state.notice.withdrawFinance, charge = state.notice.charge, on_line_amount = state.notice.on_line_amount, rewardAudit } = state.notice) => {
      state.notice = { ...state.notice, withdraw, withdrawFinance, charge, on_line_amount, ...rewardAudit }
    },
    SET_PERMISSION: (state, menus) => {
      localStorage.setItem('pm', JSON.stringify(menus))
      state.pm = menus
    },
    SET_INIT: (state, status) => {
      state.isInit = status
    },
    SET_PREVENTPLAYAUDIO: (state, status) => {
      if (status) {
        localStorage.preventPlayAudio = status
      } else {
        localStorage.removeItem('preventPlayAudio')
      }
      state.sysAudio.preventPlayAudio = status
    }
  },

  actions: {
    // 清除用户的信息
    clearUserInfo ({ commit }) {
      commit('SET_TOKEN', { data: { token: '' } })
      localStorage.removeItem('pm')
      commit('SET_INIT', false)
      return false
    },
    // 登录
    Login ({ commit }, userInfo) {
      // const username = userInfo.username.trim()
        return new Promise((resolve,reject)=>{
            login(userInfo).then((res) => {
              if(res.status==0){
                let menus = [
                'modifyPassword',
                'addBarber','barberList',
                'addProduct','productList','ordertList'
                ]
                commit('SET_PERMISSION', menus)
                commit('SET_INFO', { username: userInfo['user_name'] })
                resolve()
              } else {
                Message({
                  message: res.msg,
                  type: 'error',
                  duration: 3 * 1000
                })
                reject()
            }
          })
        })
        
    },

    // 前端 登出
    LogOut ({ dispatch }) {
      return new Promise((resolve, reject) => {
        let loadingInstance1 = Loading.service({ fullscreen: true })
        logout().then(({ err, res }) => {
          if (!err) {
            dispatch('clearUserInfo')
            location.href = '/'
            // router.push({ path: '/' })
            resolve()
          } else {
            reject(err)
          }
          loadingInstance1.close()
        })
      })
    },

    // 获取信息
    GetSysNotice ({ commit, state, dispatch }, type = null) {
      let typeList = {// type  默认全部，如果单独查询则只响应某一个声音
        'charge': 2,
        'withdraw': 3,
        'withdrawFinance': 4
      }
      return statiStical(typeList[type] || '').then(({ err, res }) => {
        if (!err) {
          commit('SET_NOTICE', res)
          if (!state.sysAudio.preventPlayAudio && !type) { // 如果是轮询并且没有设置禁止播放，就播放提示声
            dispatch('sysAudioPlay', res)
          }
        }
        return { err, res }
      })
    },

    async sysAudioPlay ({ state, dispatch }, data = {}) {
      let audioName = {// 音频对应的属性
        charge: ['charge'],
        withdraw: ['withdraw', 'withdrawFinance']
      }
      let startQueue = state.sysAudio.startQueue
      for (let i in audioName) {
        for (let _dataName of audioName[i]) {
          // console.log(i, _dataName, data[_dataName])
          if (data[_dataName]) {
            if (!startQueue.includes(i)) {
              startQueue.push(i)
              dispatch('handlePlayAudio')
            }
            break// 同一个音频只需要响一次
          }
        }
      }
    },
    handlePlayAudio ({ state, dispatch }) {
      if (!state.sysAudio.startQueue || state.sysAudio.startQueue.length <= 0 || state.sysAudio.playStatus) {
        return false
      }
      state.sysAudio.playStatus = true // 防止多个音频播放逻辑处理
      let name = state.sysAudio.startQueue[0]
      while (!name || !state.sysAudio[name]) { // 找到第一个符合播放条件的音频名字
        state.sysAudio.startQueue.shift()
        if (state.sysAudio.startQueue.length <= 0) {
          return false
        }
        name = state.sysAudio.startQueue[0]
      }
      if (!state.sysAudio[name].domObj) { // 获取音频对象
        let dom = document.querySelector(`.${name}`)
        if (!dom) {
          dom = new Audio()
          dom.className = name
          dom.src = `/static/music/${name}.mp3`
          document.body.appendChild(dom) // 把它添加到页面中
        }
        state.sysAudio[name]['domObj'] = dom
      }
      state.sysAudio[name]['domObj'].play()
      state.sysAudio[name]['domObj'].onended = async (event) => { // 播放完毕则吧当前对象清出队列,并且触发播放的方法
        // console.log(name, 'onended')
        await new Promise((resolve) => { setTimeout(() => resolve(), 1000) })// 延时1s播放下一个音频
        state.sysAudio.startQueue.shift()
        state.sysAudio.playStatus = false
        dispatch('handlePlayAudio')
      }
    }
  }
}

export default user
