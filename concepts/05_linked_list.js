// ============================================================
// 📘 CONCEPT 5: LINKED LIST
// ============================================================
// A linear data structure where elements are NOT stored
// contiguously. Each element (node) points to the next one.
// ============================================================

// ============================================================
// 🔹 WHY LINKED LISTS?
// ============================================================
// Arrays have a problem: inserting/deleting in the middle is O(n)
// because you have to SHIFT all elements.
//
// Linked Lists solve this:
// - Insert/Delete at known position: O(1)
// - But lose random access: accessing index i is O(n)
//
// Trade-off: Fast insert/delete vs Fast access

// ============================================================
// 🔹 NODE STRUCTURE
// ============================================================

class ListNode {
  constructor(val, next = null) {
    this.val = val;    // The data
    this.next = next;  // Pointer to the next node
  }
}

// Creating a linked list: 1 → 2 → 3 → null
const head = new ListNode(1);
head.next = new ListNode(2);
head.next.next = new ListNode(3);

// ============================================================
// 🔹 TYPES OF LINKED LISTS
// ============================================================

// 1. SINGLY LINKED LIST — Each node points to next only
// [1] → [2] → [3] → null

// 2. DOUBLY LINKED LIST — Each node points to next AND previous
class DoublyListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}
// null ← [1] ⇌ [2] ⇌ [3] → null

// 3. CIRCULAR LINKED LIST — Last node points back to head
// [1] → [2] → [3] → [1] (cycles back)

// ============================================================
// 🔹 BASIC OPERATIONS
// ============================================================

// --- Traversal — O(n) ---
function printList(head) {
  let current = head;
  const values = [];
  while (current) {
    values.push(current.val);
    current = current.next;
  }
  console.log(values.join(" → ") + " → null");
}

// --- Get Length — O(n) ---
function getLength(head) {
  let count = 0;
  let current = head;
  while (current) {
    count++;
    current = current.next;
  }
  return count;
}

// --- Search — O(n) ---
function search(head, target) {
  let current = head;
  while (current) {
    if (current.val === target) return true;
    current = current.next;
  }
  return false;
}

// --- Insert at Head — O(1) ---
function insertAtHead(head, val) {
  const newNode = new ListNode(val);
  newNode.next = head;
  return newNode; // New head
}

// --- Insert at Tail — O(n) ---
function insertAtTail(head, val) {
  const newNode = new ListNode(val);
  if (!head) return newNode;

  let current = head;
  while (current.next) {
    current = current.next;
  }
  current.next = newNode;
  return head;
}

// --- Insert at Position — O(n) ---
function insertAtPosition(head, val, position) {
  if (position === 0) return insertAtHead(head, val);

  let current = head;
  for (let i = 0; i < position - 1 && current; i++) {
    current = current.next;
  }

  if (!current) return head; // Position out of bounds

  const newNode = new ListNode(val);
  newNode.next = current.next;
  current.next = newNode;
  return head;
}

// --- Delete Node by Value — O(n) ---
function deleteNode(head, val) {
  if (!head) return null;
  if (head.val === val) return head.next; // Delete head

  let current = head;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next; // Skip the node
      return head;
    }
    current = current.next;
  }
  return head;
}

// ============================================================
// 🔹 THE DUMMY NODE TECHNIQUE ⭐
// ============================================================
// Creating a dummy node before the head simplifies edge cases
// (like deleting the head, or building a new list)

function removeElements(head, val) {
  const dummy = new ListNode(0);
  dummy.next = head;

  let current = dummy;
  while (current.next) {
    if (current.next.val === val) {
      current.next = current.next.next;
    } else {
      current = current.next;
    }
  }
  return dummy.next; // New head (dummy.next handles head deletion!)
}

// ============================================================
// 🔹 CLASSIC LINKED LIST PROBLEMS ⭐
// ============================================================

