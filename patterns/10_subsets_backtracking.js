/**
 * ============================================================
 *  PATTERN 10: SUBSETS / BACKTRACKING
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Backtracking builds solutions incrementally and ABANDONS
 *  (backtracks) paths that fail to satisfy constraints.
 *
 *  Template:
 *    function backtrack(start, currentState) {
 *      if (goalReached) { addToResult(currentState); return; }
 *      for (let i = start; i < choices.length; i++) {
 *        if (isInvalid(i)) continue;     // PRUNE
 *        currentState.push(choices[i]);   // CHOOSE
 *        backtrack(i + 1, currentState);  // EXPLORE
 *        currentState.pop();              // UN-CHOOSE (backtrack)
 *      }
 *    }
 *
 *  Core patterns:
 *    • SUBSETS:      For each element: include or skip it.
 *    • PERMUTATIONS: For each unused element: pick it next.
 *    • COMBINATIONS: Pick K from N, elements in order.
 *    • PARTITIONING: Split string into valid segments.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Generate ALL subsets / permutations / combinations."
 *    ✅ "Find ALL valid configurations."
 *    ✅ "N-Queens", "Sudoku solver."
 *    ✅ "Word search", "palindrome partitioning."
 *    ✅ The solution space is a TREE OF CHOICES.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. SUBSETS:      Use `start` index, move forward only.
 *  2. PERMUTATIONS: Check `used[]` array or swap technique.
 *  3. DUPLICATES:   Sort first → skip `if (i > start && nums[i] === nums[i-1])`.
 *  4. PRUNE EARLY:  Skip invalid choices BEFORE recursing (huge speedup).
 *  5. Always COPY the path before adding to result:  `result.push([...path])`.
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Subsets:      O(n × 2^n)  — 2^n subsets, each up to n long.
 *  Permutations: O(n × n!)   — n! permutations, each n long.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  10a. SUBSETS (Power Set) — LC #78
// ────────────────────────────────────────────────────────────

/**
 * Generate all subsets. No duplicates in input.
 *
 * Example: [1,2,3] → [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
 *
 * Decision tree:
 *           []
 *        /  |  \
 *      [1] [2] [3]
 *      / \   \
 *   [1,2][1,3][2,3]
 *     |
 *   [1,2,3]
 */
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]); // Add current subset (COPY!)

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);      // CHOOSE
      backtrack(i + 1, current);   // EXPLORE (i+1, not i → no reuse)
      current.pop();               // UN-CHOOSE
    }
  }

  backtrack(0, []);
  return result;
}

// ────────────────────────────────────────────────────────────
//  10b. SUBSETS WITH DUPLICATES — LC #90
// ────────────────────────────────────────────────────────────

/**
 * Input may contain duplicates. Return unique subsets.
 *
 * Key: Sort first → skip duplicate at same level:
 *   if (i > start && nums[i] === nums[i-1]) continue;
 */
function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b); // Sort to group duplicates!
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);

    for (let i = start; i < nums.length; i++) {
      // Skip duplicate at the SAME LEVEL (i > start, not i > 0)
      if (i > start && nums[i] === nums[i - 1]) continue;

      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// ────────────────────────────────────────────────────────────
//  10c. PERMUTATIONS — LC #46
// ────────────────────────────────────────────────────────────

/**
 * Generate all permutations. All numbers are unique.
 *
 * Example: [1,2,3] → [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 *
 * Unlike subsets, we consider ALL positions → no `start` index.
 * Instead track which elements are already used.
 */
function permute(nums) {
  const result = [];

  function backtrack(current, used) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue; // Skip already-used elements

      used[i] = true;
      current.push(nums[i]);
      backtrack(current, used);
      current.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

// ────────────────────────────────────────────────────────────
//  10d. PERMUTATIONS WITH DUPLICATES — LC #47
// ────────────────────────────────────────────────────────────

function permuteUnique(nums) {
  nums.sort((a, b) => a - b);
  const result = [];

  function backtrack(current, used) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      // Skip duplicate: same value as prev, and prev wasn't used (same level)
      if (i > 0 && nums[i] === nums[i - 1] && !used[i - 1]) continue;

      used[i] = true;
      current.push(nums[i]);
      backtrack(current, used);
      current.pop();
      used[i] = false;
    }
  }

  backtrack([], new Array(nums.length).fill(false));
  return result;
}

// ────────────────────────────────────────────────────────────
//  10e. COMBINATION SUM — LC #39
// ────────────────────────────────────────────────────────────

/**
 * Find all combinations that sum to target.
 * CAN REUSE the same number multiple times.
 *
 * Example: candidates = [2,3,6,7], target = 7
 *          → [[2,2,3], [7]]
 */
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, remaining, current) {
    if (remaining === 0) { result.push([...current]); return; }
    if (remaining < 0) return;

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, remaining - candidates[i], current); // i (NOT i+1) → can reuse
      current.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

// ────────────────────────────────────────────────────────────
//  10f. COMBINATION SUM II — LC #40
// ────────────────────────────────────────────────────────────

/**
 * Each number used at most ONCE. May contain duplicates.
 */
