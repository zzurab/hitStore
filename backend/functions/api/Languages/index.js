
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

const {languageCodes} = require('../../config');

const {
    authorized,
    validationErrors,
    isAdmin
} = require('../middlewares');

const {errorMessages} = require('../../config');

Router.route('/language')
    .post([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .not()
            .isEmpty()
                .withMessage('/languages/language/id/' + errorMessages.EMPTY)
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/language/code/' + errorMessages.NOT_EXISTS),
        check('name')
            .not()
            .isEmpty()
                .withMessage('/languages/language/name/' + errorMessages.EMPTY)
            .trim()
            .not()
            .custom(
                validations.nameExists(
                    admin
                        .firestore()
                        .collection('languages')
                )
            ).withMessage('/languages/language/name/' + errorMessages.EXISTS),
        validationErrors(
            validationResult
        ),
        middlewares.updateLanguageName(
            admin
                .firestore()
                .collection('languages')
        ),
        (req, res, next) => {
            res.json({
                status: 1
            })
        }
    ])
    .put([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth' + errorMessages.ADMIN_ERROR
        }),
        body('code')
            .not()
            .isEmpty()
                .withMessage('/languages/language/code/' + errorMessages.EMPTY)
            .isIn(languageCodes)
                .withMessage('/languages/language/code/' + errorMessages.INVALID)
            .trim()
            .not()
            .custom(
                validations.codeExists(
                    admin
                        .firestore()
                        .collection('languages')
                )
            ).withMessage('/languages/language/code/' + errorMessages.EXISTS),
        check('name')
            .not()
            .isEmpty()
                .withMessage('/languages/language/name/' + errorMessages.EMPTY)
            .trim()
            .not()
            .custom(
                validations.nameExists(
                    admin
                        .firestore()
                        .collection('languages')
                )
            ).withMessage('/languages/language/name/' + errorMessages.EXISTS),
        validationErrors(
            validationResult
        ),
        middlewares.addLanguage(
            admin
                .firestore()
                .collection('languages')
        ),
        (req, res, next) => {
            res.json({
                status: 1
            });
        }
    ])
    .delete([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .not()
            .isEmpty()
                .withMessage('/languages/language/id/' + errorMessages.EMPTY)
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/language/code/' + errorMessages.NOT_EXISTS),
        validationErrors(
            validationResult
        ),
        middlewares.removeLanguageById(
            admin
                .firestore()
                .collection('languages')
        ),
        middlewares.removeKeywordsByLanguageId(
            admin
                .firestore()
                .collection('keywords')
        ),
        (req, res, next) => {
            res.json({
                status: 1
            })
        }
    ]);

Router.route('/keywords')
    .put([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/auth/' + errorMessages.TOKEN),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('languageId')
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/languageId/' + errorMessages.EMPTY)
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/keywords/languageId/' + errorMessages.NOT_EXISTS),
        check('slag')
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/slag/' + errorMessages.EMPTY)
            .isString()
                .withMessage('/languages/keywords/slag/' + errorMessages.NOT_STRING)
            .not()
            .custom(
                validations.keywordExistsBySlag(
                    admin
                        .firestore()
                        .collection('keywords')
                )
            )
                .withMessage('/languages/keywords/slag/' + errorMessages.EXISTS)
            .trim()
            .escape(),
        check('value')
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/value/' + errorMessages.EMPTY)
            .trim()
            .escape(),
        validationErrors(
            validationResult
        ),
        middlewares.addKeyword(
            admin
                .firestore()
                .collection('keywords')
        ),
        (req, res, next) => {
            res.json({
                status: 1
            })
        }
    ])
    .delete([
        header('authorization')
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/auth/' + errorMessages.TOKEN),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/id/' + errorMessages.EMPTY)
            .custom(
                validations.keywordExistsById(
                    admin
                        .firestore()
                        .collection('keywords')
                )
            )
                .withMessage('/languages/keywords/id/' + errorMessages.NOT_EXISTS)
            .trim(),
        validationErrors(
            validationResult
        ),
        middlewares.removeKeywordById(
            admin
                .firestore()
                .collection('keywords')
        ),
        (req, res, next) => {
            res.json({
                status: 1
            })
        }
    ])
    
module.exports = Router;