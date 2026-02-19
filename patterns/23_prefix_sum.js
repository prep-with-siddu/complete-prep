/**
 * ============================================================
 *  PATTERN 23: PREFIX SUM / CUMULATIVE SUM
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Pre-compute cumulative sums to answer range queries in O(1).
 *
 *  prefix[i] = arr[0] + arr[1] + ... + arr[i-1]
 *  Sum of arr[l..r] = prefix[r+1] - prefix[l]
 *
 *  Variants:
 *    • 1D Prefix Sum — Range sum queries.
 *    • 2D Prefix Sum — Submatrix sum queries.
 *    • Prefix Sum + HashMap — "Subarray sum equals K."
 *    • Prefix XOR — XOR of subarray.
 *    • Difference Array — Range increment in O(1).
 *
 *  The prefix sum + HashMap trick is EXTREMELY common:
 *    "How many subarrays have sum = K?"
 *    At index i, prefix = P. We need a previous prefix = P - K.
 *    Store prefix counts in a hashmap.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Subarray sum equals K."
 *    ✅ "Range sum query." (NumArray or NumMatrix)
 *    ✅ "Product of array except self."
 *    ✅ "Contiguous array" (same 0s and 1s).
 *    ✅ "Pivot index" (left sum = right sum).
 *    ✅ Anything involving RUNNING TOTAL or CUMULATIVE.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. prefix[0] = 0 (empty prefix). Makes math cleaner.
 *  2. For "count subarrays with sum K": use HashMap of prefix→count.
 *  3. For 0/1 arrays: replace 0 with -1 → "subarray sum = 0" = equal 0s & 1s.
 *  4. "Product except self": prefix product from left × suffix product from right.
 *  5. Difference array: for range updates [l,r] += val → diff[l]+=val, diff[r+1]-=val.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  23a. RANGE SUM QUERY — LC #303
// ────────────────────────────────────────────────────────────

/**
 * Build prefix sum array. Answer [l,r] in O(1).
 *
 * DRY RUN: nums = [-2, 0, 3, -5, 2, -1]
 *   prefix = [0, -2, -2, 1, -4, -2, -3]
 *   sumRange(0,2) = prefix[3] - prefix[0] = 1 - 0 = 1 ✓
 *   sumRange(2,5) = prefix[6] - prefix[2] = -3 - (-2) = -1 ✓
 */
class NumArray {
  constructor(nums) {
    this.prefix = new Array(nums.length + 1).fill(0);
    for (let i = 0; i < nums.length; i++) {
      this.prefix[i + 1] = this.prefix[i] + nums[i];
    }
  }

  sumRange(left, right) {
    return this.prefix[right + 1] - this.prefix[left];
  }
}

// ────────────────────────────────────────────────────────────
//  23b. SUBARRAY SUM EQUALS K — LC #560
// ────────────────────────────────────────────────────────────

/**
 * Count number of contiguous subarrays with sum = k.
 *
 * Prefix sum + HashMap.
 * At each index, prefix = P.
 * Need previous prefix = P - K → look it up in map.
 *
 * DRY RUN: nums=[1,2,3], k=3
 *   map: {0:1}
 *   i=0: prefix=1, need 1-3=-2 (not in map). map:{0:1, 1:1}
 *   i=1: prefix=3, need 3-3=0 (in map, count 1). count=1. map:{0:1,1:1,3:1}
 *   i=2: prefix=6, need 6-3=3 (in map, count 1). count=2. map:{0:1,1:1,3:1,6:1}
 *   Answer: 2 ✓ ([1,2] and [3])
 */
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]); // prefix 0 appears once
  let prefix = 0;
  let count = 0;

  for (const num of nums) {
    prefix += num;

    // How many previous prefixes equal (prefix - k)?
    if (prefixCount.has(prefix - k)) {
      count += prefixCount.get(prefix - k);
    }

    prefixCount.set(prefix, (prefixCount.get(prefix) || 0) + 1);
  }

  return count;
}

// ────────────────────────────────────────────────────────────
//  23c. PRODUCT OF ARRAY EXCEPT SELF — LC #238
// ────────────────────────────────────────────────────────────

/**
 * result[i] = product of all elements except nums[i].
 * WITHOUT using division.
 *
 * Two passes:
 *   Pass 1 (left → right): result[i] = product of all to the LEFT.
 *   Pass 2 (right → left): multiply by product of all to the RIGHT.
 * O(n) time, O(1) extra space (result array doesn't count).
 */
