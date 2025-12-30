// pages/index/index.js
const app = getApp()
const { swiperData } = require('../../utils/mock')
const util = require('../../utils/util')
const { listAnimationHelper } = require('../../utils/page-animation')
const { notificationApi } = require('../../utils/api')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    swiperData: [], // 轮播图数据
    indicatorDots: false, // 是否显示面板指示点（已关闭）
    autoplay: true, // 是否自动切换
    interval: 5000, // 自动切换时间间隔
    duration: 500, // 滑动动画时长
    circular: true, // 是否采用衔接滑动
    themeColor: app.globalData.themeColor, // 主题色
    logoUrl: '',
    showPage: false, // 页面显示状态
    functionButtons: [] // 功能按钮列表（用于动画）
  },
  
  /**
   * 选择图片上传Logo
   */
  chooseImage: function() {
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        const tempFilePath = res.tempFiles[0].tempFilePath;
        this.setData({
          logoUrl: tempFilePath
        });
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.loadSwiperData()
    this.initFunctionButtons()
  },

  /**
   * 初始化功能按钮（用于动画）
   */
  initFunctionButtons: function() {
    const buttons = [
      { type: 'member', icon: '/icon/会员专区.png', title: '会员专区' },
      { type: 'match', icon: '/icon/赛事报名.png', title: '赛事报名' },
      { type: 'club', icon: '/icon/俱乐部申请.png', title: '俱乐部申请' },
      { type: 'training', icon: '/icon/培训申请.png', title: '培训申请' }
    ]
    
    // 为按钮添加动画类名
    const animatedButtons = listAnimationHelper.addAnimation(buttons, 4)
    
    this.setData({
      functionButtons: animatedButtons
    })
  },

  /**
   * 加载轮播图数据
   */
  loadSwiperData: function () {
    // 从服务器获取轮播图数据
    notificationApi.getBanners().then(data => {
      // 转换数据格式以适配现有UI
      const banners = data.map(item => ({
        id: item.id,
        image: item.imageUrl,
        title: item.title,
        link: item.linkUrl || ''
      }))
      
      this.setData({
        swiperData: banners
      })
      console.log('轮播图数据加载成功', banners)
    }).catch(err => {
      console.error('轮播图加载失败', err)
      // 加载失败时使用mock数据作为降级方案
      const dataCopy = JSON.parse(JSON.stringify(swiperData))
      this.setData({
        swiperData: dataCopy
      })
    })
  },

  /**
   * 轮播图点击事件
   */
  onSwiperItemTap: function (e) {
    const { id } = e.currentTarget.dataset
    const item = this.data.swiperData.find(item => item.id === id)
    if (item && item.link) {
      wx.navigateTo({
        url: item.link
      })
    }
  },

  /**
   * 功能按钮点击事件
   */
  onFunctionBtnTap: function (e) {
    const { type } = e.currentTarget.dataset
    switch (type) {
      case 'member':
        // 跳转到会员专区
        wx.navigateTo({
          url: '/pages/member/member'
        })
        break
      case 'match':
        // 跳转到赛事报名
        wx.navigateTo({
          url: '/pages/match/match'
        })
        break
      case 'club':
        // 跳转到俱乐部申请
        wx.navigateTo({
          url: '/pages/club-apply/club-apply'
        })
        break
      case 'training':
        // 培训申请功能（暂时显示提示）
        util.showToast('培训申请功能正在开发中')
        // 未来可以跳转到培训申请页面
        // wx.navigateTo({
        //   url: '/pages/training-apply/training-apply'
        // })
        break
      default:
        break
    }
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
    // 触发页面进入动画
    this.setData({
      showPage: true
    })
    
    // 页面显示时重新加载轮播图数据，避免缓存问题
    this.loadSwiperData();
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
    this.loadSwiperData()
    
    // 刷新完成后添加动画效果
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 300)
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
      title: '小程序首页',
      path: '/pages/index/index'
    }
  }
})