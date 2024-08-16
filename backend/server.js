require("dotenv").config();
const express = require("express");
const { MongoClient, ObjectId } = require("mongodb");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
const cors = require("cors");
const auth = require("./middleware/auth");
app.use(express.json());
app.use(cors());

const mongoURI = `mongodb+srv://sammyadams04:${process.env.DB_AUTH}@cluster0.ux5mv4e.mongodb.net/battle-map?retryWrites=true&w=majority&appName=Cluster0`;
const dbName = "battle-map";
const PORT = process.env.PORT || 3005;
let db;
connectToMongoDB();

async function connectToMongoDB() {
  return MongoClient.connect(mongoURI)
    .then((client) => {
      console.log("MongoDB connected");
      db = client.db(dbName);
      return db;
    })
    .catch((err) => console.error("MongoDB connection error:", err));
}

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

app.post("/userLogin", async (req, res) => {
  // console.log(req.body);
  try {
    const pipeline = [
      { $match: { username: req.body.username } },
      { $unset: ["username", "favorites", "contributions", "pfp", "lvl"] },
    ];
    const result = await db.collection("users").aggregate(pipeline).toArray();

    const samePass = await comparePasswords(
      req.body.password,
      result[0].password
    );
    if (samePass) {
      // delete result[0].password;

      let jwtToken = await generateToken(result[0]._id);
      // console.log(jwtToken);
      res.json({ result, jwtToken });

      // res.json(result);
    } else throw new Error();
  } catch (error) {
    console.error("Error during user login:", error);
    res.status(500).send("Internal server error");
  }
});

app.put("/userInfo", auth, async (req, res) => {
  // console.log("userinfo");
  console.log(req.user);
  try {
    const pipeline = [
      { $match: { _id: ObjectId.createFromHexString(req.user.id) } },
      { $unset: ["password"] },
    ];
    const user = await db.collection("users").aggregate(pipeline).toArray();

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json(error);
  }
});

async function generateToken(id) {
  return new Promise((resolve, reject) => {
    const payload = { user: { id: id } };
    jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) {
          reject(err);
        } else {
          resolve(token);
        }
      }
    );
  });
}

async function comparePasswords(password, hashedPassword) {
  console.log(password, hashedPassword);
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error(err);
  }
}

app.post("/registerUser", async (req, res) => {
  try {
    if (db === undefined) db = await connectToMongoDB();
    const nameAvailable = await usernameAvailable(req.body.username);
    if (nameAvailable) {
      req.body.password = await hashPassword(req.body.password);
      console.log(req.body);
      db.collection("users")
        .insertOne(req.body)
        .then((result) => {
          res.json(result);
        });
    } else res.status(500).json({ message: "Username taken." });
  } catch (error) {
    res.status(500).json({ error: err.message });
  }
});

async function usernameAvailable(username) {
  pipeline = [
    { $match: { username: username } },
    { $unset: ["password", "pfp", "favorites", "contributions", "lvl"] },
  ];
  return db
    .collection("users")
    .aggregate(pipeline)
    .toArray()
    .then((response) => {
      console.log(response.length, response);
      // if username is not taken nothing will be returned: length will = 0
      return !response.length > 0;
    })
    .catch((e) => console.error(e));
}

const saltRounds = 10;
async function hashPassword(password) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    console.log(hash);
    return hash;
  } catch (err) {
    console.error(err);
  }
}

app.put("/changeUsername", async (req, res) => {
  console.log(req.body);
  let nameAvailable = await usernameAvailable(req.body.newUsername);
  if (nameAvailable) {
    try {
      db.collection("users").updateOne(
        { _id: ObjectId.createFromHexString(req.body.id) },
        {
          $set: {
            username: req.body.newUsername,
          },
        }
      );
      res.status(200).json("Username changed");
    } catch (error) {}
  } else res.status(400).json("Username not available");
});

app.put("/updatePassword", async (req, res) => {
  if (db === undefined) db = await connectToMongoDB();
  console.log("updating", req.body);
  const pipeline = [
    { $match: { _id: ObjectId.createFromHexString(req.body.id) } },
    { $unset: ["favorites", "contributions", "pfp", "lvl"] },
  ];
  try {
    const response = await db.collection("users").aggregate(pipeline).toArray();

    // if old password matches change password
    if (await comparePasswords(req.body.oldPassword, response[0].password)) {
      console.log("passwords match", response);
      response = await db.collection("users").updateOne(
        { _id: ObjectId.createFromHexString(req.body.id) },
        {
          $set: {
            password: await hashPassword(req.body.newPassword),
          },
        }
      );
      console.log("New password is: ", req.body.newPassword);
      res.status(200).json("Password updated!");
    } else res.status(400).json("Passwords do not match");
  } catch (error) {
    res.status(400).json("Error updating password");
  }
});

app.put("/devUpdatePassword", async (req, res) => {
  console.log(req.body);
  await db.collection("users").updateOne(
    { username: req.body.username },
    {
      $set: {
        password: await hashPassword(req.body.newPassword),
      },
    }
  );
});

app.delete("/deleteUser", async (req, res) => {
  // console.log(req.query);
  try {
    let response = await db
      .collection("users")
      .deleteOne({ _id: ObjectId.createFromHexString(req.query.id) });
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
  }
});

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
