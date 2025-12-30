/**
 * 页面动画混入
 * 提供统一的页面进入动画和列表动画功能
 */

const animation = require('./animation.js')

/**
 * 页面动画混入对象
 * 在页面的 Page() 中使用 Object.assign() 混入
 */
const pageAnimationMixin = {
  data: {
    pageAnimation: {},
    showPage: false
  },

  /**
   * 页面显示时触发进入动画
   */
  onShow() {
    this.triggerPageEnterAnimation()
  },

  /**
   * 触发页面进入动画
   */
  triggerPageEnterAnimation() {
    // 使用 CSS 类名方式（推荐）
    this.setData({
      showPage: true
    })
    
    // 或使用 wx.createAnimation 方式
    // const pageAnimation = animation.createPageEnterAnimation()
    // this.setData({
    //   pageAnimation: pageAnimation,
    //   showPage: true
    // })
  },

  /**
   * 为列表数据添加动画延迟类名
   * @param {Array} list - 列表数据
   * @param {number} maxAnimationItems - 最大动画项数，默认10
   * @returns {Array} 添加了动画类名的列表
   */
  addListAnimation(list, maxAnimationItems = 10) {
    if (!Array.isArray(list)) {
      return list
    }

    return list.map((item, index) => {
      // 超过最大动画项数的不添加动画
      if (index >= maxAnimationItems) {
        return {
          ...item,
          animationClass: 'no-animation'
        }
      }

      return {
        ...item,
        animationClass: `list-item-enter list-item-delay-${index + 1}`
      }
    })
  },

  /**
   * 触发刷新完成动画
   */
  triggerRefreshAnimation() {
    const refreshAnimation = animation.createRefreshCompleteAnimation()
    this.setData({
      pageAnimation: refreshAnimation
    })
  }
}

/**
 * 列表动画辅助函数
 * 独立使用，不依赖混入
 */
const listAnimationHelper = {
  /**
   * 为列表项添加动画类名
   * @param {Array} list - 列表数据
   * @param {number} maxItems - 最大动画项数
   * @returns {Array} 处理后的列表
   */
  addAnimation(list, maxItems = 10) {
    if (!Array.isArray(list) || list.length === 0) {
      return list
    }

    return list.map((item, index) => {
      if (index >= maxItems) {
        return {
          ...item,
          animationClass: 'no-animation'
        }
      }

      return {
        ...item,
        animationClass: `list-item-enter list-item-delay-${index + 1}`
      }
    })
  },

  /**
   * 移除列表动画类名
   * @param {Array} list - 列表数据
   * @returns {Array} 处理后的列表
   */
  removeAnimation(list) {
    if (!Array.isArray(list)) {
      return list
    }

    return list.map(item => {
      const { animationClass, ...rest } = item
      return rest
    })
  }
}

/**
 * 表单动画辅助函数
 */
const formAnimationHelper = {
  /**
   * 触发表单错误抖动动画
   * @param {Object} page - 页面实例
   * @param {string} fieldName - 表单字段名
   */
  shakeError(page, fieldName = 'formAnimation') {
    const errorAnimation = animation.createErrorShakeAnimation()
    page.setData({
      [fieldName]: errorAnimation
    })

    // 动画结束后重置
    setTimeout(() => {
      page.setData({
        [fieldName]: {}
      })
    }, animation.DURATION.feedback)
  },

  /**
   * 触发按钮按下动画
   * @param {Object} page - 页面实例
   * @param {string} buttonName - 按钮字段名
   */
  pressButton(page, buttonName = 'buttonAnimation') {
    const buttonAnimation = animation.createButtonPressAnimation()
    page.setData({
      [buttonName]: buttonAnimation
    })
  }
}

/**
 * Toast 动画辅助函数
 */
const toastAnimationHelper = {
  /**
   * 显示成功提示（带动画）
   * @param {string} title - 提示文字
   * @param {number} duration - 持续时间
   */
  showSuccess(title, duration = 1500) {
    wx.showToast({
      title: title,
      icon: 'success',
      duration: duration,
      mask: true
    })
  },

  /**
   * 显示错误提示（带动画）
   * @param {string} title - 提示文字
   * @param {number} duration - 持续时间
   */
  showError(title, duration = 1500) {
    wx.showToast({
      title: title,
      icon: 'none',
      duration: duration,
      mask: true
    })
  }
}

module.exports = {
  pageAnimationMixin,
  listAnimationHelper,
  formAnimationHelper,
  toastAnimationHelper
}