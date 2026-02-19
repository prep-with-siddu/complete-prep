# Complete DSA Patterns Cheat Sheet in JavaScript

> **30 coding patterns** with theory, code implementations, dry runs, identification hints, and curated practice problems — all in JavaScript.

---

## Table of Contents

- [Overview](#overview)
- [File Structure](#file-structure)
- [Pattern Quick Reference](#pattern-quick-reference)
- [How to Use](#how-to-use)
- [Pattern Identification Table](#pattern-identification-table)
- [Data Structure Selection Guide](#data-structure-selection-guide)
- [Constraint → Complexity Guide](#constraint--complexity-guide)
- [6-Week Study Roadmap](#6-week-study-roadmap)
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

### 📄 Guides

| File | Description |
|------|-------------|
| [README.md](README.md) | This file — master reference |
| [dsa-roadmap.md](dsa-roadmap.md) | Complete Easy → Hard learning path |
| [complexity-cheatsheet.md](complexity-cheatsheet.md) | Time & Space complexity tables |
| [problem-identification-guide.md](problem-identification-guide.md) | Keyword → pattern mapping |

### 📁 [concepts/](concepts/) — Theory & fundamentals (study BEFORE patterns)

| # | File | Topic |
|---|------|-------|
| 01 | [time_space_complexity.js](concepts/01_time_space_complexity.js) | Big-O, complexity analysis, cheat sheet |
| 02 | [arrays.js](concepts/02_arrays.js) | 18 essential methods + DSA patterns |
| 03 | [recursion.js](concepts/03_recursion.js) | Call stack, types, recursion vs iteration |
| 04 | [searching_and_sorting.js](concepts/04_searching_and_sorting.js) | 7 sorting algorithms + comparison table |
| 05 | [linked_list.js](concepts/05_linked_list.js) | Node ops, reversal, cycle detection |
| 06 | [strings.js](concepts/06_strings.js) | Immutability, methods, ASCII, patterns |
| 07 | [stack_and_queue.js](concepts/07_stack_and_queue.js) | LIFO/FIFO, Deque, classic problems |
| 08 | [binary_search.js](concepts/08_binary_search.js) | 4 templates for any binary search |
| 09 | [heap.js](concepts/09_heap.js) | Min/Max heap, priority queue, top-K |
| 10 | [hashing.js](concepts/10_hashing.js) | Map/Set for O(1) lookups + 8 patterns |
| 11 | [backtracking.js](concepts/11_backtracking.js) | Template, subsets, permutations, N-Queens |
| 12 | [greedy.js](concepts/12_greedy.js) | Greedy choice property + classic problems |
| 13 | [dynamic_programming.js](concepts/13_dynamic_programming.js) | Top-down, bottom-up, 1D/2D DP patterns |
| 14 | [graphs.js](concepts/14_graphs.js) | BFS, DFS, Dijkstra, topological sort |
| 15 | [tries.js](concepts/15_tries.js) | Prefix tree, autocomplete, word search |

### 📁 [patterns/](patterns/) — Click any pattern to open (use [Pattern Navigator](patterns/README.md) for prev/next links)

| # | File | Description |
|---|------|-------------|
| 01 | [sliding_window.js](patterns/01_sliding_window.js) | Fixed/variable window techniques |
| 02 | [two_pointers.js](patterns/02_two_pointers.js) | Opposite & same direction pointers |
| 03 | [fast_slow_pointers.js](patterns/03_fast_slow_pointers.js) | Floyd's cycle detection |
| 04 | [merge_intervals.js](patterns/04_merge_intervals.js) | Overlapping interval problems |
| 05 | [cyclic_sort.js](patterns/05_cyclic_sort.js) | In-place sorting [0,n] range |
| 06 | [linked_list_reversal.js](patterns/06_linked_list_reversal.js) | Iterative & recursive reversal |
| 07 | [tree_bfs.js](patterns/07_tree_bfs.js) | Level-order traversal |
| 08 | [tree_dfs.js](patterns/08_tree_dfs.js) | Inorder, preorder, postorder |
| 09 | [two_heaps.js](patterns/09_two_heaps.js) | Median finding with min/max heaps |
| 10 | [subsets_backtracking.js](patterns/10_subsets_backtracking.js) | Permutations, combinations, subsets |
| 11 | [binary_search.js](patterns/11_binary_search.js) | Classic & boundary search |
| 12 | [top_k_elements.js](patterns/12_top_k_elements.js) | Heap-based K element problems |
| 13 | [k_way_merge.js](patterns/13_k_way_merge.js) | Merging K sorted structures |
| 14 | [topological_sort.js](patterns/14_topological_sort.js) | DAG ordering (Kahn's + DFS) |
| 15 | [dynamic_programming.js](patterns/15_dynamic_programming.js) | Tabulation & memoization |
| 16 | [monotonic_stack.js](patterns/16_monotonic_stack.js) | Next greater/smaller element |
| 17 | [union_find.js](patterns/17_union_find.js) | Disjoint set with rank & compression |
| 18 | [trie.js](patterns/18_trie.js) | Prefix tree operations |
| 19 | [bit_manipulation.js](patterns/19_bit_manipulation.js) | XOR tricks, bit counting |
| 20 | [greedy.js](patterns/20_greedy.js) | Locally optimal → globally optimal |
| 21 | [graph_bfs_dfs.js](patterns/21_graph_bfs_dfs.js) | Graph traversal patterns |
| 22 | [shortest_path.js](patterns/22_shortest_path.js) | Dijkstra, Bellman-Ford, Floyd-Warshall |
| 23 | [prefix_sum.js](patterns/23_prefix_sum.js) | Range sum & subarray problems |
| 24 | [stack_queue.js](patterns/24_stack_queue.js) | Stack/Queue design & usage |
| 25 | [monotonic_queue.js](patterns/25_monotonic_queue.js) | Sliding window maximum/minimum |
| 26 | [segment_tree.js](patterns/26_segment_tree.js) | Range queries & updates |
| 27 | [string_matching.js](patterns/27_string_matching.js) | KMP, Rabin-Karp, Z-algorithm |
| 28 | [design_problems.js](patterns/28_design_problems.js) | LRU Cache, MinStack, etc. |
| 29 | [math_number_theory.js](patterns/29_math_number_theory.js) | GCD, primes, modular arithmetic |
| 30 | [divide_and_conquer.js](patterns/30_divide_and_conquer.js) | Merge sort, quick select, etc. |

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
| 01 | [Sliding Window](patterns/01_sliding_window.js) | Expand/shrink window | O(n) | O(1)-O(k) |
| 02 | [Two Pointers](patterns/02_two_pointers.js) | Left/right convergence | O(n) | O(1) |
| 03 | [Fast & Slow Pointers](patterns/03_fast_slow_pointers.js) | Floyd's cycle detection | O(n) | O(1) |
| 04 | [Merge Intervals](patterns/04_merge_intervals.js) | Sort + merge overlaps | O(n log n) | O(n) |
| 05 | [Cyclic Sort](patterns/05_cyclic_sort.js) | Index-value mapping | O(n) | O(1) |
| 06 | [Linked List Reversal](patterns/06_linked_list_reversal.js) | prev/curr/next pointers | O(n) | O(1) |
| 07 | [Tree BFS](patterns/07_tree_bfs.js) | Queue-based level order | O(n) | O(w) |
| 08 | [Tree DFS](patterns/08_tree_dfs.js) | Recursive/stack traversal | O(n) | O(h) |
| 09 | [Two Heaps](patterns/09_two_heaps.js) | Min-heap + Max-heap | O(n log n) | O(n) |
| 10 | [Subsets/Backtracking](patterns/10_subsets_backtracking.js) | Recursive choice tree | O(2^n) | O(n) |
| 11 | [Binary Search](patterns/11_binary_search.js) | Half-interval elimination | O(log n) | O(1) |
| 12 | [Top K Elements](patterns/12_top_k_elements.js) | Heap of size K | O(n log k) | O(k) |
| 13 | [K-way Merge](patterns/13_k_way_merge.js) | Min-heap across K lists | O(N log k) | O(k) |
| 14 | [Topological Sort](patterns/14_topological_sort.js) | In-degree / DFS ordering | O(V+E) | O(V+E) |
| 15 | [Dynamic Programming](patterns/15_dynamic_programming.js) | Memoize subproblems | Varies | Varies |
| 16 | [Monotonic Stack](patterns/16_monotonic_stack.js) | Maintain sorted stack | O(n) | O(n) |
| 17 | [Union Find](patterns/17_union_find.js) | Disjoint set + rank | O(α(n)) | O(n) |
| 18 | [Trie](patterns/18_trie.js) | Prefix tree | O(L) | O(ALPHABET·L·N) |
| 19 | [Bit Manipulation](patterns/19_bit_manipulation.js) | XOR, shift, mask | O(n) | O(1) |
| 20 | [Greedy](patterns/20_greedy.js) | Local optimum choice | O(n log n) | O(1) |
| 21 | [Graph BFS/DFS](patterns/21_graph_bfs_dfs.js) | Adjacency traversal | O(V+E) | O(V+E) |
| 22 | [Shortest Path](patterns/22_shortest_path.js) | Dijkstra/BF/Floyd | O(E log V) | O(V) |
| 23 | [Prefix Sum](patterns/23_prefix_sum.js) | Cumulative sum array | O(n) | O(n) |
| 24 | [Stack & Queue](patterns/24_stack_queue.js) | LIFO/FIFO operations | O(n) | O(n) |
| 25 | [Monotonic Queue](patterns/25_monotonic_queue.js) | Deque min/max window | O(n) | O(k) |
| 26 | [Segment Tree](patterns/26_segment_tree.js) | Range query/update | O(n) build, O(log n) query | O(n) |
| 27 | [String Matching](patterns/27_string_matching.js) | KMP/Rabin-Karp/Z | O(n+m) | O(m) |
| 28 | [Design Problems](patterns/28_design_problems.js) | OOP + DS combination | Varies | Varies |
| 29 | [Math & Number Theory](patterns/29_math_number_theory.js) | GCD, primes, mod | Varies | O(1)-O(n) |
| 30 | [Divide & Conquer](patterns/30_divide_and_conquer.js) | Split → solve → merge | O(n log n) | O(n) |

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

> **Quick 6-week plan** for rapid prep. For a more detailed 12–16 week plan with daily schedules, JS templates, and spaced repetition, see [dsa-roadmap.md](dsa-roadmap.md).

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


---

**Happy Coding!** 🚀