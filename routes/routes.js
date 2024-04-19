const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');

const {
    getHomePage,
    logOut,
    sendResults,
    saveDraft,
    getLiveDraft,
    getMockDraft
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

router.get('/live-draft', (req, res) => {
    getLiveDraft(req, res);
});

router.get('/mock-draft', (req, res) => {
    getMockDraft(req, res);
});

router.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));

router.get('/logout', (req, res) => logOut(req, res));

router.post('/user-results', async (req, res) => sendResults(req.user.googleId, req.body));

router.post('/save-draft', async (req, res) => {
    console.log("Save draft endpoint hit");
    saveDraft(req, res);
});


module.exports = router;