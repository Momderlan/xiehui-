// pages/member/member.js
const app = getApp()
const { memberInfo, memberLevels } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberInfo: null, // 会员信息
    memberLevels: [], // 会员等级列表
    hasMember: false, // 是否已是会员
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMemberData()
  },

  /**
   * 加载会员数据
   */
  loadMemberData: function () {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      memberLevels: memberLevels,
      // 模拟用户已是会员
      memberInfo: memberInfo,
      hasMember: true
    })
  },

  /**
   * 会员申请按钮点击事件
   */
  onApplyTap: function () {
    wx.navigateTo({
      url: '/pages/member-apply/member-apply'
    })
  },

  /**
   * 会员信息查看按钮点击事件
   */
  onViewInfoTap: function () {
    wx.navigateTo({
      url: '/pages/member-info/member-info'
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
    // 每次显示页面时重新加载数据，以便获取最新状态
    this.loadMemberData()
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
    this.loadMemberData()
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
      title: '会员专区',
      path: '/pages/member/member'
    }
  }
})