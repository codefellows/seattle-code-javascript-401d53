'use strict';

var Chance = require('chance');
var chance = new Chance();
const store = '1-206-flowers';

const orderHandler = (socket, order=null) => {
  if(!order){
    order = {
      store,
      orderId: chance.guid(),
      customer: chance.name(),
      address: chance.address(),
    };
  }

  let payload = {
    event: 'pickup',
    messageId: order.orderId,
    queueId: store,
    order,
  };

  console.log('VENDOR: ORDER ready for pickup:', payload);
  socket.emit('pickup', payload); 
};

const thankDriver = (payload) => console.log('VENDOR: Thank you for your order', payload.order.customer);



module.exports = { orderHandler, thankDriver };
