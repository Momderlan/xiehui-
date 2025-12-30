# 动画系统快速参考卡片 🚀

> 一页纸搞定所有动画！复制即用 ⚡

---

## 📌 核心原则（必记）

```
✅ 只在状态变化时动
✅ 只用位移+透明度
✅ 时长统一：进入200ms / 退出150ms / 反馈120ms
✅ 缓动统一：进入ease-out / 退出ease-in
```

---

## 🎯 最常用的3个场景

### 1️⃣ 页面进入动画（必加）

```javascript
// JS
Page({
  data: { showPage: false },
  onShow() {
    this.setData({ showPage: true })
  }
})
```

```xml
<!-- WXML -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <!-- 内容 -->
</view>
```

### 2️⃣ 列表动画（推荐）

```javascript
// JS
const { listAnimationHelper } = require('../../utils/page-animation')

Page({
  data: { list: [] },
  onLoad() {
    const rawList = [/* 数据 */]
    const animatedList = listAnimationHelper.addAnimation(rawList, 10)
    this.setData({ list: animatedList })
  }
})
```

```xml
<!-- WXML -->
<view wx:for="{{list}}" wx:key="id" class="card {{item.animationClass}}">
  {{item.title}}
</view>
```

### 3️⃣ 按钮点击动画（主按钮必加）

```xml
<!-- WXML -->
<button class="btn btn-primary btn-press" bindtap="onSubmit">
  提交
</button>
```

---

## 🎨 所有动画类名速查

| 类名 | 效果 | 用途 |
|------|------|------|
| `page-enter` | 页面从下往上滑入 | 所有页面 |
| `page-leave` | 页面向下滑出 | 页面退出 |
| `list-item-enter` | 列表项上浮 | 列表项基础 |
| `list-item-delay-1` | 延迟20ms | 第1项 |
| `list-item-delay-2` | 延迟40ms | 第2项 |
| `list-item-delay-3` | 延迟60ms | 第3项 |
| `...` | ... | ... |
| `list-item-delay-10` | 延迟200ms | 第10项 |
| `btn-press` | 按下缩小 | 按钮/卡片 |
| `error-shake` | 左右抖动 | 表单错误 |
| `refresh-complete` | 轻微闪现 | 刷新完成 |
| `tab-switch` | 淡入淡出 | Tab切换 |
| `fade-in` | 淡入 | 通用 |
| `fade-out` | 淡出 | 通用 |

---

## 🛠️ 辅助函数速查

### 列表动画

```javascript
const { listAnimationHelper } = require('../../utils/page-animation')

// 添加动画（最多10项）
listAnimationHelper.addAnimation(list, 10)

// 移除动画
listAnimationHelper.removeAnimation(list)
```

### 表单动画

```javascript
const { formAnimationHelper } = require('../../utils/page-animation')

// 错误抖动
formAnimationHelper.shakeError(this, 'formAnimation')

// 按钮按下
formAnimationHelper.pressButton(this, 'buttonAnimation')
```

### Toast动画

```javascript
const { toastAnimationHelper } = require('../../utils/page-animation')

// 成功提示
toastAnimationHelper.showSuccess('提交成功')

// 错误提示
toastAnimationHelper.showError('请输入姓名')
```

---

## 📋 完整页面模板

### 基础页面

```javascript
// pages/xxx/xxx.js
Page({
  data: {
    showPage: false
  },
  
  onShow() {
    this.setData({ showPage: true })
  }
})
```

```xml
<!-- pages/xxx/xxx.wxml -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <view class="container">
    <view class="card list-item-enter list-item-delay-1">
      内容1
    </view>
    <view class="card list-item-enter list-item-delay-2">
      内容2
    </view>
  </view>
</view>
```

### 列表页面

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
    this.setData({ showPage: true })
  },
  
  loadList() {
    const rawList = [
      { id: 1, title: '项目1' },
      { id: 2, title: '项目2' }
    ]
    const animatedList = listAnimationHelper.addAnimation(rawList, 10)
    this.setData({ list: animatedList })
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

### 表单页面

```javascript
// pages/form/form.js
const { formAnimationHelper, toastAnimationHelper } = require('../../utils/page-animation')

Page({
  data: {
    showPage: false,
    formAnimation: {},
    formData: { name: '' }
  },
  
  onShow() {
    this.setData({ showPage: true })
  },
  
  onSubmit() {
    if (!this.data.formData.name) {
      formAnimationHelper.shakeError(this, 'formAnimation')
      toastAnimationHelper.showError('请输入姓名')
      return
    }
    
    toastAnimationHelper.showSuccess('提交成功')
    setTimeout(() => wx.navigateBack(), 1500)
  }
})
```

```xml
<!-- pages/form/form.wxml -->
<view class="page {{showPage ? 'page-enter' : ''}}">
  <view class="container">
    <view class="form-group list-item-enter list-item-delay-1" animation="{{formAnimation}}">
      <input placeholder="请输入姓名" />
    </view>
    
    <button class="btn btn-primary btn-press list-item-enter list-item-delay-2" bindtap="onSubmit">
      提交
    </button>
  </view>
</view>
```

---

## ⚠️ 注意事项（重要）

### ✅ 推荐做法

```javascript
// 1. 在 onShow 中触发页面动画
onShow() {
  this.setData({ showPage: true })
}

// 2. 列表不超过10项
listAnimationHelper.addAnimation(list, 10)

// 3. 只对主按钮使用 btn-press
<button class="btn btn-primary btn-press">提交</button>

// 4. 只对表单区域抖动
formAnimationHelper.shakeError(this, 'formAnimation')
```

### ❌ 不推荐做法

```javascript
// 1. 不要在 onLoad 中触发（看不到动画）
onLoad() {
  this.setData({ showPage: true })  // ❌
}

// 2. 不要对超长列表使用动画
listAnimationHelper.addAnimation(list, 100)  // ❌

// 3. 不要对所有元素都加动画
<view class="text btn-press">普通文字</view>  // ❌

// 4. 不要让整个页面抖动
formAnimationHelper.shakeError(this, 'pageAnimation')  // ❌
```

---

## 🎯 动画参数速查表

| 动画类型 | 时长 | 缓动 | 位移 | 透明度 |
|---------|------|------|------|--------|
| 页面进入 | 200ms | ease-out | Y: 16→0 | 0→1 |
| 页面退出 | 150ms | ease-in | Y: 0→12 | 1→0 |
| 列表项 | 200ms | ease-out | Y: 8→0 | 0→1 |
| 刷新完成 | 120ms | ease-out | - | 0.95→1 |
| 按钮按下 | 80ms | ease-out | scale: 0.96 | - |
| 错误抖动 | 120ms | ease-out | X: -4→4→0 | - |
| Tab切换 | 120ms | ease-out | - | 0.8→1 |

---

## 📱 测试清单

在发布前，请确保：

- [ ] 所有页面都有页面进入动画
- [ ] 列表页面的列表项有动画（不超过10项）
- [ ] 主要按钮有点击动画
- [ ] 表单有错误反馈动画
- [ ] 在低端设备上测试过性能
- [ ] 动画时长和缓动符合规范

---

## 🔗 更多信息

- 📖 完整文档：`ANIMATION_GUIDE.md`
- 📊 实施报告：`ANIMATION_IMPLEMENTATION_REPORT.md`
- 💻 源码：`utils/animation.js` 和 `utils/page-animation.js`
- 🎨 样式：`app.wxss`（搜索"统一动画系统"）

---

**记住**：动画要克制，只在状态变化时使用！🎯