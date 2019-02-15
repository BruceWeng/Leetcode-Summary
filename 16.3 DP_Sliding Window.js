/**
 * Definition
 * 1. Each Stage only have 1 state
 * 2. Each Stage only depends on O(n) prev states (in range [start,end])
 *
 * Buttom-Up Template (Sliding Window DP)
 * 1. Declare stages[n] or stages[n+1]
 * 2. for end = 0; end < nums.length; end += 1:
 *      for (start = end; start < end; start += 1):
 *        // condition base on question
 *        update stages: stages[start] = max/min(stages[start], stages[end] +/- 1)
 *        // other conditions
 *        update stage2 if needed
 * 3. Post processing if needed (find the max/min of stages)
 * 4. return stages[n-1] or stages[n] or result
 */

// One Stage:
// Leetcode 300. Longest Increasing Subsequence(LIS)
const lengthOfLIS = nums => {
  let stages = new Array(nums.length).fill(1);

  for (let end = 0; end < nums.length; end += 1) {
    for (let start = 0; start < end; start += 1) {
      if (nums[end] > nums[start]) {
        stages[end] = Math.max(stages[end], stages[start] + 1);
      }
    }
  }

  let result = 0;
  for (let states of stages) {
    result = Math.max(result, states);
  }

  return result;
};

// Leetcode 139. Word Break
const wordBreak = (s, wordDict) => {
  if (
    s === undefined ||
    wordDict === undefined ||
    s.length === 0 ||
    wordDict.length === 0
  )
    return false;

  let wordDictSet = new Set(wordDict);
  let stages = new Array(s.length + 1).fill(false);
  stages[0] = true; // no segment

  // Iterate substring
  for (let end = 1; end < s.length + 1; end += 1) {
    for (let start = 0; start < end; start += 1) {
      if (stages[start] && wordDictSet.has(s.slice(start, end))) {
        stages[end] = true;
        break;
      }
    }
  }

  return stages[stages.length - 1];
};

// Two Stages:
// Leetcode 132. Palindrome Partitioning II (Cut Rod)
const minCut = s => {
  if (s === undefined) return 0;

  let n = s.length;
  let isPal = [];
  let cuts = new Array(n).fill(0);

  for (let i = 0; i < n; i += 1) {
    isPal.push(new Array(n).fill(false));
    cuts[i] = i; // initial max possible cuts
  }

  for (let end = 0; end < n; end += 1) {
    for (let start = 0; start <= end; start += 1) {
      // Check true case
      if (
        s[end] === s[start] &&
        (end - start <= 1 || isPal[start + 1][end - 1])
      ) {
        isPal[start][end] = true;
        if (start === 0) cuts[end] = 0;
        // prevent cuts[0-1]
        else cuts[end] = Math.min(cuts[end], cuts[start - 1] + 1);
      }
    }
  }

  return cuts[n - 1];
};
/**
 * More Practice
 */
/**
 * Leetcode 96. Unique Binary Search Trees
 * Leetcode 279. Perfect Squares
 * Leetcode 32. Longest Valid Parentheses
 */
