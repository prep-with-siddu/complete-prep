# 🛤️ DSA Mastery Roadmap — Easy → Hard (JavaScript)

> **Your complete path to conquer DSA for coding interviews.**
> Follow this in order. Don't skip phases. Trust the process.

---

## 📌 Golden Rules Before You Start

```
1. NEVER memorize solutions — understand the WHY behind each pattern.
2. Struggle for 20-30 min before looking at hints. Then 10 more min. Then solution.
3. After solving, ALWAYS ask: "Can I do better?" (time? space?)
4. Re-solve problems you struggled with after 3 days, then after 7 days.
5. Code in pure JavaScript — no libraries. Interviewers want raw skill.
6. Every problem: read → think → pseudocode → code → test → analyze complexity.
```

---

## 🗺️ THE PATH (4 Phases, 12-16 Weeks)

```
Phase 1: Foundation (Week 1-3)      → Build muscle memory with basics
Phase 2: Core Patterns (Week 4-7)   → Learn the 15 most common patterns
Phase 3: Advanced (Week 8-11)       → Hard problems + advanced patterns
Phase 4: Interview Ready (Week 12+) → Mock interviews + speed training
```

---

## 🟢 PHASE 1: FOUNDATION (Weeks 1-3)

> **Goal:** Get comfortable with JS basics, simple data structures, and brute force.

### Week 1 — Arrays, Strings & Hash Maps

| Day | Topic | Problems (Easy) | Key Concept |
|-----|-------|-----------------|-------------|
| 1 | Array basics | LC 217 Contains Duplicate, LC 1 Two Sum | HashMap for O(1) lookup |
| 2 | Strings | LC 242 Valid Anagram, LC 125 Valid Palindrome | Character counting, two pointers |
| 3 | Arrays | LC 121 Best Time Buy/Sell Stock, LC 53 Max Subarray | Kadane's algorithm |
| 4 | Hash Maps | LC 1 Two Sum, LC 49 Group Anagrams | Map usage patterns |
| 5 | Arrays | LC 238 Product Except Self, LC 217 Contains Duplicate | Prefix/suffix products |
| 6 | Strings | LC 20 Valid Parentheses, LC 14 Longest Common Prefix | Stack basics |
| 7 | **Review** | Re-solve days 1-3 problems from memory | — |

**JS Skills to Master This Week:**
```javascript
// Map & Set
const map = new Map();          // ALWAYS use Map, not {}
const set = new Set();

// Array methods you'll use constantly
arr.sort((a, b) => a - b);     // Numeric sort (NOT default!)
arr.push() / arr.pop();        // O(1)
arr.shift();                   // O(n) — AVOID in hot loops
arr.slice(start, end);         // Returns new array
arr.splice(i, count);          // Modifies in place

// String tricks
s.charCodeAt(0) - 'a'.charCodeAt(0);  // Convert to 0-25 index
s.split('').reverse().join('');         // Reverse string
```

### Week 2 — Linked Lists, Stacks & Queues

| Day | Topic | Problems (Easy) | Key Concept |
|-----|-------|-----------------|-------------|
| 1 | Linked List basics | LC 206 Reverse Linked List, LC 21 Merge Two Sorted | Pointer manipulation |
| 2 | Linked Lists | LC 141 Linked List Cycle, LC 876 Middle of List | Fast/slow pointers intro |
| 3 | Stacks | LC 20 Valid Parentheses, LC 155 Min Stack | LIFO pattern |
| 4 | Queues | LC 232 Implement Queue using Stacks | FIFO pattern |
| 5 | Linked Lists | LC 234 Palindrome LL, LC 83 Remove Duplicates | Combine patterns |
| 6 | Stacks | LC 150 Evaluate Reverse Polish, LC 71 Simplify Path | Stack applications |
| 7 | **Review** | Re-solve week 1 hardest + week 2 days 1-3 | — |

**Build This by Hand:**
```javascript
// Linked List Node — you'll write this 100 times
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

// Stack = just use Array
const stack = [];
stack.push(x);      // push
stack.pop();        // pop
stack[stack.length - 1]; // peek

// Queue — DON'T use shift()! Use index pointer:
class Queue {
  constructor() { this.items = []; this.head = 0; }
  enqueue(x) { this.items.push(x); }
  dequeue() { return this.items[this.head++]; }
  get size() { return this.items.length - this.head; }
}
```

### Week 3 — Trees & Basic Recursion

| Day | Topic | Problems (Easy) | Key Concept |
|-----|-------|-----------------|-------------|
| 1 | Tree traversals | LC 94 Inorder, LC 144 Preorder, LC 145 Postorder | DFS three ways |
| 2 | Tree basics | LC 104 Max Depth, LC 226 Invert Binary Tree | Recursive thinking |
| 3 | Tree basics | LC 100 Same Tree, LC 572 Subtree of Another Tree | Compare trees |
| 4 | BST basics | LC 700 Search in BST, LC 108 Sorted Array to BST | BST property |
| 5 | BFS | LC 102 Level Order Traversal, LC 111 Minimum Depth | Queue-based BFS |
| 6 | Tree paths | LC 112 Path Sum, LC 257 Binary Tree Paths | DFS with path tracking |
| 7 | **Review** | Re-solve all 3 weeks' hardest problems | — |

**Tree Template — Memorize This:**
```javascript
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

// DFS Template (recursive)
function dfs(node) {
  if (!node) return;           // Base case
  // Process node.val here     // ← Preorder
  dfs(node.left);
  // Process node.val here     // ← Inorder
  dfs(node.right);
  // Process node.val here     // ← Postorder
}

// BFS Template
function bfs(root) {
  if (!root) return;
  const queue = [root];
  let head = 0;        // index pointer instead of shift()
  while (head < queue.length) {
    const size = queue.length - head;
    for (let i = 0; i < size; i++) {
      const node = queue[head++];  // O(1) dequeue
      // Process node
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
}
```

### Phase 1 Checkpoint ✅
After 3 weeks, you should be able to:
- [ ] Solve most Easy array/string problems in < 15 min
- [ ] Reverse a linked list without hesitation
- [ ] Write BFS and DFS from memory
- [ ] Know when to use Map, Set, Stack, Queue
- [ ] Explain time/space complexity of your solutions

