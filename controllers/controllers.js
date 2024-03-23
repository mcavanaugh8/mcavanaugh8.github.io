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
        layout: 'main'
    })
}

module.exports = {
    getHomePage,
}