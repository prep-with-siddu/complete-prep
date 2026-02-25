/**
 * ============================================================
 *  PATTERN 2: TWO POINTERS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Use two pointers to iterate through a data structure
 *  (usually a sorted array or linked list) simultaneously.
 *  By moving pointers based on conditions, we reduce time
 *  from O(n²) to O(n).
 *
 *  Three variations:
 *    1. OPPOSITE DIRECTION — one at start, one at end → move inward.
 *       Use case: pair sum, palindrome check, container with water.
 *    2. SAME DIRECTION    — both from start, one faster.
 *       Use case: remove duplicates, partition.
 *    3. TWO ARRAYS        — one pointer per array.
 *       Use case: merge sorted arrays, intersection.
 *
 *
 *  🔍 HOW TO IDENTIFY THIS PATTERN
 *  ────────────────────────────────
 *    ✅ Input is a **sorted** array (or can be sorted first).
 *    ✅ Find a **pair/triplet** that matches a condition (sum, diff).
 *    ✅ "Remove duplicates in-place."
 *    ✅ "Is it a palindrome?"
 *    ✅ Compare elements from both ends.
 *    ✅ Partition array (like Dutch National Flag / Sort Colors).
 *
 *  🆚 Two Pointers vs Sliding Window
 *    • Two Pointers often move TOWARDS each other (opposite ends).
 *    • Sliding window pointers always move LEFT → RIGHT together.
 *
 *
 *  💡 HINTS & TRICKS
 *  ─────────────────
 *  1. SORT FIRST if the array isn't sorted and you need
 *     pair/triplet matching.
 *  2. For pair sum on sorted array:
 *       sum < target → move LEFT pointer right (need bigger)
 *       sum > target → move RIGHT pointer left (need smaller)
 *  3. For removing duplicates: "slow" pointer = write position.
 *  4. For 3Sum: fix one element, then do 2Sum on the rest.
 *  5. Skip duplicates: `if (i > start && nums[i] === nums[i-1]) continue;`
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n) for pair problems, O(n²) for triplet.
 *  Space: O(1) extra (excluding output/sorting).
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  2a. PAIR WITH TARGET SUM (Sorted Array) — LC #167
// ────────────────────────────────────────────────────────────

/**
 * Given a SORTED array, find two numbers that add up to target.
 * Return their indices (1-indexed).
 *
 * Example: [2, 7, 11, 15], target = 9  →  [1, 2]
 *
 * Why it works:
 *   Left starts at smallest, right at largest.
 *   If sum < target → we need a bigger number → move left right.
 *   If sum > target → we need a smaller number → move right left.
 *   They converge to the answer.
 */
function twoSumSorted(numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];

    if (sum === target) {
      return [left + 1, right + 1]; // 1-indexed
    } else if (sum < target) {
      left++;   // Need bigger sum
    } else {
      right--;  // Need smaller sum
    }
  }

  return [-1, -1];
}

// ────────────────────────────────────────────────────────────
//  2b. REMOVE DUPLICATES FROM SORTED ARRAY — LC #26
// ────────────────────────────────────────────────────────────

/**
 * Remove duplicates in-place. Return new length.
 *
 * Example: [2, 3, 3, 3, 6, 9, 9]  →  4, arr = [2, 3, 6, 9, ...]
 *
 * Strategy: "Slow" pointer tracks write position.
 *           "Fast" pointer scans for new unique values.
 */
function removeDuplicates(arr) {
  if (arr.length === 0) return 0;

  let writePos = 1; // slow pointer — next position to write unique value

  for (let i = 1; i < arr.length; i++) { // fast pointer
    if (arr[i] !== arr[writePos - 1]) {
      arr[writePos] = arr[i];
      writePos++;
    }
  }

  return writePos;
}

// ────────────────────────────────────────────────────────────
//  2c. THREE SUM — LC #15
// ────────────────────────────────────────────────────────────