---

## 🟡 PHASE 2: CORE PATTERNS (Weeks 4-7)

> **Goal:** Learn the 15 most-tested patterns. This is where the magic happens.

### Week 4 — Sliding Window & Two Pointers

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Two Pointers | LC 167 Two Sum II, LC 15 3Sum | Easy/Med | Sorted → two pointers |
| 2 | Two Pointers | LC 11 Container with Water, LC 42 Trapping Rain Water | Med/Hard | Shrink from both sides |
| 3 | Sliding Window (fixed) | LC 643 Max Avg Subarray, LC 239 Sliding Window Max | Easy/Hard | Window of size K |
| 4 | Sliding Window (variable) | LC 3 Longest Substring No Repeat, LC 76 Min Window Sub | Med/Hard | Expand right, shrink left |
| 5 | Combined | LC 75 Sort Colors, LC 283 Move Zeroes | Medium | Partition pointers |
| 6 | Hard practice | LC 424 Longest Repeating Replacement, LC 567 Permutation in String | Medium | Window + frequency map |
| 7 | **Review** | Recode all Medium/Hard from memory | — |

**Pattern Recognition:**
```
"Contiguous subarray" + "sum/length"     → Sliding Window
"Sorted array" + "pair/triplet"          → Two Pointers
"Minimum window" + "containing"          → Variable Sliding Window
"Remove duplicates" from sorted          → Two Pointers (read/write)
```

### Week 5 — Binary Search & Sorting

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Standard BS | LC 704 Binary Search, LC 35 Search Insert Position | Easy | Basic template |
| 2 | Rotated array | LC 33 Search Rotated, LC 153 Find Min Rotated | Medium | Modified BS |
| 3 | BS on answer | LC 875 Koko Eating Bananas, LC 1011 Ship Packages | Medium | "Minimize the max" |
| 4 | BS advanced | LC 34 First & Last Position, LC 162 Peak Element | Medium | Boundary finding |
| 5 | Merge Sort | LC 912 Sort an Array, LC 148 Sort List | Medium | D&C sorting |
| 6 | Intervals | LC 56 Merge Intervals, LC 57 Insert Interval | Medium | Sort + merge |
| 7 | **Review** | Re-solve BS problems. Write BS template 3 times. | — |

**Binary Search Template — The ONE template:**
```javascript
function binarySearch(lo, hi, condition) {
  while (lo < hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    if (condition(mid)) {
      hi = mid;       // Answer could be mid or left of mid
    } else {
      lo = mid + 1;   // Answer is right of mid
    }
  }
  return lo;
}
// This finds the FIRST position where condition(mid) is true.
// Works for 90% of binary search problems.
```

### Week 6 — DFS, BFS & Backtracking

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Tree DFS | LC 98 Validate BST, LC 236 LCA | Medium | DFS with constraints |
| 2 | Tree DFS | LC 124 Max Path Sum, LC 543 Diameter | Med/Hard | Postorder accumulation |
| 3 | Graph BFS | LC 200 Number of Islands, LC 994 Rotting Oranges | Medium | Grid BFS/DFS |
| 4 | Graph DFS | LC 133 Clone Graph, LC 130 Surrounded Regions | Medium | Deep clone, flood fill |
| 5 | Backtracking | LC 78 Subsets, LC 46 Permutations | Medium | Generate all combos |
| 6 | Backtracking | LC 39 Combination Sum, LC 22 Generate Parentheses | Medium | Choices + constraints |
| 7 | **Review** | Draw recursion trees for backtracking problems | — |

**Backtracking Template:**
```javascript
function backtrack(candidates, start, current, result) {
  if (/* goal condition */) {
    result.push([...current]);  // ← IMPORTANT: copy!
    return;
  }
  
  for (let i = start; i < candidates.length; i++) {
    // Skip duplicates if needed
    if (i > start && candidates[i] === candidates[i - 1]) continue;
    
    current.push(candidates[i]);     // Choose
    backtrack(candidates, i + 1, current, result); // Explore (i+1 for combos, i for reuse)
    current.pop();                    // Un-choose (BACKTRACK!)
  }
}
```

### Week 7 — Heaps, Greedy & Top-K

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Heap basics | LC 215 Kth Largest Element, LC 347 Top K Frequent | Medium | Min/Max heap |
| 2 | Two Heaps | LC 295 Find Median from Data Stream | Hard | Balance max + min heap |
| 3 | Greedy | LC 55 Jump Game, LC 45 Jump Game II | Med | Local optimal → global |
| 4 | Greedy | LC 134 Gas Station, LC 435 Non-overlapping Intervals | Medium | Sort + greedy choose |
| 5 | K-way Merge | LC 23 Merge K Sorted Lists | Hard | Heap for K-way |
| 6 | Combined | LC 621 Task Scheduler, LC 767 Reorganize String | Medium | Greedy + Heap |
| 7 | **Review** | Build a MinHeap class from scratch (no peeking!) | — |

**MinHeap — Build This From Memory:**
```javascript
class MinHeap {
  constructor() { this.heap = []; }
  
  size() { return this.heap.length; }
  peek() { return this.heap[0]; }
  
  push(val) {
    this.heap.push(val);
    this._bubbleUp(this.heap.length - 1);
  }
  
  pop() {
    const top = this.heap[0];
    const last = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this._sinkDown(0);
    }
    return top;
  }
  
  _bubbleUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent] <= this.heap[i]) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }
  
  _sinkDown(i) {
    const n = this.heap.length;
    while (true) {
      let smallest = i;
      const left = 2 * i + 1, right = 2 * i + 2;
      if (left < n && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < n && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}
```

### Phase 2 Checkpoint ✅
After 7 weeks, you should be able to:
- [ ] Identify which pattern to use within 2 min of reading a problem
- [ ] Solve most Medium problems in 20-30 min
- [ ] Write sliding window, binary search, BFS, DFS, backtracking from memory
- [ ] Build a heap from scratch
- [ ] Know greedy vs DP decision criteria

