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

// auth middleware on proxy request
app.use((req, _, next) => {
  if (req) {
    getToken().then((token) => {
      if (token) {
        req.headers["Authorization"] = `Bearer ${token}`
      }
      next()
    })
  } else {
    next()
  }
})

app.use('/api/*', createProxyMiddleware('/api', {
  pathRewrite: {
    '^/api/*': '', // rewrite path
  },
  changeOrigin: true,
  target: configurationURL,
}))

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
