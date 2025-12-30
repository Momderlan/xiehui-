# 管理系统 - 用户端API文档

## 基础信息

- **Base URL**: `http://localhost:8080`
- **API 版本**: v1.0
- **认证方式**: JWT Token (Bearer Token)
- **内容类型**: `application/json`

## 认证说明

除了登录接口外，所有接口都需要在请求头中携带 JWT Token：

```
Authorization: Bearer {token}
```

## 统一响应格式

```json
{
  "code": 200,
  "message": "操作成功",
  "data": {}
}
```

### 状态码说明

| 状态码 | 说明 |
|--------|------|
| 200 | 操作成功 |
| 400 | 请求参数错误 |
| 401 | 未授权（未登录或token失效） |
| 403 | 无权限访问 |
| 404 | 资源不存在 |
| 500 | 服务器内部错误 |

---

## 1. 认证模块

### 1.1 用户注册

**接口地址**: `POST /api/app/auth/register`

**请求参数**:
```json
{
  "username": "用户名",
  "password": "密码",
  "phone": "手机号（可选）"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "注册成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "username": "张三",
    "avatarUrl": "https://xxx.com/avatar.jpg"
  }
}
```

### 1.2 用户名密码登录

**接口地址**: `POST /api/app/auth/login`

**请求参数**:
```json
{
  "username": "用户名",
  "password": "密码"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userId": 1,
    "username": "张三",
    "avatarUrl": "https://xxx.com/avatar.jpg"
  }
}
```

### 1.2 微信登录

**接口地址**: `POST /api/app/auth/wechat-login`

**请求参数**:
```json
{
  "code": "微信登录code",
  "nickName": "用户昵称",
  "avatarUrl": "头像URL"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "userInfo": {
      "id": 1,
      "openid": "oxxxxxxxxxxxxxx",
      "username": "张三",
      "avatarUrl": "https://xxx.com/avatar.jpg",
      "phone": "13800138000",
      "realName": "张三",
      "gender": 1,
      "createdAt": "2024-01-01 10:00:00"
    }
  }
}
```

### 1.3 获取当前用户信息

**接口地址**: `GET /api/app/auth/info`

**请求头**: 需要携带 Authorization Token

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "openid": "oxxxxxxxxxxxxxx",
    "username": "张三",
    "avatarUrl": "https://xxx.com/avatar.jpg",
    "phone": "13800138000",
    "realName": "张三",
    "gender": 1,
    "createdAt": "2024-01-01 10:00:00"
  }
}
```

### 1.3 更新用户信息

**接口地址**: `PUT /api/app/auth/update`

**请求参数**:
```json
{
  "username": "新昵称",
  "avatarUrl": "新头像URL",
  "phone": "13800138000",
  "realName": "张三",
  "gender": 1
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "更新成功",
  "data": null
}
```

---

## 2. 会员模块

### 2.1 获取会员等级列表

**接口地址**: `GET /api/app/member/levels`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "levelName": "普通会员",
      "price": 0.00,
      "durationMonths": 0,
      "benefits": "基础功能使用",
      "sortOrder": 1
    },
    {
      "id": 2,
      "levelName": "月度会员",
      "price": 99.00,
      "durationMonths": 30,
      "benefits": "免费场地预订、赛事报名优惠",
      "sortOrder": 2
    }
  ]
}
```

### 2.2 获取当前会员信息

**接口地址**: `GET /api/app/member/info`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "userId": 1,
    "levelId": 2,
    "levelName": "月度会员",
    "joinDate": "2024-01-01",
    "expireDate": "2024-01-31",
    "status": 1,
    "createdAt": "2024-01-01 10:00:00"
  }
}
```

### 2.3 购买会员

**接口地址**: `POST /api/app/member/purchase`

**请求参数**:
```json
{
  "levelId": 2
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "购买成功",
  "data": {
    "id": 1,
    "userId": 1,
    "levelId": 2,
    "joinDate": "2024-01-01",
    "expireDate": "2024-01-31",
    "status": 1
  }
}
```

### 2.4 获取会员购买记录

**接口地址**: `GET /api/app/member/records`

**请求参数**: 
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "levelName": "月度会员",
        "joinDate": "2024-01-01",
        "expireDate": "2024-01-31",
        "status": 1,
        "createdAt": "2024-01-01 10:00:00"
      }
    ],
    "total": 10,
    "current": 1,
    "size": 10
  }
}
```