---

## 🟠 PHASE 3: ADVANCED (Weeks 8-11)

> **Goal:** Conquer Hard problems, advanced patterns, and multi-pattern combos.

### Week 8 — Dynamic Programming (The Boss Fight)

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | 1D DP | LC 70 Climbing Stairs, LC 198 House Robber | Easy/Med | Base case → transition |
| 2 | 1D DP | LC 322 Coin Change, LC 300 LIS | Medium | Knapsack, patience sort |
| 3 | 2D DP | LC 62 Unique Paths, LC 64 Minimum Path Sum | Medium | Grid DP |
| 4 | String DP | LC 1143 LCS, LC 72 Edit Distance | Medium | Two-string DP |
| 5 | Hard DP | LC 139 Word Break, LC 152 Max Product Subarray | Medium | State definition |
| 6 | Hard DP | LC 5 Longest Palindromic Sub, LC 416 Partition Equal | Medium | Interval DP, subset sum |
| 7 | **Review** | For each problem, write the recurrence relation | — |

**DP Decision Framework:**
```
Step 1: Can I define the problem as f(i) = answer for first i elements?
Step 2: What are my CHOICES at step i?
Step 3: Write recurrence: f(i) = best of { choice1, choice2, ... }
Step 4: What's the base case? f(0) = ? f(1) = ?
Step 5: What order to fill? Bottom-up or top-down?
Step 6: Can I optimize space? (2D → 1D, 1D → O(1))

Common DP Patterns:
  "Can I reach?"           → dp[i] = true/false      (Word Break)
  "How many ways?"         → dp[i] = sum of ways     (Climbing Stairs)
  "What's the minimum?"    → dp[i] = min(choices)    (Coin Change)
  "What's the maximum?"    → dp[i] = max(choices)    (House Robber)
  "Two sequences?"         → dp[i][j] = f(seq1[i], seq2[j])  (LCS, Edit Dist)
```

### Week 9 — Graphs: Topo Sort, Union-Find, Shortest Path

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Topological Sort | LC 207 Course Schedule, LC 210 Course Schedule II | Medium | Kahn's BFS |
| 2 | Union-Find | LC 323 Connected Components, LC 684 Redundant Connection | Medium | Union by rank + path compress |
| 3 | Union-Find | LC 200 Islands (UF approach), LC 721 Accounts Merge | Med/Hard | When UF > BFS/DFS |
| 4 | Dijkstra | LC 743 Network Delay, LC 787 Cheapest Flights K Stops | Medium | Priority queue shortest path |
| 5 | Advanced Graphs | LC 127 Word Ladder, LC 269 Alien Dictionary | Med/Hard | BFS + Topo sort |
| 6 | Combined | LC 261 Graph Valid Tree, LC 417 Pacific Atlantic | Medium | Multi-source BFS |
| 7 | **Review** | Build Union-Find class from memory | — |

### Week 10 — Advanced Patterns

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Trie | LC 208 Implement Trie, LC 211 Add & Search Word | Medium | Prefix tree |
| 2 | Trie + Backtracking | LC 212 Word Search II | Hard | Trie-guided DFS |
| 3 | Monotonic Stack | LC 739 Daily Temperatures, LC 84 Largest Rectangle | Med/Hard | Next greater element |
| 4 | Monotonic Queue | LC 239 Sliding Window Maximum | Hard | Deque for window max |
| 5 | Bit Manipulation | LC 136 Single Number, LC 338 Counting Bits | Easy/Med | XOR tricks |
| 6 | Design Problems | LC 146 LRU Cache, LC 380 Insert Delete GetRandom | Medium | HashMap + DLL / Array |
| 7 | **Review** | Re-solve all Hard problems from weeks 8-10 | — |

### Week 11 — Hard Problem Sprint

| Day | Topic | Problems | Difficulty | Key Concept |
|-----|-------|----------|------------|-------------|
| 1 | Hard Arrays | LC 4 Median Two Sorted Arrays, LC 41 First Missing Positive | Hard | Binary search / cyclic sort |
| 2 | Hard DP | LC 312 Burst Balloons, LC 10 Regular Expression Matching | Hard | Interval DP, decision DP |
| 3 | Hard Trees | LC 124 Binary Tree Max Path Sum, LC 297 Serialize/Deserialize | Hard | Postorder, preorder |
| 4 | Hard Graphs | LC 269 Alien Dictionary, LC 778 Swim in Rising Water | Hard | Topo + binary search + BFS |
| 5 | Hard Strings | LC 76 Min Window Substring, LC 214 Shortest Palindrome | Hard | Sliding window, KMP |
| 6 | Hard Mixed | LC 23 Merge K Lists, LC 51 N-Queens, LC 85 Maximal Rectangle | Hard | Multi-pattern |
| 7 | **Review** | Time yourself: can you solve 2 Mediums in 45 min? | — |

### Phase 3 Checkpoint ✅
After 11 weeks:
- [ ] Can solve DP problems by defining state, transition, base case
- [ ] Comfortable with graphs (BFS, DFS, Dijkstra, Union-Find, Topo Sort)
- [ ] Can solve most Hard problems in 30-45 min with hints
- [ ] Understand when to use which advanced data structure
- [ ] Can explain trade-offs between competing approaches

---

## 🔴 PHASE 4: INTERVIEW READY (Week 12+)

> **Goal:** Speed, communication, handling pressure.

### Weekly Schedule (Repeat Until Interview)

| Day | Activity | Duration | Details |
|-----|----------|----------|---------|
| Mon | 2 Medium problems (timed) | 45 min | Pick random from Blind 75. Max 25 min each. |
| Tue | 1 Hard problem | 45 min | Full problem: think → code → test → complexity |
| Wed | Mock interview (with friend or online) | 60 min | Practice talking through your approach |
| Thu | 2 Medium problems (timed) | 45 min | Focus on patterns you're weakest at |
| Fri | System Design / Behavioral prep | 60 min | Not DSA but equally important |
| Sat | 1 Hard + review all week's problems | 90 min | Re-solve anything you struggled with |
| Sun | REST | — | Burnout kills performance. Rest is productive. |

