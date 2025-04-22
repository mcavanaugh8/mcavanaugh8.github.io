const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const helpers = require('handlebars-helpers')();
const dotenv = require('dotenv').config();
const session = require('express-session');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const User = require('./models/user');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'draft-site-live',
})
.then((result) => {
  console.log('Connected to DB!');

  app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
      dbName: 'draft-site-live',
      collectionName: 'sessions'
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  let callbackURL = process.env.NODE_ENV === 'development' ? process.env.CALLBACK_URL_DEV : process.env.CALLBACK_URL_PRODUCTION;

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ googleId: profile.id });
        if (!user) {
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            drafts: [],
          });
          await user.save();
        }
        done(null, user);
      } catch (err) {
        done(err);
      }
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).lean().exec((err, user) => {
      done(err, user);
    });
  });

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }

  app.engine('.hbs', handlebars.engine({
    defaultLayout: 'main',
    extname: '.hbs',
    helpers: helpers
  }));

  app.set('view engine', '.hbs');

  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/img', express.static(path.join(__dirname, 'docs/img')));

  app.use('/', require('./routes/routes'));

  app.use((req, res) => {
    res.render('error', {
      layout: 'main',
      errorCode: res.statusCode,
      action: 'Validate',
      path: 'validator',
      user: req.user,
      Authenticated: true
    });
  });

  app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
})
.catch((err) => {
  console.error('ERR: Failed to connect to DB:', err);
});
