const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');


/**
 * router.get('/')
 */
function getHomePage(req, res) {
    console.log(`Loading home page...`);

    res.status(200).render('main', {
        layout: 'main',
        Authenticated: req.isAuthenticated() ? true : false,
        user: req.isAuthenticated() ? req.user : false,
    })
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

function updateUserOrCreate(userProfile, field, val, self, target) {
    // console.log(userProfile)
    const query = self ? { email: target } : { email: userProfile.email };
    const update = {};

    switch (field) {
        // case 'displayName':
        //     break;
        // case 'email':
        //     break;
        case 'log':
            moment.locale('en');
            let time = moment().tz("America/New_York").format('MM/DD/YY HH:mm:ss');


            if (!userProfile.log) {
                update.log = [{
                    user: userProfile.displayName,
                    time: time,
                    message: val
                }];
            } else {
                update.$push = {
                    log: {
                        user: userProfile.displayName,
                        time: time,
                        message: val
                    }
                };
            }
            break;
        case 'role':
            update.role = val;
            break;
        case 'activity':
            update.$push = { activity: val };
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
            return user;
        })
        .catch(function (error) {
            console.error('Error in updateUserOrCreate:', error);
            throw error;
        });
}

module.exports = {
    getHomePage,
}