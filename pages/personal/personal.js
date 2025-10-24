// pages/personal/personal.js
const app = getApp()
const { personalInfo } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null, // 用户信息
    myMatches: [], // 我的赛事
    myClub: null, // 我的俱乐部
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadPersonalData()
  },

  /**
   * 加载个人中心数据
   */
  loadPersonalData: function () {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      userInfo: personalInfo.userInfo,
      myMatches: personalInfo.myMatches,
      myClub: personalInfo.myClub
    })
  },

  /**
   * 功能项点击事件
   */
  onFunctionTap: function (e) {
    const { type } = e.currentTarget.dataset
    
    switch (type) {
      case 'member':
        // 跳转到会员专区
        wx.navigateTo({
          url: '/pages/member/member'
        })
        break
      case 'match':
        // 跳转到赛事报名
        wx.navigateTo({
          url: '/pages/match/match'
        })
        break
      case 'club':
        // 跳转到俱乐部申请
        wx.navigateTo({
          url: '/pages/club-apply/club-apply'
        })
        break
      case 'notification':
        // 跳转到官方通知
        wx.switchTab({
          url: '/pages/notification/notification'
        })
        break
      case 'setting':
        // 设置功能
        util.showToast('设置功能待开发')
        break
      default:
        break
    }
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
    // 每次显示页面时重新加载数据
    this.loadPersonalData()
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