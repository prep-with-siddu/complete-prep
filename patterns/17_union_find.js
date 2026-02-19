/**
 * ============================================================
 *  PATTERN 17: UNION-FIND (Disjoint Set Union)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Data structure for tracking elements partitioned into
 *  disjoint (non-overlapping) sets.
 *
 *  Operations:
 *    • find(x)    — Find the representative (root) of x's set.
 *    • union(x,y) — Merge the sets containing x and y.
 *
 *  Optimizations:
 *    1. PATH COMPRESSION: In find(), make every node point to root directly.
 *    2. UNION BY RANK: Attach smaller tree under root of larger tree.
 *
 *  With both: Nearly O(1) amortized per operation (inverse Ackermann).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Number of connected components."
 *    ✅ "Are two nodes connected?"
 *    ✅ "Redundant connection" (find the edge that creates a cycle).
 *    ✅ "Number of islands" (alternative to DFS/BFS).
 *    ✅ Graph connectivity problems.
 *    ✅ "Accounts merge", "friend circles", "similar sentences".
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Initialize parent[i] = i (each element is its own set).
 *  2. rank[i] = 0 initially.
 *  3. union returns false if already connected (used for cycle detection).
 *  4. Count components by counting nodes where parent[i] === i.
 *  5. For grid problems, map (row, col) → unique integer id.
 *
 * ============================================================
 */

// ── Union-Find class ──────────────────────────────────────

class UnionFind {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
    this.components = n;
  }

  /** Find with PATH COMPRESSION */
  find(x) {
    if (this.parent[x] !== x) {
      this.parent[x] = this.find(this.parent[x]); // Compress path
    }
    return this.parent[x];
  }

  /** Union by RANK. Returns false if already in same set. */
  union(x, y) {
    const rootX = this.find(x);
    const rootY = this.find(y);

    if (rootX === rootY) return false; // Already connected

    // Attach smaller rank under higher rank
    if (this.rank[rootX] < this.rank[rootY]) {
      this.parent[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.parent[rootY] = rootX;
    } else {
      this.parent[rootY] = rootX;
      this.rank[rootX]++;
    }

    this.components--;
    return true;
  }

  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// ────────────────────────────────────────────────────────────
//  17a. NUMBER OF CONNECTED COMPONENTS — LC #323
// ────────────────────────────────────────────────────────────

/**
 * Given n nodes and edges, find number of connected components.
 *
 * DRY RUN: n=5, edges=[[0,1],[1,2],[3,4]]
 *   UF: parent=[0,1,2,3,4], components=5
 *   union(0,1) → components=4
 *   union(1,2) → components=3
 *   union(3,4) → components=2
 *   Answer: 2 ✓
 */
function countComponents(n, edges) {
  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    uf.union(u, v);
  }

  return uf.components;
}

// ────────────────────────────────────────────────────────────
//  17b. REDUNDANT CONNECTION — LC #684
// ────────────────────────────────────────────────────────────

/**
 * Given a tree (n nodes, n-1 edges) + ONE extra edge = cycle.
 * Find the extra edge.
 * 
 * Process edges sequentially. If union returns false → both nodes
 * already in same set → THIS edge creates the cycle.
 */
function findRedundantConnection(edges) {
  const n = edges.length;
  const uf = new UnionFind(n + 1); // 1-indexed nodes

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return [u, v]; // Already connected!
  }

  return [];
}

// ────────────────────────────────────────────────────────────
//  17c. NUMBER OF ISLANDS — LC #200 (Union-Find approach)
// ────────────────────────────────────────────────────────────

/**
 * Alternative to DFS/BFS for "Number of Islands".
 * Map each cell (r, c) → r * cols + c.
 * Union adjacent land cells.
 */