### Mock Interview Checklist

```
Before coding:
  □ Repeated the problem back in my own words
  □ Asked about edge cases (empty input? negative numbers? duplicates?)
  □ Asked about constraints (input size → guides complexity target)
  □ Stated my approach and got interviewer's "okay"
  □ Identified the pattern and mentioned it ("I'll use a sliding window because...")

While coding:
  □ Wrote clean code with meaningful variable names
  □ Explained my thinking as I coded
  □ Didn't go silent for more than 30 seconds

After coding:
  □ Walked through a test case manually
  □ Tested edge cases (empty, single element, all same)
  □ Stated time AND space complexity
  □ Mentioned potential optimizations
```

---

## 📊 Problem Progression Guide (Easy → Hard by Pattern)

### The "3-2-1" Method Per Pattern
> **3 Easy → 2 Medium → 1 Hard**
> Master the easy ones first. Each level builds on the previous.

#### Arrays & Two Pointers
```
Easy:    LC 1, LC 217, LC 121, LC 125, LC 283
Medium:  LC 15, LC 11, LC 75, LC 167, LC 238
Hard:    LC 42 (Trapping Rain Water), LC 41 (First Missing Positive)
```

#### Sliding Window
```
Easy:    LC 643 (Max Average Subarray)
Medium:  LC 3, LC 424, LC 567, LC 438
Hard:    LC 76 (Min Window Substring), LC 239 (Sliding Window Max)
```

#### Binary Search
```
Easy:    LC 704, LC 35, LC 278
Medium:  LC 33, LC 34, LC 153, LC 162, LC 875
Hard:    LC 4 (Median of Two Sorted), LC 410 (Split Array)
```

#### Linked Lists
```
Easy:    LC 206, LC 21, LC 141, LC 876, LC 83
Medium:  LC 2, LC 19, LC 143, LC 142, LC 148
Hard:    LC 25 (Reverse Nodes in K-Group), LC 23 (Merge K Lists)
```

#### Trees
```
Easy:    LC 104, LC 226, LC 100, LC 572, LC 112, LC 700
Medium:  LC 102, LC 98, LC 236, LC 105, LC 199, LC 230
Hard:    LC 124 (Max Path Sum), LC 297 (Serialize/Deserialize)
```

#### Graphs
```
Easy:    (rare in graphs)
Medium:  LC 200, LC 133, LC 207, LC 210, LC 994, LC 130, LC 417
Hard:    LC 127 (Word Ladder), LC 269 (Alien Dictionary), LC 778
```

#### Dynamic Programming
```
Easy:    LC 70, LC 746
Medium:  LC 198, LC 322, LC 300, LC 1143, LC 139, LC 62, LC 5
Hard:    LC 72 (Edit Distance), LC 312 (Burst Balloons), LC 10 (Regex)
```

#### Backtracking
```
Easy:    (rare)
Medium:  LC 78, LC 46, LC 39, LC 22, LC 79
Hard:    LC 51 (N-Queens), LC 212 (Word Search II), LC 37 (Sudoku)
```

#### Stacks & Queues
```
Easy:    LC 20, LC 155, LC 232
Medium:  LC 150, LC 394, LC 739, LC 71, LC 227
Hard:    LC 84 (Largest Rectangle), LC 85 (Maximal Rectangle)
```

#### Heaps
```
Easy:    (rare)
Medium:  LC 215, LC 347, LC 973
Hard:    LC 295 (Median from Stream), LC 23 (Merge K Lists)
```

---

## 🏆 The Blind 75 — Optimal Order

Solve in THIS order for maximum pattern reinforcement:

### Round 1: Foundation (Week 1-2)
```
  1. Two Sum (LC 1) ――――――――――――――― HashMap
  2. Valid Parentheses (LC 20) ―――――― Stack
  3. Merge Two Sorted Lists (LC 21) ― Linked List
  4. Best Time Buy/Sell Stock (LC 121) Linear scan
  5. Valid Palindrome (LC 125) ――――― Two Pointers
  6. Invert Binary Tree (LC 226) ――― Tree DFS
  7. Valid Anagram (LC 242) ―――――――― HashMap
  8. Binary Search (LC 704) ―――――――― Binary Search
  9. Linked List Cycle (LC 141) ―――― Fast/Slow
 10. Maximum Depth of Tree (LC 104) ― DFS
```

### Round 2: Core Patterns (Week 3-5)
```
 11. Contains Duplicate (LC 217) ―――― Set
 12. Maximum Subarray (LC 53) ――――――― Kadane's
 13. Reverse Linked List (LC 206) ―― In-place reversal
 14. Climbing Stairs (LC 70) ―――――――― DP intro
 15. Same Tree (LC 100) ――――――――――――― Recursive comparison
 16. Number of 1 Bits (LC 191) ――――― Bit manipulation
 17. Missing Number (LC 268) ―――――――― XOR / Math
 18. 3Sum (LC 15) ―――――――――――――――――― Two Pointers
 19. Container With Most Water (LC 11) Two Pointers
 20. Product Except Self (LC 238) ―― Prefix/Suffix
```

### Round 3: Intermediate (Week 5-8)
```
 21. Longest Substr No Repeat (LC 3) ― Sliding Window
 22. Search Rotated Array (LC 33) ――― Modified BS
 23. Group Anagrams (LC 49) ―――――――――― HashMap
 24. Max Product Subarray (LC 152) ――― DP
 25. Find Min Rotated (LC 153) ――――――― Binary Search
 26. Coin Change (LC 322) ――――――――――――― DP
 27. Number of Islands (LC 200) ―――――― Graph DFS
 28. Merge Intervals (LC 56) ――――――――― Sort + Merge
 29. Validate BST (LC 98) ―――――――――――― DFS + Range
 30. House Robber (LC 198) ――――――――――― DP
```

