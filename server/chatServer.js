// handles chat messages to database
require('dotenv').config()
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())

const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = 'chats';
const PORT = 3006;
let db;

MongoClient.connect(mongoURI)
  .then(client => {
    console.log('MongoDB connected');
    db = client.db(dbName);
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/messages', (req, res) => {
  let idk = []
  db.collection('Main').find({}).toArray()
    .then(result => {
      idk = [...idk, result]
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.post('/addMessage', (req, res) => {
  console.log(req.body)
  // console.log(req.body._id)
  db.collection('Main') 
  .insertOne( 
    {
      "message": req.body.message
    })
  .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});







app.listen(PORT, () => {
  console.log(`Chat Server running on port ${PORT}`);
});
