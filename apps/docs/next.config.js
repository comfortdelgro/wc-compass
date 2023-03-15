module.exports = {
  reactStrictMode: false,
  basePath: '/wc-compass',
  transpilePackages: ['wc-compass'],
  assetPrefix: '/wc-compass',
  rewrites: async () => [
    {
      source: '/public/index.html',
      destination: '/pages/api/index.js',
    },
  ],
};
