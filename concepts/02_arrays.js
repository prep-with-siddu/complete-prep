// ============================================================
// 📘 CONCEPT 2: ARRAYS — The Foundation of DSA
// ============================================================
// Arrays are the most fundamental data structure.
// Almost every DSA topic builds on top of arrays.
// ============================================================

// ============================================================
// 🔹 WHAT IS AN ARRAY?
// ============================================================
// An array is a CONTIGUOUS block of memory that stores elements
// of the same type, accessible by INDEX (0-based in JS).
//
// Key Properties:
// - Fixed size (in most languages, JS arrays are dynamic)
// - Random access in O(1) — go directly to any index
// - Elements are stored next to each other in memory
// - Insertion/Deletion in the middle is O(n) (shifting required)

// ============================================================
// 🔹 CREATING ARRAYS IN JAVASCRIPT
// ============================================================

// Literal
const arr1 = [1, 2, 3, 4, 5];

// Using constructor
const arr2 = new Array(5);       // [empty × 5]
const arr3 = new Array(5).fill(0); // [0, 0, 0, 0, 0]

// Using Array.from
const arr4 = Array.from({ length: 5 }, (_, i) => i);     // [0, 1, 2, 3, 4]
const arr5 = Array.from({ length: 5 }, (_, i) => i * 2); // [0, 2, 4, 6, 8]

// 2D Array (Matrix)
const matrix = Array.from({ length: 3 }, () => new Array(3).fill(0));
// [[0,0,0], [0,0,0], [0,0,0]]

// ============================================================
// 🔹 IMPORTANT ARRAY METHODS (MUST KNOW FOR DSA)
// ============================================================

// ─────────────────────────────────────
// 1. push() / pop() — End operations — O(1)
// ─────────────────────────────────────
let a = [1, 2, 3];
a.push(4);      // [1, 2, 3, 4]  — Add to END
a.pop();        // [1, 2, 3]     — Remove from END (returns 4)

// ─────────────────────────────────────
// 2. unshift() / shift() — Start operations — O(n) ⚠️
// ─────────────────────────────────────
a.unshift(0);   // [0, 1, 2, 3]  — Add to START (shifts everything right)
a.shift();      // [1, 2, 3]     — Remove from START (shifts everything left)
// ⚠️ AVOID in performance-critical code — O(n) because of shifting!

// ─────────────────────────────────────
// 3. splice(start, deleteCount, ...items) — O(n)
// ─────────────────────────────────────
// THE Swiss Army knife — Insert, Delete, Replace at any position
let b = [1, 2, 3, 4, 5];
b.splice(2, 1);        // Remove 1 element at index 2 → [1, 2, 4, 5]
b.splice(1, 0, 10);    // Insert 10 at index 1         → [1, 10, 2, 4, 5]
b.splice(0, 2, 99);    // Replace first 2 with 99      → [99, 2, 4, 5]

// ─────────────────────────────────────
// 4. slice(start, end) — O(n) — Returns a COPY (non-destructive)
// ─────────────────────────────────────
const c = [1, 2, 3, 4, 5];
c.slice(1, 3);    // [2, 3]     — From index 1 to 3 (exclusive)
c.slice(-2);      // [4, 5]     — Last 2 elements
c.slice();        // [1,2,3,4,5] — Shallow copy of entire array

// ─────────────────────────────────────
// 5. concat() — O(n+m) — Merge arrays (non-destructive)
// ─────────────────────────────────────
const d = [1, 2].concat([3, 4]); // [1, 2, 3, 4]
// OR use spread: const e = [...[1,2], ...[3,4]];

// ─────────────────────────────────────
// 6. indexOf() / lastIndexOf() / includes() — O(n) — Search
// ─────────────────────────────────────
const f = [10, 20, 30, 20, 40];
f.indexOf(20);      // 1  — First occurrence
f.lastIndexOf(20);  // 3  — Last occurrence
f.indexOf(99);      // -1 — Not found
f.includes(30);     // true — Boolean check

// ─────────────────────────────────────
// 7. find() / findIndex() — O(n) — Search with condition
// ─────────────────────────────────────
const g = [5, 12, 8, 130, 44];
g.find(x => x > 10);      // 12       — First element matching condition
g.findIndex(x => x > 10); // 1        — Index of first match
g.find(x => x > 200);     // undefined — Not found

// ─────────────────────────────────────
// 8. filter() — O(n) — Get ALL elements matching condition
// ─────────────────────────────────────
const h = [1, 2, 3, 4, 5, 6];
h.filter(x => x % 2 === 0); // [2, 4, 6] — All even numbers

// ─────────────────────────────────────
// 9. map() — O(n) — Transform every element
// ─────────────────────────────────────
const i = [1, 2, 3];
i.map(x => x * 2);        // [2, 4, 6]
i.map((val, idx) => val + idx); // [1, 3, 5] — Can use index too

// ─────────────────────────────────────
// 10. reduce() — O(n) — Reduce array to single value ⭐
// ─────────────────────────────────────
const j = [1, 2, 3, 4];
j.reduce((acc, cur) => acc + cur, 0);         // 10 — Sum
j.reduce((acc, cur) => acc * cur, 1);         // 24 — Product
j.reduce((acc, cur) => Math.max(acc, cur), -Infinity); // 4 — Max

