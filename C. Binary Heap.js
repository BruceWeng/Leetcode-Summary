/**
 * Definition
 * Heap(compareFunc) {
 *   const nums = []
 *   const compare = compareFunc || function(a, b) { return a - b }; // default min stack
 * 
 *   return {
 *     peek,
 *     push,
 *     pop,
 *     size,
 *     remove
 *   }
 * }
 * 
 * Basic Operation:
 * 1. Peek root value of heap: O(1)
 * 2. Push new valud to the heap and move it to proper position(bubbleUp): O(logn)
 * 3. Pop the value based on compareFunc and heapify(sinkDown): O(logn)
 * 4. size: O(1)
 * 5. remove: looking for the target node and heapify(bubbleUp and sinkDown): O(n) + O(logn)
 * 
 * 1. Use nums to serialize binary heap
 * 2. The root stores in the 0 index
 * 3. pop and remove moves the target node to the nums[-1] and nums.pop()
 * 4. Heapify:
 *  4.a bubbleUp last index after push
 *  4.b sinkDown 0 index after pop
 *  4.c bubbleUp and sinkDown removeIndex after remove
 */
function Heap(compareFunc) {
  const nums = [];
  const compare = compareFunc || function(a, b) { return a - b };
  
  const peek = () => nums[0];
  
  // 4.a bubbleUp last index after push
  const push = (node) => {
    nums.push(node);
    bubbleUp(nums.length - 1);
  }
  
  // 4.b sinkDown 0 index after pop
  const pop = () => {
    if (nums.length === 0) return null;
    let root = nums[0];
    nums[0] = nums[nums.length-1];
    nums.pop();
    sinkDown(0);
    return root;
  }
  
  const size = () => nums.length;
  
  // 4.c bubbleUp and sinkDown removeIndex after remove
  const remove = (val) => {
    let removeIndex = null;
    for (let i = 0; i < nums.length; i += 1) {
      if (compare(nums[i], val) === 0) removeIndex = i;
    }
    if (removeIndex === null) return;
    swap(nums, removeIndex, nums.length-1);
    let result = nums.pop();
    if (removeIndex < nums.length) {
      bubbleUp(removeIndex);
      sinkDown(removeIndex);
    }
    return result;
  }
  
  // Helper functions
  const swap = (nums, a, b) => {
      [ nums[a], nums[b] ] = [ nums[b], nums[a] ];
  }
  
  const bubbleUp = (currIndex) => {
    // swap(nums, parentIndex, currIndex) until find the proper position
    while (currIndex > 0) {
      // remember parentIndex
      let parentIndex = Math.floor((currIndex + 1) / 2) - 1;

      if (moreProper(nums[parentIndex], nums[currIndex])) break;
      swap(nums, parentIndex, currIndex);
      currIndex = parentIndex;
    }
  }
  
  const sinkDown = (currIndex) => {
    while (true) {
      let swapIndex = null;
      // Remember childen indecies
      let RChildIndex = (currIndex + 1) * 2;
      let LChildIndex = RChildIndex - 1;

      // let swapIndex be the most proper index
      // Evaluate left child to current index
      if (LChildIndex < nums.length && 
          moreProper(nums[LChildIndex], nums[currIndex])) swapIndex = LChildIndex;
      
          // Evaluate right child to current index and right child to left child
      if (RChildIndex < nums.length && 
          moreProper(nums[RChildIndex], nums[currIndex]) && 
          moreProper(nums[RChildIndex], nums[LChildIndex])) swapIndex = RChildIndex;

      if (swapIndex === null) break;

      swap(nums, currIndex, swapIndex);
      currIndex = swapIndex;
    }
  }

  // evaluate if a is in proper position than b
  // currIndex always be b
  const moreProper = (a, b) => compare(a, b) < 0;

  return {
    peek,
    push,
    pop,
    size,
    remove
  }
}

