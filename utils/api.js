// API接口定义
const { get, post, put, del } = require('./request')

/**
 * 认证模块
 */
const authApi = {
  // 账号密码登录
  login: (data) => post('/api/app/auth/login', data, { needAuth: false }),
  
  // 用户注册
  register: (data) => post('/api/app/auth/register', data, { needAuth: false }),
  
  // 微信登录（保留）
  wechatLogin: (data) => post('/api/app/auth/wechat-login', data, { needAuth: false }),
  
  // 获取当前用户信息
  getUserInfo: () => get('/api/app/auth/info'),
  
  // 更新用户信息
  updateUserInfo: (data) => put('/api/app/auth/update', data)
}

/**
 * 会员模块
 */
const memberApi = {
  // 获取会员等级列表
  getLevels: () => get('/api/app/member/levels'),
  
  // 获取当前会员信息
  getMemberInfo: () => get('/api/app/member/info'),
  
  // 购买会员
  purchase: (data) => post('/api/app/member/purchase', data),
  
  // 获取会员购买记录
  getRecords: (params) => get('/api/app/member/records', params)
}

/**
 * 赛事模块
 */
const matchApi = {
  // 获取赛事列表（公开接口）
  getList: (params) => get('/api/app/match/list', params, { needAuth: false }),
  
  // 获取赛事详情（公开接口）
  getDetail: (id) => get(`/api/app/match/${id}`, {}, { needAuth: false }),
  
  // 报名赛事
  register: (data) => post('/api/app/match/register', data),
  
  // 取消报名
  cancelRegister: (id) => del(`/api/app/match/register/${id}`),
  
  // 获取我的报名记录
  getMyRegistrations: (params) => get('/api/app/match/my-registrations', params)
}

/**
 * 俱乐部模块
 */
const clubApi = {
  // 获取俱乐部列表（公开接口）
  getList: (params) => get('/api/app/club/list', params, { needAuth: false }),
  
  // 获取俱乐部详情（公开接口）
  getDetail: (id) => get(`/api/app/club/${id}`, {}, { needAuth: false }),
  
  // 申请加入俱乐部
  apply: (data) => post('/api/app/club/apply', data),
  
  // 退出俱乐部
  quit: (clubId) => del(`/api/app/club/quit/${clubId}`),
  
  // 获取我的俱乐部
  getMyClubs: () => get('/api/app/club/my-clubs'),
  
  // 申请创建俱乐部
  createApplication: (data) => post('/api/app/club/create-application', data)
}

/**
 * 通知资讯模块
 */
const notificationApi = {
  // 获取通知列表（公开接口）
  getList: (params) => get('/api/app/notification/list', params, { needAuth: false }),
  
  // 获取通知详情（公开接口）
  getDetail: (id) => get(`/api/app/notification/${id}`, {}, { needAuth: false }),
  
  // 获取轮播图（公开接口）
  getBanners: () => get('/api/app/notification/banners', {}, { needAuth: false })
}

/**
 * 用户中心模块
 */
const userApi = {
  // 获取培训申请列表
  getTrainingApplications: (params) => get('/api/app/user/training-applications', params),
  
  // 提交培训申请
  submitTrainingApplication: (data) => post('/api/app/user/training-application', data)
}

module.exports = {
  authApi,
  memberApi,
  matchApi,
  clubApi,
  notificationApi,
  userApi
}