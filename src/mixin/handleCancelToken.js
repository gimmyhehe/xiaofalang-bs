export default {
  data () {
    return {
      G_CancelTokenList: []
    }
  },
  beforeDestroy () {
    for (let CancelToken of this.G_CancelTokenList) {
      if (CancelToken && typeof CancelToken === 'function' && CancelToken.name === 'cancel') {
        CancelToken && CancelToken('Operation canceled by the user.')
      }
    }
  },
  methods: {
    // 处理用户操作更新操作时间的逻辑
    handleAddCancelToken (c) {
      // executor 函数接收一个 cancel 函数作为参数
      this.G_CancelTokenList.push(c)
    }
  }
}
