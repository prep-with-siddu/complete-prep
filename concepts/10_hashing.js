// ============================================================
// 📘 CONCEPT 10: HASHING
// ============================================================
// Hashing provides O(1) average-case lookups, insertions,
// and deletions. It maps keys to values using a hash function.
// THE most important technique for optimizing brute-force solutions.
// ============================================================

// ============================================================
// 🔹 WHAT IS HASHING?
// ============================================================
//
// A HASH FUNCTION takes a key and converts it to an array index.
//
//   key → hash(key) → index → store/retrieve value at that index
//
// Example:
//   "apple" → hash("apple") → 3 → array[3] = "apple's data"
//
// WHY? Direct access in O(1) instead of O(n) linear search!

// ============================================================
// 🔹 HASH MAP (Object / Map in JS)
// ============================================================
// Hash Map = Key-Value store with O(1) lookup
// JS provides two built-in implementations:

// --- 1. Plain Object {} ---
const obj = {};
obj["name"] = "Alice";   // Set
obj["name"];              // "Alice" — Get O(1)
delete obj["name"];       // Delete O(1)
"name" in obj;            // false — Check existence

// ⚠️ Object limitations:
// - Keys are always strings (or symbols)
// - Has prototype chain (keys like "constructor" cause issues)
// - No easy .size property

// --- 2. Map (PREFERRED for DSA) ---
const map = new Map();
map.set("name", "Alice");   // Set O(1)
map.get("name");             // "Alice" — Get O(1)
map.has("name");             // true — Check O(1)
map.delete("name");          // Delete O(1)
map.size;                    // 0 — Get count O(1)
map.clear();                 // Remove all

// Map advantages over Object:
// ✅ Any type as key (numbers, objects, arrays, etc.)
// ✅ Maintains insertion order
// ✅ .size property
// ✅ No prototype pollution
// ✅ Better performance for frequent add/delete

// Iterating a Map:
const m = new Map([["a", 1], ["b", 2], ["c", 3]]);
for (const [key, value] of m) { /* key, value */ }
m.forEach((value, key) => { /* ... */ });
[...m.keys()];   // ["a", "b", "c"]
[...m.values()]; // [1, 2, 3]
[...m.entries()]; // [["a",1], ["b",2], ["c",3]]

// ============================================================
// 🔹 HASH SET (Set in JS)
// ============================================================
// Set = Collection of UNIQUE values with O(1) lookup
// Like a Map but stores only keys (no values)

const set = new Set();
set.add(1);       // Add O(1)
set.add(2);
set.add(1);       // Duplicate — ignored!
set.has(1);       // true — Check O(1)
set.delete(1);    // Delete O(1)
set.size;         // 1

// Creating Set from Array (removes duplicates!)
const unique = [...new Set([1, 2, 2, 3, 3, 3])]; // [1, 2, 3]

// Set operations:
const setA = new Set([1, 2, 3, 4]);
const setB = new Set([3, 4, 5, 6]);

// Union
const union = new Set([...setA, ...setB]); // {1,2,3,4,5,6}

// Intersection
const intersection = new Set([...setA].filter(x => setB.has(x))); // {3,4}

// Difference
const difference = new Set([...setA].filter(x => !setB.has(x))); // {1,2}

// ============================================================
// 🔹 WHEN TO USE HASHING? ⭐
// ============================================================
/*
1. "Does this element exist?"     → Use Set or Map.has()
2. "How many times does it appear?" → Use Map (frequency counter)
3. "Find pair with sum = target"   → Use Map (complement lookup)
4. "Group by property"             → Use Map (group items)
5. "Find duplicates"               → Use Set
6. "Convert O(n²) to O(n)"         → Use Map to store seen values
7. "Need fast lookup/insertion"    → Use Map/Set over Array
*/

// ============================================================
// 🔹 COMMON HASHING PATTERNS ⭐⭐⭐
// ============================================================

// --- Pattern 1: Two Sum (The #1 LeetCode Problem) ---
// "Find two numbers that add up to target"
function twoSum(nums, target) {
  const map = new Map(); // value → index
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}
// Without hash: O(n²) — check every pair
// With hash: O(n) — single pass!

// --- Pattern 2: Frequency Counter ---
function frequencyCount(arr) {
  const freq = new Map();
  for (const item of arr) {
    freq.set(item, (freq.get(item) || 0) + 1);
  }
  return freq;
}
// frequencyCount([1,2,2,3,3,3]) → Map { 1→1, 2→2, 3→3 }

