const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');
const { send } = require('process');

const rawdata = fs.readFileSync('phrases.json');
const data = JSON.parse(rawdata);

function getPhrases(date) {
  const fdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  phrases = data.find(a => a.date === fdate);
  if (phrases) return phrases.phrases;
  return null;
}

app.get('/api/phrases', (req, res) => {
  const reqDate = new Date(+req.query.date);
  const phrases = getPhrases(reqDate);
  if (phrases) {
    res.send(getPhrases(reqDate));
  } else {
    res.statusCode = 404;
    res.send('No phrases for today :(')
  }
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(3000, () => console.log('Server has been started on 3000'))
