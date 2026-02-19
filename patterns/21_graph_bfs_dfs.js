/**
 * ============================================================
 *  PATTERN 21: GRAPH BFS / DFS TRAVERSAL
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Graphs = Nodes + Edges. Unlike trees, graphs can have:
 *    • CYCLES — you MUST track visited nodes.
 *    • Disconnected components — iterate ALL nodes as start points.
 *    • Directed or Undirected edges.
 *
 *  Representations:
 *    1. ADJACENCY LIST — Map<node, [neighbors]>. Best for sparse graphs.
 *    2. ADJACENCY MATRIX — 2D array. grid[i][j] = 1 if edge exists.
 *    3. EDGE LIST — Array of [u, v] pairs.
 *    4. IMPLICIT GRAPH — Grid where cells are nodes, 4-directional neighbors are edges.
 *
 *  BFS (Breadth-First):
 *    • Uses QUEUE. Explores level-by-level.
 *    • Best for: SHORTEST PATH in unweighted graph, level-order.
 *    • Time: O(V + E). Space: O(V).
 *
 *  DFS (Depth-First):
 *    • Uses STACK or RECURSION. Goes deep first.
 *    • Best for: Connected components, cycle detection, path finding, backtracking.
 *    • Time: O(V + E). Space: O(V).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Number of islands" / "Number of provinces."
 *    ✅ "Clone graph."
 *    ✅ "Word ladder" / "shortest transformation."
 *    ✅ "Surrounded regions" / "flood fill."
 *    ✅ "Pacific Atlantic water flow."
 *    ✅ Grid traversal (cells = nodes, 4-directional = edges).
 *    ✅ "Shortest path" in UNWEIGHTED graph → BFS.
 *    ✅ "Find all paths" / "connected components" → DFS.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. ALWAYS track visited. Use a Set, boolean array, or mark grid in-place.
 *  2. Grid traversal: directions = [[0,1],[0,-1],[1,0],[-1,0]].
 *  3. BFS for shortest path (unweighted). DFS for "explore all."
 *  4. For multi-source BFS, push ALL sources into queue BEFORE starting.
 *  5. "Surrounded regions" trick: start DFS from BORDER, not inside.
 *  6. Clone graph: use a Map<original, clone> to handle cycles.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  21a. NUMBER OF ISLANDS — LC #200 (DFS on Grid)
// ────────────────────────────────────────────────────────────

/**
 * Count connected components of '1's in a grid.
 * DFS from each '1', mark visited by changing to '0'.
 *
 * DRY RUN: grid = [["1","1","0"],["1","0","0"],["0","0","1"]]
 *   Start (0,0)='1' → DFS marks (0,0),(0,1),(1,0) → count=1
 *   (0,2)='0' skip. (1,1)='0' skip. (1,2)='0' skip.
 *   (2,0)='0' skip. (2,1)='0' skip. (2,2)='1' → DFS → count=2
 *   Answer: 2 ✓
 */
function numIslands(grid) {
  if (!grid || grid.length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;
  let count = 0;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || grid[r][c] === '0') return;
    grid[r][c] = '0'; // Mark visited
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        count++;
        dfs(r, c);
      }
    }
  }

  return count;
}

// ────────────────────────────────────────────────────────────
//  21b. FLOOD FILL — LC #733
// ────────────────────────────────────────────────────────────

/**
 * Starting from (sr, sc), change all connected cells with same color
 * to newColor. Classic DFS on grid.
 */
