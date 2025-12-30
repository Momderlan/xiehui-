// pages/member/member.js
const app = getApp()
const { memberInfo, memberLevels } = require('../../utils/mock')
const util = require('../../utils/util')
const { memberApi } = require('../../utils/api')

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
    // 加载会员等级列表
    memberApi.getLevels().then(levels => {
      this.setData({
        memberLevels: levels
      })
      console.log('会员等级加载成功', levels)
    }).catch(err => {
      console.error('会员等级加载失败', err)
      // 使用mock数据作为降级方案
      this.setData({
        memberLevels: memberLevels
      })
    })

    // 加载当前会员信息
    memberApi.getMemberInfo().then(data => {
      if (data && data.id) {
        // 用户已是会员
        this.setData({
          memberInfo: data,
          hasMember: true
        })
        console.log('会员信息加载成功', data)
      } else {
        // 用户不是会员
        this.setData({
          memberInfo: null,
          hasMember: false
        })
      }
    }).catch(err => {
      console.error('会员信息加载失败', err)
      // 可能是未开通会员
      this.setData({
        memberInfo: null,
        hasMember: false
      })
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