require('dotenv').config()
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())

const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = 'battle-map';
const PORT = process.env.PORT || 3005;
let db;

MongoClient.connect(mongoURI)
  .then(client => {
    console.log('MongoDB connected');
    db = client.db(dbName);
  })
  .catch(err => console.error('MongoDB connection error:', err));


app.get('/names', (req, res) => {
  db.collection('battleNames').find({}).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/countryCenter', (req, res) => {
  db.collection('countryCenter').find({}).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/locations', (req, res) => {
  let idk = [];
  db.collection('battleLocations').find({}).toArray()
    .then(result => {
      idk = [...idk, result]
      res.json(idk);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// "_id": "ObjectId('668d700874a3bdf76817e78d')"
app.put('/addBattleLoc', (req, res) => {
  console.log(req.body)
  db.collection('battleLocations')
  .updateOne({"country": req.body.country}, 
    {"$set":{
      "battles": req.body.battles, 
      "numBattlesInCountry": req.body.total 
    }})
  .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.get('/userLogin', (req, res) => {
  console.log(req.query)
  db.collection('users')
  .find({
    "username": req.query.username, 
    "password": req.query.password
  }).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});


app.post('/registerUser', (req, res) => {
  console.log(req.body)
  db.collection('users')
  .insertOne(req.body)
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/favorites', (req, res) => {
  // console.log(req.body)
  console.log(req.body._id)
  db.collection('users')
  .updateOne({"_id": ObjectId.createFromHexString(req.body._id)}, 
    {"$set":{
      "favorites": req.body.favorites
    }})
  .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/contributions', (req, res) => {
  // console.log(req.body)
  // console.log(req.body._id)
  db.collection('users')
  .updateOne({"_id": ObjectId.createFromHexString(req.body._id)}, 
    {"$set":{
      "contributions": req.body.contributions
    }})
  .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
