# 百句斩 - 部署指南

## 🚀 快速部署方案

### 方案一：Vercel部署（推荐）

1. **准备工作**
   ```bash
   # 确保项目可以正常构建
   npm install
   npm run build
   ```

2. **部署步骤**
   - 访问 [vercel.com](https://vercel.com) 注册账号
   - 点击 "New Project"
   - 导入你的GitHub仓库
   - Vercel会自动检测React项目并配置构建
   - 点击 "Deploy" 完成部署

3. **自定义域名**（可选）
   - 在项目设置中添加自定义域名
   - 配置DNS解析

### 方案二：Netlify部署

1. **准备工作**
   ```bash
   npm install
   npm run build
   ```

2. **部署步骤**
   - 访问 [netlify.com](https://netlify.com) 注册账号
   - 点击 "New site from Git"
   - 选择你的GitHub仓库
   - 构建命令：`npm run build`
   - 发布目录：`build`
   - 点击 "Deploy site"

### 方案三：GitHub Pages部署

1. **安装gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **修改package.json**
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d build"
     },
     "homepage": "https://你的用户名.github.io/仓库名"
   }
   ```

3. **部署**
   ```bash
   npm run deploy
   ```

## 🌐 国内部署方案

### 阿里云OSS + CDN

1. **创建OSS存储桶**
   - 登录阿里云控制台
   - 创建OSS存储桶
   - 设置静态网站托管

2. **上传文件**
   ```bash
   npm run build
   # 使用阿里云CLI或控制台上传build目录内容
   ```

3. **配置CDN**
   - 创建CDN加速域名
   - 配置源站为OSS域名
   - 配置缓存策略

### 腾讯云COS

1. **创建存储桶**
   - 登录腾讯云控制台
   - 创建COS存储桶
   - 开启静态网站功能

2. **上传部署**
   ```bash
   npm run build
   # 使用腾讯云CLI上传文件
   ```

## 📱 PWA支持（可选）

为了提供更好的移动端体验，可以添加PWA支持：

1. **安装依赖**
   ```bash
   npm install workbox-webpack-plugin
   ```

2. **配置Service Worker**
   - 创建sw.js文件
   - 配置缓存策略
   - 注册Service Worker

3. **添加manifest.json**
   ```json
   {
     "name": "百句斩",
     "short_name": "百句斩",
     "start_url": "/",
     "display": "standalone",
     "background_color": "#ffffff",
     "theme_color": "#1890ff",
     "icons": [
       {
         "src": "icon-192.png",
         "sizes": "192x192",
         "type": "image/png"
       }
     ]
   }
   ```

## 🔧 环境变量配置

创建 `.env.production` 文件：

```env
REACT_APP_API_URL=https://your-api-domain.com
REACT_APP_APP_NAME=百句斩
REACT_APP_VERSION=1.0.0
```

## 📊 性能优化建议

1. **代码分割**
   - 使用React.lazy()进行路由级代码分割
   - 配置webpack分包策略

2. **资源优化**
   - 压缩图片资源
   - 启用gzip压缩
   - 配置CDN缓存

3. **监控分析**
   - 集成Google Analytics
   - 添加错误监控（如Sentry）
   - 性能监控

## 🚨 注意事项

1. **HTTPS要求**
   - 现代浏览器要求PWA必须使用HTTPS
   - 确保部署平台支持HTTPS

2. **浏览器兼容性**
   - 测试主流浏览器兼容性
   - 提供降级方案

3. **数据备份**
   - 定期备份用户数据
   - 考虑数据迁移方案

## 📞 技术支持

如遇到部署问题，可以：
- 查看平台官方文档
- 检查构建日志
- 联系技术支持

---

**推荐部署顺序：**
1. 先使用Vercel快速部署验证
2. 根据用户群体选择国内平台
3. 考虑添加PWA支持提升体验 