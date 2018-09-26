const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// var message = 'Some secret message,,fajharfsdfdgha;';
// var hash = SHA256(message).toString();
//
// console.log(`Message: ${message}`);
// console.log(`Hash: ${hash}`);

//
// var data = {
//   id: 4
// };
//
// var token = jwt.sign(data, 'abc123');
// console.log(token);
//
// var decoded = jwt.verify(token, 'abc123');
// console.log('decoded:', decoded);
//
var password = 'abc123!';
//
// bcrypt.genSalt(10, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     console.log(hash);
//   });
// });

var hashedPassword = '$2a$10$lc5ZI5aHzbFWsw/aZpTDre6sfWUJxPPkUNvW2k.uCLVragfw8FUh6';

bcrypt.compare(password, hashedPassword, (err, res) => {
  console.log(res);
})
