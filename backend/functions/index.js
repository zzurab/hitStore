
const functions = require('firebase-functions');
const express = require('express');
const firebase = require('firebase');
const admin = require('firebase-admin');

const {firebaseConfig, adminConfig} = require('./config');

admin.initializeApp(adminConfig);
firebase.initializeApp(firebaseConfig);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const Api = require('./api');

app.use(Api);

exports.api = functions.https.onRequest(app);