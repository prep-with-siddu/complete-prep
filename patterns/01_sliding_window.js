/**
 * ============================================================
 *  PATTERN 1: SLIDING WINDOW
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  The Sliding Window pattern performs operations on a
 *  **contiguous subset (window)** of an array or string.
 *
 *  Instead of re-computing everything for each window position
 *  from scratch (brute force O(n×k)), we "slide" the window
 *  by adding the new element entering the window and removing
 *  the element leaving the window → O(n).
 *
 *  Two flavors:
 *    1. FIXED-SIZE window  → window size K is given.
 *    2. VARIABLE-SIZE window → find smallest/largest window
 *       that satisfies a condition.
 *
 *
 *  🔍 HOW TO IDENTIFY THIS PATTERN
 *  ────────────────────────────────
 *  Ask yourself:
 *    ✅ Does the problem involve a **subarray** or **substring**?
 *    ✅ Does it ask for max/min/count of something **contiguous**?
 *    ✅ Keywords: "contiguous", "consecutive", "window of size K",
 *       "longest substring", "shortest subarray".
 *
 *  🆚 Sliding Window vs Two Pointers
 *    • Both use two pointers, but sliding window pointers
 *      always move in the **same direction** (left → right).
 *    • Two Pointers often work from opposite ends.
 *
 *
 *  💡 HINTS & TRICKS
 *  ─────────────────
 *  1. Fixed window?  → Move both start & end together.
 *  2. Variable window? → Expand right pointer to grow the window;
 *     shrink left pointer when the condition breaks.
 *  3. String problems → use a HashMap/Map for character frequency.
 *  4. Always ask: "What changes when I add/remove one element?"
 *  5. Template:
 *       let windowStart = 0;
 *       for (let windowEnd = 0; windowEnd < n; windowEnd++) {
 *         // expand window: add arr[windowEnd]
 *         while (window invalid) {
 *           // shrink window: remove arr[windowStart], windowStart++
 *         }
 *         // update answer
 *       }
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n) — each element is added and removed at most once.
 *  Space: O(1) for numeric windows, O(k) if using HashMap.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  1a. FIXED-SIZE WINDOW — Maximum Sum Subarray of Size K
// ────────────────────────────────────────────────────────────

/**
 * Given an array of positive numbers and a positive number K,
 * find the maximum sum of any contiguous subarray of size K.
 *
 * Example: arr = [2, 1, 5, 1, 3, 2], k = 3  →  9  (subarray [5,1,3])
 *
 * Brute force: O(n × k) — for every index compute sum of next k.
 * Sliding window: O(n)  — slide and adjust.
 */
function maxSumSubarray(arr, k) {
  let maxSum = 0;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Add the next element to the window

    // Have we hit window size k?
    if (windowEnd >= k - 1) {
      maxSum = Math.max(maxSum, windowSum); // Update best
      windowSum -= arr[windowStart];        // Remove leftmost element
      windowStart++;                        // Slide window forward
    }
  }

  return maxSum;
}

/*
 *  DRY RUN:  arr = [2, 1, 5, 1, 3, 2], k = 3
 *
 *  windowEnd=0 → windowSum=2                     (window not full yet)
 *  windowEnd=1 → windowSum=3                     (window not full yet)
 *  windowEnd=2 → windowSum=8  → max=8, remove 2  → windowSum=6, start=1
 *  windowEnd=3 → windowSum=7  → max=8, remove 1  → windowSum=6, start=2
 *  windowEnd=4 → windowSum=9  → max=9, remove 5  → windowSum=4, start=3
 *  windowEnd=5 → windowSum=6  → max=9, remove 1  → windowSum=5, start=4
 *
 *  Answer: 9 ✓
 */

// ────────────────────────────────────────────────────────────
//  1b. VARIABLE-SIZE WINDOW — Smallest Subarray with Sum ≥ S
// ────────────────────────────────────────────────────────────