/**
 * Graph Dijkstra - Single Source All Destination Shortest Path
 */
/**
Given an undirected graph and a starting node, determine the lengths of the shortest 
paths from the starting node to all other nodes in the graph. If a node is unreachable, 
its distance is -1. Nodes will be numbered consecutively from 1 to n, and edges will 
have varying distances or lengths.

For example, consider the following graph of 5 nodes:
Begin	End	Weight
    1	  2	     5
    2	  3	     6
    3	  4	     2
    1	  3	    15

    5
        w:6     w:2
    2 ----- 3 ----- 4
    |     /
w:5 |   / w:15
    | /
    1 (start)

Starting at node 1, the shortest path to 2 is direct and distance 5. Going from 1 to 3, 
there are two paths: 1->2->3 at a distance of 5+6=11 or 1->3 at a distance of 15. 
Choose the shortest path, 11. From 1 to 4, choose the shortest path through 3 and extend it: 
1->2->3->4 for a distance of 11+2=13. There is no route to node 5, so the distance is -1.

The distances to all nodes in increasing node order, omitting the starting node, are 5 11 13 -1.

Dijkstra Algorithm:
1. Constraint: weight needs to be positive
2. Single source only: 
   Can count for shortest distance from single source to other nodes, but not any nodes.
3. Greedy Algorithm

Steps:
1. Initial all distance (from start to curr node) as Infinite
2. Add start node in Priority Queue
3. Pop node and Update next.dist: 
   next.dist = min(next.dist, weight)
4. Add all next node in Priority Queue
5. Pop min(node.dist) from Priority Queue and repeat 3, 4, 5 <- Greedy
6. Finish when all node visited

T: O(NlogN + E)
S: O(N + E)
 */
/**
 * @param {number} n
 * @param {number[[]]} edges
 * @param {number} s
 * @return {number[]}
 */
const Heap = require("./Heap");
const shortestReach = (n, edges, s) => {
  // 1. Declare dist for each node with default value: Inf
  // 2. Construct graph: index: node, value: [next, weight]
  // 3. Declare visited array.fill(false)
  // 4. Declare minHeap to pop minweight next node
  // 5. while in minHeap
  //    a. Pop out new [node, dist], if new node is visited continue
  //    b. Update visited[node], Update dists[node] = dist
  //    c. Iterate next nodes: 
  //       if !visited[next] && dist + weight < dists[next]:
  //         push([next, dist + weight]) in minHeap as dist candidate
  // 6. Update all isolated nodes dist as -1
  // 7. Return dists
  let Inf = Number.MAX_SAFE_INTEGER;
  let dists = new Array(n+1).fill(Inf);

  let graph = [];
  for (let i = 0; i < n+1; i += 1) graph.push([]);
  for (const [node, next, weight] of edges) {
    graph[node].push([next, weight]);
    graph[next].push([node, weight]);
  }

  let visited = new Array(n+1).fill(false);

  let minHeap = Heap((a, b) => a[1] - b[1]);
  minHeap.push([s, 0]);

  while (minHeap.size() !== 0) {
    let [node, dist] = minHeap.pop();
    if (visited[node]) continue;

    visited[node] = true;
    dists[node] = dist;

    // Iterate next
    for (let [next, weight] of graph[node])
      if (!visited[next] && dist + weight < dists[next]) 
        minHeap.push([next, dist + weight]);
  }

  for (let i = 1; i < dists.length; i += 1) 
    if (dists[i] === Inf) dists[i] = -1;

  return dists;
};

// Test
let n = 4;
let edges = [[0, 1, 24], [0, 3, 20], [2, 0, 3], [3, 2, 12]];
let s = 0;
console.log(shortestReach2(n, edges, s)); // [0, 24, 3, 15];
/**
 *        1          2
 *        |  w: 3  / |
 *   w: 24|     /    | w: 12
 *        |  /       |
 * (start)0 -------- 3
 *           w: 20
 */