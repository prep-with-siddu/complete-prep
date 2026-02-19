// ============================================================
// 📘 CONCEPT 12: GREEDY ALGORITHMS
// ============================================================
// Greedy = Make the locally optimal choice at each step,
//          hoping it leads to the globally optimal solution.
// ============================================================

// ============================================================
// 🔹 WHAT IS A GREEDY ALGORITHM?
// ============================================================
//
// At each step, pick the BEST option available RIGHT NOW,
// without worrying about future consequences.
//
// KEY INSIGHT: Greedy works when making the best local choice
// at every step produces the best global result.
//
// It does NOT always work! You need to PROVE (or intuit) that
// the greedy choice is correct for the specific problem.
//
// WHEN GREEDY WORKS:
// 1. GREEDY CHOICE PROPERTY: Local optimal → Global optimal
// 2. OPTIMAL SUBSTRUCTURE: Optimal solution contains optimal
//    solutions to subproblems

// ============================================================
// 🔹 GREEDY vs DYNAMIC PROGRAMMING
// ============================================================
/*
┌────────────────────┬──────────────────┬──────────────────┐
│                    │ GREEDY           │ DP               │
├────────────────────┼──────────────────┼──────────────────┤
│ Decision making    │ One-time choice  │ All subproblems  │
│ Looks at           │ Current best     │ All options      │
│ Guarantee optimal? │ Only if proved   │ Always           │
│ Time complexity    │ Usually O(n logn)│ Usually O(n²)    │
│ Implementation     │ Simpler          │ More complex     │
│ Backtracking?      │ Never            │ Can reconstruct  │
└────────────────────┴──────────────────┴──────────────────┘
*/

// ============================================================
// 🔹 EXAMPLE 1: ACTIVITY SELECTION (Interval Scheduling)
// ============================================================
// Given activities with start and end times,
// find the maximum number of non-overlapping activities.
// GREEDY STRATEGY: Always pick the activity that ENDS EARLIEST.
function activitySelection(activities) {
  // Sort by end time
  activities.sort((a, b) => a[1] - b[1]);

  const selected = [activities[0]];
  let lastEnd = activities[0][1];

  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastEnd) { // No overlap
      selected.push(activities[i]);
      lastEnd = activities[i][1];
    }
  }
  return selected;
}
// [[1,3],[2,5],[3,6],[5,7],[8,9]] → [[1,3],[5,7],[8,9]]
// WHY earliest end? Leaves maximum room for future activities!

// ============================================================
// 🔹 EXAMPLE 2: COIN CHANGE (Greedy version)
// ============================================================
// ⚠️ Greedy works for standard coin systems (1,5,10,25)
// ⚠️ Does NOT work for arbitrary coin sets!
function coinChangeGreedy(coins, amount) {
  coins.sort((a, b) => b - a); // Sort descending
  let count = 0;

  for (const coin of coins) {
    const numCoins = Math.floor(amount / coin);
    count += numCoins;
    amount -= numCoins * coin;
  }

  return amount === 0 ? count : -1;
}
// coins=[25,10,5,1], amount=41 → 25+10+5+1 = 4 coins ✅
// coins=[9,6,5,1], amount=11 → 9+1+1=3, but optimal is 6+5=2 ❌
// For arbitrary coins, use DP!

// ============================================================
// 🔹 EXAMPLE 3: JUMP GAME
// ============================================================
// Can you reach the last index? nums[i] = max jump from position i.
function canJump(nums) {
  let maxReach = 0;
  for (let i = 0; i < nums.length; i++) {
    if (i > maxReach) return false; // Can't reach this position
    maxReach = Math.max(maxReach, i + nums[i]);
  }
  return true;
}
// [2,3,1,1,4] → true (2→3→4 or 2→1→1→4)
// [3,2,1,0,4] → false (stuck at index 3)

// Jump Game II — Minimum jumps to reach end
function jump(nums) {
  let jumps = 0, currentEnd = 0, farthest = 0;
  for (let i = 0; i < nums.length - 1; i++) {
    farthest = Math.max(farthest, i + nums[i]);
    if (i === currentEnd) { // Must jump here
      jumps++;
      currentEnd = farthest;
    }
  }
  return jumps;
}

// ============================================================
// 🔹 EXAMPLE 4: FRACTIONAL KNAPSACK
// ============================================================
// Fill a knapsack with items (can take fractions of items)
// GREEDY: Take items with highest value/weight ratio first
function fractionalKnapsack(items, capacity) {
  // items = [{weight, value}, ...]
  items.sort((a, b) => b.value / b.weight - a.value / a.weight);

  let totalValue = 0;
  for (const item of items) {
    if (capacity >= item.weight) {
      totalValue += item.value;
      capacity -= item.weight;
    } else {
      totalValue += (capacity / item.weight) * item.value;
      break;
    }
  }
  return totalValue;
}
// ⚠️ For 0/1 Knapsack (no fractions), greedy FAILS → use DP!

