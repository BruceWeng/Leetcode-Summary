/**
 * Definition
 * 1. There are 2 stages
 * 2. Each Stage only have 1 state
 * 3. Each Stage only depends on O(1) prev states
 * 
 * Button-Up Template
 * 1. Early return base case
 * 2. Declare 2 stages by array with one extra prev state
 *    (Can be reduced by rolling array or to variables)
 * 3. Observe relationship between states between 2 stages
 *    Come up with transfer function
 * 4. Initilize initial states
 * 5. Iterate from startIndex to param, 
 *   update current state by prev states for the 2 stages
 * 6. Calculate from stage1[n] and stage2[n] and return answer
 */

 // Leetcode 276. Paint Fence
 /**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var numWays = function(n, k) {
  if (n === 0 || k === 0) return 0;
  
  if (n === 1) return k;

  let sameStages = new Array(n+1).fill(0);
  let diffStages = new Array(n+1).fill(0);

  // Initialization
  sameStages[2] = k;
  diffStages[2] = k * (k-1);

  // Transfer Function from 3 to n
  for (let i = 3; i <= n; i += 1) {
      sameStages[i] = diffStages[i-1];
      diffStages[i] = (sameStages[i-1] + diffStages[i-1]) * (k-1);
  }

  return sameStages[n] + diffStages[n];
};

/**
 * More Practice
 */
/**
 * Leetcode 376. Wiggle Subsequence
 * Leetcode 265. Paint House II
 */