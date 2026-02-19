/**
 * ============================================================
 *  PATTERN 8: TREE DFS (Depth-First Search)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  DFS explores as DEEP as possible before backtracking.
 *  Uses RECURSION (call stack) or an explicit STACK.
 *
 *  Three traversal orders:
 *    • PRE-ORDER:  Node → Left → Right  (process node FIRST)
 *    • IN-ORDER:   Left → Node → Right  (sorted order for BST!)
 *    • POST-ORDER: Left → Right → Node  (process children FIRST)
 *
 *  Two information-flow styles:
 *    • TOP-DOWN: pass info DOWN via parameters (path sum, depth).
 *    • BOTTOM-UP: return info UP from children (height, count).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Path sum", "all root-to-leaf paths."
 *    ✅ "Maximum/minimum depth."
 *    ✅ "Validate BST" (in-order gives sorted sequence).
 *    ✅ "Lowest common ancestor."
 *    ✅ "Diameter", "balanced tree check."
 *    ✅ "Serialize/deserialize", "construct from traversals."
 *    ✅ Need to explore ALL paths or make per-node decisions.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Start with base cases: null node, leaf node.
 *  2. "All paths" → backtracking: push to path, recurse, pop.
 *  3. "Max something" → return max from left/right subtrees.
 *  4. BST problems → in-order traversal gives sorted order.
 *  5. Use a CLOSURE variable (outside recursion) for global state
 *     like diameter or max path sum.
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n) — visit every node.
 *  Space: O(h) — recursion stack, where h = tree height.
 *         O(log n) balanced, O(n) skewed.
 *
 * ============================================================
 */

class TreeNode {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) { node.left = new TreeNode(arr[i]); queue.push(node.left); } i++;
    if (i < arr.length && arr[i] !== null) { node.right = new TreeNode(arr[i]); queue.push(node.right); } i++;
  }
  return root;
}

// ────────────────────────────────────────────────────────────
//  8a. THREE TRAVERSAL ORDERS
// ────────────────────────────────────────────────────────────

function preOrder(root, result = []) {
  if (!root) return result;
  result.push(root.val);        // Node
  preOrder(root.left, result);  // Left
  preOrder(root.right, result); // Right
  return result;
}

function inOrder(root, result = []) {
  if (!root) return result;
  inOrder(root.left, result);   // Left
  result.push(root.val);        // Node ← sorted for BST!
  inOrder(root.right, result);  // Right
  return result;
}

function postOrder(root, result = []) {
  if (!root) return result;
  postOrder(root.left, result);  // Left
  postOrder(root.right, result); // Right
  result.push(root.val);         // Node
  return result;
}

// ────────────────────────────────────────────────────────────
//  8b. MAXIMUM DEPTH — LC #104
// ────────────────────────────────────────────────────────────

/**
 * Bottom-up: height = 1 + max(left height, right height)
 */
function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}

// ────────────────────────────────────────────────────────────
//  8c. PATH SUM — LC #112
// ────────────────────────────────────────────────────────────

/**
 * Does any root-to-leaf path sum equal target?
 *
 * Top-down: subtract node value from target as we go down.
 * At leaf: check if remaining equals node value.
 */
function hasPathSum(root, targetSum) {
  if (!root) return false;

  // Leaf node: does remaining sum match?
  if (!root.left && !root.right) {
    return root.val === targetSum;
  }

  // Recurse with reduced target
  return (
    hasPathSum(root.left, targetSum - root.val) ||
    hasPathSum(root.right, targetSum - root.val)
  );
}

// ────────────────────────────────────────────────────────────
//  8d. ALL ROOT-TO-LEAF PATHS WITH TARGET SUM — LC #113
// ────────────────────────────────────────────────────────────

/**
 * Find ALL root-to-leaf paths where sum equals target.
 * Uses BACKTRACKING: add to path, recurse, remove from path.
 */
function pathSum(root, targetSum) {
  const result = [];

  function dfs(node, remaining, path) {
    if (!node) return;

    path.push(node.val);

    // Leaf with correct sum? Add a copy of the path.
    if (!node.left && !node.right && remaining === node.val) {
      result.push([...path]);
    }

    // Continue exploring
    dfs(node.left, remaining - node.val, path);
    dfs(node.right, remaining - node.val, path);

    path.pop(); // BACKTRACK: undo the choice
  }

  dfs(root, targetSum, []);
  return result;
}

// ────────────────────────────────────────────────────────────
//  8e. VALIDATE BST — LC #98
// ────────────────────────────────────────────────────────────

/**
 * Every node must satisfy: min < node.val < max
 *
 * Pass the valid range DOWN as we recurse.
 * Left subtree: max becomes parent's value.
 * Right subtree: min becomes parent's value.
 */
function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;

  if (root.val <= min || root.val >= max) return false;

  return (
    isValidBST(root.left, min, root.val) &&   // Left: must be < node
    isValidBST(root.right, root.val, max)      // Right: must be > node
  );
}

// ────────────────────────────────────────────────────────────
//  8f. LOWEST COMMON ANCESTOR — LC #236
// ────────────────────────────────────────────────────────────

