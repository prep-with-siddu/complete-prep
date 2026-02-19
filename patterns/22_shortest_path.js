/**
 * ============================================================
 *  PATTERN 22: SHORTEST PATH ALGORITHMS (Weighted Graphs)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  When edges have WEIGHTS, BFS alone won't find shortest path.
 *
 *  Algorithms:
 *
 *  1. DIJKSTRA'S — Single source, NON-NEGATIVE weights.
 *     • Use min-heap (priority queue).
 *     • Greedily pick the closest unvisited node.
 *     • O((V + E) log V) with binary heap.
 *
 *  2. BELLMAN-FORD — Single source, handles NEGATIVE weights.
 *     • Relax ALL edges V-1 times.
 *     • Detects negative cycles (if V-th pass still relaxes).
 *     • O(V × E).
 *
 *  3. FLOYD-WARSHALL — ALL pairs shortest paths.
 *     • 3 nested loops: for each intermediate node k, update dist[i][j].
 *     • O(V³). Use when you need ALL pairs and V is small.
 *
 *  4. 0-1 BFS — Weights are only 0 or 1.
 *     • Use deque: push weight-0 edges to FRONT, weight-1 to BACK.
 *     • O(V + E).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Shortest path" in WEIGHTED graph → Dijkstra (if no negative).
 *    ✅ "Network delay time" / "cheapest flights."
 *    ✅ "Negative edge weights" → Bellman-Ford.
 *    ✅ "Shortest path with at most K stops" → Modified Bellman-Ford.
 *    ✅ "All pairs shortest path" (small graph) → Floyd-Warshall.
 *    ✅ Weights are 0 or 1 → 0-1 BFS.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Dijkstra: NEVER revisit a "finalized" node.
 *  2. Bellman-Ford: exactly V-1 relaxation passes. One more to detect neg cycle.
 *  3. For "at most K edges": use Bellman-Ford with K passes (not V-1).
 *  4. Build your own min-heap in JS (no built-in PQ).
 *  5. If graph is unweighted → just use BFS (simpler, faster).
 *
 * ============================================================
 */

// ── MinHeap utility ────────────────────────────────────────
class MinHeap {
  constructor(cmp = (a, b) => a[0] - b[0]) {
    this.data = [];
    this.cmp = cmp;
  }
  size() { return this.data.length; }
  push(val) {
    this.data.push(val);
    let i = this.data.length - 1;
    while (i > 0) {
      const p = (i - 1) >> 1;
      if (this.cmp(this.data[i], this.data[p]) < 0) {
        [this.data[i], this.data[p]] = [this.data[p], this.data[i]];
        i = p;
      } else break;
    }
  }
  pop() {
    const top = this.data[0], last = this.data.pop();
    if (this.data.length > 0) {
      this.data[0] = last;
      let i = 0;
      while (true) {
        let s = i, l = 2*i+1, r = 2*i+2;
        if (l < this.data.length && this.cmp(this.data[l], this.data[s]) < 0) s = l;
        if (r < this.data.length && this.cmp(this.data[r], this.data[s]) < 0) s = r;
        if (s !== i) { [this.data[i], this.data[s]] = [this.data[s], this.data[i]]; i = s; }
        else break;
      }
    }
    return top;
  }
}

// ────────────────────────────────────────────────────────────
//  22a. DIJKSTRA'S ALGORITHM
// ────────────────────────────────────────────────────────────

/**
 * Single-source shortest path. Non-negative weights.
 * Use a min-heap of [distance, node].
 *
 * DRY RUN: 3 nodes, edges: 0→1(4), 0→2(1), 2→1(2)
 *   dist: [0, Inf, Inf]
 *   Heap: [[0,0]]
 *   Pop [0,0]: update 1 → dist=4, 2 → dist=1. Heap: [[1,2],[4,1]]
 *   Pop [1,2]: update 1 → min(4, 1+2)=3. Heap: [[3,1],[4,1]]
 *   Pop [3,1]: no improvement. Done.
 *   dist: [0, 3, 1] ✓
 */
function dijkstra(n, edges, source) {
  // Build adjacency list: node → [[neighbor, weight], ...]
  const graph = Array.from({ length: n }, () => []);
  for (const [u, v, w] of edges) {
    graph[u].push([v, w]);
    // graph[v].push([u, w]); // Uncomment for undirected
  }

  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;

  const heap = new MinHeap();
  heap.push([0, source]); // [distance, node]

  while (heap.size() > 0) {
    const [d, u] = heap.pop();

    if (d > dist[u]) continue; // Skip stale entries

    for (const [v, w] of graph[u]) {
      const newDist = dist[u] + w;
      if (newDist < dist[v]) {
        dist[v] = newDist;
        heap.push([newDist, v]);
      }
    }
  }

  return dist;
}

// ────────────────────────────────────────────────────────────
//  22b. NETWORK DELAY TIME — LC #743
// ────────────────────────────────────────────────────────────

/**
 * Send signal from node k. Return time to reach ALL nodes.
 * = Dijkstra from k. Answer = max(dist[]). If any is Inf → -1.
 */
function networkDelayTime(times, n, k) {
  const dist = dijkstra(n + 1, times.map(([u, v, w]) => [u, v, w]), k);

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}

