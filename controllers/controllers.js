const express = require('express');
const path = require('path');
const fs = require('fs');
const router = express.Router();
const moment = require('moment');
const axios = require('axios');
const mongoose = require('mongoose')

const User = require('../models/user.js');
const Draft = require('../models/draft.js');

/**
 * router.get('/')
 */
async function getHomePage(req, res, draftType) {
    console.log(`Loading home page...`);
    if (req.user) {
        let existingUser = await getUser(req.user);
        res.status(200).render('home', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
        })
    } else {
        res.status(200).render('main', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
        })
    }
}

async function getLiveDraft(req, res, draftType) {
    console.log(`Loading live draft...`);
    if (req.user) {
        let existingUser = await getUser(req.user);

        if (existingUser) {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: true
            })
        } else {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: draftType != null ? (draftType === 'live' ? true : false) : null
            })
        }
    } else {
        // res.status(200).render('main', {
        //     layout: 'main',
        //     Authenticated: req.isAuthenticated() ? true : false,
        //     user: req.isAuthenticated() ? req.user : false,
        //     LiveDraftMode: draftType != null ? (draftType === 'live' ? true : false ) : null
        // })
    }
}

async function getMockDraft(req, res, draftType) {
    console.log(`Loading mock draft...`);
    if (req.user) {
        let existingUser = await getUser(req.user);

        if (existingUser) {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: false
            })
        } else {
            res.status(200).render('main', {
                layout: 'main',
                Authenticated: req.isAuthenticated() ? true : false,
                user: req.isAuthenticated() ? req.user : false,
                LiveDraftMode: draftType != null ? (draftType === 'mock' ? true : false) : null
            })
        }
    } else {
        // res.status(200).render('main', {
        //     layout: 'main',
        //     Authenticated: req.isAuthenticated() ? true : false,
        //     user: req.isAuthenticated() ? req.user : false,
        //     LiveDraftMode: draftType != null ? (draftType === 'mock' ? true : false ) : null
        // })
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
    console.log('Request received: save draft');

    try {
        let existingUser = await getUser(req.user);
        if (existingUser) {
            let draftData = req.body;
            draftData.lastSaved = new Date().toLocaleString();

            // Find the user document to update
            const userToUpdate = await User.findOne({ googleId: existingUser.googleId });
            if (!userToUpdate) {
                return res.status(500).send('User not found for updating.');
            }

            // Check if a draft with the same id already exists
            let existingDraftIndex = userToUpdate.drafts.findIndex(d => d.id === draftData.id);

            if (existingDraftIndex !== -1) {
                userToUpdate.drafts[existingDraftIndex] = draftData;
                userToUpdate.markModified('drafts');
            } else {
                userToUpdate.drafts.push(draftData);
            }

            await userToUpdate.save();
            res.redirect('/');
        } else {
            res.status(500).send('Error saving draft. No user found.');
        }
    } catch (err) {
        console.error('Error in saveDraft:', err);
        res.status(500).send('Server error.');
    }
}


async function publishDraft(req, res) {
    console.log('Request received: publish draft');

    try {
        let existingUser = await getUser(req.user);
        if (existingUser) {
            let draftData = req.body;

            // Update the draft if it exists or create a new one if it doesn't
            let existingDraft = await Draft.findOne({ id: draftData.id, user: existingUser.name });
            if (existingDraft) {
                existingDraft.draft = Object.values(draftData).filter(value => typeof value === 'object'); // Assuming all the pick objects are the only objects
                existingDraft.lastSaved = new Date().toLocaleString();
                await existingDraft.save();
            } else {
                const newDraft = new Draft({
                    draft: Object.values(draftData).filter(value => typeof value === 'object'), // Assuming all the pick objects are the only objects
                    user: existingUser.name,
                    id: draftData.id
                });

                await newDraft.save();
            }

            res.redirect('/');
        } else {
            res.status(500).send('Error publishing draft. No user found.');
        }
    } catch (err) {
        console.error('Error in publishDraft:', err);
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
    saveDraft,
    publishDraft,
    getLiveDraft,
    getMockDraft
}