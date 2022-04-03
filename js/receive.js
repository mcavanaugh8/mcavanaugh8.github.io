    const express = require('express');
    const app = express();

    app.get('/receive', function (req, res) {
        //handle your request here.
        console.log(req, res);
    });

    app.listen(3000);