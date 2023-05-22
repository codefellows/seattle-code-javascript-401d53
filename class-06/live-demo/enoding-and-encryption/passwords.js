'use strict';

// here are some proof of life doodlings!

const base64 = require('base-64');
const bcrypt = require('bcrypt');

console.log('------------BASE 64------------')

let str = 'Lucky wants to go outside';
let encodedStr = base64.encode(str);
let decodedStr = base64.decode(encodedStr);

// console.log('str:', str);
// console.log('encodedStr:', encodedStr);
// console.log('decodedStr:', decodedStr);

// when I send a basic auth request, this is the pattern I will use:
// basic auth string: Basic <some encoded value>, 
// the encoded value is username:password

let user = 'ryan:pass'
let encodedUser = base64.encode(user);
// console.log('encodedUser:', encodedUser);

// generate auth string:  
let authString = `Basic ${encodedUser}`
console.log('authString:', authString);

console.log('----------hashing with bcrypt----------------');
let password = 'pass123';

const encrypt = async (password) => {
  let hash = await bcrypt.hash(password, 5);
  console.log('hash:', hash);

  let hashOne = '$2b$05$EqciokwNkSfbm68.J4e.F.bSjDkmW01rFUwi2IQOHAKtzCDE/mkvu';
  let hashTwo = '$2b$05$mJohpDpIriETHd/OAYGIx.3KAWYWSDxCqdxf4cQTZlvgSbHl2yLNq';
  let hashThree = '$2b$05$uxgTLYbRMV1fFSNPrd124OdLT8wcQN970PH7lQ3cd53oHbY2EAI0u';
  let resultOne = await bcrypt.compare(password, hashOne);
  let resultTwo = await bcrypt.compare(password, hashTwo);
  let resultThree = await bcrypt.compare(password, hashThree);
  console.log({resultOne}, {resultTwo}, {resultThree});
}

let results = encrypt(password)

// console.log('results:', results);
