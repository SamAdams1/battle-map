// handles chat messages to database
require("dotenv").config();

const express = require("express");
const router = express.Router();

const { MongoClient } = require("mongodb");
const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = "chats";
let db;

connectToMongoDB();

async function connectToMongoDB() {
  return MongoClient.connect(mongoURI)
    .then((client) => {
      db = client.db(dbName);
      console.log("Chat MongoDB connected");
      return db;
    })
    .catch((err) => console.error("Chat MongoDB connection error:", err));
}

router.get("/messages", async (req, res) => {
  let idk = [];
  await db
    .collection("Main")
    .find({})
    .toArray()
    .then((result) => {
      idk = [...idk, result];
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.post("/addMessage", (req, res) => {
  console.log("ADD", req.body);
  db.collection("Main")
    .insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.delete("/deleteMessage", (req, res) => {
  console.log("DELETE", req.body);
  db.collection("Main")
    .deleteOne({ _id: req.body._id })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

router.put("/editMessage", (req, res) => {
  console.log("EDIT", req.body);
  db.collection("Main")
    .updateOne(
      { _id: req.body._id },
      {
        $set: {
          text: req.body.text,
        },
      }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
