/**
 * Graph Structure
 * graph = []
 * 1. index: node
 * 2. set of adjNodes
 * 3. graph[i] is allowed to be empty
 *
 * Note:
 * if the input is edges[[node, adjNode]...], build the graph first.
 *
 * Build Graph Template
 */
let graph = [];
for (let i = 0; i < nodes; i += 1) graph.push(new Set());

for (let edge of edges) {
  let node = edge[0];
  let adjNode = edge[1];
  graph[node].add(adjNode);
  graph[adjNode].add(node); // undirected
}

/**
 * DFS
 * Template 1 (Recursion)
 * Return true if there is a path from curr to target
 */
const DFS = (curr, graph, target, visited) => {
  if (curr === target) return true;

  for (let next of graph[curr]) {
    if (!visited.has(next)) {
      visited.add(next);
      if (DFS(next, graph, target, visited) === true) return true;
    }
  }
  return false;
};

/**
 * DFS
 * Template 2 (Stack)
 * Use it when depth of recursion is too high
 */
const DFS_Stack = (graph, target) => {
  let visited = new Set();
  let stack = [];
  stack.push(0); // push root to stack
  while (stack.length !== 0) {
    let curr = stack.pop();
    if (curr === target) return true;
    for (let next of graph[curr]) {
      if (!visited.has(next)) {
        visited.add(next);
        stack.push(next);
      }
    }
  }
  return false;
};

/**
 * Conclusion:
 * Use template 1 in Board Search
 * Use template 2 in other senarios
 */

/**
 * Cycle Detection
 */
const nodes = 8;
const edges = [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [6, 7], [7, 6]];

let graph = [];
for (let i = 0; i < nodes; i += 1) graph.push(new Set());

for (let edge of edges) {
  let node = edge[0];
  let adjNode = edge[1];
  graph[node].add(adjNode);
}

/**
 * Cycle Detection Template
 *
 * @param {Set[]} graph
 * @param {Node[]} result
 * @param {number} i
 * @param {Set} visited
 */
const detect = (graph, result, i, visited) => {
  let candid = new Set();
  let stack = [];
  stack.push(i); // push root to stack
  while (stack.length !== 0) {
    let curr = stack.pop();
    candid.add(curr);
    for (let next of graph[curr]) {
      if (next === undefined) return; // no cycle, early return
      if (candid.has(next)) {
        // cycle found
        candid = Array.from(candid);
        candid.push(next);
        result.push(candid);
        break;
      }
      if (!visited.has(next)) {
        visited.add(next);
        stack.push(next);
      }
    }
  }
};

const printCycles = graph => {
  let result = [];
  let visited = new Set();
  for (let i = 0; i < graph.length; i += 1) {
    if (visited.has(i)) continue; // avoid traversing node in cycle

    visited.add(i);
    detect(graph, result, i, visited);
  }

  return result;
};

printCycles(graph); // [ [ 0, 1, 2, 0 ], [ 6, 7, 6 ] ]

/**
 * Board Search
 * Template
 * 1. Declare function Grid(i, j) return `${i},${j}` as visited map key
 * 2. Iterate each grid
 * 3. Declare search(i, j, moreInfo) function as DFS function
 * 4. Handle edge cases
 * 5. visited.set(Grid(i, j), true) if needed
 * 6. find next position
 *   6.1 nextI = i + dir[0]
 *       nextJ = j + dir[1]
 *   6.2 if (search(nextI, nextJ, moreInfo) === true) return true
 * 7. visited.set(Grid(i, j), false) if needed
 * 8. return false
 * 9. Handle not in area edge case in independant function
 */
