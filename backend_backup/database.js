//Mukaji MWeni Rachel Kambala u23559129 position-24

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://u23559129_db_user:JlNITZAQpcPwaLaZ@cluster0.udird4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your Atlas URI
const client = new MongoClient(uri);

let db;
// let client = null;

async function connectDB() {
   if (db) return db;
   try {
     await client.connect();
    db = client.db("codesync");
     console.log("✅ Connected to MongoDB");
     return db;
   } catch (err) {
     console.error("❌ MongoDB connection failed:", err);
  }
}

/*const connectDB = () => {
  return new Promise((resolve, reject) => {
    if (db) {
      console.log("Already connceted to MongogDB.");
      return resolve(db);
    }

    client = new MongoClient(uri);

    client.connect()
      .then * (() => {
        db = client.db();
        console.log("MongoDB connected successfully.");
        resolve(db);
      })
        .catch(err => {
          console.error("MongoDB connection error:", err);
          reject(err);
        });
  });
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not connected. Call connectDB first.");
  }
  return db;
};

const closeDB = () => {
  return new Promise((resolve, reject) => {
    if (client) {
      client.close()
        .then(() => {
          db = null;
          client = null;
          console.log("MongoDB connection closed.");
          resolve();
        })
        .catch(reject);
    }
    else {
      resolve();
    }
  });
};*/

module.exports = connectDB;
// module.exports = {
//   connectDB,
//   getDB,
//   closeDB
// };