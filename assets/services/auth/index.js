import queryString from '../../tools/query-string'

const KOALA_AUTOINFO_KEY = 'kllc_autoInfo'
const KOALA_MOBILE_KEY = 'kllc_mobile'  // 兼容 sails 微信自动登录，Todo: Remove this, Should not save password to client
const KOALA_PW_KEY = 'kllc_pw'  // 兼容 sails 微信自动登录，Todo: Remove this, Should not save password to client
const KOALA_LOGIN_CODE_KEY = 'kllc_loginByCode' // 兼容 sails 验证码登录

let query = null
function parseLocationQuery (forceParsed = false) {
  if (!query || forceParsed) {
    query = queryString.parse(location.search)
  }
  return query
}

function saveUserId (ud) {
  saveUserInfo({
    ud
  })
}

function saveUserToken (aToken) {
  saveUserInfo({
    aToken
  })
}

function saveUserSign (sign) {
  saveUserInfo({
    sign
  })
}

function saveUserTs (ts) {
  saveUserInfo({
    ts
  })
}

function saveUserInfo ({ud, aToken, sign, ts}) {
  let authInfo = getLocalUserInfo();
  localStorage.setItem(KOALA_AUTOINFO_KEY, JSON.stringify({
    ...authInfo,
    ...{
      ud,
      aToken,
      sign,
      ts
    }
  }))
}

function saveLoginInfo ({phone, pwd}) {
  localStorage.setItem(KOALA_MOBILE_KEY, JSON.stringify(phone))
  localStorage.setItem(KOALA_PW_KEY, JSON.stringify(pwd))
}

function getLoginInfo () {
  let phone = localStorage.getItem(KOALA_MOBILE_KEY)
  let password = localStorage.getItem(KOALA_PW_KEY)
  try {
    phone = phone && JSON.parse(phone)
    password = password && JSON.parse(password)
  } catch (err) {
    // ingore err
  }
  return {
    phone,
    password
  }
}

function getUserId () {
  let {
    ud
  } = parseLocationQuery()

  if (!ud) {
    ud = (getLocalUserInfo() || {}).ud
  }

  return ud
}

function getUserToken () {
  let {
    aToken
  } = parseLocationQuery()

  if (!aToken) {
    aToken = (getLocalUserInfo() || {}).aToken
  }

  return aToken
}

function getUserSign () {
  let {
    sign
  } = parseLocationQuery()

  if (!sign) {
    sign = (getLocalUserInfo() || {}).sign
  }

  return sign
}

function getUserTs () {
  let {
    ts
  } = parseLocationQuery()

  if (!ts) {
    ts = (getLocalUserInfo() || {}).ts
  }

  return ts
}

function getLocalUserInfo () {
  let authInfo = localStorage.getItem(KOALA_AUTOINFO_KEY)
  try {
    authInfo = authInfo && JSON.parse(authInfo)
  } catch (err) {
    // ingore err
  }
  return authInfo || null
}

function getUserInfo () {
  const parsedQuery = parseLocationQuery()
  const localUserInfo = getLocalUserInfo()

  let {
    ud,
    aToken,
    sign,
    ts
  } = {
    ...localUserInfo,
    ...parsedQuery
  }

  return {
    ud,
    aToken,
    sign,
    ts
  }
}

function removeUserInfo () {
  localStorage.removeItem(KOALA_AUTOINFO_KEY)
  localStorage.removeItem(KOALA_PW_KEY)
  localStorage.removeItem(KOALA_LOGIN_CODE_KEY)
}

export {
  saveUserId,
  saveUserToken,
  saveUserSign,
  saveUserTs,
  saveUserInfo,
  saveLoginInfo,
  getLoginInfo,
  getUserId,
  getUserToken,
  getUserSign,
  getUserTs,
  getUserInfo,
  removeUserInfo
}