/** @type {import('next').NextConfig} */

const nextConfig = {
	images: {
		remotePatterns: [
			{ protocol: 'http', hostname: 'localhost' },
			{ protocol: 'https', hostname: 'images.pexels.com' },
			{ protocol: 'https', hostname: 'images.unsplash.com' },
			{ protocol: 'https', hostname: 'html5.gamedistribution.com' },
			{ protocol: 'https', hostname: 'www.twoplayergames.org' },
			{ protocol: 'https', hostname: 'www.miniplay.com' }
		],
		formats: ['image/webp','image/avif'],
		deviceSizes: [640,750,828,1080,1200,1920,2048,3840],
		imageSizes: [16,32,48,64,96,128,256,384],
		minimumCacheTTL: 60,
		dangerouslyAllowSVG: true
	},
	experimental: { } // 重要：不要写 optimizeCss:true
};

export default nextConfig;