
const admin = require('firebase-admin');
const firebase = require('firebase');

const express = require('express');
const Router = express.Router();

const {
    check,
    validationResult,
    header
} = require('express-validator');

const middlewares = require('./middlewares');

const {
    emailExists,
    validationErrors,
    authorized
} = require('../middlewares');

const {errorMessages} = require('../../config');

Router.route('/sign_in')
    .post([
        header('authorization')
            .not()
            .custom(
                authorized(admin)
            )
                .withMessage('/users/sign_in/auth/' + errorMessages.TOKEN),
        check('email')
            .not()
            .isEmpty()
                .withMessage('/users/sign_in/email/' + errorMessages.EMPTY)
            .isEmail()
                .withMessage('/users/sign_in/email/' + errorMessages.INVALID)
                .trim()
                .normalizeEmail(),
        check('password')
            .not()
            .isEmpty()
                .withMessage('/users/sign_in/password/' + errorMessages.EMPTY)
            .isLength({
                min: 6
            })
                .withMessage('/users/sign_in/password/' + errorMessages.LENGTH),
        validationErrors(
            validationResult
        ),

        middlewares.signIn.auth({
            firebase,
            passwordErrorMessage: '/users/sign_in/password/' + errorMessages.PASSWORD
        }),
        middlewares.signIn.updateLastLogin(
            admin
                .firestore()
                .collection('users')
        ),
        (req, res, next) => {
            res.json({
                status: 1,
                response: req.hitData
            })
        }
    ])

Router.route('/sign_up')
    .put([
        header('authorization')
            .not()
            .custom(
                authorized(admin)
            )
                .withMessage('/users/sign_up/auth/' + errorMessages.TOKEN),
        check('email')
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/email/' + errorMessages.EMPTY)
            .isEmail()
                .withMessage('/users/sign_up/email/' + errorMessages.INVALID)
            .trim()
            .normalizeEmail()
            .not()
            .custom(emailExists(
                admin
                    .firestore()
                    .collection('users')
            ))
                .withMessage('/users/sign_up/email/' + errorMessages.EXISTS),
        check('password')
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/password/' + errorMessages.EMPTY)
            .isLength({
                min: 6
            })
                .withMessage('/users/sign_up/password/' + errorMessages.LENGTH),
        check('confirm_password')
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/password/' + errorMessages.EMPTY)
            .isLength({
                min: 6
            })
                .withMessage('/users/sign_up/password/' + errorMessages.LENGTH)
            .custom(
                (value, {req}) => {
                    return new Promise((resolve, reject) => {
                        if(value !== req.body.password){
                            reject();
                        }else{
                            resolve();
                        }
                    })
                }
            )
                .withMessage('/users/sign_up/password/' + errorMessages.MATCH),
        validationErrors(
            validationResult
        ),
        middlewares.signUp.auth(firebase),
        middlewares.signUp.save(
            admin
                .firestore()
                .collection('users')
        ),
        (req, res, next) => {
            res.json({
                status: 1,
                response: req.hitData
            });
        }
    ]);

module.exports = Router;