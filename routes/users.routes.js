const express = require('express');
const uuid = require('uuid/v4');

const router = express.Router();
const admin = require('firebase-admin');
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
const db = admin.firestore();
// Crea un nuevo usuario
router.route('/')
  .post((req, res) => {
    const {
      name, age, address, type,
    } = req.body;
    const docRef = db.collection('users').doc(uuid());

    docRef.set({
      name, age, address, type,
    });

    res.status(200).json({
      status: 200,
      message: 'created user successfuly',
      data: {
        name, age, address, type,
      },
    });
  })
  .get(async (req, res) => {
    const usersRef = db.collection('users');
    const users = [];

    try {
      const snapshot = await usersRef.get();

      snapshot.forEach(doc => users.push({
        info: doc.data(),
        id: doc.id,
      }));

      res.status(200).json({ users });
    } catch (error) {
      res.status(500).send(error);
    }
  });
router.route('/:id')
  .get(async (req, res) => {
    const userRef = db.collection('users').doc(req.params.id);

    try {
      const user = await userRef.get();

      if (user.exists) {
        res.status(200).json({
          data: {
            info: user.data(),
            id: user.id,
          },
        });
      }

      res.status(400).send(`El usuario: ${user.id} no existe`);
    } catch (error) {
      res.status(500).send(`Error: ${error}`);
    }
  })
  .delete(async (req, res) => {
    const userRef = db.collection('users').doc(req.params.id);
    const userSnapshot = await userRef.get();

    if (userSnapshot.exists) {
      userRef.delete();

      res.status(200).send('Operación realizada con éxito');
      res.end();
    }

    res.status(400).send(`El usuario ${userSnapshot.id} no existe en la base de datos`);
    res.end();
  })
  .put(async (req, res) => {
    try {
      const userRef = db.collection('users').doc(req.params.id);
      const userSnapshot = await userRef.get();

      if (userSnapshot.exists) {
        userRef.update({
          name: req.body.name || userSnapshot.data().name,
          address: req.body.address || userSnapshot.data().address,
          age: req.body.age || userSnapshot.data().age,
          type: req.body.type || userSnapshot.data().type,
        });

        const updatedUser = await userRef.get();

        res.status(200).json({
          data: {
            info: updatedUser.data(),
            id: updatedUser.id,
          },
        });
      }
    } catch (error) {
      res.status(400).send(`Error ${error}`);
      res.end();
    }
  });

module.exports = router;
