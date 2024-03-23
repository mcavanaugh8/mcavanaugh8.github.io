const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');

const {
    getHomePage,
} = require('../controllers/controllers.js')

// router.get('/login', (req, res) => {
//     // Render the login page
//     res.render('login');
// });

router.get('/', (req, res) => {
    // Render the homepage, only accessible if logged in
    getHomePage(req, res)

});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/');
    });

router.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        // Redirect to home page or any other page after logout
        res.redirect('/');
    });
});

router.post('/user-results', (req, res) => {
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

module.exports = router;