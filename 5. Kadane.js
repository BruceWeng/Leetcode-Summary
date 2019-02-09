/**
 * Template
 * let max = nums[0]
 * let result = nums[0]
 * for i in range[1, nums.length):
 *   max = Math.max(max + nums[i], nums[i])
 *   result = Math.max(result, max)
 * 
 * return result
 * 
 * Extend (product)
 *   prevMin = min;
 *   prevMax = max;
 *   min = Math.min(prevMin * nums[i], prevMax * nums[i], nums[i]);
 *   max = Math.max(prevMin * nums[i], prevMax * nums[i], nums[i]);
 *   result = Math.max(result, max)
 */
// Leetcode 53. Maximum Subarray
const maxSubArray = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  let max = nums[0];
  let result = nums[0];
  for (let i = 1; i < nums.length; i += 1) {
    max = Math.max(max + nums[i], nums[i]);
    result = Math.max(result, max);
  } 

  return result;
};

// Leetcode 121. Best Time to Buy and Sell Stock
const maxProfit = function(prices) {
  if (prices === undefined || prices.length === 0) return 0;

  // profits are difference between the price on each day
  let profits = [0];
  for (let i = 1; i < prices.length; i += 1) {
    profits.push(prices[i] - prices[i-1]);
  }

  // Maximum subarray sum
  let max = profits[0];
  let result = profits[0];
  for (let i = 1; i < profits.length; i += 1) {
    max = Math.max(max + profits[i], profits[i]);
    result = Math.max(result, max);
  } 

  return result;
}

// Leetcode 152. Maximum Product Subarray
const maxProduct = (nums) => {
  if (nums === undefined || nums.length === 0) return 0;
  let min = nums[0];
  let max = nums[0];
  let result = nums[0];

  for (let i = 1; i < nums.length; i += 1) {
    // Variable reuse
    let prevMin = min;
    let prevMax = max;
    min = Math.min(prevMin * nums[i], prevMax * nums[i], nums[i]);
    max = Math.max(prevMin * nums[i], prevMax * nums[i], nums[i]);
    result = Math.max(result, max);
  }

  return result;
}