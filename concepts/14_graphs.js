// ============================================================
// 📘 CONCEPT 14: GRAPHS
// ============================================================
// A graph is a collection of NODES (vertices) connected by
// EDGES. Graphs model relationships and connections.
// Trees, linked lists, and even arrays are special cases of graphs!
// ============================================================

// ============================================================
// 🔹 GRAPH TERMINOLOGY
// ============================================================
/*
VERTEX (NODE): A point in the graph
EDGE: A connection between two vertices
DEGREE: Number of edges connected to a vertex
PATH: Sequence of vertices connected by edges
CYCLE: A path that starts and ends at the same vertex
CONNECTED: Every vertex is reachable from every other vertex

TYPES:
- DIRECTED (Digraph): Edges have direction (A → B)
- UNDIRECTED: Edges are bidirectional (A — B)
- WEIGHTED: Edges have costs/weights
- UNWEIGHTED: All edges are equal
- CYCLIC: Contains at least one cycle
- ACYCLIC: No cycles (DAG = Directed Acyclic Graph)
*/

// ============================================================
// 🔹 GRAPH REPRESENTATION
// ============================================================

// --- 1. ADJACENCY LIST (Most Common) ⭐ ---
// Each vertex stores a list of its neighbors
// Space: O(V + E)

// Using Map
const graphMap = new Map();
graphMap.set(0, [1, 2]);
graphMap.set(1, [0, 3]);
graphMap.set(2, [0, 3]);
graphMap.set(3, [1, 2]);

// Using Array of Arrays (for 0-indexed vertices)
const graphArr = [
  [1, 2],    // 0's neighbors
  [0, 3],    // 1's neighbors
  [0, 3],    // 2's neighbors
  [1, 2],    // 3's neighbors
];

// Building from edge list
function buildGraph(numNodes, edges, directed = false) {
  const graph = Array.from({ length: numNodes }, () => []);
  for (const [u, v] of edges) {
    graph[u].push(v);
    if (!directed) graph[v].push(u); // Undirected: add both ways
  }
  return graph;
}

// Weighted graph (store [neighbor, weight])
function buildWeightedGraph(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    graph[v].push([u, w]);
  }
  return graph;
}

// --- 2. ADJACENCY MATRIX ---
// 2D array where matrix[i][j] = 1 if edge exists
// Space: O(V²) — only good for dense graphs
const matrix = [
  [0, 1, 1, 0],
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [0, 1, 1, 0],
];

// ============================================================
// 🔹 GRAPH TRAVERSAL — BFS & DFS ⭐⭐⭐
// ============================================================

// --- BFS (Breadth-First Search) ---
// Explore level by level (like tree level-order)
// Uses a QUEUE
// Best for: Shortest path (unweighted), level-order
function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];

  while (queue.length > 0) {
    const node = queue.shift(); // Dequeue
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor); // Enqueue
      }
    }
  }
  return order;
}

// --- DFS (Depth-First Search) ---
// Explore as deep as possible, then backtrack
// Uses a STACK (or recursion)
// Best for: Cycle detection, path finding, topological sort

// Recursive DFS
function dfsRecursive(graph, start, visited = new Set()) {
  visited.add(start);
  console.log(start);

  for (const neighbor of graph[start]) {
    if (!visited.has(neighbor)) {
      dfsRecursive(graph, neighbor, visited);
    }
  }
}

// Iterative DFS (using stack)
function dfsIterative(graph, start) {
  const visited = new Set();
  const stack = [start];
  const order = [];

  while (stack.length > 0) {
    const node = stack.pop();
    if (visited.has(node)) continue;
    visited.add(node);
    order.push(node);

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        stack.push(neighbor);
      }
    }
  }
  return order;
}

// ============================================================
// 🔹 BFS vs DFS
// ============================================================
/*
┌──────────────────┬──────────────────┬──────────────────┐
│                  │ BFS              │ DFS              │
├──────────────────┼──────────────────┼──────────────────┤
│ Data Structure   │ Queue            │ Stack/Recursion  │
│ Explores         │ Level by level   │ Deep first       │
│ Shortest path    │ ✅ (unweighted)  │ ❌               │
│ Space            │ O(V) or O(width) │ O(V) or O(depth)│
│ Cycle detection  │ ✅               │ ✅               │
│ Topological sort │ ✅ (Kahn's)      │ ✅               │
│ Use when         │ Shortest path,   │ Cycle detection, │
│                  │ level-based      │ backtracking     │
└──────────────────┴──────────────────┴──────────────────┘

Both are O(V + E) time and O(V) space.
*/

// ============================================================
// 🔹 COMMON GRAPH PROBLEMS
// ============================================================

// --- 1. Number of Connected Components / Islands ---
function numIslands(grid) {
  if (!grid.length) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === "0") return;
    grid[r][c] = "0"; // Mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === "1") {
        count++;
        dfs(r, c);
      }
    }
  }
  return count;
}

