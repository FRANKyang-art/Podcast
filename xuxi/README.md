# 播客应用原型

这是一个类似小宇宙的播客应用高保真原型，使用 HTML + CSS + JavaScript 实现，可用于产品设计和前端开发参考。

## 项目结构

```
├── index.html                # 主入口页面，展示所有界面
├── css
│   └── styles.css            # 全局样式表
├── js
│   └── app.js                # 交互功能实现
└── pages                     # 各个页面
    ├── components.html       # 通用组件（状态栏、导航栏等）
    ├── home.html             # 首页
    ├── explore.html          # 探索页
    ├── podcast-detail.html   # 播客详情页
    ├── playing.html          # 播放页
    ├── profile.html          # 用户页
    └── settings.html         # 设置页
```

## 页面说明

1. **首页(Home)** - 展示推荐内容、新上线播客和最近收听的内容
2. **探索(Explore)** - 提供搜索功能和分类导航，发现新播客
3. **播客详情(Podcast Detail)** - 显示特定播客的详细信息和剧集列表
4. **播放页(Playing)** - 当前正在播放的内容控制页面
5. **用户页(Profile)** - 用户个人资料和订阅内容管理
6. **设置页(Settings)** - 应用各项设置选项

## 技术实现

- 使用 HTML 和 CSS 构建界面
- 使用 JavaScript 实现交互功能
- 采用 Font Awesome 提供图标支持
- 所有界面采用模拟 iPhone 15 Pro 尺寸(390x844px)的视觉效果
- 包含模拟 iOS 状态栏和底部导航栏

## 交互功能

以下是通过 JavaScript 实现的主要交互功能：

1. **播放控制** - 可以播放/暂停、前进/后退、跳转到下一集/上一集
2. **进度条交互** - 可以点击进度条改变播放位置
3. **动态时间显示** - 状态栏实时显示当前系统时间
4. **播客订阅功能** - 可以订阅/取消订阅播客
5. **页签切换** - 用户资料页和播客详情页可以切换不同的页签
6. **操作反馈** - 点击操作后会显示提示信息
7. **页面导航** - 支持在不同页面之间切换

## 使用方法

1. 直接打开 `index.html` 文件在浏览器中查看所有界面预览
2. 每个界面都可以单独打开查看并交互
3. 界面之间通过底部导航栏可以相互切换
4. 所有元素都使用 CSS 进行样式设计，便于修改和适配

## 设计特点

- 采用现代化 UI 设计风格
- 一致的色彩方案和排版风格
- 使用真实图片替代占位符，提高视觉效果
- 模拟真实应用的交互方式

## 如何进一步开发

1. 可以添加更多复杂的交互功能，如音频实际播放、数据存储等
2. 可以整合到 React/Vue 等前端框架中，实现功能完整的应用
3. 可以作为 UI 设计稿和交互原型，供开发团队参考实现

## 界面预览

通过打开 `index.html` 文件，可以在同一页面上查看所有的界面设计。每个界面以 iPhone 设备外观进行展示，使预览更加直观。 