function productExceptSelf(nums) {
  const n = nums.length;
  const result = new Array(n).fill(1);

  // Left prefix products
  let leftProduct = 1;
  for (let i = 0; i < n; i++) {
    result[i] = leftProduct;
    leftProduct *= nums[i];
  }

  // Right suffix products
  let rightProduct = 1;
  for (let i = n - 1; i >= 0; i--) {
    result[i] *= rightProduct;
    rightProduct *= nums[i];
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  23d. CONTIGUOUS ARRAY (Equal 0s and 1s) — LC #525
// ────────────────────────────────────────────────────────────

/**
 * Longest subarray with equal number of 0s and 1s.
 * Replace 0 with -1 → find longest subarray with sum = 0.
 * Use prefix sum + map of {prefix → first index}.
 * If same prefix appears again → subarray between has sum 0.
 */
function findMaxLength(nums) {
  const map = new Map([[0, -1]]); // prefix 0 at "index" -1
  let prefix = 0;
  let maxLen = 0;

  for (let i = 0; i < nums.length; i++) {
    prefix += nums[i] === 0 ? -1 : 1;

    if (map.has(prefix)) {
      maxLen = Math.max(maxLen, i - map.get(prefix));
    } else {
      map.set(prefix, i); // Store FIRST occurrence only
    }
  }

  return maxLen;
}

// ────────────────────────────────────────────────────────────
//  23e. FIND PIVOT INDEX — LC #724
// ────────────────────────────────────────────────────────────

/**
 * Find index where left sum === right sum.
 * leftSum + nums[i] + rightSum = total
 * If leftSum === rightSum → leftSum === (total - nums[i]) / 2
 * Simpler: iterate, track leftSum. rightSum = total - leftSum - nums[i].
 */
function pivotIndex(nums) {
  const total = nums.reduce((a, b) => a + b, 0);
  let leftSum = 0;

  for (let i = 0; i < nums.length; i++) {
    if (leftSum === total - leftSum - nums[i]) return i;
    leftSum += nums[i];
  }

  return -1;
}

// ────────────────────────────────────────────────────────────
//  23f. 2D PREFIX SUM / RANGE SUM QUERY 2D — LC #304
// ────────────────────────────────────────────────────────────

/**
 * prefix[i][j] = sum of matrix[0..i-1][0..j-1]
 * Sum of submatrix (r1,c1) to (r2,c2):
 *   prefix[r2+1][c2+1] - prefix[r1][c2+1] - prefix[r2+1][c1] + prefix[r1][c1]
 */
class NumMatrix {
  constructor(matrix) {
    const m = matrix.length, n = matrix[0].length;
    this.prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        this.prefix[i][j] = matrix[i-1][j-1]
          + this.prefix[i-1][j]
          + this.prefix[i][j-1]
          - this.prefix[i-1][j-1];
      }
    }
  }

  sumRegion(r1, c1, r2, c2) {
    return this.prefix[r2+1][c2+1]
      - this.prefix[r1][c2+1]
      - this.prefix[r2+1][c1]
      + this.prefix[r1][c1];
  }
}

// ────────────────────────────────────────────────────────────
//  23g. DIFFERENCE ARRAY — Range Update in O(1)
// ────────────────────────────────────────────────────────────

/**
 * Instead of updating every element in [l, r], use a difference array:
 *   diff[l] += val, diff[r+1] -= val.
 * Then prefix sum of diff gives the final array.
 *
 * LC #370 (Range Addition) and many contest problems use this.
 */
function rangeAddition(length, updates) {
  const diff = new Array(length).fill(0);

  for (const [l, r, val] of updates) {
    diff[l] += val;
    if (r + 1 < length) diff[r + 1] -= val;
  }

  // Prefix sum to get final values
  for (let i = 1; i < length; i++) {
    diff[i] += diff[i - 1];
  }

  return diff;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== PREFIX SUM ===\n");

// 23a. Range Sum Query
const na = new NumArray([-2, 0, 3, -5, 2, -1]);
console.log("23a. sumRange(0,2):", na.sumRange(0, 2));   // 1
console.log("     sumRange(2,5):", na.sumRange(2, 5));   // -1

// 23b. Subarray Sum = K
console.log("\n23b. Subarray Sum (k=3):", subarraySum([1, 2, 3], 3));          // 2
console.log("     Subarray Sum (k=2):", subarraySum([1, 1, 1], 2));           // 2

// 23c. Product Except Self
console.log("\n23c. Product Except Self:", productExceptSelf([1, 2, 3, 4]));   // [24,12,8,6]

// 23d. Contiguous Array
console.log("\n23d. Max Length (equal 0s/1s):", findMaxLength([0, 1, 0, 1, 0, 1, 1])); // 6

// 23e. Pivot Index
console.log("\n23e. Pivot Index:", pivotIndex([1, 7, 3, 6, 5, 6]));           // 3

// 23f. 2D Prefix Sum
const nm = new NumMatrix([[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]);
console.log("\n23f. 2D sumRegion(2,1,4,3):", nm.sumRegion(2, 1, 4, 3));       // 8

// 23g. Difference Array
console.log("\n23g. Range Addition:", rangeAddition(5, [[1,3,2],[2,4,3],[0,2,-2]]));
// [-2,0,3,5,3]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Range Sum Query - Immutable             | Easy       | 303   |
 *  | Subarray Sum Equals K                   | Medium     | 560   |
 *  | Product of Array Except Self            | Medium     | 238   |
 *  | Contiguous Array                        | Medium     | 525   |
 *  | Find Pivot Index                        | Easy       | 724   |
 *  | Range Sum Query 2D - Immutable          | Medium     | 304   |
 *  | Running Sum of 1D Array                 | Easy       | 1480  |
 *  | Subarray Sums Divisible by K            | Medium     | 974   |
 *  | Maximum Size Subarray Sum Equals K      | Medium     | 325   |
 *  | Binary Subarrays With Sum               | Medium     | 930   |
 *  | Number of Sub-arrays With Odd Sum       | Medium     | 1524  |
 *
 *  PREFIX SUM VARIANTS CHEAT SHEET:
 *  ────────────────────────────────
 *  Range sum query          → Build prefix[] once, query O(1)
 *  Count subarrays sum=K    → HashMap: prefix→count
 *  Longest subarray sum=K   → HashMap: prefix→first index
 *  Equal 0s and 1s          → Replace 0→-1, then longest sum=0
 *  Product except self      → Left prefix product × right suffix product
 *  Range updates            → Difference array: diff[l]++, diff[r+1]--
 *  2D range queries         → 2D prefix with inclusion-exclusion
 */
