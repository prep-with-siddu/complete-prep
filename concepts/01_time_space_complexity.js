// ============================================================
// 📘 CONCEPT 1: TIME & SPACE COMPLEXITY
// ============================================================
// Understanding how to measure algorithm efficiency
// Before solving ANY DSA problem, you MUST understand this.
// ============================================================

// ============================================================
// 🔹 WHAT IS TIME COMPLEXITY?
// ============================================================
// Time Complexity = How the runtime of an algorithm grows
//                   as the input size (n) increases.
//
// We use BIG-O NOTATION to describe this.
// Big-O gives the WORST CASE scenario.
//
// Think of it as: "If I double the input, how much slower does it get?"

// ============================================================
// 🔹 COMMON TIME COMPLEXITIES (Best to Worst)
// ============================================================
//
// O(1)        → Constant     → Doesn't depend on input size
// O(log n)    → Logarithmic  → Halving the problem each step (Binary Search)
// O(n)        → Linear       → Visit every element once
// O(n log n)  → Linearithmic → Efficient sorting (Merge Sort, Quick Sort)
// O(n²)       → Quadratic    → Nested loops (Bubble Sort)
// O(n³)       → Cubic        → Triple nested loops
// O(2ⁿ)       → Exponential  → Recursion without memoization (Fibonacci naive)
// O(n!)       → Factorial    → Permutations

// ============================================================
// 🔹 EXAMPLES OF EACH COMPLEXITY
// ============================================================

// --- O(1) - Constant Time ---
// No matter the size of input, it takes the same time
function getFirst(arr) {
  return arr[0]; // Always 1 operation
}
// Accessing array by index, hash map lookup, push/pop from stack

// --- O(log n) - Logarithmic Time ---
// Problem size is halved each step
function binarySearchExample(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// Each iteration cuts the search space in half
// For n = 1000, only ~10 steps needed (log₂1000 ≈ 10)

// --- O(n) - Linear Time ---
// Visit every element once
function findMax(arr) {
  let max = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
  }
  return max;
}
// If n doubles, time doubles

// --- O(n log n) - Linearithmic Time ---
// Most efficient comparison-based sorting
function mergeSortExample(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSortExample(arr.slice(0, mid));
  const right = mergeSortExample(arr.slice(mid));
  return merge(left, right);
}
function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// --- O(n²) - Quadratic Time ---
// Nested loops over the same data
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {       // n times
    for (let j = 0; j < arr.length - 1; j++) { // n times
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
  return arr;
}
// If n doubles, time quadruples!

// --- O(2ⁿ) - Exponential Time ---
// Each call branches into 2 more calls
function fibNaive(n) {
  if (n <= 1) return n;
  return fibNaive(n - 1) + fibNaive(n - 2);
}
// For n = 40, this makes ~1 billion calls!

// --- O(n!) - Factorial Time ---
// Generate all permutations
function permutations(arr, start = 0, result = []) {
  if (start === arr.length) {
    result.push([...arr]);
    return;
  }
  for (let i = start; i < arr.length; i++) {
    [arr[start], arr[i]] = [arr[i], arr[start]];
    permutations(arr, start + 1, result);
    [arr[start], arr[i]] = [arr[i], arr[start]];
  }
  return result;
}

// ============================================================
// 🔹 WHAT IS SPACE COMPLEXITY?
// ============================================================
// Space Complexity = How much EXTRA memory does the algorithm use
//                    as the input grows?
//
// We DON'T count the input itself, only EXTRA space.

// --- O(1) Space ---
function sum(arr) {
  let total = 0; // Only 1 variable, regardless of input size
  for (let num of arr) total += num;
  return total;
}

// --- O(n) Space ---
function duplicate(arr) {
  const copy = [...arr]; // Creates a new array of size n
  return copy;
}

// --- O(n) Space (Recursion) ---
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
  // Each call adds a frame to the CALL STACK
  // n calls = O(n) space
}

