/**
 * ============================================================
 *  PATTERN 29: MATH & NUMBER THEORY
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Math patterns appear frequently in DSA:
 *
 *  ┌──────────────────────┬──────────┬──────────────────────────────┐
 *  │ Topic                │ Time     │ Key Idea                      │
 *  ├──────────────────────┼──────────┼──────────────────────────────┤
 *  │ GCD (Euclidean)      │ O(log n) │ gcd(a,b) = gcd(b, a%b)      │
 *  │ LCM                  │ O(log n) │ lcm(a,b) = a*b / gcd(a,b)   │
 *  │ Sieve of Eratosthenes│ O(n loglogn)│ Mark composites iteratively│
 *  │ Fast Exponentiation  │ O(log n) │ Binary exponentiation        │
 *  │ Modular Arithmetic   │ O(1)     │ (a+b)%m = (a%m + b%m)%m     │
 *  │ Factorial/nCr        │ O(n)     │ Pascal's triangle or formula │
 *  │ Prime Factorization  │ O(√n)    │ Divide by primes up to √n   │
 *  └──────────────────────┴──────────┴──────────────────────────────┘
 *
 *  Modular Arithmetic Rules:
 *    (a + b) % m = ((a % m) + (b % m)) % m
 *    (a * b) % m = ((a % m) * (b % m)) % m
 *    (a - b) % m = ((a % m) - (b % m) + m) % m
 *    (a / b) % m = (a * modInverse(b, m)) % m  (when m is prime)
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Count primes", "check if prime."
 *    ✅ "GCD/LCM of numbers."
 *    ✅ "Pow(x, n)", "modular exponentiation."
 *    ✅ "Trailing zeroes in n!"
 *    ✅ "Combinations / permutations" with modular arithmetic.
 *    ✅ "Answer modulo 10^9 + 7."
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. MOD = 1e9 + 7 (10^9 + 7) is the standard prime modulus.
 *  2. Trailing zeroes = count factors of 5 (n/5 + n/25 + n/125 + …).
 *  3. If answer "modulo 10^9+7": use modular arithmetic throughout.
 *  4. For large nCr: precompute factorials + modular inverse.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  29a. GCD & LCM — Euclidean Algorithm
// ────────────────────────────────────────────────────────────

/**
 * GCD using Euclidean algorithm.
 * gcd(48, 18) → gcd(18, 12) → gcd(12, 6) → gcd(6, 0) → 6
 */
function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

function lcm(a, b) {
  return (a / gcd(a, b)) * b;
}

/**
 * Extended GCD: returns [g, x, y] where a*x + b*y = g = gcd(a,b)
 * Used for modular inverse.
 */
function extendedGCD(a, b) {
  if (b === 0) return [a, 1, 0];
  const [g, x1, y1] = extendedGCD(b, a % b);
  return [g, y1, x1 - Math.floor(a / b) * y1];
}

// ────────────────────────────────────────────────────────────
//  29b. SIEVE OF ERATOSTHENES — LC #204
// ────────────────────────────────────────────────────────────

/**
 * Count primes less than n.
 * Time: O(n log log n), Space: O(n).
 *
 * DRY RUN: n = 10
 *   isPrime = [F, F, T, T, T, T, T, T, T, T]
 *   i=2: mark 4,6,8 → [F,F,T,T,F,T,F,T,F,T]
 *   i=3: mark 9 → [F,F,T,T,F,T,F,T,F,F]
 *   Primes < 10: {2,3,5,7} → count = 4
 */
function countPrimes(n) {
  if (n <= 2) return 0;
  const isPrime = new Array(n).fill(true);
  isPrime[0] = isPrime[1] = false;

  for (let i = 2; i * i < n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j < n; j += i) {
        isPrime[j] = false;
      }
    }
  }

  return isPrime.filter(Boolean).length;
}

/**
 * Return list of all primes up to n.
 */
