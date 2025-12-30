// pages/club-apply/club-apply.js
const app = getApp()
const util = require('../../utils/util')
const { clubApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    showForm: false, // 是否显示申请表单
    clubList: [], // 俱乐部列表
    myClubs: [], // 我的俱乐部
    formData: {
      clubName: '',
      contactPerson: '',
      phone: '',
      email: '',
      address: '',
      description: '',
      facilities: '',
      openingHours: ''
    },
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
    this.loadClubList()
    this.loadMyClubs()
  },

  /**
   * 加载俱乐部列表
   */
  loadClubList: function(isRefresh = false) {
    // 如果是刷新，重置页码
    if (isRefresh) {
      this.setData({
        page: 1,
        clubList: [],
        hasMore: true
      })
    }

    // 如果正在加载或没有更多数据，则返回
    if (this.data.loading || !this.data.hasMore) {
      return
    }

    this.setData({ loading: true })

    clubApi.getList({
      page: this.data.page,
      size: this.data.size
    }).then(data => {
      const { records, total, current } = data
      
      // 合并数据
      const newList = isRefresh ? records : [...this.data.clubList, ...records]
      
      this.setData({
        clubList: newList,
        page: current + 1,
        hasMore: newList.length < total,
        loading: false
      })

      console.log('俱乐部列表加载成功', records)
    }).catch(err => {
      console.error('俱乐部列表加载失败', err)
      this.setData({ loading: false })
    })
  },

  /**
   * 加载我的俱乐部
   */
  loadMyClubs: function() {
    clubApi.getMyClubs().then(data => {
      this.setData({
        myClubs: data
      })
      console.log('我的俱乐部加载成功', data)
    }).catch(err => {
      console.error('我的俱乐部加载失败', err)
    })
  },

  /**
   * 查看俱乐部详情
   */
  onClubTap: function(e) {
    const { id } = e.currentTarget.dataset
    // 可以跳转到俱乐部详情页面
    util.showToast('俱乐部详情功能待开发')
  },

  /**
   * 申请加入俱乐部
   */
  onJoinClub: function(e) {
    const { id, name } = e.currentTarget.dataset
    
    util.showModal('确认申请', `您确定要申请加入"${name}"吗？`, true)
      .then(confirmed => {
        if (confirmed) {
          this.submitJoinApplication(id)
        }
      })
  },

  /**
   * 提交加入申请
   */
  submitJoinApplication: function(clubId) {
    util.showLoading('提交中...')
    
    clubApi.apply({
      clubId: clubId,
      reason: '希望加入俱乐部'
    }).then(data => {
      util.hideLoading()
      util.showToast('申请已提交', 'success')
      
      console.log('加入申请提交成功', data)
      
      // 重新加载我的俱乐部
      setTimeout(() => {
        this.loadMyClubs()
      }, 1000)
    }).catch(err => {
      util.hideLoading()
      console.error('加入申请提交失败', err)
    })
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
    
    if (!formData.address.trim()) {
      util.showToast('请输入俱乐部地址')
      return
    }
    
    if (!formData.description.trim()) {
      util.showToast('请输入俱乐部简介')
      return
    }
    
    // 提交创建俱乐部申请
    util.showLoading('提交中...')
    
    clubApi.createApplication({
      name: formData.clubName,
      description: formData.description,
      address: formData.address,
      contactPhone: formData.phone,
      contactPerson: formData.contactPerson,
      facilities: formData.facilities || '标准场地',
      openingHours: formData.openingHours || '周一至周日 08:00-22:00',
      logo: '',
      images: ''
    }).then(data => {
      util.hideLoading()
      util.showToast('申请提交成功', 'success')
      
      console.log('创建俱乐部申请提交成功', data)
      
      // 隐藏表单并重置
      this.setData({
        showForm: false,
        formData: {
          clubName: '',
          contactPerson: '',
          phone: '',
          email: '',
          address: '',
          description: '',
          facilities: '',
          openingHours: ''
        }
      })
    }).catch(err => {
      util.hideLoading()
      console.error('创建俱乐部申请提交失败', err)
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
    this.loadClubList(true)
    this.loadMyClubs()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 加载更多俱乐部
    this.loadClubList(false)
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