// ============================================================
// 🔹 EXAMPLE 5: MERGE INTERVALS
// ============================================================
function mergeIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]); // Sort by start
  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    if (intervals[i][0] <= last[1]) {
      last[1] = Math.max(last[1], intervals[i][1]); // Merge
    } else {
      merged.push(intervals[i]);
    }
  }
  return merged;
}
// [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]

// ============================================================
// 🔹 EXAMPLE 6: TASK SCHEDULER
// ============================================================
// Schedule tasks with cooldown. Return minimum intervals.
function leastInterval(tasks, n) {
  const freq = new Array(26).fill(0);
  for (const task of tasks) freq[task.charCodeAt(0) - 65]++;

  const maxFreq = Math.max(...freq);
  const maxCount = freq.filter(f => f === maxFreq).length;

  // Formula: (maxFreq - 1) * (n + 1) + maxCount
  // But can't be less than total tasks
  return Math.max(tasks.length, (maxFreq - 1) * (n + 1) + maxCount);
}
// ["A","A","A","B","B","B"], n=2
// A B _ A B _ A B → 8 intervals

// ============================================================
// 🔹 EXAMPLE 7: GAS STATION
// ============================================================
function canCompleteCircuit(gas, cost) {
  let totalTank = 0, currentTank = 0, start = 0;

  for (let i = 0; i < gas.length; i++) {
    const net = gas[i] - cost[i];
    totalTank += net;
    currentTank += net;

    if (currentTank < 0) {
      start = i + 1;     // Can't start from any station 0..i
      currentTank = 0;   // Reset tank
    }
  }

  return totalTank >= 0 ? start : -1;
}

// ============================================================
// 🔹 EXAMPLE 8: BEST TIME TO BUY & SELL STOCK II
// ============================================================
// Multiple transactions allowed. Buy/sell as many times as you want.
function maxProfit(prices) {
  let profit = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      profit += prices[i] - prices[i - 1]; // Collect every upward move
    }
  }
  return profit;
}

// ============================================================
// 🔹 EXAMPLE 9: HUFFMAN CODING (Concept)
// ============================================================
// Build an optimal prefix-free encoding tree.
// GREEDY: Always merge the two least frequent nodes.
// Time: O(n log n) using a min-heap
//
// Steps:
// 1. Count frequency of each character
// 2. Create a min-heap of [frequency, character] nodes
// 3. While heap has > 1 node:
//    a. Extract two minimum nodes
//    b. Create a new node with their sum as frequency
//    c. Insert back into heap
// 4. The remaining node is the root of the Huffman tree

// ============================================================
// 🔹 COMMON GREEDY PATTERNS
// ============================================================
/*
1. SORT FIRST → Most greedy problems require sorting
   - By end time (activity selection)
   - By start time (merge intervals)
   - By ratio (knapsack)
   - By some criteria that enables greedy choice

2. INTERVAL PROBLEMS
   - Merge overlapping intervals
   - Non-overlapping intervals (max count)
   - Minimum meeting rooms

3. TWO POINTER after sorting
   - Assign cookies, partition labels

4. TRACK RUNNING MAX/MIN
   - Jump game, gas station
   - Best time to buy/sell stock

5. PRIORITY QUEUE + GREEDY
   - Task scheduler, reorganize string
   - Huffman coding
*/

// ============================================================
// 🔹 HOW TO IDENTIFY GREEDY PROBLEMS
// ============================================================
/*
Ask yourself:
1. "Can I make a locally optimal choice at each step?"
2. "Does that choice NOT affect future choices negatively?"
3. "Can I PROVE that local optimal = global optimal?"

CLUES that suggest greedy:
- Keywords: "minimum", "maximum", "least", "most", "optimal"
- Interval/scheduling problems
- Simple decision at each step
- No need to explore all combinations

CLUES that suggest NOT greedy (use DP instead):
- "Count all ways"
- Choices affect each other
- Need to consider future consequences
- Can't sort to simplify
*/

// ============================================================
// 🔹 COMMON GREEDY MISTAKES
// ============================================================
/*
❌ Assuming greedy works without proof
   - Coin change with arbitrary coins
   - 0/1 Knapsack
   
❌ Forgetting to sort
   - Most greedy algorithms need sorted input!
   
❌ Wrong sorting criteria
   - Activity selection: sort by END time, not start time

✅ When in doubt:
   - Try greedy first (it's simpler)
   - Find a counterexample to disprove
   - If greedy fails, switch to DP
*/

console.log("✅ Greedy — Make the best choice now, don't look back!");
