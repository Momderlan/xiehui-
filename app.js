// app.js
const { authApi } = require('./utils/api')

App({
  onLaunch: function () {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查登录状态
    this.checkLoginStatus()
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token')
    if (token) {
      // 已有token，获取用户信息
      this.getUserInfo()
    }
    // 不再自动执行微信登录，由用户主动选择登录方式
  },

  /**
   * 账号密码登录
   */
  accountLogin: function(username, password) {
    return authApi.login({
      username: username,
      password: password
    }).then(data => {
      // 保存token和用户信息
      wx.setStorageSync('token', data.token)
      if (data.userId) {
        wx.setStorageSync('userId', data.userId)
      }
      this.globalData.userInfo = data
      
      console.log('登录成功', data)
      return data
    })
  },


  /**
   * 微信登录（保留为可选功能）
   */
  wxLogin: function() {
    return new Promise((resolve, reject) => {
      wx.login({
        success: (res) => {
          if (res.code) {
            // 获取用户信息
            wx.getUserProfile({
              desc: '用于完善用户资料',
              success: (userRes) => {
                const { nickName, avatarUrl } = userRes.userInfo
                
                // 调用后端微信登录接口
                authApi.wechatLogin({
                  code: res.code,
                  nickName: nickName,
                  avatarUrl: avatarUrl
                }).then(data => {
                  // 保存token和用户信息
                  wx.setStorageSync('token', data.token)
                  if (data.userInfo) {
                    wx.setStorageSync('userInfo', data.userInfo)
                    this.globalData.userInfo = data.userInfo
                  }
                  
                  console.log('微信登录成功', data)
                  resolve(data)
                }).catch(err => {
                  console.error('微信登录失败', err)
                  reject(err)
                })
              },
              fail: (err) => {
                console.log('用户拒绝授权', err)
                reject(err)
              }
            })
          } else {
            console.error('微信登录失败', res.errMsg)
            reject(new Error(res.errMsg))
          }
        },
        fail: (err) => {
          console.error('wx.login调用失败', err)
          reject(err)
        }
      })
    })
  },

  /**
   * 获取用户信息
   */
  getUserInfo: function() {
    authApi.getUserInfo().then(data => {
      this.globalData.userInfo = data
      wx.setStorageSync('userInfo', data)
    }).catch(err => {
      console.error('获取用户信息失败', err)
      // token可能已过期，清除并重新登录
      wx.removeStorageSync('token')
      wx.removeStorageSync('userInfo')
      this.wxLogin()
    })
  },

  /**
   * 退出登录
   */
  logout: function() {
    wx.removeStorageSync('token')
    wx.removeStorageSync('userInfo')
    this.globalData.userInfo = null
    wx.showToast({
      title: '已退出登录',
      icon: 'success'
    })
  },

  globalData: {
    userInfo: null,
    themeColor: '#1E3A8A', // 主题色 - 深靛蓝
    accentColor: '#F97316', // 强调色 - 橙色
    secondaryColor: '#14B8A6' // 辅助色 - 青绿色
  }
})