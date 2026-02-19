// ============================================================
// 📘 CONCEPT 13: DYNAMIC PROGRAMMING (DP)
// ============================================================
// DP = Solving problems by breaking them into OVERLAPPING
//      subproblems, solving each ONCE, and storing results.
// The most feared and most important DSA topic!
// ============================================================

// ============================================================
// 🔹 WHAT IS DYNAMIC PROGRAMMING?
// ============================================================
// Two conditions for DP:
// 1. OVERLAPPING SUBPROBLEMS: Same subproblem is solved multiple times
// 2. OPTIMAL SUBSTRUCTURE: Optimal solution is built from optimal
//    solutions of subproblems
//
// DP = Recursion + Memoization (Top-Down)
//   OR
// DP = Iterative + Table (Bottom-Up)
//
// CORE IDEA: "Don't solve the same problem twice — store the result!"

// ============================================================
// 🔹 TWO APPROACHES
// ============================================================

// --- APPROACH 1: TOP-DOWN (Memoization) ---
// Start from the big problem, recurse down, cache results
function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n]; // Already solved!
  memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo);
  return memo[n];
}
// Without memo: O(2^n) 😱
// With memo:    O(n) 😊

// --- APPROACH 2: BOTTOM-UP (Tabulation) ---
// Start from smallest subproblem, build up to the answer
function fibTab(n) {
  if (n <= 1) return n;
  const dp = new Array(n + 1);
  dp[0] = 0;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2];
  }
  return dp[n];
}
// Time: O(n), Space: O(n)

// Space-optimized (only need last 2 values):
function fibOptimized(n) {
  if (n <= 1) return n;
  let prev2 = 0, prev1 = 1;
  for (let i = 2; i <= n; i++) {
    const curr = prev1 + prev2;
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
// Time: O(n), Space: O(1) ✅

// ============================================================
// 🔹 HOW TO SOLVE ANY DP PROBLEM ⭐⭐⭐
// ============================================================
/*
Step 1: DEFINE the state
   - What variables define a subproblem?
   - dp[i] = ?, dp[i][j] = ?

Step 2: FIND the recurrence relation (transition)
   - How does dp[i] relate to smaller subproblems?
   - dp[i] = dp[i-1] + dp[i-2]  (Fibonacci)
   - dp[i] = min(dp[i-1], dp[i-2]) + cost  (Min cost)

Step 3: DETERMINE the base cases
   - What are the smallest subproblems with known answers?
   - dp[0] = 0, dp[1] = 1

Step 4: DETERMINE the computation order
   - Bottom-up: iterate from smallest → largest
   - Top-down: recurse from largest → smallest

Step 5: EXTRACT the answer
   - dp[n], dp[n][m], max(dp), etc.
*/

// ============================================================
// 🔹 1D DP PROBLEMS
// ============================================================

// --- Climbing Stairs ---
// You can climb 1 or 2 steps. How many ways to reach step n?
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
// State: dp[i] = ways to reach step i
// Recurrence: dp[i] = dp[i-1] + dp[i-2]
// Base: dp[1]=1, dp[2]=2

// --- House Robber ---
// Can't rob two adjacent houses. Maximize stolen amount.
function rob(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];

  let prev2 = 0, prev1 = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const curr = Math.max(prev1, prev2 + nums[i]);
    prev2 = prev1;
    prev1 = curr;
  }
  return prev1;
}
// State: dp[i] = max money robbing houses 0..i
// Recurrence: dp[i] = max(dp[i-1], dp[i-2] + nums[i])
//   Either skip house i (dp[i-1]) or rob it (dp[i-2] + nums[i])

// --- Coin Change ---
// Find minimum coins to make the amount
function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // 0 coins to make amount 0

  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      if (coin <= i && dp[i - coin] !== Infinity) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}
// coins=[1,5,11], amount=15 → 3 (5+5+5), NOT greedy 11+1+1+1+1!

// --- Longest Increasing Subsequence (LIS) ---
function lengthOfLIS(nums) {
  const dp = new Array(nums.length).fill(1);

  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  return Math.max(...dp);
}
// [10,9,2,5,3,7,101,18] → 4 (2,3,7,101)
// dp[i] = length of LIS ending at index i
// Time: O(n²), can be optimized to O(n log n) with binary search