/**
 * Given an array of positive integers and a number S,
 * find the length of the smallest contiguous subarray
 * whose sum is ≥ S.  Return 0 if no such subarray.
 *
 * Example: s = 7, arr = [2, 1, 5, 2, 3, 2]  →  2  (subarray [5, 2])
 *
 * Strategy: Expand right to grow sum. When sum ≥ s, try
 * shrinking from the left to minimize length.
 */
function smallestSubarrayWithSum(s, arr) {
  let minLength = Infinity;
  let windowSum = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
    windowSum += arr[windowEnd]; // Expand window

    // Shrink from left while the condition is satisfied
    while (windowSum >= s) {
      minLength = Math.min(minLength, windowEnd - windowStart + 1);
      windowSum -= arr[windowStart];
      windowStart++;
    }
  }

  return minLength === Infinity ? 0 : minLength;
}

// ────────────────────────────────────────────────────────────
//  1c. SLIDING WINDOW + HASHMAP — Longest Substring with
//      At Most K Distinct Characters
// ────────────────────────────────────────────────────────────

/**
 * Given a string, find the length of the longest substring
 * that contains at most K distinct characters.
 *
 * Example: str = "araaci", k = 2  →  4  ("araa")
 *
 * Strategy: Use a Map to track char frequencies inside the window.
 * Expand right. When distinct count > k, shrink from left.
 */
function longestSubstringKDistinct(str, k) {
  let windowStart = 0;
  let maxLength = 0;
  const charFreq = new Map();

  for (let windowEnd = 0; windowEnd < str.length; windowEnd++) {
    const rightChar = str[windowEnd];
    charFreq.set(rightChar, (charFreq.get(rightChar) || 0) + 1);

    // Shrink window until we have at most K distinct chars
    while (charFreq.size > k) {
      const leftChar = str[windowStart];
      charFreq.set(leftChar, charFreq.get(leftChar) - 1);
      if (charFreq.get(leftChar) === 0) charFreq.delete(leftChar);
      windowStart++;
    }

    maxLength = Math.max(maxLength, windowEnd - windowStart + 1);
  }

  return maxLength;
}

// ────────────────────────────────────────────────────────────
//  1d. Longest Substring Without Repeating Characters (LC #3)
// ────────────────────────────────────────────────────────────

/**
 * Given a string s, find the length of the longest substring
 * without repeating characters.
 *
 * Example: "abcabcbb" → 3 ("abc")
 *
 * Strategy: Sliding window with a Set (or Map storing last index).
 */
function lengthOfLongestSubstring(s) {
  const charIndex = new Map(); // char → last seen index
  let maxLen = 0;
  let windowStart = 0;

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const char = s[windowEnd];

    // If char was seen and is inside current window, shrink
    if (charIndex.has(char) && charIndex.get(char) >= windowStart) {
      windowStart = charIndex.get(char) + 1;
    }

    charIndex.set(char, windowEnd);
    maxLen = Math.max(maxLen, windowEnd - windowStart + 1);
  }

  return maxLen;
}

// ────────────────────────────────────────────────────────────
//  1e. Minimum Window Substring (LC #76) — HARD
// ────────────────────────────────────────────────────────────

/**
 * Given strings s and t, find the minimum window in s
 * that contains all characters of t (including duplicates).
 *
 * Example: s = "ADOBECODEBANC", t = "ABC"  →  "BANC"
 *
 * Strategy:
 *  1. Build frequency map for t.
 *  2. Expand window right, counting matched chars.
 *  3. When all matched → try shrinking from left.
 */
