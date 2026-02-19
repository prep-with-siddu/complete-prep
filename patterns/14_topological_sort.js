/**
 * ============================================================
 *  PATTERN 14: TOPOLOGICAL SORT
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Linear ordering of vertices in a DAG (Directed Acyclic Graph)
 *  such that for every edge u→v, u comes before v.
 *
 *  Two approaches:
 *    1. KAHN'S ALGORITHM (BFS)
 *       • Track in-degree of every node.
 *       • Start with all nodes having in-degree 0.
 *       • Process them, decrement in-degree of neighbors.
 *       • If count of processed nodes ≠ total nodes → CYCLE exists.
 *
 *    2. DFS-based
 *       • Post-order DFS → reverse the result.
 *       • Detect cycles via "visiting" (gray) state.
 *
 *  Time: O(V + E)   Space: O(V + E)
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Course schedule" / "prerequisites."
 *    ✅ "Order of tasks with dependencies."
 *    ✅ "Alien dictionary" / ordering of characters.
 *    ✅ "Can you finish all tasks?" (cycle detection in DAG).
 *    ✅ Directed graph + ordering.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Build adjacency list + in-degree array from edges.
 *  2. Queue starts with all in-degree-0 nodes.
 *  3. If final count < total nodes → CYCLE (impossible to finish).
 *  4. For "alien dictionary," each adjacent word pair gives one edge.
 *  5. Multiple valid orderings may exist; BFS gives lexicographic
 *     order if you use a min-heap instead of a queue.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  14a. COURSE SCHEDULE — LC #207
// ────────────────────────────────────────────────────────────

/**
 * Can you finish all courses? (Detect cycle in prerequisite graph)
 *
 * DRY RUN: numCourses=4, prerequisites=[[1,0],[2,0],[3,1],[3,2]]
 *   Graph: 0→[1,2], 1→[3], 2→[3]
 *   In-degrees: [0,1,1,2]
 *   
 *   Queue: [0] (in-degree 0)
 *   Process 0 → decrement 1,2 → in-degrees: [0,0,0,2] → push 1,2
 *   Process 1 → decrement 3 → in-degrees: [0,0,0,1]
 *   Process 2 → decrement 3 → in-degrees: [0,0,0,0] → push 3
 *   Process 3 → done
 *   count=4 === numCourses → true ✓
 */
function canFinish(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  // Build graph
  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  // Start with all zero in-degree nodes
  const queue = [];
  for (let i = 0; i < numCourses; i++) {
    if (inDegree[i] === 0) queue.push(i);
  }

  let count = 0;
  while (queue.length > 0) {
    const node = queue.shift();
    count++;

    for (const neighbor of graph[node]) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }
  }

  return count === numCourses; // If not equal → cycle exists
}

// ────────────────────────────────────────────────────────────
//  14b. COURSE SCHEDULE II — LC #210
// ────────────────────────────────────────────────────────────

/**
 * Return the ORDER in which courses should be taken.
 * Same as above but also collect the order.
 */
