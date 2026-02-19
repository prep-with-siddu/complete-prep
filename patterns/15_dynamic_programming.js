/**
 * ============================================================
 *  PATTERN 15: DYNAMIC PROGRAMMING (DP)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  DP = solve subproblems, store results, combine.
 *
 *  Two properties required:
 *    1. OPTIMAL SUBSTRUCTURE: optimal solution uses optimal sub-solutions.
 *    2. OVERLAPPING SUBPROBLEMS: same subproblems solved multiple times.
 *
 *  Two approaches:
 *    • TOP-DOWN (Memoization): recursive + cache.
 *    • BOTTOM-UP (Tabulation): iterative, build table from base case.
 *
 *  DP Sub-Patterns:
 *    a) Fibonacci-type (climbing stairs, house robber)
 *    b) 0/1 Knapsack (subset sum, partition equal sum)
 *    c) Unbounded Knapsack (coin change, rod cutting)
 *    d) Longest Common Subsequence / Substring
 *    e) Longest Increasing Subsequence
 *    f) Grid DP (unique paths, min path sum)
 *    g) Palindromic DP (palindrome substrings, partitioning)
 *    h) String DP (edit distance, regex matching)
 *    i) Interval DP (burst balloons, matrix chain)
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Minimum/Maximum cost to…"
 *    ✅ "Number of ways to…"
 *    ✅ "Can you reach / partition / form target?"
 *    ✅ Choices at each step + optimal result.
 *    ✅ Problem has a natural recursive decomposition.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Define STATE clearly: dp[i] = ???
 *  2. Write RECURRENCE: dp[i] = f(dp[i-1], dp[i-2], ...)
 *  3. Define BASE CASES.
 *  4. Determine ITERATION ORDER.
 *  5. Space optimization: use rolling variables or 1D array.
 *  6. When stuck → solve with brute-force recursion → add memoization → convert to tabulation.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  15a. FIBONACCI / CLIMBING STAIRS — LC #70
// ────────────────────────────────────────────────────────────

/**
 * dp[i] = number of ways to reach step i
 * dp[i] = dp[i-1] + dp[i-2]
 * Space optimization: just keep two variables.
 */
function climbStairs(n) {
  if (n <= 2) return n;
  let prev2 = 1, prev1 = 2;

  for (let i = 3; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// ────────────────────────────────────────────────────────────
//  15b. HOUSE ROBBER — LC #198
// ────────────────────────────────────────────────────────────

/**
 * Can't rob adjacent houses. Maximize total.
 * dp[i] = max(dp[i-1], dp[i-2] + nums[i])
 *   "Skip current house" vs "Rob current + best from 2 back"
 *
 * DRY RUN: [2,7,9,3,1]
 *   dp[0]=2, dp[1]=7
 *   dp[2]=max(7, 2+9)=11
 *   dp[3]=max(11, 7+3)=11
 *   dp[4]=max(11, 11+1)=12 ✓
 */
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = nums[0];
  let prev1 = Math.max(nums[0], nums[1]);

  for (let i = 2; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }

  return prev1;
}

// ────────────────────────────────────────────────────────────
//  15c. 0/1 KNAPSACK / PARTITION EQUAL SUBSET SUM — LC #416
// ────────────────────────────────────────────────────────────

/**
 * Can you partition array into two subsets with equal sum?
 * Equivalent to: can you find a subset with sum = totalSum/2?
 * This is a 0/1 Knapsack problem.
 *
 * dp[j] = true if we can form sum j using some subset.
 * For each num: dp[j] = dp[j] || dp[j - num]
 * Iterate j from target DOWN to num (to avoid using same num twice).
 */
function canPartition(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  if (total % 2 !== 0) return false;

  const target = total / 2;
  const dp = new Array(target + 1).fill(false);
  dp[0] = true;

  for (const num of nums) {
    for (let j = target; j >= num; j--) { // Iterate BACKWARDS
      dp[j] = dp[j] || dp[j - num];
    }
  }

  return dp[target];
}

// ────────────────────────────────────────────────────────────
//  15d. COIN CHANGE (Unbounded Knapsack) — LC #322
// ────────────────────────────────────────────────────────────

/**
 * Minimum coins to make amount.
 * dp[i] = min coins to make amount i.
 * dp[i] = min(dp[i - coin] + 1) for each coin.
 * Iterate j FORWARD (unbounded: can use same coin multiple times).
 *
 * DRY RUN: coins=[1,3,4], amount=6
 *   dp: [0, Inf, Inf, Inf, Inf, Inf, Inf]
 *   Coin 1: dp = [0,1,2,3,4,5,6]
 *   Coin 3: dp[3]=min(3,dp[0]+1)=1, dp[4]=min(4,dp[1]+1)=2,
 *           dp[5]=min(5,dp[2]+1)=2, dp[6]=min(6,dp[3]+1)=2
 *   Coin 4: dp[4]=min(2,dp[0]+1)=1, dp[5]=min(2,dp[1]+1)=2,
 *           dp[6]=min(2,dp[2]+1)=2
 *   dp[6] = 2 (coins 3+3) ✓
 */
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0;

  for (const coin of coins) {
    for (let i = coin; i <= amount; i++) { // FORWARD for unbounded
      dp[i] = Math.min(dp[i], dp[i - coin] + 1);
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount];
}

// ────────────────────────────────────────────────────────────
//  15e. LONGEST COMMON SUBSEQUENCE (LCS) — LC #1143
// ────────────────────────────────────────────────────────────

/**
 * dp[i][j] = LCS of text1[0..i-1] and text2[0..j-1]
 *
 * If text1[i-1] === text2[j-1]:  dp[i][j] = dp[i-1][j-1] + 1
 * Else: dp[i][j] = max(dp[i-1][j], dp[i][j-1])
 */
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1;
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
  }

  return dp[m][n];
}

