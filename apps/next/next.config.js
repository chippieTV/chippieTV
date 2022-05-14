/** @type {import('next').NextConfig} */

const nextConfig = require('next-transpile-modules')(['ui']); // pass the modules you would like to see transpiled
nextConfig.reactStrictMode = true;

module.exports = nextConfig