function numIslands(grid) {
  if (grid.length === 0) return 0;
  const rows = grid.length, cols = grid[0].length;

  // Count land cells
  let landCount = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') landCount++;
    }
  }

  const uf = new UnionFind(rows * cols);
  uf.components = landCount; // Start with each land cell as a component

  const dirs = [[0, 1], [1, 0]]; // Only right and down to avoid double counting

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c] === '1') {
        for (const [dr, dc] of dirs) {
          const nr = r + dr, nc = c + dc;
          if (nr < rows && nc < cols && grid[nr][nc] === '1') {
            uf.union(r * cols + c, nr * cols + nc);
          }
        }
      }
    }
  }

  return uf.components;
}

// ────────────────────────────────────────────────────────────
//  17d. GRAPH VALID TREE — LC #261
// ────────────────────────────────────────────────────────────

/**
 * A valid tree: n nodes, n-1 edges, no cycles, all connected.
 * Use union-find: if any union returns false → cycle → NOT a tree.
 * Also check: edge count = n - 1.
 */
function validTree(n, edges) {
  if (edges.length !== n - 1) return false; // Must have exactly n-1 edges

  const uf = new UnionFind(n);

  for (const [u, v] of edges) {
    if (!uf.union(u, v)) return false; // Cycle detected
  }

  return true; // n-1 edges + no cycle → valid tree
}

// ────────────────────────────────────────────────────────────
//  17e. ACCOUNTS MERGE — LC #721
// ────────────────────────────────────────────────────────────

/**
 * Each account = [name, email1, email2, ...].
 * Merge accounts that share any email.
 * Union-Find on email indices.
 */
function accountsMerge(accounts) {
  const emailToId = new Map();   // email → first account index
  const emailToName = new Map(); // email → name
  const uf = new UnionFind(accounts.length);

  for (let i = 0; i < accounts.length; i++) {
    const name = accounts[i][0];
    for (let j = 1; j < accounts[i].length; j++) {
      const email = accounts[i][j];
      emailToName.set(email, name);

      if (emailToId.has(email)) {
        uf.union(i, emailToId.get(email)); // Same email → merge accounts
      } else {
        emailToId.set(email, i);
      }
    }
  }

  // Group emails by their root account
  const groups = new Map();
  for (const [email, id] of emailToId) {
    const root = uf.find(id);
    if (!groups.has(root)) groups.set(root, []);
    groups.get(root).push(email);
  }

  // Build result
  const result = [];
  for (const [root, emails] of groups) {
    emails.sort();
    result.push([emailToName.get(emails[0]), ...emails]);
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== UNION-FIND ===\n");

console.log("17a. Connected Components:", countComponents(5, [[0,1],[1,2],[3,4]])); // 2

console.log("\n17b. Redundant Connection:", findRedundantConnection([[1,2],[1,3],[2,3]])); // [2,3]

console.log("\n17c. Num Islands (UF):", numIslands([
  ['1','1','0','0','0'],
  ['1','1','0','0','0'],
  ['0','0','1','0','0'],
  ['0','0','0','1','1']
])); // 3

console.log("\n17d. Valid Tree:", validTree(5, [[0,1],[0,2],[0,3],[1,4]])); // true
console.log("     Invalid Tree:", validTree(5, [[0,1],[1,2],[2,3],[1,3],[1,4]])); // false

console.log("\n17e. Accounts Merge:", JSON.stringify(accountsMerge([
  ["John","johnsmith@mail.com","john_newyork@mail.com"],
  ["John","johnsmith@mail.com","john00@mail.com"],
  ["Mary","mary@mail.com"],
  ["John","johnnybravo@mail.com"]
]), null, 2));

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Number of Connected Components          | Medium     | 323   |
 *  | Redundant Connection                    | Medium     | 684   |
 *  | Number of Islands                       | Medium     | 200   |
 *  | Graph Valid Tree                        | Medium     | 261   |
 *  | Accounts Merge                          | Medium     | 721   |
 *  | Longest Consecutive Sequence            | Medium     | 128   |
 *  | Number of Provinces                     | Medium     | 547   |
 *  | Smallest String With Swaps              | Medium     | 1202  |
 *  | Most Stones Removed                     | Medium     | 947   |
 */
