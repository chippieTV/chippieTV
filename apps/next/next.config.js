/** @type {import('next').NextConfig} */

const nextConfig = require('next-transpile-modules')(['ui']); // pass the modules you would like to see transpiled
nextConfig.reactStrictMode = true;

// should fix the files
// https://wallis.dev/blog/next-js-basepath-and-assetprefix
nextConfig.basePath = "/chippieTV.github.io";
nextConfig.assetPrefix = "/chippieTV.github.io/";

// nextConfig.webpack = (config, { dev, isServer }) => {
//     // Replace React with Preact only in client production build
//     // if (!dev && !isServer) {
//       Object.assign(config.resolve.alias, {
//         react: 'preact/compat',
//         'react-dom/test-utils': 'preact/test-utils',
//         'react-dom': 'preact/compat',
//       });
//     // }

module.exports = nextConfig;
