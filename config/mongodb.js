const { MongoClient, ServerApiVersion } = require('mongodb');
const mongoose = require("mongoose");
const uri = "mongodb+srv://mariano:mariano@cluster0.z4zz9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
/*
client.connect(err => {
  const collection = client.db("ecommerce").collection("productos");

  // perform actions on the collection object
  client.close();
});
*/

mongoose.connect(uri)
    .then(() => {
        console.log("DB connected!");
    })
    .catch(err => {
        console.log(err);
    });