// pages/match-detail/match-detail.js
const app = getApp()
const { matchDetails } = require('../../utils/mock')
const util = require('../../utils/util')
const { matchApi } = require('../../utils/api')

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
    // 从服务器获取赛事详情
    matchApi.getDetail(id).then(data => {
      // 转换数据格式以适配现有UI
      const detail = {
        id: data.id,
        title: data.matchName,
        type: data.matchType,
        time: data.startTime,
        endTime: data.endTime,
        location: data.location,
        participants: `${data.currentParticipants}/${data.maxParticipants}`,
        currentParticipants: data.currentParticipants,
        maxParticipants: data.maxParticipants,
        fee: data.registrationFee,
        deadline: data.registrationDeadline,
        description: data.description,
        rules: data.rules,
        prizes: data.prizes,
        image: data.coverImage || '/images/临时logo.png',
        status: data.status
      }

      // 检查是否已过期
      const isExpired = util.isExpired(detail.deadline)
      // 从服务器获取是否已报名
      const isRegistered = data.isRegistered || false

      this.setData({
        matchDetail: detail,
        isExpired,
        isRegistered
      })

      console.log('赛事详情加载成功', detail)
    }).catch(err => {
      console.error('赛事详情加载失败', err)
      
      // 加载失败时使用mock数据作为降级方案
      const detail = matchDetails[id]
      if (detail) {
        const isExpired = util.isExpired(detail.deadline)
        this.setData({
          matchDetail: detail,
          isExpired,
          isRegistered: false
        })
      } else {
        util.showToast('未找到赛事信息')
        setTimeout(() => {
          wx.navigateBack()
        }, 1500)
      }
    })
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

    // 检查是否已满员
    if (matchDetail.currentParticipants >= matchDetail.maxParticipants) {
      util.showToast('报名人数已满')
      return
    }

    // 弹出确认对话框
    util.showModal('确认报名', `您确定要报名参加"${matchDetail.title}"吗？报名费用：¥${matchDetail.fee}`, true)
      .then(res => {
        if (res) {
          // 调用报名接口
          this.submitRegistration()
        }
      })
  },

  /**
   * 提交报名
   */
  submitRegistration: function() {
    const userInfo = wx.getStorageSync('userInfo')
    
    // 检查用户信息
    if (!userInfo || !userInfo.phone) {
      util.showModal('提示', '请先完善个人信息（手机号）', false).then(() => {
        wx.navigateTo({
          url: '/pages/personal/personal'
        })
      })
      return
    }

    util.showLoading('报名中...')

    matchApi.register({
      matchId: this.data.matchDetail.id,
      phone: userInfo.phone,
      emergencyContact: userInfo.realName || '紧急联系人',
      emergencyPhone: userInfo.phone
    }).then(data => {
      util.hideLoading()
      util.showToast('报名成功', 'success')
      
      // 更新报名状态
      this.setData({
        isRegistered: true
      })

      // 重新加载详情以更新报名人数
      setTimeout(() => {
        this.loadMatchDetail(this.data.id)
      }, 1000)
    }).catch(err => {
      util.hideLoading()
      console.error('报名失败', err)
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