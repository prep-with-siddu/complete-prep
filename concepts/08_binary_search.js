// ============================================================
// 📘 CONCEPT 8: BINARY SEARCH
// ============================================================
// Binary Search is a technique that searches a SORTED array
// by repeatedly dividing the search space in half.
// Time: O(log n) — extremely efficient!
// ============================================================

// ============================================================
// 🔹 WHEN CAN YOU USE BINARY SEARCH?
// ============================================================
// Binary Search applies when:
// 1. The data is SORTED (or has a monotonic property)
// 2. You can ELIMINATE half the search space at each step
// 3. You're searching for a specific value or boundary
//
// KEY INSIGHT: It's not just for "find element in sorted array"!
// It can be used on any problem with a MONOTONIC condition:
// "There's a point where the answer switches from false to true"

// ============================================================
// 🔹 TEMPLATE 1: Basic Binary Search — Find Exact Value
// ============================================================
function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) { // Note: <= (not <)
    const mid = Math.floor((left + right) / 2);
    // Avoid overflow: mid = left + Math.floor((right - left) / 2)

    if (arr[mid] === target) {
      return mid; // Found!
    } else if (arr[mid] < target) {
      left = mid + 1; // Target is in right half
    } else {
      right = mid - 1; // Target is in left half
    }
  }
  return -1; // Not found
}
// arr = [1, 3, 5, 7, 9, 11], target = 7
// Step 1: left=0, right=5, mid=2, arr[2]=5 < 7 → left=3
// Step 2: left=3, right=5, mid=4, arr[4]=9 > 7 → right=3
// Step 3: left=3, right=3, mid=3, arr[3]=7 = 7 → FOUND at index 3!

// ============================================================
// 🔹 TEMPLATE 2: Find Left Boundary (First Occurrence)
// ============================================================
// "Find the FIRST element >= target" (Lower Bound)
function lowerBound(arr, target) {
  let left = 0;
  let right = arr.length; // Note: arr.length (not arr.length - 1)

  while (left < right) { // Note: < (not <=)
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid; // mid could be the answer
    }
  }
  return left; // Index of first element >= target
}
// arr = [1, 2, 2, 2, 3, 4], target = 2
// Returns index 1 (first occurrence of 2)

// ============================================================
// 🔹 TEMPLATE 3: Find Right Boundary (Last Occurrence)
// ============================================================
// "Find the LAST element <= target" (Upper Bound - 1)
function upperBound(arr, target) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] <= target) {
      left = mid + 1;
    } else {
      right = mid;
    }
  }
  return left; // Index of first element > target
}
// arr = [1, 2, 2, 2, 3, 4], target = 2
// Returns index 4 (first element > 2)
// Last occurrence of 2 is at index: upperBound - 1 = 3

// ============================================================
// 🔹 COMBINING: Find First and Last Position
// ============================================================
function searchRange(nums, target) {
  const first = lowerBound(nums, target);
  if (first >= nums.length || nums[first] !== target) return [-1, -1];
  const last = upperBound(nums, target) - 1;
  return [first, last];
}
// [5,7,7,8,8,10], target=8 → [3,4]

// ============================================================
// 🔹 TEMPLATE 4: Binary Search on Answer ⭐⭐⭐
// ============================================================
// This is the MOST POWERFUL pattern!
// Instead of searching an array, search for the optimal ANSWER.
//
// Steps:
// 1. Define the search range: [min_possible, max_possible]
// 2. For each mid: check if this answer is feasible
// 3. Narrow the range based on feasibility
//
// Template:
function binarySearchOnAnswer(/* params */) {
  let left = 0;         // Minimum possible answer
  let right = 1e9;      // Maximum possible answer

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (isFeasible(mid /*, params */)) {
      right = mid; // Try smaller answer
    } else {
      left = mid + 1; // Need larger answer
    }
  }
  return left;
}

function isFeasible(value /*, params */) {
  // Check if 'value' is a valid answer
  // Return true/false
  return true; // placeholder
}

// --- Example: Koko Eating Bananas ---
// Koko has piles of bananas. She can eat at speed k bananas/hour.
// Find minimum k to eat all bananas within h hours.
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    // Calculate hours needed at speed mid
    const hours = piles.reduce((sum, p) => sum + Math.ceil(p / mid), 0);
    if (hours <= h) {
      right = mid; // Can go slower
    } else {
      left = mid + 1; // Need to go faster
    }
  }
  return left;
}

// ============================================================
// 🔹 COMMON BINARY SEARCH PROBLEMS
// ============================================================

// --- 1. Search Insert Position ---
function searchInsert(nums, target) {
  let left = 0, right = nums.length;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] < target) left = mid + 1;
    else right = mid;
  }
  return left;
}
// [1,3,5,6], target=5 → 2
// [1,3,5,6], target=2 → 1

// --- 2. Search in Rotated Sorted Array ---
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) return mid;

    // Determine which half is sorted
    if (nums[left] <= nums[mid]) {
      // Left half is sorted
      if (nums[left] <= target && target < nums[mid]) {
        right = mid - 1;
      } else {
        left = mid + 1;
      }
    } else {
      // Right half is sorted
      if (nums[mid] < target && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
}
// [4,5,6,7,0,1,2], target=0 → 4

// --- 3. Find Minimum in Rotated Sorted Array ---
function findMin(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[right]) {
      left = mid + 1; // Min is in right half
    } else {
      right = mid; // Min could be mid or left
    }
  }
  return nums[left];
}

// --- 4. Find Peak Element ---
function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] > nums[mid + 1]) {
      right = mid; // Peak is at mid or left
    } else {
      left = mid + 1; // Peak is on the right
    }
  }
  return left;
}

// --- 5. Square Root (Integer) ---
function mySqrt(x) {
  let left = 0, right = x;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid === x) return mid;
    else if (mid * mid < x) left = mid + 1;
    else right = mid - 1;
  }
  return right; // Floor of square root
}

// --- 6. Binary Search on 2D Matrix ---
function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const row = Math.floor(mid / n);
    const col = mid % n;
    const val = matrix[row][col];

    if (val === target) return true;
    else if (val < target) left = mid + 1;
    else right = mid - 1;
  }
  return false;
}

// ============================================================
// 🔹 COMMON MISTAKES IN BINARY SEARCH
// ============================================================
/*
❌ 1. Off-by-one errors
   - left <= right vs left < right (depends on template!)
   - mid + 1 vs mid

❌ 2. Integer overflow
   - mid = (left + right) / 2 can overflow in other languages
   - Use: mid = left + Math.floor((right - left) / 2)

❌ 3. Infinite loop
   - If left = mid (not mid + 1), can loop forever
   - Always ensure search space shrinks!

❌ 4. Not checking if array is sorted
   - Binary search REQUIRES sorted/monotonic property

✅ TIPS:
   - Always verify with small examples: [1], [1,2], [1,2,3]
   - Test edge cases: target not in array, duplicates
   - Draw out the search space to visualize
*/

// ============================================================
// 🔹 BINARY SEARCH DECISION GUIDE
// ============================================================
/*
Looking for EXACT value?
  → Template 1: while (left <= right), return mid

Looking for LEFT BOUNDARY / FIRST >= target?
  → Template 2: while (left < right), right = mid

Looking for RIGHT BOUNDARY / LAST <= target?
  → Template 3: while (left < right), left = mid + 1

Searching for OPTIMAL ANSWER?
  → Template 4: Binary Search on Answer
  → Define search range, write isFeasible() check
*/

console.log("✅ Binary Search — Halve the problem, O(log n) power!");
