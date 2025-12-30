// pages/member-info/member-info.js
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
    memberRecords: [], // 会员购买记录
    themeColor: app.globalData.themeColor, // 主题色
    page: 1, // 当前页码
    size: 10, // 每页数量
    hasMore: true, // 是否还有更多数据
    loading: false // 是否正在加载
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMemberInfo()
  },

  /**
   * 加载会员信息
   */
  loadMemberInfo: function () {
    // 加载当前会员信息
    memberApi.getMemberInfo().then(data => {
      this.setData({
        memberInfo: data
      })
      console.log('会员信息加载成功', data)
    }).catch(err => {
      console.error('会员信息加载失败', err)
      // 使用mock数据作为降级方案
      this.setData({
        memberInfo: memberInfo
      })
    })

    // 加载会员购买记录
    this.loadMemberRecords()
  },

  /**
   * 加载会员购买记录
   */
  loadMemberRecords: function(isRefresh = false) {
    // 如果是刷新，重置页码
    if (isRefresh) {
      this.setData({
        page: 1,
        memberRecords: [],
        hasMore: true
      })
    }

    // 如果正在加载或没有更多数据，则返回
    if (this.data.loading || !this.data.hasMore) {
      return
    }

    this.setData({ loading: true })

    memberApi.getRecords({
      page: this.data.page,
      size: this.data.size
    }).then(data => {
      const { records, total, current } = data
      
      // 合并数据
      const newList = isRefresh ? records : [...this.data.memberRecords, ...records]
      
      this.setData({
        memberRecords: newList,
        page: current + 1,
        hasMore: newList.length < total,
        loading: false
      })

      console.log('会员购买记录加载成功', records)
    }).catch(err => {
      console.error('会员购买记录加载失败', err)
      this.setData({ loading: false })
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
    this.loadMemberInfo()
    this.loadMemberRecords(true)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多记录
    this.loadMemberRecords(false)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '会员信息',
      path: '/pages/member-info/member-info'
    }
  }
})