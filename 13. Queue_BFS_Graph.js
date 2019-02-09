/**
 * Queue Questions
 */
/**
 * Leetcode 346. Moving Average from Data Stream
 * Leetcode 225. Implement Stack using Queues
 * Leetcode 232. Implement Queue using Stacks
 */
/**
 * Graph Structure
 * graph = []
 * 1. index: node
 * 2. list of adjNodes
 * 3. graph[i] is allowed to be empty
 * 
 * Note: 
 * if the input is edges[[node, adjNode]...], build the graph first.
 * 
 * Build Graph Template
 */ 
for (let edge of edges) {
  let node = edge[0];
  let adjNode = edge[1];
  adjList[node].add(adjNode);
  adjList[adjNode].add(node);
}
/** 
 * BFS
 * Template1
 * Return the length of the shortest path between root and target node
 */
const BFS = (graph, target) => {
  let queue = []; // store all nodes which are waiting to be processed
  let step = 0; // number of steps needed from root to current node
  // initialize
  queue.push(0); // push root node
  // BFS
  while (queue.length !== 0) {
    step += 1;
    // iterate the nodes which are already in the queue
    let size = queue.length;
    for (let i = 0; i < size; i += 1) {
      let curr = queue[0];
      if (curr === target) return step;
      for (let next of graph[curr]) {
        queue.push(next);
      }
      queue.shift();
    }
  }
  return -1; // there is no path from root to target
};

/**
 * BFS
 * Template 2 (Never visit a node twice)
 * Return the length of the shortest path between root and target node
 */
const BFS_Visited = (graph, target) => {
  let queue = []; // store all nodes which are waiting to be processed
  let visited = new Set(); // store all the nodes that we've visited
  let step = 0; // number of steps needed from root to current node

  // initialize
  queue.push(0);
  visited.add(0);
  // BFS
  while (queue.length !== 0) {
    step += 1;
    // iterate the nodes which are already in the queue
    let size = queue.length;
    for (let i = 0 ; i < size; i += 1) {
      let curr = queue[0];
      if (curr === target) return step;
      for (let next of graph[curr]) {
        if (!visited.has(next)) {
          queue.push(next);
          visited.add(next);
        }
        queue.shift();
      }
    }
  }
  return -1; // there is no path from root to target
};

/**
 * Conclusion:
 * 1. Use template 1 when: 
 *   a. make sure there is no cycle (ex: Tree traversal)
 *   b. we do want to add the node to the queue multiple times
 * 2. Otherwise use template 2
 */

 /**
  * BFS Questions
  */
 /**
  * Leetcode 286. Walls and Gates
  * Leetcode 200. Number of Islands
  * Leetcode 752. Open the Lock
  * Leetcode 279. Perfect Squares
  * Leetcode 490. The Maze
  * Leetcode 542. 01 Matrix
  * Leetcode 130. Surrounded Regions
  * Leetcode 207. Course Schedule
  * Leetcode 802. Find Eventual Safe States
  * Leetcode 127. Word Ladder (Two-end Queue)
  * Leetcode 785. Is Graph Bipartite?
  * Leetcode 886. Possible Bipartition
  * Leetcode 847. Shortest Path Visiting All Nodes
  */