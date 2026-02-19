// ============================================================
// 📘 CONCEPT 11: BACKTRACKING
// ============================================================
// Backtracking is a systematic way of exploring ALL possible
// solutions by making choices, and UNDOING them (backtracking)
// when a choice leads to a dead end.
// ============================================================

// ============================================================
// 🔹 WHAT IS BACKTRACKING?
// ============================================================
// Think of it as: "Try something. If it doesn't work, undo it
//                  and try the next option."
//
// It's like navigating a MAZE:
// - At each fork, pick a direction
// - If it's a dead end, go BACK and try another direction
// - Keep going until you find the exit (or explore all paths)
//
// Backtracking = Recursion + UNDO (take back the choice)
//
// WHEN TO USE:
// - "Find ALL possible..." (combinations, permutations, subsets)
// - "Can you find a valid..." (Sudoku, N-Queens, word search)
// - Constraint satisfaction problems
// - When n is small (n ≤ 20 approximately)

// ============================================================
// 🔹 BACKTRACKING TEMPLATE ⭐⭐⭐
// ============================================================
/*
function backtrack(state, choices, result) {
  // BASE CASE: Found a valid solution?
  if (isComplete(state)) {
    result.push(copy(state));
    return;
  }

  // EXPLORE each choice
  for (const choice of choices) {
    // PRUNE: Skip invalid choices early
    if (!isValid(choice, state)) continue;

    // MAKE the choice
    state.add(choice);

    // RECURSE with the choice made
    backtrack(state, remainingChoices, result);

    // UNDO the choice (BACKTRACK!)
    state.remove(choice);
  }
}
*/

// ============================================================
// 🔹 EXAMPLE 1: SUBSETS (Power Set)
// ============================================================
// Generate all subsets of [1, 2, 3]
// Output: [[], [1], [1,2], [1,2,3], [1,3], [2], [2,3], [3]]
function subsets(nums) {
  const result = [];

  function backtrack(start, current) {
    result.push([...current]); // Add copy of current subset

    for (let i = start; i < nums.length; i++) {
      current.push(nums[i]);      // ✅ CHOOSE
      backtrack(i + 1, current);   // ✅ EXPLORE
      current.pop();               // ✅ UN-CHOOSE (backtrack!)
    }
  }

  backtrack(0, []);
  return result;
}
// Time: O(2^n * n) — 2^n subsets, each takes O(n) to copy
// Space: O(n) — recursion depth

// ============================================================
// 🔹 EXAMPLE 2: PERMUTATIONS
// ============================================================
// Generate all orderings of [1, 2, 3]
// Output: [[1,2,3], [1,3,2], [2,1,3], [2,3,1], [3,1,2], [3,2,1]]
function permutations(nums) {
  const result = [];

  function backtrack(current) {
    if (current.length === nums.length) {
      result.push([...current]);
      return;
    }

    for (let i = 0; i < nums.length; i++) {
      if (current.includes(nums[i])) continue; // Skip used elements
      current.push(nums[i]);      // CHOOSE
      backtrack(current);          // EXPLORE
      current.pop();               // UN-CHOOSE
    }
  }

  backtrack([]);
  return result;
}
// Time: O(n! * n) — n! permutations, each takes O(n) to copy

// Optimized with swap (avoids includes check):
function permutationsSwap(nums) {
  const result = [];

  function backtrack(start) {
    if (start === nums.length) {
      result.push([...nums]);
      return;
    }
    for (let i = start; i < nums.length; i++) {
      [nums[start], nums[i]] = [nums[i], nums[start]]; // SWAP (choose)
      backtrack(start + 1);                               // EXPLORE
      [nums[start], nums[i]] = [nums[i], nums[start]]; // SWAP BACK (un-choose)
    }
  }

  backtrack(0);
  return result;
}

