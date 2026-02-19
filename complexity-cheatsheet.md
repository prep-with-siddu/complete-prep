# ⏱️ Time & Space Complexity Cheat Sheet

## Big-O Ranking (Fastest → Slowest)

| Complexity     | Name              | Example                         | n=10   | n=100    | n=1000       |
|----------------|-------------------|---------------------------------|--------|----------|--------------|
| `O(1)`         | Constant          | Hash lookup, array index        | 1      | 1        | 1            |
| `O(log n)`     | Logarithmic       | Binary search                   | 3      | 7        | 10           |
| `O(√n)`        | Square root       | Prime check trial division      | 3      | 10       | 31           |
| `O(n)`         | Linear            | Single loop, linear search      | 10     | 100      | 1,000        |
| `O(n log n)`   | Linearithmic      | Merge sort, heap sort           | 33     | 664      | 9,966        |
| `O(n²)`        | Quadratic         | Nested loops, bubble sort       | 100    | 10,000   | 1,000,000    |
| `O(n² log n)`  | —                 | Some geometry algorithms        | 330    | 66,400   | 9,966,000    |
| `O(n³)`        | Cubic             | Floyd-Warshall, 3 nested loops  | 1,000  | 1M       | 1B           |
| `O(2ⁿ)`        | Exponential       | Subsets, backtracking           | 1,024  | 1.3×10³⁰ | ∞            |
| `O(n!)`        | Factorial         | Permutations                    | 3.6M   | ∞        | ∞            |

---

## Constraint → Expected Complexity Guide

| Input Size (n)     | Target Complexity      | Typical Approach                    |
|--------------------|------------------------|-------------------------------------|
| n ≤ 10             | O(n!) or O(2ⁿ)        | Brute force, backtracking           |
| n ≤ 20             | O(2ⁿ)                 | Bitmask DP, backtracking            |
| n ≤ 100            | O(n³)                 | DP on intervals, Floyd-Warshall     |
| n ≤ 1,000          | O(n²)                 | DP tables, double loop              |
| n ≤ 10,000         | O(n² log n)           | Sorting + quadratic                 |
| n ≤ 100,000        | O(n log n)            | Sort, heap, segment tree            |
| n ≤ 1,000,000      | O(n) or O(n log n)    | Hash map, two pointers, greedy      |
| n ≤ 10,000,000     | O(n)                  | Linear scan, bucket sort            |
| n ≤ 10⁹            | O(log n) or O(√n)     | Binary search, math                 |
| n ≤ 10¹⁸           | O(log n)              | Binary search, fast exponentiation  |

---

## Data Structure Operations

### Arrays / Lists
| Operation          | Array  | Sorted Array | Linked List | Dynamic Array |
|--------------------|--------|--------------|-------------|---------------|
| Access by index    | O(1)   | O(1)         | O(n)        | O(1)          |
| Search             | O(n)   | O(log n)     | O(n)        | O(n)          |
| Insert at end      | O(1)*  | O(n)         | O(1)**      | O(1) amort.   |
| Insert at start    | O(n)   | O(n)         | O(1)        | O(n)          |
| Delete             | O(n)   | O(n)         | O(1)**      | O(n)          |

*\*Fixed size  \*\*If you have reference to node*

### Hash-Based
| Operation    | HashMap (avg) | HashMap (worst) | HashSet (avg) | HashSet (worst) |
|--------------|---------------|-----------------|---------------|-----------------|
| Insert       | O(1)          | O(n)            | O(1)          | O(n)            |
| Delete       | O(1)          | O(n)            | O(1)          | O(n)            |
| Search       | O(1)          | O(n)            | O(1)          | O(n)            |
| Space        | O(n)          | O(n)            | O(n)          | O(n)            |

### Trees
| Operation | BST (avg) | BST (worst) | AVL/Red-Black | Heap     | Trie     |
|-----------|-----------|-------------|---------------|----------|----------|
| Insert    | O(log n)  | O(n)        | O(log n)      | O(log n) | O(L)     |
| Delete    | O(log n)  | O(n)        | O(log n)      | O(log n) | O(L)     |
| Search    | O(log n)  | O(n)        | O(log n)      | O(n)     | O(L)     |
| Min/Max   | O(log n)  | O(n)        | O(log n)      | O(1)     | —        |

*L = length of key (for Trie)*

### Stack & Queue
| Operation   | Stack | Queue | Deque | Priority Queue |
|-------------|-------|-------|-------|----------------|
| Push/Enqueue| O(1)  | O(1)  | O(1)  | O(log n)       |
| Pop/Dequeue | O(1)  | O(1)  | O(1)  | O(log n)       |
| Peek        | O(1)  | O(1)  | O(1)  | O(1)           |
| Search      | O(n)  | O(n)  | O(n)  | O(n)           |

### Graph Representations
| Operation       | Adjacency Matrix | Adjacency List |
|-----------------|-----------------|----------------|
| Space           | O(V²)           | O(V + E)       |
| Add Edge        | O(1)            | O(1)           |
| Remove Edge     | O(1)            | O(E)           |
| Check Edge      | O(1)            | O(degree)      |
| Iterate Adj     | O(V)            | O(degree)      |

