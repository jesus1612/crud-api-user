const express = require("express")
const bodyParser= require('body-parser')
const admin = require('firebase-admin')
const serviceAccount= require('./serviceAccountKey.json')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()