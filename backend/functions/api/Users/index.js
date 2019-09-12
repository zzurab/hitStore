
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
    emailExists,
    validationErrors,
    authorized,
    transformTempdDataToData
} = require('../middlewares');

const {errorMessages} = require('../../config');

Router.route('/sign_in')
    .post([
        header('authorization')
            .not()
            .exists()
                .withMessage('/users/sign_in/auth/' + errorMessages.EXISTS)
            .bail()
            .isEmpty()
                .withMessage('/users/sign_in/auth/' + errorMessages.NOT_EMPTY)
            .bail()
            .not()
            .custom(
                authorized(admin)
            )
                .withMessage('/users/sign_in/auth/' + errorMessages.TOKEN),
        check('email')
            .exists()
                .withMessage('/users/sign_in/email/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/sign_in/email/' + errorMessages.EMPTY)
            .bail()
            .isEmail()
                .withMessage('/users/sign_in/email/' + errorMessages.INVALID)
                .trim()
                .normalizeEmail(),
        check('password')
            .exists()
                .withMessage('/users/sign_in/password/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/sign_in/password/' + errorMessages.EMPTY)
            .bail()
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
            .exists()
                .withMessage('/users/sign_up/auth/' + errorMessages.EXISTS)
            .bail()
            .isEmpty()
                .withMessage('/users/sign_up/auth/' + errorMessages.NOT_EMPTY)
            .bail()
            .not()
            .custom(
                authorized(admin)
            )
                .withMessage('/users/sign_up/auth/' + errorMessages.TOKEN),
        check('email')
            .exists()
                .withMessage('/users/sign_up/email/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/email/' + errorMessages.EMPTY)
            .bail()
            .isEmail()
                .withMessage('/users/sign_up/email/' + errorMessages.INVALID)
            .bail()
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
            .exists()
                .withMessage('/users/sign_up/password/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/password/' + errorMessages.EMPTY)
            .bail()
            .isLength({
                min: 6
            })
                .withMessage('/users/sign_up/password/' + errorMessages.LENGTH),
        check('confirm_password')
            .exists()
                .withMessage('/users/sign_up/confirm_password/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/sign_up/confirm_password/' + errorMessages.EMPTY)
            .bail()
            .isLength({
                min: 6
            })
                .withMessage('/users/sign_up/confirm_password/' + errorMessages.LENGTH)
            .custom(validations.passwordMatch)
                .withMessage('/users/sign_up/confirm_password/' + errorMessages.MATCH),
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

Router.route('/info')
    .post([
        header('authorization')
            .exists()
                .withMessage('/users/info/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/info/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/users/info/auth/' + errorMessages.TOKEN),
        check('data')
            .exists()
                .withMessage('/users/info/data/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/info/data/' + errorMessages.EMPTY)
            .bail()
            .isJSON()
                .withMessage('/users/info/data/' + errorMessages.NOT_JSON)
            .bail()
            .custom(validations.correctInfoKeys)
                .withMessage('/users/info/data/' + errorMessages.INVALID),
                transformTempdDataToData(),
        check('data')
            .exists()
                .withMessage('/users/info/data/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/users/info/data/' + errorMessages.EMPTY)
            .bail()
            .custom(
                validations.validateData({
                    errorMessages,
                    errorPrefix: '/users/info/data/'
                })
            ),
        validationErrors(
            validationResult
        ),
        middlewares.info.update(
            admin
                .firestore()
                .collection('users')
        ),
        (req, res, next) => {
            res.json({
                status: 1,
            });
        }
    ]);

module.exports = Router;