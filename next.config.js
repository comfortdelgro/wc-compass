module.exports = {
  reactStrictMode: true,
  transpilePackages: ['wc-compass'],
  assetPrefix: '/index.html',
  rewrites: async () => [
    {
      source: '/public/index.html',
      destination: '/pages/api/index.js',
    },
  ],
};
