/**
 * ============================================================
 *  PATTERN 13: K-WAY MERGE
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Given K sorted arrays / lists, merge them efficiently.
 *  
 *  Approaches:
 *    1. MIN-HEAP: Push the head of each list. Pop min, push its next.
 *       O(n log k), where n = total elements across all lists.
 *    2. DIVIDE & CONQUER: Merge pairs like merge sort.
 *       O(n log k), often simpler to implement for linked lists.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Merge K sorted lists / arrays."
 *    ✅ "K-th smallest element in sorted matrix."
 *    ✅ "Smallest range covering elements from K lists."
 *    ✅ Multiple sorted inputs need to be combined.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Min-heap always holds exactly K or fewer elements.
 *  2. Track which list each element came from.
 *  3. For "K-th smallest in matrix" → matrix rows are K sorted lists.
 *  4. Divide & conquer is cleaner for linked list merging.
 *
 * ============================================================
 */

// ── MinHeap utility ────────────────────────────────────────
class MinHeap {
  constructor(cmp = (a, b) => a - b) {
    this.data = [];
    this.cmp = cmp;
  }
  size() { return this.data.length; }
  peek() { return this.data[0]; }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (this.cmp(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  pop() {
    const top = this.data[0], last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let s = i, l = 2*i+1, r = 2*i+2;
        if (l < this.data.length && this.cmp(this.data[l], this.data[s]) < 0) s = l;
        if (r < this.data.length && this.cmp(this.data[r], this.data[s]) < 0) s = r;
        if (s !== i) { [this.data[i], this.data[s]] = [this.data[s], this.data[i]]; i = s; }
        else break;
      }
    }
    return top;
  }
}

// ── ListNode ──────────────────────────────────────────────
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function arrayToList(arr) {
  const dummy = new ListNode();
  let curr = dummy;
  for (const v of arr) { curr.next = new ListNode(v); curr = curr.next; }
  return dummy.next;
}

function listToArray(head) {
  const res = [];
  while (head) { res.push(head.val); head = head.next; }
  return res;
}

// ────────────────────────────────────────────────────────────
//  13a. MERGE K SORTED LISTS — LC #23 (Heap Approach)
// ────────────────────────────────────────────────────────────

/**
 * Push the head of each list into a min-heap.
 * Pop the smallest, add to result, push its .next (if any).
 * O(n log k) time, O(k) space.
 *
 * DRY RUN: lists = [[1,4,5],[1,3,4],[2,6]]
 *   Heap: [(1,list0),(1,list1),(2,list2)]
 *   Pop (1,list0) → result: 1 → push (4,list0)
 *   Pop (1,list1) → result: 1→1 → push (3,list1)
 *   Pop (2,list2) → result: 1→1→2 → push (6,list2)
 *   Pop (3,list1) → result: …→3 → push (4,list1)
 *   ...continues until all popped.
 *   Result: 1→1→2→3→4→4→5→6
 */
function mergeKLists_heap(lists) {
  const heap = new MinHeap((a, b) => a.val - b.val);
  const dummy = new ListNode();
  let curr = dummy;

  // Push head of each non-null list
  for (const head of lists) {
    if (head) heap.push(head);
  }

  while (heap.size() > 0) {
    const node = heap.pop();
    curr.next = node;
    curr = curr.next;

    if (node.next) heap.push(node.next);
  }

  return dummy.next;
}

// ────────────────────────────────────────────────────────────
//  13b. MERGE K SORTED LISTS — LC #23 (Divide & Conquer)
// ────────────────────────────────────────────────────────────

/**
 * Merge pairs of lists, like merge sort.
 * Round 1: merge (0,1), (2,3), ... → k/2 lists.
 * Round 2: merge pairs again → k/4 lists.
 * O(n log k) time.
 */
function mergeKLists_dc(lists) {
  if (!lists || lists.length === 0) return null;

  while (lists.length > 1) {
    const merged = [];
    for (let i = 0; i < lists.length; i += 2) {
      const l1 = lists[i];
      const l2 = i + 1 < lists.length ? lists[i + 1] : null;
      merged.push(mergeTwoLists(l1, l2));
    }
    lists = merged;
  }

  return lists[0];
}

function mergeTwoLists(l1, l2) {
  const dummy = new ListNode();
  let curr = dummy;

  while (l1 && l2) {
    if (l1.val <= l2.val) { curr.next = l1; l1 = l1.next; }
    else { curr.next = l2; l2 = l2.next; }
    curr = curr.next;
  }

  curr.next = l1 || l2;
  return dummy.next;
}

// ────────────────────────────────────────────────────────────
//  13c. KTH SMALLEST IN SORTED MATRIX — LC #378
// ────────────────────────────────────────────────────────────

/**
 * Each row is sorted. Treat rows as K sorted lists.
 * Use min-heap with (value, row, col). Pop K times.
 * O(k log n) time.
 */
function kthSmallest(matrix, k) {
  const n = matrix.length;
  const heap = new MinHeap((a, b) => a[0] - b[0]);

  // Push first element of each row
  for (let r = 0; r < Math.min(n, k); r++) {
    heap.push([matrix[r][0], r, 0]);
  }

  let count = 0;
  while (heap.size() > 0) {
    const [val, r, c] = heap.pop();
    count++;
    if (count === k) return val;

    if (c + 1 < n) {
      heap.push([matrix[r][c + 1], r, c + 1]);
    }
  }

  return -1;
}

// ────────────────────────────────────────────────────────────
//  13d. MERGE K SORTED ARRAYS (Arrays version)
// ────────────────────────────────────────────────────────────

function mergeKSortedArrays(arrays) {
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  const result = [];

  // Push [value, arrayIndex, elementIndex]
  for (let i = 0; i < arrays.length; i++) {
    if (arrays[i].length > 0) {
      heap.push([arrays[i][0], i, 0]);
    }
  }

  while (heap.size() > 0) {
    const [val, arrIdx, elemIdx] = heap.pop();
    result.push(val);

    if (elemIdx + 1 < arrays[arrIdx].length) {
      heap.push([arrays[arrIdx][elemIdx + 1], arrIdx, elemIdx + 1]);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== K-WAY MERGE ===\n");

const lists1 = [arrayToList([1, 4, 5]), arrayToList([1, 3, 4]), arrayToList([2, 6])];
console.log("13a. Merge K Lists (Heap):", listToArray(mergeKLists_heap(lists1)));
// [1,1,2,3,4,4,5,6]

const lists2 = [arrayToList([1, 4, 5]), arrayToList([1, 3, 4]), arrayToList([2, 6])];
console.log("13b. Merge K Lists (D&C):", listToArray(mergeKLists_dc(lists2)));
// [1,1,2,3,4,4,5,6]

const matrix = [[1, 5, 9], [10, 11, 13], [12, 13, 15]];
console.log("\n13c. Kth Smallest in Matrix (k=8):", kthSmallest(matrix, 8)); // 13

console.log("\n13d. Merge K Sorted Arrays:", mergeKSortedArrays([[1, 4, 7], [2, 5, 8], [3, 6, 9]]));
// [1,2,3,4,5,6,7,8,9]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Merge K Sorted Lists                    | Hard       | 23    |
 *  | Kth Smallest in Sorted Matrix           | Medium     | 378   |
 *  | Smallest Range Covering K Lists         | Hard       | 632   |
 *  | Merge Two Sorted Lists                  | Easy       | 21    |
 *  | Find K Pairs with Smallest Sums         | Medium     | 373   |
 *  | Ugly Number II                          | Medium     | 264   |
 */