### Round 4: Advanced (Week 8-11)
```
 31. Level Order Traversal (LC 102) ―― BFS
 32. Course Schedule (LC 207) ―――――――― Topo Sort
 33. Implement Trie (LC 208) ―――――――――― Trie
 34. Kth Largest (LC 215) ―――――――――――― Heap
 35. LCA of Binary Tree (LC 236) ―――― DFS
 36. Longest Increasing Sub (LC 300) ― DP + BS
 37. Top K Frequent (LC 347) ―――――――― Heap/Bucket
 38. Word Break (LC 139) ―――――――――――― DP
 39. Jump Game (LC 55) ―――――――――――――― Greedy
 40. Unique Paths (LC 62) ―――――――――――― Grid DP
```

### Round 5: Hard + Design (Week 11+)
```
 41. LCS (LC 1143) ―――――――――――――――――― 2D DP
 42. Pacific Atlantic (LC 417) ―――――― Multi-source DFS
 43. Merge K Sorted Lists (LC 23) ―― Heap / D&C
 44. Min Window Substring (LC 76) ―― Sliding Window
 45. Binary Tree Max Path (LC 124) ― Postorder DFS
 46. Serialize/Deserialize (LC 297) ― Design
 47. Word Search II (LC 212) ――――――― Trie + DFS
 48. Alien Dictionary (LC 269) ―――――― Topo Sort
 49. Find Median Stream (LC 295) ―――― Two Heaps
 50. Trapping Rain Water (LC 42) ―――― Two Pointers / Stack
```

### Round 6: Completing the 75 (Week 12+)
```
 51. Set Matrix Zeroes (LC 73) ―――――― In-place marking
 52. Spiral Matrix (LC 54) ――――――――――― Simulation
 53. Rotate Image (LC 48) ―――――――――――― Matrix transform
 54. Word Search (LC 79) ―――――――――――――― DFS Backtracking
 55. Longest Repeat Char Replace (LC 424) Sliding Window
 56. Encode/Decode Strings (LC 271) ―― Design
 57. Palindromic Substrings (LC 647) ― Expand around center
 58. Longest Palindromic Substr (LC 5) DP / Two Pointers
 59. Insert Interval (LC 57) ――――――――― Merge Intervals
 60. Non-overlapping Intervals (LC 435) Greedy
 61. Meeting Rooms (LC 252) ――――――――――― Sort + scan
 62. Meeting Rooms II (LC 253) ――――――― Heap / Sweep
 63. Remove Nth From End (LC 19) ――――― Two Pointers
 64. Reorder List (LC 143) ―――――――――――― Fast/Slow + Reverse
 65. Subtree of Another Tree (LC 572) ― Tree DFS
 66. Construct BT Preorder+Inorder (LC 105) D&C
 67. Kth Smallest in BST (LC 230) ―――― Inorder DFS
 68. LCA of BST (LC 235) ―――――――――――――― BST property
 69. Graph Valid Tree (LC 261) ――――――― Union-Find
 70. Number of Connected Comp (LC 323) Union-Find
 71. Longest Consecutive Seq (LC 128) ― HashSet
 72. House Robber II (LC 213) ―――――――― Circular DP
 73. Combination Sum IV (LC 377) ――――― DP
 74. Decode Ways (LC 91) ―――――――――――――― 1D DP
 75. Reverse Bits (LC 190) ――――――――――― Bit Manipulation
```

---

## 🧪 JavaScript Interview-Specific Tips

### Things That WILL Come Up

```javascript
// 1. PROTOTYPE CHAIN QUESTION
// "Implement Array.prototype.myMap"
Array.prototype.myMap = function(callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

// 2. CLOSURE QUESTION
// "What does this print?"
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 3, 3, 3 (var is function-scoped!)
}
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0); // 0, 1, 2 (let is block-scoped)
}

// 3. THIS KEYWORD
const obj = {
  name: "JS",
  greet: function() { return this.name; },       // "JS" — method call
  arrow: () => this.name                          // undefined — arrow uses outer this
};

// 4. PROMISE / ASYNC
async function fetchData() {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```

### Performance Gotchas in JS

```javascript
// ❌ BAD: String concatenation in loop — O(n²)
let s = "";
for (let i = 0; i < n; i++) s += char;  // Each += creates new string!

// ✅ GOOD: Array join — O(n)
const parts = [];
for (let i = 0; i < n; i++) parts.push(char);
s = parts.join("");

// ❌ BAD: Array.shift() as queue — O(n) per dequeue
while (queue.length) { const item = queue.shift(); }  // O(n²) total!

// ✅ GOOD: Index-based queue — O(1) per dequeue
let head = 0;
while (head < queue.length) { const item = queue[head++]; }

// ❌ BAD: Checking array includes in loop — O(n²)
for (const x of arr1) { if (arr2.includes(x)) ... }

// ✅ GOOD: Convert to Set first — O(n)
const set = new Set(arr2);
for (const x of arr1) { if (set.has(x)) ... }

// ❌ BAD: delete arr[i] — leaves hole, doesn't shrink array
// ✅ GOOD: arr.splice(i, 1) or swap with last + pop

// ⚠️ JS Numbers are 64-bit floats. For big integers, use BigInt:
const big = 9007199254740991n; // BigInt literal
```

### Common JS Patterns in Interviews

```javascript
// FREQUENCY COUNTER
function freqCount(arr) {
  const map = new Map();
  for (const x of arr) map.set(x, (map.get(x) || 0) + 1);
  return map;
}

// GRAPH FROM EDGE LIST
function buildGraph(n, edges) {
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u); // Remove for directed
  }
  return graph;
}

// DEEP CLONE (for backtracking)
const clone = JSON.parse(JSON.stringify(obj)); // Quick but slow
const clone2 = structuredClone(obj);           // Modern, better

// MEMOIZATION WRAPPER
function memoize(fn) {
  const cache = new Map();
  return function(...args) {
    const key = args.join(',');
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}
```

---

## 📅 Daily Practice Routine (30-60 min)

