/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
      domains: ['imgproxy.fourthwall.com','i.ebayimg.com'],
    },
    experimental: {
      serverActions: true,
    },
  }
  
  module.exports = nextConfig
  