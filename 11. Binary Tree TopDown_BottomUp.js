/**
 * Definition
 * Binary Tree contains recursive property itself.
 */
// 1. Traverse A Tree
//    1.a Pre-order
//    1.b In-order
//    1.c Post-order
//    1.d Level-order
/**
 * 1.a Pre-order
 */
// Recursive solution
const preorder = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  preorderHelper(root, result);
  return result;
};

const preorderHelper = (root, result) => {
  if (root === null) return;

  result.push(root.val); // visit the root
  preorderHelper(root.left, result); // traverse left subtree
  preorderHelper(root.right, result); // traverse right subtree 
};

// Iterative solution
function Command(action, node) {
  return {
    action, // 0: visit, 1: push to result
    node
  }
}

const preorderIter = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  let stack = [new Command(0, root)];
  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.action === 1) {
      result.push(curr.node.val);
      continue;
    }

    // Put next action for nodes in reversed order
    // (1. Push curr node, 2. Visit left node, 3. Visit right node)
    if (curr.node.right !== null) stack.push(new Command(0, curr.node.right));
    if (curr.node.left !== null) stack.push(new Command(0, curr.node.left));
    stack.push(new Command(1, curr.node));
  }

  return result;
};

/**
 * 1.b In-order
 */
// Recursive solution
const inorder = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  inorderHelper(root, result);
  return result;
};

const inorderHelper = (root, result) => {
  if (root === null) return;

  inorderHelper(root.left, result); // traverse left subtree
  result.push(root.val); // visit the root
  inorderHelper(root.right, result); // traverse right subtree 
};

// Iterative solution
function Command(action, node) {
  return {
    action, // 0: visit, 1: push to result
    node
  }
}

const inorderIter = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  let stack = [new Command(0, root)];
  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.action === 1) {
      result.push(curr.node.val);
      continue;
    }

    // Put next action for nodes in reversed order
    // (1. Visit left node, 2. Push curr node, 3. Visit right node)
    if (curr.node.right !== null) stack.push(new Command(0, curr.node.right));
    stack.push(new Command(1, curr.node));
    if (curr.node.left !== null) stack.push(new Command(0, curr.node.left));
  }

  return result;
};

/**
 * 1.c Post-order
 */
// Recursive solution
const postorder = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  postorderHelper(root, result);
  return result;
};

const postorderHelper = (root, result) => {
  if (root === null) return;

  postorderHelper(root.left, result); // traverse left subtree
  postorderHelper(root.right, result); // traverse right subtree 
  result.push(root.val); // visit the root
};

// Iterative solution
function Command(action, node) {
  return {
    action, // 0: visit, 1: push to result
    node
  }
}

const postorderIter = (root) => {
  if (root === undefined || root === null) return [];
  let result = [];
  let stack = [new Command(0, root)];
  while (stack.length !== 0) {
    let curr = stack.pop();

    if (curr.action === 1) {
      result.push(curr.node.val);
      continue;
    }

    // Put next action for nodes in reversed order
    // (1. Visit left node, 2. Visit right node, 3. Push curr node)
    stack.push(new Command(1, curr.node));
    if (curr.node.right !== null) stack.push(new Command(0, curr.node.right));
    if (curr.node.left !== null) stack.push(new Command(0, curr.node.left));
  }

  return result;
};

/**
 * 1.d Level-order
 */
// Using Queue
const levelorder = (root) => {
  let result = [];
  let queue = [];
  if (root !== null) queue.push(root);

  while (queue.length !== 0) {
    let size = queue.length;
    let subAns = [];
    for (let i = 0; i < size; i += 1) { // traverse nodes in the same level
      let curr = queue.shift();
      subAns.push(curr.val); // visit the root
      if (curr.left !== null) queue.push(curr.left); // push left child to queue if it is not null
      if (curr.right !== null) queue.push(curr.right); // push right child to queue if it is not null
    }
    result.push(subAns);
  }
  return result;
};

