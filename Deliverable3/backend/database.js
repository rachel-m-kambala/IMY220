//Mukaji MWeni Rachel Kambala u23559129 position-24

const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://u23559129_db_user:JlNITZAQpcPwaLaZ@cluster0.udird4d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // replace with your Atlas URI
const client = new MongoClient(uri);

let db;

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

module.exports = connectDB;
