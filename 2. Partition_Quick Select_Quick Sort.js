/**
 * A. Partition
 * Definition
 * Partition function receive pivot index and move 
 * 1. ascending
 * all elements less than nums[pivot] to the left and
 * all elements great than nums[pivot] to the right
 * 2. descending
 * all elements less than nums[pivot] to the right and
 * all elements great than nums[pivot] to the left
 * 
 * partition(nums, pivot, start, end): partitionIndex
 * 1. start and end are partition boundary (inclusive)
 * 2. function receive pivot index, patition the nums and return new partition index of pivot value
 * 
 * Template:
 * 1. let pivotValue = nums[pivot]
 * 2. let partitionIndex = start
 * 3. Iterate nums from start to end (exclusive)
 *      a. ascending: 
 *         if nums[i] < pivotValue:
 *           move nums[i] to partitionIndex by swap(nums, i, partitionIndex)
 *           partitionIndex += 1
 *         swap(nums, end, partitionIndex)
 *      b. descending:
 *         if nums[i] > pivotValue:
 *           move nums[i] to partitionIndex by swap(nums, i, partitionIndex)
 *           partitionIndex += 1
 *         swap(nums, end, partitionIndex)
 *    
 * 4. return parititonIndex
 * 
 * B. Quick Select
 * Definition
 * Use partition to find kth element in nums in O(n) in average by shuffle the nums first
 * Worst case O(n^2) if the nums is sorted by default
 * 
 * quickSelect(nums, k): kth element
 * Template:
 * 1. if k > nums.length: return;
 * 2. let start = 0 and end = nums.length - 1
 * 3. Use a infinite while(true):
 *      3.a. let pivot = end
 *      3.b. let partitionIndex = partition(nums, pivot, start, end)
 *      3.c. Do binary search to find the interval contains kth element
 *          3.c.1 if partitionIndex === k-1: 
 *                  return nums[partitionIndex]
 *          3.c.2 else if partitionIndex > k-1: kth element in left interval
 *                  end = partitionIndex - 1
 *          3.c.3 else if partitionIndex < k-1: (kth element in right interval)
 *                  start = partitionIndex + 1
 * 
 * C. Quick Sort
 * Use partiion to sort nums in O(nlogn) in average
 * Worst case O(n^2) if selected pivot is not partitioned or sorted by default
 * 
 * quickSort(nums)
 * Template:
 * 1. if nums.length < 2: return nums // nums of length = 0 or 1 are sorted by default
 * 2. return sortHelper(nums, 0, nums.length-1)
 * 
 * 3. sortHelper(nums, start, end):
 *   if (start < end):
 *     3.a let pivot = end
 *     3.b let partitionIndex = partition(nums, pivot, start, end);
 *     3.c Recursively call left and right interval
 *         3.c.1 sortHelper(nums, start, partitionIndex-1)
 *         3.c.2 sortHelper(nums, partitionIndex+1, end)
 * 4. return nums
 */
// A.
const partition = (nums, start, end) => {
  let pivotValue = nums[end];
  let partitionIndex = start;
  for (let i = start; i <= end; i += 1) {
    if (nums[i] < pivotValue) {
      swap(nums, i, partitionIndex);
      partitionIndex += 1;
    }
  }
  swap(nums, end, partitionIndex);
  return partitionIndex;
};

const swap = (nums, i, j) => {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
};

// B.
const quickSelect = (nums, k) => {
  if (k > nums.length) return;

  return kthSmallest(nums, k - 1, 0, nums.length - 1);
  // pass index of nums, kth position(k-1) in

  function kthSmallest(nums, k, start, end) {
    let partitionIndex = partition(nums, start, end);
    if (partitionIndex === k) return nums[partitionIndex];
    else if (partitionIndex < k) return kthSmallest(nums, k, partitionIndex + 1, end);
    else return kthSmallest(nums, k, start, partitionIndex - 1);
  }
};

// C.
const quickSort = (nums) => {
  if (nums.length < 2) return nums;
  return sortHelper(nums, 0, nums.length - 1);
};

const sortHelper = (nums, start, end) => {
  if (start < end) {
    let partitionIndex = partition(nums, start, end);

    sortHelper(nums, start, partitionIndex - 1);
    sortHelper(nums, partitionIndex + 1, end);
  }

  return nums;
};
/**
 * Leetcode 915. Partition Array into Disjoint Intervals
 */

console.log(quickSelect([8, 5, 3, 7, 2], 4)); // 7
console.log(quickSelect([8, 5, 3, 7, 2])); // [ 2, 3, 5, 7, 8 ]

/**
 * 2019/11/26 Revisit
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  if (k > nums.length) return 0;
  // kth largest element will be in k-1 index of the array
  return kthLargest(k, 0, nums.length - 1);

  function kthLargest(k, start, end) {
    let pivotIndex = partition(start, end);

    if (pivotIndex === k - 1) return nums[k - 1];
    if (pivotIndex > k - 1) return kthLargest(k, start, pivotIndex - 1);
    else return kthLargest(k, pivotIndex + 1, end);
  }

  function partition(start, end) {
    let pivotIndex = start + Math.floor(Math.random() * (end - start + 1));
    swap(pivotIndex, end);

    let pivotValue = nums[end];
    let locationToSwap = start;
    for (let i = start; i <= end; i += 1) {
      if (nums[i] > pivotValue) {
        swap(i, locationToSwap);
        locationToSwap += 1;
      }
    }
    swap(end, locationToSwap);
    return locationToSwap;
  }

  function swap(i, j) {
    [nums[i], nums[j]] = [nums[j], nums[i]];
  }
};