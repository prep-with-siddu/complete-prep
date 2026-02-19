/**
 * ============================================================
 *  PATTERN 25: MONOTONIC QUEUE / DEQUE
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  A deque (double-ended queue) that maintains elements in
 *  monotonic (increasing or decreasing) order. Unlike monotonic
 *  stack, elements can be removed from BOTH ends.
 *
 *  Key operations:
 *    • Push to BACK: remove from back while new element violates order.
 *    • Pop from FRONT: when front element falls out of window.
 *
 *  Used for: Sliding window min/max in O(n) instead of O(n·k).
 *
 *  Monotonic Deque vs Monotonic Stack:
 *    Stack = "next greater/smaller" → elements only exit from one end.
 *    Deque  = "window max/min" → elements exit from BOTH ends (back by
 *             new larger element, front by sliding out of window).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Sliding window maximum / minimum."
 *    ✅ "Max of all subarrays of size K."
 *    ✅ "Shortest subarray with sum ≥ K" (with negative numbers).
 *    ✅ "Jump Game VI."
 *    ✅ Sliding window + need to know min or max efficiently.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Store INDICES in the deque (not values) → can check if front is out of window.
 *  2. For "window max": maintain DECREASING deque → front = max.
 *  3. For "window min": maintain INCREASING deque → front = min.
 *  4. Before pushing index i: pop from BACK while arr[back] ≤ arr[i] (for max deque).
 *  5. Before reading front: pop from FRONT if front index ≤ i - k (out of window).
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  25a. SLIDING WINDOW MAXIMUM — LC #239
// ────────────────────────────────────────────────────────────

/**
 * Return max of every window of size k.
 *
 * Monotonic DECREASING deque of indices.
 * Front of deque = index of max in current window.
 *
 * DRY RUN: nums=[1,3,-1,-3,5,3,6,7], k=3
 *   i=0: deque=[0] (val 1)
 *   i=1: 3>1, pop 0. deque=[1] (val 3)
 *   i=2: -1<3, push. deque=[1,2]. Window [0,2] → max=nums[1]=3 ✓
 *   i=3: -3<-1, push. deque=[1,2,3]. Front 1 still in [1,3]. max=3 ✓
 *   i=4: 5>-3, pop 3. 5>-1, pop 2. 5>3, pop 1. deque=[4]. max=5 ✓
 *   i=5: 3<5, push. deque=[4,5]. max=5 ✓
 *   i=6: 6>3, pop 5. 6>5, pop 4. deque=[6]. max=6 ✓
 *   i=7: 7>6, pop 6. deque=[7]. max=7 ✓
 *   Result: [3,3,5,5,6,7] ✓
 */
