'use strict';

// events is part of node
const Event = require('events');

// very tethered events example
// create event emitter for our event pool
const eventEmitter = new Event();

function ryansPhone(){
  console.log('Ryan sent a message');
  let payload = {text: 'You\'ve got this!'};

  /**
   * first param:  event name as a string
   * second parameter: payload (deliverable / info)
   */
  eventEmitter.emit('SEND_MESSAGE', payload);
}

function kenyasPhone(payload){
  setTimeout(() => {
    console.log('Message Received by Kenya: ', payload.text);
  }, 2000);
}

function triciasPhone(payload){
  setTimeout(() => {
    console.log('Message Received by Tricia: ', payload);
  }, 3500);
}


// eventEmitter.on('SEND_MESSAGE', kenyasPhone);
// eventEmitter.on('SEND_MESSAGE', triciasPhone);

setInterval(() => {
  ryansPhone();
}, 5000);