---

## 3. 赛事模块

### 3.1 获取赛事列表

**接口地址**: `GET /api/app/match/list`

**请求参数**:
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）
- `status`: 赛事状态（0-未开始，1-报名中，2-进行中，3-已结束）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "matchName": "春季羽毛球公开赛",
        "matchType": "单打",
        "startTime": "2024-03-01 09:00:00",
        "endTime": "2024-03-01 18:00:00",
        "location": "市体育馆",
        "maxParticipants": 32,
        "currentParticipants": 15,
        "registrationFee": 50.00,
        "registrationDeadline": "2024-02-25 23:59:59",
        "status": 1,
        "description": "面向所有羽毛球爱好者的公开赛",
        "coverImage": "https://xxx.com/match1.jpg"
      }
    ],
    "total": 20,
    "current": 1,
    "size": 10
  }
}
```

### 3.2 获取赛事详情

**接口地址**: `GET /api/app/match/{id}`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "matchName": "春季羽毛球公开赛",
    "matchType": "单打",
    "startTime": "2024-03-01 09:00:00",
    "endTime": "2024-03-01 18:00:00",
    "location": "市体育馆",
    "maxParticipants": 32,
    "currentParticipants": 15,
    "registrationFee": 50.00,
    "registrationDeadline": "2024-02-25 23:59:59",
    "status": 1,
    "description": "面向所有羽毛球爱好者的公开赛",
    "rules": "采用单淘汰赛制，21分制",
    "prizes": "冠军1000元，亚军500元",
    "coverImage": "https://xxx.com/match1.jpg",
    "isRegistered": false
  }
}
```

### 3.3 报名赛事

**接口地址**: `POST /api/app/match/register`

**请求参数**:
```json
{
  "matchId": 1,
  "phone": "13800138000",
  "emergencyContact": "李四",
  "emergencyPhone": "13900139000"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "报名成功",
  "data": {
    "id": 1,
    "matchId": 1,
    "userId": 1,
    "registrationTime": "2024-02-20 10:00:00",
    "status": 0
  }
}
```

### 3.4 取消报名

**接口地址**: `DELETE /api/app/match/register/{id}`

**响应示例**:
```json
{
  "code": 200,
  "message": "取消成功",
  "data": null
}
```

### 3.5 获取我的报名记录

**接口地址**: `GET /api/app/match/my-registrations`

**请求参数**:
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "matchName": "春季羽毛球公开赛",
        "matchType": "单打",
        "startTime": "2024-03-01 09:00:00",
        "location": "市体育馆",
        "registrationTime": "2024-02-20 10:00:00",
        "status": 0,
        "paymentStatus": 1
      }
    ],
    "total": 5,
    "current": 1,
    "size": 10
  }
}
```

---

## 4. 俱乐部模块

### 4.1 获取俱乐部列表

**接口地址**: `GET /api/app/club/list`

**请求参数**:
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）
- `keyword`: 搜索关键词（可选）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "name": "飞羽俱乐部",
        "description": "专业羽毛球培训",
        "address": "市体育馆3楼",
        "contactPhone": "0755-12345678",
        "memberCount": 50,
        "logo": "https://xxx.com/club1.jpg",
        "status": 1
      }
    ],
    "total": 10,
    "current": 1,
    "size": 10
  }
}
```

### 4.2 获取俱乐部详情