function maxSlidingWindow(nums, k) {
  const deque = []; // Stores indices, monotonic decreasing by values
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    // Remove from FRONT if out of window
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Remove from BACK if current is larger (maintain decreasing)
    while (deque.length > 0 && nums[deque[deque.length - 1]] <= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    // Window is full (i >= k - 1), record result
    if (i >= k - 1) {
      result.push(nums[deque[0]]); // Front = max index
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  25b. SLIDING WINDOW MINIMUM
// ────────────────────────────────────────────────────────────

/**
 * Same logic but maintain INCREASING deque. Front = min.
 */
function minSlidingWindow(nums, k) {
  const deque = [];
  const result = [];

  for (let i = 0; i < nums.length; i++) {
    while (deque.length > 0 && deque[0] <= i - k) {
      deque.shift();
    }

    // Maintain INCREASING: remove back if current is SMALLER
    while (deque.length > 0 && nums[deque[deque.length - 1]] >= nums[i]) {
      deque.pop();
    }

    deque.push(i);

    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  25c. SHORTEST SUBARRAY WITH SUM ≥ K — LC #862
// ────────────────────────────────────────────────────────────

/**
 * Unlike basic sliding window, this handles NEGATIVE numbers.
 * Use prefix sum + monotonic INCREASING deque.
 *
 * For each i, we need smallest j < i where prefix[i] - prefix[j] >= k.
 * Deque stores indices j in increasing order of prefix[j].
 *
 * 1. Pop from FRONT while prefix[i] - prefix[front] >= k (valid, try shorter).
 * 2. Pop from BACK while prefix[back] >= prefix[i] (back is worse, never needed).
 */
function shortestSubarray(nums, k) {
  const n = nums.length;
  const prefix = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefix[i + 1] = prefix[i] + nums[i];
  }

  const deque = []; // Monotonic increasing by prefix value
  let minLen = Infinity;

  for (let i = 0; i <= n; i++) {
    // Pop from front: found valid subarrays, try shorter
    while (deque.length > 0 && prefix[i] - prefix[deque[0]] >= k) {
      minLen = Math.min(minLen, i - deque.shift());
    }

    // Pop from back: prefix[back] >= prefix[i] means back is dominated
    while (deque.length > 0 && prefix[deque[deque.length - 1]] >= prefix[i]) {
      deque.pop();
    }

    deque.push(i);
  }

  return minLen === Infinity ? -1 : minLen;
}

// ────────────────────────────────────────────────────────────
//  25d. JUMP GAME VI — LC #1696
// ────────────────────────────────────────────────────────────

/**
 * From index i, jump to any index in [i+1, i+k]. Maximize score sum.
 * dp[i] = nums[i] + max(dp[i-k..i-1])
 *
 * Use monotonic decreasing deque to track max dp in window of size k.
 */
function maxResult(nums, k) {
  const n = nums.length;
  const dp = new Array(n).fill(0);
  dp[0] = nums[0];

  const deque = [0]; // Indices, monotonic decreasing by dp value

  for (let i = 1; i < n; i++) {
    // Remove front if out of window
    while (deque.length > 0 && deque[0] < i - k) {
      deque.shift();
    }

    dp[i] = nums[i] + dp[deque[0]]; // Best reachable dp value

    // Maintain decreasing deque
    while (deque.length > 0 && dp[deque[deque.length - 1]] <= dp[i]) {
      deque.pop();
    }

    deque.push(i);
  }

  return dp[n - 1];
}

// ────────────────────────────────────────────────────────────
//  25e. LONGEST CONTINUOUS SUBARRAY ABS DIFF ≤ LIMIT — LC #1438
// ────────────────────────────────────────────────────────────

/**
 * Sliding window where max - min ≤ limit.
 * Use TWO monotonic deques: one for max, one for min.
 * Shrink window from left when max - min > limit.
 */
function longestSubarray(nums, limit) {
  const maxDeque = []; // Decreasing → front = max
  const minDeque = []; // Increasing → front = min
  let left = 0;
  let result = 0;

  for (let right = 0; right < nums.length; right++) {
    while (maxDeque.length > 0 && nums[maxDeque[maxDeque.length - 1]] <= nums[right]) {
      maxDeque.pop();
    }
    maxDeque.push(right);

    while (minDeque.length > 0 && nums[minDeque[minDeque.length - 1]] >= nums[right]) {
      minDeque.pop();
    }
    minDeque.push(right);

    // Shrink window if constraint violated
    while (nums[maxDeque[0]] - nums[minDeque[0]] > limit) {
      left++;
      if (maxDeque[0] < left) maxDeque.shift();
      if (minDeque[0] < left) minDeque.shift();
    }

    result = Math.max(result, right - left + 1);
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== MONOTONIC QUEUE / DEQUE ===\n");

console.log("25a. Sliding Window Max:", maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// [3,3,5,5,6,7]

console.log("\n25b. Sliding Window Min:", minSlidingWindow([1,3,-1,-3,5,3,6,7], 3));
// [-1,-3,-3,-3,3,3]

console.log("\n25c. Shortest Subarray Sum≥K:", shortestSubarray([2,-1,2], 3)); // 3

console.log("\n25d. Jump Game VI:", maxResult([1,-1,-2,4,-7,3], 2)); // 7

console.log("\n25e. Longest Subarray |diff|≤limit:", longestSubarray([8,2,4,7], 4)); // 2

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                    | Difficulty | LC #  |
 *  |--------------------------------------------|------------|-------|
 *  | Sliding Window Maximum                     | Hard       | 239   |
 *  | Shortest Subarray with Sum ≥ K             | Hard       | 862   |
 *  | Jump Game VI                               | Medium     | 1696  |
 *  | Longest Continuous Subarray Diff ≤ Limit   | Medium     | 1438  |
 *  | Constrained Subsequence Sum                | Hard       | 1425  |
 *  | Max Value of Equation                      | Hard       | 1499  |
 *
 *  MONOTONIC STACK vs MONOTONIC DEQUE:
 *  ─────────────────────────────────────
 *  Stack: Elements exit from ONE end (top).
 *    → "Next greater/smaller" type problems.
 *    → No window constraint.
 *
 *  Deque: Elements exit from BOTH ends (front and back).
 *    → "Sliding window max/min" type problems.
 *    → Front exits when out of window.
 *    → Back exits when dominated by new element.
 */
