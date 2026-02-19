# 🔍 Problem Identification Guide

> How to figure out **which pattern to use** by reading the problem statement.

---

## 🗝️ Keyword → Pattern Mapping

### Array / String Problems

| Keywords in Problem                              | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Subarray", "contiguous", "window of size K"     | **Sliding Window**       | [01_sliding_window.js](patterns/01_sliding_window.js)       |
| "Sorted array", "pair with sum", "remove dupes"  | **Two Pointers**         | [02_two_pointers.js](patterns/02_two_pointers.js)         |
| "Cycle in linked list", "middle of list"          | **Fast & Slow Pointers** | [03_fast_slow_pointers.js](patterns/03_fast_slow_pointers.js)   |
| "Overlapping intervals", "merge intervals"        | **Merge Intervals**      | [04_merge_intervals.js](patterns/04_merge_intervals.js)      |
| "Missing number", "duplicate in range [1,n]"      | **Cyclic Sort**          | [05_cyclic_sort.js](patterns/05_cyclic_sort.js)          |
| "Running sum", "range sum", "subarray sum = K"    | **Prefix Sum**           | [23_prefix_sum.js](patterns/23_prefix_sum.js)           |
| "Next greater/smaller element"                     | **Monotonic Stack**      | [16_monotonic_stack.js](patterns/16_monotonic_stack.js)      |
| "Sliding window max/min"                           | **Monotonic Queue**      | [25_monotonic_queue.js](patterns/25_monotonic_queue.js)      |
| "Find pattern in string", "strStr"                 | **String Matching**      | [27_string_matching.js](patterns/27_string_matching.js)      |

### Linked List Problems

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Reverse a linked list", "reverse between"        | **Linked List Reversal** | [06_linked_list_reversal.js](patterns/06_linked_list_reversal.js) |
| "Cycle detection", "find start of cycle"           | **Fast & Slow Pointers** | [03_fast_slow_pointers.js](patterns/03_fast_slow_pointers.js)   |
| "Merge K sorted lists"                             | **K-way Merge**          | [13_k_way_merge.js](patterns/13_k_way_merge.js)          |

### Tree Problems

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Level order", "zigzag", "level average"           | **BFS (Tree)**           | [07_tree_bfs.js](patterns/07_tree_bfs.js)             |
| "Path sum", "depth", "validate BST", "diameter"    | **DFS (Tree)**           | [08_tree_dfs.js](patterns/08_tree_dfs.js)             |
| "Serialize/Deserialize tree"                        | **Design Problems**      | [28_design_problems.js](patterns/28_design_problems.js)      |

### Graph Problems

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Number of islands", "connected components"        | **Graph BFS/DFS**        | [21_graph_bfs_dfs.js](patterns/21_graph_bfs_dfs.js)        |
| "Shortest path", "minimum cost"                    | **Shortest Path**        | [22_shortest_path.js](patterns/22_shortest_path.js)        |
| "Course schedule", "dependency order", "DAG"        | **Topological Sort**     | [14_topological_sort.js](patterns/14_topological_sort.js)     |
| "Connected components", "union/merge groups"        | **Union-Find**           | [17_union_find.js](patterns/17_union_find.js)           |

### Search / Optimization Problems

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Sorted", "search", "minimum in rotated"           | **Binary Search**        | [11_binary_search.js](patterns/11_binary_search.js)        |
| "Kth largest", "top K frequent", "K closest"       | **Top K Elements**       | [12_top_k_elements.js](patterns/12_top_k_elements.js)       |
| "Merge K sorted"                                    | **K-way Merge**          | [13_k_way_merge.js](patterns/13_k_way_merge.js)          |
| "Find median from stream"                           | **Two Heaps**            | [09_two_heaps.js](patterns/09_two_heaps.js)            |

### Combinatorial / Backtracking

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "All subsets", "all combinations", "generate all"  | **Subsets/Backtracking** | [10_subsets_backtracking.js](patterns/10_subsets_backtracking.js)  |
| "Minimum coins", "maximum profit", "ways to"       | **Dynamic Programming**  | [15_dynamic_programming.js](patterns/15_dynamic_programming.js)  |
| "Activity selection", "minimum meetings"            | **Greedy**               | [20_greedy.js](patterns/20_greedy.js)               |

### Advanced Patterns