function findOrder(numCourses, prerequisites) {
  const graph = Array.from({ length: numCourses }, () => []);
  const inDegree = new Array(numCourses).fill(0);

  for (const [course, prereq] of prerequisites) {
    graph[prereq].push(course);
    inDegree[course]++;
  }

  const queue = [];
  for (let i = 0; i < numCourses; i++) {
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

  return order.length === numCourses ? order : []; // Empty if cycle
}

// ────────────────────────────────────────────────────────────
//  14c. ALIEN DICTIONARY — LC #269 (Premium)
// ────────────────────────────────────────────────────────────

/**
 * Given sorted list of words in alien language, derive character order.
 * Compare adjacent words to find ordering constraints.
 *
 * Example: ["wrt","wrf","er","ett","rftt"]
 *   wrt vs wrf → t before f (t→f)
 *   wrf vs er  → w before e (w→e)
 *   er vs ett  → r before t (r→t)
 *   ett vs rftt → e before r (e→r)
 *   Order: w→e→r→t→f → "wertf"
 */
function alienOrder(words) {
  // Initialize graph for all unique characters
  const graph = new Map();
  const inDegree = new Map();

  for (const word of words) {
    for (const ch of word) {
      if (!graph.has(ch)) graph.set(ch, new Set());
      if (!inDegree.has(ch)) inDegree.set(ch, 0);
    }
  }

  // Compare adjacent words to build edges
  for (let i = 0; i < words.length - 1; i++) {
    const w1 = words[i], w2 = words[i + 1];
    const minLen = Math.min(w1.length, w2.length);

    // Edge case: "abc" before "ab" is invalid
    if (w1.length > w2.length && w1.slice(0, minLen) === w2.slice(0, minLen)) {
      return '';
    }

    for (let j = 0; j < minLen; j++) {
      if (w1[j] !== w2[j]) {
        if (!graph.get(w1[j]).has(w2[j])) {
          graph.get(w1[j]).add(w2[j]);
          inDegree.set(w2[j], inDegree.get(w2[j]) + 1);
        }
        break; // Only first difference matters
      }
    }
  }

  // Kahn's BFS
  const queue = [];
  for (const [ch, deg] of inDegree) {
    if (deg === 0) queue.push(ch);
  }

  let result = '';
  while (queue.length > 0) {
    const ch = queue.shift();
    result += ch;

    for (const neighbor of graph.get(ch)) {
      inDegree.set(neighbor, inDegree.get(neighbor) - 1);
      if (inDegree.get(neighbor) === 0) queue.push(neighbor);
    }
  }

  return result.length === graph.size ? result : ''; // '' if cycle
}

// ────────────────────────────────────────────────────────────
//  14d. DFS-BASED TOPOLOGICAL SORT
// ────────────────────────────────────────────────────────────

/**
 * Alternative approach: post-order DFS → reverse.
 * Use 3 states: 0 (unvisited), 1 (visiting/gray), 2 (visited/black).
 * If we revisit a "visiting" node → CYCLE.
 */
function topologicalSort_DFS(numNodes, edges) {
  const graph = Array.from({ length: numNodes }, () => []);
  for (const [u, v] of edges) graph[u].push(v);

  const state = new Array(numNodes).fill(0); // 0=white, 1=gray, 2=black
  const stack = [];
  let hasCycle = false;

  function dfs(node) {
    if (state[node] === 1) { hasCycle = true; return; } // Cycle!
    if (state[node] === 2) return; // Already processed

    state[node] = 1; // Mark visiting
    for (const neighbor of graph[node]) {
      dfs(neighbor);
      if (hasCycle) return;
    }
    state[node] = 2; // Mark visited
    stack.push(node); // Post-order
  }

  for (let i = 0; i < numNodes; i++) {
    if (state[i] === 0) dfs(i);
    if (hasCycle) return [];
  }

  return stack.reverse(); // Reverse post-order = topological order
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== TOPOLOGICAL SORT ===\n");

console.log("14a. Can Finish (no cycle):", canFinish(4, [[1,0],[2,0],[3,1],[3,2]])); // true
console.log("     Can Finish (cycle):   ", canFinish(2, [[1,0],[0,1]]));             // false

console.log("\n14b. Course Order:", findOrder(4, [[1,0],[2,0],[3,1],[3,2]])); // [0,1,2,3] or [0,2,1,3]

console.log("\n14c. Alien Dictionary:", alienOrder(["wrt","wrf","er","ett","rftt"])); // "wertf"

console.log("\n14d. DFS Topo Sort:", topologicalSort_DFS(6, [[5,2],[5,0],[4,0],[4,1],[2,3],[3,1]]));
// e.g., [5,4,2,3,1,0]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Course Schedule                         | Medium     | 207   |
 *  | Course Schedule II                      | Medium     | 210   |
 *  | Alien Dictionary                        | Hard       | 269   |
 *  | Minimum Height Trees                    | Medium     | 310   |
 *  | Sequence Reconstruction                 | Medium     | 444   |
 *  | Parallel Courses                        | Medium     | 1136  |
 *  | Sort Items by Groups Respecting Deps    | Hard       | 1203  |
 */
