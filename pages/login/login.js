// pages/login/login.js
const { authApi } = require('../../utils/api')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    isLoginMode: true, // true为登录模式，false为注册模式
    loginForm: {
      username: '',
      password: ''
    },
    registerForm: {
      username: '',
      password: '',
      confirmPassword: '',
      phone: '',
      realName: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 检查是否已登录
    const token = wx.getStorageSync('token')
    if (token) {
      // 已登录，跳转到个人中心
      wx.switchTab({
        url: '/pages/personal/personal'
      })
    }
  },

  /**
   * 登录表单输入
   */
  onLoginInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`loginForm.${field}`]: e.detail.value
    })
  },

  /**
   * 账号密码登录
   */
  onLogin() {
    const { username, password } = this.data.loginForm

    // 表单验证
    if (!username.trim()) {
      wx.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }

    if (!password) {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '登录中...',
      mask: true
    })

    authApi.login({
      username: username.trim(),
      password: password
    }).then(data => {
      wx.hideLoading()
      
      // 保存token和用户信息
      wx.setStorageSync('token', data.token)
      if (data.userId) {
        wx.setStorageSync('userId', data.userId)
      }
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转，让用户看到成功提示
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/personal/personal'
        })
      }, 1500)
    }).catch(err => {
      wx.hideLoading()
      console.error('登录失败', err)
      wx.showToast({
        title: err.message || '登录失败',
        icon: 'none'
      })
    })
  },

  /**
   * 微信快捷登录
   */
  onWechatLogin() {
    wx.showLoading({
      title: '登录中...',
      mask: true
    })

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
                wx.hideLoading()
                
                // 保存token和用户信息
                wx.setStorageSync('token', data.token)
                if (data.userInfo) {
                  wx.setStorageSync('userInfo', data.userInfo)
                }
                
                wx.showToast({
                  title: '登录成功',
                  icon: 'success',
                  duration: 1500
                })

                setTimeout(() => {
                  wx.switchTab({
                    url: '/pages/personal/personal'
                  })
                }, 1500)
              }).catch(err => {
                wx.hideLoading()
                console.error('微信登录失败', err)
                wx.showToast({
                  title: err.message || '登录失败',
                  icon: 'none'
                })
              })
            },
            fail: (err) => {
              wx.hideLoading()
              console.log('用户拒绝授权', err)
              wx.showToast({
                title: '需要授权才能登录',
                icon: 'none'
              })
            }
          })
        } else {
          wx.hideLoading()
          console.error('微信登录失败', res.errMsg)
          wx.showToast({
            title: '微信登录失败',
            icon: 'none'
          })
        }
      },
      fail: (err) => {
        wx.hideLoading()
        console.error('wx.login调用失败', err)
        wx.showToast({
          title: '登录失败，请重试',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 切换登录/注册模式
   */
  toggleMode() {
    this.setData({
      isLoginMode: !this.data.isLoginMode
    })
  },

  /**
   * 注册表单输入
   */
  onRegisterInput(e) {
    const { field } = e.currentTarget.dataset
    this.setData({
      [`registerForm.${field}`]: e.detail.value
    })
  },

  /**
   * 用户注册
   */
  onRegister() {
    const { username, password, confirmPassword, phone } = this.data.registerForm

    // 表单验证
    if (!username.trim() || username.length < 3) {
      wx.showToast({
        title: '用户名至少3个字符',
        icon: 'none'
      })
      return
    }

    if (!password || password.length < 6) {
      wx.showToast({
        title: '密码至少6个字符',
        icon: 'none'
      })
      return
    }

    if (password !== confirmPassword) {
      wx.showToast({
        title: '两次密码输入不一致',
        icon: 'none'
      })
      return
    }

    if (phone && !/^1[3-9]\d{9}$/.test(phone)) {
      wx.showToast({
        title: '手机号格式不正确',
        icon: 'none'
      })
      return
    }

    wx.showLoading({
      title: '注册中...',
      mask: true
    })

    const registerData = {
      username: username.trim(),
      password: password
    }

    // 只有当手机号不为空时才添加到注册数据中
    if (phone) {
      registerData.phone = phone
    }

    authApi.register(registerData).then(data => {
      wx.hideLoading()
      
      // 保存token和用户信息
      wx.setStorageSync('token', data.token)
      if (data.userId) {
        wx.setStorageSync('userId', data.userId)
      }
      
      wx.showToast({
        title: '注册成功',
        icon: 'success',
        duration: 1500
      })

      // 延迟跳转到个人中心
      setTimeout(() => {
        wx.switchTab({
          url: '/pages/personal/personal'
        })
      }, 1500)
    }).catch(err => {
      wx.hideLoading()
      console.error('注册失败', err)
      wx.showToast({
        title: err.message || '注册失败',
        icon: 'none'
      })
    })
  }
})