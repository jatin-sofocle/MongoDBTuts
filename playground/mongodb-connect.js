const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  var db = client.db('ToDoApp');

  // db.collection('ToDos').insertOne({
  //   todo: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err){
  //     return console.log('Unable to insert todo.');
  //   }
  //
  //   console.log(JSON.stringify(result.ops, null, 2));
  // });

  db.collection('Users').insertOne({
    name: 'Jatin Agrawal',
    age: '22',
    location: 'Noida'
  }, (err, results) => {
    if(err){
      return console.log('Unable to create an user.');
    }

    console.log('Created a new user:');
    console.log(results.ops[0]._id.getTimestamp());

  });

  client.close();
});
