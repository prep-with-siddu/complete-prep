/**
 * ============================================================
 *  PATTERN 19: BIT MANIPULATION
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Bitwise operations work on individual bits of integers.
 *
 *  Key Operations:
 *    AND  (&)  — Both bits 1 → 1.   (Masking, checking bits)
 *    OR   (|)  — Either bit 1 → 1.  (Setting bits)
 *    XOR  (^)  — Different → 1.     (Toggle, cancel pairs)
 *    NOT  (~)  — Flip all bits.
 *    LEFT SHIFT (<<)  — Multiply by 2.
 *    RIGHT SHIFT (>>) — Divide by 2.
 *
 *  XOR Properties (MOST IMPORTANT):
 *    a ^ a = 0     (any number XOR itself = 0)
 *    a ^ 0 = a     (any number XOR 0 = itself)
 *    a ^ b ^ a = b (commutative + associative → find the unique one)
 *
 *  Useful Tricks:
 *    n & (n - 1)   — Removes lowest set bit.
 *    n & (-n)      — Isolates lowest set bit.
 *    n >> 1        — Divide by 2.
 *    n << 1        — Multiply by 2.
 *    n & 1         — Check if odd (last bit = 1).
 *    n ^ (1 << i)  — Toggle i-th bit.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Single number" / "unique number."
 *    ✅ "Power of two."
 *    ✅ "Counting bits" / "number of 1 bits."
 *    ✅ "Missing number" (XOR approach).
 *    ✅ O(1) space, no extra data structures allowed.
 *    ✅ Problems involving binary representation.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. XOR all elements to cancel pairs → leftover = unique.
 *  2. n & (n-1) removes last set bit → count iterations = number of 1s.
 *  3. Power of 2: exactly ONE bit set → n > 0 && (n & (n-1)) === 0.
 *  4. For "two unique numbers": XOR all → get xor of the two. Use
 *     a set bit to partition array into two groups → XOR each group.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  19a. SINGLE NUMBER — LC #136
// ────────────────────────────────────────────────────────────

/**
 * Every element appears twice except one. Find it.
 * XOR all: pairs cancel out, unique remains.
 *
 * DRY RUN: [4,1,2,1,2]
 *   0 ^ 4 = 4
 *   4 ^ 1 = 5
 *   5 ^ 2 = 7
 *   7 ^ 1 = 6
 *   6 ^ 2 = 4 ✓
 */
function singleNumber(nums) {
  let result = 0;
  for (const num of nums) {
    result ^= num;
  }
  return result;
}

// ────────────────────────────────────────────────────────────
//  19b. SINGLE NUMBER II — LC #137
// ────────────────────────────────────────────────────────────

/**
 * Every element appears THREE times except one. Find it.
 * Track bit counts using two variables (ones, twos).
 * ones: bits that have appeared 1 mod 3 times.
 * twos: bits that have appeared 2 mod 3 times.
 * When a bit appears 3 times, clear it from both.
 */
function singleNumberII(nums) {
  let ones = 0, twos = 0;

  for (const num of nums) {
    ones = (ones ^ num) & ~twos;
    twos = (twos ^ num) & ~ones;
  }

  return ones;
}

// ────────────────────────────────────────────────────────────
//  19c. SINGLE NUMBER III — LC #260
// ────────────────────────────────────────────────────────────

/**
 * Two numbers appear once, rest appear twice. Find both.
 *
 * 1. XOR all → xor = a ^ b (the two unique numbers).
 * 2. Find a bit where a and b differ: diffBit = xor & (-xor).
 * 3. Partition into two groups based on that bit → XOR each group.
 */
function singleNumberIII(nums) {
  let xor = 0;
  for (const num of nums) xor ^= num;

  const diffBit = xor & (-xor); // Lowest set bit in xor

  let a = 0, b = 0;
  for (const num of nums) {
    if (num & diffBit) a ^= num;
    else b ^= num;
  }

  return [a, b];
}

// ────────────────────────────────────────────────────────────
//  19d. NUMBER OF 1 BITS (Hamming Weight) — LC #191
// ────────────────────────────────────────────────────────────

/**
 * n & (n-1) clears the lowest set bit.
 * Count how many times until n = 0.
 */