/**
 * Leetcode 102. Binary Tree Level Order Traversal
 * Leetcode 226. Invert Binary Tree
 * Leetcode 111. Minimum Depth of Binary Tree
 */

 // 2. Solve Tree Problems Recursively
 //  2.a Top-Down solution
 //  2.b Bottom-Up solution
 
 /**
  * 2.a Top-Down solution (preorder)
  * Template
  * 1. return specific value for null node
  * 2. update the answer if needed                      // answer <-- params
  * 3. left_ans = top_down(root.left, left_params)      // left_params <-- root.val, params
  * 4. right_ans = top_down(root.right, right_params)   // right_params <-- root.val, params 
  * 5. return the answer if needed                      // answer <-- left_ans, right_ans. 
  */
// Leetcode 104. Maximum Depth of Binary Tree
const maxDepth = (root) => {
  let result = 0; // depth
  
  const maxDepthHelper = (root, level) => {
    // 1. return if root is null
    // 2. if root is a lead node: answer = max(answer, depth) // update the answer if needed
    // 3. maximum_depth(root.left, depth + 1) // call the function recursively for left child
    // 4. maximum_depth(root.right, depth + 1) // call the function recursively for right child
    if (root === null) return;

    result = Math.max(result, level);

    maxDepthHelper(root.left, level + 1);
    maxDepthHelper(root.right, level + 1);
  };
  
  maxDepthHelper(root, 1);
  return result;
};

/**
 * 2.b Bottom-Up solution (postorder)
 * Template
 * 1. return specific value for null node
 * 2. left_ans = bottom_up(root.left)          // call function recursively for left child
 * 3. right_ans = bottom_up(root.right)        // call function recursively for right child
 * 4. return answers                           // answer <-- left_ans, right_ans, root.val
 */
// Leetcode 104. Maximum Depth of Binary Tree
const maxDepth = (root) => {
  // 1. return 0 if root is null                 // return 0 for null node
  // 2. left_depth = maximum_depth(root.left)
  // 3. right_depth = maximum_depth(root.right)
  // 4. return max(left_depth, right_depth) + 1  // return depth of the subtree rooted at root
  if (root === null) return 0;

  let leftDepth = maxDepth(root.left);
  let rightDepth = maxDepth(root.right);
  return Math.max(leftDepth, rightDepth) + 1;
};

/**
 * Tree Problem Conclusion:
 * 1. Can I determine some params to help the node answer of itself?
 * 2. Can I use these params and the valud of the node itself to determine 
 *    what should be the parameters parsing to its children?
 * 3. If 1. and 2. are Yes:
 *    Top-Down solution
 * 
 * 1. For a node in a tree, if I know the answer of its children, 
 *    can I calculate the answer of the node?
 * 2. If Yes:
 *    Bottom-Up solution
 */
/**
 * More Practice
 * Leetcode 101. Symmetric Tree
 * Leetcode 112. Path Sum
 * Leetcode 250. Count Univalue Subtrees
 * Leetcode 257. Binary Tree Paths
 * Leetcode 110. Balanced Binary Tree
 * Leetcode 98. Validate Binary Search Tree
 * 
 * Leetcode 235. Lowest Common Ancestor of a Binary Search Tree
 * Leetcode 236. Lowest Common Ancestor of a Binary Tree(LCA)
 * Leetcode 298. Binary Tree Longest Consecutive Sequence
 * Leetcode 106. Construct Binary Tree from Inorder and Postorder Traversal
 * Leetcode 105. Construct Binary Tree from Preorder and Inorder Traversal
 * Leetcode 889. Construct Binary Tree from Preorder and Postorder Traversal
 * Leetcode 116. Populating Next Right Pointers in Each Node
 * Leetcode 117. Populating Next Right Pointers in Each Node II
 * Leetcode 297. Serialize and Deserialize Binary Tree
 */
