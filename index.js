const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.routes');

const app = express();
// Permite parsear y enviar respuestas en formato json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta que permite al usuario filtrar usuarios
// app.get('/search', async (req, res) => {
//   const usersRef = db.collection('users');
//   const users = [];

//   const ageQuery = await usersRef.where('age', '==', parseInt(req.query.age, 10)).get();

//   ageQuery.forEach(doc => users.push({
//     info: doc.data(),
//     id: doc.id,
//   }));

//   if (users.length > 0) {
//     res.status(200).json({ users });
//   }

//   res.status(400).send('No existe ningún usuario con esa edad');
// });

app.use('/', userRoutes);

app.listen(3000, () => {
  // eslint-disable-next-line no-console
  console.log('server monted');
});