function floodFill(image, sr, sc, newColor) {
  const origColor = image[sr][sc];
  if (origColor === newColor) return image; // Avoid infinite loop

  const rows = image.length, cols = image[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (image[r][c] !== origColor) return;

    image[r][c] = newColor;
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  dfs(sr, sc);
  return image;
}

// ────────────────────────────────────────────────────────────
//  21c. CLONE GRAPH — LC #133
// ────────────────────────────────────────────────────────────

/**
 * Deep copy a graph. Use a Map<original, clone> to handle cycles.
 *
 * For each node:
 *   - If already cloned → return from map.
 *   - Otherwise create clone, put in map, recursively clone neighbors.
 */
class GraphNode {
  constructor(val = 0, neighbors = []) {
    this.val = val;
    this.neighbors = neighbors;
  }
}

function cloneGraph(node) {
  if (!node) return null;

  const visited = new Map(); // original → clone

  function dfs(original) {
    if (visited.has(original)) return visited.get(original);

    const clone = new GraphNode(original.val);
    visited.set(original, clone); // Map BEFORE recursing (handles cycles)

    for (const neighbor of original.neighbors) {
      clone.neighbors.push(dfs(neighbor));
    }

    return clone;
  }

  return dfs(node);
}

// ────────────────────────────────────────────────────────────
//  21d. WORD LADDER — LC #127 (BFS Shortest Path)
// ────────────────────────────────────────────────────────────

/**
 * Transform beginWord → endWord, changing one letter at a time,
 * each intermediate word must be in wordList.
 * Return SHORTEST transformation length.
 *
 * This is BFS on an implicit graph:
 *   Node = word, Edge = differ by 1 char.
 *
 * Optimization: Use wildcard patterns.
 *   "hot" → "*ot", "h*t", "ho*"
 *   Group words by pattern → neighbors.
 */
function ladderLength(beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  if (!wordSet.has(endWord)) return 0;

  const queue = [[beginWord, 1]]; // [word, depth]
  const visited = new Set([beginWord]);

  while (queue.length > 0) {
    const [word, depth] = queue.shift();

    for (let i = 0; i < word.length; i++) {
      for (let c = 97; c <= 122; c++) { // 'a' to 'z'
        const newWord = word.slice(0, i) + String.fromCharCode(c) + word.slice(i + 1);

        if (newWord === endWord) return depth + 1;

        if (wordSet.has(newWord) && !visited.has(newWord)) {
          visited.add(newWord);
          queue.push([newWord, depth + 1]);
        }
      }
    }
  }

  return 0;
}

// ────────────────────────────────────────────────────────────
//  21e. ROTTING ORANGES — LC #994 (Multi-source BFS)
// ────────────────────────────────────────────────────────────

/**
 * 0 = empty, 1 = fresh, 2 = rotten.
 * Each minute, rotten spreads to 4-directional fresh neighbors.
 * Return minutes until no fresh remain, or -1 if impossible.
 *
 * Multi-source BFS: push ALL rotten oranges into queue first,
 * then BFS level-by-level (each level = 1 minute).
 */
function orangesRotting(grid) {
  const rows = grid.length, cols = grid[0].length;
  const queue = [];
  let fresh = 0;

  // Find all rotten + count fresh
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === 2) queue.push([r, c]);
      if (grid[r][c] === 1) fresh++;
    }
  }

  if (fresh === 0) return 0;

  const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]];
  let minutes = 0;

  while (queue.length > 0) {
    const size = queue.length;
    let rotted = false;

    for (let i = 0; i < size; i++) {
      const [r, c] = queue.shift();

      for (const [dr, dc] of dirs) {
        const nr = r + dr, nc = c + dc;
        if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] === 1) {
          grid[nr][nc] = 2;
          fresh--;
          rotted = true;
          queue.push([nr, nc]);
        }
      }
    }

    if (rotted) minutes++;
  }

  return fresh === 0 ? minutes : -1;
}

// ────────────────────────────────────────────────────────────
//  21f. SURROUNDED REGIONS — LC #130
// ────────────────────────────────────────────────────────────

/**
 * Capture all 'O' regions NOT connected to the border.
 * Trick: DFS from BORDER 'O's → mark them safe.
 * Then flip all remaining 'O' to 'X'.
 */
function solve(board) {
  if (board.length === 0) return;
  const rows = board.length, cols = board[0].length;

  function dfs(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols || board[r][c] !== 'O') return;
    board[r][c] = 'S'; // Safe — connected to border
    dfs(r + 1, c);
    dfs(r - 1, c);
    dfs(r, c + 1);
    dfs(r, c - 1);
  }

  // Mark border-connected O's as safe
  for (let r = 0; r < rows; r++) {
    dfs(r, 0);
    dfs(r, cols - 1);
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c);
    dfs(rows - 1, c);
  }

  // Flip: remaining O → X, S → O
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (board[r][c] === 'O') board[r][c] = 'X';
      if (board[r][c] === 'S') board[r][c] = 'O';
    }
  }
}

// ────────────────────────────────────────────────────────────
//  21g. PACIFIC ATLANTIC WATER FLOW — LC #417
// ────────────────────────────────────────────────────────────

/**
 * Water flows from cells to 4-directional neighbors with height <= current.
 * Pacific = top/left border, Atlantic = bottom/right border.
 * Find cells that can reach BOTH oceans.
 *
 * Reverse thinking: DFS from each ocean's border UPHILL.
 * Cells reached by BOTH DFS passes = answer.
 */
function pacificAtlantic(heights) {
  if (!heights || heights.length === 0) return [];
  const rows = heights.length, cols = heights[0].length;
  const pacific = Array.from({ length: rows }, () => new Array(cols).fill(false));
  const atlantic = Array.from({ length: rows }, () => new Array(cols).fill(false));

  function dfs(r, c, ocean, prevHeight) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    if (ocean[r][c] || heights[r][c] < prevHeight) return;

    ocean[r][c] = true;
    const h = heights[r][c];
    dfs(r + 1, c, ocean, h);
    dfs(r - 1, c, ocean, h);
    dfs(r, c + 1, ocean, h);
    dfs(r, c - 1, ocean, h);
  }

  for (let r = 0; r < rows; r++) {
    dfs(r, 0, pacific, -Infinity);        // Left border → Pacific
    dfs(r, cols - 1, atlantic, -Infinity); // Right border → Atlantic
  }
  for (let c = 0; c < cols; c++) {
    dfs(0, c, pacific, -Infinity);         // Top border → Pacific
    dfs(rows - 1, c, atlantic, -Infinity); // Bottom border → Atlantic
  }

  const result = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (pacific[r][c] && atlantic[r][c]) result.push([r, c]);
    }
  }
  return result;
}