// Also using plain object:
function freqObj(arr) {
  const freq = {};
  for (const item of arr) {
    freq[item] = (freq[item] || 0) + 1;
  }
  return freq;
}

// --- Pattern 3: Check for Duplicates ---
function containsDuplicate(nums) {
  const seen = new Set();
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  return false;
}
// OR: return new Set(nums).size !== nums.length;

// --- Pattern 4: Group Anagrams ---
function groupAnagrams(strs) {
  const map = new Map();
  for (const str of strs) {
    const key = str.split("").sort().join("");
    if (!map.has(key)) map.set(key, []);
    map.get(key).push(str);
  }
  return [...map.values()];
}
// ["eat","tea","tan","ate","nat","bat"]
// → [["eat","tea","ate"], ["tan","nat"], ["bat"]]

// --- Pattern 5: Subarray Sum Equals K (Prefix Sum + Hash) ---
function subarraySum(nums, k) {
  const prefixCount = new Map([[0, 1]]);
  let count = 0, sum = 0;

  for (const num of nums) {
    sum += num;
    if (prefixCount.has(sum - k)) {
      count += prefixCount.get(sum - k);
    }
    prefixCount.set(sum, (prefixCount.get(sum) || 0) + 1);
  }
  return count;
}
// [1,1,1], k=2 → 2 (subarrays [1,1] at index 0-1 and 1-2)

// --- Pattern 6: First Non-Repeating Character ---
function firstUniqChar(s) {
  const freq = new Map();
  for (const c of s) freq.set(c, (freq.get(c) || 0) + 1);
  for (let i = 0; i < s.length; i++) {
    if (freq.get(s[i]) === 1) return i;
  }
  return -1;
}

// --- Pattern 7: Longest Consecutive Sequence ---
function longestConsecutive(nums) {
  const numSet = new Set(nums);
  let longest = 0;

  for (const num of numSet) {
    // Only start counting from the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let streak = 1;
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        streak++;
      }
      longest = Math.max(longest, streak);
    }
  }
  return longest;
}
// [100,4,200,1,3,2] → 4 (sequence: 1,2,3,4)

// --- Pattern 8: Isomorphic Strings ---
function isIsomorphic(s, t) {
  if (s.length !== t.length) return false;
  const mapS = new Map(), mapT = new Map();

  for (let i = 0; i < s.length; i++) {
    if (mapS.has(s[i]) && mapS.get(s[i]) !== t[i]) return false;
    if (mapT.has(t[i]) && mapT.get(t[i]) !== s[i]) return false;
    mapS.set(s[i], t[i]);
    mapT.set(t[i], s[i]);
  }
  return true;
}

// ============================================================
// 🔹 HASH COLLISIONS (CONCEPT)
// ============================================================
// When two different keys hash to the same index.
// Resolved by:
// 1. CHAINING: Each bucket holds a linked list of entries
// 2. OPEN ADDRESSING: Find next empty slot (linear probing)
//
// In JS, you don't handle this — Map/Set do it internally!
// But understanding it helps in interviews.

// ============================================================
// 🔹 COMPLEXITY COMPARISON
// ============================================================
/*
┌──────────────────────────────────────────────────────────────┐
│ Operation          │ Array │ Sorted Array │ Hash Map/Set    │
├──────────────────────────────────────────────────────────────┤
│ Search             │ O(n)  │ O(log n)     │ O(1) average    │
│ Insert             │ O(1)* │ O(n)         │ O(1) average    │
│ Delete             │ O(n)  │ O(n)         │ O(1) average    │
│ Find duplicates    │ O(n²) │ O(n)         │ O(n) ✅         │
│ Two Sum            │ O(n²) │ O(n)         │ O(n) ✅         │
│ Frequency count    │ O(n²) │ O(n log n)   │ O(n) ✅         │
│ Order preserved    │ ✅    │ ✅ (sorted)   │ ✅ (Map/Set)    │
└──────────────────────────────────────────────────────────────┘
* Array push is O(1), insert at position is O(n)
*/

// ============================================================
// 🔹 MAP vs OBJECT vs SET — WHICH TO USE?
// ============================================================
/*
✅ Use MAP when:
   - Need key-value pairs
   - Keys are non-string types (numbers, objects)
   - Need .size, .has(), iteration order
   - Frequent additions/deletions

✅ Use OBJECT when:
   - Keys are always strings
   - Working with JSON data
   - Simple configuration objects

✅ Use SET when:
   - Need unique values only (no key-value pairs)
   - Checking membership: "is X in the collection?"
   - Removing duplicates from array
*/

console.log("✅ Hashing — O(1) lookup is your secret weapon!");