---

## Sorting Algorithms Comparison

| Algorithm      | Best       | Average    | Worst      | Space   | Stable? |
|----------------|------------|------------|------------|---------|---------|
| Bubble Sort    | O(n)       | O(n²)     | O(n²)     | O(1)    | ✅ Yes  |
| Selection Sort | O(n²)     | O(n²)     | O(n²)     | O(1)    | ❌ No   |
| Insertion Sort | O(n)       | O(n²)     | O(n²)     | O(1)    | ✅ Yes  |
| Merge Sort     | O(n log n) | O(n log n)| O(n log n)| O(n)    | ✅ Yes  |
| Quick Sort     | O(n log n) | O(n log n)| O(n²)     | O(log n)| ❌ No   |
| Heap Sort      | O(n log n) | O(n log n)| O(n log n)| O(1)    | ❌ No   |
| Counting Sort  | O(n + k)   | O(n + k)  | O(n + k)  | O(k)    | ✅ Yes  |
| Radix Sort     | O(d·(n+k)) | O(d·(n+k))| O(d·(n+k))| O(n+k)  | ✅ Yes  |
| Bucket Sort    | O(n + k)   | O(n + k)  | O(n²)     | O(n)    | ✅ Yes  |
| Tim Sort (JS)  | O(n)       | O(n log n)| O(n log n)| O(n)    | ✅ Yes  |

*k = range of values, d = number of digits*

---

## Graph Algorithm Complexities

| Algorithm        | Time             | Space    | Use Case                       |
|------------------|------------------|----------|--------------------------------|
| BFS              | O(V + E)         | O(V)     | Shortest path (unweighted)     |
| DFS              | O(V + E)         | O(V)     | Cycle detection, topological   |
| Dijkstra         | O((V+E) log V)   | O(V)     | Shortest path (non-negative)   |
| Bellman-Ford     | O(V · E)         | O(V)     | Shortest path (negative edges) |
| Floyd-Warshall   | O(V³)            | O(V²)   | All-pairs shortest path        |
| Kruskal          | O(E log E)       | O(V)     | MST (sparse graphs)            |
| Prim             | O((V+E) log V)   | O(V)     | MST (dense graphs)             |
| Topological Sort | O(V + E)         | O(V)     | DAG ordering                   |
| Union-Find       | O(α(n)) ≈ O(1)  | O(V)     | Connected components           |

---

## Dynamic Programming Complexities

| Pattern               | Time       | Space      | Example                      |
|-----------------------|------------|------------|------------------------------|
| 0/1 Knapsack          | O(n·W)    | O(n·W)→O(W)| Subset sum, partition       |
| Unbounded Knapsack     | O(n·W)    | O(W)       | Coin change, rod cutting     |
| LCS                   | O(m·n)    | O(m·n)→O(n)| Edit distance, common subseq|
| LIS                   | O(n log n)| O(n)       | Longest increasing subseq    |
| Kadane's              | O(n)      | O(1)       | Maximum subarray             |
| Matrix Chain          | O(n³)     | O(n²)      | Balloon burst, optimal BST   |
| Bitmask DP            | O(2ⁿ · n) | O(2ⁿ)     | TSP, assignment              |
| Digit DP              | O(D·S·2)  | O(D·S·2)  | Count numbers with property  |
| Tree DP               | O(n)      | O(n)       | Max path sum, diameter       |

---

## Space Complexity Quick Reference

| Technique                | Extra Space       |
|--------------------------|-------------------|
| Variable / pointer       | O(1)              |
| Hash map / set           | O(n)              |
| Recursion (depth d)      | O(d) stack        |
| BFS queue                | O(width) ≈ O(n)  |
| DFS stack                | O(height)         |
| 2D DP table              | O(m × n)          |
| 2D DP → 1D optimization  | O(n)              |
| Adjacency list           | O(V + E)          |
| Adjacency matrix         | O(V²)             |
| Segment tree             | O(4n)             |
| Trie (L words, avg len k)| O(L × k)          |

---

## Common Time Complexity Patterns in Code

```
O(1)       → Direct formula / hash table lookup
O(log n)   → Halving the search space each step
O(n)       → Single pass through data
O(n log n) → Sorting, then linear scan
O(n²)      → Nested loops (comparing all pairs)
O(2ⁿ)      → Generating all subsets
O(n!)      → Generating all permutations
```

## How to Identify Time Complexity

```
✓ Single for loop (0 to n)                           → O(n)
✓ Two nested for loops (0 to n)                       → O(n²)
✓ Loop variable doubles/halves each iteration          → O(log n)
✓ Recursion splitting into 2, each of size n/2         → O(n log n)
✓ Recursion with 2 branches, depth n                   → O(2ⁿ)
✓ Loop from 0 to n INSIDE loop from 0 to n             → O(n²)
✓ Binary search                                        → O(log n)
✓ Hash map operations inside single loop                → O(n)
✓ Sort + two pointers                                   → O(n log n)
```
