// 工具函数

/**
 * 格式化时间
 * @param {Date} date 日期对象
 * @param {String} format 格式化模式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @return {String} 格式化后的时间字符串
 */
const formatTime = (date, format = 'YYYY-MM-DD HH:mm:ss') => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : `0${n}`
  }

  format = format.replace('YYYY', year)
  format = format.replace('MM', formatNumber(month))
  format = format.replace('DD', formatNumber(day))
  format = format.replace('HH', formatNumber(hour))
  format = format.replace('mm', formatNumber(minute))
  format = format.replace('ss', formatNumber(second))

  return format
}

/**
 * 获取当前日期
 * @param {String} format 格式化模式
 * @return {String} 格式化后的当前日期
 */
const getCurrentDate = (format = 'YYYY-MM-DD') => {
  return formatTime(new Date(), format)
}

/**
 * 计算日期差
 * @param {String|Date} date1 日期1
 * @param {String|Date} date2 日期2，默认为当前日期
 * @return {Number} 相差的天数
 */
const dateDiff = (date1, date2 = new Date()) => {
  const d1 = typeof date1 === 'string' ? new Date(date1) : date1
  const d2 = typeof date2 === 'string' ? new Date(date2) : date2
  const diffTime = Math.abs(d2 - d1)
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

/**
 * 检查日期是否过期
 * @param {String|Date} date 需要检查的日期
 * @return {Boolean} 是否已过期
 */
const isExpired = (date) => {
  const today = new Date()
  const checkDate = typeof date === 'string' ? new Date(date) : date
  return today > checkDate
}

/**
 * 获取URL参数
 * @param {String} name 参数名
 * @param {String} url URL字符串，默认为当前页面URL
 * @return {String|null} 参数值
 */
const getUrlParam = (name, url) => {
  if (!url) {
    const pages = getCurrentPages()
    const currentPage = pages[pages.length - 1]
    url = currentPage.route + '?' + currentPage.options
  }
  const reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  const r = url.split('?')[1].match(reg)
  if (r != null) return decodeURIComponent(r[2])
  return null
}

/**
 * 显示提示信息
 * @param {String} title 提示内容
 * @param {String} icon 图标类型，可选值为 'success', 'error', 'loading', 'none'
 * @param {Number} duration 提示显示时间，单位为毫秒
 */
const showToast = (title, icon = 'none', duration = 2000) => {
  wx.showToast({
    title,
    icon,
    duration
  })
}

/**
 * 显示加载提示
 * @param {String} title 提示内容
 */
const showLoading = (title = '加载中...') => {
  wx.showLoading({
    title,
    mask: true
  })
}

/**
 * 隐藏加载提示
 */
const hideLoading = () => {
  wx.hideLoading()
}

/**
 * 显示确认对话框
 * @param {String} title 标题
 * @param {String} content 内容
 * @param {Boolean} showCancel 是否显示取消按钮
 * @return {Promise} Promise对象
 */
const showModal = (title, content, showCancel = true) => {
  return new Promise((resolve, reject) => {
    wx.showModal({
      title,
      content,
      showCancel,
      success(res) {
        if (res.confirm) {
          resolve(true)
        } else if (res.cancel) {
          resolve(false)
        }
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 * 页面跳转
 * @param {String} url 目标页面URL
 * @param {Boolean} redirect 是否重定向
 */
const navigateTo = (url, redirect = false) => {
  if (redirect) {
    wx.redirectTo({
      url
    })
  } else {
    wx.navigateTo({
      url
    })
  }
}

/**
 * 返回上一页
 * @param {Number} delta 返回的页面数，默认为1
 */
const navigateBack = (delta = 1) => {
  wx.navigateBack({
    delta
  })
}

/**
 * 切换TabBar页面
 * @param {String} url 目标TabBar页面URL
 */
const switchTab = (url) => {
  wx.switchTab({
    url
  })
}

/**
 * 检查表单数据是否为空
 * @param {Object} data 表单数据对象
 * @param {Array} requiredFields 必填字段数组
 * @return {Boolean} 是否通过验证
 */
const validateForm = (data, requiredFields) => {
  for (let field of requiredFields) {
    if (!data[field] || data[field].trim() === '') {
      return false
    }
  }
  return true
}

/**
 * 手机号码验证
 * @param {String} phone 手机号码
 * @return {Boolean} 是否是有效的手机号码
 */
const isValidPhone = (phone) => {
  const reg = /^1[3-9]\d{9}$/
  return reg.test(phone)
}

/**
 * 邮箱验证
 * @param {String} email 邮箱地址
 * @return {Boolean} 是否是有效的邮箱地址
 */
const isValidEmail = (email) => {
  const reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
  return reg.test(email)
}

/**
 * 身份证号验证
 * @param {String} idCard 身份证号
 * @return {Boolean} 是否是有效的身份证号
 */
const isValidIdCard = (idCard) => {
  const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(idCard)
}

module.exports = {
  formatTime,
  getCurrentDate,
  dateDiff,
  isExpired,
  getUrlParam,
  showToast,
  showLoading,
  hideLoading,
  showModal,
  navigateTo,
  navigateBack,
  switchTab,
  validateForm,
  isValidPhone,
  isValidEmail,
  isValidIdCard
}