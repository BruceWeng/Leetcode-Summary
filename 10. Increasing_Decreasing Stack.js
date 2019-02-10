/**
 * Definition
 * Use stack to store increasing/decreasing sequence
 */
/**
 * Decreasing Stack Template
 */
const decreasingStack = (nums) => {
  let result = [];
  let stack = [];
  // Declare map if necessary
  for (let i = 0; i < nums.length; i += 1) {
    while (stack.length !== 0 && nums[i] > stack[stack.length - 1]) {
      stack.pop();
      // Update map or result
    }
    stack.push(i) || stack.push(nums[i]);
  }
  // Update result if necessary
  return result;
}
/**
 * Decreasing Stack
 * Leetcode 42. Trapping Rain Water
 * Leetcode 496. Next Greater Element I
 * Leetcode 739. Daily Temperatures
 * Leetcode 503. Next Greater Element II
 * 
 * Increasing Stack
 * Leetcode 316. Remove Duplicate Letters
 * Leetcode 84. Largest Rectangle in Histogram
 * Leetcode 85. Maximal Rectangle
 */ 