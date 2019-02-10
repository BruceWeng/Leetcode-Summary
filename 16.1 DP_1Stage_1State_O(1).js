/**
 * Definition
 * 1. Each Stage only have 1 state
 * 2. Each Stage only depends on O(1) prev states
 * 
 * Template
 * 1. Top-Down with memo
 *    1.1 pass param and memo into the function
 *    1.2 if param in memo, return memo.get(param)
 *    1.3 update memo with recursive call and pass next param and memo
 *    1.4 return memo.get(param)
 * 
 * 2. Button-Up
 *    2.1 early return base case
 *    2.2 use variable or array to store all states
 *    2.3 iterate from startIndex to param, update current state by prev states
 *    2.4 return current state
 */
/**
 * Fibonacci Series
 * 1. Top-Down with memo
 *    T: O(n), S: O(n)
 * 2. Button-Up
 *    T: O(n), S: O(1)
 */
// 1. Top-Down with memo
const fibRecursionMemo = (n, memo={1: 1, 2: 1}) => {
  if (n in memo) return memo[n];

  memo[n] = fibRecursionMemo(n-1, memo) + fibRecursionMemo(n-2, memo);
  return memo[n];
};

// 2. Button-Up
const fibIteration = function(n) {
  if (n <= 2) return 1;

  let prevOne = 1;  
  let prevTwo = 1;
  let result = 0;

  for (let i = 3; i <= n; i += 1) {
    result = prevOne + prevTwo;
    prevTwo = prevOne;
    prevOne = result;
  }

  return result;
}

/**
 * More Practice
 */
/**
 * Leetcode 70. Climbing Stairs
 * Leetcode 343. Integer Break
 * Leetcode 198. House Robber
 * Leetcode 213. House Robber II
 */