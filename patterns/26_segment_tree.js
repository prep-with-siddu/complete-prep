/**
 * ============================================================
 *  PATTERN 26: SEGMENT TREE
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  A segment tree is a binary tree where each node stores
 *  information about a range (segment) of the array.
 *
 *  Structure:
 *    • Leaf nodes = individual elements.
 *    • Internal nodes = merged result of children (sum, min, max, etc.).
 *    • Root = result for the entire array.
 *    • Stored in a flat array of size 4*n (1-indexed).
 *
 *  Operations:
 *    build()  — O(n)
 *    query(l, r) — O(log n)   range query
 *    update(i, val) — O(log n) point update
 *    rangeUpdate(l, r, val) — O(log n) with lazy propagation
 *
 *  When to use:
 *    • Need range queries (sum, min, max, GCD…) with updates.
 *    • Prefix sum won't work because array is MUTABLE.
 *    • Binary Indexed Tree (BIT) is simpler for sum but segment
 *      tree is more versatile (min/max, lazy propagation).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Range sum query with updates."
 *    ✅ "Range minimum/maximum query with updates."
 *    ✅ "Count of elements in range satisfying condition" + mutable.
 *    ✅ "Number of inversions", "count smaller numbers after self."
 *    ✅ Constraints suggest O(n log n) for multiple queries + updates.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Array size = 4 * n (safe upper bound).
 *  2. For node at index i: left child = 2*i, right child = 2*i + 1.
 *  3. Lazy propagation: defer range updates until query forces evaluation.
 *  4. Merge function defines what the tree computes (sum, min, max, etc.).
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  SEGMENT TREE CLASS — Generic (supports sum, min, max)
// ────────────────────────────────────────────────────────────

class SegmentTree {
  /**
   * @param {number[]} arr - Input array
   * @param {string} mode - "sum" | "min" | "max"
   */
  constructor(arr, mode = "sum") {
    this.n = arr.length;
    this.mode = mode;
    this.tree = new Array(4 * this.n).fill(0);
    this.lazy = new Array(4 * this.n).fill(0); // For lazy propagation

    if (mode === "min") this.tree.fill(Infinity);
    if (mode === "max") this.tree.fill(-Infinity);

    if (this.n > 0) this._build(arr, 1, 0, this.n - 1);
  }

  _merge(a, b) {
    if (this.mode === "sum") return a + b;
    if (this.mode === "min") return Math.min(a, b);
    if (this.mode === "max") return Math.max(a, b);
  }

  _identity() {
    if (this.mode === "sum") return 0;
    if (this.mode === "min") return Infinity;
    if (this.mode === "max") return -Infinity;
  }

  /**
   * Build tree from array.
   * node = current node index in tree array.
   * [start, end] = range this node covers.
   */
  _build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this._build(arr, 2 * node, start, mid);
    this._build(arr, 2 * node + 1, mid + 1, end);
    this.tree[node] = this._merge(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  /**
   * POINT UPDATE: Set arr[idx] = val.
   */
  update(idx, val, node = 1, start = 0, end = this.n - 1) {
    if (start === end) {
      this.tree[node] = val;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (idx <= mid) {
      this.update(idx, val, 2 * node, start, mid);
    } else {
      this.update(idx, val, 2 * node + 1, mid + 1, end);
    }
    this.tree[node] = this._merge(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  /**
   * RANGE QUERY: Query result over [l, r].
   *
   * DRY RUN: arr=[1,3,5,7,9,11], query(1,3) → sum of [3,5,7] = 15
   *   Node 1 covers [0,5] → partially overlaps, go children
   *   Node 2 covers [0,2] → partially overlaps [1,3]
   *     Node 4 [0,0] → outside → return 0
   *     Node 5 [1,2] → fully inside → return 8
   *   Node 3 covers [3,5] → partially overlaps [1,3]
   *     Node 6 [3,3] → fully inside → return 7
   *     Node 7 [4,5] → outside → return 0
   *   Result: 0 + 8 + 7 + 0 = 15 ✓
   */
  query(l, r, node = 1, start = 0, end = this.n - 1) {
    if (r < start || end < l) return this._identity(); // No overlap
    if (l <= start && end <= r) return this.tree[node];  // Full overlap
    const mid = Math.floor((start + end) / 2);
    return this._merge(
      this.query(l, r, 2 * node, start, mid),
      this.query(l, r, 2 * node + 1, mid + 1, end)
    );
  }

  /**
   * LAZY RANGE UPDATE: Add val to all elements in [l, r].
   * Only works for sum mode.
   */
  _pushDown(node, start, end) {
    if (this.lazy[node] !== 0) {
      const mid = Math.floor((start + end) / 2);
      this._applyLazy(2 * node, start, mid, this.lazy[node]);
      this._applyLazy(2 * node + 1, mid + 1, end, this.lazy[node]);
      this.lazy[node] = 0;
    }
  }

  _applyLazy(node, start, end, val) {
    this.tree[node] += val * (end - start + 1); // Sum: add val to each element
    this.lazy[node] += val;
  }

  rangeUpdate(l, r, val, node = 1, start = 0, end = this.n - 1) {
    if (r < start || end < l) return;
    if (l <= start && end <= r) {
      this._applyLazy(node, start, end, val);
      return;
    }
    this._pushDown(node, start, end);
    const mid = Math.floor((start + end) / 2);
    this.rangeUpdate(l, r, val, 2 * node, start, mid);
    this.rangeUpdate(l, r, val, 2 * node + 1, mid + 1, end);
    this.tree[node] = this._merge(this.tree[2 * node], this.tree[2 * node + 1]);
  }

  lazyQuery(l, r, node = 1, start = 0, end = this.n - 1) {
    if (r < start || end < l) return this._identity();
    if (l <= start && end <= r) return this.tree[node];
    this._pushDown(node, start, end);
    const mid = Math.floor((start + end) / 2);
    return this._merge(
      this.lazyQuery(l, r, 2 * node, start, mid),
      this.lazyQuery(l, r, 2 * node + 1, mid + 1, end)
    );
  }
}

// ────────────────────────────────────────────────────────────
//  26a. RANGE SUM QUERY — MUTABLE — LC #307
// ────────────────────────────────────────────────────────────

class NumArray {
  constructor(nums) {
    this.st = new SegmentTree(nums, "sum");
  }

  update(index, val) {
    this.st.update(index, val);
  }

  sumRange(left, right) {
    return this.st.query(left, right);
  }
}

// ────────────────────────────────────────────────────────────
//  26b. COUNT OF SMALLER NUMBERS AFTER SELF — LC #315
// ────────────────────────────────────────────────────────────

/**
 * For each i, count elements j > i where nums[j] < nums[i].
 *
 * Approach: Process from RIGHT. Maintain a BIT/segment tree over
 * value range. For each nums[i], query count of values in [0, nums[i]-1].
 * Then update tree at nums[i] with +1.
 *
 * We use coordinate compression + BIT here for efficiency.
 */
function countSmaller(nums) {
  // Coordinate compress
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  const rank = new Map();
  sorted.forEach((v, i) => rank.set(v, i + 1)); // 1-indexed

  const size = sorted.length;
  const bit = new Array(size + 1).fill(0);

  function bitUpdate(i, delta) {
    for (; i <= size; i += i & (-i)) bit[i] += delta;
  }
  function bitQuery(i) {
    let sum = 0;
    for (; i > 0; i -= i & (-i)) sum += bit[i];
    return sum;
  }

  const result = new Array(nums.length);
  for (let i = nums.length - 1; i >= 0; i--) {
    const r = rank.get(nums[i]);
    result[i] = bitQuery(r - 1); // Count elements smaller
    bitUpdate(r, 1);
  }
  return result;
}

// ────────────────────────────────────────────────────────────
//  26c. RANGE MINIMUM QUERY (RMQ)
// ────────────────────────────────────────────────────────────

function rangeMinimumsDemo() {
  const arr = [2, 5, 1, 4, 9, 3];
  const st = new SegmentTree(arr, "min");

  console.log("  Min of [1,4]:", st.query(1, 4)); // min(5,1,4,9) = 1
  console.log("  Min of [0,2]:", st.query(0, 2)); // min(2,5,1) = 1
  console.log("  Min of [3,5]:", st.query(3, 5)); // min(4,9,3) = 3

  st.update(2, 10); // Change index 2 from 1 to 10
  console.log("  After update [2]=10, Min of [0,2]:", st.query(0, 2)); // min(2,5,10) = 2
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== SEGMENT TREE ===\n");

// 26a. Range Sum Query Mutable
const numArr = new NumArray([1, 3, 5]);
console.log("26a. Range Sum [0,2]:", numArr.sumRange(0, 2)); // 9
numArr.update(1, 2); // [1,2,5]
console.log("  After update [1]=2, Sum [0,2]:", numArr.sumRange(0, 2)); // 8

// Range Sum with bigger array
const st = new SegmentTree([1, 3, 5, 7, 9, 11], "sum");
console.log("  Sum [1,3]:", st.query(1, 3)); // 15

// 26b. Count Smaller After Self
console.log("\n26b. Count Smaller:", countSmaller([5, 2, 6, 1]));
// [2, 1, 1, 0]

// 26c. Range Minimum
console.log("\n26c. Range Minimum Query:");
rangeMinimumsDemo();

// Lazy Propagation
console.log("\n26d. Lazy Propagation:");
const lazySt = new SegmentTree([1, 2, 3, 4, 5], "sum");
console.log("  Initial sum [0,4]:", lazySt.lazyQuery(0, 4)); // 15
lazySt.rangeUpdate(1, 3, 10); // Add 10 to indices 1,2,3
console.log("  After rangeUpdate [1,3]+=10, sum [0,4]:", lazySt.lazyQuery(0, 4)); // 45
console.log("  Sum [1,3]:", lazySt.lazyQuery(1, 3)); // 39

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                   | Difficulty | LC #  |
 *  |-------------------------------------------|------------|-------|
 *  | Range Sum Query - Mutable                 | Medium     | 307   |
 *  | Count of Smaller Numbers After Self       | Hard       | 315   |
 *  | Range Sum Query 2D - Mutable              | Hard       | 308   |
 *  | Count of Range Sum                        | Hard       | 327   |
 *  | Reverse Pairs                             | Hard       | 493   |
 *  | My Calendar I / II / III                  | Med/Hard   | 729+  |
 *
 *  SEGMENT TREE vs BIT (Binary Indexed Tree / Fenwick):
 *  ─────────────────────────────────────────────────────
 *  BIT: Simpler code, only supports prefix-sum type ops.
 *  Seg Tree: More complex, supports min/max/GCD, lazy propagation.
 *
 *  SEGMENT TREE vs PREFIX SUM:
 *  ──────────────────────────
 *  Prefix Sum: O(1) query, O(n) update. For STATIC arrays.
 *  Seg Tree:   O(log n) query, O(log n) update. For MUTABLE arrays.
 */
