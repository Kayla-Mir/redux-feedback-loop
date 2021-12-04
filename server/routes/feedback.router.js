const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

router.get('/', (req, res) => {
    console.log('GET /feedback');
    pool.query('SELECT * from "feedback";')
        .then((dbRes) => {
            res.send(dbRes.rows);
        }).catch((err) => {
            console.error('error GET /feedback', err);
            res.sendStatus(500);
        });
});

router.post('/', (req, res) => {
    console.log('POST /feedback', req.body);
})

module.exports = router;