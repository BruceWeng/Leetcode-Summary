/**
 * 1. Provide More Information
 * We need more information rather than only the key. 
 * We can build a mapping relationship between key and information by hash map.
 * 
 * Template
 * ReturnType hashMap(Type[] keys) {
 *   // Replace Type and InfoType with actual type of your key and value
 *   let map = new Map<Type, InfoType>();
 *   for (key of keys):
 *     if (map.has(key)):
 *       if (map.get(key) satisfies the requirement):
 *         return needed_information
 *     // Value can be any information you needed (e.g. index)
 *     map.set(key, val);
 *   return needed_information;
 * }
 * 
 * 2. Aggregate by Key
 * The key to solving this kind of problem is to decide your strategy 
 * when you encounter an existing key.
 * 
 * How to update the val with existing key?
 * 
 * Template
 * ReturnType aggregateByKey_hashmap(Type[] keys) {
 *   // Replace Type and InfoType with actual type of your key and value
 *   let map = new Map<Type, InfoType>();
 *   for (key of keys):
 *     if (map.has(key)):
 *       map.set(key, updated_information);
 *     // Value can be any information you needed (e.g. index)
 *     map.set(key, val);    
 *   return needed_information;
 * }
 * 
 * 3. Desgin a Key (Thinking about groups)
 * Designing a key is to build a mapping relationship by yourself between 
 * the original information and the actual key used by hash map. 
 * When you design a key, you need to guarantee that:
 * 
 * 1. All values belong to the same group will be mapped in the same group.
 * 2. Values which needed to be separated into different groups will not be mapped into the same group.
 * 
 * This process is similar to design a hash function, but here is an essential difference. 
 * A hash function satisfies the first rule but might not satisfy the second one. 
 * But your mapping function should satisfy both of them.
 * 
 * Template
 * A. When the order of each element in the string/array doesn't matter, 
 *    we can use the sorted string/array as the key.
 * 
 * B. If we only care about the offset of each value, usually the offset from the first value, 
 *    we can use the offset as the key.
 * 
 * C. In a tree, we might want to directly use the TreeNode as key sometimes. 
 *    But in most cases, the serialization of the subtree might be a better idea.
 * 
 * D. In a matrix, we might want to use the row index or the column index as key.
 * 
 * E. In a Sudoku, we can combine the row index and the column index to identify which block this element belongs to.
 *    (i, j) => (i / 3) * 3 + j / 3
 * 
 * F. Sometimes, in a matrix, we might want to aggregate the values in the same diagonal line.
 *                             ^
 *    1. Anti-Diagonal Order (/ ): (i, j) => i + j
 *                      \
 *    2. Diagonal Order( v): (i, j) => i - j 
 * 
 * Thinking process:
 * 1. Original Information
 * 2. Customized Mapping Function
 * 3. Designed key
 *  3.a Find Duplicated: Set
 *  3.b Group by Key: Map
 */

// 1. Provide More Information
  // 1.a Array
  /**
   * Leetcode 1. Two Sum
   * Leetcode 599. Minimum Index Sum of Two Lists
   * Leetcode 170. Two Sum III - Data structure design
   * Leetcode 219. Contains Duplicate II
   */
  // 1.b String
  /**
   * Leetcode 205. Isomorphic Strings
   * Leetcode 290. Word Pattern
   */

// 2. Aggregate by Key
  // 2.a Array
  /**
   * Leetcode 350. Intersection of Two Arrays II
   * Leetcode 219. Contains Duplicate II
   * Leetcode 169. Majority Element
   * Leetcode 347. Top K Frequent Elements
   * Leetcode 244. Shortest Word Distance II
   */
  // 2.b String
  /**
   * Leetcode 387. First Unique Character in a String
   * Leetcode 242. Valid Anagram
   */

// 3. Desgin a Key (Thinking about groups)
  // 3.a Array
  /**
   * Leetcode 49. Group Anagrams
   * Leetcode 249. Group Shifted Strings
   * Leetcode 760. Find Anagram Mappings
   * Leetcode 560. Subarray Sum Equals K
   * Leetcode 325. Maximum Size Subarray Sum Equals k
   * Leetcode 454. 4Sum II
   * Leetcode 447. Number of Boomerangs
   * Leetcode 128. Longest Consecutive Sequence
   * Leetcode 506. Relative Ranks
   */
  // 3.b String
  /**
   * Leetcode 500. Keyboard Row
   * Leetcode 13. Roman to Integer
   * Leetcode 12. Integer to Roman
   */
  // 3.c Tree
  /**
   * Leetcode 652. Find Duplicate Subtrees
   * Leetcode 314. Binary Tree Vertical Order Traversal
   */
  // 3.d Matrix
  /**
   * Leetcode 36. Valid Sudoku
   * Leetcode 37. Sudoku Solver
   */
  // 3.e Design
  /**
   * Leetcode 359. Logger Rate Limiter
   * Leetcode 355. Design Twitter
   * Leetcode 288. Unique Word Abbreviation
   * Leetcode 380. Insert Delete GetRandom O(1)
   * Leetcode 381. Insert Delete GetRandom O(1) - Duplicates allowed
   */

// 4. With Other Data Structure
  // 4.a Stack
  /**
   * Leetcode 316. Remove Duplicate Letters
   */
  // 4.b Two Pointers
  /**
   * Leetcode 246. Strobogrammatic Number
   * Leetcode 299. Bulls and Cows
   */
  // 4.c Recursion
  /**
   * Leetcode 247. Strobogrammatic Number II
   */
  // 4.d Substring
  /**
   * Leetcode 187. Repeated DNA Sequences
   * Leetcode 294. Flip Game II
   * Leetcode 336. Palindrome Pairs
   */
  // 4.e Set
  /**
   * Leetcode 266. Palindrome Permutation
   * Leetcode 409. Longest Palindrome
   * Leetcode 771. Jewels and Stones
   * Leetcode 357. Count Numbers with Unique Digits
   */
  // 4.f DP Memoization
  /**
   * HashMap & Substring:
   *   Leetcode 87. Scramble String
   *   Leetcode 241. Different Ways to Add Parentheses
   * HashMap & HashSet & Substring:
   *   Leetcode 140. Word Break II
   * HashMap & Tree:
   *   Leetcode 337. House Robber III
   */