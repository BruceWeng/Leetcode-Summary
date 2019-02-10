/**
 * Definition
 * Find Matched substring between string and pattern
 * 
 * Template (Base on Leetcod 438.)
 * 1. Declare result or result[] to store answer
 * 2. Use hashmap to store characters of the target substring
 *    key: char, value: frequency of characters
 * 3. Maintain a counter to check whether match the target string
 *    (counter is map.size)
 * 4. Use two pointers start = 0, end = 0 as window boundary
 * 5. Use length = max_integer || 0 as the length of substring which match the target string
 * 6. Interate from end < s.length
 *    6.1 if map.has(s[end]):
 *          update map[s[end]] (frequency += 1 or -= 1) base on requirement
 *          if (map.get(s[end]) === 0): // map size decrease
 *            counter -= 1
 *    6.2 end += 1
 *    6.3 Increase start to make substring invalid/valid again
 *        while (counter === 0): // condition depends on requirement
 *          if map.has(s[start]):
 *            update map[s[start]] (frequency += 1 or -= 1) base on requirement
 *            if (map.get(s[start]) > 0): // map size increase
 *              counter += 1
 *        6.3.1 save/update (min/max) of result if find the target
 *        6.3.2 start += 1
 * 7. return result
 */
const slidingWindow = (s, t) => {
  let result = [];
  if (t.length > s.length) return result;

  let map = new Map();
  for (let char of p) {
    if (map.get(char) === undefined) map.set(char, 1);
    else map.set(char, map.get(char) + 1);
  }

  let counter = map.size;
  let start = 0;
  let end = 0;
  let length = Number.MAX_SAFE_INTEGER || 0;

  while (end < s.length) {
    if (map.has(s[end])) {
      map.set(s[end], map.get(s[end]) + 1 || - 1);
      if (map.get(s[end]) === 0) counter -= 1;
    }
    end += 1;

    while (counter === 0 /* condition may be different */) {
      if (map.has(s[start])) {
        map.set(s[start], map.get(s[start]) + 1 || - 1);
        if (map.get(s[start]) > 0) counter += 1;
      }

      // update result if target found
      start += 1;
    }
  }
  return result;
};
/**
 * Leetcode 438. Find All Anagrams in a String
 * Leetcode 76. Minimum Window Substring
 * Leetcode 3. Longest Substring Without Repeating Characters
 * Leetcode 30. Substring with Concatenation of all Words
 * Leetcode 159. Longest Substring with at most Two Distinct Characters
 * Leetcode 340. Longest Substring with At Most K Distinct Characters
 * Leetcode 395. Longest Substring with At Least K Repeating Characters
 */

 // Pointers
 /**
  * One Pointer:
  *   283. Move Zeroes
  *   169. Majority Element
  *   27. Remove Element
  *   26. Remove Duplicates from Sorted Array
  *   80. Remove Duplicates from Sorted Array II
  *   163. Missing Ranges
  *   228. Summary Ranges
  * 
  * Two Pointers:
  *   344. Reverse String
  *   229. Majority Element II
  *   345. Reverse Vowels of a String
  *   151. Reverse Words in a String
  *   657. Robot Return to Origin (Judge Route Circle)
  *   334. Increasing Triplet Subsequence
  * 
  * Multiple Pointers:
  *   55. Jump Game
  *   134. Gas Station
  *   209. Minimum Size Subarray Sum
  *   214. Shortest Palindrome
  *   243. Shortest Word Distance
  *   245. Shortest Word Distance III
  *   581. Shortest Unsorted Continuous Subarray
  */