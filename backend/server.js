require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const cors = require("cors");
app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = "battle-map";
const PORT = process.env.PORT || 3005;
let db;
async function connectToMongoDB() {
  return MongoClient.connect(mongoURI)
    .then((client) => {
      console.log("MongoDB connected");
      db = client.db(dbName);
      return db;
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

connectToMongoDB();

app.get("/battles", async (req, res) => {
  // if (!db) {
  //   return res.status(500).json({ error: "Database not connected" });
  // }
  try {
    if (db === undefined) db = await connectToMongoDB();
    let idk = [];
    const pipeline = [{ $unset: ["_id", "withLocation", "countryCenter"] }];
    const battles = await db
      .collection("battles")
      .aggregate(pipeline)
      .toArray();
    idk = [...idk, battles];
    res.json(idk);
  } catch (err) {
    console.error("Error fetching battles:", err);
    res.status(500).json({ error: "Error fetching battles" });
  }
});

app.get("/countryCenter", (req, res) => {
  console.log(req.query);
  pipeline = [
    { $match: req.query },
    { $unset: ["_id", "withLocation", "battles", "country"] },
  ];
  db.collection("battles")
    .aggregate(pipeline)
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/countryBattles", (req, res) => {
  pipeline = [
    { $match: req.query },
    { $unset: ["_id", "countryCenter", "withLocation", "country"] },
  ];
  db.collection("battles")
    .aggregate(pipeline)
    .toArray()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/countries", (req, res) => {
  let idk = [];
  pipeline = [{ $unset: ["_id", "countryCenter", "withLocation", "battles"] }];
  db.collection("battles")
    .aggregate(pipeline)
    .toArray()
    .then((result) => {
      idk = [...idk, result];
      res.json(idk);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.put("/updateBattle", (req, res) => {
  console.log(req.body);
  db.collection("battles")
    .updateOne(
      { country: req.body.country },
      {
        $set: {
          battles: req.body.battles,
          withLocation: req.body.total,
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

app.post("/userLogin", (req, res) => {
  // console.log(req.body);
  db.collection("users")
    .find({
      username: req.body.username,
      // password: req.body.password,
    })
    .toArray()
    .then((result) => {
      // const accessToken = jwt.sign(req.body.username, process.env.ACCESS_TOKEN_SECRET)
      // console.log(result[0].password);
      if (comparePasswords(req.body.password, result[0].password)) {
        delete result[0].password;
        res.json(result);
      } else throw err;
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

async function comparePasswords(password, hashedPassword) {
  // console.log(password, hashedPassword);
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error(err);
  }
}

const saltRounds = 10;
app.post("/registerUser", async (req, res) => {
  req.body.password = await hashedPassword(req.body.password);

  console.log(req.body);
  db.collection("users")
    .insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

async function hashedPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
  } catch (err) {
    console.error(err);
  }
}

app.put("/updateFavorites", (req, res) => {
  // console.log(req.body)
  console.log(req.body._id);
  db.collection("users")
    .updateOne(
      { _id: ObjectId.createFromHexString(req.body._id) },
      {
        $set: {
          favorites: req.body.favorites,
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

app.put("/updateContributions", (req, res) => {
  // console.log(req.body)
  // console.log(req.body._id)
  db.collection("users")
    .updateOne(
      { _id: ObjectId.createFromHexString(req.body._id) },
      {
        $set: {
          contributions: req.body.contributions,
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

app.put("/updateNameList", (req, res) => {
  console.log(req.body.country);
  db.collection("battleNames")
    .updateOne(
      { country: req.body.country },
      {
        $set: {
          names: req.body.nameList,
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

app.put("/updateUsernamePassword", (req, res) => {
  console.log(req.body);
  db.collection("users")
    .updateOne(
      { _id: ObjectId.createFromHexString(req.body._id) },
      { $set: { username: req.body.username, password: req.body.password } }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/reportBattle", (req, res) => {
  console.log(req.body);
  db.collection("reports")
    .insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/suggestLoc", (req, res) => {
  console.log(req.body);
  db.collection("history")
    .insertOne(req.body)
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/admin/users", (req, res) => {
  let idk = [];
  pipeline = [{ $unset: ["password", "pfp", "favorites"] }];
  // https://www.mongodb.com/docs/drivers/node/current/aggregation-tutorials/filtered-subset/
  db.collection("users")
    .aggregate(pipeline)
    .toArray()
    .then((result) => {
      idk = [...idk, result];
      res.json(idk);
    });
});

app.get("/admin/reports", (req, res) => {
  // console.log(req);
  let idk = [];
  db.collection("reports")
    .find({})
    .toArray()
    .then((result) => {
      idk = [...idk, result];
      res.json(idk);
    });
});

app.delete("/admin/delReport", (req, res) => {
  console.log("DELETE", req.query);
  db.collection("reports")
    .deleteOne({ _id: ObjectId.createFromHexString(req.query.id) })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/admin/contrib-history", (req, res) => {
  // console.log(req);
  let idk = [];
  db.collection("history")
    .find({})
    .toArray()
    .then((result) => {
      idk = [...idk, result];
      res.json(idk);
    });
});

app.put("/admin/approveContrib", (req, res) => {
  console.log(req.body);
  db.collection("history")
    .updateOne(
      { _id: ObjectId.createFromHexString(req.body.id) },
      { $set: { approved: req.body.approved } }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.put("/admin/changeUserLvl", (req, res) => {
  console.log(req.body);
  db.collection("users")
    .updateOne(
      { _id: ObjectId.createFromHexString(req.body.id) },
      { $set: { lvl: req.body.lvl } }
    )
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/userDisplay", (req, res) => {
  // console.log(req.query);
  const pipeline = [
    { $match: { _id: ObjectId.createFromHexString(req.query.id) } },
    { $unset: ["password", "favorites", "contributions"] },
  ];
  db.collection("users")
    .aggregate(pipeline)
    .toArray()
    .then((result) => {
      res.json(result);
    });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
