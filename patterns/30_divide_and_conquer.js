/**
 * ============================================================
 *  PATTERN 30: DIVIDE AND CONQUER
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Divide and Conquer = split problem into smaller subproblems,
 *  solve each recursively, then combine results.
 *
 *  3 Steps:
 *    1. DIVIDE: Split into subproblems (usually halves).
 *    2. CONQUER: Solve subproblems recursively.
 *    3. COMBINE: Merge subproblem solutions into final answer.
 *
 *  Master Theorem — T(n) = aT(n/b) + O(n^d):
 *    • d < log_b(a) → O(n^(log_b(a)))
 *    • d = log_b(a) → O(n^d · log n)
 *    • d > log_b(a) → O(n^d)
 *
 *  Classic examples:
 *  ┌────────────────────┬─────────────┬──────────────────────────────┐
 *  │ Algorithm          │ Time        │ Divide Strategy              │
 *  ├────────────────────┼─────────────┼──────────────────────────────┤
 *  │ Merge Sort         │ O(n log n)  │ Split in half, merge sorted  │
 *  │ Quick Sort         │ O(n log n)* │ Partition around pivot       │
 *  │ Binary Search      │ O(log n)    │ Eliminate half each step     │
 *  │ Closest Pair       │ O(n log n)  │ Split points, check strip    │
 *  │ Count Inversions   │ O(n log n)  │ Modified merge sort          │
 *  │ Median of 2 Arrays │ O(log(m+n)) │ Binary search on partition   │
 *  │ Karatsuba Multiply │ O(n^1.585)  │ 3 multiplications (not 4)   │
 *  └────────────────────┴─────────────┴──────────────────────────────┘
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Sort an array" (merge/quick sort).
 *    ✅ "Count inversions."
 *    ✅ "Median of two sorted arrays."
 *    ✅ "Closest pair of points."
 *    ✅ "Merge k sorted lists" (divide-and-conquer approach).
 *    ✅ Problem can be split in half → solve halves → combine.
 *    ✅ O(n log n) or O(log n) expected complexity.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. If "sort": merge sort = stable O(n log n), quick sort = in-place.
 *  2. "Count X while sorting" → modified merge sort.
 *  3. "Merge k lists": pair up and merge → log k rounds.
 *  4. Base case: single element or empty → trivially solved.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  30a. MERGE SORT — LC #912
// ────────────────────────────────────────────────────────────

/**
 * Classic divide-and-conquer sort.
 * Time: O(n log n), Space: O(n), Stable: Yes.
 *
 * DRY RUN: [38, 27, 43, 3, 9, 82, 10]
 *   Split: [38,27,43] | [3,9,82,10]
 *   Split: [38] [27,43] | [3,9] [82,10]
 *   Split: [38] [27] [43] | [3] [9] [82] [10]
 *   Merge: [38] [27,43] → [27,38,43]
 *   Merge: [3,9] [10,82] → [3,9,10,82]
 *   Merge: [27,38,43] [3,9,10,82] → [3,9,10,27,38,43,82] ✓
 */
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
    if (left[i] <= right[j]) {
      result.push(left[i++]);
    } else {
      result.push(right[j++]);
    }
  }

  while (i < left.length) result.push(left[i++]);
  while (j < right.length) result.push(right[j++]);

  return result;
}

// ────────────────────────────────────────────────────────────
//  30b. QUICK SORT
// ────────────────────────────────────────────────────────────

/**
 * In-place sort with Lomuto partition.
 * Time: O(n log n) avg, O(n²) worst, Space: O(log n) stack.
 */
function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pivotIdx = partition(arr, low, high);
    quickSort(arr, low, pivotIdx - 1);
    quickSort(arr, pivotIdx + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  // Median-of-three pivot selection for better avg case
  const mid = Math.floor((low + high) / 2);
  if (arr[mid] < arr[low]) [arr[low], arr[mid]] = [arr[mid], arr[low]];
  if (arr[high] < arr[low]) [arr[low], arr[high]] = [arr[high], arr[low]];
  if (arr[mid] < arr[high]) [arr[mid], arr[high]] = [arr[high], arr[mid]];
  const pivot = arr[high];

  let i = low;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      [arr[i], arr[j]] = [arr[j], arr[i]];
      i++;
    }
  }
  [arr[i], arr[high]] = [arr[high], arr[i]];
  return i;
}

