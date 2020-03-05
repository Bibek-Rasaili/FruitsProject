const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = 'fruitsDB';


// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true }); // , { useNewUrlParser: true }


// Use connect method to connect to the Server
client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  // const collection = client.db("test").collection("devices");

  // perform actions on the collection object
  client.close();
});
