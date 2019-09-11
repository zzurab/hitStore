
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

const storageBucket = "hitstore-ae613.appspot.com";

module.exports = {
    firebaseConfig: {},
    adminConfig: {
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://hitstore-ae613.firebaseio.com",
        storageBucket
    },
    firebaseConfig: {
        apiKey: "AIzaSyADHcofO8cj_zLE4zqBjvxRuQsyVziQWus",
        authDomain: "hitstore-ae613.firebaseapp.com",
        databaseURL: "https://hitstore-ae613.firebaseio.com",
        projectId: "hitstore-ae613",
        storageBucket,
        messagingSenderId: "1007373613488",
        appId: "1:1007373613488:web:2765a78e9e02e18438fe75"
    },

    errorMessages: {
        EMPTY: 'empty',
        INVALID: 'invalid',
        LENGTH: 'length',
        MATCH: 'match',
        EXISTS: 'exits',
        NOT_EXISTS: 'not_exists',
        TOKEN: 'token',
        PASSWORD: 'password',
        NOT_JSON: 'not_json',
        ADMIN_ERROR: 'not_admin',
        NOT_STRING: 'not_string'
    },
    userInfoKeys: ['firstName', 'lastName', 'phoneNumber', 'location', 'birthDate'],

    languageCodes: ['en', 'ka', 'ru']
}