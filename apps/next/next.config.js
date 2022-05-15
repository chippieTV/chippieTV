/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const withTM = require('next-transpile-modules')(['ui']); // pass the modules you would like to see transpiled

module.exports = withTM({
    basePath: "/chippieTV.github.io",
    assetPrefix: isProd ? "/chippieTV.github.io/" : "",
    reactStrictMode: true,
    webpack: (config, { dev, isServer }) => {
        // Replace React with Preact only in client production build
        if (!dev && !isServer) {
          Object.assign(config.resolve.alias, {
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
          });
        }

        return config;
    }
});
