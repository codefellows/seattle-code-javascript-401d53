'use strict';

class Node {
  constructor(value){
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor(){
    this.head = null;
  }

  // adds a node to the FRONT of a linked list
  insert(value){
    let node = new Node(value);
    node.next = this.head;
    this.head = node;
  }

  // adds a node to the END of a linked list 
  append(value){
    let node = new Node(value);
    // if the head is null, we need to assign this new to the head as well
    if(!this.head){
      // in other words, if the list was empty, do this and done
      this.head = node;
      return
    }
    let current = this.head
    while(current.next){
      current = current.next;
    }
    current.next = node;

  }

  // iteratively traverse linked list and do a thing 
  traversal(){
    let current = this.head;

    while(current){
      // do the thing
      console.log(current.value);
      current = current.next;
    }
  }

}

let list  = new LinkedList();
list.append('a');
list.append('b');
list.append('c');
list.append('d');

console.log(JSON.stringify(list));



module.exports = LinkedList
