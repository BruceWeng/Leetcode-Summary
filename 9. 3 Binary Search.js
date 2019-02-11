/**
 * Definition
 * Search target in range in O(nlogn) time
 */
// Template 1
// Search Single target, no comparison
// [start, end]
// start <= end
// start = mid + 1
// end = mid - 1
const binarySearch1 = (nums, target) => {
  if (nums === undefined || nums.length === 0) return -1;

  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    let mid = start + Math.trunc((end - start) / 2);
    if (nums[mid] === target) return mid;
    else if (nums[mid] < target) start = mid + 1;
    else end = mid - 1;
  }

  // End condition: start > end
  return -1;
};

/**
 * Leetcode 704. Binary Search
 * Leetcode 69. Sqrt(x)
 * Leetcode 374. Guess Number Higher or Lower
 * Leetcode 33. Search in Rotated Sorted Array
 */

// Template 2
// Use element's right neighbor to determine if condition is 
// met and decide whether to go left or right
// [start, end)
// start < end
// start = mid + 1
// end = mid
const binarySearch2 = (nums, target) => {
  if (nums === undefined || nums.length === 0) return -1;

  let start = 0;
  let end = nums.length;
  while (start < end) {
    let mid = start + Math.trunc((end - start) / 2);
    if (nums[mid] === target) return nums[mid];
    else if (nums[mid] < target) start = mid + 1;
    else end = mid;
  }

  // Post Processing
  // End condition: start === end
  if (start !== nums.length && nums[start] === target) return nums[start];
  return -1;
};

/**
* Leetcode 278. First Bad Version
* Leetcode 162. Find Peak Element
* Leetcode 154. Find Minimum in Rotated Sorted Array II
*/

// Template 3
// Use element's neighbors(left and right) to determine if condition is 
// met and decide whether to go left or right
// [start, end]
// start + 1 < end
// start = mid
// end = mid
const binarySearch3 = (nums, target) => {
  if (nums === undefined || nums.length === 0) return -1;

  let start = 0;
  let end = nums.length - 1;
  while (start + 1 < end) {
    let mid = start + Math.trunc((end - start) / 2);
    if (nums[mid] === target) return nums[mid];
    else if (nums[mid] < target) start = mid;
    else end = mid;
  }

  // Post processing
  // End condition: start + 1 === end
  if (nums[start] === target) return nums[start];
  if (nums[end] === target) return nums[end];
  return -1;
};

/**
 * Leetcode 34. Find First and Last Position of Element in Sorted Array
 * Leetcode 658. Find K Closest Elements
 * Leetcode 162. Find Peak Element
 */

 /**
  * More Practice
  */
 /**
  * Leetcode 270. Closest Binary Search Tree Value
  * Leetcode 702. Search in a Sorted Array of Unknown Size
  * Leetcode 50. Pow(x, n)
  * Leetcode 367. Valid Perfect Square
  * Leetcode 744. Find Smallest Letter Greater Than Target
  * Leetcode 153. Find Minimum in Rotated Sorted Array
  * Leetcode 154. Find Minimum in Rotated Sorted Array II
  * Leetcode 349. Intersection of Two Arrays
  * Leetcode 350. Intersection of Two Arrays II
  * Leetcode 167. Two Sum II - Input array is sorted
  * Leetcode 287. Find the Duplicate Number
  * Leetcode 4. Median of Two Sorted Arrays
  * Leetcode 719. Find K-th Smallest Pair Distance
  * Leetcode 410. Split Array Largest Sum
  * Leetcode 74. Search a 2D Matrix
  * Leetcode 240. Search a 2D Matrix II
  * Leetcode 378. Kth Smallest Element in a Sorted Matrix
  */