function minWindow(s, t) {
  if (t.length > s.length) return "";

  const need = new Map(); // chars we need
  for (const ch of t) need.set(ch, (need.get(ch) || 0) + 1);

  let have = 0;
  const required = need.size; // unique chars to satisfy
  let windowStart = 0;
  let minLen = Infinity;
  let minStart = 0;
  const windowFreq = new Map();

  for (let windowEnd = 0; windowEnd < s.length; windowEnd++) {
    const ch = s[windowEnd];
    windowFreq.set(ch, (windowFreq.get(ch) || 0) + 1);

    // Check if this char is now fully satisfied
    if (need.has(ch) && windowFreq.get(ch) === need.get(ch)) {
      have++;
    }

    // Try shrinking
    while (have === required) {
      // Update answer
      if (windowEnd - windowStart + 1 < minLen) {
        minLen = windowEnd - windowStart + 1;
        minStart = windowStart;
      }

      // Remove leftmost char
      const leftCh = s[windowStart];
      windowFreq.set(leftCh, windowFreq.get(leftCh) - 1);
      if (need.has(leftCh) && windowFreq.get(leftCh) < need.get(leftCh)) {
        have--;
      }
      windowStart++;
    }
  }

  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
}

// ────────────────────────────────────────────────────────────
//  1f. Sliding Window Maximum (LC #239) — HARD
// ────────────────────────────────────────────────────────────

/**
 * Given an array and window size k, return the max of each window.
 *
 * Example: nums = [1,3,-1,-3,5,3,6,7], k = 3
 *          → [3, 3, 5, 5, 6, 7]
 *
 * Strategy: Use a **monotonic decreasing deque** (stores indices).
 *  - Front of deque is always the index of the max in current window.
 *  - Remove from back while current > deque back (maintain decreasing).
 *  - Remove from front if it's outside the window.
 */
function maxSlidingWindow(nums, k) {
  const result = [];
  const deque = []; // indices, values are decreasing

  for (let i = 0; i < nums.length; i++) {
    // Remove elements outside window from front
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove smaller elements from back (they'll never be max)
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window is fully formed starting at index k-1
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== SLIDING WINDOW PATTERN ===\n");

console.log("1a. Max Sum Subarray of Size K:");
console.log("   [2,1,5,1,3,2] k=3 →", maxSumSubarray([2, 1, 5, 1, 3, 2], 3)); // 9

console.log("\n1b. Smallest Subarray with Sum ≥ S:");
console.log("   s=7, [2,1,5,2,3,2] →", smallestSubarrayWithSum(7, [2, 1, 5, 2, 3, 2])); // 2

console.log("\n1c. Longest Substring with K Distinct:");
console.log('   "araaci" k=2 →', longestSubstringKDistinct("araaci", 2)); // 4

console.log("\n1d. Longest Substring Without Repeating:");
console.log('   "abcabcbb" →', lengthOfLongestSubstring("abcabcbb")); // 3
console.log('   "bbbbb" →', lengthOfLongestSubstring("bbbbb"));       // 1

console.log("\n1e. Minimum Window Substring:");
console.log('   "ADOBECODEBANC","ABC" →', minWindow("ADOBECODEBANC", "ABC")); // "BANC"

console.log("\n1f. Sliding Window Maximum:");
console.log("   [1,3,-1,-3,5,3,6,7] k=3 →", maxSlidingWindow([1, 3, -1, -3, 5, 3, 6, 7], 3));
// [3,3,5,5,6,7]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS (LeetCode)
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                      | Difficulty | LC # |
 *  |----------------------------------------------|------------|------|
 *  | Maximum Average Subarray I                   | Easy       | 643  |
 *  | Minimum Size Subarray Sum                    | Medium     | 209  |
 *  | Longest Substring Without Repeating Chars    | Medium     | 3    |
 *  | Permutation in String                        | Medium     | 567  |
 *  | Fruit Into Baskets                           | Medium     | 904  |
 *  | Longest Repeating Character Replacement      | Medium     | 424  |
 *  | Max Consecutive Ones III                     | Medium     | 1004 |
 *  | Minimum Window Substring                     | Hard       | 76   |
 *  | Sliding Window Maximum                       | Hard       | 239  |
 *  | Substring with Concatenation of All Words    | Hard       | 30   |
 */
