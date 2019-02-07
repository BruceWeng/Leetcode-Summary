/**
 * Reservoir Sampling
 * Proof:
 * Let i be index in range [0...j] and each probability is 1/(1+j)
 * To change number from index j to index i:
 * Select j:
 * 1. if i === j, no need to change its position: P: 1/(1+j)
 * 2. if i !== j (P: j/(j+1) ), choose another value in range [0...j-1] (P: 1/j )
 *    Total: P: (j/j+1) * (1/j) = 1/(j+1)
 * Each value has equal probability at any position
 */
/**
 * Steps:
 * 1. Iterate the nums that index j in range[1, nums.length), (exclude nums.length)
 * 2. let i index in range[0...j] randomly (include j), each possibility is 1/(i+j)
 * 3. swap(nums, i, j)
 */
const shuffle = (nums) => {
  if (nums === undefined) return;
  
  for (let j = 1; j < nums.length; j += 1) {
    let i = Math.trunc(Math.random() * (j+1));
    swap(nums, i, j);
  }

  return nums;
};

const swap = (nums, i, j) => {
  let temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}

/**
 * Leetcode 384. Shuffle An Array
 * Leetcode 398. Random Pick Index
 * Leetcode 215. Kth Largest Element in an Array
 */