/**
 * Find all unique triplets that sum to zero.
 *
 * Example: [-1, 0, 1, 2, -1, -4]  →  [[-1,-1,2], [-1,0,1]]
 *
 * Strategy:
 *  1. Sort the array.
 *  2. For each element i, do a two-pointer search on the rest.
 *  3. Skip duplicates at every level.
 *
 * Time: O(n²)  |  Space: O(n) for sorting
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  for (let i = 0; i < nums.length - 2; i++) {
    // Skip duplicate values for the first element
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    // Early termination: if smallest possible sum > 0, stop
    if (nums[i] > 0) break;

    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);

        // Skip duplicates for left and right
        while (left < right && nums[left] === nums[left + 1]) left++;
        while (left < right && nums[right] === nums[right - 1]) right--;

        left++;
        right--;
      } else if (sum < 0) {
        left++;   // Need bigger sum
      } else {
        right--;  // Need smaller sum
      }
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  2d. CONTAINER WITH MOST WATER — LC #11
// ────────────────────────────────────────────────────────────

/**
 * Given heights, find two lines that form a container holding
 * the most water.
 *
 * Example: [1,8,6,2,5,4,8,3,7] → 49
 *
 * Strategy: Start with widest container (left=0, right=end).
 * The water is limited by the SHORTER line.
 * Move the shorter line inward — it's the only way to
 * potentially find a taller line that increases area.
 */
function maxArea(height) {
  let left = 0;
  let right = height.length - 1;
  let maxWater = 0;

  while (left < right) {
    const water = Math.min(height[left], height[right]) * (right - left);
    maxWater = Math.max(maxWater, water);

    // Move the pointer with the shorter height
    if (height[left] < height[right]) {
      left++;
    } else {
      right--;
    }
  }

  return maxWater;
}

// ────────────────────────────────────────────────────────────
//  2e. SORT COLORS (Dutch National Flag) — LC #75
// ────────────────────────────────────────────────────────────

/**
 * Sort an array containing only 0, 1, 2 in-place.
 *
 * Example: [2, 0, 2, 1, 1, 0]  →  [0, 0, 1, 1, 2, 2]
 *
 * Strategy: THREE pointers (low, mid, high).
 *   - Everything before `low` = 0
 *   - Everything between `low` and `mid` = 1
 *   - Everything after `high` = 2
 *   - Between `mid` and `high` = unexplored
 */
function sortColors(nums) {
  let low = 0;
  let mid = 0;
  let high = nums.length - 1;

  while (mid <= high) {
    if (nums[mid] === 0) {
      [nums[low], nums[mid]] = [nums[mid], nums[low]];
      low++;
      mid++;
    } else if (nums[mid] === 1) {
      mid++;
    } else {
      // nums[mid] === 2
      [nums[mid], nums[high]] = [nums[high], nums[mid]];
      high--;
      // Don't increment mid — need to check swapped value
    }
  }

  return nums;
}

// ────────────────────────────────────────────────────────────
//  2f. TRAPPING RAIN WATER — LC #42 (HARD)
// ────────────────────────────────────────────────────────────

/**
 * Given elevation map, compute how much water it can trap.
 *
 * Example: [0,1,0,2,1,0,1,3,2,1,2,1] → 6
 *
 * Strategy: Two pointers from both ends.
 * Water at any position = min(leftMax, rightMax) - height[i].
 * Process the side with the smaller max (it's the bottleneck).
 */
function trap(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let water = 0;

  while (left < right) {
    if (height[left] < height[right]) {
      if (height[left] >= leftMax) {
        leftMax = height[left];
      } else {
        water += leftMax - height[left];
      }
      left++;
    } else {
      if (height[right] >= rightMax) {
        rightMax = height[right];
      } else {
        water += rightMax - height[right];
      }
      right--;
    }
  }

  return water;
}

// ────────────────────────────────────────────────────────────
//  2g. VALID PALINDROME — LC #125
// ────────────────────────────────────────────────────────────

/**
 * Check if a string is a palindrome (considering only
 * alphanumeric characters, case-insensitive).
 */
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left < right) {
    // Skip non-alphanumeric
    while (left < right && !isAlphaNum(s[left])) left++;
    while (left < right && !isAlphaNum(s[right])) right--;

    if (s[left].toLowerCase() !== s[right].toLowerCase()) {
      return false;
    }

    left++;
    right--;
  }

  return true;
}

