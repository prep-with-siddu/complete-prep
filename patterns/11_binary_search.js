/**
 * ============================================================
 *  PATTERN 11: MODIFIED BINARY SEARCH
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Classic binary search on sorted array = O(log n).
 *  "Modified" extends it to:
 *    • Rotated sorted arrays
 *    • First/last occurrence
 *    • Peak element
 *    • Search on answer (binary search on value space)
 *
 *  Core insight: at each step, at LEAST ONE HALF is sorted.
 *  Use that to decide which half contains the target.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ Sorted or PARTIALLY sorted array.
 *    ✅ "Search in rotated sorted array."
 *    ✅ "Find first/last position of element."
 *    ✅ "Find peak element."
 *    ✅ "Find minimum in rotated array."
 *    ✅ O(log n) requirement.
 *    ✅ "Koko eating bananas", "split array largest sum" → binary search on ANSWER.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Always think: "Which half is DEFINITELY sorted?"
 *  2. Use mid = Math.floor((left + right) / 2).
 *  3. First occurrence: when found, DON'T return → set right = mid - 1.
 *  4. Last occurrence: when found, DON'T return → set left = mid + 1.
 *  5. "Binary search on answer": when the answer is a number in a range
 *     and you can check if an answer is valid → binary search the range.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  11a. CLASSIC BINARY SEARCH — LC #704
// ────────────────────────────────────────────────────────────

function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}

// ────────────────────────────────────────────────────────────
//  11b. SEARCH IN ROTATED SORTED ARRAY — LC #33
// ────────────────────────────────────────────────────────────

/**
 * Array was sorted then rotated: [4,5,6,7,0,1,2]
 * Find target in O(log n).
 *
 * Key: After rotation, ONE half is always sorted.
 * Check which half is sorted → determine if target is there.
 *
 * DRY RUN: [4,5,6,7,0,1,2], target = 0
 *   left=0, right=6, mid=3, nums[mid]=7
 *   Left half [4,5,6,7] is sorted (nums[0] <= nums[3])
 *   Is 0 in [4,7]? No → search right: left=4
 *   left=4, right=6, mid=5, nums[mid]=1
 *   Left half [0,1] is sorted
 *   Is 0 in [0,1]? Yes → search left: right=4
 *   left=4, right=4, mid=4, nums[mid]=0 ✓ Found!
 */
function searchRotated(nums, target) {
  let left = 0, right = nums.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) return mid;

    // Which half is sorted?
    if (nums[left] <= nums[mid]) {
      // LEFT half is sorted
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1; // Target in sorted left half
      } else {
        left = mid + 1;  // Target in unsorted right half
      }
    } else {
      // RIGHT half is sorted
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;  // Target in sorted right half
      } else {
        right = mid - 1; // Target in unsorted left half
      }
    }
  }

  return -1;
}

// ────────────────────────────────────────────────────────────
//  11c. FIND FIRST AND LAST POSITION — LC #34
// ────────────────────────────────────────────────────────────

/**
 * When you find target, DON'T return immediately.
 * For first: keep searching LEFT  (right = mid - 1).
 * For last:  keep searching RIGHT (left = mid + 1).
 */
function searchRange(nums, target) {
  return [findBound(nums, target, true), findBound(nums, target, false)];
}

function findBound(nums, target, isFirst) {
  let left = 0, right = nums.length - 1;
  let result = -1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] === target) {
      result = mid;
      if (isFirst) right = mid - 1; // Keep searching left
      else left = mid + 1;           // Keep searching right
    } else if (nums[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  11d. FIND PEAK ELEMENT — LC #162
// ────────────────────────────────────────────────────────────

/**
 * Element greater than its neighbors. Multiple peaks possible.
 * Return ANY peak index in O(log n).
 *
 * If nums[mid] < nums[mid+1] → peak is on the RIGHT.
 * If nums[mid] > nums[mid+1] → peak is on the LEFT (or mid itself).
 */
function findPeakElement(nums) {
  let left = 0, right = nums.length - 1;

  while (left < right) { // NOTE: left < right, NOT left <= right
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[mid + 1]) {
      right = mid;     // Peak is at mid or left of mid
    } else {
      left = mid + 1;  // Peak is to the right
    }
  }

  return left; // left === right → peak
}

// ────────────────────────────────────────────────────────────
//  11e. FIND MINIMUM IN ROTATED SORTED ARRAY — LC #153
// ────────────────────────────────────────────────────────────

/**
 * The minimum is at the "rotation point".
 * If nums[mid] > nums[right] → min is in right half.
 * Otherwise → min is in left half (including mid).
 */
function findMin(nums) {
  let left = 0, right = nums.length - 1;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (nums[mid] > nums[right]) {
      left = mid + 1;  // Min is in right half
    } else {
      right = mid;      // Min is at mid or left of mid
    }
  }

  return nums[left];
}