// ────────────────────────────────────────────────────────────
//  30c. COUNT INVERSIONS — Modified Merge Sort
// ────────────────────────────────────────────────────────────

/**
 * An inversion is a pair (i, j) where i < j but arr[i] > arr[j].
 * Count inversions = count during merge step of merge sort.
 *
 * DRY RUN: [2, 4, 1, 3, 5]
 *   Split: [2,4] | [1,3,5]
 *   [2,4]: no inversion in merge
 *   [1,3,5]: no inversion in merge
 *   Merge [2,4] with [1,3,5]:
 *     1 < 2 → pick 1, inversions += 2 (both 2,4 are greater)
 *     2 < 3 → pick 2
 *     3 < 4 → pick 3, inversions += 1 (4 is greater)
 *     pick 4, pick 5
 *   Total inversions = 3 ✓ (pairs: (2,1), (4,1), (4,3))
 */
function countInversions(arr) {
  let count = 0;

  function mergeSortCount(arr) {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSortCount(arr.slice(0, mid));
    const right = mergeSortCount(arr.slice(mid));
    return mergeCount(left, right);
  }

  function mergeCount(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i++]);
      } else {
        count += left.length - i; // All remaining in left are inversions
        result.push(right[j++]);
      }
    }
    while (i < left.length) result.push(left[i++]);
    while (j < right.length) result.push(right[j++]);
    return result;
  }

  mergeSortCount(arr);
  return count;
}

// ────────────────────────────────────────────────────────────
//  30d. REVERSE PAIRS — LC #493
// ────────────────────────────────────────────────────────────

/**
 * Count pairs where i < j and nums[i] > 2 * nums[j].
 * Modified merge sort: count before merging.
 */
function reversePairs(nums) {
  let count = 0;

  function mergeSortRP(arr, low, high) {
    if (low >= high) return;
    const mid = Math.floor((low + high) / 2);
    mergeSortRP(arr, low, mid);
    mergeSortRP(arr, mid + 1, high);

    // Count reverse pairs across left and right
    let j = mid + 1;
    for (let i = low; i <= mid; i++) {
      while (j <= high && arr[i] > 2 * arr[j]) j++;
      count += j - (mid + 1);
    }

    // Standard merge
    const temp = [];
    let l = low, r = mid + 1;
    while (l <= mid && r <= high) {
      if (arr[l] <= arr[r]) temp.push(arr[l++]);
      else temp.push(arr[r++]);
    }
    while (l <= mid) temp.push(arr[l++]);
    while (r <= high) temp.push(arr[r++]);
    for (let i = 0; i < temp.length; i++) {
      arr[low + i] = temp[i];
    }
  }

  mergeSortRP(nums, 0, nums.length - 1);
  return count;
}

// ────────────────────────────────────────────────────────────
//  30e. MEDIAN OF TWO SORTED ARRAYS — LC #4
// ────────────────────────────────────────────────────────────

/**
 * Find median of two sorted arrays in O(log(min(m,n))).
 *
 * Binary search on the partition of the smaller array.
 * Partition both arrays such that:
 *   left half has (m + n + 1) / 2 elements total.
 *   max(left) ≤ min(right)
 */
function findMedianSortedArrays(nums1, nums2) {
  // Ensure nums1 is the shorter array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }

  const m = nums1.length, n = nums2.length;
  let low = 0, high = m;

  while (low <= high) {
    const i = Math.floor((low + high) / 2); // Partition in nums1
    const j = Math.floor((m + n + 1) / 2) - i; // Partition in nums2

    const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
    const minRight1 = i === m ? Infinity : nums1[i];
    const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
    const minRight2 = j === n ? Infinity : nums2[j];

    if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
      // Found correct partition
      if ((m + n) % 2 === 1) {
        return Math.max(maxLeft1, maxLeft2);
      }
      return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
    } else if (maxLeft1 > minRight2) {
      high = i - 1; // Move left in nums1
    } else {
      low = i + 1; // Move right in nums1
    }
  }
}

// ────────────────────────────────────────────────────────────
//  30f. MERGE K SORTED LISTS (D&C approach)
// ────────────────────────────────────────────────────────────

/**
 * Merge k sorted arrays using divide-and-conquer.
 * Pair up arrays → merge each pair → repeat.
 * Time: O(N log k) where N = total elements.
 */
