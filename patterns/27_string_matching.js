/**
 * ============================================================
 *  PATTERN 27: STRING MATCHING
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  String matching = finding pattern P in text T.
 *  Naive approach: O(n·m) — try every position.
 *
 *  Efficient algorithms:
 *  ┌──────────────┬───────────┬──────────────────────────────────────┐
 *  │ Algorithm    │ Time      │ Key Idea                             │
 *  ├──────────────┼───────────┼──────────────────────────────────────┤
 *  │ KMP          │ O(n + m)  │ Failure function (LPS); never back-  │
 *  │              │           │ track in text.                       │
 *  │ Rabin-Karp   │ O(n + m)* │ Rolling hash; * O(nm) worst case.   │
 *  │ Z-Algorithm  │ O(n + m)  │ Z-array = longest substring from i  │
 *  │              │           │ matching prefix.                     │
 *  └──────────────┴───────────┴──────────────────────────────────────┘
 *
 *  KMP (Knuth-Morris-Pratt):
 *    1. Build LPS (Longest Proper Prefix which is also Suffix) array.
 *    2. Use LPS to skip characters when mismatch occurs.
 *    3. Never move backwards in text.
 *
 *  Rabin-Karp:
 *    1. Compute hash of pattern.
 *    2. Slide window over text, compute rolling hash.
 *    3. If hashes match, verify character by character.
 *    4. Best for multi-pattern search.
 *
 *  Z-Algorithm:
 *    1. For string S, Z[i] = length of longest substring starting at i
 *       that matches prefix of S.
 *    2. Concatenate "pattern$text" → search for Z[i] == len(pattern).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Find pattern in string" / "strStr()" / "indexOf."
 *    ✅ "Find all occurrences of pattern in text."
 *    ✅ "Repeated substring pattern."
 *    ✅ "Shortest palindrome" (KMP trick).
 *    ✅ "Check if string is rotation of another."
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. KMP's LPS array: if pattern = "AABAACAABAA", LPS = [0,1,0,1,2,0,1,2,3,4,5].
 *  2. Rabin-Karp: use prime modulus to reduce hash collisions.
 *  3. Z-algo trick: concatenate P + "$" + T, then find Z[i] == len(P).
 *  4. For "shortest palindrome": reverse + KMP on (s + "#" + reverse(s)).
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  27a. KMP ALGORITHM — LC #28
// ────────────────────────────────────────────────────────────

/**
 * Build LPS (Longest Prefix Suffix) array.
 *
 * DRY RUN: pattern = "ABABC"
 *   i=1, len=0: A≠B → lps[1]=0, i++
 *   i=2, len=0: A==A → len=1, lps[2]=1, i++
 *   i=3, len=1: B==B → len=2, lps[3]=2, i++
 *   i=4, len=2: A≠C → len=lps[1]=0 → A≠C → lps[4]=0, i++
 *   lps = [0, 0, 1, 2, 0]
 */
function buildLPS(pattern) {
  const m = pattern.length;
  const lps = new Array(m).fill(0);
  let len = 0; // Length of previous longest prefix suffix
  let i = 1;

  while (i < m) {
    if (pattern[i] === pattern[len]) {
      len++;
      lps[i] = len;
      i++;
    } else {
      if (len !== 0) {
        len = lps[len - 1]; // Don't increment i
      } else {
        lps[i] = 0;
        i++;
      }
    }
  }

  return lps;
}

/**
 * KMP Search: Find first occurrence of needle in haystack.
 * Time: O(n + m), Space: O(m) for LPS.
 *
 * DRY RUN: haystack = "ABABDABACDABABCABAB", needle = "ABABC"
 *   lps = [0, 0, 1, 2, 0]
 *   i=0,j=0: A==A → i=1,j=1
 *   i=1,j=1: B==B → i=2,j=2
 *   i=2,j=2: A==A → i=3,j=3
 *   i=3,j=3: B==B → i=4,j=4
 *   i=4,j=4: D≠C → j=lps[3]=2
 *   i=4,j=2: D≠A → j=lps[1]=0
 *   i=4,j=0: D≠A → i=5
 *   ... continues until match at index 10.
 */