function combinationSum2(candidates, target) {
  candidates.sort((a, b) => a - b);
  const result = [];

  function backtrack(start, remaining, current) {
    if (remaining === 0) { result.push([...current]); return; }

    for (let i = start; i < candidates.length; i++) {
      if (candidates[i] > remaining) break; // Prune: too large
      if (i > start && candidates[i] === candidates[i - 1]) continue; // Skip dups

      current.push(candidates[i]);
      backtrack(i + 1, remaining - candidates[i], current); // i+1 → no reuse
      current.pop();
    }
  }

  backtrack(0, target, []);
  return result;
}

// ────────────────────────────────────────────────────────────
//  10g. GENERATE PARENTHESES — LC #22
// ────────────────────────────────────────────────────────────

/**
 * Generate all valid combinations of n pairs of parentheses.
 *
 * Example: n=3 → ["((()))","(()())","(())()","()(())","()()()"]
 *
 * Rules: At any point:
 *   - Can add '(' if open < n
 *   - Can add ')' if close < open
 */
function generateParenthesis(n) {
  const result = [];

  function backtrack(current, open, close) {
    if (current.length === 2 * n) {
      result.push(current);
      return;
    }

    if (open < n) {
      backtrack(current + '(', open + 1, close);
    }
    if (close < open) {
      backtrack(current + ')', open, close + 1);
    }
  }

  backtrack('', 0, 0);
  return result;
}

// ────────────────────────────────────────────────────────────
//  10h. WORD SEARCH — LC #79
// ────────────────────────────────────────────────────────────

/**
 * Can the word be constructed from adjacent cells (DFS + backtracking)?
 */
function exist(board, word) {
  const m = board.length, n = board[0].length;

  function dfs(i, j, idx) {
    if (idx === word.length) return true;              // Found all chars
    if (i < 0 || i >= m || j < 0 || j >= n) return false; // Out of bounds
    if (board[i][j] !== word[idx]) return false;       // Wrong char

    const temp = board[i][j];
    board[i][j] = '#'; // Mark visited

    const found =
      dfs(i + 1, j, idx + 1) ||
      dfs(i - 1, j, idx + 1) ||
      dfs(i, j + 1, idx + 1) ||
      dfs(i, j - 1, idx + 1);

    board[i][j] = temp; // BACKTRACK: restore
    return found;
  }

  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (dfs(i, j, 0)) return true;
    }
  }
  return false;
}

// ────────────────────────────────────────────────────────────
//  10i. N-QUEENS — LC #51 (HARD)
// ────────────────────────────────────────────────────────────

/**
 * Place N queens on N×N board so none attack each other.
 *
 * Constraints: No two queens on same row, column, or diagonal.
 * Track conflicts using Sets: cols, diag1 (row-col), diag2 (row+col).
 */
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => '.'.repeat(n));
  const cols = new Set(), diag1 = new Set(), diag2 = new Set();

  function backtrack(row) {
    if (row === n) { result.push([...board]); return; }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) continue;

      // Place queen
      cols.add(col); diag1.add(row - col); diag2.add(row + col);
      board[row] = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1);

      backtrack(row + 1);

      // Remove queen (backtrack)
      cols.delete(col); diag1.delete(row - col); diag2.delete(row + col);
      board[row] = board[row].substring(0, col) + '.' + board[row].substring(col + 1);
    }
  }

  backtrack(0);
  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== SUBSETS / BACKTRACKING ===\n");

console.log("10a. Subsets:", JSON.stringify(subsets([1, 2, 3])));

console.log("\n10b. Subsets with Dups:", JSON.stringify(subsetsWithDup([1, 2, 2])));

console.log("\n10c. Permutations:", JSON.stringify(permute([1, 2, 3])));

console.log("\n10d. Perms with Dups:", JSON.stringify(permuteUnique([1, 1, 2])));

console.log("\n10e. Combination Sum:", JSON.stringify(combinationSum([2, 3, 6, 7], 7)));

console.log("\n10f. Combination Sum 2:", JSON.stringify(combinationSum2([10, 1, 2, 7, 6, 1, 5], 8)));

console.log("\n10g. Generate Parentheses:", generateParenthesis(3));

console.log("\n10h. Word Search:");
const board = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']];
console.log("   'ABCCED' →", exist(board, 'ABCCED')); // true

console.log("\n10i. N-Queens (n=4): found", solveNQueens(4).length, "solutions");

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                        | Difficulty | LC # |
 *  |--------------------------------|------------|------|
 *  | Subsets                        | Medium     | 78   |
 *  | Subsets II                     | Medium     | 90   |
 *  | Permutations                   | Medium     | 46   |
 *  | Permutations II                | Medium     | 47   |
 *  | Combination Sum                | Medium     | 39   |
 *  | Combination Sum II             | Medium     | 40   |
 *  | Combinations (C(n,k))          | Medium     | 77   |
 *  | Letter Combinations of Phone   | Medium     | 17   |
 *  | Generate Parentheses           | Medium     | 22   |
 *  | Palindrome Partitioning        | Medium     | 131  |
 *  | Word Search                    | Medium     | 79   |
 *  | N-Queens                       | Hard       | 51   |
 *  | Sudoku Solver                  | Hard       | 37   |
 *  | Partition to K Equal Sum       | Medium     | 698  |
 */
