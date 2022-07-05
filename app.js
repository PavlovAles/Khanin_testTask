const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const rawdata = fs.readFileSync('phrases.json');
const data = JSON.parse(rawdata);

function getPhrases(date) {
  const fdate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  return data.filter(a => a.date === fdate)[0].phrases;
}

app.get('/api/phrases', (req, res) => {
  const reqDate = new Date(+req.query.date);
  res.send(getPhrases(reqDate));
});

app.use(express.static(path.resolve(__dirname, 'dist')));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
});

app.listen(3000, () => console.log('Server has been started on 3000'))