// ────────────────────────────────────────────────────────────
//  15f. LONGEST INCREASING SUBSEQUENCE (LIS) — LC #300
// ────────────────────────────────────────────────────────────

/**
 * Approach 1: DP — O(n²)
 * dp[i] = length of LIS ending at index i.
 *
 * Approach 2: Binary Search — O(n log n)
 * Maintain a "tails" array. For each num:
 *   - If num > all tails → append.
 *   - Else → replace the first tail ≥ num (binary search).
 * The length of tails = LIS length.
 */
function lengthOfLIS(nums) {
  const tails = [];

  for (const num of nums) {
    let lo = 0, hi = tails.length;

    while (lo < hi) {
      const mid = Math.floor((lo + hi) / 2);
      if (tails[mid] < num) lo = mid + 1;
      else hi = mid;
    }

    tails[lo] = num; // Replace or append
  }

  return tails.length;
}

// ────────────────────────────────────────────────────────────
//  15g. UNIQUE PATHS (Grid DP) — LC #62
// ────────────────────────────────────────────────────────────

/**
 * Robot at top-left, moves right or down, reach bottom-right.
 * dp[i][j] = dp[i-1][j] + dp[i][j-1]
 * Space optimize to 1D.
 */
function uniquePaths(m, n) {
  const dp = new Array(n).fill(1);

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[j] += dp[j - 1]; // dp[j] (from above) + dp[j-1] (from left)
    }
  }

  return dp[n - 1];
}

// ────────────────────────────────────────────────────────────
//  15h. EDIT DISTANCE — LC #72
// ────────────────────────────────────────────────────────────

/**
 * Minimum operations (insert, delete, replace) to convert word1 → word2.
 *
 * dp[i][j] = edit distance of word1[0..i-1] and word2[0..j-1]
 *
 * If chars match: dp[i][j] = dp[i-1][j-1]
 * Else: dp[i][j] = 1 + min(
 *   dp[i-1][j-1],  // replace
 *   dp[i][j-1],    // insert
 *   dp[i-1][j]     // delete
 * )
 */
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  // Base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1];
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j - 1], // Replace
          dp[i][j - 1],     // Insert
          dp[i - 1][j]      // Delete
        );
      }
    }
  }

  return dp[m][n];
}

// ────────────────────────────────────────────────────────────
//  15i. LONGEST PALINDROMIC SUBSTRING — LC #5
// ────────────────────────────────────────────────────────────

/**
 * Expand around center approach: O(n²) time, O(1) space.
 * For each position, expand as far as the palindrome goes.
 * Check both odd-length (center = i) and even-length (center = i, i+1).
 */
