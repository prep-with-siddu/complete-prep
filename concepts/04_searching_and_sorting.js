// ============================================================
// 📘 CONCEPT 4: SEARCHING & SORTING ALGORITHMS
// ============================================================
// The two most fundamental algorithmic categories.
// Sorting makes many problems easier to solve.
// Searching is how we find what we need efficiently.
// ============================================================

// ============================================================
// ━━━━━━━━━━ PART 1: SEARCHING ALGORITHMS ━━━━━━━━━━
// ============================================================

// ============================================================
// 🔹 1. LINEAR SEARCH — O(n)
// ============================================================
// Check every element one by one.
// Works on UNSORTED arrays.
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
// Best: O(1) — found at first position
// Worst: O(n) — found at last or not found
// When to use: Small arrays, unsorted data

// ============================================================
// 🔹 2. BINARY SEARCH — O(log n) ⭐
// ============================================================
// Halve the search space each step.
// ⚠️ REQUIRES SORTED ARRAY!
function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
// For n = 1,000,000 → only ~20 comparisons!
// Detailed exploration in Concept 08 (Binary Search)

// ============================================================
// ━━━━━━━━━━ PART 2: SORTING ALGORITHMS ━━━━━━━━━━
// ============================================================
//
// WHY LEARN SORTING?
// - Many problems become easier on sorted data
// - Frequently asked in interviews
// - Foundation for binary search, merge, greedy algorithms
//
// Two Categories:
// 1. COMPARISON-BASED: Compare elements (minimum O(n log n))
// 2. NON-COMPARISON: Use element properties (can be O(n))

// ============================================================
// 🔹 1. BUBBLE SORT — O(n²) — The Simplest
// ============================================================
// Repeatedly swap adjacent elements if they're in wrong order.
// Largest elements "bubble" to the end.
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break; // Optimization: already sorted
  }
  return arr;
}
// Time: O(n²) worst/avg, O(n) best (already sorted with optimization)
// Space: O(1) — in-place
// Stable: YES (equal elements maintain relative order)

// ============================================================
// 🔹 2. SELECTION SORT — O(n²) — Find Minimum Each Time
// ============================================================
// Find the smallest element, put it at the beginning.
// Repeat for the rest.
function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIndex = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIndex]) minIndex = j;
    }
    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
    }
  }
  return arr;
}
// Time: O(n²) always (even if sorted)
// Space: O(1)
// Stable: NO (can change order of equal elements)

// ============================================================
// 🔹 3. INSERTION SORT — O(n²) — Like Sorting Cards
// ============================================================
// Take each element and INSERT it into its correct position
// in the already-sorted portion.
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    const key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j]; // Shift right
      j--;
    }
    arr[j + 1] = key; // Insert at correct position
  }
  return arr;
}
// Time: O(n²) worst/avg, O(n) best (nearly sorted)
// Space: O(1)
// Stable: YES
// Best for: Small arrays, nearly sorted data

// ============================================================
// 🔹 4. MERGE SORT — O(n log n) — Divide & Conquer ⭐
// ============================================================
// Split array in half, sort each half, merge them back.
function mergeSort(arr) {
  if (arr.length <= 1) return arr;

  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));

  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}
// Time: O(n log n) ALWAYS — guaranteed!
// Space: O(n) — needs extra array for merging
// Stable: YES
// Best for: Linked lists, external sorting, when stability needed

// ============================================================
// 🔹 5. QUICK SORT — O(n log n) avg — The Fastest in Practice ⭐
// ============================================================
// Pick a PIVOT, partition around it, recursive sort.
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high]; // Choose last element as pivot
  let i = low - 1;

  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }

  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}
// Time: O(n log n) avg, O(n²) worst (already sorted + bad pivot)
// Space: O(log n) — call stack
// Stable: NO
// Best for: General purpose, in-place sorting, cache-friendly

// ============================================================
// 🔹 6. HEAP SORT — O(n log n) — Using a Heap
// ============================================================
function heapSort(arr) {
  const n = arr.length;

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]]; // Move max to end
    heapify(arr, i, 0); // Heapify reduced heap
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;

  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}