/**
 * LCA = deepest node that has both p and q as descendants.
 *
 * Logic:
 *   If current node IS p or q → return it.
 *   Recurse left and right.
 *   If BOTH sides return non-null → current node is the LCA.
 *   If only one side returns → LCA is on that side.
 */
function lowestCommonAncestor(root, p, q) {
  if (!root || root === p || root === q) return root;

  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);

  if (left && right) return root;  // Found on both sides → LCA
  return left || right;            // Found on one side only
}

// ────────────────────────────────────────────────────────────
//  8g. DIAMETER OF BINARY TREE — LC #543
// ────────────────────────────────────────────────────────────

/**
 * Diameter = longest path between ANY two nodes (in edges).
 * At each node, diameter through it = leftHeight + rightHeight.
 * Track the global max during the height calculation.
 */
function diameterOfBinaryTree(root) {
  let diameter = 0;

  function height(node) {
    if (!node) return 0;

    const leftH = height(node.left);
    const rightH = height(node.right);

    // Path through this node
    diameter = Math.max(diameter, leftH + rightH);

    return 1 + Math.max(leftH, rightH); // Return height
  }

  height(root);
  return diameter;
}

// ────────────────────────────────────────────────────────────
//  8h. INVERT BINARY TREE — LC #226
// ────────────────────────────────────────────────────────────

function invertTree(root) {
  if (!root) return null;

  // Swap left and right children
  [root.left, root.right] = [root.right, root.left];

  // Recurse on both subtrees
  invertTree(root.left);
  invertTree(root.right);

  return root;
}

// ────────────────────────────────────────────────────────────
//  8i. MAXIMUM PATH SUM — LC #124 (HARD)
// ────────────────────────────────────────────────────────────

/**
 * Find max sum path in binary tree. Path can start/end at ANY node.
 *
 * At each node, we can either:
 *   - Include it in a path with left subtree
 *   - Include it in a path with right subtree
 *   - Start a NEW path through it (left + node + right)
 *   - Just the node itself
 *
 * Return to parent: node + max(left, right, 0) — can only go ONE direction up.
 * Update global max: node + max(left, 0) + max(right, 0) — path THROUGH this node.
 */
function maxPathSum(root) {
  let maxSum = -Infinity;

  function dfs(node) {
    if (!node) return 0;

    // Max gain from each subtree (ignore negative paths)
    const leftGain = Math.max(dfs(node.left), 0);
    const rightGain = Math.max(dfs(node.right), 0);

    // Path through this node (potential global max)
    const pathThroughNode = node.val + leftGain + rightGain;
    maxSum = Math.max(maxSum, pathThroughNode);

    // Return max gain going ONE direction (for parent to use)
    return node.val + Math.max(leftGain, rightGain);
  }

  dfs(root);
  return maxSum;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

//        5
//       / \
//      4    8
//     /    / \
//    11   13  4
//   /  \     / \
//  7    2   5   1

const tree = buildTree([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, 5, 1]);

console.log("=== TREE DFS ===\n");

console.log("8a. Pre-order:", preOrder(buildTree([1, 2, 3, 4, 5])));
console.log("    In-order:", inOrder(buildTree([4, 2, 6, 1, 3, 5, 7]))); // BST → sorted
console.log("    Post-order:", postOrder(buildTree([1, 2, 3, 4, 5])));

console.log("\n8b. Max Depth:", maxDepth(tree)); // 4

console.log("\n8c. Has Path Sum (22):", hasPathSum(tree, 22)); // true (5→4→11→2)

console.log("\n8d. All Path Sums (22):", JSON.stringify(pathSum(tree, 22)));
// [[5,4,11,2]]

const bst = buildTree([5, 3, 7, 1, 4, 6, 8]);
console.log("\n8e. Is Valid BST:", isValidBST(bst)); // true

console.log("\n8g. Diameter:", diameterOfBinaryTree(buildTree([1, 2, 3, 4, 5]))); // 3

console.log("\n8i. Max Path Sum:", maxPathSum(buildTree([-10, 9, 20, null, null, 15, 7]))); // 42

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                           | Difficulty | LC #  |
 *  |-----------------------------------|------------|-------|
 *  | Maximum Depth of Binary Tree      | Easy       | 104   |
 *  | Invert Binary Tree                | Easy       | 226   |
 *  | Symmetric Tree                    | Easy       | 101   |
 *  | Path Sum                          | Easy       | 112   |
 *  | Path Sum II                       | Medium     | 113   |
 *  | Validate BST                      | Medium     | 98    |
 *  | Lowest Common Ancestor            | Medium     | 236   |
 *  | Diameter of Binary Tree           | Easy       | 543   |
 *  | Balanced Binary Tree              | Easy       | 110   |
 *  | Same Tree                         | Easy       | 100   |
 *  | Subtree of Another Tree           | Easy       | 572   |
 *  | Binary Tree Maximum Path Sum      | Hard       | 124   |
 *  | Serialize and Deserialize BT      | Hard       | 297   |
 *  | Count Good Nodes in Binary Tree   | Medium     | 1448  |
 *  | Kth Smallest Element in BST       | Medium     | 230   |
 */
