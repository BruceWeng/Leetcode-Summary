/**
 * Definition:
 * SegmentTreeNode(start, end, val, left, right) { (start and end inclusive)
 *   this.start = start;
 *   this.end = end;
 *   this.sum = val; // can be max/min
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 1. node.start be start of range and node.end be end of range (inclusive)
 * 2. this.sum or max/min depends on what the question looking for
 * 3. this.start === this.end for all the leaves
 * 4. all the num store in leave nodes
 * 
 * Basic Operation:
 * 1. build(start, end, nums): O(n)
 * 2. update(root, index, val): O(logn), need index to find proper leaf node
 * 3. rangeQuery(root, start, end): O(logn + k), k depends on the segment nodes visited
 */
function SegmentTreeNode(start, end, val) {
  this.start = start;
  this.end = end;
  this.sum = val;
  this.left = null;
  this.right = null;
}

// 1. build(start, end, nums)
const build = (start, end, nums) => {
  if (start === end) return new SegmentTreeNode(start, end, nums[start]);
  let root = new SegmentTreeNode(start, end, 0);

  let mid = start + Math.trunc((end - start) / 2);
  // Topdowm process
  root.left = this.build(start, mid, nums); // end = mid (boundary inclusive)
  root.right = this.build(mid+1, end, nums);

  // Bottomup process (curr.sum = left.sum + right.sum)
  root.sum = root.left.sum + root.right.sum;
  return root;
};

// 2. update(root, index, val)
const update = (root, index, val) => {
  if (root.start === root.end && root.start === index) {
    root.sum = val;
    return;
  }

  let mid = root.start + Math.trunc((root.end - root.start) / 2);
  // Topdown process
  if (index <= mid) update(root.left, index, val);
  else update(root.right, index, val);

  // Bottomup process: Update sum for each node
  root.sum = root.left.sum + root.right.sum;
};

// 3. rangeQuery(root, start, end)
const rangeQuery = (root, start, end) => {
  // leaf node and inner nodes happen to match the range
  if (root.start === start && root.end === end) return root.sum;

  let mid = root.start + Math.trunc((root.end - root.start) / 2);
  // Topdown process
  if (end <= mid) return rangeQuery(root.left, start, end);
  else if (start > mid) return rangeQuery(root.right, start, end);
  
  // Bottomup process: rangeSum = left rangeSum(start, mid) + right rangeSum(mid+1, end)
  else return rangeQuery(root.left, start, mid) + rangeQuery(root.right, mid+1, end);
};

/**
 * Leetcode 307. Range Sum Query - Mutable
 */
/**
Given an integer array nums, find the sum of the elements between indices i and j (i ≤ j), inclusive.

The update(i, val) function modifies nums by updating the element at index i to val.

Example:

Given nums = [1, 3, 5]

sumRange(0, 2) -> 9
update(1, 2)
sumRange(0, 2) -> 8
Note:

The array is only modifiable by the update function.
You may assume the number of calls to update and sumRange function is distributed evenly.
 */
function SegmentTreeNode(start, end, val) {
  this.start = start;
  this.end = end;
  this.sum = val;
  this.left = null;
  this.right = null;
}

class NumArray {
  constructor(nums) {
    this.nums = nums;
    this.root = nums.length === 0 ? null : this.build(0, nums.length - 1, nums);
  }

  build(start, end, nums) {
    if (start === end) return new SegmentTreeNode(start, end, nums[start]);
    let root = new SegmentTreeNode(start, end, 0);

    let mid = start + Math.trunc((end - start) / 2);
    // Topdowm process
    root.left = this.build(start, mid, nums); // end = mid (boundary inclusive)
    root.right = this.build(mid+1, end, nums);
  
    // Bottomup process (curr.sum = left.sum + right.sum)
    root.sum = root.left.sum + root.right.sum;
    return root;
  }

  update(i, val) {
    return this.updateNode(this.root, i, val);
  }
  
  updateNode(root, i, val) {
    if (root.start === root.end && root.start === i) {
      root.sum = val;
      return;
    }
  
    let mid = root.start + Math.trunc((root.end - root.start) / 2);
    // Topdown process
    if (i <= mid) this.updateNode(root.left, i, val);
    else this.updateNode(root.right, i, val);
  
    // Bottomup process: Update sum for each node
    root.sum = root.left.sum + root.right.sum;
  }

  sumRange(i, j) {
    return this.rangeQuery(this.root, i, j);
  }

  rangeQuery(root, start, end) {
    // leaf node and inner nodes happen to match the range
    if (root.start === start && root.end === end) return root.sum;

    let mid = root.start + Math.trunc((root.end - root.start) / 2);
    // Topdown process
    if (end <= mid) return this.rangeQuery(root.left, start, end);
    else if (start > mid) return this.rangeQuery(root.right, start, end);
    
    // Bottomup process: rangeSum = left rangeSum(start, mid) + right rangeSum(mid+1, end)
    else return this.rangeQuery(root.left, start, mid) + this.rangeQuery(root.right, mid+1, end);
  }
}