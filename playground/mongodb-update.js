const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017',{ useNewUrlParser: true }, (err, client) => {
  if(err){
    return console.log('Unable to connect to MongoDB server.');
  }
  console.log('Connected to MongoDB server.');

  var db = client.db('ToDoApp');

  db.collection('Users')
  .findOneAndUpdate(
    {
      name: 'Jay Agrawal'
    },
    {
      $set: {
        name: 'Jatin Agrawal'
      },
      $inc: {
        age: 1
      }
    }
  )
  .then((result) => {
    console.log(result);
  });

  /*
    findOneAndUpdate(
    <query>,
    <update>,
    options
  )
  */

  client.close();
});
