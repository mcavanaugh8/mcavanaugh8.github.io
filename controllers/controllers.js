const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');

const User = require('../models/user.js');

/**
 * router.get('/')
 */
async function getHomePage(req, res) {
    console.log(`Loading home page...`);

    res.status(200).render('main', {
        layout: 'main',
        Authenticated: req.isAuthenticated() ? true : false,
        user: req.isAuthenticated() ? req.user : false,
    })
}

function logOut(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        // Redirect to home page or any other page after logout
        res.redirect('/');
    });
}

async function sendResults(req, res) {
    console.log('Request received.');
    console.log(req.body);

    try {
        let user = await User.findOne({ googleId: req.user.googleId })

        if (user) {
            return done(null, user);
        } else {

            await user.save();
            return done(null, user);
        }
    } catch (err) {
        return done(err);
    }

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
}

function getUser(userProfile) {
    // Return a Promise that resolves with the user or the new user
    return User.findOne({ email: userProfile._json.unique_name }).lean()
        .exec()
        .then(function (result) {
            if (!result) {
                // console.log('no user');
                const newUser = new User({
                    displayName: userProfile.displayName,
                    email: userProfile._json.unique_name,
                    role: Permissions.setPermissions(userProfile),
                    activity: []
                });

                // console.log('new user');
                // Save the new user and return it
                return newUser.save();
            } else {
                // console.log('user exists');
                // Return the found user
                return result;
            }
        })
        .catch(function (error) {
            console.error('Error in getUser:', error);
            throw error; // Re-throw the error to be caught by the calling function
        });
}

function sendResults(userId, draftData) {
    return User.findByIdAndUpdate(
        userId,
        { $push: { drafts: draftData } },
        { new: true, useFindAndModify: false }
    ).exec();
}

module.exports = {
    getHomePage,
    logOut,
    sendResults
}