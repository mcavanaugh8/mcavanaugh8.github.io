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
            recentDrafts: await getRecentDrafts()
        })
    } else {
        res.status(200).render('home', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
            recentDrafts: await getRecentDrafts()
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

async function getProfile(req, res) {
    if (req.user) {
        let existingUser = await getUser(req.user);

        res.status(200).render('profile', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
            recentDrafts: await getRecentDrafts(true, existingUser)
        })
    } else {
        res.status(200).render('profile', {
            layout: 'main',
            Authenticated: req.isAuthenticated() ? true : false,
            user: req.isAuthenticated() ? req.user : false,
            recentDrafts: await getRecentDrafts()
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
                    user: existingUser.displayName,
                    trueUser: existingUser.name,
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
        case 'displayName':
            update.displayName = val;
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

async function getRecentDrafts(byUser, user) {
    let html = '';
    let appUrl = 'http://localhost:3000';
    // let appUrl = 'https://www.mcavanaugh8.github.io.com';
    let allDrafts;

    if (byUser) {
        allDrafts = await Draft.find({ googleId: user.googleId}).exec();
    } else {
        allDrafts = await Draft.find().exec();
    }

    allDrafts.forEach((draft, index) => {
        let currentDraft = draft.draft;

        html += ` <!-- Draft Card Start -->
      <div class="draft-card">
        <div class="draft-card-header">
          <div>
            <div class="draft-title">${draft.user}'s Draft</div>
            <small>${new Date(draft.updatedAt).toLocaleString()}</small>
          </div>
        </div>
        <div class="draft-card-body">
          <div class="draft-info">
            <div>
              <div class="draft-rank">1. ${abbreviateTeamName(currentDraft[0].team)} <img class="team-logo" src="${appUrl}/img/${currentDraft[0].team.replace(/\s/g, '_')}.gif" alt="${currentDraft[0].team}"></div>
              <div class="draft-player">${currentDraft[0].player}</div>
              <small>QB | USC</small>
            </div>
            <div>
              <div class="draft-rank">2. ${abbreviateTeamName(currentDraft[1].team)} <img class="team-logo" src="${appUrl}/img/${currentDraft[1].team.replace(/\s/g, '_')}.gif" alt="${currentDraft[1].team}"></div>
              <div class="draft-player">${currentDraft[1].player}</div>
              <small>QB | USC</small>
            </div>
            <div>
              <div class="draft-rank">3. ${abbreviateTeamName(currentDraft[2].team)} <img class="team-logo" src="${appUrl}/img/${currentDraft[2].team.replace(/\s/g, '_')}.gif" alt="${currentDraft[2].team}"></div>
              <div class="draft-player">${currentDraft[2].player}</div>
              <small>QB | USC</small>
            </div>
            <div>
              <div class="draft-rank">4. ${abbreviateTeamName(currentDraft[3].team)} <img class="team-logo" src="${appUrl}/img/${currentDraft[3].team.replace(/\s/g, '_')}.gif" alt="${currentDraft[3].team}"></div>
              <div class="draft-player">${currentDraft[3].player}</div>
              <small>QB | USC</small>
            </div>
            <div>
              <div class="draft-rank">5. ${abbreviateTeamName(currentDraft[4].team)} <img class="team-logo" src="${appUrl}/img/${currentDraft[4].team.replace(/\s/g, '_')}.gif" alt="${currentDraft[4].team}"></div>
              <div class="draft-player">${currentDraft[4].player}</div>
              <small>QB | USC</small>
            </div>
            <!-- More players here -->
          </div>
          <a href="url_to_full_mock" class="view-button">View Mock</a>
        </div>
      </div>
      <!-- Draft Card End -->`;
    });

    return html;
}

async function modifyUser(req, res) {
    if (req.user) {
        let existingUser = await getUser(req.user);
        try {
            await updateUserOrCreate(existingUser, 'displayName', req.body.displayName);
            res.json({ success: true, message: `Display name updated successfully! It is now ${req.body.displayName}.` });
        } catch(error) {
            console.error('Error saving display name:', error);
            res.status(500).json({ success: false, message: 'Error saving display name.' });
        }
    } else {
        res.status(500).json({ success: false, message: 'No user found.' });
    }
}

function abbreviateTeamName(team) {
    let newStr = '';
    switch (team) {
      case 'JACKSONVILLE':
        newStr = 'JAX';
        break;
      case 'NEW YORK JETS':
        newStr = 'NYJ';
        break;
      case 'SAN FRANCISCO':
        newStr = 'SF';
        break;
      case 'ATLANTA':
        newStr = 'ATL';
        break;
      case 'CINCINNATI':
        newStr = 'CIN';
        break;
      case 'MIAMI':
        newStr = 'MIA';
        break;
      case 'DETROIT':
        newStr = 'DET';
        break;
      case 'CAROLINA':
        newStr = 'CAR';
        break;
      case 'DENVER':
        newStr = 'DEN';
        break;
      case 'DALLAS':
        newStr = 'DAL';
        break;
      case 'NEW YORK GIANTS':
        newStr = 'NYG';
        break;
      case 'PHILADELPHIA':
        newStr = 'PHI';
        break;
      case 'LOS ANGELES CHARGERS':
        newStr = 'LAC';
        break;
      case 'MINNESOTA':
        newStr = 'MIN';
        break;
      case 'NEW ENGLAND':
        newStr = 'NE';
        break;
      case 'ARIZONA':
        newStr = 'ARI';
        break;
      case 'LAS VEGAS':
        newStr = 'LV';
        break;
      case 'WASHINGTON':
        newStr = 'WAS';
        break;
      case 'CHICAGO':
        newStr = 'CHI';
        break;
      case 'INDIANAPOLIS':
        newStr = 'IND';
        break;
      case 'TENNESSEE':
        newStr = 'TEN';
        break;
      case 'PITTSBURGH':
        newStr = 'PIT';
        break;
      case 'CLEVELAND':
        newStr = 'CLE';
        break;
      case 'BALTIMORE':
        newStr = 'BAL';
        break;
      case 'NEW ORLEANS':
        newStr = 'NO';
        break;
      case 'GREEN BAY':
        newStr = 'GB';
        break;
      case 'BUFFALO':
        newStr = 'BUF';
        break;
      case 'HOUSTON':
        newStr = 'HOU';
        break;
      case 'KANSAS CITY':
        newStr = 'KC';
        break;
      case 'LOS ANGELES RAMS':
        newStr = 'LAR';
        break;
      case 'TAMPA BAY':
        newStr = 'TB';
        break;
      case 'SEATTLE':
        newStr = 'SEA';
        break;
    }

    return newStr;
  }

module.exports = {
    getHomePage,
    getProfile,
    modifyUser,
    logOut,
    sendResults,
    saveDraft,
    publishDraft,
    getLiveDraft,
    getMockDraft
}