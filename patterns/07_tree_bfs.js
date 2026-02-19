/**
 * ============================================================
 *  PATTERN 7: TREE BFS (Level Order Traversal)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  BFS traverses a tree LEVEL BY LEVEL using a QUEUE.
 *  Process all nodes at current depth before moving deeper.
 *
 *  Algorithm:
 *    1. Push root into queue.
 *    2. While queue is not empty:
 *       a. Record levelSize = queue.length
 *       b. Process all levelSize nodes (pop from front)
 *       c. For each node, add its children to queue
 *    3. Move to next level.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Level order traversal."
 *    ✅ "Average / sum / max of each level."
 *    ✅ "Zigzag traversal."
 *    ✅ "Right side view" of tree.
 *    ✅ "Minimum depth" (BFS finds it first!).
 *    ✅ "Connect level order siblings."
 *    ✅ Anything requiring LEVEL-BY-LEVEL processing.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Use a QUEUE: push to back, shift from front.
 *  2. Track level size: `const size = queue.length` at start of each level.
 *  3. Zigzag: alternate pushing results to front/back.
 *  4. Right side view: last node of each level.
 *  5. Min depth: first LEAF node found = answer (BFS advantage!).
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n) — visit every node once.
 *  Space: O(n) — queue can hold up to n/2 nodes (last level).
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

// Helper: build tree from array (level order, null = no node)
function buildTree(arr) {
  if (!arr.length || arr[0] === null) return null;
  const root = new TreeNode(arr[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length && arr[i] !== null) {
      node.left = new TreeNode(arr[i]);
      queue.push(node.left);
    }
    i++;
    if (i < arr.length && arr[i] !== null) {
      node.right = new TreeNode(arr[i]);
      queue.push(node.right);
    }
    i++;
  }
  return root;
}

// ────────────────────────────────────────────────────────────
//  7a. LEVEL ORDER TRAVERSAL — LC #102
// ────────────────────────────────────────────────────────────

/**
 * Return values grouped by level: [[3],[9,20],[15,7]]
 *
 *        3
 *       / \
 *      9   20
 *         / \
 *        15   7
 */
function levelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length; // How many nodes at this level
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();     // Process front of queue
      currentLevel.push(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  7b. REVERSE LEVEL ORDER — LC #107
// ────────────────────────────────────────────────────────────

function levelOrderBottom(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.unshift(currentLevel); // Add to FRONT instead of back
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  7c. ZIGZAG LEVEL ORDER — LC #103
// ────────────────────────────────────────────────────────────

/**
 * Alternating left-to-right and right-to-left.
 * Level 0: left→right, Level 1: right→left, Level 2: left→right...
 */
function zigzagLevelOrder(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];
  let leftToRight = true;

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = new Array(levelSize);

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // Place at correct index based on direction
      const index = leftToRight ? i : levelSize - 1 - i;
      currentLevel[index] = node.val;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(currentLevel);
    leftToRight = !leftToRight;
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  7d. AVERAGE OF LEVELS — LC #637
// ────────────────────────────────────────────────────────────

function averageOfLevels(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    let levelSum = 0;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      levelSum += node.val;
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    result.push(levelSum / levelSize);
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  7e. MINIMUM DEPTH — LC #111
// ────────────────────────────────────────────────────────────

/**
 * BFS finds minimum depth efficiently — stops at FIRST LEAF.
 * (DFS would need to explore entire tree.)
 */
function minDepth(root) {
  if (!root) return 0;

  const queue = [root];
  let depth = 1;

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      // First leaf found = minimum depth!
      if (!node.left && !node.right) return depth;

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    depth++;
  }

  return depth;
}

// ────────────────────────────────────────────────────────────
//  7f. RIGHT SIDE VIEW — LC #199
// ────────────────────────────────────────────────────────────

/**
 * Return the rightmost node of each level.
 * Strategy: BFS, but only add the LAST node of each level.
 */
function rightSideView(root) {
  if (!root) return [];

  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();

      if (i === levelSize - 1) {
        result.push(node.val); // Last node of this level
      }

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

//        3
//       / \
//      9   20
//         / \
//        15   7
const tree = buildTree([3, 9, 20, null, null, 15, 7]);

console.log("=== TREE BFS (LEVEL ORDER) ===\n");

console.log("7a. Level Order:", JSON.stringify(levelOrder(tree)));
// [[3],[9,20],[15,7]]

console.log("7b. Reverse Level Order:", JSON.stringify(levelOrderBottom(tree)));
// [[15,7],[9,20],[3]]

console.log("7c. Zigzag Level Order:", JSON.stringify(zigzagLevelOrder(tree)));
// [[3],[20,9],[15,7]]

console.log("7d. Average of Levels:", averageOfLevels(tree));
// [3, 14.5, 11]

console.log("7e. Minimum Depth:", minDepth(tree));
// 2 (path: 3→9)

console.log("7f. Right Side View:", rightSideView(tree));
// [3, 20, 7]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                | Difficulty | LC # |
 *  |----------------------------------------|------------|------|
 *  | Binary Tree Level Order Traversal      | Medium     | 102  |
 *  | Binary Tree Level Order II (Bottom-up) | Medium     | 107  |
 *  | Binary Tree Zigzag Level Order         | Medium     | 103  |
 *  | Average of Levels in Binary Tree       | Easy       | 637  |
 *  | Minimum Depth of Binary Tree           | Easy       | 111  |
 *  | Binary Tree Right Side View            | Medium     | 199  |
 *  | Populating Next Right Pointers         | Medium     | 116  |
 *  | Populating Next Right Pointers II      | Medium     | 117  |
 *  | Maximum Width of Binary Tree           | Medium     | 662  |
 */
