const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware')
const AuthProvider = require('./auth');

const configurationURL = 'https://bricks-nfhyx3cm5q-uc.a.run.app'

const authProvider = new AuthProvider(configurationURL);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

const getToken = async () => {
  const token = await authProvider.getToken();

  console.log(token);

  return token;
};

app.use('/api/*', createProxyMiddleware('/api', {
  pathRewrite: {
    '^/api/*': '', // rewrite path
  },
  changeOrigin: true,
  target: configurationURL,
  onProxyReq: (request) => {
    const token = getToken()
    request.setHeader('Authorization', `Bearer ${token}` );
    request.setHeader('Content-Type', 'application/json');
  },
}))

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
