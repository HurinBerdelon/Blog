const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.prismic.io' },
      { protocol: 'https', hostname: 'hurin-blog.s3.sa-east-1.amazonaws.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ]
  },
  i18n,
}

module.exports = nextConfig
