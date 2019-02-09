/**
 * Definition:
 * TreeNode(val) {
 *   this.val = val;
 *   this.left = null;
 *   this.right = null;
 * }
 * 
 * 1. node.val must >= any values in left subtree
 * 2. node.val must <= any values in right subtree
 * 
 * Basic Operation:
 * 1. Search
 * 1.a Recursion
 * 1.b iteration
 * 2. Insertion
 * 3. Deletion
 * Replace the target node with a proper child
 *   a. if the target node has no child, we can simply remove the node
 *   b. if the target node has one child, we can use its child to replace itself
 *   c. if the target node has two children, replace the node with its in-order successor node and delete that node
 */

// 1.a Search Recursion
const searchBST = (root, target) => {
  if (root === null || root.val === target) return root;

  if (target < root.val) return searchBST(root.left, target);
  else searchBST(root.right, target);
};

// 1.b Search Iteration
const searchBST = (root, target) => {
  let curr = root;
  while (curr !== null && curr.val !== target) {
    if (target < curr.val) curr = curr.left;
    else curr = curr.right;
  }

  return curr;
};

// 2. Insertion Recursion
const insertIntoBST = (root, val) => {
  // return a new node if root is null
  if (root === null) return new TreeNode(val);

  // insert to the right subtree
  if (root.val < val) root.right = insertIntoBST(root.right, val);
  // insert to the left subtree
  else root.left = insertIntoBST(root.left, val);

  return root;
};

// 3. Deletion Recursion
/**
 * Helper function for finding successor
 * in BST, successor of root is the leftmost child in the root's right subtree
 */
const findSuccessor = (root) => {
  let curr = root.right;
  while (curr !== null && curr.left !== null) curr = curr.left;

  return curr;
};

const deleteNode = (root, key) => {
  if (root === null) return root;

  // delete current node if root is the target node
  if (root.val === key) {
    // replace root with root.right if root.left is null
    if (root.left === null) return root.right;

    // replace toot with root.left if root.right is null
    if (root.right === null) return root.left;

    // replace root with its successor if root has two children
    let succ = findSuccessor(root);
    root.val = succ.val;
    root.right = deleteNode(root.right, succ.val);
    return root;
  }

  // find target in right subtree if root.val < key
  if (root.val < key) root.right = deleteNode(root.right, key);
  // find target in left subtree if root.val > key
  else root.left = deleteNode(root.left, key);

  return root;
};

/**
 * Leetcode 703. Kth Largest Element in a Stream
 */
/**
Design a class to find the kth largest element in a stream. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Your KthLargest class will have a constructor which accepts an integer k and an integer array nums, which contains initial elements from the stream. For each call to the method KthLargest.add, return the element representing the kth largest element in the stream.

Example:

int k = 3;
int[] arr = [4,5,8,2];
KthLargest kthLargest = new KthLargest(3, arr);
kthLargest.add(3);   // returns 4
kthLargest.add(5);   // returns 5
kthLargest.add(10);  // returns 5
kthLargest.add(9);   // returns 8
kthLargest.add(4);   // returns 8
Note: 
You may assume that nums' length ≥ k-1 and k ≥ 1.
 */
/**
 * Strategy:
 * Insertion:
 * For each node, we store count as how many nodes(itself and children) in the subtree
 * Search:
 * let m be size of right subtree
 * 1. root is the m+1 largest node, if k === m+1: return root.val
 * 2. if k <= m: find kth largest node in the right subtree
 * 3. else: find (k-m-1)th largest node in the left subtree
 */
function Node(val, count) {
  this.val = val;
  this.count = count;
  this.left = null;
  this.right = null;
}

class KthLargest {
  constructor(k, nums) {
    this.root = null;
    this.m_k = k;
    for (let i = 0; i < nums.length; i += 1) {
      this.root = this.insertNode(this.root, nums[i]);
    }
  }

  add(val) {
    this.root = this.insertNode(this.root, val);
    return this.searchKth(this.root, this.m_k);
  }

  insertNode(root, num) {
    if (root === null) return new Node(num, 1);

    if (root.val < num) root.right = this.insertNode(root.right, num);
    else root.left = this.insertNode(root.left, num);

    root.count += 1;
    return root;
  }

  searchKth(root, k) {
    // let m = the size of right subtree
    let m = root.right !== null ? root.right.count : 0;

    // root is the m+1 largest node in the BST
    if (k === m+1) return root.val;

    // find kth largest node in the right subtree
    if (k <= m) return this.searchKth(root.right, k);
    // find (k-m-1)th largest in the left subtree
    return this.searchKth(root.left, k - m - 1);
  }
}

/**
 * Leetcode 449. Serialize and Deserialize BST
 */