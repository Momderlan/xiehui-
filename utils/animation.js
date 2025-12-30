/**
 * 全局动画配置
 * 遵循统一的动画原则：只在状态变化时动，只用位移+透明度
 */

// 动画时长配置
const DURATION = {
  enter: 200,      // 页面进入
  leave: 150,      // 页面退出
  feedback: 120,   // 操作反馈
  listItem: 20     // 列表项延迟
}

// 缓动函数配置
const TIMING_FUNCTION = {
  enter: 'ease-out',   // 进入缓动
  leave: 'ease-in',    // 退出缓动
  feedback: 'ease-out' // 反馈缓动
}

// 页面进入动画配置
const PAGE_ENTER = {
  duration: DURATION.enter,
  timingFunction: TIMING_FUNCTION.enter,
  translateY: [16, 0],  // 从下往上 16px
  opacity: [0, 1]
}

// 页面退出动画配置
const PAGE_LEAVE = {
  duration: DURATION.leave,
  timingFunction: TIMING_FUNCTION.leave,
  translateY: [0, 12],  // 向下 12px
  opacity: [1, 0]
}

// 列表项进入动画配置
const LIST_ITEM_ENTER = {
  duration: DURATION.enter,
  timingFunction: TIMING_FUNCTION.enter,
  translateY: [8, 0],   // 轻微上浮 8px
  opacity: [0, 1],
  delay: DURATION.listItem  // 每项延迟 20ms
}

// 下拉刷新动画配置
const REFRESH_COMPLETE = {
  duration: DURATION.feedback,
  timingFunction: TIMING_FUNCTION.feedback,
  opacity: [0.95, 1]
}

// 按钮点击动画配置
const BUTTON_PRESS = {
  duration: 80,
  timingFunction: 'ease-out',
  scale: [1, 0.96, 1]
}

// 成功反馈动画配置
const SUCCESS_FEEDBACK = {
  duration: 150,
  timingFunction: TIMING_FUNCTION.feedback,
  translateY: [6, 0],
  opacity: [0, 1]
}

// 错误反馈动画配置（抖动）
const ERROR_FEEDBACK = {
  duration: DURATION.feedback,
  timingFunction: 'ease-out',
  translateX: [-4, 4, 0]
}

// TabBar 切换动画配置
const TAB_SWITCH = {
  duration: DURATION.feedback,
  timingFunction: TIMING_FUNCTION.feedback,
  opacity: [0.8, 1]
}

/**
 * 创建页面进入动画
 * @returns {Object} 动画对象
 */
function createPageEnterAnimation() {
  const animation = wx.createAnimation({
    duration: PAGE_ENTER.duration,
    timingFunction: PAGE_ENTER.timingFunction
  })
  
  animation.translateY(PAGE_ENTER.translateY[0]).opacity(PAGE_ENTER.opacity[0]).step({ duration: 0 })
  animation.translateY(PAGE_ENTER.translateY[1]).opacity(PAGE_ENTER.opacity[1]).step()
  
  return animation.export()
}

/**
 * 创建页面退出动画
 * @returns {Object} 动画对象
 */
function createPageLeaveAnimation() {
  const animation = wx.createAnimation({
    duration: PAGE_LEAVE.duration,
    timingFunction: PAGE_LEAVE.timingFunction
  })
  
  animation.translateY(PAGE_LEAVE.translateY[1]).opacity(PAGE_LEAVE.opacity[1]).step()
  
  return animation.export()
}

/**
 * 创建列表项进入动画
 * @param {number} index - 列表项索引
 * @returns {Object} 动画对象
 */
function createListItemEnterAnimation(index) {
  const animation = wx.createAnimation({
    duration: LIST_ITEM_ENTER.duration,
    timingFunction: LIST_ITEM_ENTER.timingFunction,
    delay: index * LIST_ITEM_ENTER.delay
  })
  
  animation.translateY(LIST_ITEM_ENTER.translateY[0]).opacity(LIST_ITEM_ENTER.opacity[0]).step({ duration: 0 })
  animation.translateY(LIST_ITEM_ENTER.translateY[1]).opacity(LIST_ITEM_ENTER.opacity[1]).step()
  
  return animation.export()
}

/**
 * 创建刷新完成动画
 * @returns {Object} 动画对象
 */
function createRefreshCompleteAnimation() {
  const animation = wx.createAnimation({
    duration: REFRESH_COMPLETE.duration,
    timingFunction: REFRESH_COMPLETE.timingFunction
  })
  
  animation.opacity(REFRESH_COMPLETE.opacity[0]).step({ duration: 0 })
  animation.opacity(REFRESH_COMPLETE.opacity[1]).step()
  
  return animation.export()
}

/**
 * 创建按钮按下动画
 * @returns {Object} 动画对象
 */
function createButtonPressAnimation() {
  const animation = wx.createAnimation({
    duration: BUTTON_PRESS.duration,
    timingFunction: BUTTON_PRESS.timingFunction
  })
  
  animation.scale(BUTTON_PRESS.scale[1]).step()
  animation.scale(BUTTON_PRESS.scale[2]).step()
  
  return animation.export()
}

/**
 * 创建错误反馈动画（抖动）
 * @returns {Object} 动画对象
 */
function createErrorShakeAnimation() {
  const animation = wx.createAnimation({
    duration: ERROR_FEEDBACK.duration / 3,
    timingFunction: ERROR_FEEDBACK.timingFunction
  })
  
  animation.translateX(ERROR_FEEDBACK.translateX[0]).step()
  animation.translateX(ERROR_FEEDBACK.translateX[1]).step()
  animation.translateX(ERROR_FEEDBACK.translateX[2]).step()
  
  return animation.export()
}

module.exports = {
  // 配置常量
  DURATION,
  TIMING_FUNCTION,
  PAGE_ENTER,
  PAGE_LEAVE,
  LIST_ITEM_ENTER,
  REFRESH_COMPLETE,
  BUTTON_PRESS,
  SUCCESS_FEEDBACK,
  ERROR_FEEDBACK,
  TAB_SWITCH,
  
  // 动画创建函数
  createPageEnterAnimation,
  createPageLeaveAnimation,
  createListItemEnterAnimation,
  createRefreshCompleteAnimation,
  createButtonPressAnimation,
  createErrorShakeAnimation
}