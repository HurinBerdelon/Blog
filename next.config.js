const { i18n } = require('./next-i18next.config')

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'images.prismic.io',
      'hurin-blog.s3.sa-east-1.amazonaws.com',
      'lh3.googleusercontent.com'
    ]
  },
  i18n,
}

module.exports = nextConfig