function longestPalindrome(s) {
  let start = 0, maxLen = 0;

  function expand(left, right) {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      if (right - left + 1 > maxLen) {
        start = left;
        maxLen = right - left + 1;
      }
      left--;
      right++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    expand(i, i);     // Odd length
    expand(i, i + 1); // Even length
  }

  return s.substring(start, start + maxLen);
}

// ────────────────────────────────────────────────────────────
//  15j. WORD BREAK — LC #139
// ────────────────────────────────────────────────────────────

/**
 * dp[i] = true if s[0..i-1] can be segmented into dictionary words.
 * dp[0] = true (empty string)
 * dp[i] = OR over all j < i: dp[j] && s[j..i-1] is a word.
 */
function wordBreak(s, wordDict) {
  const wordSet = new Set(wordDict);
  const dp = new Array(s.length + 1).fill(false);
  dp[0] = true;

  for (let i = 1; i <= s.length; i++) {
    for (let j = 0; j < i; j++) {
      if (dp[j] && wordSet.has(s.substring(j, i))) {
        dp[i] = true;
        break;
      }
    }
  }

  return dp[s.length];
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== DYNAMIC PROGRAMMING ===\n");

console.log("15a. Climb Stairs (n=5):", climbStairs(5)); // 8

console.log("\n15b. House Robber: [2,7,9,3,1] →", rob([2, 7, 9, 3, 1])); // 12

console.log("\n15c. Partition Equal Sum: [1,5,11,5] →", canPartition([1, 5, 11, 5])); // true
console.log("     Partition Equal Sum: [1,2,3,5] →", canPartition([1, 2, 3, 5])); // false

console.log("\n15d. Coin Change: [1,3,4] amount=6 →", coinChange([1, 3, 4], 6)); // 2

console.log("\n15e. LCS: 'abcde', 'ace' →", longestCommonSubsequence('abcde', 'ace')); // 3

console.log("\n15f. LIS: [10,9,2,5,3,7,101,18] →", lengthOfLIS([10, 9, 2, 5, 3, 7, 101, 18])); // 4

console.log("\n15g. Unique Paths (3x7):", uniquePaths(3, 7)); // 28

console.log("\n15h. Edit Distance: 'horse'→'ros' →", minDistance('horse', 'ros')); // 3

console.log("\n15i. Longest Palindrome: 'babad' →", longestPalindrome('babad')); // 'bab' or 'aba'

console.log("\n15j. Word Break: 'leetcode' →", wordBreak('leetcode', ['leet', 'code'])); // true

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Climbing Stairs                         | Easy       | 70    |
 *  | House Robber                            | Medium     | 198   |
 *  | House Robber II                         | Medium     | 213   |
 *  | Partition Equal Subset Sum              | Medium     | 416   |
 *  | Target Sum                              | Medium     | 494   |
 *  | Coin Change                             | Medium     | 322   |
 *  | Coin Change II                          | Medium     | 518   |
 *  | Longest Common Subsequence              | Medium     | 1143  |
 *  | Longest Increasing Subsequence          | Medium     | 300   |
 *  | Unique Paths                            | Medium     | 62    |
 *  | Minimum Path Sum                        | Medium     | 64    |
 *  | Edit Distance                           | Medium     | 72    |
 *  | Longest Palindromic Substring           | Medium     | 5     |
 *  | Palindromic Substrings                  | Medium     | 647   |
 *  | Word Break                              | Medium     | 139   |
 *  | Decode Ways                             | Medium     | 91    |
 *  | Maximum Product Subarray                | Medium     | 152   |
 *  | Burst Balloons                          | Hard       | 312   |
 *  | Regular Expression Matching             | Hard       | 10    |
 *  | Maximal Square                          | Medium     | 221   |
 *
 *  DP DECISION FLOWCHART:
 *  ──────────────────────
 *  "Min/Max cost?"       → dp[i] = min/max(choices)
 *  "Number of ways?"     → dp[i] = sum(choices)
 *  "Can you achieve X?"  → dp[i] = OR(choices) → boolean DP
 *  "Subsequence?"        → 2D dp[i][j] (LCS pattern)
 *  "Subset with target?" → 1D boolean dp, iterate backwards (0/1 knapsack)
 *  "Unlimited supply?"   → 1D dp, iterate forwards (unbounded knapsack)
 */