function kmpSearch(haystack, needle) {
  if (needle.length === 0) return 0;
  const n = haystack.length;
  const m = needle.length;
  const lps = buildLPS(needle);

  let i = 0; // Index for text
  let j = 0; // Index for pattern

  while (i < n) {
    if (haystack[i] === needle[j]) {
      i++;
      j++;
    }

    if (j === m) {
      return i - j; // Match found at index (i - j)
      // For ALL occurrences: push (i-j), then j = lps[j-1]; continue;
    } else if (i < n && haystack[i] !== needle[j]) {
      if (j !== 0) {
        j = lps[j - 1]; // Use LPS to skip
      } else {
        i++;
      }
    }
  }

  return -1;
}

/**
 * KMP: Find ALL occurrences of pattern in text.
 */
function kmpFindAll(text, pattern) {
  if (pattern.length === 0) return [];
  const lps = buildLPS(pattern);
  const n = text.length, m = pattern.length;
  const results = [];
  let i = 0, j = 0;

  while (i < n) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    }
    if (j === m) {
      results.push(i - j);
      j = lps[j - 1];
    } else if (i < n && text[i] !== pattern[j]) {
      if (j !== 0) j = lps[j - 1];
      else i++;
    }
  }
  return results;
}

// ────────────────────────────────────────────────────────────
//  27b. RABIN-KARP ALGORITHM
// ────────────────────────────────────────────────────────────

/**
 * Rolling hash string matching.
 * Hash = s[0]*base^(m-1) + s[1]*base^(m-2) + ... + s[m-1]*base^0
 *
 * Rolling: hash = (hash - s[i]*base^(m-1)) * base + s[i+m]
 */
function rabinKarp(text, pattern) {
  const n = text.length, m = pattern.length;
  if (m > n) return -1;

  const BASE = 31;
  const MOD = 1e9 + 7;
  const results = [];

  // Compute hash of pattern and first window
  let patHash = 0, textHash = 0;
  let power = 1; // base^(m-1) mod MOD

  for (let i = 0; i < m; i++) {
    patHash = (patHash * BASE + pattern.charCodeAt(i)) % MOD;
    textHash = (textHash * BASE + text.charCodeAt(i)) % MOD;
    if (i < m - 1) power = (power * BASE) % MOD;
  }

  for (let i = 0; i <= n - m; i++) {
    if (patHash === textHash) {
      // Verify character by character (avoid hash collision)
      if (text.substring(i, i + m) === pattern) {
        results.push(i);
      }
    }
    // Roll hash forward
    if (i < n - m) {
      textHash = (textHash - text.charCodeAt(i) * power % MOD + MOD) % MOD;
      textHash = (textHash * BASE + text.charCodeAt(i + m)) % MOD;
    }
  }

  return results;
}

// ────────────────────────────────────────────────────────────
//  27c. Z-ALGORITHM
// ────────────────────────────────────────────────────────────

/**
 * Z[i] = length of longest substring starting at i that matches prefix.
 *
 * DRY RUN: s = "aabxaab"
 *   Z[0] = 0 (by definition, skip)
 *   Z[1]: s[1]='a' == s[0]='a', s[2]='b' == s[1]='a'? No → Z[1]=1
 *   Z[2]: s[2]='b' ≠ s[0]='a' → Z[2]=0
 *   Z[3]: s[3]='x' ≠ s[0]='a' → Z[3]=0
 *   Z[4]: s[4]='a' == s[0], s[5]='a' == s[1], s[6]='b' == s[2] → Z[4]=3
 *   Z = [0, 1, 0, 0, 3, 1, 0]
 */
function zFunction(s) {
  const n = s.length;
  const z = new Array(n).fill(0);
  let l = 0, r = 0;

  for (let i = 1; i < n; i++) {
    if (i < r) {
      z[i] = Math.min(r - i, z[i - l]);
    }
    while (i + z[i] < n && s[z[i]] === s[i + z[i]]) {
      z[i]++;
    }
    if (i + z[i] > r) {
      l = i;
      r = i + z[i];
    }
  }

  return z;
}

/**
 * Z-Algorithm pattern search: concatenate pattern + "$" + text.
 * Find all i where Z[i] == pattern.length.
 */
