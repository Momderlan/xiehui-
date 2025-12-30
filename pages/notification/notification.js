// pages/notification/notification.js
const app = getApp()
const { notificationList } = require('../../utils/mock')
const util = require('../../utils/util')
const { notificationApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    notificationList: [], // 通知列表
    themeColor: app.globalData.themeColor, // 主题色
    page: 1, // 当前页码
    size: 10, // 每页数量
    total: 0, // 总数
    hasMore: true, // 是否还有更多数据
    loading: false // 是否正在加载
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
  loadNotificationList: function (isRefresh = false) {
    // 如果是刷新，重置页码
    if (isRefresh) {
      this.setData({
        page: 1,
        notificationList: [],
        hasMore: true
      })
    }

    // 如果正在加载或没有更多数据，则返回
    if (this.data.loading || !this.data.hasMore) {
      return
    }

    this.setData({ loading: true })

    // 从服务器获取通知列表
    notificationApi.getList({
      page: this.data.page,
      size: this.data.size,
      category: '' // 可以根据需要筛选类型
    }).then(data => {
      const { records, total, current } = data
      
      // 转换数据格式以适配现有UI
      const notifications = records.map(item => ({
        id: item.id,
        title: item.title,
        content: item.content,
        type: this.getTypeText(item.type),
        typeCode: item.type,
        time: item.publishTime,
        image: item.coverImage || '/images/临时logo.png',
        views: item.viewCount || 0
      }))

      // 合并数据
      const newList = isRefresh ? notifications : [...this.data.notificationList, ...notifications]
      
      this.setData({
        notificationList: newList,
        total: total,
        page: current + 1,
        hasMore: newList.length < total,
        loading: false
      })

      console.log('通知列表加载成功', notifications)
    }).catch(err => {
      console.error('通知列表加载失败', err)
      this.setData({ loading: false })
      
      // 加载失败时使用mock数据作为降级方案
      if (isRefresh || this.data.notificationList.length === 0) {
        this.setData({
          notificationList: notificationList,
          hasMore: false
        })
      }
    })
  },

  /**
   * 获取类型文本
   */
  getTypeText: function(type) {
    const typeMap = {
      0: '系统通知',
      1: '赛事通知',
      2: '俱乐部通知',
      3: '培训通知'
    }
    return typeMap[type] || '通知'
  },

  /**
   * 通知项点击事件
   */
  onNotificationTap: function (e) {
    const { id } = e.currentTarget.dataset
    
    // 查看通知详情
    this.viewNotificationDetail(id)
  },

  /**
   * 查看通知详情
   */
  viewNotificationDetail: function(id) {
    util.showLoading('加载中...')
    
    notificationApi.getDetail(id).then(data => {
      util.hideLoading()
      
      // 显示详情（这里简单使用模态框展示，实际项目中可以跳转到详情页面）
      wx.showModal({
        title: data.title,
        content: data.content,
        showCancel: false,
        confirmText: '知道了'
      })
      
      console.log('通知详情加载成功', data)
    }).catch(err => {
      util.hideLoading()
      console.error('通知详情加载失败', err)
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
    this.loadNotificationList(true)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多数据
    this.loadNotificationList(false)
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