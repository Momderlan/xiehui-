// 网络请求封装
const BASE_URL = 'http://118.24.104.64:8080' // 基础URL - 后端服务器地址

/**
 * 封装的请求方法
 * @param {Object} options 请求配置
 * @param {String} options.url 请求地址
 * @param {String} options.method 请求方法，默认GET
 * @param {Object} options.data 请求参数
 * @param {Boolean} options.needAuth 是否需要认证，默认true
 * @param {Boolean} options.showLoading 是否显示加载提示，默认true
 * @return {Promise} Promise对象
 */
const request = (options) => {
  const {
    url,
    method = 'GET',
    data = {},
    needAuth = true,
    showLoading = true
  } = options

  // 显示加载提示
  if (showLoading) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })
  }

  return new Promise((resolve, reject) => {
    // 构建请求头
    const header = {
      'content-type': 'application/json'
    }

    // 如果需要认证，添加Token（只有当token存在且非空时才添加）
    if (needAuth) {
      const token = wx.getStorageSync('token')
      // 确保token存在且不是空字符串
      if (token && token.trim() !== '') {
        header['Authorization'] = `Bearer ${token}`
      }
    }

    // 发起请求
    wx.request({
      url: BASE_URL + url,
      method,
      data,
      header,
      success: (res) => {
        // 隐藏加载提示
        if (showLoading) {
          wx.hideLoading()
        }

        // 处理响应
        if (res.statusCode === 200) {
          const { code, message, data } = res.data

          if (code === 200) {
            // 请求成功
            resolve(data)
          } else if (code === 401) {
            // 未授权，清除token并跳转到登录
            wx.removeStorageSync('token')
            wx.removeStorageSync('userInfo')
            wx.showToast({
              title: '请先登录',
              icon: 'none',
              duration: 2000
            })
            reject(new Error(message || '未授权'))
          } else {
            // 其他错误
            wx.showToast({
              title: message || '请求失败',
              icon: 'none',
              duration: 2000
            })
            reject(new Error(message || '请求失败'))
          }
        } else if (res.statusCode === 401) {
          // HTTP 401 未授权
          if (showLoading) {
            wx.hideLoading()
          }
          wx.removeStorageSync('token')
          wx.removeStorageSync('userInfo')
          wx.showToast({
            title: '登录已过期，请重新登录',
            icon: 'none',
            duration: 2000
          })
          reject(new Error('未授权'))
        } else if (res.statusCode === 403) {
          // HTTP 403 权限不足
          if (showLoading) {
            wx.hideLoading()
          }
          wx.showToast({
            title: '权限不足',
            icon: 'none',
            duration: 2000
          })
          reject(new Error('权限不足'))
        } else {
          // 其他HTTP状态码错误
          if (showLoading) {
            wx.hideLoading()
          }
          wx.showToast({
            title: `请求失败(${res.statusCode})`,
            icon: 'none',
            duration: 2000
          })
          reject(new Error(`HTTP ${res.statusCode}`))
        }
      },
      fail: (err) => {
        // 隐藏加载提示
        if (showLoading) {
          wx.hideLoading()
        }

        // 网络错误
        wx.showToast({
          title: '网络请求失败',
          icon: 'none',
          duration: 2000
        })
        reject(err)
      }
    })
  })
}

/**
 * GET请求
 */
const get = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'GET',
    data,
    ...options
  })
}

/**
 * POST请求
 */
const post = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'POST',
    data,
    ...options
  })
}

/**
 * PUT请求
 */
const put = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'PUT',
    data,
    ...options
  })
}

/**
 * DELETE请求
 */
const del = (url, data = {}, options = {}) => {
  return request({
    url,
    method: 'DELETE',
    data,
    ...options
  })
}

module.exports = {
  request,
  get,
  post,
  put,
  del,
  BASE_URL
}