/**
 * Definition
 * Given n items with size A[i], an integer m denotes the size of a backpack.
 * How full you can fill this backpack?
 *
 * Basics: https://segmentfault.com/a/1190000006325321
 * 1. Backpack: No multiple select, max size
 * 2. Backpack: No multiple select, max value
 * 3. Backpack: Multiple select, max value
 * 4. Backpack: Multiple select, possibility (Order does not matter)
 * 5. Backpack: No multiple select, possibility
 * 6. Backpack: Multiple select, possibility (Order matter)
 */
// Template
// 1. No multiple select, max size
/**
 * 1. Let dp = new Array(m+1).fill(0) // store maximum sum
 * For each size A[i], iterate form target sum(m) to 1
 *    1.1 if j >= A[i]:
 *        currdp[j] = max(prevdp[j], prevdp[j - A[i]] + A[i])
 * 2. return dp[m] // actually sum at target = m
 */
const backPack = (m, A) => {
  let dp = new Array(m + 1).fill(0);
  for (let i = 0; i < A.length; i += 1) {
    for (let j = m; j > 0; j -= 1) {
      if (j >= A[i]) {
        dp[j] = Math.max(dp[j], dp[j - A[i]] + A[i]);
      }
    }
  }
  return dp[m];
};
// 2. No multiple select, max value
// 3. Backpack: Multiple select, max value
// 4. Backpack: Multiple select, possibility (Order does not matter)
// 5. Backpack: No multiple select, possibility
// 6. Backpack: Multiple select, possibility (Order matter)
//
// Leetcode 377. Combination Sum IV
// Leetcode 416. Partition Equal Subset Sum
// Leetcode 494. Target Sum
// Leetcode 956. Tallest Billboard
