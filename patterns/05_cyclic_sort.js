/**
 * ============================================================
 *  PATTERN 5: CYCLIC SORT
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Optimized for arrays containing numbers in a given range
 *  (e.g., [1, n] or [0, n]).
 *
 *  Core idea: Since numbers are in range [1, n], number i
 *  should be at index i-1. Iterate and SWAP each number to
 *  its correct position.
 *
 *  This is O(n) time, O(1) space — extremely efficient!
 *
 *  After cyclic sort:
 *    • Position where arr[i] ≠ i+1 → i+1 is missing, arr[i] is duplicate.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ Array contains numbers in range [1,n] or [0,n].
 *    ✅ "Find the missing number."
 *    ✅ "Find the duplicate number."
 *    ✅ "Find all missing/duplicate numbers."
 *    ✅ O(n) time and O(1) space is required.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Place number x at index x-1 (for range [1, n]).
 *  2. Use WHILE loop inside for loop for swapping — not if.
 *  3. Only move forward (i++) when current number IS at correct pos.
 *  4. After sorting, scan for mismatches → those are answers.
 *  5. For duplicates: skip the swap if nums[i] === nums[correctIdx].
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n) — each number is swapped at most once to its place.
 *  Space: O(1)
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  5a. CYCLIC SORT — Sort Array of [1, n]
// ────────────────────────────────────────────────────────────

/**
 * Sort an array containing numbers [1, n] in-place.
 *
 * Example: [3, 1, 5, 4, 2] → [1, 2, 3, 4, 5]
 *
 * DRY RUN: [3, 1, 5, 4, 2]
 *   i=0: nums[0]=3, correctIdx=2, swap → [5, 1, 3, 4, 2]
 *   i=0: nums[0]=5, correctIdx=4, swap → [2, 1, 3, 4, 5]
 *   i=0: nums[0]=2, correctIdx=1, swap → [1, 2, 3, 4, 5]
 *   i=0: nums[0]=1, correctIdx=0, correct! → i++
 *   i=1: nums[1]=2, correct! → i++
 *   ... all correct.
 */
function cyclicSort(nums) {
  let i = 0;

  while (i < nums.length) {
    const correctIdx = nums[i] - 1; // Where nums[i] SHOULD be

    if (nums[i] !== nums[correctIdx]) {
      // Swap nums[i] to its correct position
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
      // DON'T increment i — check the swapped value
    } else {
      i++; // Already in correct position, move forward
    }
  }

  return nums;
}

// ────────────────────────────────────────────────────────────
//  5b. MISSING NUMBER — LC #268
// ────────────────────────────────────────────────────────────

/**
 * Array of n distinct numbers in [0, n]. Find the missing one.
 *
 * Example: [3, 0, 1] → 2
 *
 * Strategy: Place each number at its index (nums[i] → index nums[i]).
 * After sorting, the index where nums[i] ≠ i is the missing number.
 */
function missingNumber(nums) {
  let i = 0;
  const n = nums.length;

  while (i < n) {
    const correctIdx = nums[i];
    // Only swap if it's within range AND not already correct
    if (nums[i] < n && nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  // Find the index where nums[i] ≠ i
  for (let i = 0; i < n; i++) {
    if (nums[i] !== i) return i;
  }

  return n; // All [0, n-1] present → n is missing
}

// ────────────────────────────────────────────────────────────
//  5c. FIND ALL NUMBERS DISAPPEARED — LC #448
// ────────────────────────────────────────────────────────────

/**
 * Array of n integers in [1, n]. Some appear twice, some once.
 * Find all numbers in [1, n] that don't appear.
 *
 * Example: [4,3,2,7,8,2,3,1] → [5, 6]
 */
function findDisappearedNumbers(nums) {
  // Cyclic sort: place nums[i] at index nums[i]-1
  let i = 0;
  while (i < nums.length) {
    const correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  // Positions where nums[i] ≠ i+1 → i+1 is missing
  const result = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      result.push(i + 1);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  5d. FIND ALL DUPLICATES — LC #442
// ────────────────────────────────────────────────────────────

/**
 * Array of n integers in [1, n]. Some appear twice.
 * Find all elements that appear twice.
 *
 * Example: [4,3,2,7,8,2,3,1] → [2, 3]
 */
function findDuplicates(nums) {
  let i = 0;

  while (i < nums.length) {
    const correctIdx = nums[i] - 1;
    if (nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  const duplicates = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) {
      duplicates.push(nums[i]); // nums[i] is at wrong position → it's a duplicate
    }
  }

  return duplicates;
}

// ────────────────────────────────────────────────────────────
//  5e. FIRST MISSING POSITIVE — LC #41 (HARD)
// ────────────────────────────────────────────────────────────

/**
 * Given an unsorted integer array (can have negatives),
 * find the smallest missing positive integer.
 *
 * Example: [3, 4, -1, 1] → 2
 *          [7, 8, 9, 11, 12] → 1
 *
 * Strategy: Only care about numbers in [1, n].
 * Place each valid number at index num-1.
 * First index where nums[i] ≠ i+1 → answer is i+1.
 */
function firstMissingPositive(nums) {
  const n = nums.length;
  let i = 0;

  while (i < n) {
    const correctIdx = nums[i] - 1;
    // Only place if it's in range [1, n] and not already correct
    if (nums[i] > 0 && nums[i] <= n && nums[i] !== nums[correctIdx]) {
      [nums[i], nums[correctIdx]] = [nums[correctIdx], nums[i]];
    } else {
      i++;
    }
  }

  for (let i = 0; i < n; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }

  return n + 1;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== CYCLIC SORT PATTERN ===\n");

console.log("5a. Cyclic Sort:");
console.log("   [3,1,5,4,2] →", cyclicSort([3, 1, 5, 4, 2])); // [1,2,3,4,5]

console.log("\n5b. Missing Number:");
console.log("   [3,0,1] →", missingNumber([3, 0, 1]));     // 2
console.log("   [9,6,4,2,3,5,7,0,1] →", missingNumber([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8

console.log("\n5c. Find Disappeared Numbers:");
console.log("   [4,3,2,7,8,2,3,1] →", findDisappearedNumbers([4, 3, 2, 7, 8, 2, 3, 1])); // [5,6]

console.log("\n5d. Find All Duplicates:");
console.log("   [4,3,2,7,8,2,3,1] →", findDuplicates([4, 3, 2, 7, 8, 2, 3, 1])); // [2,3]

console.log("\n5e. First Missing Positive:");
console.log("   [3,4,-1,1] →", firstMissingPositive([3, 4, -1, 1]));   // 2
console.log("   [1,2,0] →", firstMissingPositive([1, 2, 0]));           // 3
console.log("   [7,8,9,11,12] →", firstMissingPositive([7, 8, 9, 11, 12])); // 1

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                | Difficulty | LC # |
 *  |----------------------------------------|------------|------|
 *  | Missing Number                         | Easy       | 268  |
 *  | Find All Numbers Disappeared in Array  | Easy       | 448  |
 *  | Set Mismatch                           | Easy       | 645  |
 *  | Find All Duplicates in an Array        | Medium     | 442  |
 *  | Find the Duplicate Number              | Medium     | 287  |
 *  | First Missing Positive                 | Hard       | 41   |
 *  | Couples Holding Hands                  | Hard       | 765  |
 */
