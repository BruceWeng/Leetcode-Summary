/**
 * Flood Fill
 * Find Neighbor grid and connected components
 * 
 * Template
 * 1. Declare DFS fill(matrix, i, j, target):void function
 *    1.a handle not in area edge case
 *    1.b inplace change grid value in matrix
 *    1.c find next position
 *    1.d call fill(matrix, nextI, nextJ, target)
 * 2. Note: fill function can be used in Board Search as search function
 */
// Leetcode 733. Flood Fill
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  if (image === undefined || sr === undefined || sc === undefined || newColor === undefined ||
    image.length === 0 || image[0].length === 0 || sr < 0 || sc < 0 || sr >= image.length || sc >= image[0].length)
    return [];

  if (image[sr][sc] === newColor) return image;

  fill(image, sr, sc, newColor, image[sr][sc]);
  return image;
};

const fill = (image, i, j, newColor, oldColor) => {
  // handle not in area
  if (i < 0 || j < 0 || i >= image.length || j >= image[0].length || image[i][j] !== oldColor) return;

  image[i][j] = newColor;
  let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]]; // up right down left
  for (let d of dirs) {
    let nextI = i + d[0];
    let nextJ = j + d[1];
    fill(image, nextI, nextJ, newColor, oldColor);
  }
};

/**
 * 2019/11/26 Revisit
 */
/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} newColor
 * @return {number[][]}
 */
var floodFill = function (image, sr, sc, newColor) {
  if (image.length === 0 || image[0].length === 0) return image;

  if (image[sr][sc] === newColor) return image;
  fill(sr, sc, image[sr][sc]);
  return image;

  function fill(i, j, oldColor) {
    if (i < 0 || i >= image.length || j < 0 || j >= image[0].length || image[i][j] !== oldColor) return;

    image[i][j] = newColor;

    let dirs = [[-1, 0], [0, 1], [1, 0], [0, -1]];
    for (let d of dirs) {
      let nextI = i + d[0];
      let nextJ = j + d[1];
      fill(nextI, nextJ, oldColor);
    }
  }
};

/**
 * Leetcode 200. Number of Islands
 * Leetcode 695. Max Area of Island
 * Leetcode 130. Surrounded Regions
 */

/** 
 * Union Find 
 * If m operations, either Union or Find, are applied to n elements, 
 * the total run time is O(mlog*n) amortized time
 * 
 * Apply Union Find on Board
 * T: O(log(mn)). Nearly O(1) for each grid
 * Total T: O(mn*log(mn))
 * 
 * Template:
 * 1. Initialize groups and = [i for i in range(n)] (index: node, value: root)
 * 2. Initialize ranks and = [i for i in range(n)] (index: node, value: rank)
 * 3. function find(index): root
 * 4. function union(index1, index2): void (side effect) 
 *    4.a if rank[root1] > rank[root2]: swap(ranks, root1, root2)
 *    4.b Union by Rank by attach group[root1] to group[root2]:
 *        groups[root1] = root2;
 *        ranks[root2] += ranks[root1];
 * 5. Note: In matrix, use i * n + j as index
 */
function Group(n) {
  var groups = new Array(n); // 1.
  var ranks = new Array(n); // 2.

  for (let i = 0; i < groups.length; i += 1) {
    groups[i] = i;
    ranks[i] = i;
  }

  const find = (index) => { // 3.
    // Isolated
    if (groups[index] === index) return index;

    // Group
    return find(groups[index]);
  }

  const union = (index1, index2) => { // 4.
    let root1 = find(index1);
    let root2 = find(index2);

    // Already unioned
    if (root1 === root2) return;

    // rank1 > rank2: swap roots
    if (ranks[root1] > ranks[root2]) [[root1, root2] = [root2, root1]];

    // Union by Rank
    groups[root1] = root2;
    ranks[root2] += ranks[root1];
  }

  return {
    find,
    union
  }
}
/**
 * Leetcode 200. Number of Islands
 * Leetcode 305. Number of Islands II
 * Leetcode 547. Friend Circles
 * Leetcode 130. Surrounded Regions
 */
/**
 * Backtracking
 * 
 * Template
 * 1. let result = []
 * 2. let candid = []
 * 3. call backtrack(result, candid, startIndex, nums, moreInfo)
 *    3.1 handle edge case
 *      3.1.1 result.push([...candid])
 *      3.1.2 return for combination and permutation, not return for subset
 *    3.2 iterate nums from startIndex
 *      3.2.1 check condition based on question
 *      3.2.2 candid.push(nums[i]);
 *      3.2.3 backtrack(result, candid, nextIndex, nums, moreInfo)
 *      3.2.4 candid.pop()
 * 
 * 4. return result
 */
const backtrack = (result, candid, startIndex, moreInfo) => {
  // 3.1
  if (pass/*check candid.length with moreInfo*/) {
    result.push([...candid]);
    /*return or not*/
  }

  // 3.2
  for (let i = startIndex; i < nums.length; i += 1) {
    if (pass/*check nums[i] with moreInfo*/) {
      candid.push(nums[i]);
      backtrack(result, candid, nextIndex, nums, moreInfo);
      candid.pop();
    }
  }
};
/**
 * Leetcode 17. Letter Combinations of a Phone Number
 * Leetcode 46. Permutations
 * Leetcode 77. Combinations
 * Leetcode 39. Combination Sum
 * Leetcode 78. Subsets
 * Leetcode 131. Palindrome Partitioning
 * Leetcode 291. Word Pattern II
 * Leetcode 698. Partition to K Equal Sum Subsets
 */