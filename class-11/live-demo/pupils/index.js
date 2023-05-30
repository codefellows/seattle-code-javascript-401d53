'use strict';

const handler = (payload) => {
  setTimeout(() => {
    console.log(`Pupils: Dilation update, ${payload} the pupils` );
  }, 1000);
};

module.exports = handler;
