/**
 * ============================================================
 *  PATTERN 12: TOP K ELEMENTS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  When you need to find the K largest / smallest / most frequent
 *  elements, you have three main strategies:
 *
 *  1. HEAP (Min-Heap of size K for "top K largest")
 *     • Keep a min-heap of size K — the root is the K-th largest.
 *     • O(n log k) time, O(k) space.
 *
 *  2. QUICKSELECT (Hoare's selection)
 *     • Partition like quicksort, but only recurse into ONE side.
 *     • O(n) average, O(n²) worst. O(1) extra space.
 *
 *  3. BUCKET SORT (for frequency problems)
 *     • Index = frequency, bucket[i] = list of elements with freq i.
 *     • O(n) time when frequency is bounded by array length.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "K largest", "K smallest", "K most frequent".
 *    ✅ "K closest points".
 *    ✅ "Sort array by frequency".
 *    ✅ Any problem asking for TOP K of something.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. For K largest → use MIN-Heap of size K (counter-intuitive!).
 *  2. For K smallest → use MAX-Heap of size K.
 *  3. Bucket sort when frequency ≤ n (often the case).
 *  4. QuickSelect is best when you just need the k-th element (no sorting).
 *  5. Build your own heap in JS (no built-in priority queue).
 *
 * ============================================================
 */

// ── MinHeap utility ────────────────────────────────────────
class MinHeap {
  constructor(compareFn = (a, b) => a - b) {
    this.data = [];
    this.compare = compareFn;
  }
  size() { return this.data.length; }
  peek() { return this.data[0]; }

  push(val) {
    this.data.push(val);
    this._bubbleUp(this.data.length - 1);
  }

  pop() {
    const top = this.data[0];
    const last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      this._sinkDown(0);
    }
    return top;
  }

  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.compare(this.data[i], this.data[parent]) < 0) {
        [this.data[i], this.data[parent]] = [this.data[parent], this.data[i]];
        i = parent;
      } else break;
    }
  }

  _sinkDown(i) {
    const n = this.data.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.compare(this.data[left], this.data[smallest]) < 0) smallest = left;
      if (right < n && this.compare(this.data[right], this.data[smallest]) < 0) smallest = right;
      if (smallest !== i) {
        [this.data[i], this.data[smallest]] = [this.data[smallest], this.data[i]];
        i = smallest;
      } else break;
    }
  }
}

// ────────────────────────────────────────────────────────────
//  12a. KTH LARGEST ELEMENT — LC #215
// ────────────────────────────────────────────────────────────

/**
 * Approach 1: Min-Heap of size K
 * Keep a min-heap of size K. After iterating, the root = K-th largest.
 * O(n log k) time.
 *
 * DRY RUN: [3,2,1,5,6,4], k=2
 *   Push 3 → heap: [3]
 *   Push 2 → heap: [2,3]  (size=2=k, ok)
 *   Push 1 → heap size=3 > k → pop min 1 → heap: [2,3]
 *   Push 5 → pop min 2 → heap: [3,5]
 *   Push 6 → pop min 3 → heap: [5,6]
 *   Push 4 → pop min 4 → heap: [5,6]
 *   Root = 5 ✓ (2nd largest)
 */
function findKthLargest_heap(nums, k) {
  const heap = new MinHeap();

  for (const num of nums) {
    heap.push(num);
    if (heap.size() > k) heap.pop(); // Remove smallest
  }

  return heap.peek(); // Root = K-th largest
}

/**
 * Approach 2: QuickSelect — O(n) average
 * Partition around pivot; recurse into ONE side only.
 */
function findKthLargest_quickselect(nums, k) {
  const targetIndex = nums.length - k; // Convert to k-th smallest

  function quickSelect(left, right) {
    const pivot = nums[right];
    let storeIndex = left;

    for (let i = left; i < right; i++) {
      if (nums[i] <= pivot) {
        [nums[i], nums[storeIndex]] = [nums[storeIndex], nums[i]];
        storeIndex++;
      }
    }
    [nums[storeIndex], nums[right]] = [nums[right], nums[storeIndex]];

    if (storeIndex === targetIndex) return nums[storeIndex];
    if (storeIndex < targetIndex) return quickSelect(storeIndex + 1, right);
    return quickSelect(left, storeIndex - 1);
  }

  return quickSelect(0, nums.length - 1);
}

// ────────────────────────────────────────────────────────────
//  12b. TOP K FREQUENT ELEMENTS — LC #347
// ────────────────────────────────────────────────────────────

/**
 * Approach 1: Bucket Sort — O(n) time.
 * bucket[freq] = list of elements with that frequency.
 * Walk from highest bucket down to collect first K elements.
 */