// --- 1. Reverse a Linked List (Iterative) ---
// This is THE most important linked list operation!
function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next; // Save next
    current.next = prev;       // Reverse pointer
    prev = current;            // Move prev forward
    current = next;            // Move current forward
  }
  return prev; // New head
}
// Before: 1 → 2 → 3 → null
// After:  3 → 2 → 1 → null

// --- Reverse (Recursive) ---
function reverseListRecursive(head) {
  if (!head || !head.next) return head;
  const newHead = reverseListRecursive(head.next);
  head.next.next = head;
  head.next = null;
  return newHead;
}

// --- 2. Detect Cycle (Floyd's Tortoise and Hare) ---
function hasCycle(head) {
  let slow = head;
  let fast = head;
  while (fast && fast.next) {
    slow = slow.next;       // Move 1 step
    fast = fast.next.next;  // Move 2 steps
    if (slow === fast) return true; // They meet = cycle!
  }
  return false;
}

// --- 3. Find Cycle Start ---
function detectCycleStart(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      // Reset slow to head, move both at same speed
      slow = head;
      while (slow !== fast) {
        slow = slow.next;
        fast = fast.next;
      }
      return slow; // Cycle start!
    }
  }
  return null;
}

// --- 4. Find Middle Node ---
function findMiddle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  return slow; // Middle node
}

// --- 5. Merge Two Sorted Lists ---
function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }

  current.next = l1 || l2; // Attach remaining
  return dummy.next;
}

// --- 6. Remove Nth Node from End ---
function removeNthFromEnd(head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let fast = dummy, slow = dummy;

  // Move fast n+1 steps ahead
  for (let i = 0; i <= n; i++) fast = fast.next;

  // Move both until fast reaches end
  while (fast) {
    slow = slow.next;
    fast = fast.next;
  }

  slow.next = slow.next.next; // Remove the node
  return dummy.next;
}

// --- 7. Check if Palindrome ---
function isPalindrome(head) {
  // Find middle
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // Reverse second half
  let prev = null;
  while (slow) {
    const next = slow.next;
    slow.next = prev;
    prev = slow;
    slow = next;
  }

  // Compare both halves
  let left = head, right = prev;
  while (right) {
    if (left.val !== right.val) return false;
    left = left.next;
    right = right.next;
  }
  return true;
}

// ============================================================
// 🔹 LINKED LIST vs ARRAY
// ============================================================
/*
┌───────────────────┬────────────────┬────────────────┐
│ Operation         │ Array          │ Linked List    │
├───────────────────┼────────────────┼────────────────┤
│ Access by index   │ O(1) ✅        │ O(n)          │
│ Search            │ O(n)           │ O(n)          │
│ Insert at start   │ O(n)           │ O(1) ✅        │
│ Insert at end     │ O(1) amortized │ O(n) or O(1)* │
│ Insert in middle  │ O(n)           │ O(1)** ✅      │
│ Delete at start   │ O(n)           │ O(1) ✅        │
│ Delete at end     │ O(1)           │ O(n)          │
│ Memory            │ Contiguous     │ Scattered     │
│ Cache friendly    │ ✅ Yes          │ No            │
└───────────────────┴────────────────┴────────────────┘
* O(1) if you maintain a tail pointer
** O(1) if you already have reference to the node before
*/

// ============================================================
// 🔹 KEY PATTERNS TO REMEMBER
// ============================================================
/*
1. DUMMY NODE     → Simplifies head deletion/creation edge cases
2. TWO POINTERS   → Fast & Slow for cycle detection, middle finding
3. REVERSE        → Foundation for many problems
4. MERGE          → Foundation for merge sort on linked lists
5. RECURSION      → Many linked list problems have elegant recursive solutions

Common Edge Cases to Handle:
- Empty list (head === null)
- Single node
- Two nodes
- Cycle in list
- Even vs Odd length
*/

console.log("✅ Linked Lists — Master pointers and node manipulation!");