// ============================================================
// 🔹 2D DP PROBLEMS
// ============================================================

// --- Unique Paths (Grid) ---
// How many paths from top-left to bottom-right? (only right or down)
function uniquePaths(m, n) {
  const dp = Array.from({ length: m }, () => new Array(n).fill(1));

  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
    }
  }
  return dp[m - 1][n - 1];
}
// State: dp[i][j] = number of paths to reach cell (i,j)
// Recurrence: dp[i][j] = dp[i-1][j] + dp[i][j-1]

// --- Longest Common Subsequence (LCS) ---
function longestCommonSubsequence(text1, text2) {
  const m = text1.length, n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] === text2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1] + 1; // Characters match
      } else {
        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]); // Skip one
      }
    }
  }
  return dp[m][n];
}
// "abcde", "ace" → 3 ("ace")

// --- 0/1 Knapsack ---
function knapsack(weights, values, capacity) {
  const n = weights.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(capacity + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      dp[i][w] = dp[i - 1][w]; // Don't take item i
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(dp[i][w], dp[i - 1][w - weights[i - 1]] + values[i - 1]);
      }
    }
  }
  return dp[n][capacity];
}
// State: dp[i][w] = max value using items 1..i with capacity w
// Recurrence: dp[i][w] = max(skip item, take item)

// --- Edit Distance ---
function minDistance(word1, word2) {
  const m = word1.length, n = word2.length;
  const dp = Array.from({ length: m + 1 }, (_, i) =>
    new Array(n + 1).fill(0).map((_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] === word2[j - 1]) {
        dp[i][j] = dp[i - 1][j - 1]; // No operation needed
      } else {
        dp[i][j] = 1 + Math.min(
          dp[i - 1][j],     // Delete
          dp[i][j - 1],     // Insert
          dp[i - 1][j - 1]  // Replace
        );
      }
    }
  }
  return dp[m][n];
}
// "horse", "ros" → 3

// ============================================================
// 🔹 COMMON DP PATTERNS
// ============================================================
/*
1. LINEAR DP (1D array)
   - Fibonacci, Climbing Stairs, House Robber
   - dp[i] depends on dp[i-1], dp[i-2], etc.

2. GRID DP (2D array)
   - Unique Paths, Min Path Sum
   - dp[i][j] depends on neighbors

3. STRING DP (2D: two strings)
   - LCS, Edit Distance, Palindrome
   - dp[i][j] compares characters of two strings

4. KNAPSACK DP
   - 0/1 Knapsack, Coin Change, Subset Sum
   - "Choose or skip" pattern

5. INTERVAL DP
   - Matrix Chain Multiplication, Burst Balloons
   - dp[i][j] depends on all splits between i and j

6. STATE MACHINE DP
   - Buy/Sell Stock with cooldown
   - Multiple states: holding, not holding, cooldown
*/

// ============================================================
// 🔹 DP IDENTIFICATION GUIDE
// ============================================================
/*
KEYWORDS that suggest DP:
- "Maximum/Minimum"
- "Count the number of ways"
- "Is it possible to..."
- "Longest/Shortest"
- "How many"

Questions to ask yourself:
1. Can I break this into smaller subproblems?
2. Are there overlapping subproblems?
3. Can I define a clear state and transition?

If YES to all → probably DP!
*/

// ============================================================
// 🔹 TOP-DOWN vs BOTTOM-UP
// ============================================================
/*
┌──────────────┬───────────────────┬───────────────────┐
│              │ TOP-DOWN (Memo)   │ BOTTOM-UP (Tab)   │
├──────────────┼───────────────────┼───────────────────┤
│ Style        │ Recursive         │ Iterative         │
│ Easy to code │ Often easier      │ Sometimes harder  │
│ Performance  │ Function overhead │ Slightly faster   │
│ Space optim. │ Harder            │ Easier            │
│ Solves only  │ Needed subprobs   │ All subproblems   │
│ Stack        │ Can overflow      │ No risk           │
│ Start with   │ ✅ Start here     │ Optimize later    │
└──────────────┴───────────────────┴───────────────────┘

Strategy: Start with TOP-DOWN (easier to think about),
          then convert to BOTTOM-UP for optimization.
*/

console.log("✅ DP — Store results, avoid redundant work!");
