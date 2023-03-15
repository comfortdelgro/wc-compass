module.exports = {
  reactStrictMode: true,
  transpilePackages: ['wc-compass'],
  rewrites: async () => [
    {
      source: '/public/index.html',
      destination: '/pages/api/index.js',
    },
  ],
};
