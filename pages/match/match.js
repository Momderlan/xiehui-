// pages/match/match.js
const app = getApp()
const { matchList } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    matchList: [], // 赛事列表数据
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMatchList()
  },

  /**
   * 加载赛事列表数据
   */
  loadMatchList: function () {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      matchList: matchList
    })
  },

  /**
   * 查看详情按钮点击事件
   */
  onViewDetailTap: function (e) {
    const { id } = e.currentTarget.dataset
    wx.navigateTo({
      url: `/pages/match-detail/match-detail?id=${id}`
    })
  },

  /**
   * 返回按钮点击事件
   */
  onBackTap: function () {
    wx.navigateBack()
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
    this.loadMatchList()
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
      title: '赛事报名',
      path: '/pages/match/match'
    }
  }
})