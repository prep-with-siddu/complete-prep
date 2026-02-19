/**
 * ============================================================
 *  PATTERN 9: TWO HEAPS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Maintain TWO heaps to track the smaller and larger halves:
 *    • MAX-HEAP for the smaller half (top = largest of smalls)
 *    • MIN-HEAP for the larger half  (top = smallest of larges)
 *
 *  The MEDIAN is:
 *    • If equal sizes → average of both tops.
 *    • If unequal → top of the larger heap.
 *
 *  JS doesn't have a built-in heap, so we implement one below.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Find the median" of a data stream.
 *    ✅ "Sliding window median."
 *    ✅ Need to balance two halves efficiently.
 *    ✅ Need the middle value(s) of a growing dataset.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Keep heaps balanced: sizes differ by at most 1.
 *  2. Always ensure maxHeap.top <= minHeap.top.
 *  3. Add to maxHeap first → rebalance if needed.
 *  4. Use maxHeap as "slightly larger" heap (odd count → median is here).
 *
 * ============================================================
 */

// ── MinHeap & MaxHeap implementations ───────────────────────

class MinHeap {
  constructor(comparator = (a, b) => a - b) {
    this.data = [];
    this.cmp = comparator;
  }
  size()    { return this.data.length; }
  peek()    { return this.data[0]; }
  push(val) { this.data.push(val); this._bubbleUp(this.data.length - 1); }
  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) { this.data[0] = last; this._sinkDown(0); }
    return top;
  }
  _bubbleUp(i) {
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[p], this.data[i]) <= 0) break;
      [this.data[p], this.data[i]] = [this.data[i], this.data[p]];
      i = p;
    }
  }
  _sinkDown(i) {
    const n = this.data.length;
    while (true) {
      let s = i, l = 2 * i + 1, r = 2 * i + 2;
      if (l < n && this.cmp(this.data[l], this.data[s]) < 0) s = l;
      if (r < n && this.cmp(this.data[r], this.data[s]) < 0) s = r;
      if (s === i) break;
      [this.data[s], this.data[i]] = [this.data[i], this.data[s]];
      i = s;
    }
  }
}

class MaxHeap {
  constructor() { this._heap = new MinHeap((a, b) => b - a); }
  size()    { return this._heap.size(); }
  peek()    { return this._heap.peek(); }
  push(val) { this._heap.push(val); }
  pop()     { return this._heap.pop(); }
}

// ────────────────────────────────────────────────────────────
//  9a. FIND MEDIAN FROM DATA STREAM — LC #295
// ────────────────────────────────────────────────────────────

/**
 * Design a data structure that supports:
 *   addNum(num) — add a number from the stream.
 *   findMedian() — return the current median.
 *
 * Example:
 *   addNum(1), addNum(2) → median = 1.5
 *   addNum(3) → median = 2
 *
 * Strategy:
 *   maxHeap: [smaller half]  ← top is the LARGEST of the smalls
 *   minHeap: [larger half]   ← top is the SMALLEST of the larges
 *
 *   Stream: 1, 5, 2, 8, 3
 *   After all insertions:
 *     maxHeap: [1, 2, 3] ← top = 3
 *     minHeap: [5, 8]    ← top = 5
 *     Median = 3 (maxHeap.top since it has more elements)
 */
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // Smaller half
    this.minHeap = new MinHeap(); // Larger half
  }

  addNum(num) {
    // Step 1: Add to maxHeap (smaller half) by default
    this.maxHeap.push(num);

    // Step 2: Ensure maxHeap.top <= minHeap.top
    if (this.minHeap.size() > 0 && this.maxHeap.peek() > this.minHeap.peek()) {
      this.minHeap.push(this.maxHeap.pop());
    }

    // Step 3: Balance sizes (maxHeap can be at most 1 larger)
    if (this.maxHeap.size() > this.minHeap.size() + 1) {
      this.minHeap.push(this.maxHeap.pop());
    } else if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek(); // Odd count → maxHeap has the extra
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2; // Even count → average
  }
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== TWO HEAPS PATTERN ===\n");

const mf = new MedianFinder();
mf.addNum(1);
console.log("After [1]:       median =", mf.findMedian()); // 1
mf.addNum(2);
console.log("After [1,2]:     median =", mf.findMedian()); // 1.5
mf.addNum(3);
console.log("After [1,2,3]:   median =", mf.findMedian()); // 2
mf.addNum(4);
console.log("After [1,2,3,4]: median =", mf.findMedian()); // 2.5
mf.addNum(5);
console.log("After [1..5]:    median =", mf.findMedian()); // 3

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                        | Difficulty | LC # |
 *  |--------------------------------|------------|------|
 *  | Find Median from Data Stream   | Hard       | 295  |
 *  | Sliding Window Median          | Hard       | 480  |
 *  | IPO                            | Hard       | 502  |
 */
