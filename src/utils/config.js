import main from '@/main'
import myConfig from '../../config/myconfig'
export default {
  // USER_TYPE: {
  //   // "business"(商家)，staff(员工)，shareholder（股东），big_manager(总经理),manager(经理)
  //   'business': 'business',
  //   'staff': 'staff',
  //   'shareholder': 'shareholder',
  //   'big_manager': 'big_manager',
  //   'manager': 'manager'
  // },
  // 会员类型:经营者1,高级总代2,总代3,代理4,正式会员5,试用会员6,子帐7
  ROLE_TYPE: {
    1: 'shareholders',
    2: 'senior',
    3: 'master',
    4: 'agent',
    5: 'member',
    6: 'trialMember',
    7: 'subAccount'
  }
}
export const SERVER = myConfig.SERVER
// 用来表单对象合并的
export const GAME_TYPE_FORM = {
  'Casino': '',
  'Lottery': '',
  'Sport': '',
  'SlotMachine': '',
  'FishHunting': '',
  'Chess': '',
  'Horse': ''
}

export const GAME_TYPE = {
  'Casino': {
    'lowercase': 'casino',
    'lowercase_underline': 'casino'
  },
  'Lottery': {
    'lowercase': 'lottery',
    'lowercase_underline': 'lottery'
  },
  'Sport': {
    'lowercase': 'sport',
    'lowercase_underline': 'sport'
  },
  'SlotMachine': {
    'lowercase': 'slotmachine',
    'lowercase_underline': 'slot_machine'
  },
  'FishHunting': {
    'lowercase': 'fishhunting',
    'lowercase_underline': 'fish_hunting'
  },
  'Chess': {
    'lowercase': 'chess',
    'lowercase_underline': 'chess'
  },
  'Horse': {
    'lowercase': 'horse',
    'lowercase_underline': 'horse'
  }
}

// export const AUDIT_POINTS_GAME_TYPE = {
//   'casino': {},
//   'slot_machine': {},
//   'fish_hunting': {},
//   'sport': {},
//   'lottery': {},
//   'chess': {},
//   'horse': {}
// }
// Casino  真人类游戏
// Lottery  彩票类游戏
// Sport  体育类游戏
// SlotMachine  电子类游戏
// FishHunting  捕鱼类游戏
// Horse  马类游戏

// 会员类型:经营者1,高级总代2,总代3,代理4,正式会员5,试用会员6,子帐7
export const ROLE_TYPE = {
  1: 'shareholders',
  2: 'senior',
  3: 'master',
  4: 'agent',
  5: 'member',
  6: 'trialMember',
  7: 'subAccount'
}

// export const DEPOSIT_PAYTYPE = {
//   // 存款的支付方式
//   0: '',
//   1: '微信',
//   2: 'QQ',
//   3: '网银',
//   4: '人工存入',
//   5: '线下'
// }

export const DEPOSIT_PAYTYPE = {
  // 存款的支付方式
  // 0: '',
  // 1: '微信',
  // 2: 'QQ',
  // 3: '网银',
  // 4: '人工存入',
  // 5: '线下',
  1: '微信支付',
  2: 'QQ支付',
  3: '网银支付',
  4: '人工存入',
  5: '线下转账',
  6: '支付宝支付',
  7: '快捷支付',
  8: '移动快捷支付', // 移动
  9: '移动支付宝' // 移动
}

export function getPayMethod (key) {
  return DEPOSIT_PAYTYPE[key] || ''
}

// 用户类型:1-占成，2-分红
// 账户类型，新增高级总代时必须指定，下级直接继承该类型,1-占成，2-分红，经营者，子帐以及会员的该字段都为null
export const ACCOUNT_TYPE = {
  1: 'PT',
  2: 'dividend'
}

export const BANK_LIST = {
  'ABC': '中国农业银行',
  'BOC': '中国银行',
  'BOCOM': '交通银行',
  'CCB': '中国建设银行',
  'ICBC': '中国工商银行',
  'PSBC': '中国邮政储蓄银行',
  'CMB': '招商银行',
  'SPDB': '浦发银行',
  'CEB': '中国光大银行',
  'CITIC': '中信银行',
  'PAB': '平安银行',
  'CMBC': '中国民生银行',
  'HXB': '华夏银行',
  'CGB': '广发银行',
  'BOB': '北京银行',
  'BOS': '上海银行',
  'CIB': '兴业银行'
}

// 入款状态
export const DEPOSIT_STATUS = {
  1: '发起',
  2: '取消',
  3: '待审核',
  4: '审核失败',
  5: '审核通过'
}

// 入款状态
export const WITHDRAW_SUBTYPE = {
  1: '用户提款',
  2: '人工提取'
}

// 出款状态
export const WITHDRAW_STATUS = {
  1: '等待审核',
  2: '取消',
  3: '审核通过',
  4: '审核不通过',
  5: '锁住',
  // 6: '拒绝出款',
  7: '已到账',
  8: '出款失败'
}

// 出款状态
export const DEPOSIT_TYPE = {
  1: '用户存款',
  6: '资金转入',
  10: '快捷支付',
  11: '人工存款'
}

export const TRAN_SUB_TYPE = {
  1: '用户存款',
  2: '用户提款',
  4: '退水',
  5: '交保险金',
  6: '资金转入',
  7: '资金转出',
  8: '游戏余额转到平台',
  9: '游戏充值',
  10: '快捷支付',
  11: '人工存款',
  12: '人工提款',
  13: '日工资',
  14: '佣金',
  15: '分红',
  16: '活动奖励',
  17: '用户提款发起',
  18: '用户提款退回',
  19: '人工提款资金冻结',
  20: '人工提款资金解冻',
  21: '提款手续费',
  22: '游戏资金冻结',
  23: '游戏资金解冻',
  24: '人工游戏余额转到平台',
  25: '人工平台余额转到游戏',
  26: '人工转账游戏资金冻结',
  27: '人工转账游戏资金解冻'
}

export const REPORT_STATUS = {
  1: '待审核',
  2: '已审核',
  3: '已入账',
  4: '取消',
  5: '已累计'
}

// 银行卡功能,0为存款功能，1为出款功能
export const BANK_FUNCTION_TYPE = function () {
  return {
    '1': main.$t('bank.functionCharge'),
    '2': main.$t('bank.functionPayout')
  }
}
