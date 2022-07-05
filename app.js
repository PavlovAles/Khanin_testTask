const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

let rawdata = fs.readFileSync('phrases.json');

app.get('/api/phrases', (req, res) => {
  res.send(rawdata);
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(3000, () => console.log('Server has been started on 3000'))
