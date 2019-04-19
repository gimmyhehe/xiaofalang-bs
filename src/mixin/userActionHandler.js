import { getToken } from '@/utils/auth' // 验权
export default {
  data () {
    return {
      intervalWorkList: null // 轮询的定时任务
      // currentDepositNum: null
    }
  },
  created () {
    // 刷新或者关闭窗口，让本地存储的访问记录状态变为0
    this.createInterval()
    window.onstorage = (e) => {
      // 用onstorage来进行页面数据同学
      if (e.key === '_pageTransfer' && e.newValue) {
        let { action = 'commit', type, data } = JSON.parse(e.newValue)
        // handleTransfer，是否保存到本地储存触发通讯，默认响应其他页面的数据变动的操作不触发
        this.$store[action](type, { data, handleTransfer: false })
      }
    }
  },
  beforeDestroy () {
    if (this.intervalWorkList) clearInterval(this.intervalWorkList)
  },
  methods: {
    // 处理用户操作更新操作时间的逻辑
    handleUserAction (e) {
      if (getToken()) {
        // 记录用户最新操作的时间
        window.localStorage.userActionTime = new Date().getTime()
      }
    },
    // 播放音频
    // noticePlay(url, palyTimes) {
    //   const noticeTime = 2000
    //   setTimeout(() => {
    //     let audio = new Audio()
    //     audio.src = url
    //     document.body.appendChild(audio) // 把它添加到页面中
    //     audio.play()
    //   }, palyTimes * noticeTime)
    // },
    // 轮询的操作
    createInterval () {
      if (this.intervalWorkList) clearInterval(this.intervalWorkList)
      let _userActionTime = window.localStorage.userActionTime
      let _maxWaitTime = 2 * 60 * 60 * 1000 // 超过两小时没有操作就退出
      // 初始化的时候判断上次的操作时间，如果大于30分钟则清空数据（以免token清除出现问题导致关机之后打开网页还保留着token信息）
      if (!isNaN(_userActionTime) && ((Date.now() - _userActionTime)) >= _maxWaitTime) {
        window.localStorage.removeItem('userActionTime')
        this.$store.dispatch('clearUserInfo')
        return window.location.reload()
      }
      window.localStorage.userActionTime = Date.now()
      // 第一次进来要获取一次审核的信息记录
      // if (getToken()) this.$store.dispatch('GetSysNotice')
      this.intervalWorkList = setInterval(() => {
        if (getToken()) {
          let curDate = Date.now()
          let interval = (curDate - window.localStorage.userActionTime)
          if (Math.ceil(interval) >= _maxWaitTime) {
            this.$store.dispatch('LogOut')
            return this.$store.dispatch('clearUserInfo')
          }
          // 如果55秒钟之内有发起过轮询的话，则不执行这一次
          if (
            window.localStorage.GetUserInfoTime &&
            Math.ceil((curDate - window.localStorage.GetUserInfoTime) / 1000) <= 30
          ) {
            return false
          }
          this.$store.dispatch('GetSysNotice')
          // 记录轮询获取数据的时间,以免频繁获取
          window.localStorage.GetUserInfoTime = curDate
        } else {
          // 如果没登录的话就记录一下当前的时间,因为用户的操作时间只有当用户登陆的时候才会记录
          window.localStorage.userActionTime = Date.now()
        }
      }, 30000)
    }
  }
}
