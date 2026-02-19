/**
 * ============================================================
 *  PATTERN 3: FAST & SLOW POINTERS (Floyd's Cycle Detection)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Also called "Hare and Tortoise". Use two pointers moving at
 *  DIFFERENT SPEEDS through a linked list or sequence.
 *    • Slow pointer moves 1 step at a time.
 *    • Fast pointer moves 2 steps at a time.
 *
 *  Key insight:
 *    • If there IS a cycle → fast and slow WILL meet.
 *    • If there is NO cycle → fast reaches the end (null).
 *
 *  To find cycle START:
 *    Phase 1: Detect meeting point (fast === slow).
 *    Phase 2: Reset one pointer to head. Move both at speed 1.
 *             Where they meet = cycle start.  (Math proof: Floyd's)
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ Linked list with potential **cycle**.
 *    ✅ "Find the middle" of a linked list.
 *    ✅ "Is this linked list a palindrome?"
 *    ✅ Number sequence that might loop (e.g., Happy Number).
 *    ✅ "Find the duplicate number" (LC #287).
 *
 *
 *  💡 HINTS & TRICKS
 *  ─────────────────
 *  1. Middle of list: when fast hits end, slow is at middle.
 *  2. Palindrome list: find middle → reverse second half → compare.
 *  3. Happy number: digit-sum sequence either reaches 1 or cycles.
 *  4. Always check `fast !== null && fast.next !== null` to avoid crash.
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n)
 *  Space: O(1)  ← this is the main advantage over HashSet approach.
 *
 * ============================================================
 */

// ── Helper: ListNode ────────────────────────────────────────

class ListNode {
  constructor(val, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Helper: create linked list from array
function createList(arr) {
  const dummy = new ListNode(0);
  let curr = dummy;
  for (const val of arr) {
    curr.next = new ListNode(val);
    curr = curr.next;
  }
  return dummy.next;
}

// Helper: list to array
function listToArray(head) {
  const arr = [];
  while (head) {
    arr.push(head.val);
    head = head.next;
  }
  return arr;
}

// ────────────────────────────────────────────────────────────
//  3a. LINKED LIST CYCLE DETECTION — LC #141
// ────────────────────────────────────────────────────────────

/**
 * Does the linked list have a cycle?
 *
 * Visualization:
 *   1 → 2 → 3 → 4 → 5
 *               ↑     ↓
 *               7 ← 6      ← cycle!
 *
 * Slow: 1,2,3,4,5,6,7,3,4...
 * Fast: 1,3,5,7,4,6,3,5...
 * They meet at some node inside the cycle.
 */
function hasCycle(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;       // 1 step
    fast = fast.next.next;  // 2 steps

    if (slow === fast) return true; // Met → cycle!
  }

  return false; // Fast reached end → no cycle
}

// ────────────────────────────────────────────────────────────
//  3b. FIND THE START OF CYCLE — LC #142
// ────────────────────────────────────────────────────────────

/**
 * Return the node where the cycle begins, or null.
 *
 * Math behind it:
 *   Let D = distance from head to cycle start.
 *   Let K = distance from cycle start to meeting point.
 *   Let C = cycle length.
 *
 *   Slow traveled: D + K
 *   Fast traveled: D + K + n*C  (looped n times)
 *   Fast = 2 × Slow → D + K + n*C = 2(D + K)
 *   → n*C = D + K  → D = n*C - K
 *
 *   So if we reset one pointer to head and move both at
 *   speed 1, they meet exactly at the cycle start!
 */
function detectCycleStart(head) {
  let slow = head;
  let fast = head;

  // Phase 1: Find meeting point
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) break;
  }

  // No cycle
  if (fast === null || fast.next === null) return null;

  // Phase 2: Find cycle start
  slow = head;
  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next; // Both at speed 1 now
  }

  return slow; // Cycle start node
}

// ────────────────────────────────────────────────────────────
//  3c. MIDDLE OF LINKED LIST — LC #876
// ────────────────────────────────────────────────────────────

/**
 * Find the middle node. If two middles, return the SECOND.
 *
 * Example: 1→2→3→4→5    → node 3
 *          1→2→3→4→5→6  → node 4 (second middle)
 *
 * When fast reaches end, slow is at middle. No need to
 * count length first!
 */
function middleNode(head) {
  let slow = head;
  let fast = head;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return slow;
}

// ────────────────────────────────────────────────────────────
//  3d. HAPPY NUMBER — LC #202
// ────────────────────────────────────────────────────────────