// ────────────────────────────────────────────────────────────
//  11f. SEARCH A 2D MATRIX — LC #74
// ────────────────────────────────────────────────────────────

/**
 * Matrix where each row is sorted and first element of each row
 * is greater than last element of previous row.
 * Treat as a single sorted array!
 */
function searchMatrix(matrix, target) {
  const m = matrix.length, n = matrix[0].length;
  let left = 0, right = m * n - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    const val = matrix[Math.floor(mid / n)][mid % n]; // Convert 1D → 2D

    if (val === target) return true;
    if (val < target) left = mid + 1;
    else right = mid - 1;
  }

  return false;
}

// ────────────────────────────────────────────────────────────
//  11g. KOKO EATING BANANAS — LC #875 (Binary Search on Answer)
// ────────────────────────────────────────────────────────────

/**
 * Koko eats bananas at speed k (bananas/hour). Given h hours,
 * find minimum k to finish all piles.
 *
 * Binary search on the ANSWER (k).
 *   Range: [1, max(piles)]
 *   For each k, check if she can finish in h hours.
 */
function minEatingSpeed(piles, h) {
  let left = 1;
  let right = Math.max(...piles);

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    // Can Koko finish with speed = mid?
    const hoursNeeded = piles.reduce((sum, pile) => sum + Math.ceil(pile / mid), 0);

    if (hoursNeeded <= h) {
      right = mid;     // Can finish → try slower
    } else {
      left = mid + 1;  // Can't finish → need faster
    }
  }

  return left;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== MODIFIED BINARY SEARCH ===\n");

console.log("11a. Binary Search: [1,3,5,7,9] target=5 →", binarySearch([1, 3, 5, 7, 9], 5)); // 2

console.log("\n11b. Search Rotated: [4,5,6,7,0,1,2] target=0 →", searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4

console.log("\n11c. First/Last Position: [5,7,7,8,8,10] target=8 →", searchRange([5, 7, 7, 8, 8, 10], 8)); // [3,4]

console.log("\n11d. Peak Element: [1,2,3,1] →", findPeakElement([1, 2, 3, 1])); // 2

console.log("\n11e. Find Min Rotated: [3,4,5,1,2] →", findMin([3, 4, 5, 1, 2])); // 1

console.log("\n11f. Search 2D Matrix: target=3 →", searchMatrix([[1,3,5,7],[10,11,16,20],[23,30,34,60]], 3)); // true

console.log("\n11g. Koko Bananas: [3,6,7,11] h=8 →", minEatingSpeed([3, 6, 7, 11], 8)); // 4

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Binary Search                           | Easy       | 704   |
 *  | Search in Rotated Sorted Array          | Medium     | 33    |
 *  | Find First and Last Position            | Medium     | 34    |
 *  | Find Peak Element                       | Medium     | 162   |
 *  | Find Minimum in Rotated Array           | Medium     | 153   |
 *  | Search a 2D Matrix                      | Medium     | 74    |
 *  | Search a 2D Matrix II                   | Medium     | 240   |
 *  | Koko Eating Bananas                     | Medium     | 875   |
 *  | Capacity To Ship Packages               | Medium     | 1011  |
 *  | Split Array Largest Sum                 | Hard       | 410   |
 *  | Median of Two Sorted Arrays             | Hard       | 4     |
 *  | Time Based Key-Value Store              | Medium     | 981   |
 */
