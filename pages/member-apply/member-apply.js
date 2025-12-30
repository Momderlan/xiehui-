// pages/member-apply/member-apply.js
const app = getApp()
const { memberLevels } = require('../../utils/mock')
const util = require('../../utils/util')
const { memberApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    memberLevels: [], // 会员等级列表
    selectedLevel: null, // 选中的会员等级
    formData: {
      name: '',
      phone: '',
      idCard: '',
      address: ''
    },
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadMemberLevels()
  },

  /**
   * 加载会员等级数据
   */
  loadMemberLevels: function () {
    // 从服务器获取会员等级列表
    memberApi.getLevels().then(data => {
      // 过滤掉普通会员（价格为0的）
      const levels = data.filter(item => item.price > 0)
      
      this.setData({
        memberLevels: levels,
        selectedLevel: levels.length > 0 ? 0 : null
      })
      console.log('会员等级加载成功', levels)
    }).catch(err => {
      console.error('会员等级加载失败', err)
      // 使用mock数据作为降级方案
      this.setData({
        memberLevels: memberLevels,
        selectedLevel: 0
      })
    })
  },

  /**
   * 会员等级选择事件
   */
  onLevelChange: function (e) {
    const selectedId = parseInt(e.detail.value)
    this.setData({
      selectedLevel: selectedId
    })
  },

  /**
   * 表单输入事件
   */
  onInput: function (e) {
    const { field } = e.currentTarget.dataset
    const { value } = e.detail
    
    this.setData({
      [`formData.${field}`]: value
    })
  },

  /**
   * 表单提交事件
   */
  onSubmit: function () {
    const { formData, selectedLevel, memberLevels } = this.data
    
    // 检查是否选择了会员等级
    if (selectedLevel === null || !memberLevels[selectedLevel]) {
      util.showToast('请选择会员等级')
      return
    }
    
    // 表单验证
    if (!formData.name.trim()) {
      util.showToast('请输入姓名')
      return
    }
    
    if (!formData.phone.trim()) {
      util.showToast('请输入手机号')
      return
    }
    
    if (!util.isValidPhone(formData.phone)) {
      util.showToast('手机号格式不正确')
      return
    }
    
    if (!formData.idCard.trim()) {
      util.showToast('请输入身份证号')
      return
    }
    
    if (!util.isValidIdCard(formData.idCard)) {
      util.showToast('身份证号格式不正确')
      return
    }

    // 获取选中的会员等级ID
    const selectedLevelData = memberLevels[selectedLevel]
    
    // 确认购买
    util.showModal(
      '确认购买',
      `您将购买${selectedLevelData.levelName}，费用：¥${selectedLevelData.price}`,
      true
    ).then(confirmed => {
      if (confirmed) {
        this.purchaseMember(selectedLevelData.id)
      }
    })
  },

  /**
   * 购买会员
   */
  purchaseMember: function(levelId) {
    util.showLoading('购买中...')
    
    memberApi.purchase({
      levelId: levelId
    }).then(data => {
      util.hideLoading()
      util.showToast('购买成功', 'success')
      
      console.log('会员购买成功', data)
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }).catch(err => {
      util.hideLoading()
      console.error('会员购买失败', err)
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
      title: '会员申请',
      path: '/pages/member-apply/member-apply'
    }
  }
})