/**
 * Definition
 * LRUCache() {
 *   return {
 *     get,
 *     set
 *   }
 * }
 * 
 * Basic Operations:
 * 1. get(key): O(1)
 * 2. set(key, val): O(1)
 * 
 * Data Structure: Double Linked List
 * ListNode(key, val) {
 *   this.key = key;
 *   this.val = val;
 *   this.prev = null;
 *   this.next = null;
 * }
 * 
 * 1. Add virtual node for head and tail to mark boundary and prevent checking null during update
 * 2. use map to store key and ListNode(key, val): map<key, ListNode(key, val)>
 * 3. Every touched node will be move to head
 * 4. Last node get deleted when oversize
 * 5. get(key): 
 *      a. No key
 *      let node = map.get(key)
 *      if node === undefined: return -1
 *      b. Node touched
 *      else: moveToHead(node), return map[key].val
 * 6. set(key, val):
 *      a. New key
 *      let node = map.get(key)
 *      if node === undefined: 
 *         node = ListNode(key, val)
 *         attachToHead(node)
 *         size += 1
 *      b. Node touched
 *      else:
 *         node.val = val
 *         moveToHead(node)
 *      c. Check oversize
 *      If size over capacity: 
 *         removeLast()
 *         size -= 1
 *      d. Update map
 *      map.set(key, node)
 */
function ListNode(key, val) {
  this.key = key;
  this.val = val;
  this.prev = null;
  this.next = null;
}

function LRUCache(capacity) {
  // Virtual Head and Tail
  let head = new ListNode(-1, -1);
  let tail = new ListNode(-1, -1);
  // Link head and tail
  head.next = tail;
  tail.prev = head;

  let size = 0;
  let map = new Map();

  const attachToHead = (node) => {
    // Handle right side
    node.next = head.next;
    node.next.prev = node;
    // Handle left side
    head.next = node;
    node.prev = head;
  };

  const moveToHead = (node) => {
    // link node.prev and node.next
    node.prev.next = node.next;
    node.next.prev = node.prev;
    attachToHead(node);
  };

  const removeLast = () => {
    let last = tail.prev;
    // link last.prev and last.next
    last.prev.next = last.next;
    last.next.prev = last.prev;
    // delete last.key from map
    map.delete(last.key);
  };

  const get = (key) => {
    let node = map.get(key);
    if (node === undefined) return -1;
    else {
      moveToHead(node);
      return node.val;
    }
  };

  const set = (key, val) => {
    let node = map.get(key);
    if (node === undefined) {
      node = new ListNode(key, val);
      attachToHead(node);
      size += 1;
    } 
    else {
      node.val = val;
      moveToHead(node);
    }

    if (size > capacity) {
      removeLast();
      size -= 1;
    }
    map.set(key, node);
  };

  return {
    get,
    set
  }
}