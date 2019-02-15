/**
 * Definition
 * 1. Given 2 strings s and t
 * 2. Compare current or previous characters from two string
 *
 * string1: "abb" -> string2: "ac"
 * 1. delete string1: "ab" -> "ac" (i-1, j)
 * 2. insert string1 aka delete string2: "abbc" -> "ac" = "abb" -> "a" (i, j-1)
 * 3. replace string1: "abc" -> "ac" = "ab" -> "a" (i-1, j-1)
 *
 * Pattern:
 * 1. current char matech (replace string): dp[i][j] = dp[i-1][j-1]
 * 2. delete current char: find previous char state:
 *      a. delete char at string1: dp[i][j] = dp[i-1][j]
 *      b. delete chat at string2: dp[i][j] = dp[i][j-1]
 *
 * Template 2 String
 * 1. Declare stages[m+1][n+1] for s and t (one more space for first empty char)
 * 2. Initialize initial states stage[i][0] = i, stage[0][j] = j
 * 3. Update states base on pattern
 * 4. return stages[m][n]
 *
 * Template string and pattern
 * 1. Declare stages[m+1][n+1] for string and pattern
 * 2. Initialize initial stages:
 *    2.1 stages[0][0] - stage[m][n] =  false
 *    2.2 stages[0][0] = true
 *    2.3 match any char (includes empty) stages[0][j+1] = true (use j as index of pattern)
 * 3. use i and j as index of s and p
 *    3 cases and 2 or 3 sub cases under p[j] === '*'
 * 4. return stages[m][n]
 */

// Leetcode 72. Edit Distance (Find Color)
const minDistance = (word1, word2) => {
  let m = word1.length;
  let n = word2.length;

  let stages = []; // m as stages, n as states
  for (let i = 0; i < m + 1; i += 1) stages.push(new Array(n + 1).fill(0));

  // stages[i][j] = minDistance(word1[:i+1], word2[:j+1]) [Include word1[i] and word2[j]]
  for (let i = 0; i < m + 1; i += 1) {
    stages[i][0] = i;
  }

  for (let j = 0; j < n + 1; j += 1) {
    stages[0][j] = j;
  }

  for (let i = 1; i < m + 1; i += 1) {
    for (let j = 1; j < n + 1; j += 1) {
      let delta = word1[i - 1] === word2[j - 1] ? 0 : 1;
      stages[i][j] = Math.min(
        stages[i - 1][j - 1] + delta, // Replace
        stages[i - 1][j] + 1, // Delete
        stages[i][j - 1] + 1 // Insert
      );
    }
  }

  return stages[m][n];
};

// Lintcode Longest Common Subsequence
/**
Given two strings, find the longest comment subsequence (LCS).

Your code should return the length of LCS.

Example
For "ABCD" and "EDCA", the LCS is "A" (or D or C), return 1

For "ABCD" and "EACB", the LCS is "AC", return 2

Dp[i][j] 表示A序列前i个数，与B的前j个数的LCS长度。
对A的每个位置i，枚举B的每个位置j。
转移方程见代码。
 */
/**
 * @param {stirng} A
 * @param {string} B: Two strings.
 * @return {int} : The length of longest common subsequence of A and B.
 */
const longestCommonSubsequence = (A, B) => {
  let m = A.length;
  let n = B.length;
  let result = [];
  for (let i = 0; i < m + 1; i += 1) {
    result.push(new Array(n + 1).fill(0));
  }

  for (let i = 1; i <= m; i += 1) {
    for (let j = 1; j <= n; j += 1) {
      result[i][j] = Math.max(result[i - 1][j], result[i][j - 1]);
      if (A[i - 1] == B[j - 1]) result[i][j] = result[i - 1][j - 1] + 1;
    }
  }
  return result[m][n];
};

// Leetcode 44. Wildcard Matching
const isMatch = (s, p) => {
  // empty s and p allowed
  if (s === undefined || p === undefined) return false;

  let m = s.length;
  let n = p.length;
  let states = [];
  for (let i = 0; i < m + 1; i += 1) states.push(new Array(n + 1).fill(false));

  states[0][0] = true; // if s[0] matches p[0], copy states[0][0]

  // 3.
  for (let j = 0; j < n; j += 1) {
    if (p[j] === "*") states[0][j + 1] = true;
    else break;
  }

  // 4.
  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // 4.1
      if (p[j] === s[i]) states[i + 1][j + 1] = states[i][j];
      // 4.2
      else if (p[j] === "?") states[i + 1][j + 1] = states[i][j];
      // 4.3
      else if (p[j] === "*") {
        // 4.3.1 "*" as empty char
        // 4.3.2 "*" as one or multiple char
        states[i + 1][j + 1] = states[i + 1][j] || states[i][j + 1];
      }
    }
  }

  return states[m][n];
};

// Leetcode 10. Regular Expression Matching
const isMatch = (s, p) => {
  // empty s and p allowed
  if (s === undefined || p === undefined) return false;

  let m = s.length;
  let n = p.length;
  // Initiate initial states
  let states = [];
  for (let i = 0; i < m + 1; i += 1) {
    states.push(new Array(n + 1).fill(false));
  }

  states[0][0] = true; // if s[0] matches p[0], copy states[0][0]

  // 3.
  for (let j = 0; j < p.length; j += 1) {
    if (p[j] === "*" && states[0][j - 1] === true) states[0][j + 1] = true;
  }

  for (let i = 0; i < m; i += 1) {
    for (let j = 0; j < n; j += 1) {
      // 4.1
      if (p[j] === s[i]) states[i + 1][j + 1] = states[i][j];
      // 4.2
      else if (p[j] === ".") states[i + 1][j + 1] = states[i][j];
      // 4.3
      else if (p[j] === "*") {
        // 4.3.1
        if (p[j - 1] !== s[i] && p[j - 1] !== ".")
          states[i + 1][j + 1] = states[i + 1][j - 1];
        // 4.3.2
        else if (p[j - 1] === s[i] || p[j - 1] === ".") {
          // either 3 sub cases is true, states[i][j] is true
          // a. single prev char: states[i][j-1]
          // b. multiple prev char: states[i-1][j]
          // c. empty current char: states[i][j-2]
          states[i + 1][j + 1] =
            states[i + 1][j] || states[i][j + 1] || states[i + 1][j - 1];
        }
      }
    }
  }

  return states[m][n];
};
