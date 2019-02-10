/**
 * Definition
 * Directed Graph with dependancy order
 */
// Build Graph Template
let graph = []; // list of sets
let inDegrees = new Array(node.length).fill(0); // store how many parents of the node

for (let edge of edges) {
 let node = edge[0];
 let adjNode = edge[1];
 graph[node].add(adjNode);
 inDegree[adjNode] += 1;
}

/**
 * Topological Sort with BFS
 * Template
 */
const topologicalSort = (graph, inDegree) => {
  let queue = []; // store all nodes which are waiting to be processed
  let result = [];
  // initialize
  for (let i = 0; i < inDegree.length; i += 1) {
    if (inDegree[i] === 0) queue.push(i);
  }
  // BFS
  while (queue.length !== 0) {
    // iterate the nodes which are already in the queue
    let size = queue.length;
    for (let i = 0 ; i < size; i += 1) {
      let curr = queue.shift();
      result.push(curr);
      for (let next of graph[curr]) {
        inDegree[next] -= 1;
        if (inDegree[next] === 0) {
          queue.push(next);
        }
      }
    }
  }
  return result;
};


// Leetcode 210. Course Schedule II
/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function(numCourses, prerequisites) {
  // Build Graph
  let graph = [];
  for (let i = 0; i < numCourses; i += 1) {
    graph.push(new Set());
  }
  let inDegree = new Array(numCourses).fill(0);
  
  for (let edge of prerequisites) {
    let node = edge[1];
    let adjNode = edge[0];
    graph[node].add(adjNode);
    inDegree[adjNode] += 1;
  }
  
  // Topological Sort with BFS
  let result = [];
  topologicalSort(graph, inDegree, result);
  return (result.length === numCourses) ? result : [];
};

/**
 * Topological Sort with BFS
 * Template
 */
const topologicalSort = (graph, inDegree, result) => {
  let queue = []; // store all nodes which are waiting to be processed
  // initialize
  for (let i = 0; i < inDegree.length; i += 1) {
    if (inDegree[i] === 0) queue.push(i);
  }
  // BFS
  while (queue.length !== 0) {
    // iterate the nodes which are already in the queue
    let size = queue.length;
    for (let i = 0 ; i < size; i += 1) {
      let curr = queue.shift();
      result.push(curr);
      for (let next of graph[curr]) {
        inDegree[next] -= 1;
        if (inDegree[next] === 0) {
          queue.push(next);
        }
      }
    }
  }
  return result;
};

/**
 * More Practice
 */
/**
 * Leetcode 207. Course Schedule
 * Leetcode 802. Find Eventual Safe States
 * Leetcode 269. Alien Dictionary
 * Leetcode 329. Longest Increasing Path in a Matrix
 * Leetcode 444. Sequence Reconstruction
 */