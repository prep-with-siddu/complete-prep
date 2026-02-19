/**
 * ============================================================
 *  PATTERN 20: GREEDY
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Make the LOCALLY optimal choice at each step, hoping it leads
 *  to a globally optimal solution. Works when the problem has:
 *
 *    1. GREEDY CHOICE PROPERTY: A locally optimal choice leads
 *       to a globally optimal solution.
 *    2. OPTIMAL SUBSTRUCTURE: Optimal solution contains optimal
 *       solutions to subproblems.
 *
 *  Common greedy strategies:
 *    • Sort by deadline/end time → process in order.
 *    • Always pick the best available option.
 *    • Jump as far as you can.
 *    • Assign the smallest resource that satisfies constraint.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Jump game" — can you reach the end?
 *    ✅ "Gas station" — find starting point for circular route.
 *    ✅ "Task scheduler" — minimize idle time.
 *    ✅ "Meeting rooms" — minimum rooms needed.
 *    ✅ "Assign cookies" — maximize satisfied children.
 *    ✅ "Non-overlapping intervals" — minimum removals.
 *    ✅ Problems that feel like DP but have a clear greedy insight.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Sort the input — most greedy solutions start with sorting.
 *  2. Think: "What's the best choice RIGHT NOW?"
 *  3. If greedy doesn't work → fall back to DP.
 *  4. Prove correctness by exchange argument: swapping any greedy
 *     choice with alternative doesn't improve the result.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  20a. JUMP GAME — LC #55
// ────────────────────────────────────────────────────────────

/**
 * Can you reach the last index?
 * Track the FARTHEST index you can reach.
 *
 * DRY RUN: [2,3,1,1,4]
 *   i=0: far=max(0, 0+2)=2
 *   i=1: far=max(2, 1+3)=4 → 4 >= 4 (last index) → true ✓
 */
function canJump(nums) {
  let farthest = 0;

  for (let i = 0; i < nums.length; i++) {
    if (i > farthest) return false; // Can't reach this index
    farthest = Math.max(farthest, i + nums[i]);
    if (farthest >= nums.length - 1) return true;
  }

  return true;
}

// ────────────────────────────────────────────────────────────
//  20b. JUMP GAME II — LC #45
// ────────────────────────────────────────────────────────────

/**
 * Minimum jumps to reach end. Guarantee you can reach.
 * BFS-like: track current range [start, end], find farthest
 * reachable from that range, then jump.
 */
function jump(nums) {
  let jumps = 0;
  let currentEnd = 0;
  let farthest = 0;

  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);

    if (i === currentEnd) { // Must jump
      jumps++;
      currentEnd = farthest;

      if (currentEnd >= nums.length - 1) break;
    }
  }

  return jumps;
}

// ────────────────────────────────────────────────────────────
//  20c. GAS STATION — LC #134
// ────────────────────────────────────────────────────────────

/**
 * Circular route with gas stations. Find starting index.
 *
 * Key insight:
 *   1. If total gas >= total cost → solution exists.
 *   2. If running tank < 0 at station i → start from i+1.
 *
 * DRY RUN: gas=[1,2,3,4,5] cost=[3,4,5,1,2]
 *   total = (1-3)+(2-4)+(3-5)+(4-1)+(5-2) = -2+(-2)+(-2)+3+3 = 0 (ok)
 *   tank: -2 → reset@1: -2 → reset@2: -2 → reset@3: 3 → 3+3=6
 *   Start = 3 ✓
 */
function canCompleteCircuit(gas, cost) {
  let totalGas = 0, totalCost = 0;
  let tank = 0, start = 0;

  for (let i = 0; i < gas.length; i++) {
    totalGas += gas[i];
    totalCost += cost[i];
    tank += gas[i] - cost[i];

    if (tank < 0) {
      start = i + 1; // Restart from next station
      tank = 0;
    }
  }

  return totalGas >= totalCost ? start : -1;
}

// ────────────────────────────────────────────────────────────
//  20d. TASK SCHEDULER — LC #621
// ────────────────────────────────────────────────────────────

/**
 * Schedule tasks with cooldown n between same tasks. Minimize total time.
 *
 * Key insight: The most frequent task determines the structure.
 * Formula: (maxFreq - 1) * (n + 1) + countOfMaxFreq
 *
 * Example: tasks=[A,A,A,B,B,B], n=2
 *   maxFreq=3, countOfMax=2 (A and B both appear 3 times)
 *   slots = (3-1) * (2+1) + 2 = 6 + 2 = 8
 *   Schedule: A B _ A B _ A B → 8 ✓
 *
 * But if there are MORE tasks than slots, answer = tasks.length.
 */
function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const t of tasks) freq[t.charCodeAt(0) - 65]++;

  const maxFreq = Math.max(...freq);
  const countOfMax = freq.filter(f => f === maxFreq).length;

  const formulaResult = (maxFreq - 1) * (n + 1) + countOfMax;
  return Math.max(formulaResult, tasks.length);
}

