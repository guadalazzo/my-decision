const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors");
const app = require("express")();

app.use(cors());
var firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.API_ID,
};

admin.initializeApp(firebaseConfig);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions

/* Get all dilemmas */
app.get("/dilemmas", (req, res) => {
  admin
    .firestore()
    .collection("dilemmas")
    .get()
    .then((data) => {
      let dilemmas = [];
      data.forEach((doc) => {
        dilemmas.push(doc.data());
      });
      return res.json(dilemmas);
    })
    .catch((err) => {
      console.log("Error with getting dillemmas", err);
    });
});

/* Get a dilemma */

app.get("/dilemma/:id", (req, res) => {
  let dilemmaData = {};
  admin
    .firestore()
    .collection("dilemmas")
    .where("id", "==", req.params.id)
    .limit(1)
    .get()
    .then((doc) => {
      if (!doc.docs[0].exists) {
        return res.status(404).json({ error: "Dilemma not found" });
      }
      dilemmaData = doc.docs[0].data();
      return res.json(dilemmaData);
    })
    .catch((err) => {
      console.error(`Error getting dilemma`, err);
      res.status(500).json({ error: err.code });
    });
});

/* Delete a dilemma */

app.delete("/dilemma/:id", (req, res) => {
  const document = admin
    .firestore()
    .collection("dilemmas")
    .where("id", "==", req.params.id)
    .limit(1);
  document
    .get()
    .then((doc) => {
      if (!doc.docs[0].exists) {
        return res.status(404).json({ error: "Dilemma not found" });
      }
      return admin.firestore().doc(`/dilemmas/${doc.docs[0].id}`).delete();
    })
    .then(() => res.json({ message: "Dilemma deleted successfully" }))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: err.code, message: "this is a error" });
    });
});

/* Update a dilemma */

app.put("/dilemma/:id", (req, res) => {
  const dilemmaData = {
    title: req.body.title,
    conArgs: req.body.conArgs,
    proArgs: req.body.proArgs,
    totalPro: req.body.totalPro,
    totalCons: req.body.totalCons,
    totalPoints: req.body.totalPoints,
    id: req.params.id,
  };
  const document = admin
    .firestore()
    .collection("dilemmas")
    .where("id", "==", req.params.id)
    .limit(1);
  document
    .get()
    .then((doc) => {
      if (!doc.docs[0].exists) {
        return res.status(404).json({ error: "Dilemma not found" });
      }

      return admin
        .firestore()
        .collection("dilemmas")
        .doc(doc.docs[0].id)
        .update({ ...dilemmaData });
    })
    .then(() => res.json({ message: `Dilemma updated successfully` }))
    .catch((err) => {
      console.error(err);
      return res
        .status(500)
        .json({ error: err.code, message: "this is a error" });
    });
});

/* Create a dilemma */

app.post("/dilemma", (req, res) => {
  //  crea dilemmas en el array de dilemmas
  const newDilemma = {
    id: Math.random().toString(26).slice(2),
    title: req.body.title,
    conArgs: req.body.conArgs,
    proArgs: req.body.proArgs,
    totalPro: req.body.totalPro,
    totalCons: req.body.totalCons,
    totalPoints: req.body.totalPoints,
  };
  admin
    .firestore()
    .collection("dilemmas")
    .add(newDilemma)
    .then((doc) => {
      res.json({ message: `Document ${doc.id} was created succesfully` });
      return doc.data();
    })
    .catch((err) => {
      console.error("Error creating dilemma", err);
      res
        .status(500)
        .json({ message: "Something went wrong", error: err.code });
    });
});

exports.api = functions.https.onRequest(app);
