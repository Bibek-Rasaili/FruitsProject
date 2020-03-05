const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = "mongodb://localhost:27017";

// Database Name
const dbName = 'fruitsDB';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function(err){
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  findDocuments(db, function(){
    client.close();
  })
});


// Adding new documents/ data to the Database
const insertDocuments = function(db, callback) {
  // Get the collection (or creates the collection)
  const collection = db.collection('fruits');
  // Insert some documents
  collection.insertMany([
    {
      name: "Apple",
      score: 7,
      review: "Great fruit"
    },
    {
      name: "Orange",
      score: 8,
      review: "Kinda sour"
    },
    {
      name: "Banana",
      score: 9,
      review: "Great Stuff!"
    }
  ], function(err, result){
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  })
}



// Finding/ Reading the documents from a collection
const findDocuments = function (db, callback) {
  // Get the collection (called fruits)
  const collection = db.collection('fruits');
  // Find some documents - stores it in the  fruits variable/parameter.
  collection.find({}).toArray(function(err, fruits){
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(fruits);
    callback(fruits);
  })
}
