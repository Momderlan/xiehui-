// pages/index/index.js
const app = getApp()
const { swiperData } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [], // 轮播图数据
    indicatorDots: true, // 是否显示面板指示点
    autoplay: true, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 500, // 滑动动画时长
    circular: true, // 是否采用衔接滑动
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSwiperData()
  },

  /**
   * 加载轮播图数据
   */
  loadSwiperData: function () {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      swiperData: swiperData
    })
  },

  /**
   * 轮播图点击事件
   */
  onSwiperItemTap: function (e) {
    const { id } = e.currentTarget.dataset
    const item = this.data.swiperData.find(item => item.id === id)
    if (item && item.link) {
      wx.navigateTo({
        url: item.link
      })
    }
  },

  /**
   * 功能按钮点击事件
   */
  onFunctionBtnTap: function (e) {
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
      default:
        break
    }
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
    this.loadSwiperData()
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
      title: '小程序首页',
      path: '/pages/index/index'
    }
  }
})