// ─────────────────────────────────────
// 11. sort() — O(n log n) — ⚠️ TRICKY IN JS
// ─────────────────────────────────────
const k = [3, 1, 4, 1, 5, 9];
k.sort();              // [1, 1, 3, 4, 5, 9] — Default: lexicographic!
// ⚠️ WARNING: [10, 9, 8].sort() gives [10, 8, 9]!
// Always use a comparator for numbers:
k.sort((a, b) => a - b); // Ascending: [1, 1, 3, 4, 5, 9]
k.sort((a, b) => b - a); // Descending: [9, 5, 4, 3, 1, 1]

// ─────────────────────────────────────
// 12. reverse() — O(n) — Reverses in place
// ─────────────────────────────────────
[1, 2, 3].reverse(); // [3, 2, 1]

// ─────────────────────────────────────
// 13. join() / toString() — O(n)
// ─────────────────────────────────────
[1, 2, 3].join('-');    // "1-2-3"
[1, 2, 3].join('');     // "123"
[1, 2, 3].toString();   // "1,2,3"

// ─────────────────────────────────────
// 14. every() / some() — O(n) — Boolean checks
// ─────────────────────────────────────
[2, 4, 6].every(x => x % 2 === 0); // true  — ALL are even
[1, 2, 3].some(x => x > 2);        // true  — AT LEAST ONE > 2

// ─────────────────────────────────────
// 15. flat() / flatMap() — Flatten nested arrays
// ─────────────────────────────────────
[1, [2, [3]]].flat();       // [1, 2, [3]]
[1, [2, [3]]].flat(Infinity); // [1, 2, 3] — Fully flatten
[[1,2],[3,4]].flatMap(x => x); // [1, 2, 3, 4]

// ─────────────────────────────────────
// 16. fill() — O(n) — Fill with a value
// ─────────────────────────────────────
new Array(5).fill(0);          // [0, 0, 0, 0, 0]
[1, 2, 3, 4].fill(0, 1, 3);   // [1, 0, 0, 4] — fill from idx 1 to 3

// ─────────────────────────────────────
// 17. Array.isArray() — Check if something is an array
// ─────────────────────────────────────
Array.isArray([1, 2]); // true
Array.isArray("hi");   // false

// ─────────────────────────────────────
// 18. Spread & Destructuring — ES6+ 
// ─────────────────────────────────────
const [first, second, ...rest] = [1, 2, 3, 4, 5];
// first = 1, second = 2, rest = [3, 4, 5]
const copy = [...[1, 2, 3]]; // Shallow copy
const merged = [...[1, 2], ...[3, 4]]; // [1, 2, 3, 4]

// ============================================================
// 🔹 COMMON ARRAY PATTERNS IN DSA
// ============================================================

// Pattern 1: Two Pointers
function twoSum(arr, target) {
  // Array must be SORTED for this approach
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return [-1, -1];
}

// Pattern 2: Sliding Window
function maxSubarraySum(arr, k) {
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i]; // First window
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k]; // Slide: add right, remove left
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}

// Pattern 3: Prefix Sum
function prefixSum(arr) {
  const prefix = [0];
  for (let i = 0; i < arr.length; i++) {
    prefix.push(prefix[i] + arr[i]);
  }
  // Sum from index i to j = prefix[j+1] - prefix[i]
  return prefix;
}

// Pattern 4: Kadane's Algorithm — Maximum Subarray Sum
function maxSubArray(nums) {
  let maxSoFar = nums[0];
  let maxEndingHere = nums[0];
  for (let i = 1; i < nums.length; i++) {
    maxEndingHere = Math.max(nums[i], maxEndingHere + nums[i]);
    maxSoFar = Math.max(maxSoFar, maxEndingHere);
  }
  return maxSoFar;
}

// Pattern 5: Frequency Counter (using Map)
function countFrequency(arr) {
  const freq = new Map();
  for (const num of arr) {
    freq.set(num, (freq.get(num) || 0) + 1);
  }
  return freq;
}

// ============================================================
// 🔹 WHEN TO USE ARRAYS vs OTHER STRUCTURES
// ============================================================
/*
✅ Use Arrays When:
   - Need random access by index
   - Order matters
   - Iterating through all elements
   - Input is already given as an array

❌ Avoid Arrays When:
   - Frequent insertions/deletions in the middle → Use Linked List
   - Need fast lookups by value → Use Hash Map/Set
   - Need min/max quickly → Use Heap
   - Need LIFO/FIFO behavior → Use Stack/Queue
*/

// ============================================================
// 🔹 COMPLEXITY SUMMARY
// ============================================================
/*
┌───────────────────────┬──────────────┐
│ Operation             │ Time         │
├───────────────────────┼──────────────┤
│ Access by index       │ O(1)         │
│ push / pop            │ O(1)         │
│ shift / unshift       │ O(n)         │
│ splice (middle)       │ O(n)         │
│ indexOf / includes    │ O(n)         │
│ find / filter / map   │ O(n)         │
│ sort                  │ O(n log n)   │
│ slice / concat        │ O(n)         │
│ reduce                │ O(n)         │
└───────────────────────┴──────────────┘
*/

console.log("✅ Arrays — The building block of all DSA!");