| Keywords                                          | Pattern                  | File                         |
|--------------------------------------------------|--------------------------|------------------------------|
| "Prefix/autocomplete", "word search II"            | **Trie**                 | [18_trie.js](patterns/18_trie.js)                 |
| "XOR", "single number", "bit count"                | **Bit Manipulation**     | [19_bit_manipulation.js](patterns/19_bit_manipulation.js)     |
| "Range query with updates"                          | **Segment Tree**         | [26_segment_tree.js](patterns/26_segment_tree.js)         |
| "Design a data structure", "LRU/LFU Cache"          | **Design Problems**      | [28_design_problems.js](patterns/28_design_problems.js)      |
| "GCD", "primes", "modulo 10^9+7"                    | **Math/Number Theory**   | [29_math_number_theory.js](patterns/29_math_number_theory.js)   |
| "Sort an array", "merge sort", "median of 2 arrays" | **Divide and Conquer**   | [30_divide_and_conquer.js](patterns/30_divide_and_conquer.js)   |

---

## 🧠 Decision Flowchart

```
START: Read the problem
  │
  ├─ Input is a SORTED array?
  │   ├─ Find target / search? → Binary Search
  │   ├─ Pair / triplet with target sum? → Two Pointers
  │   └─ Merge multiple sorted? → K-way Merge
  │
  ├─ Input is an UNSORTED array?
  │   ├─ Subarray / contiguous window?
  │   │   ├─ Fixed size window? → Sliding Window
  │   │   ├─ Variable size, all positive? → Sliding Window
  │   │   ├─ Subarray sum with negatives? → Prefix Sum / Monotonic Queue
  │   │   └─ Max subarray sum? → Kadane's (DP)
  │   │
  │   ├─ Top K / Kth largest? → Heap / Quickselect
  │   ├─ Contains duplicate in range [1,n]? → Cyclic Sort
  │   ├─ Next greater/smaller? → Monotonic Stack
  │   └─ Needs sorting? → Divide & Conquer (merge/quick sort)
  │
  ├─ Input is a LINKED LIST?
  │   ├─ Cycle detection? → Fast & Slow Pointers
  │   ├─ Reverse part of list? → Linked List Reversal
  │   ├─ Merge K sorted lists? → K-way Merge / D&C
  │   └─ Middle of list? → Fast & Slow Pointers
  │
  ├─ Input is a TREE?
  │   ├─ Level-by-level? → BFS
  │   ├─ Path / depth / subtree? → DFS
  │   ├─ Sorted tree (BST)? → DFS with range check
  │   └─ Serialize / stream? → Design
  │
  ├─ Input is a GRAPH?
  │   ├─ Shortest path?
  │   │   ├─ Unweighted? → BFS
  │   │   ├─ Weighted, no negative? → Dijkstra
  │   │   ├─ Negative edges? → Bellman-Ford
  │   │   └─ All pairs? → Floyd-Warshall
  │   │
  │   ├─ Connected components? → BFS/DFS / Union-Find
  │   ├─ Dependency ordering? → Topological Sort
  │   └─ Cycle in directed graph? → DFS / Topological Sort
  │
  ├─ Input is a STRING?
  │   ├─ Pattern matching? → KMP / Rabin-Karp / Z-Algorithm
  │   ├─ Prefix/autocomplete? → Trie
  │   ├─ Substring with condition? → Sliding Window
  │   ├─ Palindrome? → Two Pointers / DP
  │   └─ Anagram / character count? → Hash Map
  │
  ├─ Need OPTIMIZATION (min/max)?
  │   ├─ Overlapping subproblems? → Dynamic Programming
  │   ├─ Greedy choice property? → Greedy
  │   ├─ State space search? → Backtracking
  │   └─ Independent subproblems? → Divide & Conquer
  │
  ├─ Need ALL combinations/subsets?
  │   ├─ All subsets? → Backtracking / Bit Manipulation
  │   ├─ All permutations? → Backtracking
  │   └─ With constraints? → Backtracking with pruning
  │
  └─ Design a DATA STRUCTURE?
      ├─ O(1) get + O(1) eviction? → HashMap + DLL (LRU)
      ├─ O(1) insert/delete/random? → HashMap + Array
      ├─ O(1) min? → Two stacks (MinStack)
      ├─ Mutable range queries? → Segment Tree / BIT
      └─ Frequency counting + eviction? → LFU Cache
```

