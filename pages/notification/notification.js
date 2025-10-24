// pages/notification/notification.js
const app = getApp()
const { notificationList } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    notificationList: [], // 通知列表
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadNotificationList()
  },

  /**
   * 加载通知列表
   */
  loadNotificationList: function () {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      notificationList: notificationList
    })
  },

  /**
   * 通知项点击事件
   */
  onNotificationTap: function (e) {
    const { index } = e.currentTarget.dataset
    const notification = this.data.notificationList[index]
    
    // 跳转到通知详情页面（这里简单跳转到首页，实际项目中应该有详情页面）
    util.showToast('查看详情功能待开发')
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
    this.loadNotificationList()
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
      title: '官方通知',
      path: '/pages/notification/notification'
    }
  }
})