// ============================================================
// 🔹 EXAMPLE 3: COMBINATIONS
// ============================================================
// Choose k elements from [1..n]
// combine(4, 2) → [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
function combine(n, k) {
  const result = [];

  function backtrack(start, current) {
    if (current.length === k) {
      result.push([...current]);
      return;
    }

    // Pruning: need (k - current.length) more elements
    for (let i = start; i <= n - (k - current.length) + 1; i++) {
      current.push(i);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(1, []);
  return result;
}

// ============================================================
// 🔹 EXAMPLE 4: COMBINATION SUM
// ============================================================
// Find all combinations that sum to target (can reuse elements)
function combinationSum(candidates, target) {
  const result = [];

  function backtrack(start, current, remaining) {
    if (remaining === 0) {
      result.push([...current]);
      return;
    }
    if (remaining < 0) return; // PRUNE!

    for (let i = start; i < candidates.length; i++) {
      current.push(candidates[i]);
      backtrack(i, current, remaining - candidates[i]); // i, not i+1 (reuse!)
      current.pop();
    }
  }

  backtrack(0, [], target);
  return result;
}
// candidates=[2,3,6,7], target=7 → [[2,2,3],[7]]

// ============================================================
// 🔹 EXAMPLE 5: N-QUEENS ♛
// ============================================================
// Place n queens on an n×n chessboard so no two attack each other
function solveNQueens(n) {
  const result = [];
  const board = Array.from({ length: n }, () => ".".repeat(n));

  const cols = new Set();
  const diag1 = new Set(); // row - col
  const diag2 = new Set(); // row + col

  function backtrack(row) {
    if (row === n) {
      result.push([...board]);
      return;
    }

    for (let col = 0; col < n; col++) {
      if (cols.has(col) || diag1.has(row - col) || diag2.has(row + col)) {
        continue; // PRUNE: position is attacked
      }

      // PLACE queen
      cols.add(col);
      diag1.add(row - col);
      diag2.add(row + col);
      board[row] = ".".repeat(col) + "Q" + ".".repeat(n - col - 1);

      backtrack(row + 1); // EXPLORE next row

      // REMOVE queen (backtrack)
      cols.delete(col);
      diag1.delete(row - col);
      diag2.delete(row + col);
      board[row] = ".".repeat(n);
    }
  }

  backtrack(0);
  return result;
}

// ============================================================
// 🔹 EXAMPLE 6: WORD SEARCH
// ============================================================
// Find if a word exists in a grid (moving up/down/left/right)
function exist(board, word) {
  const rows = board.length, cols = board[0].length;

  function backtrack(r, c, index) {
    if (index === word.length) return true; // Found all characters!
    if (r < 0 || r >= rows || c < 0 || c >= cols) return false;
    if (board[r][c] !== word[index]) return false;

    const temp = board[r][c];
    board[r][c] = "#"; // MARK as visited

    const found =
      backtrack(r + 1, c, index + 1) ||
      backtrack(r - 1, c, index + 1) ||
      backtrack(r, c + 1, index + 1) ||
      backtrack(r, c - 1, index + 1);

    board[r][c] = temp; // UNMARK (backtrack!)
    return found;
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (backtrack(r, c, 0)) return true;
    }
  }
  return false;
}

// ============================================================
// 🔹 EXAMPLE 7: SUDOKU SOLVER
// ============================================================
function solveSudoku(board) {
  function isValid(board, row, col, num) {
    for (let i = 0; i < 9; i++) {
      if (board[row][i] === num) return false; // Row check
      if (board[i][col] === num) return false; // Column check
      // 3x3 box check
      const boxRow = 3 * Math.floor(row / 3) + Math.floor(i / 3);
      const boxCol = 3 * Math.floor(col / 3) + (i % 3);
      if (board[boxRow][boxCol] === num) return false;
    }
    return true;
  }

  function solve() {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (board[r][c] === ".") {
          for (let num = 1; num <= 9; num++) {
            const char = String(num);
            if (isValid(board, r, c, char)) {
              board[r][c] = char;        // PLACE
              if (solve()) return true;   // EXPLORE
              board[r][c] = ".";         // UNDO (backtrack)
            }
          }
          return false; // No valid number → dead end
        }
      }
    }
    return true; // All cells filled → solved!
  }

  solve();
}

// ============================================================
// 🔹 HANDLING DUPLICATES
// ============================================================
// For subsets/permutations with duplicate elements:
// 1. Sort the input
// 2. Skip duplicates at the same decision level

function subsetsWithDup(nums) {
  nums.sort((a, b) => a - b); // SORT first!
  const result = [];

  function backtrack(start, current) {
    result.push([...current]);
    for (let i = start; i < nums.length; i++) {
      if (i > start && nums[i] === nums[i - 1]) continue; // Skip duplicates!
      current.push(nums[i]);
      backtrack(i + 1, current);
      current.pop();
    }
  }

  backtrack(0, []);
  return result;
}

// ============================================================
// 🔹 BACKTRACKING vs OTHER APPROACHES
// ============================================================
/*
┌───────────────────────────────────────────────────────────┐
│ Approach          │ When to Use                          │
├───────────────────────────────────────────────────────────┤
│ Backtracking      │ Find ALL solutions, constraint based │
│ Dynamic Prog.     │ Find OPTIMAL (min/max/count)         │
│ Greedy            │ Local optimal = Global optimal       │
│ BFS/DFS           │ Graph/tree traversal                 │
└───────────────────────────────────────────────────────────┘

Backtracking = Brute force + PRUNING
If you can PRUNE early, backtracking is much faster than brute force.
*/

// ============================================================
// 🔹 COMPLEXITY OF BACKTRACKING
// ============================================================
/*
Subsets:      O(2^n)    — Each element: include or exclude
Permutations: O(n!)     — n choices, then n-1, then n-2...
Combinations: O(C(n,k)) — n choose k
N-Queens:     O(n!)     — But pruning makes it much faster
Sudoku:       O(9^m)    — m = empty cells (with pruning, very fast)
*/

console.log("✅ Backtracking — Explore all paths, undo bad choices!");
