// 模拟数据

// 轮播图数据
const swiperData = [
  {
    id: 1,
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=新闻1',
    title: '重要赛事通知：全国青少年羽毛球锦标赛即将开始',
    link: '/pages/notification/notification?id=1'
  },
  {
    id: 2,
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=新闻2',
    title: '会员专享：新一期训练营开始报名',
    link: '/pages/notification/notification?id=2'
  },
  {
    id: 3,
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=新闻3',
    title: '俱乐部联赛第三轮比赛结果公布',
    link: '/pages/notification/notification?id=3'
  }
];

// 赛事列表数据
const matchList = [
  {
    id: 1,
    title: '2025年全国青少年羽毛球锦标赛',
    date: '2025-11-15',
    location: '北京市 - 国家体育馆',
    status: '报名中',
    deadline: '2025-11-01',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=赛事1'
  },
  {
    id: 2,
    title: '2025年城市俱乐部联赛（第四轮）',
    date: '2025-12-05',
    location: '上海市 - 浦东体育中心',
    status: '报名中',
    deadline: '2025-11-20',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=赛事2'
  },
  {
    id: 3,
    title: '2026年新年杯邀请赛',
    date: '2026-01-10',
    location: '广州市 - 天河体育中心',
    status: '未开始',
    deadline: '2025-12-25',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=赛事3'
  },
  {
    id: 4,
    title: '2025年冬季训练营',
    date: '2025-12-15 至 2025-12-30',
    location: '深圳市 - 福田体育馆',
    status: '报名中',
    deadline: '2025-12-01',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=赛事4'
  }
];

// 赛事详情数据
const matchDetails = {
  1: {
    id: 1,
    title: '2025年全国青少年羽毛球锦标赛',
    date: '2025-11-15 至 2025-11-20',
    location: '北京市 - 国家体育馆',
    status: '报名中',
    deadline: '2025-11-01',
    fee: '¥300/人',
    categories: ['U12男单', 'U12女单', 'U15男单', 'U15女单', 'U18男单', 'U18女单'],
    description: '全国青少年羽毛球锦标赛是面向全国青少年羽毛球爱好者的高水平赛事，旨在发掘优秀青少年羽毛球人才，促进青少年羽毛球运动的发展。比赛设置多个年龄组别，参赛选手将有机会获得国家队选拔资格。',
    requirements: '参赛选手需持有效身份证件，年龄符合相应组别要求，身体健康，能够参与高强度比赛。',
    schedule: [
      { date: '2025-11-15', events: ['开幕式', 'U12组别预赛'] },
      { date: '2025-11-16', events: ['U15组别预赛'] },
      { date: '2025-11-17', events: ['U18组别预赛'] },
      { date: '2025-11-18', events: ['各组别1/4决赛'] },
      { date: '2025-11-19', events: ['各组别半决赛'] },
      { date: '2025-11-20', events: ['各组别决赛', '颁奖仪式'] }
    ],
    organizer: '中国羽毛球协会青少年部',
    contact: '电话：010-12345678，邮箱：youth@example.com',
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=赛事详情1'
  },
  2: {
    id: 2,
    title: '2025年城市俱乐部联赛（第四轮）',
    date: '2025-12-05 至 2025-12-07',
    location: '上海市 - 浦东体育中心',
    status: '报名中',
    deadline: '2025-11-20',
    fee: '¥5000/队',
    categories: ['男子团体', '女子团体', '混合团体'],
    description: '城市俱乐部联赛是全国性的俱乐部赛事，分为多个轮次在不同城市举行。第四轮将在上海浦东体育中心举行，欢迎各俱乐部组队参赛。',
    requirements: '参赛俱乐部需在协会注册，每队人数不少于6人，不超过12人。参赛选手需持有效身份证件，身体健康。',
    schedule: [
      { date: '2025-12-05', events: ['小组赛'] },
      { date: '2025-12-06', events: ['淘汰赛'] },
      { date: '2025-12-07', events: ['决赛', '颁奖仪式'] }
    ],
    organizer: '中国羽毛球协会俱乐部部',
    contact: '电话：021-87654321，邮箱：club@example.com',
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=赛事详情2'
  },
  3: {
    id: 3,
    title: '2026年新年杯邀请赛',
    date: '2026-01-10 至 2026-01-12',
    location: '广州市 - 天河体育中心',
    status: '未开始',
    deadline: '2025-12-25',
    fee: '¥400/人',
    categories: ['男单', '女单', '男双', '女双', '混双'],
    description: '新年杯邀请赛是迎接新年的传统赛事，邀请全国各地的优秀选手参与。比赛氛围轻松友好，是球员交流切磋的良好平台。',
    requirements: '参赛选手需收到组委会邀请函，或通过俱乐部推荐报名。参赛选手需持有效身份证件，身体健康。',
    schedule: [
      { date: '2026-01-10', events: ['预赛'] },
      { date: '2026-01-11', events: ['1/4决赛', '半决赛'] },
      { date: '2026-01-12', events: ['决赛', '颁奖仪式', '新年联欢会'] }
    ],
    organizer: '广州市羽毛球协会',
    contact: '电话：020-12345678，邮箱：newyear@example.com',
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=赛事详情3'
  },
  4: {
    id: 4,
    title: '2025年冬季训练营',
    date: '2025-12-15 至 2025-12-30',
    location: '深圳市 - 福田体育馆',
    status: '报名中',
    deadline: '2025-12-01',
    fee: '¥3000/人',
    categories: ['青少年组', '成人组'],
    description: '冬季训练营为期两周，邀请国内外知名教练进行指导，提供专业的训练和指导，帮助参与者提高技术水平。',
    requirements: '参与者需有一定的羽毛球基础，能够适应高强度训练。青少年组年龄为10-18岁，成人组年龄为18岁以上。',
    schedule: [
      { date: '2025-12-15', events: ['开营仪式', '分组测试'] },
      { date: '2025-12-16 至 2025-12-29', events: ['日常训练', '技术讲解', '实战演练'] },
      { date: '2025-12-30', events: ['结营比赛', '结营仪式'] }
    ],
    organizer: '深圳市羽毛球训练中心',
    contact: '电话：0755-12345678，邮箱：training@example.com',
    imageUrl: 'https://via.placeholder.com/750x350/AACFFF/ffffff?text=赛事详情4'
  }
};

