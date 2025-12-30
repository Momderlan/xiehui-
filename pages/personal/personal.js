// pages/personal/personal.js
const app = getApp()
const { personalInfo } = require('../../utils/mock')
const util = require('../../utils/util')
const { authApi, matchApi, clubApi, userApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 用户信息
    myMatches: [], // 我的赛事报名
    myClubs: [], // 我的俱乐部
    trainingApplications: [], // 培训申请记录
    themeColor: app.globalData.themeColor, // 主题色
    showEditForm: false, // 是否显示编辑表单
    editFormData: {
      username: '',
      phone: '',
      realName: '',
      gender: 1
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 检查登录状态
    this.checkLoginStatus()
  },

  /**
   * 检查登录状态
   */
  checkLoginStatus: function() {
    const token = wx.getStorageSync('token')
    if (!token) {
      // 未登录，显示提示并引导登录
      wx.showModal({
        title: '提示',
        content: '您还未登录，请先登录',
        confirmText: '去登录',
        cancelText: '稍后',
        success: (res) => {
          if (res.confirm) {
            wx.navigateTo({
              url: '/pages/login/login'
            })
          }
        }
      })
      return false
    }
    // 已登录，加载数据
    this.loadPersonalData()
    return true
  },

  /**
   * 加载个人中心数据
   */
  loadPersonalData: function () {
    // 加载用户信息
    this.loadUserInfo()
    
    // 加载我的赛事报名
    this.loadMyMatches()
    
    // 加载我的俱乐部
    this.loadMyClubs()
    
    // 加载培训申请记录
    this.loadTrainingApplications()
  },

  /**
   * 加载用户信息
   */
  loadUserInfo: function() {
    authApi.getUserInfo().then(data => {
      this.setData({
        userInfo: data,
        editFormData: {
          username: data.username || '',
          phone: data.phone || '',
          realName: data.realName || '',
          gender: data.gender || 1
        }
      })
      
      // 同步到全局和本地存储
      app.globalData.userInfo = data
      wx.setStorageSync('userInfo', data)
      
      console.log('用户信息加载成功', data)
    }).catch(err => {
      console.error('用户信息加载失败', err)
      // 使用本地存储的用户信息
      const localUserInfo = wx.getStorageSync('userInfo')
      if (localUserInfo) {
        this.setData({
          userInfo: localUserInfo
        })
      }
    })
  },

  /**
   * 加载我的赛事报名
   */
  loadMyMatches: function() {
    matchApi.getMyRegistrations({
      page: 1,
      size: 10
    }).then(data => {
      const matches = data.records || []
      this.setData({
        myMatches: matches
      })
      console.log('我的赛事报名加载成功', matches)
    }).catch(err => {
      console.error('我的赛事报名加载失败', err)
      // 使用mock数据作为降级方案
      this.setData({
        myMatches: personalInfo.myMatches || []
      })
    })
  },

  /**
   * 加载我的俱乐部
   */
  loadMyClubs: function() {
    clubApi.getMyClubs().then(data => {
      this.setData({
        myClubs: data || []
      })
      console.log('我的俱乐部加载成功', data)
    }).catch(err => {
      console.error('我的俱乐部加载失败', err)
    })
  },

  /**
   * 加载培训申请记录
   */
  loadTrainingApplications: function() {
    userApi.getTrainingApplications({
      page: 1,
      size: 5
    }).then(data => {
      const applications = data.records || []
      this.setData({
        trainingApplications: applications
      })
      console.log('培训申请记录加载成功', applications)
    }).catch(err => {
      console.error('培训申请记录加载失败', err)
    })
  },

  /**
   * 显示编辑表单
   */
  showEditUserInfo: function() {
    this.setData({
      showEditForm: true
    })
  },

  /**
   * 隐藏编辑表单
   */
  hideEditForm: function() {
    this.setData({
      showEditForm: false
    })
  },

  /**
   * 表单输入事件
   */
  onInput: function(e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`editFormData.${field}`]: value
    })
  },

  /**
   * 性别选择事件
   */
  onGenderChange: function(e) {
    const gender = parseInt(e.detail.value)
    this.setData({
      'editFormData.gender': gender
    })
  },

  /**
   * 提交用户信息更新
   */
  onSubmitUserInfo: function() {
    const { editFormData } = this.data
    
    // 表单验证
    if (!editFormData.username.trim()) {
      util.showToast('请输入用户名')
      return
    }
    
    if (editFormData.phone && !util.isValidPhone(editFormData.phone)) {
      util.showToast('手机号格式不正确')
      return
    }
    
    util.showLoading('保存中...')
    
    authApi.updateUserInfo(editFormData).then(() => {
      util.hideLoading()
      util.showToast('保存成功', 'success')
      
      // 隐藏表单并重新加载用户信息
      this.setData({
        showEditForm: false
      })
      
      setTimeout(() => {
        this.loadUserInfo()
      }, 500)
    }).catch(err => {
      util.hideLoading()
      console.error('用户信息更新失败', err)
    })
  },

  /**
   * 提交培训申请
   */
  onSubmitTrainingApplication: function() {
    wx.navigateTo({
      url: '/pages/training-apply/training-apply'
    })
    // 或者直接在这里弹出表单
    util.showToast('培训申请功能待完善')
  },

  /**
   * 退出登录
   */
  onLogout: function() {
    util.showModal('确认退出', '您确定要退出登录吗？', true).then(confirmed => {
      if (confirmed) {
        app.logout()
        // 清空页面数据
        this.setData({
          userInfo: null,
          myMatches: [],
          myClubs: [],
          trainingApplications: []
        })
        // 跳转到登录页
        wx.navigateTo({
          url: '/pages/login/login'
        })
      }
    })
  },


  /**
   * 我的赛事点击事件
   */
  onMyMatchTap: function (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // 每次显示页面时检查登录状态并加载数据
    this.checkLoginStatus()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 下拉刷新，重新加载数据
    this.loadPersonalData()
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '个人中心',
      path: '/pages/personal/personal'
    }
  }
})