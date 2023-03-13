module.exports = {
  reactStrictMode: true,
  transpilePackages: ['ui'],
  rewrites: async () => [
    {
      source: '/public/index.html',
      destination: '/pages/api/index.js',
    },
  ],
};
