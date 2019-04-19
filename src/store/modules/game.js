import { getAvailableGameList, getAvailableGameChannel } from '@/api/game'
import { nameFormatter } from '@/utils/tools'

const game = {
  state: {
    oldGames: {}, // 保存渠道以及下面的游戏
    availableGameList: null,
    // availableGameList:[{
    //     type: '游戏大类',
    //     channels: [{
    //       game_id: '游戏id',
    //       channel_name: '游戏渠道商名称'
    //     }]
    //   }]
    availableGameChannel: null
    // [{
    //   id:'渠道商id',
    //   name:'渠道商名称'
    // }]
  },

  getters: {
    // 返回所有游戏   将多数组合并成一个
    // gameList: state => {
    //   return Array.prototype.concat(..._.map(state.oldGames, 'games'))
    // },
    // oldGames: state => state.oldGames,
    sortedGamelist: state => {
      return nameFormatter(state.availableGameList)
    },
    gameChannel: state => {
      return state.availableGameChannel
    }
  },

  mutations: {
    // SET_GAME: (state, games) => {
    //   state.oldGames = games
    // },
    SET_AVAILABLE_GAME: (state, games) => {
      state.availableGameList = games
    },
    SET_GAME_CHANNEL: (state, games) => {
      state.availableGameChannel = games
    }
  },

  actions: {
    // 获取游戏列表
    getAvailableGameList ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.availableGameList) {
          getAvailableGameList().then(({ err, res }) => {
            if (!err) {
              let _tempRes = Object.values(res)
              commit('SET_AVAILABLE_GAME', _tempRes)
              resolve(_tempRes)
            }
            reject(err)
          })
        } else {
          resolve(state.availableGameList)
        }
      })
    },
    // 获取所有的游戏渠道商
    getAvailableGameChannel ({ commit, state }) {
      return new Promise((resolve, reject) => {
        if (!state.availableGameChannel) {
          getAvailableGameChannel().then(({ err, res }) => {
            if (!err) {
              commit('SET_GAME_CHANNEL', res)
              resolve(res)
            }
            reject(err)
          })
        } else {
          resolve(state.availableGameChannel)
        }
      })
    }
    // // 获取游戏列表
    // getGameList({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     if (Object.keys(state.oldGames).length === 0) {
    //       getAvailableList().then(({ err, res }) => {
    //         if (!err) {
    //           commit('SET_GAME', res)
    //           resolve(res)
    //         }
    //         reject(err)
    //       })
    //     } else {
    //       resolve(state.oldGames)
    //     }
    //   })
    // }
  }
}

export default game
