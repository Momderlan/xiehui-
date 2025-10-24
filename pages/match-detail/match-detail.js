// pages/match-detail/match-detail.js
const app = getApp()
const { matchDetails } = require('../../utils/mock')
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    id: null, // 赛事ID
    matchDetail: null, // 赛事详情数据
    themeColor: app.globalData.themeColor, // 主题色
    isExpired: false, // 是否已过期
    isRegistered: false // 是否已报名
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    if (id) {
      this.setData({ id })
      this.loadMatchDetail(id)
    } else {
      util.showToast('参数错误')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  /**
   * 加载赛事详情数据
   */
  loadMatchDetail: function (id) {
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    const detail = matchDetails[id]
    if (detail) {
      // 检查是否已过期
      const isExpired = util.isExpired(detail.deadline)
      // 模拟检查是否已报名（实际项目中应从服务器获取）
      const isRegistered = false

      this.setData({
        matchDetail: detail,
        isExpired,
        isRegistered
      })
    } else {
      util.showToast('未找到赛事信息')
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }
  },

  /**
   * 报名按钮点击事件
   */
  onRegisterTap: function () {
    const { matchDetail, isExpired, isRegistered } = this.data

    if (isExpired) {
      util.showToast('报名已截止')
      return
    }

    if (isRegistered) {
      util.showToast('您已报名该赛事')
      return
    }

    // 实际项目中，这里应该弹出报名表单或跳转到报名页面
    // 这里简单模拟报名成功
    util.showModal('确认报名', `您确定要报名参加"${matchDetail.title}"吗？`, true)
      .then(res => {
        if (res) {
          util.showToast('报名成功', 'success')
          this.setData({
            isRegistered: true
          })
        }
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
    this.loadMatchDetail(this.data.id)
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
    const { matchDetail } = this.data
    return {
      title: matchDetail ? matchDetail.title : '赛事详情',
      path: `/pages/match-detail/match-detail?id=${this.data.id}`
    }
  }
})