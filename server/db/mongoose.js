var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ToDoApp',{useCreateIndex: true, useNewUrlParser: true});

module.exports = {mongoose};
