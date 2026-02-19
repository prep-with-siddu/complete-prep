// ============================================================
// 📘 CONCEPT 3: RECURSION
// ============================================================
// Recursion = A function that calls ITSELF to solve
//             smaller subproblems until it hits a base case.
// ============================================================

// ============================================================
// 🔹 THE 3 RULES OF RECURSION
// ============================================================
// 1. BASE CASE     → When to STOP (prevents infinite loop)
// 2. RECURSIVE CASE → The function calls itself with a SMALLER input
// 3. PROGRESS       → Each call must move TOWARD the base case

// ============================================================
// 🔹 HOW RECURSION WORKS — THE CALL STACK
// ============================================================
//
// When a function calls itself, each call is pushed onto the CALL STACK.
// Once the base case is hit, the calls start returning (UNWINDING).
//
// Example: factorial(4)
//
// CALL STACK (growing):
//   factorial(4) → waits for factorial(3)
//     factorial(3) → waits for factorial(2)
//       factorial(2) → waits for factorial(1)
//         factorial(1) → returns 1 (BASE CASE!)
//
// UNWINDING (returning):
//       factorial(2) → returns 2 * 1 = 2
//     factorial(3) → returns 3 * 2 = 6
//   factorial(4) → returns 4 * 6 = 24

// ============================================================
// 🔹 BASIC EXAMPLES
// ============================================================

// --- Example 1: Factorial ---
// n! = n × (n-1) × (n-2) × ... × 1
function factorial(n) {
  // Base case
  if (n <= 1) return 1;
  // Recursive case
  return n * factorial(n - 1);
}
// factorial(5) = 5 * 4 * 3 * 2 * 1 = 120
// Time: O(n), Space: O(n) — call stack depth

// --- Example 2: Fibonacci ---
// fib(n) = fib(n-1) + fib(n-2)
function fibonacci(n) {
  if (n <= 0) return 0;
  if (n === 1) return 1;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
// ⚠️ Time: O(2^n) — VERY SLOW! Each call branches into 2.
// This is why we need DP (memoization) — covered in Concept 13.

// --- Example 3: Sum of Array ---
function sumArray(arr, index = 0) {
  if (index === arr.length) return 0; // Base case: empty
  return arr[index] + sumArray(arr, index + 1);
}
// sumArray([1,2,3,4]) = 1 + 2 + 3 + 4 = 10

// --- Example 4: Power / Exponentiation ---
function power(base, exp) {
  if (exp === 0) return 1;
  return base * power(base, exp - 1);
}
// power(2, 3) = 2 * 2 * 2 = 8

// Fast Power — O(log n) instead of O(n)
function fastPower(base, exp) {
  if (exp === 0) return 1;
  if (exp % 2 === 0) {
    const half = fastPower(base, exp / 2);
    return half * half;
  } else {
    return base * fastPower(base, exp - 1);
  }
}

// ============================================================
// 🔹 RECURSION ON STRINGS
// ============================================================

// Reverse a String
function reverseString(str) {
  if (str.length <= 1) return str;
  return reverseString(str.slice(1)) + str[0];
}
// reverseString("hello") = reverseString("ello") + "h"
//                        = reverseString("llo") + "e" + "h"
//                        = ... = "olleh"

// Check Palindrome
function isPalindrome(str) {
  if (str.length <= 1) return true;
  if (str[0] !== str[str.length - 1]) return false;
  return isPalindrome(str.slice(1, -1));
}

// ============================================================
// 🔹 RECURSION ON ARRAYS
// ============================================================

// Find Maximum in Array
function findMax(arr, index = 0) {
  if (index === arr.length - 1) return arr[index];
  return Math.max(arr[index], findMax(arr, index + 1));
}

// Check if Array is Sorted
function isSorted(arr, index = 0) {
  if (index === arr.length - 1) return true;
  if (arr[index] > arr[index + 1]) return false;
  return isSorted(arr, index + 1);
}

// ============================================================
// 🔹 TYPES OF RECURSION
// ============================================================

// --- 1. HEAD RECURSION ---
// Recursive call happens BEFORE processing
function headRecursion(n) {
  if (n === 0) return;
  headRecursion(n - 1); // Call first
  console.log(n);        // Process after
}
// Prints: 1, 2, 3, 4, 5

// --- 2. TAIL RECURSION ---
// Recursive call is the LAST thing the function does
function tailRecursion(n) {
  if (n === 0) return;
  console.log(n);        // Process first
  tailRecursion(n - 1);  // Call last
}
// Prints: 5, 4, 3, 2, 1
// Note: Tail recursion CAN be optimized by compilers (TCO)
// But JavaScript engines don't always do this!

// --- 3. TREE RECURSION ---
// Function calls itself MORE THAN ONCE per call
function treeRecursion(n) {
  if (n <= 0) return 0;
  return treeRecursion(n - 1) + treeRecursion(n - 2);
}
// Creates a tree-like call structure → O(2^n)

// --- 4. INDIRECT/MUTUAL RECURSION ---
function isEven(n) {
  if (n === 0) return true;
  return isOdd(n - 1);
}
function isOdd(n) {
  if (n === 0) return false;
  return isEven(n - 1);
}

// ============================================================
// 🔹 RECURSION vs ITERATION
// ============================================================
/*
┌────────────────────┬──────────────────┬──────────────────┐
│                    │ RECURSION        │ ITERATION        │
├────────────────────┼──────────────────┼──────────────────┤
│ Uses               │ Call Stack       │ Loops            │
│ Termination        │ Base Case        │ Loop Condition   │
│ Space              │ O(n) stack       │ O(1) usually     │
│ Readability        │ Often cleaner    │ Sometimes simpler│
│ Risk               │ Stack Overflow   │ Infinite Loop    │
│ Best for           │ Trees, Graphs,   │ Simple linear    │
│                    │ Divide & Conquer │ operations       │
└────────────────────┴──────────────────┴──────────────────┘
*/

// Every recursive solution CAN be converted to iterative (using a stack)
// Example: Factorial iterative
function factorialIterative(n) {
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  return result;
}

// ============================================================
// 🔹 COMMON MISTAKES IN RECURSION
// ============================================================

// ❌ MISTAKE 1: No base case → Stack Overflow!
// function bad(n) { return bad(n - 1); } // CRASHES!

// ❌ MISTAKE 2: Not moving toward base case
// function bad(n) { if (n === 0) return; return bad(n); } // INFINITE!

// ❌ MISTAKE 3: Wrong base case
// function bad(n) { if (n === 1) return 1; return n * bad(n - 1); }
// bad(0) → bad(-1) → bad(-2) → ... STACK OVERFLOW!

// ✅ FIX: Use n <= 1 instead of n === 1

// ============================================================
// 🔹 IMPORTANT RECURSIVE PATTERNS FOR DSA
// ============================================================

// --- Pattern 1: Divide and Conquer ---
// Split the problem in half, solve both, combine results
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return mergeSorted(left, right);
}