function hammingWeight(n) {
  let count = 0;
  while (n !== 0) {
    n = n & (n - 1); // Remove lowest set bit
    count++;
  }
  return count;
}

// ────────────────────────────────────────────────────────────
//  19e. COUNTING BITS — LC #338
// ────────────────────────────────────────────────────────────

/**
 * Return array where ans[i] = number of 1 bits in i.
 * dp[i] = dp[i & (i-1)] + 1 (remove lowest bit + 1)
 * Or: dp[i] = dp[i >> 1] + (i & 1)
 */
function countBits(n) {
  const dp = new Array(n + 1).fill(0);

  for (let i = 1; i <= n; i++) {
    dp[i] = dp[i & (i - 1)] + 1;
  }

  return dp;
}

// ────────────────────────────────────────────────────────────
//  19f. POWER OF TWO — LC #231
// ────────────────────────────────────────────────────────────

/**
 * Power of 2 has exactly ONE set bit.
 * n & (n-1) removes it → result should be 0.
 */
function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

// ────────────────────────────────────────────────────────────
//  19g. MISSING NUMBER — LC #268 (XOR approach)
// ────────────────────────────────────────────────────────────

/**
 * Array of [0..n] with one missing. XOR all values + indices.
 * All pairs cancel except the missing number.
 */
function missingNumber(nums) {
  let xor = nums.length; // Start with n

  for (let i = 0; i < nums.length; i++) {
    xor ^= i ^ nums[i];
  }

  return xor;
}

// ────────────────────────────────────────────────────────────
//  19h. REVERSE BITS — LC #190
// ────────────────────────────────────────────────────────────

function reverseBits(n) {
  let result = 0;
  for (let i = 0; i < 32; i++) {
    result = (result << 1) | (n & 1);
    n >>>= 1; // Unsigned right shift
  }
  return result >>> 0; // Convert to unsigned 32-bit
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== BIT MANIPULATION ===\n");

console.log("19a. Single Number: [4,1,2,1,2] →", singleNumber([4, 1, 2, 1, 2])); // 4

console.log("\n19b. Single Number II: [2,2,3,2] →", singleNumberII([2, 2, 3, 2])); // 3

console.log("\n19c. Single Number III: [1,2,1,3,2,5] →", singleNumberIII([1, 2, 1, 3, 2, 5])); // [3,5] or [5,3]

console.log("\n19d. Hamming Weight (11):", hammingWeight(11)); // 3 (1011 in binary)

console.log("\n19e. Count Bits (5):", countBits(5)); // [0,1,1,2,1,2]

console.log("\n19f. Power of Two (16):", isPowerOfTwo(16)); // true
console.log("     Power of Two (18):", isPowerOfTwo(18)); // false

console.log("\n19g. Missing Number: [3,0,1] →", missingNumber([3, 0, 1])); // 2

console.log("\n19h. Reverse Bits (43261596):", reverseBits(43261596)); // 964176192

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Single Number                           | Easy       | 136   |
 *  | Single Number II                        | Medium     | 137   |
 *  | Single Number III                       | Medium     | 260   |
 *  | Number of 1 Bits                        | Easy       | 191   |
 *  | Counting Bits                           | Easy       | 338   |
 *  | Power of Two                            | Easy       | 231   |
 *  | Missing Number                          | Easy       | 268   |
 *  | Reverse Bits                            | Easy       | 190   |
 *  | Hamming Distance                        | Easy       | 461   |
 *  | Sum of Two Integers (no + operator)     | Medium     | 371   |
 *  | Bitwise AND of Numbers Range            | Medium     | 201   |
 *  | Maximum XOR of Two Numbers              | Medium     | 421   |
 *
 *  BIT MANIPULATION CHEAT SHEET:
 *  ─────────────────────────────
 *  Check i-th bit:   (n >> i) & 1
 *  Set i-th bit:     n | (1 << i)
 *  Clear i-th bit:   n & ~(1 << i)
 *  Toggle i-th bit:  n ^ (1 << i)
 *  Lowest set bit:   n & (-n)
 *  Remove lowest:    n & (n - 1)
 *  All 1s mask:      (1 << n) - 1
 *  Is power of 2:    n > 0 && (n & (n-1)) === 0
 */
