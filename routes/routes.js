const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const passport = require('passport');
const puppeteer = require('puppeteer');

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

router.post('/export-draft-results', async (req, res) => {
    // Extract draft data from request body
    const draftData = req.body; // Ensure this is properly validated and sanitized

    // Convert draft data to HTML
    const draftHtmlContent = generateDraftHtml(draftData);

    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setContent(draftHtmlContent, { waitUntil: 'networkidle0' }); // wait until page load is done
        const imageBuffer = await page.screenshot({ fullPage: true });
        await browser.close();

        // Set the header for content type as a stream of bytes
        res.setHeader('Content-Type', 'application/octet-stream');

        // Send the image buffer directly
        res.send(imageBuffer);
    } catch (error) {
        console.error('Error generating draft image:', error);
        res.status(500).send('Error generating draft image.');
    }
});

function generateDraftHtml(draftData) {
    let html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Draft Results</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: white;
            color: black;
            text-align: center;
          }
          .draft-table {
            width: 100%;
            text-align: left;
          }
          .draft-table th, .draft-table td {
            padding: 10px;
            border: 1px solid #ddd;
          }
          .header {
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 20px;
          }
          .team-logo {
            width: 30px;
            height: auto;
          }
          .team-name, .player-name {
            font-weight: bold;
          }
          .rank {
            font-weight: bold;
            width: 10%;
          }
          /* Add more styles as needed */
        </style>
      </head>
      <body>
        <div class="header">ROUND 1 MOCK DRAFT</div>
        <table class="draft-table">
          <tbody>
    `;

    let appUrl = 'http://localhost:3000';
    // let appUrl = 'https://www.mcavanaugh8.github.io.com';
    // Adding each draft pick row
    draftData.forEach(pick => {
        html += `
        <tr>
          <td class="rank">${pick.rank}</td>
          <td><img class="team-logo" src="${appUrl}/img/${pick.team.replace(/\s/g, '_')}.gif" alt="${pick.team}"></td>
          <td class="team-name" style="${getTeamCellStyle(pick.team)} text-align: center;">${pick.team}</td>
          <td class="player-name">${pick.player.replace(/^.+?\s/, '')}</td>
          <td>${pick.player.match(/^.+? /) ? pick.player.match(/^.+? /)[0] : ''}</td>
        </tr>
      `;
    });

    // Closing out the table and HTML document
    html += `
          </tbody>
        </table>
      </body>
      </html>
    `;
    console.log(html)
    return html;
}


function getTeamCellStyle(teamName) {
    const teamStyles = {
        'JACKSONVILLE': 'background-color: #45818e; color: #f1c232; font-weight: bolder;',
        'NEW YORK JETS': 'background-color: #38761d; color: #fff; font-weight: bolder;',
        'SAN FRANCISCO': 'background-color: #ff0000; color: #ffd966; font-weight: bolder;',
        'ATLANTA': 'background-color: #000000; color: #a71930; font-weight: bolder;',
        'CINCINNATI': 'background-color: #ff6e07; color: #000000; font-weight: bolder;',
        'MIAMI': 'background-color: #00ffff; color: #ff6e07; font-weight: bolder;',
        'DETROIT': 'background-color: #3d85c6; color: #efefef; font-weight: bolder;',
        'CAROLINA': 'background-color: #23b8ff; color: #000000; font-weight: bolder;',
        'DENVER': 'background-color: #ff8b07; color: #002b62; font-weight: bolder;',
        'DALLAS': 'background-color: #FFF; color: #042f6a; font-weight: bolder;',
        'NEW YORK GIANTS': 'background-color: #1155cc; color: #FFF; font-weight: bolder;',
        'PHILADELPHIA': 'background-color: #274e13; color: #FFF; font-weight: bolder;',
        'LOS ANGELES CHARGERS': 'background-color: #11a1ff; color: #f1c232; font-weight: bolder; font-size: 0.9rem;',
        'MINNESOTA': 'background-color: #351c75; color: #ffff00; font-weight: bolder;',
        'NEW ENGLAND': 'background-color: #000d4d; color: #ff0000; font-weight: bolder;',
        'ARIZONA': 'background-color: #cc0000; color: #FFF; font-weight: bolder;',
        'LAS VEGAS': 'background-color: #000000; color: #d9d9d9; font-weight: bolder;',
        'WASHINGTON': 'background-color: #990000; color: #f1c232; font-weight: bolder;',
        'CHICAGO': 'background-color: #072253; color: #ff6e07; font-weight: bolder;',
        'INDIANAPOLIS': 'background-color: #001685; color: #FFF; font-weight: bolder;',
        'TENNESSEE': 'background-color: #6fa8dc; color: #073763; font-weight: bolder;',
        'PITTSBURGH': 'background-color: #000000; color: #ffff00; font-weight: bolder;',
        'CLEVELAND': 'background-color: #6c3803; color: #ff6e07; font-weight: bolder;',
        'BALTIMORE': 'background-color: #2d1764; color: #FFF; font-weight: bolder;',
        'NEW ORLEANS': 'background-color: #000000; color: #d5b11b; font-weight: bolder;',
        'GREEN BAY': 'background-color: #274e13; color: #ffff00; font-weight: bolder;',
        'BUFFALO': 'background-color: #1155cc; color: #ff0000; font-weight: bolder;',
        'HOUSTON': 'background-color: rgba(4,47,106,1); color: #ff0000; font-weight: bolder;',
        'KANSAS CITY': 'background-color: #ff0000; color: #FFF; font-weight: bolder;',
        'LOS ANGELES RAMS': 'background-color: rgba(7,55,99,1); color: #d5b11b; font-weight: bolder;',
        'TAMPA BAY': 'background-color: rgba(204,65,37,1); color: #FFF; font-weight: bolder;',
        'SEATTLE': 'background-color: rgba(0,34,68,1); color: rgba(105,190,40,1); font-weight: bolder;',
    };
    return teamStyles[teamName] || '';
}



module.exports = router;