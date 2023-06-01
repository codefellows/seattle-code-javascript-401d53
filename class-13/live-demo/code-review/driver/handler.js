'use strict';

const pickupOccurred = (payload, socket) => {
  console.log('DRIVER: picked up', payload.orderId);
  socket.emit('in-transit', payload);
};

const packageDelivered = (payload, socket) => {
  console.log('DRIVER: delivered', payload.orderId);
  socket.emit('delivered', payload);
};

module.exports = { pickupOccurred, packageDelivered };