function sieve(n) {
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = isPrime[1] = false;
  for (let i = 2; i * i <= n; i++) {
    if (isPrime[i]) {
      for (let j = i * i; j <= n; j += i) isPrime[j] = false;
    }
  }
  return isPrime.reduce((primes, val, idx) => {
    if (val) primes.push(idx);
    return primes;
  }, []);
}

// ────────────────────────────────────────────────────────────
//  29c. FAST EXPONENTIATION — LC #50 Pow(x, n)
// ────────────────────────────────────────────────────────────

/**
 * Binary exponentiation: x^n in O(log n).
 *
 * If n is even: x^n = (x^(n/2))^2
 * If n is odd:  x^n = x * x^(n-1)
 *
 * DRY RUN: pow(2, 10)
 *   2^10 = (2^5)^2
 *   2^5  = 2 * (2^2)^2
 *   2^2  = (2^1)^2
 *   2^1  = 2 * (2^0)
 *   2^0  = 1
 *   Back: 2^1=2, 2^2=4, 2^5=32, 2^10=1024
 */
function myPow(x, n) {
  if (n === 0) return 1;
  if (n < 0) {
    x = 1 / x;
    n = -n;
  }

  let result = 1;
  while (n > 0) {
    if (n % 2 === 1) {
      result *= x;
    }
    x *= x;
    n = Math.floor(n / 2);
  }
  return result;
}

/**
 * Modular exponentiation: (base^exp) % mod
 * Essential for "answer modulo 10^9 + 7" problems.
 */
function modPow(base, exp, mod) {
  let result = 1n;
  base = BigInt(base) % BigInt(mod);
  exp = BigInt(exp);
  const bigMod = BigInt(mod);

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % bigMod;
    }
    exp = exp / 2n;
    base = (base * base) % bigMod;
  }
  return Number(result);
}

// ────────────────────────────────────────────────────────────
//  29d. FACTORIAL TRAILING ZEROES — LC #172
// ────────────────────────────────────────────────────────────

/**
 * Count trailing zeroes in n!
 * Each trailing zero = one factor of 10 = one pair of (2, 5).
 * Factors of 2 are plentiful → just count factors of 5.
 *
 * DRY RUN: n = 25
 *   25/5 = 5, 25/25 = 1, 25/125 = 0 → total = 6
 *   (5,10,15,20 contribute one 5 each; 25 contributes two 5s)
 */
function trailingZeroes(n) {
  let count = 0;
  while (n >= 5) {
    n = Math.floor(n / 5);
    count += n;
  }
  return count;
}

// ────────────────────────────────────────────────────────────
//  29e. PRIME FACTORIZATION
// ────────────────────────────────────────────────────────────

/**
 * Find all prime factors of n. O(√n).
 * DRY RUN: n = 60
 *   60/2=30, 30/2=15, 15/3=5, 5/5=1 → factors = [2, 2, 3, 5]
 */
function primeFactors(n) {
  const factors = [];
  for (let d = 2; d * d <= n; d++) {
    while (n % d === 0) {
      factors.push(d);
      n /= d;
    }
  }
  if (n > 1) factors.push(n);
  return factors;
}

// ────────────────────────────────────────────────────────────
//  29f. COMBINATIONS (nCr) WITH MODULAR ARITHMETIC
// ────────────────────────────────────────────────────────────

/**
 * Compute nCr mod p (p is prime) using Fermat's little theorem.
 * a^(-1) mod p = a^(p-2) mod p
 */
function nCrMod(n, r, mod = 1000000007) {
  if (r > n) return 0;
  if (r === 0 || r === n) return 1;

  // Precompute factorials mod p
  const fact = new Array(n + 1);
  fact[0] = 1n;
  const bigMod = BigInt(mod);
  for (let i = 1; i <= n; i++) {
    fact[i] = (fact[i - 1] * BigInt(i)) % bigMod;
  }

  // Modular inverse using Fermat's little theorem
  function modInverse(a, m) {
    let result = 1n;
    let base = a % m;
    let exp = m - 2n;
    while (exp > 0n) {
      if (exp % 2n === 1n) result = (result * base) % m;
      exp = exp / 2n;
      base = (base * base) % m;
    }
    return result;
  }

  const numerator = fact[n];
  const denominator = (fact[r] * fact[n - r]) % bigMod;
  return Number((numerator * modInverse(denominator, bigMod)) % bigMod);
}

