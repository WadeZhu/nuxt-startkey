export default {
  PRODUCT: {
    KOALAID: '549922452238c54e98b750bc',
    TIME12MID: '57845a0bc1f0d6ac6cd34372',
    TIME9MID: '57845a0bc1f0d6ac6cd34371',
    TIME6MID: '578459c4c1f0d6ac6cd34370',
    TIME3MID: '55c31e936f227ed922c508aa',
    TIME1MID: '561f663f6f227ed92298f30a',
    TIME2DID: '562eea0a9f2d4e7c9e378c0c',
    DS_TIME_ID: '5805c5e0ab693d39d281fdb6',
    NEW_USER_ID: '5f451cf620489d2430b3c724'
  },
  JUMPTYPE: {
    NOJUMP: -1, // 不做任何操作
    H5: 1, // H5
    HOME: 2, // 首页
    ASSETS: 3, // 投资列表页
    WABAO: 4, // 挖宝页
    USER_ASSET: 5, // 我的资产
    USER_ACTIVE: 6, // 开户
    INVEST: 7, // 购买页
    ASSETS_TRADE_ORIGINAL: 8, // 定期明细(目前没有)
    ASSETS_DETAIL_ORIGINAL: 9, // 定期详情(目前没有)
    RECHARGE: 10, // 充值页
    AUTOINVEST: 11, // 自动投标页面
    TOAST: 12, // 吐司提示
    VIP: 13 // VIP会员页面
  },
  ORDER_TYPE: {
    EXPAND: 1,
    // 代充值
    ALTERNATIVE_RECHARGE: 13,
    // 现金红包
    CASH: 17,
    // 充值
    RECHARGE: 11,
    WITHDRAW_NEW: -22,
    INVEST: 12,
    EARNING_SUBSIDY: 14, // 补贴利息增加
    EARNING_BONOUS: 15, // 加息利息增加
    EARNING_PRINCIPAL: 16, // 本金利息
    REPAYMENT: -19,  // 还款
    TIYANJIN: 20, // 体验金收益
    RATE_LIMIT: 21, // 加息券加息
    PRINCIPAL_SUBSIDY: 18, // 还款本金补贴
    TIME_CASH: 22 // 满减券
  },
  ORDER_STATUS: {
    READY: 0, // 准备中, 为请求购买/提现到银行卡，还没异步回调
    DONE: 1,
    UNFINISHED: 2,
    EXPIRE: 3,
    FAIL: -3
  },
  TICKET_TYPE: {
    // 体验金
    EXMONEY: 'exMoney',
    EXMONEY_DESC: '体验金',
    // 现金红包
    CASH: 'cash',
    CASH_DESC: '红包',
    // 加息券
    RATELIMIT: 'rateLimit',
    RATELIMIT_DESC: '加息券',
    // 满减券
    TIMECASH: 'timeCash',
    TIMECASH_DESC: '满减券'
  }
}
