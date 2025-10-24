// pages/club-apply/club-apply.js
const app = getApp()
const util = require('../../utils/util')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showForm: false, // 是否显示申请表单
    formData: {
      clubName: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      description: ''
    },
    themeColor: app.globalData.themeColor // 主题色
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 显示申请表单
   */
  showApplyForm: function () {
    this.setData({
      showForm: true
    })
  },

  /**
   * 隐藏申请表单
   */
  hideApplyForm: function () {
    this.setData({
      showForm: false
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
    const { formData } = this.data
    
    // 表单验证
    if (!formData.clubName.trim()) {
      util.showToast('请输入俱乐部名称')
      return
    }
    
    if (!formData.contactPerson.trim()) {
      util.showToast('请输入联系人姓名')
      return
    }
    
    if (!formData.phone.trim()) {
      util.showToast('请输入联系电话')
      return
    }
    
    if (!util.isValidPhone(formData.phone)) {
      util.showToast('手机号格式不正确')
      return
    }
    
    if (formData.email && !util.isValidEmail(formData.email)) {
      util.showToast('邮箱格式不正确')
      return
    }
    
    // 实际项目中，这里应该是提交数据到服务器
    // 这里简单模拟提交成功
    util.showLoading('提交中...')
    
    setTimeout(() => {
      util.hideLoading()
      util.showToast('申请提交成功', 'success')
      
      // 隐藏表单
      this.setData({
        showForm: false,
        formData: {
          clubName: '',
          contactPerson: '',
          phone: '',
          email: '',
          address: '',
          description: ''
        }
      })
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
      title: '俱乐部申请',
      path: '/pages/club-apply/club-apply'
    }
  }
})