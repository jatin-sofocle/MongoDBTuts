const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  var db = client.db('ToDoApp');

  db.collection('ToDos').find().count().then(
    (count) => {
      console.log(`ToDos count: ${count}`);
    },
    (err) => {
      console.log('Unable to fetch collection', err);
    }
  );

  client.close();
});
