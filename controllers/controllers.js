const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');
const mongoose = require('mongoose')

const User = require('../models/user.js');

/**
 * router.get('/')
 */
async function getHomePage(req, res, draftType) {
    console.log(`Loading home page...`);
    if (req.user) {
        let existingUser = await getUser(req.user);

        if (existingUser) {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: draftType != null ? (draftType === 'live' ? true : false ) : null
            })
        } else {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: draftType != null ? (draftType === 'live' ? true : false ) : null
            })
        }
    } else {
        res.status(200).render('main', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
            LiveDraftMode: draftType != null ? (draftType === 'live' ? true : false ) : null
        })
    }
}

function logOut(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        // Redirect to home page or any other page after logout
        res.redirect('/');
    });
}

async function saveDraft(req, res) {
    console.log('Request received.');
    console.log(req.body);

    try {
        let existingUser = await getUser(req.user);
        if (existingUser) {
            updateUserOrCreate(existingUser, 'drafts', req.body);
            res.redirect('/');
        } else {
            res.status(500).send('Error saving draft. No user found.');
        }
    } catch (err) {
        console.error('Error in saveDraft:', err);
    }
}

function getUser(userProfile) {
    // console.log(userProfile);
    // Return a Promise that resolves with the user or the new user
    return User.findOne({ googleId: userProfile.googleId }).lean()
        .exec()
        .then(function (result) {
            // if (!result) {
            //     // console.log('no user');
            //     const newUser = new User({
            //         googleId: userProfile.googleId,
            //         name: userProfile.name,
            //         email: userProfile.email,
            //         drafts: []
            //     });

            //     // console.log('new user');
            //     // Save the new user and return it
            //     return newUser.save();
            // } else {
            //     // console.log('user exists');
            //     // Return the found user
            return result;
            // }
        })
        .catch(function (error) {
            console.error('Error in getUser:', error);
            throw error;
        });
}

function updateUserOrCreate(userProfile, field, val, self, target) {
    // console.log(userProfile)
    const query = self ? { googleId: target } : { googleId: userProfile.googleId };
    const update = {};

    switch (field) {
        case 'drafts':
            update.$push = { drafts: val };
            break;
    }

    const options = {
        new: true, // Return the updated document
        upsert: true, // Create a new document if one doesn't exist
        setDefaultsOnInsert: true // If a new document is created, default schema values will be set
    };

    return User.findOneAndUpdate(query, update, options).lean()
        .exec()
        .then(function (user) {
            console.log('User updated:', user)
            return user;
        })
        .catch(function (error) {
            console.error('Error in updateUserOrCreate:', error);
            throw error;
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
    sendResults,
    saveDraft
}