/**
 * A. Merge
 * Definition
 * Merge two nums in ascending order, nums are not need to be sorted
 * m: length of nums1
 * n: length o nums2
 * T: O(m+n), S:O(m+n)
 * 
 * merge(nums1, nums2): merged array
 * Template:
 * 1. let merged = []
 * 2. let ptr1, ptr2 = 0
 * 3. while i < nums1.length && j < nums2.length:
 *      3.1 push the smaller element in merged array
 *      3.2 increment the ptr
 * 4. push the remaining elements in nums1 or nums2
 *    merged.push(...nums1.slice(ptr1), ...nums2.slice(ptr2))
 * 5. return merged
 * 
 * B. Merge Sort
 * Definition
 * Use merge to sort nums in O(nlong) time and O(n) space
 * 
 * mergeSort(nums): sorted nums
 * Template:
 * 1. if nums.length < 2: return nums // nums of length = 0 or 1 are sorted by default
 * 2. Slice left half nums and put it in mergeSort(nums.slice(0, mid))
 * 3. Slice right half nums and put it in mergeSort(nums.slice(mid))
 * 4. return merge(mergeSort(left half), mergeSort(right half))
 */
// A. 
const merge = (nums1, nums2) => {
  let merged = [];
  let ptr1 = 0;
  let ptr2 = 0;
  while (ptr1 < nums1.length && ptr2 < nums2.length) {
    if (nums1[ptr1] < nums2[ptr2]) merged.push(nums1[ptr1++]);
    else merged.push(nums2[ptr2++]);
  }
  
  merged.push(...nums1.slice(ptr1), ...nums2.slice(ptr2));
  return merged;
};

// B.
const mergeSort = (nums) => {
  if (nums.length < 2) return nums;
  let mid = Math.trunc(nums.length / 2);
  return merge(mergeSort(nums.slice(0, mid)), mergeSort(nums.slice(mid)));
};

/**
 * Leetcode 88. Merge Sorted Array
 * Leetcode 21. Merge Two Sorted Lists
 * Leetcode 23. Merge k Sorted Lists
 */