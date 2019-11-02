const functions = require('firebase-functions');
const admin = require('firebase-admin');
const cors = require('cors')
const app = require('express')();
app.use(cors());
const firebaseConfig = {
  apiKey: "AIzaSyC6jqSd1gNorT5Y2CtHUX8B-1pxJE78e-A",
  authDomain: "my-decision-ad541.firebaseapp.com",
  databaseURL: "https://my-decision-ad541.firebaseio.com",
  projectId: "my-decision-ad541",
  storageBucket: "my-decision-ad541.appspot.com",
  messagingSenderId: "360805520567",
  appId: "1:360805520567:web:f5bb238cfbf590a5a8a932"
};
admin.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/* Get all dilemmas */
app.get('/dilemmas', (req,res) => {
  admin.firestore().collection('dilemmas').get()
  .then(data => {
      let dilemmas = [];
      data.forEach(doc => {
          dilemmas.push(doc.data());
      })
      return res.json(dilemmas);
  })
  .catch(err=>{console.log('Error with getting dillemmas', err)});
});

/* Get a dilemma */

app.get('/dilemma/:id', (req,res) => {
  let dilemmaData = {};

  admin.firestore().doc(`/dilemmas/${req.params.id}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: 'Dilemma not found' });
      }
     dilemmaData = doc.data();
     dilemmaData.id = doc.id;
      return res.json(dilemmaData);
    })
    .catch((err) => {
      console.error(`Error getting dilemma`,err);
      res.status(500).json({ error: err.code });
    });
});

/* Delete a dilemma */

app.delete('/dilemma/:id', (req,res) => {

  const document = admin.firestore().doc(`/dilemmas/${req.params.id}`);
  document
  .get()
  .then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: 'Dilemma not found' });
    }
    return document.delete();
  })
  .then(() => 
    res.json({ message: 'Dilemma deleted successfully' })
  )
  .catch((err) => {
    console.error(err);
    return res.status(500).json({ error: err.code });
  });
});
/* Create a dilemma */

app.post('/dilemma', (req,res) => { //  crea dilemmas en el array de dilemmas
  const newDilemma = { 
    title: req.body.title, 
    conArgs: req.body.conArgs,
    proArgs: req.body.proArgs,
    totalPro: req.body.totalPro,
    totalCons: req.body.totalCons,
    totalPoints: req.body.totalPoints,
  };
  admin.firestore()
  .collection('dilemmas')
    .add(newDilemma)
    .then((doc) => {
      res.json({message: `Document ${doc.id} was created succesfully`});
      return doc.data();
    })
    .catch((err) => {
      console.error('Error creating dilemma',err);
      res.status(500).json({ message: 'Something went wrong', error: err.code });
    });
});

exports.api = functions.https.onRequest(app);