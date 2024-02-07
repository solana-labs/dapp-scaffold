/** @type {import('next').NextConfig} */
const webpack = require('webpack');
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, { buildId }) => {
    config.module.rules.push({
        test: /\.svg$/,
        use: ['@svgr/webpack']
    });
    return config;
},
}

module.exports = nextConfig
