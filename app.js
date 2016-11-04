'use strict';
const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

// Make everything in the public directory public
app.use(express.static(path.join(__dirname, 'public')));
app.use('/libs', express.static(__dirname + '/node_modules'));

// Use pug/jade as the render view engine
app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'Super Ginger', message: 'Hello there!'});
});

app.get('/levels/:level', function (req, res) {
  res.setHeader('Content-Type', 'application/json');

  const level = req.params.level;
  const levelPath = path.join(__dirname, "src/levels/"+level+".json");
  try {
    fs.accessSync(levelPath, fs.F_OK);
    res.sendFile(levelPath);
  } catch (e) {
    res.send(JSON.stringify({ name: "This level doesn't exist (yet).", error: true }, null, 3));
  }
});

app.listen(7933, function () {
  console.log('Example app listening on port 7933!');
});