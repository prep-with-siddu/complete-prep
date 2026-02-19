// ============================================================
// 📘 CONCEPT 6: STRINGS
// ============================================================
// Strings are sequences of characters. In JS, strings are
// IMMUTABLE — you can't change individual characters.
// Many DSA problems involve string manipulation.
// ============================================================

// ============================================================
// 🔹 STRING BASICS IN JAVASCRIPT
// ============================================================
// IMPORTANT: Strings are IMMUTABLE in JS!
// Every "modification" creates a NEW string → O(n)!

let str = "hello";
// str[0] = "H"; // ❌ Does nothing! Strings are immutable.
str = "H" + str.slice(1); // ✅ Creates a new string "Hello"

// ============================================================
// 🔹 IMPORTANT STRING METHODS (MUST KNOW)
// ============================================================

const s = "Hello, World!";

// ─────────────────────────────────────
// 1. LENGTH — O(1) (property, not method)
// ─────────────────────────────────────
s.length; // 13

// ─────────────────────────────────────
// 2. ACCESS — O(1)
// ─────────────────────────────────────
s[0];            // "H"
s.charAt(0);     // "H"
s[s.length - 1]; // "!" — Last character
s.charCodeAt(0); // 72  — ASCII/Unicode value
String.fromCharCode(72); // "H"

// ─────────────────────────────────────
// 3. SEARCH — O(n)
// ─────────────────────────────────────
s.indexOf("World");     // 7     — First occurrence index
s.lastIndexOf("l");     // 10    — Last occurrence
s.includes("Hello");    // true  — Boolean check
s.startsWith("Hello");  // true
s.endsWith("!");        // true

// ─────────────────────────────────────
// 4. EXTRACT — O(n)
// ─────────────────────────────────────
s.slice(7, 12);       // "World" — From index 7 to 12 (exclusive)
s.slice(-6);          // "orld!" — Last 6 chars
s.substring(0, 5);    // "Hello" — Like slice but no negative indices
// s.substr() is deprecated, avoid it!

// ─────────────────────────────────────
// 5. TRANSFORM — O(n) — Creates NEW string each time!
// ─────────────────────────────────────
s.toLowerCase();       // "hello, world!"
s.toUpperCase();       // "HELLO, WORLD!"
"  hello  ".trim();    // "hello" — Remove whitespace
"  hello  ".trimStart(); // "hello  "
"  hello  ".trimEnd();   // "  hello"

// ─────────────────────────────────────
// 6. REPLACE — O(n)
// ─────────────────────────────────────
s.replace("World", "JS");    // "Hello, JS!" — First match only
s.replaceAll("l", "L");      // "HeLLo, WorLd!"
s.replace(/l/g, "L");        // Same as above (regex global)

// ─────────────────────────────────────
// 7. SPLIT & JOIN — O(n)
// ─────────────────────────────────────
"a-b-c".split("-");         // ["a", "b", "c"]
"hello".split("");          // ["h", "e", "l", "l", "o"]
["a", "b", "c"].join("-");  // "a-b-c"
["a", "b", "c"].join("");   // "abc"

// ─────────────────────────────────────
// 8. REPEAT & PAD — O(n)
// ─────────────────────────────────────
"ab".repeat(3);            // "ababab"
"5".padStart(3, "0");      // "005"
"5".padEnd(3, "0");        // "500"

// ─────────────────────────────────────
// 9. COMPARE
// ─────────────────────────────────────
"a" < "b";                 // true  (lexicographic)
"abc".localeCompare("abd"); // -1 (abc comes before abd)

// ============================================================
// 🔹 STRING ↔ ARRAY CONVERSION (VERY USEFUL!)
// ============================================================
// Since strings are immutable, convert to array → modify → join back

const original = "hello";

// String → Array
const arr = original.split("");        // ["h", "e", "l", "l", "o"]
const arr2 = [...original];            // ["h", "e", "l", "l", "o"]
const arr3 = Array.from(original);     // ["h", "e", "l", "l", "o"]

// Modify array
arr.reverse();

// Array → String
const reversed = arr.join("");         // "olleh"

// ============================================================
// 🔹 ASCII VALUES (ESSENTIAL FOR DSA!)
// ============================================================
// 'a' = 97, 'b' = 98, ..., 'z' = 122
// 'A' = 65, 'B' = 66, ..., 'Z' = 90
// '0' = 48, '1' = 49, ..., '9' = 57

// Character ↔ ASCII
"a".charCodeAt(0);         // 97
String.fromCharCode(97);   // "a"