// --- 2. Shortest Path (BFS - Unweighted) ---
function shortestPath(graph, start, end) {
  const visited = new Set([start]);
  const queue = [[start, 0]]; // [node, distance]

  while (queue.length > 0) {
    const [node, dist] = queue.shift();
    if (node === end) return dist;

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push([neighbor, dist + 1]);
      }
    }
  }
  return -1; // Not reachable
}

// --- 3. Detect Cycle in Undirected Graph ---
function hasCycleUndirected(graph, n) {
  const visited = new Set();

  function dfs(node, parent) {
    visited.add(node);
    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        if (dfs(neighbor, node)) return true;
      } else if (neighbor !== parent) {
        return true; // Found cycle!
      }
    }
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (!visited.has(i)) {
      if (dfs(i, -1)) return true;
    }
  }
  return false;
}

// --- 4. Detect Cycle in Directed Graph ---
function hasCycleDirected(graph, n) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Array(n).fill(WHITE);

  function dfs(node) {
    color[node] = GRAY; // Being processed
    for (const neighbor of graph[node]) {
      if (color[neighbor] === GRAY) return true; // Back edge = cycle!
      if (color[neighbor] === WHITE && dfs(neighbor)) return true;
    }
    color[node] = BLACK; // Done processing
    return false;
  }

  for (let i = 0; i < n; i++) {
    if (color[i] === WHITE && dfs(i)) return true;
  }
  return false;
}

// --- 5. Topological Sort (DAG only) ---
// Order vertices so every edge goes left to right
function topologicalSort(graph, n) {
  const inDegree = new Array(n).fill(0);
  for (let u = 0; u < n; u++) {
    for (const v of graph[u]) inDegree[v]++;
  }

  const queue = [];
  for (let i = 0; i < n; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return order.length === n ? order : []; // Empty if cycle exists
}

// --- 6. Dijkstra's Algorithm (Shortest Path - Weighted) ---
// Uses a priority queue (min-heap)
function dijkstra(graph, start, n) {
  const dist = new Array(n).fill(Infinity);
  dist[start] = 0;
  // Simple implementation using array (use MinHeap for better performance)
  const visited = new Set();

  for (let count = 0; count < n; count++) {
    // Find unvisited node with minimum distance
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!visited.has(i) && (u === -1 || dist[i] < dist[u])) u = i;
    }

    if (dist[u] === Infinity) break;
    visited.add(u);

    for (const [v, weight] of graph[u]) {
      if (dist[u] + weight < dist[v]) {
        dist[v] = dist[u] + weight;
      }
    }
  }
  return dist;
}
// Time: O(V²) with array, O((V+E) log V) with min-heap

// --- 7. Clone Graph ---
function cloneGraph(node) {
  if (!node) return null;
  const map = new Map();

  function dfs(original) {
    if (map.has(original)) return map.get(original);
    const copy = { val: original.val, neighbors: [] };
    map.set(original, copy);
    for (const neighbor of original.neighbors) {
      copy.neighbors.push(dfs(neighbor));
    }
    return copy;
  }

  return dfs(node);
}

// ============================================================
// 🔹 GRAPH PROBLEM PATTERNS
// ============================================================
/*
1. TRAVERSAL (BFS/DFS)
   - Number of islands, flood fill, connected components
   
2. SHORTEST PATH
   - Unweighted → BFS
   - Weighted (positive) → Dijkstra
   - Negative weights → Bellman-Ford
   - All pairs → Floyd-Warshall

3. CYCLE DETECTION
   - Undirected: DFS with parent tracking
   - Directed: DFS with 3-color marking

4. TOPOLOGICAL SORT
   - Course schedule, build order
   - Only for DAGs (Directed Acyclic Graphs)

5. UNION-FIND
   - Connected components, redundant connection
   
6. MINIMUM SPANNING TREE
   - Kruskal's, Prim's algorithms
*/

// ============================================================
// 🔹 GRAPH ALGORITHM SUMMARY
// ============================================================
/*
┌───────────────────────┬─────────────┬───────────────────┐
│ Algorithm             │ Time        │ Use Case          │
├───────────────────────┼─────────────┼───────────────────┤
│ BFS                   │ O(V + E)    │ Shortest unweight │
│ DFS                   │ O(V + E)    │ Cycle, path, topo │
│ Dijkstra              │ O(ElogV)    │ Shortest weighted │
│ Bellman-Ford          │ O(V * E)    │ Negative weights  │
│ Floyd-Warshall        │ O(V³)       │ All-pairs shortest│
│ Topological Sort      │ O(V + E)    │ Ordering DAG      │
│ Kruskal (MST)         │ O(ElogE)    │ Min spanning tree │
│ Prim (MST)            │ O(ElogV)    │ Min spanning tree │
│ Union-Find            │ O(α(n))     │ Connected comps   │
└───────────────────────┴─────────────┴───────────────────┘
*/

console.log("✅ Graphs — Model relationships, traverse connections!");