---

## 🎯 Pattern Selection by Problem Type

### "Find" Problems
| What to Find                        | Pattern            |
|--------------------------------------|--------------------|
| Target in sorted array               | Binary Search      |
| Pair with target sum                  | Two Pointers       |
| Cycle in list/graph                   | Fast & Slow        |
| Missing number in [1..n]             | Cyclic Sort / XOR  |
| Kth largest element                   | Heap / Quickselect |
| Pattern in text                       | KMP / Rabin-Karp   |
| Shortest path                         | BFS / Dijkstra     |
| Connected components                  | Union-Find / DFS   |

### "Count" Problems
| What to Count                        | Pattern            |
|--------------------------------------|--------------------|
| Subarrays with sum = K               | Prefix Sum + Map   |
| Ways to reach target                  | DP                 |
| Primes less than N                    | Sieve              |
| Inversions in array                   | Merge Sort (D&C)   |
| Elements smaller after self           | Segment Tree / BIT |
| Islands / connected regions           | BFS / DFS          |

### "Generate All" Problems
| What to Generate                     | Pattern              |
|--------------------------------------|----------------------|
| All subsets                           | Backtracking / Bitmask |
| All permutations                      | Backtracking         |
| All valid parentheses                 | Backtracking         |
| All paths in graph/tree               | DFS + Backtracking   |

### "Optimize" Problems (Min/Max)
| What to Optimize                     | Pattern            |
|--------------------------------------|--------------------|
| Maximum subarray sum                  | Kadane's (DP)      |
| Minimum coins for amount              | DP (Unbounded knapsack) |
| Maximum profit (stock)                | DP / Greedy        |
| Minimum path sum                      | DP                 |
| Maximum non-overlapping intervals     | Greedy (sort)      |
| Minimum spanning tree                 | Kruskal/Prim       |

---

## 🚩 Red Flags That Suggest Specific Patterns

| Red Flag                                          | Think…                |
|---------------------------------------------------|-----------------------|
| `nums is sorted`                                  | Binary Search / Two Pointers |
| `return all / generate all`                       | Backtracking          |
| `minimum number of steps`                         | BFS / DP              |
| `contiguous subarray`                             | Sliding Window / Prefix Sum |
| `answer modulo 10^9 + 7`                          | DP + Modular Arithmetic |
| `tree / forest / hierarchy`                       | DFS / BFS             |
| `connected / reachable`                           | Graph BFS/DFS / Union-Find |
| `dependency order / prerequisites`                | Topological Sort      |
| `intervals / ranges / meetings`                   | Merge Intervals       |
| `K closest / K largest / K most frequent`         | Heap / Quickselect    |
| `palindrome`                                      | Two Pointers / DP     |
| `distinct characters`                             | Sliding Window + HashMap |
| `matrix / grid`                                   | BFS / DFS / DP        |
| `bit / XOR / binary`                              | Bit Manipulation      |
| `autocomplete / dictionary / prefix`              | Trie                  |
| `mutable range query`                             | Segment Tree          |
| `design / implement class`                        | Design Pattern        |
| `n ≤ 20`                                          | Bitmask DP / Backtracking |
| `n ≤ 10^5, queries ≤ 10^5`                       | Segment Tree / BIT    |

---

## 🔄 When Multiple Patterns Could Work

| Problem                            | Options                    | Best Choice                |
|------------------------------------|----------------------------|----------------------------|
| Two Sum (unsorted)                 | HashMap / Sort+2Ptr        | HashMap O(n)               |
| Two Sum (sorted)                   | Two Pointers / HashMap     | Two Pointers O(1) space    |
| Subarray Sum = K (positive)        | Sliding Window / PrefixSum | Sliding Window O(1) space  |
| Subarray Sum = K (with negatives)  | Prefix Sum + HashMap       | Prefix Sum (only option)   |
| Connected Components               | DFS / BFS / Union-Find     | Union-Find (incremental)   |
| Cycle Detection (linked list)      | Fast-Slow / HashSet        | Fast-Slow O(1) space       |
| Kth Largest                        | Heap / Quickselect / Sort  | Quickselect O(n) avg       |
| Shortest Path (unweighted)         | BFS / Dijkstra             | BFS (simpler, same O())    |
| All Subsets                        | Backtracking / Bitmask     | Bitmask (n ≤ 20)           |
