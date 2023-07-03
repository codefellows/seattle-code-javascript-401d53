'use strict';

class Vertex {
  constructor(value){
    this.value = value;
  }
}

class Edge{
  constructor(vertex, weight=0){
    this.vertex = vertex;
    this.weight = weight;
  }
}

class Graph {
  constructor(){
    // remember the docs for all of the nuances
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
    this.adjacencyList = new Map();
  }

  addVertex(value){
    const vertex = new Vertex(value);
    // vertex is the point on the graph, the array is all of the edges (think connections)
    this.adjacencyList.set(vertex, []);
    return vertex
  }

  addDirectedEdge(startVertex, endVertex, weight=0){
    // find the vertex we want to connect AND grab it's edge array
    const neighbors = this.adjacencyList.get(startVertex);
    neighbors.push(new Edge(endVertex, weight));
  }

  getNeighbors(vertex){
    return [...this.adjacencyList.get(vertex)];
  }

  getVertices(){
    // does this work????
    // new special object "iterator"
    let iterator = [...this.adjacencyList.keys()];
    // console.log('first vertex', iterator[0]);
    // console.log('first vertex value', iterator[0].value);

    return iterator;
  }

  size(){
    return this.adjacencyList.size;
  }

  breadthFirst(root, callback){
    const queue = [root];
    const visited = new Set();
    visited.add(root);
    let current = null;

    while(queue.length){
      // the first time, we pop the vertex
      current = queue.pop();

      // if a callback exists, we use it to "do the thing"
      if(callback){
        callback(current.value);
      }

      // grab neighbor(s) if it exists
      const neighbors = this.getNeighbors(current); 
      // if this was the array: ['a', 'b', 'c']
      // "for edge of" would equal 'a', the element
      // whereas "for edge in" would equal 0, the index
      for(let edge of neighbors){
        // if we haven't visited the node, 
        if(!visited.has(edge.vertex)){
          // we add the vertex to the visited set to avoid duplication
          visited.add(edge.vertex);
          // THEN we insert the vertex into the proper end of the queue
          queue.unshift(edge.vertex);
        }
      }
    }
    return visited;
  }

  depthFirst(root, callback){
    const stack = [root];
    const visited = new Set();
    visited.add(root);
    let current = null;

    while(stack.length){
      // the first time, we pop the vertex
      current = stack.pop();

      // if a callback exists, we use it to "do the thing"
      if(callback){
        callback(current.value);
      }

      // grab neighbor(s) if it exists
      const neighbors = this.getNeighbors(current); 
      // if this was the array: ['a', 'b', 'c']
      // "for edge of" would equal 'a', the element
      // whereas "for edge in" would equal 0, the index
      for(let edge of neighbors){
        // if we haven't visited the node, 
        if(!visited.has(edge.vertex)){
          // we add the vertex to the visited set to avoid duplication
          visited.add(edge.vertex);
          // THEN we insert the vertex into the proper end of the stack
          stack.push(edge.vertex);
        }
      }
    }
    return visited;
  }

}

const graph = new Graph();

const A = graph.addVertex('A');
const B = graph.addVertex('B');
const C = graph.addVertex('C');
const D = graph.addVertex('D');
const E = graph.addVertex('E');
const F = graph.addVertex('F');
const G = graph.addVertex('G');
const H = graph.addVertex('H');

graph.addDirectedEdge(A, B);
graph.addDirectedEdge(A, D);
graph.addDirectedEdge(A, C);
graph.addDirectedEdge(B, G);
graph.addDirectedEdge(D, F);
graph.addDirectedEdge(D, H);
graph.addDirectedEdge(F, H);
graph.addDirectedEdge(F, E);
graph.addDirectedEdge(C, H);

console.log('getVertices works!', graph.getVertices());
console.log('getNeighbors works!', graph.getNeighbors(A));
console.log('size method works!', graph.size())
console.log('-----------------');
graph.breadthFirst(A, console.log);
console.log('-----------------');
graph.depthFirst(A, console.log);
console.log('-----------------');
