/**
 * Single Linked List
 * Operation:
 * add: O(1)
 *   1. Add new node curr after prev node:
 *      1.a initiate curr
 *      1.b given prev node, curr.next = prev.next
 *      1.c prev.next = curr
 *   2. Add new node at the beginning:
 *      2.a initiate curr
 *      2.b curr.next = head
 *      2.c head = curr
 * delete: O(1)
 *   1. Delete curr node after prev node:
 *      1.a find prev, prev.next = curr.next
 *   2. Delete the first node:
 *      2.a head = head.next
 */
/**
 * Two Pointer in Linked List
 * 1. If there is no cycle, the fast pointer will stop at the end of the linked list
 * 2. If there is a cycle, the fast pointer will eventually meet with the slow pointer
 * 
 * Tips:
 * 1. Always examine if the node is null before you call the next field.
 *    (in while condition)
 *    ex: if we run fast = fast.next.next, we need to examine both fast and fast.next is not null.
 * 2. Carefully define the end conditions of the loop.
 * 
 * Analysis:
 * How many times we will run our loop?
 * If there is a cycle, the fast pointer need M times to catch up the slower pointer
 * (M is the length of the cycle)
 * Since M < N, Total T: O(n)
 */
/**
 * Classic Problems
 * Reverse Linked List
 * 1. Use 3 pointers:
 *    1.a p1 = head and will always stands for head, eventually return p1
 *    1.b p2 = p1.next
 * 2. head.next = null // will eventually be last node
 * 3. while p1 !== null && p2 !== null:
 *      3.a 3rd pointer temp = p2.next
 *      3.b p2.next = p1
 *      3.c p1 = p2 (move p1 to p2)
 *      3.d p2 = temp (move p2 to temp)
 * 4. return p1
 */
// Leetcode 206. Reverse Linked List
const reverseList = (head) => {
  if (head === null || head.next === null) return head;

  let p1 = head;
  let p2 = p1.next;
  head.next = null;
  while (p1 !== null && p2 !== null) {
    let temp = p2.next;
    p2.next = p1;
    p1 = p2;
    p2 = temp;
  }
  return p1;
};
/**
 * Double Linked List
 * Operation:
 * add: O(1)
 *   1. Add new node curr after node prev:
 *      1.a curr.next = prev.next
 *          curr.prev = prev
 *      1.b prev.next = curr
 *          curr.next.prev = curr
 * delete:
 *   1. Delete node curr:
 *      1.a curr.prev.next = curr.next
 *      1.b curr.next.prev = curr.prev
 */
/**
 * Summary
 * Similarity:
 * 1. Both of them are not able to access the data at a random position in constant time.
 * 2. Both of them are able to add a new node after given node or at the beginning of the list in O(1) time.
 * 3. Both of them are able to delete the first node in O(1) time.
 * 
 * Difference:
 * Delete given node:
 * Single Linked List: O(n)
 * Double Linked List: O(1)
 * 
 * Conclusion:
 * 1. If you need to add or delete a node frequently, a linked list could be a good choice.
 * 2. If you need to access an element by index often, an array might be a better choice than a linked list.
 */
