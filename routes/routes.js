const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');

const {
    getHomePage,
    logOut,
    sendResults
} = require('../controllers/controllers.js')

const User = require('../models/user.js');

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

router.get('/logout', (req, res) => logOut(req, res));

router.post('/user-results', async (req, res) => sendResults(req.user.googleId, req.body));

module.exports = router;