const proxy = [
  {
    context: '/api',
    target: 'https://intmed-api-medicar.herokuapp.com',
    secure: true,
    changeOrigin: true,
    pathRewrite: {'^/api' : ''}
  }
];
module.exports = proxy;
