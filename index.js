const express = require("express")
const bodyParser= require('body-parser')
const admin = require('firebase-admin')
const uuidv4 = require('uuid/v4')
const serviceAccount= require('./serviceAccountKey.json')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true }))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})
const db = admin.firestore()


app.post('/users',(req,res)=>{
    const {firstName, lastName, address,age} = req.body
    const docRef = db.collection('users').doc(uuidv4()) 
    const setAda = docRef.set({
        firstName,lastName,address, age,
    })

    res.status(200).json({
        status:200,
        message:'created user successfuly',
        user:{
            firstName,lastName,address,age,
        }
    })  
})
// app.get('/users',(req,res)=>{
//     const users = db.collection('users').get()
//     .then((querySnapshot) => {
//         querySnapshot.forEach(doc => {
//           console.log(doc.id, '=>', doc.data());
//         });
//       })
//       .catch(err => {
//         console.log('Error getting documents' , err);
//       });

// })

app.listen(3000,()=>{
    console.log('server monted');

    
})