// ────────────────────────────────────────────────────────────
//  20e. NON-OVERLAPPING INTERVALS — LC #435
// ────────────────────────────────────────────────────────────

/**
 * Minimum intervals to remove so remaining are non-overlapping.
 * Greedy: sort by END time, keep the one that finishes earliest.
 * This is the classic "Activity Selection Problem."
 */
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time

  let removals = 0;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end; // No overlap, keep this interval
    } else {
      removals++; // Overlap, remove this one (it has later end)
    }
  }

  return removals;
}

// ────────────────────────────────────────────────────────────
//  20f. PARTITION LABELS — LC #763
// ────────────────────────────────────────────────────────────

/**
 * Partition string so each letter appears in at most one part.
 * Record last occurrence of each char. Extend partition boundary
 * to cover all chars seen so far.
 */
function partitionLabels(s) {
  const lastIndex = {};
  for (let i = 0; i < s.length; i++) {
    lastIndex[s[i]] = i;
  }

  const result = [];
  let start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
    end = Math.max(end, lastIndex[s[i]]);

    if (i === end) {
      result.push(end - start + 1);
      start = end + 1;
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  20g. ASSIGN COOKIES — LC #455
// ────────────────────────────────────────────────────────────

/**
 * Greed factor g[i], cookie size s[j]. Assign smallest sufficient cookie.
 * Sort both, use two pointers.
 */
function findContentChildren(g, s) {
  g.sort((a, b) => a - b);
  s.sort((a, b) => a - b);

  let child = 0, cookie = 0;

  while (child < g.length && cookie < s.length) {
    if (s[cookie] >= g[child]) child++; // Satisfied
    cookie++;
  }

  return child;
}

// ────────────────────────────────────────────────────────────
//  20h. MAXIMUM SUBARRAY (Kadane's Algorithm) — LC #53
// ────────────────────────────────────────────────────────────

/**
 * Greedy / DP hybrid. At each step, decide:
 * extend current subarray OR start new one.
 * current = max(nums[i], current + nums[i])
 */
function maxSubArray(nums) {
  let current = nums[0];
  let maxSum = nums[0];

  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    maxSum = Math.max(maxSum, current);
  }

  return maxSum;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== GREEDY ===\n");

console.log("20a. Jump Game: [2,3,1,1,4] →", canJump([2, 3, 1, 1, 4]));     // true
console.log("     Jump Game: [3,2,1,0,4] →", canJump([3, 2, 1, 0, 4]));     // false

console.log("\n20b. Jump Game II: [2,3,1,1,4] →", jump([2, 3, 1, 1, 4]));    // 2

console.log("\n20c. Gas Station:", canCompleteCircuit([1,2,3,4,5], [3,4,5,1,2])); // 3

console.log("\n20d. Task Scheduler: [A,A,A,B,B,B] n=2 →",
  leastInterval(['A','A','A','B','B','B'], 2)); // 8

console.log("\n20e. Non-Overlapping:", eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]])); // 1

console.log("\n20f. Partition Labels: 'ababcbacadefegdehijhklij' →",
  partitionLabels('ababcbacadefegdehijhklij')); // [9,7,8]

console.log("\n20g. Assign Cookies:", findContentChildren([1,2,3], [1,1])); // 1

console.log("\n20h. Max Subarray: [-2,1,-3,4,-1,2,1,-5,4] →",
  maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Jump Game                               | Medium     | 55    |
 *  | Jump Game II                            | Medium     | 45    |
 *  | Gas Station                             | Medium     | 134   |
 *  | Task Scheduler                          | Medium     | 621   |
 *  | Non-Overlapping Intervals               | Medium     | 435   |
 *  | Partition Labels                        | Medium     | 763   |
 *  | Assign Cookies                          | Easy       | 455   |
 *  | Maximum Subarray                        | Medium     | 53    |
 *  | Best Time to Buy and Sell Stock II      | Medium     | 122   |
 *  | Queue Reconstruction by Height          | Medium     | 406   |
 *  | Boats to Save People                    | Medium     | 881   |
 *  | Minimum Number of Arrows                | Medium     | 452   |
 *  | Candy                                   | Hard       | 135   |
 *
 *  GREEDY vs DP — WHEN TO USE WHICH?
 *  ──────────────────────────────────
 *  GREEDY: Local optimal → global optimal (provable). Faster.
 *    Clues: "maximum/minimum with one pass", "sort + iterate"
 *
 *  DP: Need to consider ALL possibilities / future consequences.
 *    Clues: "number of ways", "can you form X from parts",
 *           greedy gives wrong answer on counterexamples.
 *
 *  If in doubt, try greedy first (simpler), verify with examples,
 *  fall back to DP if greedy fails.
 */
