const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  var db = client.db('ToDoApp');

  //delete many
  // db.collection('ToDos').deleteMany({todo: 'Some irrelevant task'}).then((result) => {
  //   console.log(result);
  // });

  //delete one
  // db.collection('ToDos').deleteOne({todo: 'checkout memes'}).then((result) => {
  //   console.log(result);
  // });

  //find one and delete
  db.collection('ToDos').findOneAndDelete({todo: 'checkout memes'}).then((result) => {
    console.log(result);
  });

  client.close();
});
