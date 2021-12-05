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
    const newFeedback = req.body;
    const options = { dateStyle: "short"};
    const timeComplete = new Date().toLocaleString('en-US', options);
    const sqlText = `
        INSERT INTO "feedback"
            ("feeling", "understanding", "support", "comments", "flagged", "date")
        VALUES
            ($1, $2, $3, $4, $5, $6)
        `;
    const sqlValues = [
        newFeedback.feeling,
        newFeedback.understanding,
        newFeedback.support,
        newFeedback.comments,
        newFeedback.flagged,
        timeComplete
    ]
    console.log(sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

router.delete('/', (req, res) => {
    console.log('DELETE /feedback', req.body.id);
    const feedbackToDelete = req.body.id;
    const sqlText = `
        DELETE FROM "feedback"
        WHERE "id" = $1;
    `;
    const sqlValues = [
        feedbackToDelete
    ];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500)
        });
});

module.exports = router;