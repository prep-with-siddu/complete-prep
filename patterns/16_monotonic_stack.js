/**
 * ============================================================
 *  PATTERN 16: MONOTONIC STACK
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  A stack that maintains elements in strictly increasing or
 *  decreasing order. Used to find the NEXT GREATER / SMALLER
 *  element efficiently.
 *
 *  How it works:
 *    • Iterate through array.
 *    • Before pushing current element, POP all elements that
 *      violate the monotonic property.
 *    • Each element is pushed and popped AT MOST ONCE → O(n).
 *
 *  Variants:
 *    • Monotonic Decreasing Stack → Next Greater Element.
 *    • Monotonic Increasing Stack → Next Smaller Element.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Next greater element" / "Next smaller element."
 *    ✅ "Daily temperatures" (days until warmer).
 *    ✅ "Largest rectangle in histogram."
 *    ✅ "Stock span" / "Stock price."
 *    ✅ Problems involving looking left/right for bigger/smaller.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Stack stores INDICES (not values) — you can get values via arr[stack[top]].
 *  2. Pop when current element BREAKS the monotonic property.
 *  3. For "next greater": maintain DECREASING stack, pop when curr > top.
 *  4. For "next smaller": maintain INCREASING stack, pop when curr < top.
 *  5. For "previous greater/smaller": same idea but iterate left-to-right
 *     and the REMAINING stack entries are the answer.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  16a. NEXT GREATER ELEMENT I — LC #496
// ────────────────────────────────────────────────────────────

/**
 * For each element in nums1, find the next greater element in nums2.
 *
 * DRY RUN: nums2 = [1,3,4,2]
 *   i=0: push 0 (val 1). Stack: [0]
 *   i=1: 3 > nums2[0]=1 → pop 0, map[1]=3. Push 1. Stack: [1]
 *   i=2: 4 > nums2[1]=3 → pop 1, map[3]=4. Push 2. Stack: [2]
 *   i=3: 2 < nums2[2]=4 → push 3. Stack: [2,3]
 *   Remaining: map[4]=-1, map[2]=-1
 */
function nextGreaterElement(nums1, nums2) {
  const map = new Map();
  const stack = []; // Monotonic DECREASING stack (stores indices)

  for (let i = 0; i < nums2.length; i++) {
    while (stack.length > 0 && nums2[i] > nums2[stack[stack.length - 1]]) {
      const idx = stack.pop();
      map.set(nums2[idx], nums2[i]);
    }
    stack.push(i);
  }

  // Remaining in stack have no next greater
  while (stack.length > 0) {
    map.set(nums2[stack.pop()], -1);
  }

  return nums1.map(num => map.get(num));
}

// ────────────────────────────────────────────────────────────
//  16b. DAILY TEMPERATURES — LC #739
// ────────────────────────────────────────────────────────────

/**
 * For each day, how many days until a warmer temperature?
 * Monotonic DECREASING stack of indices.
 * When temp[i] > temp[stack.top] → pop and compute gap.
 */
