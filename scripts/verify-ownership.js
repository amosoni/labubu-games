#!/usr/bin/env node

/**
 * Google Search Console 所有权验证测试脚本
 * 测试 HTML 文件验证和 Google Analytics 验证
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://labubugame.app';
const GA_ID = 'G-LGK50XTFZQ';
const VERIFICATION_FILE = 'googledbc97d323fee3928.html';

// 测试 HTML 文件验证
async function testHtmlVerification() {
  return new Promise((resolve) => {
    const url = `${SITE_URL}/${VERIFICATION_FILE}`;
    console.log(`🔍 测试 HTML 文件验证: ${url}`);
    
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const expectedContent = 'google-site-verification: googledbc97d323fee3928.html';
          if (data.includes(expectedContent)) {
            console.log('✅ HTML 文件验证: 成功');
            resolve(true);
          } else {
            console.log('❌ HTML 文件验证: 内容不匹配');
            console.log('期望内容:', expectedContent);
            console.log('实际内容:', data);
            resolve(false);
          }
        } else {
          console.log(`❌ HTML 文件验证: HTTP ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('❌ HTML 文件验证: 网络错误', err.message);
      resolve(false);
    });
  });
}

// 测试 Google Analytics 验证
async function testGoogleAnalyticsVerification() {
  return new Promise((resolve) => {
    const testUrl = `${SITE_URL}/en`; // 测试英文版本
    console.log(`🔍 测试 Google Analytics 验证: ${testUrl}`);
    
    https.get(testUrl, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          // 检查 GA 代码是否在 <head> 部分
          const headMatch = data.match(/<head[^>]*>([\s\S]*?)<\/head>/i);
          if (headMatch) {
            const headContent = headMatch[1];
            const hasGAScript = headContent.includes('googletagmanager.com/gtag/js');
            const hasGAConfig = headContent.includes(`gtag('config', '${GA_ID}')`) || headContent.includes(`gtag('config', 'G-LGK50XTFZQ')`);
            const hasGAVerification = headContent.includes('google-site-verification');
            
            if (hasGAScript && hasGAConfig && hasGAVerification) {
              console.log('✅ Google Analytics 验证: 成功');
              console.log('  - GA 脚本在 <head> 部分');
              console.log('  - GA 配置正确');
              console.log('  - 网站验证 meta 标签存在');
              resolve(true);
            } else {
              console.log('❌ Google Analytics 验证: 配置不完整');
              console.log('  - GA 脚本在 <head>:', hasGAScript);
              console.log('  - GA 配置正确:', hasGAConfig);
              console.log('  - 网站验证存在:', hasGAVerification);
              console.log('  - 实际 head 内容片段:', headContent.substring(0, 500));
              resolve(false);
            }
          } else {
            console.log('❌ Google Analytics 验证: 无法找到 <head> 部分');
            resolve(false);
          }
        } else {
          console.log(`❌ Google Analytics 验证: HTTP ${res.statusCode}`);
          resolve(false);
        }
      });
    }).on('error', (err) => {
      console.log('❌ Google Analytics 验证: 网络错误', err.message);
      resolve(false);
    });
  });
}

// 主测试函数
async function runVerificationTests() {
  console.log('🚀 开始 Google Search Console 所有权验证测试\n');
  
  const htmlResult = await testHtmlVerification();
  console.log('');
  
  const gaResult = await testGoogleAnalyticsVerification();
  console.log('');
  
  console.log('📊 测试结果总结:');
  console.log(`HTML 文件验证: ${htmlResult ? '✅ 通过' : '❌ 失败'}`);
  console.log(`Google Analytics 验证: ${gaResult ? '✅ 通过' : '❌ 失败'}`);
  
  if (htmlResult && gaResult) {
    console.log('\n🎉 所有验证方法都已正确配置！');
    console.log('现在可以在 Google Search Console 中重新验证网站所有权。');
  } else {
    console.log('\n⚠️  部分验证方法需要修复，请检查上述错误信息。');
  }
}

// 运行测试
runVerificationTests().catch(console.error);