// Custom Dijkstra for 1-indexed nodes
function networkDelayTimeFull(times, n, k) {
  const graph = Array.from({ length: n + 1 }, () => []);
  for (const [u, v, w] of times) graph[u].push([v, w]);

  const dist = new Array(n + 1).fill(Infinity);
  dist[k] = 0;

  const heap = new MinHeap();
  heap.push([0, k]);

  while (heap.size() > 0) {
    const [d, u] = heap.pop();
    if (d > dist[u]) continue;
    for (const [v, w] of graph[u]) {
      if (dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
        heap.push([dist[v], v]);
      }
    }
  }

  let maxTime = 0;
  for (let i = 1; i <= n; i++) {
    if (dist[i] === Infinity) return -1;
    maxTime = Math.max(maxTime, dist[i]);
  }
  return maxTime;
}

// ────────────────────────────────────────────────────────────
//  22c. CHEAPEST FLIGHTS WITHIN K STOPS — LC #787
// ────────────────────────────────────────────────────────────

/**
 * Modified Bellman-Ford: run only K+1 passes (K stops = K+1 edges).
 *
 * Each pass relaxes ALL edges using distances from PREVIOUS pass
 * (copy array to avoid using current-pass values).
 */
function findCheapestPrice(n, flights, src, dst, k) {
  let dist = new Array(n).fill(Infinity);
  dist[src] = 0;

  for (let i = 0; i <= k; i++) {
    const temp = [...dist]; // Copy from previous pass

    for (const [u, v, w] of flights) {
      if (dist[u] !== Infinity && dist[u] + w < temp[v]) {
        temp[v] = dist[u] + w;
      }
    }

    dist = temp;
  }

  return dist[dst] === Infinity ? -1 : dist[dst];
}

// ────────────────────────────────────────────────────────────
//  22d. BELLMAN-FORD (with Negative Cycle Detection)
// ────────────────────────────────────────────────────────────

/**
 * Relax ALL edges V-1 times.
 * One more pass: if anything relaxes → NEGATIVE CYCLE.
 */
function bellmanFord(n, edges, source) {
  const dist = new Array(n).fill(Infinity);
  dist[source] = 0;

  // V-1 passes
  for (let i = 0; i < n - 1; i++) {
    for (const [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }

  // Check for negative cycles
  for (const [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      return { dist: null, hasNegativeCycle: true };
    }
  }

  return { dist, hasNegativeCycle: false };
}

// ────────────────────────────────────────────────────────────
//  22e. FLOYD-WARSHALL (All Pairs Shortest Path)
// ────────────────────────────────────────────────────────────

/**
 * dp[i][j] = shortest path from i to j.
 * For each intermediate node k:
 *   dp[i][j] = min(dp[i][j], dp[i][k] + dp[k][j])
 * O(V³)
 */
function floydWarshall(n, edges) {
  const INF = Infinity;
  const dist = Array.from({ length: n }, () => new Array(n).fill(INF));

  // Self-distance = 0
  for (let i = 0; i < n; i++) dist[i][i] = 0;

  // Initialize with direct edges
  for (const [u, v, w] of edges) {
    dist[u][v] = Math.min(dist[u][v], w);
  }

  // Relax through each intermediate node k
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j];
        }
      }
    }
  }

  return dist;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== SHORTEST PATH ALGORITHMS ===\n");

// 22a. Dijkstra
console.log("22a. Dijkstra (3 nodes):", dijkstra(3, [[0,1,4],[0,2,1],[2,1,2]], 0));
// [0, 3, 1]

// 22b. Network Delay Time
console.log("\n22b. Network Delay:", networkDelayTimeFull([[2,1,1],[2,3,1],[3,4,1]], 4, 2)); // 2

// 22c. Cheapest Flights
console.log("\n22c. Cheapest Flights:", findCheapestPrice(
  4, [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], 0, 3, 1
)); // 700

// 22d. Bellman-Ford
const bf = bellmanFord(5, [[0,1,6],[0,3,7],[1,2,5],[1,3,8],[1,4,-4],[2,1,-2],[3,2,-3],[3,4,9],[4,0,2],[4,2,7]], 0);
console.log("\n22d. Bellman-Ford:", bf.dist, "Neg cycle:", bf.hasNegativeCycle);
// [0, 2, 4, 7, -2] false

// 22e. Floyd-Warshall
const fw = floydWarshall(4, [[0,1,3],[0,3,7],[1,0,8],[1,2,2],[2,0,5],[2,3,1],[3,0,2]]);
console.log("\n22e. Floyd-Warshall (node 0 to all):", fw[0]);
// [0, 3, 5, 6]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Network Delay Time                      | Medium     | 743   |
 *  | Cheapest Flights Within K Stops         | Medium     | 787   |
 *  | Path with Maximum Probability           | Medium     | 1514  |
 *  | Path with Minimum Effort                | Medium     | 1631  |
 *  | Swim in Rising Water                    | Hard       | 778   |
 *  | Shortest Path in Binary Matrix          | Medium     | 1091  |
 *  | Min Cost to Connect All Points (MST)    | Medium     | 1584  |
 *  | Find the City With Fewest Reachable     | Medium     | 1334  |
 *
 *  ALGORITHM SELECTION GUIDE:
 *  ──────────────────────────
 *  Unweighted graph         → BFS                     O(V + E)
 *  Non-negative weights     → Dijkstra                O((V+E) log V)
 *  Negative weights         → Bellman-Ford            O(V × E)
 *  At most K edges          → Modified Bellman-Ford   O(K × E)
 *  All pairs shortest path  → Floyd-Warshall          O(V³)
 *  Weights 0 or 1           → 0-1 BFS (Deque)        O(V + E)
 *  Minimum Spanning Tree    → Kruskal (UF) / Prim     O(E log E)
 */
