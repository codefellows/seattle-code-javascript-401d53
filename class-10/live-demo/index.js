'use strict';

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Stack {
  constructor() {
    this.top = null;
  }

  push(value) {
    let newNode = new Node(value);
    newNode.next = this.top;
    this.top = newNode;
  }

  pop() {
    let removedValue = null;
    if (this.top) {
      removedValue = this.top.value;
      this.top = this.top.next;
    }
    return removedValue;
  }

  peek() {
    return this.top.value;
  }

  isEmpty() {
    return this.top === null;
  }
}

class Queue {
  constructor() {
    this.front = null;
    this.back = null;
  }

  enqueue(value) {
    let newNode = new Node(value);
    if (this.front) {
      // get ready to get in line
      this.back.next = newNode
    } else {
      // if there is no front... yet, we need to assign one!
      this.front = newNode
    }

    //  we assign the back pointer OR you could say we move the back pointer to the new node
    this.back = newNode
  }
  dequeue() {
    let removedValue = null;
    if (this.front) {
      removedValue = this.front.value;
      // if there was only one nide in the Queue, we need to make back null
      if (this.front === this.back) {
        this.back = null;
      }
      // works if list is empty or populated!  will either be null, or "next in line"
      // 
      this.front = this.front.next
    }
    return removedValue;
  }

  peek() {

  }

  isEmpty() {

  }
}


module.exports = { Stack, Queue };
