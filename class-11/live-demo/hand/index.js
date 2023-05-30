'use strict';

const handler = (payload) => {
  setTimeout(() => {
    console.log(`Hand: ${payload}` );
  }, 1000);

};

module.exports = handler;
