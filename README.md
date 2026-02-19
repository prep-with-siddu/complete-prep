# Complete DSA Patterns Cheat Sheet in JavaScript

> **30 coding patterns** with theory, code implementations, dry runs, identification hints, and curated practice problems — all in JavaScript.

---

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Pattern Quick Reference](#pattern-quick-reference)
- [How to Use](#how-to-use)
- [Complexity Cheat Sheet](#complexity-cheat-sheet)
- [Problem Identification Flowchart](#problem-identification-flowchart)
- [Pattern Identification Table](#pattern-identification-table)
- [Data Structure Selection Guide](#data-structure-selection-guide)
- [Constraint → Complexity Guide](#constraint--complexity-guide)
- [6-Week Study Roadmap](#6-week-study-roadmap)
- [Blind 75 Tracker](#blind-75-tracker)
- [Pattern Combination Guide](#pattern-combination-guide)
- [JavaScript Interview Tips](#javascript-interview-tips)
- [Interview Tips](#interview-tips)
- [Additional Resources](#additional-resources)

---

## Overview

This repository is a **one-stop DSA interview prep toolkit** for JavaScript developers. Each pattern file contains:

- **Theory** — What the pattern is, when to use it, and how it works
- **Identification hints** — Keywords/clues that indicate this pattern
- **Multiple coded examples** — With step-by-step dry runs
- **Practice problems** — LeetCode numbers and difficulty ratings
- **Time & Space complexity** — For every solution

---

## File Structure

```
├── README.md                        # This file — master reference
├── dsa-roadmap.md                   # Complete Easy → Hard learning path
├── complexity-cheatsheet.md         # Time & Space complexity tables
├── problem-identification-guide.md  # Keyword → pattern mapping
└── patterns/
    ├── 01_sliding_window.js         # Fixed/variable window techniques
    ├── 02_two_pointers.js           # Opposite & same direction pointers
    ├── 03_fast_slow_pointers.js     # Floyd's cycle detection
    ├── 04_merge_intervals.js        # Overlapping interval problems
    ├── 05_cyclic_sort.js            # In-place sorting [0,n] range
    ├── 06_linked_list_reversal.js   # Iterative & recursive reversal
    ├── 07_tree_bfs.js               # Level-order traversal
    ├── 08_tree_dfs.js               # Inorder, preorder, postorder
    ├── 09_two_heaps.js              # Median finding with min/max heaps
    ├── 10_subsets_backtracking.js   # Permutations, combinations, subsets
    ├── 11_binary_search.js          # Classic & boundary search
    ├── 12_top_k_elements.js         # Heap-based K element problems
    ├── 13_k_way_merge.js            # Merging K sorted structures
    ├── 14_topological_sort.js       # DAG ordering (Kahn's + DFS)
    ├── 15_dynamic_programming.js    # Tabulation & memoization
    ├── 16_monotonic_stack.js        # Next greater/smaller element
    ├── 17_union_find.js             # Disjoint set with rank & compression
    ├── 18_trie.js                   # Prefix tree operations
    ├── 19_bit_manipulation.js       # XOR tricks, bit counting
    ├── 20_greedy.js                 # Locally optimal → globally optimal
    ├── 21_graph_bfs_dfs.js          # Graph traversal patterns
    ├── 22_shortest_path.js          # Dijkstra, Bellman-Ford, Floyd-Warshall
    ├── 23_prefix_sum.js             # Range sum & subarray problems
    ├── 24_stack_queue.js            # Stack/Queue design & usage
    ├── 25_monotonic_queue.js        # Sliding window maximum/minimum
    ├── 26_segment_tree.js           # Range queries & updates
    ├── 27_string_matching.js        # KMP, Rabin-Karp, Z-algorithm
    ├── 28_design_problems.js        # LRU Cache, MinStack, etc.
    ├── 29_math_number_theory.js     # GCD, primes, modular arithmetic
    └── 30_divide_and_conquer.js     # Merge sort, quick select, etc.
```

---

## How to Use

```bash
# Run any pattern file directly
node patterns/01_sliding_window.js

# Run all pattern files
for f in patterns/*.js; do echo "=== $f ===" && node "$f"; done
```

Each file is **self-contained** — no dependencies needed.

---

## Pattern Quick Reference

| #  | Pattern | Key Technique | Time | Space |
|----|---------|---------------|------|-------|
| 01 | Sliding Window | Expand/shrink window | O(n) | O(1)-O(k) |
| 02 | Two Pointers | Left/right convergence | O(n) | O(1) |
| 03 | Fast & Slow Pointers | Floyd's cycle detection | O(n) | O(1) |
| 04 | Merge Intervals | Sort + merge overlaps | O(n log n) | O(n) |
| 05 | Cyclic Sort | Index-value mapping | O(n) | O(1) |
| 06 | Linked List Reversal | prev/curr/next pointers | O(n) | O(1) |
| 07 | Tree BFS | Queue-based level order | O(n) | O(w) |
| 08 | Tree DFS | Recursive/stack traversal | O(n) | O(h) |
| 09 | Two Heaps | Min-heap + Max-heap | O(n log n) | O(n) |
| 10 | Subsets/Backtracking | Recursive choice tree | O(2^n) | O(n) |
| 11 | Binary Search | Half-interval elimination | O(log n) | O(1) |
| 12 | Top K Elements | Heap of size K | O(n log k) | O(k) |
| 13 | K-way Merge | Min-heap across K lists | O(N log k) | O(k) |
| 14 | Topological Sort | In-degree / DFS ordering | O(V+E) | O(V+E) |
| 15 | Dynamic Programming | Memoize subproblems | Varies | Varies |
| 16 | Monotonic Stack | Maintain sorted stack | O(n) | O(n) |
| 17 | Union Find | Disjoint set + rank | O(α(n)) | O(n) |
| 18 | Trie | Prefix tree | O(L) | O(ALPHABET·L·N) |
| 19 | Bit Manipulation | XOR, shift, mask | O(n) | O(1) |
| 20 | Greedy | Local optimum choice | O(n log n) | O(1) |
| 21 | Graph BFS/DFS | Adjacency traversal | O(V+E) | O(V+E) |
| 22 | Shortest Path | Dijkstra/BF/Floyd | O(E log V) | O(V) |
| 23 | Prefix Sum | Cumulative sum array | O(n) | O(n) |
| 24 | Stack & Queue | LIFO/FIFO operations | O(n) | O(n) |
| 25 | Monotonic Queue | Deque min/max window | O(n) | O(k) |
| 26 | Segment Tree | Range query/update | O(n) build, O(log n) query | O(n) |
| 27 | String Matching | KMP/Rabin-Karp/Z | O(n+m) | O(m) |
| 28 | Design Problems | OOP + DS combination | Varies | Varies |
| 29 | Math & Number Theory | GCD, primes, mod | Varies | O(1)-O(n) |
| 30 | Divide & Conquer | Split → solve → merge | O(n log n) | O(n) |

---

## Pattern Identification Table

> **"I see this keyword → I try this pattern"**

| Keywords / Clues | Pattern to Try |
|------------------|---------------|
| "contiguous subarray", "substring of length k" | Sliding Window |
| "sorted array", "pair with sum" | Two Pointers |
| "cycle in linked list", "middle of list" | Fast & Slow Pointers |
| "overlapping intervals", "merge meetings" | Merge Intervals |
| "missing number", "find duplicate", range [1,n] | Cyclic Sort |
| "reverse linked list", "reverse sub-list" | Linked List Reversal |
| "level-order", "zigzag traversal" | Tree BFS |
| "path sum", "max depth", "serialize tree" | Tree DFS |
| "median of stream", "maximize capital" | Two Heaps |
| "all combinations", "permutations", "subsets" | Backtracking |
| "sorted array", "search rotated", "minimum in rotated" | Binary Search |
| "kth largest", "k most frequent", "k closest" | Top K Elements |
| "k sorted lists", "smallest range" | K-way Merge |
| "course schedule", "build order", "alien dictionary" | Topological Sort |
| "maximum/minimum path", "number of ways", "can partition" | Dynamic Programming |
| "next greater element", "largest rectangle" | Monotonic Stack |
| "connected components", "redundant connection" | Union Find |
| "prefix match", "word search II", "autocomplete" | Trie |
| "single number", "power of two", "counting bits" | Bit Manipulation |
| "activity selection", "jump game", "assign cookies" | Greedy |
| "number of islands", "clone graph", "flood fill" | Graph BFS/DFS |
| "cheapest flight", "network delay", "shortest path" | Shortest Path |
| "range sum", "subarray sum equals k" | Prefix Sum |
| "valid parentheses", "min stack", "queue using stack" | Stack & Queue |
| "sliding window maximum", "shortest subarray" | Monotonic Queue |
| "range sum query mutable", "count of smaller" | Segment Tree |
| "pattern in string", "repeated substring" | String Matching |
| "design LRU", "design Twitter", "design HashMap" | Design Problems |
| "GCD", "prime", "factorial", "modular" | Math & Number Theory |
| "merge sort", "quick select", "closest pair" | Divide & Conquer |

---

## Data Structure Selection Guide

| Need | Best DS | Why |
|------|---------|-----|
| O(1) lookup by key | HashMap / Set | Hash-based O(1) average |
| Ordered data + fast search | BST / TreeMap | O(log n) operations |
| LIFO access | Stack | Push/pop O(1) |
| FIFO access | Queue | Enqueue/dequeue O(1) |
| Priority access | Min/Max Heap | O(log n) insert/extract |
| Prefix searching | Trie | O(L) lookup |
| Range queries | Segment Tree / BIT | O(log n) query/update |
| Connected components | Union-Find | Near O(1) union/find |
| Shortest paths | Graph + Priority Queue | Dijkstra O(E log V) |
| Ordered insert + delete | Doubly Linked List | O(1) with node ref |

---

## Constraint → Complexity Guide

| Input Size (n) | Target Complexity | Common Patterns |
|----------------|-------------------|-----------------|
| n ≤ 10 | O(n!) or O(2^n) | Backtracking, brute force |
| n ≤ 20 | O(2^n) | Bitmask DP, backtracking |
| n ≤ 100 | O(n³) | Floyd-Warshall, 3D DP |
| n ≤ 1,000 | O(n²) | Nested loops, 2D DP |
| n ≤ 10,000 | O(n²) | DP with optimization |
| n ≤ 100,000 | O(n log n) | Sorting, heap, binary search |
| n ≤ 1,000,000 | O(n) | Two pointers, sliding window, prefix sum |
| n ≤ 10,000,000 | O(n) | Linear scan, hash map |
| n > 10^8 | O(log n) or O(1) | Binary search, math, bit manipulation |

---

## 6-Week Study Roadmap

### Week 1: Arrays & Strings (Foundation)
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Sliding Window | LC 3, 209, 438 |
| 2 | Two Pointers | LC 1, 15, 167 |
| 3 | Prefix Sum | LC 303, 560, 238 |
| 4 | Binary Search | LC 704, 34, 33 |
| 5 | Review + Cyclic Sort | LC 268, 448, 41 |

### Week 2: Linked Lists & Stacks
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Linked List Reversal | LC 206, 92, 25 |
| 2 | Fast & Slow Pointers | LC 141, 142, 876 |
| 3 | Stack & Queue | LC 20, 155, 232 |
| 4 | Monotonic Stack | LC 496, 739, 84 |
| 5 | Review + Design | LC 146, 380 |

### Week 3: Trees & Graphs
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Tree BFS | LC 102, 107, 199 |
| 2 | Tree DFS | LC 104, 112, 236 |
| 3 | Graph BFS/DFS | LC 200, 133, 207 |
| 4 | Topological Sort | LC 210, 269, 310 |
| 5 | Review + Shortest Path | LC 743, 787 |

### Week 4: Heaps & Advanced
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Top K Elements | LC 215, 347, 373 |
| 2 | Two Heaps | LC 295, 480, 502 |
| 3 | K-way Merge | LC 23, 378, 632 |
| 4 | Monotonic Queue | LC 239, 862 |
| 5 | Review + Segment Tree | LC 307, 315 |

### Week 5: DP & Backtracking
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Dynamic Programming (1D) | LC 70, 198, 322 |
| 2 | Dynamic Programming (2D) | LC 62, 1143, 72 |
| 3 | Subsets & Backtracking | LC 78, 46, 39 |
| 4 | Greedy | LC 55, 435, 452 |
| 5 | Review + String Matching | LC 28, 459 |

### Week 6: Specialized & Review
| Day | Pattern | Practice |
|-----|---------|----------|
| 1 | Union Find | LC 547, 684, 721 |
| 2 | Trie | LC 208, 211, 212 |
| 3 | Bit Manipulation | LC 136, 191, 338 |
| 4 | Math & Number Theory | LC 204, 50, 166 |
| 5 | Divide & Conquer + Full Review | LC 912, 215, 493 |

---

## Blind 75 Tracker

### Arrays
- [ ] Two Sum (LC 1) — Hash Map
- [ ] Best Time to Buy/Sell Stock (LC 121) — Sliding Window
- [ ] Contains Duplicate (LC 217) — Hash Set
- [ ] Product of Array Except Self (LC 238) — Prefix Sum
- [ ] Maximum Subarray (LC 53) — Kadane's / DP
- [ ] Maximum Product Subarray (LC 152) — DP
- [ ] Find Minimum in Rotated Sorted Array (LC 153) — Binary Search
- [ ] Search in Rotated Sorted Array (LC 33) — Binary Search
- [ ] 3Sum (LC 15) — Two Pointers
- [ ] Container With Most Water (LC 11) — Two Pointers

### Binary
- [ ] Sum of Two Integers (LC 371) — Bit Manipulation
- [ ] Number of 1 Bits (LC 191) — Bit Manipulation
- [ ] Counting Bits (LC 338) — DP + Bit
- [ ] Missing Number (LC 268) — Cyclic Sort / XOR
- [ ] Reverse Bits (LC 190) — Bit Manipulation

### Dynamic Programming
- [ ] Climbing Stairs (LC 70) — 1D DP
- [ ] Coin Change (LC 322) — Unbounded Knapsack
- [ ] Longest Increasing Subsequence (LC 300) — DP + Binary Search
- [ ] Longest Common Subsequence (LC 1143) — 2D DP
- [ ] Word Break (LC 139) — DP
- [ ] Combination Sum IV (LC 377) — DP
- [ ] House Robber (LC 198) — 1D DP
- [ ] House Robber II (LC 213) — 1D DP (circular)
- [ ] Decode Ways (LC 91) — 1D DP
- [ ] Unique Paths (LC 62) — 2D DP
- [ ] Jump Game (LC 55) — Greedy

### Graph
- [ ] Clone Graph (LC 133) — Graph BFS/DFS
- [ ] Course Schedule (LC 207) — Topological Sort
- [ ] Pacific Atlantic Water Flow (LC 417) — Graph DFS
- [ ] Number of Islands (LC 200) — Graph BFS/DFS
- [ ] Longest Consecutive Sequence (LC 128) — Hash Set
- [ ] Alien Dictionary (LC 269) — Topological Sort
- [ ] Graph Valid Tree (LC 261) — Union Find
- [ ] Number of Connected Components (LC 323) — Union Find

### Interval
- [ ] Insert Interval (LC 57) — Merge Intervals
- [ ] Merge Intervals (LC 56) — Merge Intervals
- [ ] Non-overlapping Intervals (LC 435) — Greedy
- [ ] Meeting Rooms (LC 252) — Sort
- [ ] Meeting Rooms II (LC 253) — Two Heaps / Sort

### Linked List
- [ ] Reverse Linked List (LC 206) — Linked List Reversal
- [ ] Detect Cycle (LC 141) — Fast & Slow Pointers
- [ ] Merge Two Sorted Lists (LC 21) — Two Pointers
- [ ] Merge K Sorted Lists (LC 23) — K-way Merge
- [ ] Remove Nth Node From End (LC 19) — Two Pointers
- [ ] Reorder List (LC 143) — Fast & Slow + Reversal

### Matrix
- [ ] Set Matrix Zeroes (LC 73) — In-place
- [ ] Spiral Matrix (LC 54) — Simulation
- [ ] Rotate Image (LC 48) — Matrix Transform
- [ ] Word Search (LC 79) — Backtracking

### String
- [ ] Longest Substring Without Repeating (LC 3) — Sliding Window
- [ ] Longest Repeating Character Replacement (LC 424) — Sliding Window
- [ ] Minimum Window Substring (LC 76) — Sliding Window
- [ ] Valid Anagram (LC 242) — Hash Map
- [ ] Group Anagrams (LC 49) — Hash Map
- [ ] Valid Parentheses (LC 20) — Stack
- [ ] Longest Palindromic Substring (LC 5) — DP / Two Pointers
- [ ] Palindromic Substrings (LC 647) — DP / Expand
- [ ] Encode and Decode Strings (LC 271) — Design

### Tree
- [ ] Maximum Depth of Binary Tree (LC 104) — Tree DFS
- [ ] Same Tree (LC 100) — Tree DFS
- [ ] Invert Binary Tree (LC 226) — Tree DFS/BFS
- [ ] Binary Tree Maximum Path Sum (LC 124) — Tree DFS
- [ ] Binary Tree Level Order Traversal (LC 102) — Tree BFS
- [ ] Serialize/Deserialize Binary Tree (LC 297) — Tree BFS/DFS
- [ ] Subtree of Another Tree (LC 572) — Tree DFS
- [ ] Construct from Preorder & Inorder (LC 105) — Divide & Conquer
- [ ] Validate BST (LC 98) — Tree DFS
- [ ] Kth Smallest in BST (LC 230) — Tree DFS
- [ ] LCA of BST (LC 235) — Tree DFS

### Heap
- [ ] Merge K Sorted Lists (LC 23) — K-way Merge
- [ ] Top K Frequent Elements (LC 347) — Top K
- [ ] Find Median from Data Stream (LC 295) — Two Heaps

---

## Pattern Combination Guide

Many hard problems require **combining 2+ patterns**. Common combos:

| Combo | Example Problem | Patterns Used |
|-------|-----------------|---------------|
| Binary Search + DP | LC 300 (LIS with patience) | 11 + 15 |
| Graph + Topological Sort | LC 207 (Course Schedule) | 21 + 14 |
| Sliding Window + Hash Map | LC 76 (Min Window Substring) | 01 + Hash |
| DFS + Backtracking | LC 79 (Word Search) | 08 + 10 |
| BFS + Two Pointers | LC 863 (All Nodes Distance K) | 07 + 02 |
| Heap + BFS | LC 787 (Cheapest Flights) | 12 + 22 |
| Union Find + Sort | LC 721 (Accounts Merge) | 17 + Sort |
| Trie + DFS/Backtracking | LC 212 (Word Search II) | 18 + 10 |
| Monotonic Stack + DP | LC 85 (Maximal Rectangle) | 16 + 15 |
| Prefix Sum + Hash Map | LC 560 (Subarray Sum = K) | 23 + Hash |

---

## JavaScript Interview Tips

### 1. Use Modern JS Syntax
```javascript
// Destructuring for swaps
[arr[i], arr[j]] = [arr[j], arr[i]];

// Default parameters
function dfs(node, depth = 0) { }

// Spread operator
const merged = [...arr1, ...arr2];
```

### 2. Know Your Built-in Methods
```javascript
// Map — O(1) get/set
const map = new Map();
map.set(key, value);
map.get(key);
map.has(key);

// Set — O(1) add/has/delete
const set = new Set([1, 2, 3]);
set.add(4);
set.has(2); // true

// Array methods
arr.sort((a, b) => a - b);     // Numeric sort
arr.fill(0);                    // Fill with value
Array.from({length: n}, () => 0); // Create filled array
```

### 3. JS-Specific Gotchas
```javascript
// Sort is lexicographic by default!
[10, 9, 80].sort();           // [10, 80, 9] ❌
[10, 9, 80].sort((a, b) => a - b); // [9, 10, 80] ✅

// Integer overflow doesn't exist (use BigInt for very large)
Number.MAX_SAFE_INTEGER;       // 2^53 - 1

// No built-in min-heap — implement or use sorted insert
// No built-in TreeMap — use sorted array + binary search

// Infinity is useful for DP initialization
let min = Infinity;
let max = -Infinity;
```

### 4. Custom Data Structures
```javascript
// Simple MinHeap for interviews
class MinHeap {
  constructor() { this.heap = []; }
  push(val) { this.heap.push(val); this._bubbleUp(); }
  pop() {
    const top = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) { this.heap[0] = end; this._sinkDown(); }
    return top;
  }
  // ... implement _bubbleUp and _sinkDown
}

// ListNode for linked list problems
class ListNode {
  constructor(val = 0, next = null) { this.val = val; this.next = next; }
}

// TreeNode for tree problems
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val; this.left = left; this.right = right;
  }
}
```

---

## Interview Tips

### Before the Interview
1. **Clarify constraints** — input size, value range, edge cases
2. **Talk through examples** — walk through 1-2 examples before coding
3. **State your approach** — name the pattern and explain why it fits

### During Coding
1. **Write clean, modular code** — use helper functions
2. **Name variables descriptively** — `left`, `right`, `windowSum` not `i`, `j`, `s`
3. **Handle edge cases** — empty arrays, single elements, null nodes

### After Coding
1. **Trace through** — dry run with a small example
2. **Analyze complexity** — state time and space Big-O
3. **Discuss alternatives** — mention other approaches and trade-offs

### Common Edge Cases Checklist
- Empty input (`[]`, `""`, `null`)
- Single element (`[1]`, `"a"`)
- All same elements (`[5, 5, 5, 5]`)
- Already sorted / reverse sorted
- Negative numbers
- Very large input (time limit)
- Overflow potential

---

## Additional Resources

| Resource | Link |
|----------|------|
| DSA Learning Roadmap | [dsa-roadmap.md](dsa-roadmap.md) |
| Complexity Cheat Sheet | [complexity-cheatsheet.md](complexity-cheatsheet.md) |
| Problem Identification Guide | [problem-identification-guide.md](problem-identification-guide.md) |
| LeetCode | [leetcode.com](https://leetcode.com) |
| NeetCode Roadmap | [neetcode.io/roadmap](https://neetcode.io/roadmap) |
| Blind 75 List | [neetcode.io/practice](https://neetcode.io/practice) |

---

## How to Contribute

1. Fork the repo
2. Add a new pattern file in `patterns/` following the naming convention
3. Include theory, code, dry run, and practice problems
4. Submit a PR

---

## License

This project is for **educational purposes**. All LeetCode problems are property of LeetCode.

---

**Happy Coding!** 🚀
Re