const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

// var message = 'Some secret message,,fajharfsdfdgha;';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

var data = {
  id: 4
};

var token = jwt.sign(data, 'abc123');
console.log(token);

var decoded = jwt.verify(token, 'abc123');
console.log('decoded:', decoded);
