
const admin = require('firebase-admin');
const firebase = require('firebase');

const express = require('express');
const Router = express.Router();

const {
    check,
    validationResult,
    header,
    body
} = require('express-validator');

const middlewares = require('./middlewares');
const validations = require('./validations');

const {
    authorized,
    validationErrors
} = require('../middlewares');

const {errorMessages} = require('../../config');

Router.route('/add')
    .put([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/products/add/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        (req, res, next) => {
            res.json({
                status: 1,
                response: req.hitData
            })
        }
    ]);

module.exports = Router;