
const express = require('express');
const Router = express.Router();

const Users = require('./Users');

Router.use('/users', Users);

Router.use((req, res, next) => {
    res.status(200)
        .json({
            status: 0,
            code: 0,
            response: {
                from: 'handler',
                message: '404'
            }
        })
});

Router.use((err, req, res, next) => {
    res.status(200)
        .json({
            status: -1,
            response: {
                from: 'handler',
                error: err,
                message: err.message
            }
        });
})

module.exports = Router;