function mergeKSorted(arrays) {
  if (arrays.length === 0) return [];
  if (arrays.length === 1) return arrays[0];

  while (arrays.length > 1) {
    const merged = [];
    for (let i = 0; i < arrays.length; i += 2) {
      if (i + 1 < arrays.length) {
        merged.push(merge(arrays[i], arrays[i + 1]));
      } else {
        merged.push(arrays[i]);
      }
    }
    arrays = merged;
  }

  return arrays[0];
}

// ────────────────────────────────────────────────────────────
//  30g. MAXIMUM SUBARRAY (D&C) — LC #53
// ────────────────────────────────────────────────────────────

/**
 * D&C approach: max subarray is either:
 *   1. Entirely in left half.
 *   2. Entirely in right half.
 *   3. Crosses the midpoint.
 * Time: O(n log n) — Kadane's is O(n) but this shows D&C thinking.
 */
function maxSubarrayDC(nums) {
  function helper(low, high) {
    if (low === high) return nums[low];

    const mid = Math.floor((low + high) / 2);

    // Max crossing midpoint
    let leftSum = -Infinity, sum = 0;
    for (let i = mid; i >= low; i--) {
      sum += nums[i];
      leftSum = Math.max(leftSum, sum);
    }

    let rightSum = -Infinity;
    sum = 0;
    for (let i = mid + 1; i <= high; i++) {
      sum += nums[i];
      rightSum = Math.max(rightSum, sum);
    }

    const crossSum = leftSum + rightSum;
    const leftMax = helper(low, mid);
    const rightMax = helper(mid + 1, high);

    return Math.max(leftMax, rightMax, crossSum);
  }

  return helper(0, nums.length - 1);
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== DIVIDE AND CONQUER ===\n");

console.log("30a. Merge Sort:", mergeSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]

console.log("\n30b. Quick Sort:", quickSort([38, 27, 43, 3, 9, 82, 10]));
// [3, 9, 10, 27, 38, 43, 82]

console.log("\n30c. Count Inversions [2,4,1,3,5]:", countInversions([2, 4, 1, 3, 5]));
// 3

console.log("\n30d. Reverse Pairs [1,3,2,3,1]:", reversePairs([1, 3, 2, 3, 1]));
// 2

console.log("\n30e. Median of Two Sorted Arrays:");
console.log("  [1,3] + [2]:", findMedianSortedArrays([1, 3], [2]));       // 2
console.log("  [1,2] + [3,4]:", findMedianSortedArrays([1, 2], [3, 4])); // 2.5

console.log("\n30f. Merge K Sorted:");
console.log(" ", mergeKSorted([[1, 4, 5], [1, 3, 4], [2, 6]]));
// [1, 1, 2, 3, 4, 4, 5, 6]

console.log("\n30g. Max Subarray (D&C) [-2,1,-3,4,-1,2,1,-5,4]:",
  maxSubarrayDC([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                   | Difficulty | LC #  |
 *  |-------------------------------------------|------------|-------|
 *  | Sort an Array (Merge/Quick Sort)          | Medium     | 912   |
 *  | Median of Two Sorted Arrays               | Hard       | 4     |
 *  | Merge K Sorted Lists                      | Hard       | 23    |
 *  | Reverse Pairs                             | Hard       | 493   |
 *  | Count of Smaller Numbers After Self       | Hard       | 315   |
 *  | Maximum Subarray                          | Medium     | 53    |
 *  | Kth Largest Element (Quickselect)         | Medium     | 215   |
 *  | Different Ways to Add Parentheses         | Medium     | 241   |
 *  | Closest Pair of Points                    | —          | Geeks |
 *  | Count of Range Sum                        | Hard       | 327   |
 *
 *  DIVIDE & CONQUER vs DYNAMIC PROGRAMMING:
 *  ─────────────────────────────────────────
 *  D&C: Subproblems are INDEPENDENT (no overlap).
 *       Example: merge sort — left/right don't share data.
 *
 *  DP:  Subproblems OVERLAP (same subproblem computed multiple times).
 *       Example: Fibonacci — fib(3) needed for both fib(4) and fib(5).
 *
 *  If subproblems overlap → use DP (memoization), not D&C.
 *  If subproblems don't overlap → use D&C directly.
 *
 *  MERGE SORT vs QUICK SORT:
 *  ─────────────────────────
 *  Merge Sort: Stable, O(n log n) always, O(n) space.
 *  Quick Sort: Unstable, O(n log n) avg, O(1) space (in-place).
 *  JavaScript's Array.sort() uses Timsort (hybrid merge sort).
 */