// ============================================================
// 🔹 HOW TO CALCULATE TIME COMPLEXITY
// ============================================================
//
// RULES:
// 1. DROP CONSTANTS    → O(2n) becomes O(n)
// 2. DROP LOWER TERMS  → O(n² + n) becomes O(n²)
// 3. DIFFERENT INPUTS  → Use different variables
//                        O(a + b) NOT O(n)
//
// PATTERNS TO RECOGNIZE:
//
// Single loop            → O(n)
// Nested loops (same)    → O(n²)
// Loop halving input     → O(log n)
// Loop inside loop halve → O(n log n)
// Recursive (2 calls)    → O(2ⁿ)
// Recursive (1 call)     → O(n)

// ============================================================
// 🔹 PRACTICAL GUIDE: WHAT'S ACCEPTABLE?
// ============================================================
//
// Given n (input size), what complexity is acceptable?
//
// n ≤ 10       → O(n!) or O(2ⁿ)    — Brute force OK
// n ≤ 20       → O(2ⁿ)              — Backtracking
// n ≤ 100      → O(n³)              — Triple loops
// n ≤ 1,000    → O(n²)              — Double loops
// n ≤ 100,000  → O(n log n)         — Sorting
// n ≤ 10⁶      → O(n)               — Linear scan
// n ≤ 10⁹      → O(log n) or O(1)   — Math/Binary Search
//
// LeetCode typically allows ~10⁸ operations per second.

// ============================================================
// 🔹 AMORTIZED TIME COMPLEXITY
// ============================================================
// Some operations are USUALLY fast but OCCASIONALLY slow.
// Example: Dynamic array (ArrayList / JS Array push)
//
// push() is O(1) most of the time
// But when array is full → it doubles size → copies everything → O(n)
// Over n operations, the average per operation is still O(1)
// This is called AMORTIZED O(1)

// ============================================================
// 🔹 CHEAT SHEET SUMMARY
// ============================================================
/*
┌─────────────────────────────────────────────────────────────┐
│ DATA STRUCTURE          │ ACCESS │ SEARCH │ INSERT │ DELETE │
├─────────────────────────┼────────┼────────┼────────┼────────┤
│ Array                   │ O(1)   │ O(n)   │ O(n)   │ O(n)  │
│ Stack                   │ O(n)   │ O(n)   │ O(1)   │ O(1)  │
│ Queue                   │ O(n)   │ O(n)   │ O(1)   │ O(1)  │
│ Linked List             │ O(n)   │ O(n)   │ O(1)   │ O(1)  │
│ Hash Table              │ –      │ O(1)   │ O(1)   │ O(1)  │
│ Binary Search Tree      │ O(logn)│ O(logn)│ O(logn)│O(logn)│
│ Heap                    │ –      │ O(n)   │O(logn) │O(logn)│
│ Trie                    │ –      │ O(m)   │ O(m)   │ O(m)  │
├─────────────────────────┼────────┼────────┼────────┼────────┤
│ SORTING ALGORITHM       │ BEST   │ AVG    │ WORST  │ SPACE │
├─────────────────────────┼────────┼────────┼────────┼────────┤
│ Bubble Sort             │ O(n)   │ O(n²)  │ O(n²)  │ O(1)  │
│ Selection Sort          │ O(n²)  │ O(n²)  │ O(n²)  │ O(1)  │
│ Insertion Sort          │ O(n)   │ O(n²)  │ O(n²)  │ O(1)  │
│ Merge Sort              │O(nlogn)│O(nlogn)│O(nlogn)│ O(n)  │
│ Quick Sort              │O(nlogn)│O(nlogn)│ O(n²)  │O(logn)│
│ Heap Sort               │O(nlogn)│O(nlogn)│O(nlogn)│ O(1)  │
│ Counting Sort           │ O(n+k) │ O(n+k) │ O(n+k) │O(n+k)│
└─────────────────────────┴────────┴────────┴────────┴───────┘
*/

console.log("✅ Time & Space Complexity — Foundation of DSA!");