// 会员等级数据
const memberLevels = [
  {
    id: 1,
    name: '普通会员',
    fee: '¥200/年',
    benefits: ['基础训练场地预约', '会员活动参与权', '赛事报名优先权']
  },
  {
    id: 2,
    name: '高级会员',
    fee: '¥500/年',
    benefits: ['所有普通会员权益', '专业教练指导（每月2次）', '会员专属赛事', '装备折扣']
  },
  {
    id: 3,
    name: 'VIP会员',
    fee: '¥1000/年',
    benefits: ['所有高级会员权益', '专业教练一对一指导（每月4次）', 'VIP专属活动', '高端装备试用权']
  }
];

// 会员信息数据
const memberInfo = {
  id: 1001,
  name: '张三',
  phone: '13800138000',
  level: '高级会员',
  joinDate: '2024-05-15',
  expireDate: '2025-05-14',
  points: 350,
  activities: [
    { date: '2025-09-10', name: '会员月度活动', status: '已参加' },
    { date: '2025-08-15', name: '夏季友谊赛', status: '已参加' },
    { date: '2025-07-20', name: '技术培训课程', status: '已参加' }
  ]
};

// 通知列表数据
const notificationList = [
  {
    id: 1,
    title: '重要赛事通知：全国青少年羽毛球锦标赛即将开始',
    date: '2025-10-20',
    content: '全国青少年羽毛球锦标赛将于2025年11月15日至20日在北京国家体育馆举行。本次比赛设置U12、U15、U18三个年龄组别，每个组别设男单、女单项目。报名截止日期为2025年11月1日，请有意参赛的选手尽快报名。\n\n报名方式：通过小程序"赛事报名"功能提交报名信息。\n\n比赛规则及详细安排请查看赛事详情页面。',
    isRead: false,
    type: '赛事通知',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=通知1'
  },
  {
    id: 2,
    title: '会员专享：新一期训练营开始报名',
    date: '2025-10-18',
    content: '2025年冬季训练营将于12月15日至30日在深圳福田体育馆举行，为期两周。本次训练营邀请了多位国内外知名教练进行指导，将提供专业的训练和指导，帮助参与者提高技术水平。\n\n会员专享优惠：普通会员9折，高级会员8折，VIP会员7折。\n\n报名截止日期为2025年12月1日，名额有限，请有意参加的会员尽快报名。',
    isRead: true,
    type: '会员通知',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=通知2'
  },
  {
    id: 3,
    title: '俱乐部联赛第三轮比赛结果公布',
    date: '2025-10-15',
    content: '2025年城市俱乐部联赛第三轮比赛已于10月10日至12日在成都成功举行。经过激烈角逐，北京羽协俱乐部、上海星辰俱乐部、广州飞羽俱乐部分别获得男子团体、女子团体和混合团体冠军。\n\n第四轮比赛将于12月5日至7日在上海浦东体育中心举行，报名截止日期为11月20日，欢迎各俱乐部积极报名参赛。',
    isRead: true,
    type: '赛事通知',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=通知3'
  },
  {
    id: 4,
    title: '会员福利：专业装备优惠活动',
    date: '2025-10-10',
    content: '为回馈广大会员，我们将于11月1日至15日举办会员专享装备优惠活动。活动期间，会员可享受指定品牌羽毛球装备7折优惠，包括球拍、球鞋、服装等。\n\n普通会员：指定商品9折\n高级会员：指定商品8折\nVIP会员：指定商品7折\n\n活动地点：线下体验店（北京、上海、广州、深圳）及小程序商城。',
    isRead: false,
    type: '会员通知',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=通知4'
  },
  {
    id: 5,
    title: '系统维护通知',
    date: '2025-10-05',
    content: '为提升用户体验，系统将于2025年10月25日凌晨2:00-6:00进行维护升级。维护期间，小程序部分功能可能无法正常使用，敬请谅解。\n\n维护内容：\n1. 优化系统性能\n2. 提升数据安全性\n3. 新增部分功能\n\n如有疑问，请联系客服。',
    isRead: true,
    type: '系统通知',
    imageUrl: 'https://via.placeholder.com/200x150/AACFFF/ffffff?text=通知5'
  }
];

// 个人中心数据
const personalInfo = {
  userInfo: {
    name: '张三',
    avatar: 'https://via.placeholder.com/100x100/AACFFF/ffffff?text=头像',
    phone: '138****8000',
    memberLevel: '高级会员',
    points: 350
  },
  myMatches: [
    {
      id: 1,
      title: '2025年全国青少年羽毛球锦标赛',
      date: '2025-11-15',
      status: '已报名',
      category: 'U18男单'
    },
    {
      id: 4,
      title: '2025年冬季训练营',
      date: '2025-12-15',
      status: '已报名',
      category: '成人组'
    }
  ],
  myClub: {
    name: '星辰羽毛球俱乐部',
    role: '会员',
    joinDate: '2024-06-01'
  }
};

module.exports = {
  swiperData,
  matchList,
  matchDetails,
  memberLevels,
  memberInfo,
  notificationList,
  personalInfo
};