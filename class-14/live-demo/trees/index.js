'use strict';

class Node {
  constructor(value){
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

// not required for Code challenge 15
class KaryNode {
  constructor(value, k){
    this.value = value;
    this.children = new Array(k).fill(null);
  }
}

// not required for Code challenge 15
class KaryTree {
  constructor(){
    this.root = null;
  }
}

class Tree {
  constructor(){
    this.root = null;
  }

  preOrder(){
    const results = [];

    // defining helper our function
    const traverse = (node) => {
      // base case (do the thing)
      results.push(node.value);

      // left and right recursive cases
      if(node.left) {
        traverse(node.left);
      }
      if(node.right){
        traverse(node.right);
      }
      // note IF there is no left and no right WE ARE DONE WITH THIS FUNCTION
    }
    // get the recursive party started
    traverse(this.root);
    return results;
  }

  inOrder(){
    const results = [];

    const traverse = (node) => {
      
      if(node.left) {
        traverse(node.left);
      }
      results.push(node.value);  // performing our base case here makes this inOrder
      if(node.right){
        traverse(node.right);
      }
    }
    traverse(this.root);
    return results;
  }

  postOrder(){
    const results = [];

    const traverse = (node) => {
      if(node.left) traverse(node.left);
      if(node.right) traverse(node.right);
      results.push(node.value);  // performing our base case here makes this postOrder
    }
    traverse(this.root);
    return results;
  }

}

let tree = new Tree();
tree.root = new Node(10);
tree.root.left = new Node(5);
tree.root.right = new Node(15);
tree.root.left.left = new Node(1);
tree.root.left.right = new Node(8);
tree.root.right.right = new Node(17);

console.log('-------preOrder-------');
let results = tree.preOrder();
console.log('preOrder results:', results);
console.log('-------inOrder-------');
results = tree.inOrder();
console.log('inOrder results:', results);
console.log('-------postOrder-------');
results = tree.postOrder();
console.log('postOrder results:', results);

