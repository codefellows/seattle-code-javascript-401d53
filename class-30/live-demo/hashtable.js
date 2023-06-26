'use strict';

const LinkedList = require('./LinkedList');

class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(size);
  }

  hash(key) {
    let characters = key.split(''); // ['s', 't', 'r']
    // use the reducer pattern (for review)
    let asciiSum = characters.reduce((sum, character) => {
      return sum + character.charCodeAt(0);
    }, 0);
    // proof we can get ascii sum worked!
    // console.log('asciiSum:', asciiSum);

    // multiply ascii sum by a large prime number
    let initialHash = asciiSum * 599
    // return the remainder of that product DIVIDED by the size
    return initialHash % this.size;
  }

  set(key, value) {
    let position = this.hash(key);

    // remember square bracket notation if key is a variable!
    let data = { [key]: value }

    // linked list approach (so you can see it)
    // if (this.buckets[position]){
    //   let bucket = this.buckets[position];
    //   bucket.add(data);
    // } else {
    //   let bucket = new LinkedList();
    //   bucket.add(data);
    //   this.buckets[position] = bucket;
    // }

    // our lab approach.  
    // if the data exists replace it
    // if doesn't exist, just assign it!
    this.buckets[position] = data;
  }

  get(key) {
    let position = this.hash(key);
    if (this.buckets[position]) {
      console.log('this.buckets[position]:', this.buckets[position]);
      //                        854    Ryan
      // return this.buckets[position][key];
      return this.buckets[position][key];
    }
  }

  has(key){
    let position = this.hash(key);
    let result = this.buckets[position] ? true : false
    return result;
  }

  keys(){
    let results = this.buckets.reduce((keysArr, bucket) => {
      if(bucket){
        return [...keysArr, ...Object.keys(bucket)];
      } 
    }, []);
    return results;
  }

}


const table = new HashTable(1024);

console.log('table:', table);

let hashOne = table.hash('Ryan');
let hashTwo = table.hash('Kati');
console.log('hashOne:', hashOne);
console.log('hashTwo:', hashTwo);

table.set('Ryan', 'this is my value');
table.set('Kati', 'how do we define value');

console.log('updated table:', table);
console.log('get works!', table.get('Ryan'));
console.log('has worked:', table.has('Ryan')); // expect true
console.log('has worked:', table.has('Lucky')); // expect false
let keys = table.keys();
console.log('keys:', keys);
