const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");
const { createProxyMiddleware } = require('http-proxy-middleware')

const configurationURL = 'http://bricks-nfhyx3cm5q-uc.a.run.app'


const getAuthToken = async () => {
  let token = '';
  try {
    const response  = await axios.get('http://metadata.google.internal/computeMetadata/v1/instance/service-accounts/default/identity?audience=' + configurationURL + '/', {
      headers: {
        'Metadata-Flavor': 'Google'
      },
    });

    const { data } = response;

    console.log(response);
    token = data;
  } finally {
    return token;
  };
};

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));


app.use('/api/*', createProxyMiddleware({
  pathRewrite: {
    '^/api/*': '', // rewrite path
  },
  changeOrigin: true,
  target: configurationURL,
  onProxyReq: async (proxyReq, req, res) => {
    const authToken = await getAuthToken()
    proxyReq.setHeader('Authorization', 'Bearer ' + authToken);
    console.log(authToken);
  },
}))

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