// Leetcode 79. Word Search
// Post order traversal:
//   if (searchWord(index + 1, next_i, next_j)) return true;
function Grid(i, j) {
  return `${i},${j}`;
}
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
const exist = (board, word) => {
  let visited = new Map();
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      visited.set(Grid(i, j), false);
    }
  }

  const direction = [[-1, 0], [0, 1], [1, 0], [0, -1]];
  for (let i = 0; i < board.length; i += 1) {
    for (let j = 0; j < board[0].length; j += 1) {
      if (searchWord(0, i, j)) return true;
    }
  }

  return false;

  /**
   * Search word[index...word.length] from board[startx][starty]
   *
   * @param {Number} index
   * @param {Number} i
   * @param {Number} j
   */
  function searchWord(index, i, j) {
    if (index === word.length) return true;

    if (notInArea(i, j)) return false;

    if (visited.get(Grid(i, j))) return false;

    if (board[i][j] !== word[index]) return false;

    visited.set(Grid(i, j), true);

    for (let dir of direction) {
      let next_i = i + dir[0];
      let next_j = j + dir[1];

      if (searchWord(index + 1, next_i, next_j)) return true;
    }

    visited.set(Grid(i, j), false);

    return false;
  }

  function notInArea(i, j) {
    return !(i >= 0 && i < board.length && j >= 0 && j < board[0].length);
  }
};

// Leetcode 329. Longest Increasing Path in a Matrix
/**
 * @param {number[][]} matrix
 * @return {number}
 */
var longestIncreasingPath = function (matrix) {
  if (matrix === undefined || matrix.length === 0 || matrix[0].length === 0)
    return 0;

  let m = matrix.length;
  let n = matrix[0].length;

  let cache = [];
  for (let i = 0; i < m; i += 1) {
    cache.push(new Array(n).fill(0));
  }

  let result = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      result = Math.max(result, search(matrix, i, j, cache, -1));
    }
  }

  return result;
};

const search = (matrix, i, j, cache, prevVal) => {
  // handle not in area and invalid case
  if (
    i < 0 ||
    j < 0 ||
    i >= matrix.length ||
    j >= matrix[0].length ||
    matrix[i][j] <= prevVal
  )
    return 0;

  // check cache first
  if (cache[i][j] !== 0) return cache[i][j];

  let length = 0;

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let d of dirs) {
    let nextI = i + d[0];
    let nextJ = j + d[1]; // <- Frequently typo HERE!
    length = Math.max(
      length,
      search(matrix, nextI, nextJ, cache, matrix[i][j])
    );
  }
  length += 1;
  cache[i][j] = length;
  return length;
};

// Leetcode 329. Longest Increasing Path in a Matrix
// Revisit 2020/01/07
// Post order traversal:
//   let length = 1 + dfsWithCache(matrix, nextI, nextJ, cache, matrix[i][j]);
//   max = Math.max(max, length);
/**
 * DFS + Memoization 
 * 
 * Traverse all points in matrix, use every point as starting point to do dfs traversal. DFS function returns max increasing 
 * path after comparing four max return distance from four directions. 
 * 
 * @param cache: cache[i][j] represents longest increasing path starts from point matrix[i][j]
 * @param prev: previous value used by DFS traversal, to compare whether current value is greater than previous value
 * @param {number[][]} matrix
 * @return {number}
 */
function Grid(i, j) {
  return `${i},${j}`;
}

var longestIncreasingPath = function (matrix) {
  if (matrix === undefined || matrix.length === 0 || matrix[0].length === 0)
    return 0;

  let m = matrix.length;
  let n = matrix[0].length;

  let cache = new Map();
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      cache.set(Grid(i, j), 0);
    }
  }

  let result = 0;
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      result = Math.max(result, dfsWithCache(matrix, i, j, cache, -1));
    }
  }

  return result;
};

function notInArea(matrix, i, j) {
  return !(i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length);
}

const dfsWithCache = (matrix, i, j, cache, prevVal) => {
  // handle not in area and invalid case
  if (notInArea(matrix, i, j) || matrix[i][j] <= prevVal) return 0;

  // check cache first
  if (cache.get(Grid(i, j)) !== 0) return cache.get(Grid(i, j));

  let max = 0;

  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let d of dirs) {
    let nextI = i + d[0];
    let nextJ = j + d[1]; // <- Frequently typo HERE!
    let length = 1 + dfsWithCache(matrix, nextI, nextJ, cache, matrix[i][j]);
    max = Math.max(max, length);
  }
  cache.set(Grid(i, j), max);
  return max;
};

/**
 * More Practice
 */
/**
 * Leetcode 212. Word Search II (Trie)
 * Leetcode 51. N Queens
 * Leetcode 37. Sudoku Solver
 * Leetcode 490. The Maze
 * Leetcode 542. 01 Matrix
 * Leetcode 286. Walls and Gates
 */