```
┌──────────────────────────────────────────────────────┐
│  THE DAILY DSA ROUTINE                                │
│                                                        │
│  1. WARM-UP (5 min)                                   │
│     Re-solve yesterday's hardest problem               │
│                                                        │
│  2. NEW PROBLEM (20-30 min)                           │
│     Pick from current phase's schedule                 │
│     Timer on. Think before coding.                     │
│                                                        │
│  3. REVIEW (5-10 min)                                 │
│     Read the best solution on LeetCode Discuss         │
│     Note: "What did I miss? What's the cleaner way?"  │
│                                                        │
│  4. FLASHCARD (5 min)                                 │
│     Write pattern name + when to use it on a card      │
│     Review 5 old cards (spaced repetition)             │
│                                                        │
│  5. LOG IT                                             │
│     Problem name, pattern used, time taken, difficulty │
│     Track in a spreadsheet or Notion                   │
└──────────────────────────────────────────────────────┘
```

---

## 🎯 Pattern Mastery Tracker

Check off when you can solve 3 problems of each type without looking anything up:

| # | Pattern | Easy ✅ | Medium ✅ | Hard ✅ | Confident? |
|---|---------|---------|-----------|---------|------------|
| 1 | Two Pointers | ☐ | ☐ | ☐ | ☐ |
| 2 | Sliding Window | ☐ | ☐ | ☐ | ☐ |
| 3 | Binary Search | ☐ | ☐ | ☐ | ☐ |
| 4 | Fast & Slow Pointers | ☐ | ☐ | ☐ | ☐ |
| 5 | Linked List Reversal | ☐ | ☐ | ☐ | ☐ |
| 6 | Merge Intervals | ☐ | ☐ | ☐ | ☐ |
| 7 | Cyclic Sort | ☐ | ☐ | ☐ | ☐ |
| 8 | BFS (Tree + Graph) | ☐ | ☐ | ☐ | ☐ |
| 9 | DFS (Tree + Graph) | ☐ | ☐ | ☐ | ☐ |
| 10 | Two Heaps | ☐ | ☐ | ☐ | ☐ |
| 11 | Backtracking | ☐ | ☐ | ☐ | ☐ |
| 12 | Top K (Heap) | ☐ | ☐ | ☐ | ☐ |
| 13 | K-way Merge | ☐ | ☐ | ☐ | ☐ |
| 14 | Topological Sort | ☐ | ☐ | ☐ | ☐ |
| 15 | Dynamic Programming | ☐ | ☐ | ☐ | ☐ |
| 16 | Greedy | ☐ | ☐ | ☐ | ☐ |
| 17 | Union-Find | ☐ | ☐ | ☐ | ☐ |
| 18 | Monotonic Stack | ☐ | ☐ | ☐ | ☐ |
| 19 | Trie | ☐ | ☐ | ☐ | ☐ |
| 20 | Bit Manipulation | ☐ | ☐ | ☐ | ☐ |
| 21 | Prefix Sum | ☐ | ☐ | ☐ | ☐ |
| 22 | Stack & Queue | ☐ | ☐ | ☐ | ☐ |
| 23 | Monotonic Queue | ☐ | ☐ | ☐ | ☐ |
| 24 | Segment Tree | ☐ | ☐ | ☐ | ☐ |
| 25 | String Matching | ☐ | ☐ | ☐ | ☐ |
| 26 | Design Problems | ☐ | ☐ | ☐ | ☐ |
| 27 | Math & Number Theory | ☐ | ☐ | ☐ | ☐ |
| 28 | Divide & Conquer | ☐ | ☐ | ☐ | ☐ |

---

## 💪 Motivation & Mindset

```
Week 1-3:  "This is confusing."           → NORMAL. Push through.
Week 4-6:  "I'm starting to see patterns." → The magic is working.
Week 7-9:  "I can solve Mediums!"          → You're ahead of 70% of candidates.
Week 10-12: "Hards make sense now."        → You're interview-ready.
Week 12+:  "I think in patterns."          → You've made it. 🏆

Remember:
  • Everyone struggles. The ones who succeed are the ones who don't quit.
  • Quality > Quantity. 3 well-understood problems > 10 barely solved ones.
  • Interview is 50% code + 50% communication. Practice TALKING through problems.
  • Companies want to see HOW you think, not just IF you get the answer.
```

---

> **Start today. Open `patterns/01_sliding_window.js`. Solve the first problem. That's step one.**

---

## 🔁 Spaced Repetition System

> Problems you don't revisit are problems you'll forget. Use this system:

```
Day 0:  Solve the problem.
Day 1:  Re-solve from scratch (no peeking). Can you do it?
Day 3:  Re-solve again. If easy → move on. If hard → add to "weak" list.
Day 7:  Final re-solve. If you nail it, it's locked in long-term memory.
Day 14: Quick mental review — can you describe the approach in 30 seconds?
```

### Difficulty-Based Review Frequency

| How It Went | Review Schedule | Action |
|-------------|-----------------|--------|
| Solved in < 10 min, clean | Day 7 only | Confident — just verify once |
| Solved in 15-25 min | Day 1, Day 3, Day 7 | Standard review cycle |
| Needed hints | Day 1, Day 3, Day 7, Day 14 | Understand WHY you got stuck |
| Couldn't solve | Day 1, Day 2, Day 4, Day 7, Day 14 | Study solution, redo multiple times |

### Problem Tracking Spreadsheet Template

```
| Date | Problem | Pattern | Time | Difficulty | Solved? | Notes | Review Dates |
|------|---------|---------|------|------------|---------|-------|--------------|
| 2/19 | LC 3    | Sliding | 18m  | Medium     | ✅ hint | Forgot shrink | 2/20, 2/22, 2/26 |
```

---

## 🆘 What To Do When You're Stuck (In an Interview)

> Silence kills interviews. Here's your rescue playbook:

### The 5-Step Rescue Process

```
Step 1: RE-READ the problem. You probably missed something.
        → "Let me re-read to make sure I haven't missed a constraint."

Step 2: WORK a small example by hand. Draw it out.
        → "Let me trace through this with a small example..."

Step 3: Think about BRUTE FORCE first.
        → "The brute force would be O(n²) nested loops. Let me think
           about how to optimize..."

Step 4: NAME the pattern you think it might be.
        → "This looks like it could be a sliding window problem because
           we're dealing with contiguous subarrays..."

Step 5: ASK for a hint (it's okay!).
        → "Could you give me a hint about the data structure to use?"
        → This is 100x better than sitting in silence.
```

