const express = require('express');
const router = express.Router();
const connection = require('../services/db');

router.get('/', (req, res, next) => {

    connection.query(
        'SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank FROM programming_languages',
        function (err, results, fields) {
            if (err) {
                console.log(err)
            } else {
                res.json(results);
            }
        })
});

module.exports = router;