function dailyTemperatures(temperatures) {
  const n = temperatures.length;
  const result = new Array(n).fill(0);
  const stack = []; // Stores indices

  for (let i = 0; i < n; i++) {
    while (stack.length > 0 && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const prevIdx = stack.pop();
      result[prevIdx] = i - prevIdx;
    }
    stack.push(i);
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  16c. LARGEST RECTANGLE IN HISTOGRAM — LC #84
// ────────────────────────────────────────────────────────────

/**
 * Find the largest rectangle that can be formed in the histogram.
 *
 * Monotonic INCREASING stack. When we find a shorter bar, pop and
 * calculate area with popped bar as the SMALLEST bar.
 *
 * Width = i - stack.top - 1 (distance between current and new top).
 *
 * DRY RUN: [2,1,5,6,2,3]
 *   i=0: push 0. Stack: [0]
 *   i=1: 1<2, pop 0. area=2*(1-(-1)-1)=2*1=2. Push 1. Stack: [1]
 *   i=2: push 2. Stack: [1,2]
 *   i=3: push 3. Stack: [1,2,3]
 *   i=4: 2<6, pop 3. area=6*(4-2-1)=6. pop 2. area=5*(4-1-1)=10. Push 4.
 *   i=5: push 5. Stack: [1,4,5]
 *   Cleanup: pop 5. area=3*(6-4-1)=3. pop 4. area=2*(6-1-1)=8. pop 1. area=1*6=6.
 *   Max area = 10 ✓
 */
function largestRectangleArea(heights) {
  const stack = []; // Monotonic INCREASING (indices)
  let maxArea = 0;

  for (let i = 0; i <= heights.length; i++) {
    const h = i === heights.length ? 0 : heights[i]; // Sentinel at end

    while (stack.length > 0 && h < heights[stack[stack.length - 1]]) {
      const height = heights[stack.pop()];
      const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;
      maxArea = Math.max(maxArea, height * width);
    }

    stack.push(i);
  }

  return maxArea;
}

// ────────────────────────────────────────────────────────────
//  16d. MAXIMAL RECTANGLE — LC #85
// ────────────────────────────────────────────────────────────

/**
 * Given a binary matrix, find the largest rectangle containing only 1s.
 * Build histogram row by row → apply largestRectangleArea on each row.
 */
function maximalRectangle(matrix) {
  if (matrix.length === 0) return 0;
  const n = matrix[0].length;
  const heights = new Array(n).fill(0);
  let maxArea = 0;

  for (const row of matrix) {
    for (let j = 0; j < n; j++) {
      heights[j] = row[j] === '1' ? heights[j] + 1 : 0;
    }
    maxArea = Math.max(maxArea, largestRectangleArea(heights));
  }

  return maxArea;
}

// ────────────────────────────────────────────────────────────
//  16e. TRAPPING RAIN WATER (Stack approach) — LC #42
// ────────────────────────────────────────────────────────────

/**
 * Monotonic decreasing stack. When we find a taller bar,
 * the popped bar forms a "valley" where water is trapped.
 */
function trap(height) {
  const stack = [];
  let water = 0;

  for (let i = 0; i < height.length; i++) {
    while (stack.length > 0 && height[i] > height[stack[stack.length - 1]]) {
      const bottom = stack.pop();
      if (stack.length === 0) break;

      const left = stack[stack.length - 1];
      const w = i - left - 1;
      const h = Math.min(height[i], height[left]) - height[bottom];
      water += w * h;
    }
    stack.push(i);
  }

  return water;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== MONOTONIC STACK ===\n");

console.log("16a. Next Greater Element:", nextGreaterElement([4, 1, 2], [1, 3, 4, 2])); // [-1,3,-1]

console.log("\n16b. Daily Temperatures:", dailyTemperatures([73, 74, 75, 71, 69, 72, 76, 73]));
// [1,1,4,2,1,1,0,0]

console.log("\n16c. Largest Rectangle:", largestRectangleArea([2, 1, 5, 6, 2, 3])); // 10

console.log("\n16d. Maximal Rectangle:", maximalRectangle([
  ['1','0','1','0','0'],
  ['1','0','1','1','1'],
  ['1','1','1','1','1'],
  ['1','0','0','1','0']
])); // 6

console.log("\n16e. Trap Rain Water:", trap([0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1])); // 6

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Next Greater Element I                  | Easy       | 496   |
 *  | Next Greater Element II (circular)      | Medium     | 503   |
 *  | Daily Temperatures                      | Medium     | 739   |
 *  | Largest Rectangle in Histogram          | Hard       | 84    |
 *  | Maximal Rectangle                       | Hard       | 85    |
 *  | Trapping Rain Water                     | Hard       | 42    |
 *  | Online Stock Span                       | Medium     | 901   |
 *  | Sum of Subarray Minimums                | Medium     | 907   |
 *  | Remove K Digits                         | Medium     | 402   |
 *  | Asteroid Collision                      | Medium     | 735   |
 */
