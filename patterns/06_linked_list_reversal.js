/**
 * ============================================================
 *  PATTERN 6: IN-PLACE REVERSAL OF LINKED LIST
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Reverse a linked list (or sub-section) by changing the
 *  `next` pointers IN-PLACE. No extra data structures needed.
 *
 *  Core technique: maintain THREE pointers:
 *    • prev  — the already-reversed portion
 *    • curr  — the node being processed
 *    • next  — saved reference to curr.next before we overwrite it
 *
 *  Variations:
 *    • Reverse entire list.
 *    • Reverse sub-list from position m to n.
 *    • Reverse in K-groups.
 *    • Swap pairs.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Reverse a linked list."
 *    ✅ "Reverse between position m and n."
 *    ✅ "Reverse every k nodes."
 *    ✅ "Swap nodes in pairs."
 *    ✅ Must modify links without extra space.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. ALWAYS save `next = curr.next` BEFORE reassigning `curr.next`.
 *  2. For sub-list reversal: save the "connection points"
 *     (node before sub-list, node after sub-list).
 *  3. Use a DUMMY node to simplify edge cases (reversing from head).
 *  4. DRAW IT OUT on paper — linked list problems are visual!
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n)
 *  Space: O(1) — in-place
 *
 * ============================================================
 */

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

function createList(arr) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) { curr.next = new ListNode(val); curr = curr.next; }
  return dummy.next;
}

function listToArray(head) {
  const arr = [];
  while (head) { arr.push(head.val); head = head.next; }
  return arr;
}

// ────────────────────────────────────────────────────────────
//  6a. REVERSE ENTIRE LINKED LIST — LC #206
// ────────────────────────────────────────────────────────────

/**
 * Reverse a singly linked list.
 *
 * Visualization:
 *   1 → 2 → 3 → null
 *
 *   Step 1: null ← 1    2 → 3 → null     (prev=null, curr=1, next=2)
 *   Step 2: null ← 1 ← 2    3 → null     (prev=1, curr=2, next=3)
 *   Step 3: null ← 1 ← 2 ← 3             (prev=2, curr=3, next=null)
 *
 *   Return prev (3) → 3 → 2 → 1 → null ✓
 */
function reverseList(head) {
  let prev = null;
  let curr = head;

  while (curr !== null) {
    const next = curr.next; // 1. Save next
    curr.next = prev;       // 2. Reverse the link
    prev = curr;            // 3. Move prev forward
    curr = next;            // 4. Move curr forward
  }

  return prev; // New head
}

// Recursive version (for understanding):
function reverseListRecursive(head) {
  // Base case: empty or single node
  if (!head || !head.next) return head;

  // Reverse the rest of the list
  const newHead = reverseListRecursive(head.next);

  // head.next is the last node of reversed list — point it back to head
  head.next.next = head;
  head.next = null;

  return newHead;
}

// ────────────────────────────────────────────────────────────
//  6b. REVERSE SUB-LIST — LC #92
// ────────────────────────────────────────────────────────────

/**
 * Reverse linked list from position `left` to `right` (1-indexed).
 *
 * Example: 1→2→3→4→5, left=2, right=4  →  1→4→3→2→5
 *
 * Strategy:
 *  1. Use dummy node to handle edge case (left=1).
 *  2. Move to node BEFORE the sub-list.
 *  3. Reverse (right-left) times using "insert at front" technique.
 *
 * Visualization: reverse positions 2-4 in [1→2→3→4→5]
 *   prev=1, curr=2
 *   Round 1: move 3 after 1 → 1→3→2→4→5
 *   Round 2: move 4 after 1 → 1→4→3→2→5  ✓
 */
function reverseBetween(head, left, right) {
  if (left === right) return head;

  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  // Move prev to node just BEFORE position 'left'
  for (let i = 1; i < left; i++) {
    prev = prev.next;
  }

  // curr = first node of sub-list
  let curr = prev.next;

  // Reverse the sub-list by repeatedly moving the next node to front
  for (let i = 0; i < right - left; i++) {
    const temp = curr.next;   // Node to move
    curr.next = temp.next;    // Skip over temp
    temp.next = prev.next;    // temp points to current front
    prev.next = temp;         // prev points to temp (new front)
  }

  return dummy.next;
}

// ────────────────────────────────────────────────────────────
//  6c. REVERSE IN K-GROUPS — LC #25 (HARD)
// ────────────────────────────────────────────────────────────

/**
 * Reverse nodes in groups of k. If remaining nodes < k, leave as-is.
 *
 * Example: 1→2→3→4→5, k=2  →  2→1→4→3→5
 * Example: 1→2→3→4→5, k=3  →  3→2→1→4→5
 */
function reverseKGroup(head, k) {
  // Step 1: Check if we have k nodes
  let count = 0;
  let node = head;
  while (node && count < k) {
    node = node.next;
    count++;
  }
  if (count < k) return head; // Not enough nodes → don't reverse

  // Step 2: Reverse k nodes
  let prev = null;
  let curr = head;
  for (let i = 0; i < k; i++) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: head is now the TAIL of this reversed group.
  //         curr is the head of the remaining list.
  //         Recursively reverse the next group and connect.
  head.next = reverseKGroup(curr, k);

  return prev; // New head of this group
}

// ────────────────────────────────────────────────────────────
//  6d. SWAP NODES IN PAIRS — LC #24
// ────────────────────────────────────────────────────────────

/**
 * Swap every two adjacent nodes.
 * Example: 1→2→3→4  →  2→1→4→3
 */
function swapPairs(head) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let prev = dummy;

  while (prev.next && prev.next.next) {
    const first = prev.next;
    const second = prev.next.next;

    // Swap
    first.next = second.next;
    second.next = first;
    prev.next = second;

    // Move prev two nodes forward
    prev = first;
  }

  return dummy.next;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== IN-PLACE LINKED LIST REVERSAL ===\n");

console.log("6a. Reverse Entire List:");
console.log("   [1,2,3,4,5] →", listToArray(reverseList(createList([1, 2, 3, 4, 5]))));
// [5,4,3,2,1]

console.log("\n6b. Reverse Sub-list (left=2, right=4):");
console.log("   [1,2,3,4,5] →", listToArray(reverseBetween(createList([1, 2, 3, 4, 5]), 2, 4)));
// [1,4,3,2,5]

console.log("\n6c. Reverse in K-Groups (k=2):");
console.log("   [1,2,3,4,5] →", listToArray(reverseKGroup(createList([1, 2, 3, 4, 5]), 2)));
// [2,1,4,3,5]

console.log("   Reverse in K-Groups (k=3):");
console.log("   [1,2,3,4,5] →", listToArray(reverseKGroup(createList([1, 2, 3, 4, 5]), 3)));
// [3,2,1,4,5]

console.log("\n6d. Swap Pairs:");
console.log("   [1,2,3,4] →", listToArray(swapPairs(createList([1, 2, 3, 4]))));
// [2,1,4,3]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                        | Difficulty | LC # |
 *  |--------------------------------|------------|------|
 *  | Reverse Linked List            | Easy       | 206  |
 *  | Reverse Linked List II         | Medium     | 92   |
 *  | Swap Nodes in Pairs            | Medium     | 24   |
 *  | Reverse Nodes in k-Group       | Hard       | 25   |
 *  | Rotate List                    | Medium     | 61   |
 *  | Reorder List                   | Medium     | 143  |
 */