**接口地址**: `GET /api/app/club/{id}`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "name": "飞羽俱乐部",
    "description": "专业羽毛球培训",
    "address": "市体育馆3楼",
    "contactPhone": "0755-12345678",
    "contactPerson": "王教练",
    "memberCount": 50,
    "logo": "https://xxx.com/club1.jpg",
    "images": "https://xxx.com/1.jpg,https://xxx.com/2.jpg",
    "facilities": "8片标准场地，专业灯光",
    "openingHours": "周一至周日 08:00-22:00",
    "status": 1,
    "isMember": false
  }
}
```

### 4.3 申请加入俱乐部

**接口地址**: `POST /api/app/club/apply`

**请求参数**:
```json
{
  "clubId": 1,
  "reason": "热爱羽毛球运动，希望加入俱乐部"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "申请已提交",
  "data": {
    "id": 1,
    "clubId": 1,
    "userId": 1,
    "status": 0,
    "applyTime": "2024-01-01 10:00:00"
  }
}
```

### 4.4 退出俱乐部

**接口地址**: `DELETE /api/app/club/quit/{clubId}`

**响应示例**:
```json
{
  "code": 200,
  "message": "退出成功",
  "data": null
}
```

### 4.5 获取我的俱乐部

**接口地址**: `GET /api/app/club/my-clubs`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "name": "飞羽俱乐部",
      "address": "市体育馆3楼",
      "logo": "https://xxx.com/club1.jpg",
      "joinTime": "2024-01-01 10:00:00"
    }
  ]
}
```

### 4.6 申请创建俱乐部

**接口地址**: `POST /api/app/club/create-application`

**请求参数**:
```json
{
  "name": "新俱乐部",
  "description": "俱乐部简介",
  "address": "详细地址",
  "contactPhone": "0755-12345678",
  "contactPerson": "联系人",
  "facilities": "场地设施说明",
  "openingHours": "营业时间",
  "logo": "封面图URL",
  "images": "图片URL列表，逗号分隔"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "申请已提交，等待审核",
  "data": {
    "id": 1,
    "status": 0,
    "applyTime": "2024-01-01 10:00:00"
  }
}
```

---

## 5. 通知资讯模块

### 5.1 获取通知列表

**接口地址**: `GET /api/app/notification/list`

**请求参数**:
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）
- `category`: 通知类型（1-资讯，2-通知）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "title": "春季赛事报名开始",
        "content": "2024年春季羽毛球公开赛现已开放报名...",
        "category": 1,
        "coverImage": "https://xxx.com/news1.jpg",
        "publishTime": "2024-02-01 10:00:00",
        "viewCount": 150
      }
    ],
    "total": 30,
    "current": 1,
    "size": 10
  }
}
```

### 5.2 获取通知详情

**接口地址**: `GET /api/app/notification/{id}`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "id": 1,
    "title": "春季赛事报名开始",
    "content": "2024年春季羽毛球公开赛现已开放报名，欢迎广大羽毛球爱好者踊跃参加...",
    "category": 1,
    "coverImage": "https://xxx.com/news1.jpg",
    "publishTime": "2024-02-01 10:00:00",
    "viewCount": 151
  }
}
```

### 5.3 获取轮播图

**接口地址**: `GET /api/app/notification/banners`

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": [
    {
      "id": 1,
      "title": "春季大促",
      "imageUrl": "https://xxx.com/banner1.jpg",
      "linkUrl": "/pages/match/detail?id=1",
      "sortOrder": 1
    }
  ]
}
```

---

## 6. 用户中心模块

### 6.1 获取培训申请列表

**接口地址**: `GET /api/app/user/training-applications`

**请求参数**:
- `page`: 页码（默认1）
- `size`: 每页数量（默认10）

**响应示例**:
```json
{
  "code": 200,
  "message": "获取成功",
  "data": {
    "records": [
      {
        "id": 1,
        "trainingType": "基础培训",
        "contactPhone": "13800138000",
        "preferredTime": "周末上午",
        "status": 0,
        "applyTime": "2024-01-01 10:00:00",
        "remark": "希望提高基本功"
      }
    ],
    "total": 5,
    "current": 1,
    "size": 10
  }
}
```

### 6.2 提交培训申请

**接口地址**: `POST /api/app/user/training-application`

**请求参数**:
```json
{
  "trainingType": "基础培训",
  "contactPhone": "13800138000",
  "preferredTime": "周末上午",
  "remark": "希望提高基本功"
}
```

**响应示例**:
```json
{
  "code": 200,
  "message": "申请已提交",
  "data": {
    "id": 1,
    "status": 0,
    "applyTime": "2024-01-01 10:00:00"
  }
}