// ────────────────────────────────────────────────────────────
//  21h. NUMBER OF PROVINCES — LC #547 (Adjacency Matrix DFS)
// ────────────────────────────────────────────────────────────

/**
 * Given adjacency matrix isConnected[i][j], count connected components.
 * Standard DFS: for each unvisited node, DFS all its connections.
 */
function findCircleNum(isConnected) {
  const n = isConnected.length;
  const visited = new Array(n).fill(false);
  let provinces = 0;

  function dfs(node) {
    visited[node] = true;
    for (let neighbor = 0; neighbor < n; neighbor++) {
      if (isConnected[node][neighbor] === 1 && !visited[neighbor]) {
        dfs(neighbor);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      provinces++;
      dfs(i);
    }
  }

  return provinces;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== GRAPH BFS / DFS ===\n");

console.log("21a. Number of Islands:", numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
])); // 3

console.log("\n21b. Flood Fill:", JSON.stringify(floodFill(
  [[1,1,1],[1,1,0],[1,0,1]], 1, 1, 2
))); // [[2,2,2],[2,2,0],[2,0,1]]

// 21c. Clone Graph (structural test)
const n1 = new GraphNode(1), n2 = new GraphNode(2),
      n3 = new GraphNode(3), n4 = new GraphNode(4);
n1.neighbors = [n2, n4]; n2.neighbors = [n1, n3];
n3.neighbors = [n2, n4]; n4.neighbors = [n1, n3];
const cloned = cloneGraph(n1);
console.log("\n21c. Clone Graph: node1.val =", cloned.val,
  "neighbors =", cloned.neighbors.map(n => n.val),
  "is deep copy:", cloned !== n1); // 1, [2,4], true

console.log("\n21d. Word Ladder:", ladderLength("hit", "cog",
  ["hot","dot","dog","lot","log","cog"])); // 5

console.log("\n21e. Rotting Oranges:", orangesRotting([[2,1,1],[1,1,0],[0,1,1]])); // 4

const board = [
  ['X','X','X','X'],['X','O','O','X'],
  ['X','X','O','X'],['X','O','X','X']
];
solve(board);
console.log("\n21f. Surrounded Regions:", JSON.stringify(board));
// [["X","X","X","X"],["X","X","X","X"],["X","X","X","X"],["X","O","X","X"]]

console.log("\n21g. Pacific Atlantic:", pacificAtlantic([
  [1,2,2,3,5],[3,2,3,4,4],[2,4,5,3,1],[6,7,1,4,5],[5,1,1,2,4]
]).length, "cells"); // 7 cells

console.log("\n21h. Provinces:", findCircleNum([[1,1,0],[1,1,0],[0,0,1]])); // 2

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Number of Islands                       | Medium     | 200   |
 *  | Flood Fill                              | Easy       | 733   |
 *  | Clone Graph                             | Medium     | 133   |
 *  | Word Ladder                             | Hard       | 127   |
 *  | Rotting Oranges                         | Medium     | 994   |
 *  | Surrounded Regions                      | Medium     | 130   |
 *  | Pacific Atlantic Water Flow             | Medium     | 417   |
 *  | Number of Provinces                     | Medium     | 547   |
 *  | Course Schedule (DFS approach)          | Medium     | 207   |
 *  | Is Graph Bipartite?                     | Medium     | 785   |
 *  | Walls and Gates                         | Medium     | 286   |
 *  | Shortest Bridge                         | Medium     | 934   |
 *  | 01 Matrix                               | Medium     | 542   |
 *  | Keys and Rooms                          | Medium     | 841   |
 *  | All Paths From Source to Target         | Medium     | 797   |
 *
 *  BFS vs DFS DECISION GUIDE:
 *  ──────────────────────────
 *  Use BFS when:
 *    • Shortest path in UNWEIGHTED graph.
 *    • Level-order / "minimum steps" / "minimum moves."
 *    • Multi-source problems (push all sources first).
 *
 *  Use DFS when:
 *    • "Find ALL paths" / "explore all possibilities."
 *    • Connected components.
 *    • Cycle detection.
 *    • Topological sort.
 *    • Need to go as deep as possible (backtracking).
 *
 *  Grid as Graph:
 *    • Each cell (r,c) is a node.
 *    • 4 neighbors: (r±1,c), (r,c±1).
 *    • "Visited" → mark grid in-place or use boolean[][].
 */
