const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
var helpers = require('handlebars-helpers')();
const dotenv = require('dotenv').config();

const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const morgan = require('morgan');
const mongoose = require('mongoose');

const User = require('./models/user');

const app = express();
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
  (accessToken, refreshToken, profile, cb) => {
    // Here, you would usually find or create a user in your database.
    // For demonstration purposes, we'll just pass the profile through.
    return cb(null, profile);
  }
));

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

/**parse json and http requests */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

/** Express Handlebars setup */
app.engine(
  '.hbs',
  handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: {
      times: function (n, block) {
        var accum = '';

        for (var i = 1; i <= n; i++) {
          accum += block.fn(i);
        }

        return accum;
      },
      jsonStringify: function (context) {
        return JSON.stringify(context);
      },
      parseInt: function(value) {
        return parseInt(value, 10);
      }

    },
  })
);

app.set('view engine', '.hbs');

// Configure express to use sessions for authentication
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

// Configure passport to use sessions for authentication
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.redirect('/');
  });

const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then((result) => {
    console.log('Connected to DB!')
  })
  .catch((err) => console.log('ERR: ' + err));


app.use(express.static('public'));
app.use(express.json({
  limit: '1mb'
}));



/**handle invalid requests */

app.use(function (req, res, next) {

  // if (req.user) {
    // User is authenticated, render the profile page
    res.render('error', {
      layout: 'main',
      errorCode: res.statusCode,
      Validator: true,
      action: 'Validate',
      path: 'validator',
      user: req.user, 
      Authenticated: true
    });
  // } else {
    // User is not authenticated, render the login page
    // res.status(200).render('login', { layout: 'login'});
  // }
});

/**start app */

if (process.env.NODE_ENV === 'development') {
  https
    .createServer({
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    }, app)
    .listen(PORT, console.log(`DEV: Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

} else {
  app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
  );
}

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