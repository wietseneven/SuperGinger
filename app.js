'use strict';
const express = require('express');
const path = require('path');
const app = express();

// Make everything in the public directory public
app.use(express.static(path.join(__dirname, 'public')));

// Use pug/jade as the render view engine
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!'});
});

app.listen(7933, function () {
  console.log('Example app listening on port 7933!');
});