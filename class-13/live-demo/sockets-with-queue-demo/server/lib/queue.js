'use strict';

class Queue {
  constructor() {
    this.data = {};
  }

  store(key, value) {
    this.data[key] = value;
    // no need to spy on console for test, just test output
    console.log('something was added to the queue');
    return key;
  }

  read(key) {
    return this.data[key];
  }

  remove(key) {
    // no need to spy on console for test, just test output
    console.log('something was removed from queue');
    let value = this.data[key];
    delete this.data[key];
    return value;
  }
}

module.exports = Queue;