function topKFrequent(nums, k) {
  const freqMap = new Map();
  for (const num of nums) {
    freqMap.set(num, (freqMap.get(num) || 0) + 1);
  }

  // Bucket: index = frequency, value = array of nums with that frequency
  const bucket = new Array(nums.length + 1).fill(null).map(() => []);
  for (const [num, freq] of freqMap) {
    bucket[freq].push(num);
  }

  // Collect from highest frequency
  const result = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    for (const num of bucket[i]) {
      result.push(num);
      if (result.length === k) break;
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  12c. K CLOSEST POINTS TO ORIGIN — LC #973
// ────────────────────────────────────────────────────────────

/**
 * Use a MAX-Heap of size K (negate distances for min-heap → max behaviour).
 * O(n log k) time, O(k) space.
 */
function kClosest(points, k) {
  // Max-heap: negate distances so min-heap pops "largest distance" first
  const heap = new MinHeap((a, b) => a[0] - b[0]); // min-heap on negated dist

  for (const [x, y] of points) {
    const dist = -(x * x + y * y); // Negate for max-heap behaviour
    heap.push([dist, x, y]);
    if (heap.size() > k) heap.pop(); // Remove the one with smallest negated dist (= largest actual dist)
  }

  return heap.data.map(([_, x, y]) => [x, y]);
}

// ────────────────────────────────────────────────────────────
//  12d. SORT CHARACTERS BY FREQUENCY — LC #451
// ────────────────────────────────────────────────────────────

function frequencySort(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

  // Bucket sort by frequency
  const bucket = new Array(s.length + 1).fill(null).map(() => []);
  for (const [ch, count] of freq) {
    bucket[count].push(ch);
  }

  let result = '';
  for (let i = bucket.length - 1; i >= 0; i--) {
    for (const ch of bucket[i]) {
      result += ch.repeat(i);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  12e. REORGANIZE STRING — LC #767
// ────────────────────────────────────────────────────────────

/**
 * Place the most frequent character first, then alternate.
 * Use a max-heap. If the most frequent char count > ceil(n/2), impossible.
 */
function reorganizeString(s) {
  const freq = new Map();
  for (const ch of s) freq.set(ch, (freq.get(ch) || 0) + 1);

  // Max-heap (negate freq for min-heap)
  const heap = new MinHeap((a, b) => a[0] - b[0]);
  for (const [ch, count] of freq) {
    heap.push([-count, ch]); // Negate for max-heap
  }

  let result = '';
  let prev = [0, '']; // Previous entry [negFreq, char]

  while (heap.size() > 0) {
    const [negFreq, ch] = heap.pop();

    // Push back the previously used character if it still has remaining count
    if (prev[0] < 0) heap.push(prev);

    result += ch;
    prev = [negFreq + 1, ch]; // Used one, so negFreq + 1 (getting closer to 0)
  }

  return result.length === s.length ? result : '';
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== TOP K ELEMENTS ===\n");

console.log("12a-1. Kth Largest (Heap): [3,2,1,5,6,4] k=2 →", findKthLargest_heap([3, 2, 1, 5, 6, 4], 2)); // 5
console.log("12a-2. Kth Largest (QuickSelect):", findKthLargest_quickselect([3, 2, 1, 5, 6, 4], 2)); // 5

console.log("\n12b. Top K Frequent: [1,1,1,2,2,3] k=2 →", topKFrequent([1, 1, 1, 2, 2, 3], 2)); // [1,2]

console.log("\n12c. K Closest Points: [[3,3],[5,-1],[-2,4]] k=2 →", kClosest([[3, 3], [5, -1], [-2, 4]], 2));

console.log("\n12d. Frequency Sort: 'tree' →", frequencySort('tree')); // 'eert' or 'eetr'

console.log("\n12e. Reorganize String: 'aab' →", reorganizeString('aab')); // 'aba'
console.log("     Reorganize String: 'aaab' →", reorganizeString('aaab')); // '' (impossible)

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Kth Largest Element in Array            | Medium     | 215   |
 *  | Top K Frequent Elements                 | Medium     | 347   |
 *  | K Closest Points to Origin              | Medium     | 973   |
 *  | Sort Characters by Frequency            | Medium     | 451   |
 *  | Reorganize String                       | Medium     | 767   |
 *  | Kth Largest in a Stream                 | Easy       | 703   |
 *  | Find K Pairs with Smallest Sums         | Medium     | 373   |
 *  | Task Scheduler                          | Medium     | 621   |
 *  | Kth Smallest in Sorted Matrix           | Medium     | 378   |
 */
