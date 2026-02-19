// ============================================================
// 📘 CONCEPT 9: HEAP (PRIORITY QUEUE)
// ============================================================
// A Heap is a complete binary tree where every parent is
// smaller (Min-Heap) or larger (Max-Heap) than its children.
// Used to efficiently get the min/max element.
// ============================================================

// ============================================================
// 🔹 WHAT IS A HEAP?
// ============================================================
//
// Min-Heap: Parent <= Children (root is the MINIMUM)
//          1
//        /   \
//       3     5
//      / \   /
//     7   4  8
//
// Max-Heap: Parent >= Children (root is the MAXIMUM)
//          8
//        /   \
//       7     5
//      / \   /
//     3   4  1
//
// KEY PROPERTY: Only the root is guaranteed to be min/max.
// The rest is NOT fully sorted!
//
// STORED AS AN ARRAY (not a tree with pointers!):
// [1, 3, 5, 7, 4, 8]
//
// For index i:
//   Left child:  2*i + 1
//   Right child: 2*i + 2
//   Parent:      Math.floor((i-1) / 2)

// ============================================================
// 🔹 HEAP OPERATIONS & TIME COMPLEXITY
// ============================================================
/*
┌──────────────────┬──────────────┐
│ Operation        │ Time         │
├──────────────────┼──────────────┤
│ Insert           │ O(log n)     │
│ Extract Min/Max  │ O(log n)     │
│ Peek Min/Max     │ O(1)         │
│ Build Heap       │ O(n)         │
│ Heapify (sift)   │ O(log n)     │
│ Delete arbitrary │ O(log n)     │
│ Search           │ O(n)         │
└──────────────────┴──────────────┘
*/

// ============================================================
// 🔹 MIN-HEAP IMPLEMENTATION ⭐
// ============================================================
class MinHeap {
  constructor() {
    this.heap = [];
  }

  // Helper methods
  size()    { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
  peek()    { return this.heap[0]; } // O(1) — Get minimum

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i)   { return 2 * i + 1; }
  right(i)  { return 2 * i + 2; }

  swap(i, j) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  // INSERT — O(log n)
  // Add to end, then "bubble up" (sift up)
  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  _siftUp(i) {
    while (i > 0 && this.heap[i] < this.heap[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  // EXTRACT MIN — O(log n)
  // Swap root with last, remove last, then "sink down" (sift down)
  pop() {
    if (this.isEmpty()) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return min;
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const l = this.left(i);
      const r = this.right(i);

      if (l < n && this.heap[l] < this.heap[smallest]) smallest = l;
      if (r < n && this.heap[r] < this.heap[smallest]) smallest = r;

      if (smallest === i) break;
      this.swap(i, smallest);
      i = smallest;
    }
  }
}

// Usage:
// const heap = new MinHeap();
// heap.push(5); heap.push(3); heap.push(7); heap.push(1);
// heap.peek(); // 1
// heap.pop();  // 1
// heap.peek(); // 3

// ============================================================
// 🔹 MAX-HEAP IMPLEMENTATION
// ============================================================
// Same as MinHeap but reverse the comparisons
class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size()    { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
  peek()    { return this.heap[0]; }

  parent(i) { return Math.floor((i - 1) / 2); }
  left(i)   { return 2 * i + 1; }
  right(i)  { return 2 * i + 2; }
  swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }

  push(val) {
    this.heap.push(val);
    this._siftUp(this.heap.length - 1);
  }

  _siftUp(i) {
    while (i > 0 && this.heap[i] > this.heap[this.parent(i)]) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const max = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._siftDown(0);
    }
    return max;
  }

  _siftDown(i) {
    const n = this.heap.length;
    while (true) {
      let largest = i;
      const l = this.left(i);
      const r = this.right(i);

      if (l < n && this.heap[l] > this.heap[largest]) largest = l;
      if (r < n && this.heap[r] > this.heap[largest]) largest = r;

      if (largest === i) break;
      this.swap(i, largest);
      i = largest;
    }
  }
}

// ============================================================
// 🔹 GENERIC HEAP (Custom Comparator)
// ============================================================
// For sorting by custom criteria (e.g., objects, tuples)
class Heap {
  constructor(comparator = (a, b) => a - b) {
    this.heap = [];
    this.compare = comparator;
  }

  size()    { return this.heap.length; }
  isEmpty() { return this.heap.length === 0; }
  peek()    { return this.heap[0]; }
  parent(i) { return Math.floor((i - 1) / 2); }
  left(i)   { return 2 * i + 1; }
  right(i)  { return 2 * i + 2; }
  swap(i, j) { [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]; }

  push(val) {
    this.heap.push(val);
    let i = this.heap.length - 1;
    while (i > 0 && this.compare(this.heap[i], this.heap[this.parent(i)]) < 0) {
      this.swap(i, this.parent(i));
      i = this.parent(i);
    }
  }

