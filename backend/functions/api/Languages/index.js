
const admin = require('firebase-admin');
const firebase = require('firebase');

const express = require('express');
const Router = express.Router();

const {
    check,
    validationResult,
    header,
    body,
    query
} = require('express-validator');

const middlewares = require('./middlewares');
const validations = require('./validations');

const {languageCodes} = require('../../config');

const {
    authorized,
    validationErrors,
    isAdmin,
    transformTempdDataToData
} = require('../middlewares');

const {errorMessages} = require('../../config');

Router.route('/')
    .get([
        middlewares.getAllKeywords({
            keywordsCollection: admin
                .firestore()
                .collection('keywords'),
            languagesCollection: admin
                .firestore()
                .collection('languages')
        }),
        (req, res, next) => {
            res.json({
                status: 1,
                response: req.hitData
            });
        }
    ])

Router.route('/language')
    .post([
        header('authorization')
            .exists()
                .withMessage('/languages/language/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .exists()
                .withMessage('/languages/language/id/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/id/' + errorMessages.EMPTY)
            .bail()
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/language/code/' + errorMessages.NOT_EXISTS),
        check('name')
            .exists()
                .withMessage('/languages/language/name/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/name/' + errorMessages.EMPTY)
            .bail()
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
            .exists()
                .withMessage('/languages/language/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
                .isEmpty()
                .withMessage('/languages/language/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth/' + errorMessages.ADMIN_ERROR
        }),
        body('code')
            .exists()
                .withMessage('/languages/language/code/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/code/' + errorMessages.EMPTY)
            .bail()
            .isIn(languageCodes)
                .withMessage('/languages/language/code/' + errorMessages.INVALID)
            .bail()
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
            .exists()
                .withMessage('/languages/language/name/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/name/' + errorMessages.EMPTY)
            .bail()
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
            .exists()
                .withMessage('/languages/language/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
                .isEmpty()
                    .withMessage('/languages/language/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/language/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/language/auth' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .exists()
                .withMessage('/languages/language/id/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/language/id/' + errorMessages.EMPTY)
            .bail()
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/language/id/' + errorMessages.NOT_EXISTS),
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
    .get([
        query('code')
            .exists()
                .withMessage('/languages/keywords/code/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/code/' + errorMessages.EMPTY)
            .bail()
            .isIn(languageCodes)
                .withMessage('/languages/keywords/code/' + errorMessages.NOT_EXISTS),
        validationErrors(
            validationResult
        ),
        middlewares.getKeywords({
            languagesCollection: admin
                .firestore()
                .collection('languages'),
            keywordsCollection: admin
                .firestore()
                .collection('keywords'),
            errors: {
                prefix: '/languages/keywords/code/',
                notFound: errorMessages.NOT_EXISTS
            }
        }),
        (req, res, next) => {
            res.json({
                status: 1,
                response: req.hitData
            });
        }
    ])
    .post([
        header('authorization')
            .exists()
                .withMessage('/languages/keywords/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .exists()
                .withMessage('/languages/keywords/id/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/id/' + errorMessages.EMPTY)
            .bail()
            .trim()
            .custom(
                validations.keywordExistsById(
                    admin
                        .firestore()
                        .collection('keywords')
                )
            )
                .withMessage('/languages/keywords/id/' + errorMessages.NOT_EXISTS)
            .bail(),
        check('value')
            .exists()
                .withMessage('/languages/keywords/value/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/value/' + errorMessages.EMPTY)
            .bail()
            .trim()
            .escape(),
        validationErrors(
            validationResult
        ),
        middlewares.updateKeyword(
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
    .put([
        header('authorization')
            .exists()
                .withMessage('/languages/keywords/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('languageId')
            .exists()
                .withMessage('/languages/keywords/languageId/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/languageId/' + errorMessages.EMPTY)
            .bail()
            .custom(
                validations.languageExistsById(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/keywords/languageId/' + errorMessages.NOT_EXISTS),
        check('slag')
            .exists()
                .withMessage('/languages/keywords/slag/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/slag/' + errorMessages.EMPTY)
            .bail()
            .isString()
                .withMessage('/languages/keywords/slag/' + errorMessages.NOT_STRING)
            .bail()
            .not()
            .custom(
                validations.keywordExistsBySlagAndLanguageId({
                    keywordsCollection:  admin
                        .firestore()
                        .collection('keywords')
                })
            )
                .withMessage('/languages/keywords/slag/' + errorMessages.EXISTS)
            .bail()
            .trim()
            .escape(),
        check('value')
            .exists()
                .withMessage('/languages/keywords/value/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/value/' + errorMessages.EMPTY)
            .bail()
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
            .exists()
                .withMessage('/languages/keywords/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('id')
            .exists()
                .withMessage('/languages/keywords/id/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/id/' + errorMessages.EMPTY)
            .bail()
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
    ]);

Router.route('/keywords/multi')
    .put([
        header('authorization')
            .exists()
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
                .isEmpty()
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/multi/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('slag')
            .exists()
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.EMPTY)
            .bail()
            .not()
            .custom(
                validations.keywordExistsBySlag(
                    admin
                        .firestore()
                        .collection('keywords')
                )
            )
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.EXISTS),
        check('data')
            .exists()
                .withMessage('/languages/keywords/multi/data/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/multi/data/' + errorMessages.EMPTY)
            .bail()
            .isJSON()
                .withMessage('/languages/keywords/multi/data/' + errorMessages.NOT_JSON)
            .bail()
            .custom(
                validations.isDataCorrect(
                    admin
                        .firestore()
                        .collection('languages')
                )
            )
                .withMessage('/languages/keywords/multi/data/' + errorMessages.INVALID),
        transformTempdDataToData(
            '/languages/keywords/multi/data/' + errorMessages.INVALID
        ),
        validationErrors(
            validationResult
        ),
        middlewares.addKeywords(
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
            .exists()
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
                .isEmpty()
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.EMPTY)
            .bail()
            .custom(
                authorized(admin)
            )
                .withMessage('/languages/keywords/multi/auth/' + errorMessages.TOKEN),
        validationErrors(
            validationResult
        ),
        isAdmin({
            collection: admin
                .firestore()
                .collection('users'),
            ADMIN_ERROR: '/languages/keywords/multi/auth/' + errorMessages.ADMIN_ERROR
        }),
        check('slag')
            .exists()
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.NOT_EXISTS)
            .bail()
            .not()
            .isEmpty()
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.EMPTY)
            .bail()
            .custom(
                validations.keywordExistsBySlag(
                    admin
                        .firestore()
                        .collection('keywords')
                )
            )
                .withMessage('/languages/keywords/multi/slag/' + errorMessages.EXISTS),
        validationErrors(
            validationResult
        ),
        middlewares.removeKeywordsBySlag(
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