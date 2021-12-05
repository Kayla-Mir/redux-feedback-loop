const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// Gets the stored feedback from the db, sorted by id
router.get('/', (req, res) => {
    console.log('GET /feedback');
    const sqlText = `
        SELECT * FROM "feedback"
        ORDER BY "id" ASC;
    `;
    pool.query(sqlText)
        .then((dbRes) => {
            res.send(dbRes.rows);
        }).catch((err) => {
            console.error('error GET /feedback', err);
            res.sendStatus(500);
        });
});

// adds new feedback to the database
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
    ];
    console.log(sqlValues);
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

// updates the flagged part of the feedback from the admin page
router.put('/', (req, res) => {
    console.log('PUT /feedback', req.body.flagged);
    const sqlText = `
        UPDATE "feedback"
        SET "flagged" = $1
        WHERE "id" = $2
    `;
    const sqlValues = [
        !req.body.flagged,
        req.body.id
    ];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.sendStatus(201);
        }).catch((dbErr) => {
            console.error(dbErr);
            res.sendStatus(500);
        });
});

// deletes the feedback based on id
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
            res.sendStatus(500);
        });
});

module.exports = router;