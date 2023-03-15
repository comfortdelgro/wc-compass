module.exports = {
  reactStrictMode: false,
  basePath: process.env.BASE_PATH || '',
  transpilePackages: ['wc-compass'],
  rewrites: async () => [
    {
      source: '/public/index.html',
      destination: '/pages/api/index.js',
    },
  ],
};

//assetPrefix: process.env.BASE_PATH || '',