### Phrases That Save Interviews

```
When stuck on approach:
  "Let me think about what data structure would help here..."
  "I'm considering two approaches: X and Y. Let me think about trade-offs."
  "This reminds me of [pattern]. Let me see if that applies."

When stuck on implementation:
  "I know the high-level approach. Let me work through the details."
  "Let me handle the main logic first and come back to edge cases."
  "I think I need a helper function here for [specific task]."

When you make a mistake:
  "Good catch, let me fix that. The issue is [explain]."
  "I see the bug — I'm off by one on the boundary. Let me correct it."
  (Never say "oops" and go silent. Explain what went wrong.)

When you realize your approach won't work:
  "I realize this approach has [problem]. Let me pivot to [alternative]."
  (Interviewers LOVE seeing you adapt. It's a positive signal.)
```

---

## 🏢 Company-Specific Interview Tips

### FAANG / Big Tech (Google, Meta, Amazon, Apple, Netflix, Microsoft)

```
Format:      45 min per round, 4-6 rounds total
DSA Focus:   2-3 coding rounds, each with 1-2 problems
Difficulty:  Medium → Hard (mostly Medium)
What they care about:
  ✓ Clean code + correct solution
  ✓ Optimal time/space complexity (they WILL ask)
  ✓ Communication — talk through your approach
  ✓ Edge case handling without being told
  ✓ Can you solve follow-up variants? ("What if input is sorted?")
```

### Startups

```
Format:      Take-home + 1-2 live coding rounds
DSA Focus:   Practical problems, less "puzzle" type
Difficulty:  Easy → Medium
What they care about:
  ✓ Code quality and readability
  ✓ Can you build something that works quickly?
  ✓ Real-world thinking ("How would this handle 1M users?")
  ✓ System design thinking matters more here
```

### Common Follow-Up Questions After You Solve

```
Interviewers almost ALWAYS ask follow-ups. Prepare for these:

1. "What's the time and space complexity?"
   → Always know this. Don't wait to be asked.

2. "Can you do better? Can you reduce space?"
   → Think: Can I drop from O(n) space to O(1)?
   → Can I optimize from O(n²) to O(n log n)?

3. "What if the input is sorted?"
   → Binary search or two pointers might apply now.

4. "What if the input doesn't fit in memory?"
   → Think: External sort, streaming, divide & conquer.

5. "What if we call this function millions of times?"
   → Think: Precomputation, caching, preprocessing.

6. "Can you do this in-place?"
   → Swap-based approaches, cyclic sort, two pointers.

7. "What if there are duplicates?"
   → Affects: Two pointers (skip dupes), Backtracking (skip dupes),
     HashMap (count vs boolean).

8. "What if the input could be negative?"
   → Ruins: Sliding window (sum), Greedy assumptions.
   → Use: Prefix sum + HashMap, DP instead.
```

---

## 🏗️ System Design Basics (For Senior/Mid-Level Roles)

> Even for frontend/SDE-1 roles, basic system design knowledge helps.

### Key Concepts to Know

```
1. Client-Server Architecture — How frontend talks to backend
2. REST API Design — GET, POST, PUT, DELETE + status codes
3. Database Basics — SQL vs NoSQL, when to use which
4. Caching — Redis, CDN, browser cache, memoization
5. Load Balancing — Distribute traffic across servers
6. Message Queues — Async processing (Kafka, RabbitMQ)
7. Rate Limiting — Prevent abuse (token bucket, sliding window!)
8. Pagination — Offset vs cursor-based
```

### Frontend System Design (If You're a Frontend Dev)

```
Common questions:
  • Design an autocomplete/typeahead (Trie + Debounce!)
  • Design infinite scroll feed (Intersection Observer + pagination)
  • Design a chat application (WebSocket + message queue)
  • Design a spreadsheet (2D grid + formula parser)
  • Design a collaborative editor (CRDT or OT)

Key patterns:
  • Debounce / Throttle for input handlers
  • Virtual scrolling for large lists
  • Optimistic UI updates
  • Client-side caching (IndexedDB, localStorage)
  • State management (Redux pattern, pub-sub)
```

---

## 🐛 Debugging Strategies During Interview

```
Your code doesn't work. Don't panic. Follow this:

1. RE-READ your code line by line — pretend you're a computer.
   → Most bugs are silly: wrong variable name, off-by-one, wrong operator.

2. TRACE through with the given example MANUALLY.
   → Write values of variables at each step.
   → "At i=2, left=0, right=3, sum=7..."

3. CHECK these common bugs:
   □ Off-by-one: < vs <=, array bounds
   □ Wrong variable: using i instead of j
   □ Missing return statement
   □ Modifying array while iterating
   □ Integer overflow (rare in JS, but for bit ops: use >>> 0)
   □ Forgetting to clone: result.push([...current]) not result.push(current)
   □ sort() without comparator (lexicographic by default!)

4. TEST edge cases:
   □ Empty input: [], ""
   □ Single element: [1], "a"
   □ All same: [5,5,5,5]
   □ Already sorted / reverse sorted
   □ Negative numbers
   □ Very large input (think about overflow)

5. If still stuck, EXPLAIN what you expect vs what's happening.
   → "I expect this to return 5 but it's returning 4. The issue must be
      in the boundary condition of my while loop..."
```

---

## 🧠 Mental Models — Think Like This

### For Each Pattern, Have a "One-Liner" Mental Model

```
Sliding Window:      "Caterpillar on an array — expand head, contract tail."
Two Pointers:        "Two people walking toward each other."
Binary Search:       "20 Questions — eliminate half each time."
BFS:                 "Ripple in a pond — level by level."
DFS:                 "Explore one path fully before backtracking."
Backtracking:        "Try every door. Dead end? Go back, try next door."
DP:                  "Remember what you've already calculated."
Greedy:              "Always pick the locally best option. Hope it's globally best."
Divide & Conquer:    "Break it in half. Solve halves. Combine."
Monotonic Stack:     "Bouncer at a club — only increasing/decreasing allowed."
Union-Find:          "Friend groups — if A knows B and B knows C, they're all connected."
Trie:                "Autocomplete — share common prefixes."
Heap:                "Priority queue — always know the max/min instantly."
```

