# SEO 配置说明

## 问题诊断与解决方案

### 原始问题
您的网站存在以下SEO问题导致谷歌代码找不到：

1. **Google Analytics 重复加载** - 在两个layout文件中都加载了GA代码
2. **Script标签位置不当** - 加载策略和位置不优化
3. **缺少结构化数据** - 没有JSON-LD结构化数据
4. **元数据不完整** - 缺少重要的SEO meta标签
5. **URL不一致** - 不同文件中使用了不同的域名

### 已修复的问题

#### 1. Google Analytics 优化
- ✅ 移除了重复的GA代码
- ✅ 使用 `beforeInteractive` 策略优先加载
- ✅ 添加了自定义参数跟踪语言
- ✅ 配置了正确的页面跟踪

#### 2. 元数据完善
- ✅ 添加了完整的 robots meta 标签
- ✅ 配置了 Open Graph 和 Twitter Card
- ✅ 添加了多语言支持
- ✅ 设置了正确的 canonical URL

#### 3. 结构化数据
- ✅ 创建了 JSON-LD 结构化数据组件
- ✅ 支持网站、游戏、集合页面类型
- ✅ 添加了搜索功能结构化数据

#### 4. 配置文件统一
- ✅ 创建了 `src/lib/seo.ts` 统一配置
- ✅ 所有文件使用相同的配置源
- ✅ 支持环境变量配置

## 使用方法

### 1. 直接配置
所有配置都直接在 `src/lib/seo.ts` 文件中设置，无需env文件。

### 2. 测试SEO配置
```bash
npm run test-seo
```

### 3. 验证Google Analytics
1. 在浏览器中打开网站
2. 打开开发者工具 > Network 标签
3. 搜索 "gtag" 或 "googletagmanager"
4. 确认请求成功发送

### 4. 验证结构化数据
1. 使用 [Google Rich Results Test](https://search.google.com/test/rich-results)
2. 输入您的网站URL
3. 检查结构化数据是否正确识别

## 文件结构

```
src/
├── lib/
│   └── seo.ts                    # SEO配置文件（直接设置，无需env）
├── components/
│   └── seo/
│       └── StructuredData.tsx    # 结构化数据组件
├── app/
│   ├── layout.tsx               # 根布局（简化）
│   ├── [locale]/
│   │   └── layout.tsx           # 语言布局（包含GA和SEO）
│   ├── sitemap.ts              # 网站地图
│   └── robots.ts               # 爬虫规则
└── scripts/
    └── test-seo.js             # SEO测试脚本
```

## 简化配置

现在所有配置都直接在 `src/lib/seo.ts` 中设置：

```typescript
export const seoConfig = {
  siteUrl: 'https://labubugame.app',           // 您的网站URL
  siteName: 'Labubu Game',                     // 网站名称
  siteDescription: 'Build your cute monster...', // 网站描述
  gaId: 'G-LGK50XTFZQ',                        // Google Analytics ID
  googleVerification: 'your-verification-code', // Google Search Console验证码（可选）
};
```

**无需创建任何env文件！** 直接修改这个文件中的值即可。

## 关键改进

### Google Analytics 配置
```javascript
// 优化后的GA配置
gtag('config', 'G-LGK50XTFZQ', {
  page_title: document.title,
  page_location: window.location.href,
  send_page_view: true,
  custom_map: {
    'custom_parameter_1': 'locale'
  }
});
```

### 结构化数据示例
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Labubu Game",
  "description": "Build your cute monster world and play the best games for girls!",
  "url": "https://labubugame.app",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://labubugame.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

## 下一步建议

1. **Google Search Console** - 添加并验证您的网站
2. **Google Analytics** - 确认数据正常收集
3. **页面速度优化** - 使用 PageSpeed Insights 测试
4. **移动友好性** - 确保响应式设计
5. **内容优化** - 添加更多高质量内容

## 常见问题

### Q: Google Analytics 仍然不工作？
A: 检查以下几点：
- 确认 GA ID 正确
- 检查网络请求是否成功
- 验证网站是否已部署
- 确认没有广告拦截器

### Q: 结构化数据测试失败？
A: 检查以下几点：
- JSON格式是否正确
- 必需字段是否完整
- 图片URL是否可访问
- 数据类型是否匹配

### Q: 搜索引擎不索引？
A: 检查以下几点：
- robots.txt 是否正确
- sitemap.xml 是否可访问
- 网站是否已提交到搜索引擎
- 内容质量是否足够
