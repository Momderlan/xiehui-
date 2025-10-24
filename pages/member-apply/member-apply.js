// pages/member-apply/member-apply.js
const app = getApp()
const { memberLevels } = require('../../utils/mock')
const util = require('../../utils/util')

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
    // 实际项目中，这里应该是从服务器获取数据
    // 这里使用模拟数据
    this.setData({
      memberLevels: memberLevels,
      selectedLevel: memberLevels[0].id // 默认选中第一个等级
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
    const { formData, selectedLevel } = this.data
    
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
    
    // 实际项目中，这里应该是提交数据到服务器
    // 这里简单模拟提交成功
    util.showLoading('提交中...')
    
    setTimeout(() => {
      util.hideLoading()
      util.showToast('申请提交成功', 'success')
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack()
      }, 1500)
    }, 1500)
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