function zSearch(text, pattern) {
  const combined = pattern + "$" + text;
  const z = zFunction(combined);
  const m = pattern.length;
  const results = [];

  for (let i = m + 1; i < combined.length; i++) {
    if (z[i] === m) {
      results.push(i - m - 1); // Position in original text
    }
  }
  return results;
}

// ────────────────────────────────────────────────────────────
//  27d. REPEATED SUBSTRING PATTERN — LC #459
// ────────────────────────────────────────────────────────────

/**
 * Can s be constructed by repeating a substring?
 * KMP trick: if n % (n - lps[n-1]) == 0 and lps[n-1] > 0 → YES.
 * The repeating unit length = n - lps[n-1].
 */
function repeatedSubstringPattern(s) {
  const n = s.length;
  const lps = buildLPS(s);
  const unitLen = n - lps[n - 1];
  return lps[n - 1] > 0 && n % unitLen === 0;
}

// ────────────────────────────────────────────────────────────
//  27e. SHORTEST PALINDROME — LC #214
// ────────────────────────────────────────────────────────────

/**
 * Add minimum characters in FRONT of s to make it a palindrome.
 *
 * KMP trick: Build s + "#" + reverse(s). The LPS of the last char
 * gives the longest palindromic prefix. Add the remaining reversed
 * suffix to the front.
 */
function shortestPalindrome(s) {
  const rev = s.split("").reverse().join("");
  const combined = s + "#" + rev;
  const lps = buildLPS(combined);
  const longestPalPrefix = lps[combined.length - 1];
  const suffix = s.substring(longestPalPrefix);
  return suffix.split("").reverse().join("") + s;
}

// ────────────────────────────────────────────────────────────
//  27f. IMPLEMENT strStr() — LC #28
// ────────────────────────────────────────────────────────────

function strStr(haystack, needle) {
  return kmpSearch(haystack, needle);
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== STRING MATCHING ===\n");

console.log("27a. KMP Search:");
console.log("  'sadbutsad' find 'sad':", kmpSearch("sadbutsad", "sad")); // 0
console.log("  'leetcode' find 'leeto':", kmpSearch("leetcode", "leeto")); // -1
console.log("  All occurrences of 'aba' in 'abababa':", kmpFindAll("abababa", "aba"));
// [0, 2, 4]

console.log("\n27b. Rabin-Karp:");
console.log("  'hello world' find 'world':", rabinKarp("hello world", "world")); // [6]
console.log("  All 'ab' in 'ababab':", rabinKarp("ababab", "ab")); // [0,2,4]

console.log("\n27c. Z-Algorithm:");
console.log("  Z-array of 'aabxaab':", zFunction("aabxaab")); // [0,1,0,0,3,1,0]
console.log("  Z-search 'ab' in 'ababab':", zSearch("ababab", "ab")); // [0,2,4]

console.log("\n27d. Repeated Substring:", repeatedSubstringPattern("abab")); // true
console.log("  'aba':", repeatedSubstringPattern("aba")); // false
console.log("  'abcabc':", repeatedSubstringPattern("abcabc")); // true

console.log("\n27e. Shortest Palindrome:", shortestPalindrome("aacecaaa")); // "aaacecaaa"
console.log("  'abcd':", shortestPalindrome("abcd")); // "dcbabcd"

console.log("\n27f. strStr:", strStr("sadbutsad", "sad")); // 0

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                   | Difficulty | LC #  |
 *  |-------------------------------------------|------------|-------|
 *  | Find Index of First Occurrence (strStr)   | Easy       | 28    |
 *  | Repeated Substring Pattern                | Easy       | 459   |
 *  | Shortest Palindrome                       | Hard       | 214   |
 *  | Repeated String Match                     | Medium     | 686   |
 *  | Longest Happy Prefix                      | Hard       | 1392  |
 *  | Sum of Scores of Built Strings            | Hard       | 2223  |
 *
 *  ALGORITHM SELECTION GUIDE:
 *  ──────────────────────────
 *  Single pattern search    → KMP (guaranteed O(n+m))
 *  Multiple pattern search  → Rabin-Karp (rolling hash, good avg case)
 *  Prefix-related questions → Z-Algorithm or KMP's LPS array
 *  Palindrome + prefix      → KMP trick: s + "#" + reverse(s)
 *  Repeated pattern check   → KMP: check n % (n - lps[n-1]) == 0
 */
