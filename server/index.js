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

const getMiddleware = async (req, res) => {
  const authHeader = await authProvider.getAuthHeader();

  console.log(authHeader);

  return createProxyMiddleware({
    pathRewrite: {
      '^/api/*': '', // rewrite path
    },
    changeOrigin: true,
    target: configurationURL,
    headers: authHeader,
  })(req, res)
};

app.use('/api/*', (req, res) => getMiddleware(req, res))

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
