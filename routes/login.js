const express = require('express');
const router = express.Router();
const connection = require('../services/db');
const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');

router.post('/login', (req, res, next) => {

    if (req.body.username) {
        connection.query(
            'SELECT * FROM users WHERE username = ? ',
            [req.body.username],
            function (error, results, fields) {

                if (error) throw error;
                // if doesn't exist
                if (!results.length) {
                    res.status(400).send({
                        response: 'error',
                        message: 'Incorrect username or password'
                    })
                    res.end();
                }


                // console.log("inputs are:")
                // console.log(req.body.password)
                // console.log(results[0].password)

                // console.log(bcrypt.compareSync(req.body.password, results[0].password))

                bcrypt.compare(req.body.password, results[0].password, (berr, bresult) => {
                    if (berr) console.log(berr);
                    if (bresult) {
                        connection.query(
                            `UPDATE users SET last_login = now() WHERE id = ?;`,
                            [results[0].id]
                        );
                        return res.status(200).send({
                            response: 'ok',
                            user: results[0].user,
                            message: 'User logged in, verified and updated o db'
                        });
                    } else {
                        res.status(400).send({
                            response: 'error',
                            message: 'Incorrect bcrypt verification'
                        })
                        res.end();
                    }
                });

            });
    } else {
        res.status(400).send({
            response: 'error',
            message: 'Incorrect username or password'
        })
        res.end();
    }
});

module.exports = router;