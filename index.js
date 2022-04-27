const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const User = require('./models/user');

const app = express();
const dbURL =
  'mongodb+srv://test-user:test-password@draft-site-live.vdolk.mongodb.net/draft-site-live?retryWrites=true&w=majority';

mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT);
    // console.log(`SUCCESS: Server started on port ${PORT}`);
  })
  .catch((err) => console.log('ERR: ' + err));

const PORT = process.env.PORT || 3000;

// app.listen(PORT, () => console.log(`Listening at PORT ${PORT}`));
app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));

app.get('/', (req, res) => {
  res.sendFile('./public/index.html', {
    root: __dirname
  });
});

app.post('/user-results', (req, res) => {
  console.log('Request received.');
  console.log(req.body);

  const newResult = new User({
    name: req.body.name,
    picks: req.body.picks,
    score: req.body.score,
  });

  newResult
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((error) => console.log('ERROR: ' + error));

  // res.json({
  //   status: 'success!!',
  //   name: req.body.name,
  //   picks: req.body.picks,
  //   score: req.body.score,
  // });
});