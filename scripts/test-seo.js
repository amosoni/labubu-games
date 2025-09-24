#!/usr/bin/env node

/**
 * SEO 测试脚本
 * 检查网站的SEO配置是否正确
 */

const https = require('https');
const http = require('http');

const SITE_URL = 'https://labubugame.app';

function followRedirect(url, maxRedirects = 5) {
  return new Promise((resolve, reject) => {
    if (maxRedirects < 0) return reject(new Error('Too many redirects'));
    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, (res) => {
      // 3xx redirect
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        const nextUrl = res.headers.location.startsWith('http')
          ? res.headers.location
          : new URL(res.headers.location, url).toString();
        res.resume();
        followRedirect(nextUrl, maxRedirects - 1).then(resolve).catch(reject);
        return;
      }
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode || 0, data, headers: res.headers }));
    });
    req.on('error', reject);
  });
}

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    client.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, data, headers: res.headers }));
    }).on('error', reject);
  });
}

async function testSEO() {
  console.log('🔍 开始SEO测试...\n');
  
  try {
    // 测试主页（自动跟随重定向，并优先检测 /en）
    console.log('1. 测试主页...');
    const homeResponse = await followRedirect(`${SITE_URL}/en`);
    console.log(`   状态码: ${homeResponse.status}`);
    
    // 检查Google Analytics
    const hasGA = homeResponse.data.includes('gtag') || homeResponse.data.includes('googletagmanager');
    console.log(`   Google Analytics: ${hasGA ? '✅' : '❌'}`);
    
    // 检查结构化数据
    const hasStructuredData = homeResponse.data.includes('application/ld+json');
    console.log(`   结构化数据: ${hasStructuredData ? '✅' : '❌'}`);
    
    // 检查meta标签
    const hasMetaDescription = homeResponse.data.includes('name="description"');
    const hasMetaKeywords = homeResponse.data.includes('name="keywords"');
    const hasOpenGraph = homeResponse.data.includes('property="og:');
    const hasTwitterCard = homeResponse.data.includes('name="twitter:');
    
    console.log(`   Meta Description: ${hasMetaDescription ? '✅' : '❌'}`);
    console.log(`   Meta Keywords: ${hasMetaKeywords ? '✅' : '❌'}`);
    console.log(`   Open Graph: ${hasOpenGraph ? '✅' : '❌'}`);
    console.log(`   Twitter Card: ${hasTwitterCard ? '✅' : '❌'}`);
    
    // 测试sitemap（直接访问最终URL）
    console.log('\n2. 测试Sitemap...');
    try {
      const sitemapResponse = await followRedirect(`${SITE_URL}/sitemap.xml`);
      console.log(`   状态码: ${sitemapResponse.status}`);
      console.log(`   Sitemap: ${sitemapResponse.status === 200 ? '✅' : '❌'}`);
    } catch (error) {
      console.log('   Sitemap: ❌ (无法访问)');
    }
    
    // 测试robots.txt（直接访问最终URL）
    console.log('\n3. 测试Robots.txt...');
    try {
      const robotsResponse = await followRedirect(`${SITE_URL}/robots.txt`);
      console.log(`   状态码: ${robotsResponse.status}`);
      console.log(`   Robots.txt: ${robotsResponse.status === 200 ? '✅' : '❌'}`);
    } catch (error) {
      console.log('   Robots.txt: ❌ (无法访问)');
    }
    
    // 测试favicon（直接访问最终URL）
    console.log('\n4. 测试Favicon...');
    try {
      const faviconResponse = await followRedirect(`${SITE_URL}/favicon.ico`);
      console.log(`   状态码: ${faviconResponse.status}`);
      console.log(`   Favicon: ${faviconResponse.status === 200 ? '✅' : '❌'}`);
    } catch (error) {
      console.log('   Favicon: ❌ (无法访问)');
    }
    
    console.log('\n🎉 SEO测试完成!');
    
  } catch (error) {
    console.error('❌ 测试失败:', error.message);
  }
}

// 运行测试
testSEO();
