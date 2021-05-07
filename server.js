const express = require('express');
const app = express();
const path = require('path');

const proxy = require('express-http-proxy');

app.use('/api', proxy('https://intmed-api-medicar.herokuapp.com'));

app.use(express.static(__dirname + '/dist/exercise-medical-consultations'))

app.listen(process.env.PORT || 8080)

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname + '/dist/exercise-medical-consultations/index.html'));
})