function isAlphaNum(c) {
  const code = c.charCodeAt(0);
  return (
    (code >= 48 && code <= 57) ||  // 0-9
    (code >= 65 && code <= 90) ||  // A-Z
    (code >= 97 && code <= 122)    // a-z
  );
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== TWO POINTERS PATTERN ===\n");

console.log("2a. Two Sum (sorted):");
console.log("   [2,7,11,15] target=9 →", twoSumSorted([2, 7, 11, 15], 9)); // [1,2]

console.log("\n2b. Remove Duplicates:");
const arr2b = [2, 3, 3, 3, 6, 9, 9];
console.log("   [2,3,3,3,6,9,9] → length", removeDuplicates(arr2b), "arr:", arr2b.slice(0, 4));

console.log("\n2c. Three Sum:");
console.log("   [-1,0,1,2,-1,-4] →", JSON.stringify(threeSum([-1, 0, 1, 2, -1, -4])));

console.log("\n2d. Container With Most Water:");
console.log("   [1,8,6,2,5,4,8,3,7] →", maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49

console.log("\n2e. Sort Colors:");
console.log("   [2,0,2,1,1,0] →", sortColors([2, 0, 2, 1, 1, 0])); // [0,0,1,1,2,2]

console.log("\n2f. Trapping Rain Water:");
console.log("   [0,1,0,2,1,0,1,3,2,1,2,1] →", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6

console.log("\n2g. Valid Palindrome:");
console.log('   "A man, a plan, a canal: Panama" →', isPalindrome("A man, a plan, a canal: Panama")); // true

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                              | Difficulty | LC # |
 *  |--------------------------------------|------------|------|
 *  | Two Sum II – Input Array Is Sorted   | Medium     | 167  |
 *  | Remove Duplicates from Sorted Array  | Easy       | 26   |
 *  | 3Sum                                 | Medium     | 15   |
 *  | 3Sum Closest                         | Medium     | 16   |
 *  | 4Sum                                 | Medium     | 18   |
 *  | Container With Most Water            | Medium     | 11   |
 *  | Trapping Rain Water                  | Hard       | 42   |
 *  | Sort Colors (Dutch National Flag)    | Medium     | 75   |
 *  | Valid Palindrome                     | Easy       | 125  |
 *  | Squares of a Sorted Array            | Easy       | 977  |
 *  | Boats to Save People                 | Medium     | 881  |
 *
 *
 *  🎯 PRACTICE PROBLEMS (15 — Two Pointers)
 *  ──────────────────────────────────────────
 *
 *  EASY (5)
 *  1. #167 Two Sum II – Input Array Is Sorted
 *     https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/
 *  2. #125 Valid Palindrome
 *     https://leetcode.com/problems/valid-palindrome/
 *  3. #88  Merge Sorted Array
 *     https://leetcode.com/problems/merge-sorted-array/
 *  4. #283 Move Zeroes
 *     https://leetcode.com/problems/move-zeroes/
 *  5. #977 Squares of a Sorted Array
 *     https://leetcode.com/problems/squares-of-a-sorted-array/
 *
 *  MEDIUM (8)
 *  6.  #15  3Sum
 *      https://leetcode.com/problems/3sum/
 *  7.  #11  Container With Most Water
 *      https://leetcode.com/problems/container-with-most-water/
 *  8.  #75  Sort Colors
 *      https://leetcode.com/problems/sort-colors/
 *  9.  #3   Longest Substring Without Repeating Characters
 *      https://leetcode.com/problems/longest-substring-without-repeating-characters/
 *  10. #18  4Sum
 *      https://leetcode.com/problems/4sum/
 *  11. #61  Rotate List
 *      https://leetcode.com/problems/rotate-list/
 *  12. #80  Remove Duplicates from Sorted Array II
 *      https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/
 *  13. #763 Partition Labels
 *      https://leetcode.com/problems/partition-labels/
 *
 *  HARD (2)
 *  14. #42  Trapping Rain Water
 *      https://leetcode.com/problems/trapping-rain-water/
 *  15. #76  Minimum Window Substring
 *      https://leetcode.com/problems/minimum-window-substring/
 */
