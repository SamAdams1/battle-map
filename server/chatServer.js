// handles chat messages to database
require('dotenv').config()
const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');

const jwt = require("jsonwebtoken")

const app = express();
const cors = require("cors")
app.use(express.json())
app.use(cors())

const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = 'battle-map';
const PORT = 3006;
let db;

MongoClient.connect(mongoURI)
  .then(client => {
    console.log('MongoDB connected');
    db = client.db(dbName);
  })
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/messages', (req, res) => {
  db.collection('chatRooms').find({"room": "Main"}).toArray()
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

app.put('/updateMessages', (req, res) => {
  // console.log(req.body)
  console.log(req.body._id)
  db.collection('users')
  .updateOne({"room": "Main"}, 
    {"$set":{
      "messages": req.body.messages
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
