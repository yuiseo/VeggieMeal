/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false };
    return config;
}}

const path = require('path')

module.exports = {
  nextConfig,
  sassOptions:{
    includePaths: [path.join(__dirname, 'styles')],
  },
  experimental: {
    images: {
      allowFutureImage: true,
      domains:['i.ytimg.com']
    },
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  }
  // rewrites(){
  //   return[
  //     {
  //       source: '/api/:path*',
  //       destination: 'https://openapi.naver.com/:path*'
  //     },
  //   ];
  // }
}