// ────────────────────────────────────────────────────────────
//  29g. HAPPY NUMBER — LC #202
// ────────────────────────────────────────────────────────────

/**
 * Replace number by sum of squares of digits.
 * Happy if it eventually reaches 1.
 * Use Floyd's cycle detection to detect loops.
 */
function isHappy(n) {
  function getNext(num) {
    let sum = 0;
    while (num > 0) {
      const d = num % 10;
      sum += d * d;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  let slow = n, fast = getNext(n);
  while (fast !== 1 && slow !== fast) {
    slow = getNext(slow);
    fast = getNext(getNext(fast));
  }
  return fast === 1;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== MATH & NUMBER THEORY ===\n");

console.log("29a. GCD & LCM:");
console.log("  gcd(48, 18):", gcd(48, 18));     // 6
console.log("  lcm(12, 18):", lcm(12, 18));     // 36
console.log("  gcd(0, 5):", gcd(0, 5));         // 5

console.log("\n29b. Count Primes < 10:", countPrimes(10));   // 4
console.log("  Primes ≤ 30:", sieve(30));
// [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

console.log("\n29c. Power:");
console.log("  2^10:", myPow(2, 10));           // 1024
console.log("  2.1^3:", myPow(2.1, 3));         // ~9.261
console.log("  2^-2:", myPow(2, -2));           // 0.25
console.log("  modPow(2,10,1e9+7):", modPow(2, 10, 1e9 + 7)); // 1024

console.log("\n29d. Trailing Zeroes:");
console.log("  5!:", trailingZeroes(5));       // 1
console.log("  25!:", trailingZeroes(25));     // 6
console.log("  100!:", trailingZeroes(100));   // 24

console.log("\n29e. Prime Factors:");
console.log("  60:", primeFactors(60));         // [2, 2, 3, 5]
console.log("  84:", primeFactors(84));         // [2, 2, 3, 7]

console.log("\n29f. nCr Mod:");
console.log("  C(5,2):", nCrMod(5, 2));         // 10
console.log("  C(10,3):", nCrMod(10, 3));       // 120

console.log("\n29g. Happy Number:");
console.log("  19:", isHappy(19));               // true
console.log("  2:", isHappy(2));                 // false

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                   | Difficulty | LC #  |
 *  |-------------------------------------------|------------|-------|
 *  | Count Primes                              | Medium     | 204   |
 *  | Pow(x, n)                                 | Medium     | 50    |
 *  | Factorial Trailing Zeroes                  | Medium     | 172   |
 *  | Happy Number                              | Easy       | 202   |
 *  | Ugly Number II                            | Medium     | 264   |
 *  | Super Pow                                 | Medium     | 372   |
 *  | Count Good Numbers                        | Medium     | 1922  |
 *  | Unique Paths (combinatorial)              | Medium     | 62    |
 *  | Integer Break                             | Medium     | 343   |
 *  | Nth Digit                                 | Medium     | 400   |
 *
 *  MODULAR ARITHMETIC CHEAT SHEET:
 *  ───────────────────────────────
 *  MOD = 1e9 + 7 (standard prime)
 *  (a + b) % M = ((a%M) + (b%M)) % M
 *  (a * b) % M = ((a%M) * (b%M)) % M
 *  (a - b) % M = ((a%M) - (b%M) + M) % M
 *  a^(-1) % M  = a^(M-2) % M  (Fermat's little theorem, M prime)
 *  nCr % M     = n! * modInverse(r! * (n-r)!) % M
 */
