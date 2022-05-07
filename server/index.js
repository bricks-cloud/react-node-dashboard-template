const express = require('express');
const bodyParser = require('body-parser');
const path = require("path");

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));

app.listen(3000, () =>
  console.log('Express server is running on localhost:3000')
);