---

## ⏱️ Time Management During Interview (45 min Round)

```
┌─────────────────────────────────────────────────────────────┐
│  0:00 - 0:05  │  READ & CLARIFY                            │
│               │  Read problem. Ask questions. Note constraints│
│               │  "What if input is empty? Can there be negs?" │
├───────────────┼─────────────────────────────────────────────┤
│  0:05 - 0:10  │  PLAN & COMMUNICATE                         │
│               │  State approach. Mention pattern. Pseudocode. │
│               │  "I'll use sliding window because..."         │
│               │  Get interviewer buy-in before coding.         │
├───────────────┼─────────────────────────────────────────────┤
│  0:10 - 0:30  │  CODE                                       │
│               │  Write clean code. Talk while coding.         │
│               │  Use good variable names. Handle edge cases.  │
│               │  If stuck for 2+ min → ask for hint.          │
├───────────────┼─────────────────────────────────────────────┤
│  0:30 - 0:38  │  TEST & DEBUG                               │
│               │  Walk through example step by step.           │
│               │  Test edge case. Fix any bugs.                │
│               │  State time/space complexity.                  │
├───────────────┼─────────────────────────────────────────────┤
│  0:38 - 0:45  │  FOLLOW-UPS & DISCUSS                       │
│               │  Answer optimization questions.               │
│               │  Discuss alternatives. Ask YOUR questions.     │
│               │  "Are there other approaches you'd suggest?"  │
└───────────────┴─────────────────────────────────────────────┘

⚠️ CRITICAL: If you haven't started coding by minute 12, 
   simplify your approach. A working brute force > unfinished optimal.
```

---

## 📚 Recommended Resources

### Free Resources

| Resource | Best For | Link |
|----------|----------|------|
| **NeetCode 150** | Structured problem list by pattern | neetcode.io |
| **NeetCode YouTube** | Video explanations of every problem | YouTube |
| **LeetCode Discuss** | Community solutions after you solve | leetcode.com |
| **Visualgo** | Visualize algorithms (sorting, BFS, etc.) | visualgo.net |
| **Big-O Cheat Sheet** | Quick complexity reference | bigocheatsheet.com |
| **JavaScript.info** | Deep JS knowledge for interviews | javascript.info |

### Strategy Resources

| Resource | Description |
|----------|-------------|
| **Blind 75 List** | The essential 75 problems (see our tracker above) |
| **Grind 75** | Customizable study plan by time available |
| **LeetCode Patterns** | Sean Prashad's pattern-categorized list |
| **Tech Interview Handbook** | Full guide: resume → behavioral → DSA → negotiation |

### Books (Optional, If Time Permits)

```
📖 "Cracking the Coding Interview" — Classic, comprehensive
📖 "Elements of Programming Interviews" — Harder, more depth
📖 "Grokking the Coding Interview" — Pattern-based (similar to our approach)
📖 "You Don't Know JS" — Deep JS knowledge (for JS-specific rounds)
```

---

## 📝 Post-Interview Reflection Template

> After every mock or real interview, fill this out:

```
Date: ___________
Company/Mock: ___________
Problem(s): ___________

1. Did I clarify the problem before coding?          □ Yes  □ No
2. Did I identify the correct pattern?                □ Yes  □ No
3. Did I communicate my approach before coding?       □ Yes  □ No
4. Did I write clean, working code?                   □ Yes  □ No
5. Did I test with examples?                          □ Yes  □ No
6. Did I handle edge cases?                           □ Yes  □ No
7. Did I state time/space complexity?                 □ Yes  □ No
8. Did I stay calm when stuck?                        □ Yes  □ No

What went well:
_______________________________________________

What I struggled with:
_______________________________________________

What I'll do differently next time:
_______________________________________________

Pattern to review:
_______________________________________________
```

---

## 🚫 Anti-Patterns: What NOT To Do

```
❌ Grinding 500 problems without understanding patterns
   → 150 well-understood problems > 500 speed-run problems

❌ Always looking at solutions after 5 minutes
   → You need to struggle. That's where learning happens.

❌ Only solving Easy problems forever
   → After Phase 1, push into Mediums. Comfort zone = no growth.

❌ Ignoring time complexity analysis
   → Interviewers WILL ask. "It works" is not enough.

❌ Coding in silence during interviews
   → Talk. Explain. Think out loud. This is the #1 feedback.

❌ Skipping behavioral prep
   → Many candidates fail behavioral, not DSA.
   → Prepare 5 STAR stories (Situation, Task, Action, Result).

❌ Comparing yourself to others
   → Everyone's timeline is different. Focus on YOUR progress.

❌ Not sleeping before interviews
   → Your brain solves problems. Tired brain = slow brain.
```

---

## 🌟 Behavioral Interview Quick Prep (STAR Method)

> Most companies have a behavioral round. Don't neglect this.

### Prepare 5 Stories Using STAR Format

```
S — Situation: Set the scene. What was the context?
T — Task:      What was your specific responsibility?
A — Action:    What did YOU do? (Use "I", not "we")
R — Result:    What was the outcome? Use numbers if possible.
```

### Common Behavioral Questions

```
1. "Tell me about a challenging technical problem you solved."
   → Pick a story where you debugged something complex.

2. "Tell me about a time you disagreed with a teammate."
   → Show you communicated respectfully and found compromise.

3. "Tell me about a time you failed."
   → Show self-awareness + what you learned.

4. "Why do you want to work here?"
   → Research the company. Be specific, not generic.

5. "Tell me about a project you're proud of."
   → Walk through: problem → solution → your contribution → impact.

Amazon Leadership Principles (if interviewing at Amazon):
  • Customer Obsession, Ownership, Bias for Action, Deliver Results
  • Prepare one STAR story for each principle you might be asked about.
```

---

> **Start today. Open `patterns/01_sliding_window.js`. Solve the first problem. That's step one.** 🚀
