/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  env: {
    API_URL: process.env.API_URL,
    WS_URL: process.env.WS_URL
  }
}

module.exports = nextConfig
