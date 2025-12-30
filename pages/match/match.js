// pages/match/match.js
const app = getApp()
const { matchList } = require('../../utils/mock')
const util = require('../../utils/util')
const { matchApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    matchList: [], // 赛事列表数据
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
    this.loadMatchList()
  },

  /**
   * 加载赛事列表数据
   */
  loadMatchList: function (isRefresh = false) {
    // 如果是刷新，重置页码
    if (isRefresh) {
      this.setData({
        page: 1,
        matchList: [],
        hasMore: true
      })
    }

    // 如果正在加载或没有更多数据，则返回
    if (this.data.loading || !this.data.hasMore) {
      return
    }

    this.setData({ loading: true })

    // 从服务器获取赛事列表
    matchApi.getList({
      page: this.data.page,
      size: this.data.size,
      status: '' // 可以根据需要筛选状态
    }).then(data => {
      const { records, total, current } = data
      
      // 转换数据格式以适配现有UI
      const matches = records.map(item => ({
        id: item.id,
        name: item.matchName,
        type: item.matchType,
        time: item.startTime,
        location: item.location,
        participants: `${item.currentParticipants}/${item.maxParticipants}`,
        fee: item.registrationFee,
        status: this.getStatusText(item.status),
        statusCode: item.status,
        image: item.coverImage || '/images/临时logo.png'
      }))

      // 合并数据
      const newList = isRefresh ? matches : [...this.data.matchList, ...matches]
      
      this.setData({
        matchList: newList,
        total: total,
        page: current + 1,
        hasMore: newList.length < total,
        loading: false
      })

      console.log('赛事列表加载成功', matches)
    }).catch(err => {
      console.error('赛事列表加载失败', err)
      this.setData({ loading: false })
      
      // 加载失败时使用mock数据作为降级方案
      if (isRefresh || this.data.matchList.length === 0) {
        this.setData({
          matchList: matchList,
          hasMore: false
        })
      }
    })
  },

  /**
   * 获取状态文本
   */
  getStatusText: function(status) {
    const statusMap = {
      0: '未开始',
      1: '报名中',
      2: '进行中',
      3: '已结束'
    }
    return statusMap[status] || '未知'
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
    this.loadMatchList(true)
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多数据
    this.loadMatchList(false)
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