  pop() {
    if (this.isEmpty()) return undefined;
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      let i = 0;
      while (true) {
        let best = i;
        const l = this.left(i), r = this.right(i);
        if (l < this.heap.length && this.compare(this.heap[l], this.heap[best]) < 0) best = l;
        if (r < this.heap.length && this.compare(this.heap[r], this.heap[best]) < 0) best = r;
        if (best === i) break;
        this.swap(i, best);
        i = best;
      }
    }
    return top;
  }
}

// Usage with custom comparator:
// Min-Heap: new Heap((a, b) => a - b);
// Max-Heap: new Heap((a, b) => b - a);
// Sort by second element: new Heap((a, b) => a[1] - b[1]);

// ============================================================
// 🔹 WHEN TO USE A HEAP? ⭐
// ============================================================
/*
1. Top K Elements      → "K largest", "K most frequent"
2. K-th Largest/Smallest → Use a heap of size K
3. Merge K Sorted Lists  → Push heads of all lists
4. Median of Stream     → Two heaps (max + min)
5. Dijkstra's Algorithm → Shortest path with priority queue
6. Task Scheduler       → Process highest priority first
7. Huffman Coding       → Greedy algorithm
*/

// ============================================================
// 🔹 CLASSIC HEAP PROBLEMS
// ============================================================

// --- 1. Kth Largest Element ---
function findKthLargest(nums, k) {
  const minHeap = new MinHeap();
  for (const num of nums) {
    minHeap.push(num);
    if (minHeap.size() > k) {
      minHeap.pop(); // Remove smallest, keep k largest
    }
  }
  return minHeap.peek(); // The k-th largest
}
// [3,2,1,5,6,4], k=2 → 5

// --- 2. Top K Frequent Elements ---
function topKFrequent(nums, k) {
  const freq = {};
  for (const num of nums) freq[num] = (freq[num] || 0) + 1;

  // Min-heap of size k, ordered by frequency
  const heap = new Heap((a, b) => a[1] - b[1]);
  for (const [num, count] of Object.entries(freq)) {
    heap.push([Number(num), count]);
    if (heap.size() > k) heap.pop();
  }

  return heap.heap.map(([num]) => num);
}

// --- 3. Merge K Sorted Lists ---
function mergeKLists(lists) {
  const heap = new Heap((a, b) => a.val - b.val);

  // Push first node of each list
  for (const list of lists) {
    if (list) heap.push(list);
  }

  const dummy = { next: null };
  let current = dummy;

  while (!heap.isEmpty()) {
    const node = heap.pop();
    current.next = node;
    current = current.next;
    if (node.next) heap.push(node.next);
  }

  return dummy.next;
}

// --- 4. Find Median from Data Stream (Two Heaps) ---
class MedianFinder {
  constructor() {
    this.maxHeap = new MaxHeap(); // Lower half
    this.minHeap = new MinHeap(); // Upper half
  }

  addNum(num) {
    this.maxHeap.push(num);
    this.minHeap.push(this.maxHeap.pop());

    if (this.minHeap.size() > this.maxHeap.size()) {
      this.maxHeap.push(this.minHeap.pop());
    }
  }

  findMedian() {
    if (this.maxHeap.size() > this.minHeap.size()) {
      return this.maxHeap.peek();
    }
    return (this.maxHeap.peek() + this.minHeap.peek()) / 2;
  }
}

// ============================================================
// 🔹 HEAP vs SORTING
// ============================================================
/*
Need top K elements from n elements?

Approach 1: Sort → O(n log n) + get K → Total: O(n log n)
Approach 2: Heap of size K → O(n log k)

When k << n, heap is MUCH faster!
For k = 10, n = 1,000,000:
  Sort: ~20,000,000 operations
  Heap: ~200,000 operations (100x faster!)
*/

// ============================================================
// 🔹 HEAP vs OTHER DATA STRUCTURES
// ============================================================
/*
┌────────────────────────┬────────┬───────┬──────────┐
│                        │ Heap   │ Sorted│ Unsorted │
│                        │        │ Array │ Array    │
├────────────────────────┼────────┼───────┼──────────┤
│ Get Min/Max            │ O(1)   │ O(1)  │ O(n)     │
│ Insert                 │O(log n)│ O(n)  │ O(1)     │
│ Delete Min/Max         │O(log n)│ O(1)  │ O(n)     │
│ Search                 │ O(n)   │O(logn)│ O(n)     │
└────────────────────────┴────────┴───────┴──────────┘

Heap is the best when you need FREQUENT insert + get min/max.
*/

console.log("✅ Heap — Efficiently track min/max elements!");