/**
 * A number is "happy" if repeatedly replacing it with the
 * sum of squares of its digits eventually reaches 1.
 * If it loops forever in a cycle → not happy.
 *
 * Example: 23 → 13 → 10 → 1  ✓ happy
 *          2  → 4  → 16 → 37 → 58 → 89 → 145 → 42 → 20 → 4 → ... (cycle!) ✗
 *
 * Use fast/slow on the NUMBER SEQUENCE instead of a linked list!
 */
function isHappy(n) {
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const digit = num % 10;
      sum += digit * digit;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n;
  let fast = getNext(n);

  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);          // 1 step
    fast = getNext(getNext(fast)); // 2 steps
  }

  return fast === 1;
}

// ────────────────────────────────────────────────────────────
//  3e. PALINDROME LINKED LIST — LC #234
// ────────────────────────────────────────────────────────────

/**
 * Check if linked list is a palindrome in O(1) extra space.
 *
 * Strategy:
 *  1. Find middle using fast/slow.
 *  2. Reverse the second half.
 *  3. Compare first half with reversed second half.
 *  4. (Optionally restore the list.)
 */
function isPalindromeList(head) {
  if (!head || !head.next) return true;

  // Step 1: Find middle
  let slow = head, fast = head;
  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Step 2: Reverse second half
  let prev = null;
  let curr = slow;
  while (curr !== null) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }

  // Step 3: Compare both halves
  let left = head;
  let right = prev; // Head of reversed second half
  while (right !== null) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }

  return true;
}

// ────────────────────────────────────────────────────────────
//  3f. FIND THE DUPLICATE NUMBER — LC #287
// ────────────────────────────────────────────────────────────

/**
 * Array of n+1 integers in range [1, n]. Exactly one duplicate.
 * Find it in O(n) time, O(1) space, WITHOUT modifying the array.
 *
 * Trick: Treat the array as a linked list!
 *   Index i points to nums[i].
 *   Since there's a duplicate, there's a CYCLE.
 *   Use Floyd's to find the cycle start = the duplicate.
 *
 * Example: [1, 3, 4, 2, 2]
 *   Index 0 → val 1 → val 3 → val 2 → val 4 → val 2 (cycle!)
 */
function findDuplicate(nums) {
  // Phase 1: Find meeting point
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  // Phase 2: Find cycle start (= duplicate value)
  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== FAST & SLOW POINTERS ===\n");

// 3a. Cycle detection
const cycleList = createList([1, 2, 3, 4, 5]);
// Create a cycle: 5 → 3
let node = cycleList;
let node3 = null;
while (node.next) {
  if (node.val === 3) node3 = node;
  node = node.next;
}
node.next = node3; // 5→3 cycle
console.log("3a. Has cycle: [1→2→3→4→5→3...] →", hasCycle(cycleList)); // true
console.log("    Has cycle: [1→2→3] →", hasCycle(createList([1, 2, 3]))); // false

// 3b. Cycle start
console.log("\n3b. Cycle start: →", detectCycleStart(cycleList)?.val); // 3

// 3c. Middle node
console.log("\n3c. Middle Node:");
console.log("   [1,2,3,4,5] →", middleNode(createList([1, 2, 3, 4, 5])).val);   // 3
console.log("   [1,2,3,4,5,6] →", middleNode(createList([1, 2, 3, 4, 5, 6])).val); // 4

// 3d. Happy Number
console.log("\n3d. Happy Number:");
console.log("   23 →", isHappy(23)); // true
console.log("   2 →", isHappy(2));   // false

// 3e. Palindrome Linked List
console.log("\n3e. Palindrome List:");
console.log("   [1,2,2,1] →", isPalindromeList(createList([1, 2, 2, 1]))); // true
console.log("   [1,2,3] →", isPalindromeList(createList([1, 2, 3])));       // false

// 3f. Find Duplicate
console.log("\n3f. Find Duplicate:");
console.log("   [1,3,4,2,2] →", findDuplicate([1, 3, 4, 2, 2])); // 2
console.log("   [3,1,3,4,2] →", findDuplicate([3, 1, 3, 4, 2])); // 3

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                        | Difficulty | LC # |
 *  |--------------------------------|------------|------|
 *  | Linked List Cycle              | Easy       | 141  |
 *  | Linked List Cycle II           | Medium     | 142  |
 *  | Middle of the Linked List      | Easy       | 876  |
 *  | Happy Number                   | Easy       | 202  |
 *  | Palindrome Linked List         | Easy       | 234  |
 *  | Find the Duplicate Number      | Medium     | 287  |
 *  | Circular Array Loop            | Medium     | 457  |
 */