function mergeSorted(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return [...result, ...left.slice(i), ...right.slice(j)];
}

// --- Pattern 2: Subsets / Combinations ---
function subsets(nums) {
  const result = [];
  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop(); // UNDO choice (backtrack)
    }
  }
  backtrack(0, []);
  return result;
}
// subsets([1,2,3]) → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]

// --- Pattern 3: Tree Traversal ---
function inorderTraversal(root) {
  if (!root) return [];
  return [
    ...inorderTraversal(root.left),
    root.val,
    ...inorderTraversal(root.right),
  ];
}

// ============================================================
// 🔹 HOW TO THINK RECURSIVELY
// ============================================================
/*
Step-by-step approach:
1. What is the SMALLEST version of this problem? → BASE CASE
2. If I had the solution to a SMALLER version,
   how would I use it to solve the CURRENT version? → RECURSIVE CASE
3. Am I making the problem SMALLER each time? → PROGRESS

Example: "Reverse a linked list"
1. Base case: Empty list or single node → return it
2. If I had the rest of the list reversed,
   I just attach current node to the end.
3. Each call processes one fewer node → YES, progressing.
*/

// ============================================================
// 🔹 RECURSION COMPLEXITY ANALYSIS
// ============================================================
/*
For T(n) = number of calls:

Linear Recursion:  T(n) = T(n-1) + O(1) → O(n)
Binary Recursion:  T(n) = 2T(n-1) + O(1) → O(2^n)
Divide & Conquer:  T(n) = 2T(n/2) + O(n) → O(n log n) [Merge Sort]
Binary Search:     T(n) = T(n/2) + O(1)  → O(log n)

MASTER THEOREM (for T(n) = aT(n/b) + O(n^d)):
  If d < log_b(a) → O(n^log_b(a))
  If d = log_b(a) → O(n^d * log n)
  If d > log_b(a) → O(n^d)
*/

console.log("✅ Recursion — Think in terms of smaller subproblems!");