// Get position in alphabet (0-indexed)
function charPosition(c) {
  return c.charCodeAt(0) - "a".charCodeAt(0); // 'a'=0, 'b'=1, ... 'z'=25
}

// Check if character is a letter/digit
function isLetter(c) {
  return /[a-zA-Z]/.test(c);
}
function isDigit(c) {
  return c >= "0" && c <= "9";
}
function isAlphanumeric(c) {
  return /[a-zA-Z0-9]/.test(c);
}

// ============================================================
// 🔹 COMMON STRING PATTERNS FOR DSA ⭐
// ============================================================

// --- Pattern 1: Frequency Counter ---
function charFrequency(str) {
  const freq = {};
  for (const char of str) {
    freq[char] = (freq[char] || 0) + 1;
  }
  return freq;
}
// Use for: Anagrams, character counting, valid parentheses

// --- Pattern 2: Check Anagram ---
function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}

// --- Pattern 3: Reverse a String ---
function reverseString(str) {
  return str.split("").reverse().join("");
  // OR: [...str].reverse().join("");
}

// --- Pattern 4: Check Palindrome ---
function isPalindrome(str) {
  let left = 0, right = str.length - 1;
  while (left < right) {
    if (str[left] !== str[right]) return false;
    left++;
    right--;
  }
  return true;
}

// --- Pattern 5: Sliding Window on Strings ---
// Find longest substring without repeating characters
function lengthOfLongestSubstring(s) {
  const seen = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
    seen.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}

// --- Pattern 6: Two Pointers on Strings ---
// Valid Palindrome (ignoring non-alphanumeric)
function isPalindromeClean(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !isAlphanumeric(s[left])) left++;
    while (left < right && !isAlphanumeric(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}

// --- Pattern 7: String Builder (Efficient Concatenation) ---
// ⚠️ String concatenation in a loop is O(n²)!
// ❌ Bad:
function badConcat(n) {
  let result = "";
  for (let i = 0; i < n; i++) {
    result += "a"; // Creates new string each time! O(n) per concat!
  }
  return result;
}
// Total: O(1 + 2 + 3 + ... + n) = O(n²)!

// ✅ Good: Use array and join
function goodConcat(n) {
  const parts = [];
  for (let i = 0; i < n; i++) {
    parts.push("a"); // O(1) amortized
  }
  return parts.join(""); // O(n)
}
// Total: O(n)!

// ============================================================
// 🔹 IMPORTANT STRING ALGORITHMS
// ============================================================

// --- 1. KMP Pattern Matching (Concept) ---
// Finds pattern in text in O(n + m) instead of O(n * m)
// Uses a "failure function" / "partial match table"
// (Full implementation in patterns/27_string_matching.js)

// --- 2. Longest Common Prefix ---
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) !== 0) {
      prefix = prefix.slice(0, -1);
      if (prefix === "") return "";
    }
  }
  return prefix;
}

// --- 3. Count and Say / Run Length Encoding ---
function runLengthEncode(str) {
  let result = [];
  let count = 1;
  for (let i = 1; i <= str.length; i++) {
    if (i < str.length && str[i] === str[i - 1]) {
      count++;
    } else {
      result.push(count + str[i - 1]);
      count = 1;
    }
  }
  return result.join("");
}
// "aaabbc" → "3a2b1c"

// ============================================================
// 🔹 TEMPLATE STRINGS (ES6) — Useful for Output
// ============================================================
const name = "World";
const greeting = `Hello, ${name}!`; // "Hello, World!"
const multi = `Line 1
Line 2`;

// ============================================================
// 🔹 COMMON EDGE CASES TO HANDLE
// ============================================================
/*
- Empty string ""
- Single character "a"
- All same characters "aaaa"
- Spaces: "  hello  ", "hello world"
- Special characters: "a!b@c#"
- Case sensitivity: "Hello" vs "hello"
- Unicode: "café", "日本語"
- Very long strings (concatenation performance)
*/

// ============================================================
// 🔹 COMPLEXITY REMINDER
// ============================================================
/*
  REMEMBER: Strings are IMMUTABLE in JS!
  
  Every time you do str += "x", a NEW string is created.
  This makes:
    - Concatenation in loop: O(n²) — use array + join instead
    - Comparison (===): O(n) — compares character by character
    - Substring/slice: O(n) — creates a new string
    - indexOf: O(n * m) — n = string length, m = pattern length
*/

console.log("✅ Strings — Remember immutability and use array techniques!");
