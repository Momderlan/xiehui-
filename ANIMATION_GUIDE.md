# 微信小程序动画系统使用指南

## 📋 目录

1. [设计原则](#设计原则)
2. [文件结构](#文件结构)
3. [快速开始](#快速开始)
4. [动画类型](#动画类型)
5. [使用示例](#使用示例)
6. [最佳实践](#最佳实践)

---

## 🎯 设计原则

本动画系统遵循以下 4 个核心原则：

### 1. 只在"状态变化"时动
- ✅ 页面进入/离开
- ✅ 列表加载/刷新
- ✅ 操作成功/失败
- ❌ 不要无意义的装饰性动画

### 2. 只用「位移 + 透明度」
- ✅ translateY（上下位移）
- ✅ opacity（透明度）
- ❌ 不用旋转
- ❌ 不用缩放（极少数按钮可用）

### 3. 动画时长统一
- 进入：**200ms**
- 退出：**150ms**
- 操作反馈：**120ms**
- 列表项延迟：**20ms**

### 4. 缓动统一
- 进入：**ease-out**
- 退出：**ease-in**
- 反馈：**ease-out**

---

## 📁 文件结构

```
utils/
├── animation.js           # 全局动画配置和创建函数
└── page-animation.js      # 页面动画混入和辅助函数

app.wxss                   # 全局动画样式类
```

---

## 🚀 快速开始

### 方式一：使用 CSS 类名（推荐）

#### 1. 在 JS 中添加状态

```javascript
// pages/xxx/xxx.js
Page({
  data: {
    showPage: false  // 页面显示状态
  },
  
  onShow() {
    // 触发页面进入动画
    this.setData({
      showPage: true
    })
  }
})
```

#### 2. 在 WXML 中应用类名

```xml
<!-- 页面容器添加进入动画 -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <!-- 内容 -->
</view>
```

### 方式二：使用辅助函数

```javascript
// pages/xxx/xxx.js
const { listAnimationHelper } = require('../../utils/page-animation')

Page({
  data: {
    list: []
  },
  
  onLoad() {
    // 加载列表数据
    const rawList = [/* 数据 */]
    
    // 为列表添加动画类名
    const animatedList = listAnimationHelper.addAnimation(rawList, 10)
    
    this.setData({
      list: animatedList
    })
  }
})
```

```xml
<!-- 列表项应用动画 -->
<view wx:for="{{list}}" wx:key="id" class="{{item.animationClass}}">
  <!-- 列表项内容 -->
</view>
```

---

## 🎨 动画类型

### 1. 页面动画

#### 页面进入动画
- **效果**：从下往上轻微滑入 + 淡入
- **参数**：translateY(16rpx → 0)，opacity(0 → 1)
- **时长**：200ms
- **缓动**：ease-out

```xml
<view class="page {{showPage ? 'page-enter' : ''}}">
  <!-- 页面内容 -->
</view>
```

#### 页面退出动画
- **效果**：向下轻微滑出 + 淡出
- **参数**：translateY(0 → 12rpx)，opacity(1 → 0)
- **时长**：150ms
- **缓动**：ease-in

```xml
<view class="page {{!showPage ? 'page-leave' : ''}}">
  <!-- 页面内容 -->
</view>
```

### 2. 列表动画

#### 列表项进入动画
- **效果**：逐个轻微上浮 + 淡入
- **参数**：translateY(8rpx → 0)，opacity(0 → 1)
- **延迟**：每项延迟 20ms
- **限制**：最多 10 项，超过不动画

```xml
<view class="list-item-enter list-item-delay-1">项目1</view>
<view class="list-item-enter list-item-delay-2">项目2</view>
<view class="list-item-enter list-item-delay-3">项目3</view>
```

#### 刷新完成动画
- **效果**：轻微闪现
- **参数**：opacity(0.95 → 1)
- **时长**：120ms

```xml
<view class="refresh-complete">
  <!-- 刷新后的内容 -->
</view>
```

### 3. 交互动画

#### 按钮点击动画
- **效果**：按下时轻微缩小
- **参数**：scale(1 → 0.96)
- **时长**：80ms
- **用途**：主要按钮、卡片

```xml
<button class="btn btn-primary btn-press">提交</button>
<view class="card btn-press" bindtap="onTap">卡片</view>
```

#### 成功反馈动画
- **效果**：Toast 淡入 + 轻微上浮
- **参数**：translateY(6rpx → 0)，opacity(0 → 1)
- **时长**：150ms

```javascript
const { toastAnimationHelper } = require('../../utils/page-animation')

// 显示成功提示
toastAnimationHelper.showSuccess('提交成功')
```

#### 错误反馈动画
- **效果**：轻微左右抖动
- **参数**：translateX(-4rpx → 4rpx → 0)
- **时长**：120ms
- **用途**：表单验证失败

```xml
<view class="form-group {{hasError ? 'error-shake' : ''}}">
  <input placeholder="请输入" />
</view>
```

```javascript
const { formAnimationHelper } = require('../../utils/page-animation')

// 触发错误抖动
formAnimationHelper.shakeError(this, 'formAnimation')
```

### 4. TabBar 切换动画

- **效果**：内容区淡入淡出
- **参数**：opacity(0.8 → 1)
- **时长**：120ms
- **注意**：只动内容区，Tab 本身不动

```xml
<view class="tab-content {{activeTab === 'home' ? 'tab-switch' : ''}}">
  <!-- Tab 内容 -->
</view>
```

---

## 💡 使用示例

### 示例 1：基础页面动画

```javascript
// pages/example/example.js
Page({
  data: {
    showPage: false
  },
  
  onShow() {
    this.setData({
      showPage: true
    })
  }
})
```

```xml
<!-- pages/example/example.wxml -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <view class="container">
    <view class="card">内容</view>
  </view>
</view>
```

### 示例 2：列表页面动画

```javascript
// pages/list/list.js
const { listAnimationHelper } = require('../../utils/page-animation')

Page({
  data: {
    showPage: false,
    list: []
  },
  
  onLoad() {
    this.loadList()
  },
  
  onShow() {
    this.setData({
      showPage: true
    })
  },
  
  loadList() {
    // 模拟加载数据
    const rawList = [
      { id: 1, title: '项目1' },
      { id: 2, title: '项目2' },
      { id: 3, title: '项目3' }
    ]
    
    // 添加动画类名（最多10项）
    const animatedList = listAnimationHelper.addAnimation(rawList, 10)
    
    this.setData({
      list: animatedList
    })
  },
  
  onPullDownRefresh() {
    this.loadList()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 300)
  }
})
```

```xml
<!-- pages/list/list.wxml -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <view class="container">
    <view wx:for="{{list}}" wx:key="id" class="card {{item.animationClass}}">
      {{item.title}}
    </view>
  </view>
</view>
```

### 示例 3：表单页面动画

```javascript
// pages/form/form.js
const { formAnimationHelper, toastAnimationHelper } = require('../../utils/page-animation')

Page({
  data: {
    showPage: false,
    formAnimation: {},
    formData: {
      name: '',
      phone: ''
    }
  },
  
  onShow() {
    this.setData({
      showPage: true
    })
  },
  
  onSubmit() {
    // 验证表单
    if (!this.data.formData.name) {
      // 触发错误抖动
      formAnimationHelper.shakeError(this, 'formAnimation')
      toastAnimationHelper.showError('请输入姓名')
      return
    }
    
    // 提交成功
    toastAnimationHelper.showSuccess('提交成功')
    
    // 返回上一页
    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
```

```xml
<!-- pages/form/form.wxml -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <view class="container">
    <view class="form-group" animation="{{formAnimation}}">
      <input placeholder="请输入姓名" value="{{formData.name}}" />
    </view>
    
    <button class="btn btn-primary btn-press" bindtap="onSubmit">
      提交
    </button>
  </view>
</view>
```

---

## ✅ 最佳实践

### 1. 页面动画

✅ **推荐做法**
```javascript
// 在 onShow 中触发
onShow() {
  this.setData({ showPage: true })
}
```

❌ **不推荐**
```javascript
// 不要在 onLoad 中触发（可能看不到动画）
onLoad() {
  this.setData({ showPage: true })
}
```

### 2. 列表动画

✅ **推荐做法**
```javascript
// 列表不超过 10 项时使用动画
const animatedList = listAnimationHelper.addAnimation(list, 10)
```

❌ **不推荐**
```javascript
// 不要对超长列表使用动画（会卡顿）
const animatedList = listAnimationHelper.addAnimation(list, 100)
```

### 3. 按钮动画

✅ **推荐做法**
```xml
<!-- 只对主要按钮使用 -->
<button class="btn btn-primary btn-press">提交</button>
```

❌ **不推荐**
```xml
<!-- 不要对所有元素都加动画 -->
<view class="text btn-press">普通文字</view>
```

### 4. 错误反馈

✅ **推荐做法**
```javascript
// 只对表单区域抖动
formAnimationHelper.shakeError(this, 'formAnimation')
```

❌ **不推荐**
```javascript
// 不要让整个页面抖动（很廉价）
formAnimationHelper.shakeError(this, 'pageAnimation')
```

### 5. 性能优化

✅ **推荐做法**
- 列表超过 10 项不使用动画
- 使用 CSS 动画而非 JS 动画
- 避免同时触发多个动画

❌ **不推荐**
- 对所有元素都加动画
- 使用复杂的 3D 变换
- 动画时长过长（>300ms）

---

## 🔧 API 参考

### animation.js

```javascript
const animation = require('../../utils/animation.js')

// 配置常量
animation.DURATION          // 时长配置
animation.TIMING_FUNCTION   // 缓动配置
animation.PAGE_ENTER        // 页面进入配置
animation.PAGE_LEAVE        // 页面退出配置

// 创建函数
animation.createPageEnterAnimation()        // 创建页面进入动画
animation.createPageLeaveAnimation()        // 创建页面退出动画
animation.createListItemEnterAnimation(i)   // 创建列表项动画
animation.createRefreshCompleteAnimation()  // 创建刷新动画
animation.createButtonPressAnimation()      // 创建按钮动画
animation.createErrorShakeAnimation()       // 创建错误抖动
```

### page-animation.js

```javascript
const { 
  listAnimationHelper,
  formAnimationHelper,
  toastAnimationHelper 
} = require('../../utils/page-animation')

// 列表动画
listAnimationHelper.addAnimation(list, maxItems)
listAnimationHelper.removeAnimation(list)

// 表单动画
formAnimationHelper.shakeError(page, fieldName)
formAnimationHelper.pressButton(page, buttonName)

// Toast 动画
toastAnimationHelper.showSuccess(title, duration)
toastAnimationHelper.showError(title, duration)
```

---

## 📝 注意事项

1. **动画时长**：严格遵循统一时长，不要随意修改
2. **动画类型**：只用位移和透明度，不用旋转和缩放
3. **性能考虑**：列表超过 10 项不使用动画
4. **用户体验**：动画要克制，不要过度使用
5. **兼容性**：测试不同机型的动画效果

---

## 🎓 总结

统一的动画系统能让小程序显得非常"整"，关键是：

1. ✅ 只在状态变化时动
2. ✅ 只用位移 + 透明度
3. ✅ 时长和缓动统一
4. ✅ 克制使用，不过度

遵循这些原则，你的小程序会有专业、流畅的用户体验！