// Time: O(n log n) always
// Space: O(1) — in-place!
// Stable: NO
// Best for: When O(1) space + guaranteed O(n log n) needed

// ============================================================
// 🔹 7. COUNTING SORT — O(n + k) — Non-Comparison
// ============================================================
// Count occurrences of each value. Only works for integers.
function countingSort(arr) {
  if (arr.length === 0) return arr;
  const max = Math.max(...arr);
  const min = Math.min(...arr);
  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length);

  // Count occurrences
  for (const num of arr) count[num - min]++;

  // Cumulative count (for stability)
  for (let i = 1; i < range; i++) count[i] += count[i - 1];

  // Build output (traverse backwards for stability)
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}
// Time: O(n + k) where k = range of values
// Space: O(n + k)
// Best for: Small range of integers

// ============================================================
// 🔹 JAVASCRIPT'S BUILT-IN SORT
// ============================================================
// JS uses TimSort (Hybrid of Merge Sort + Insertion Sort)
// ⚠️ Default sort is LEXICOGRAPHIC (alphabetical), not numerical!

const nums = [10, 9, 8, 100];
nums.sort();              // [10, 100, 8, 9] ← WRONG for numbers!
nums.sort((a, b) => a - b); // [8, 9, 10, 100] ← CORRECT ascending
nums.sort((a, b) => b - a); // [100, 10, 9, 8] ← Descending

// Sorting objects by property
const people = [{ name: "Charlie", age: 30 }, { name: "Alice", age: 25 }];
people.sort((a, b) => a.age - b.age);       // Sort by age ascending
people.sort((a, b) => a.name.localeCompare(b.name)); // Sort by name

// ============================================================
// 🔹 SORTING COMPARISON TABLE
// ============================================================
/*
┌──────────────────┬──────────┬──────────┬──────────┬───────┬────────┐
│ Algorithm        │ Best     │ Average  │ Worst    │ Space │ Stable │
├──────────────────┼──────────┼──────────┼──────────┼───────┼────────┤
│ Bubble Sort      │ O(n)     │ O(n²)    │ O(n²)    │ O(1)  │ Yes    │
│ Selection Sort   │ O(n²)    │ O(n²)    │ O(n²)    │ O(1)  │ No     │
│ Insertion Sort   │ O(n)     │ O(n²)    │ O(n²)    │ O(1)  │ Yes    │
│ Merge Sort       │ O(nlogn) │ O(nlogn) │ O(nlogn) │ O(n)  │ Yes    │
│ Quick Sort       │ O(nlogn) │ O(nlogn) │ O(n²)    │O(logn)│ No     │
│ Heap Sort        │ O(nlogn) │ O(nlogn) │ O(nlogn) │ O(1)  │ No     │
│ Counting Sort    │ O(n+k)   │ O(n+k)   │ O(n+k)   │O(n+k) │ Yes    │
│ JS .sort()       │ O(nlogn) │ O(nlogn) │ O(nlogn) │ O(n)  │ Yes    │
└──────────────────┴──────────┴──────────┴──────────┴───────┴────────┘
*/

// ============================================================
// 🔹 WHEN TO USE WHICH SORT?
// ============================================================
/*
✅ Small array (n < 50)      → Insertion Sort
✅ Need stability             → Merge Sort
✅ General purpose            → Quick Sort (most languages' default)
✅ Guaranteed O(n log n)      → Merge Sort or Heap Sort
✅ Limited memory             → Heap Sort (O(1) space)
✅ Small integer range        → Counting Sort
✅ Nearly sorted data         → Insertion Sort
✅ In interviews / LeetCode   → Just use .sort((a,b) => a-b) 😄
*/

// ============================================================
// 🔹 IMPORTANT: STABILITY IN SORTING
// ============================================================
// A sorting algorithm is STABLE if equal elements maintain
// their original relative order after sorting.
//
// Example: Sort by age → [{name:"Bob", age:25}, {name:"Alice", age:25}]
// Stable:   Bob stays before Alice (original order preserved)
// Unstable: Alice might come before Bob

console.log("✅ Searching & Sorting — Foundation of efficient algorithms!");
