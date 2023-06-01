'use strict';

var Chance = require('chance');
var chance = new Chance();

const orderHandler = (socket, payload=null) => {
  if(!payload){
    payload = {
      store: chance.company(),
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }
  console.log('VENDOR: ORDER ready for pickup:', payload);
  socket.emit('pickup', payload); 
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.customer);



module.exports = { orderHandler, thankDriver };
