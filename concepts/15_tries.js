// ============================================================
// 📘 CONCEPT 15: TRIE (Prefix Tree)
// ============================================================
// A Trie is a tree-like data structure used for efficiently
// storing and searching STRINGS (especially prefixes).
// pronounced "try" (from reTRIEval)
// ============================================================

// ============================================================
// 🔹 WHAT IS A TRIE?
// ============================================================
// A Trie stores strings character by character.
// Each node represents a CHARACTER, and paths from root
// represent PREFIXES or complete WORDS.
//
// Example: Storing ["app", "apple", "bat", "ball"]
//
//         (root)
//        /      \
//       a        b
//       |        |
//       p        a
//       |       / \
//       p*     t*   l
//       |           |
//       l           l*
//       |
//       e*
//
// * = marks end of a complete word
//
// WHY TRIE?
// - Search for a word: O(m) where m = word length
// - Search for prefix: O(m)
// - Insert a word: O(m)
// Compare to: Array of strings → O(n * m) to search!

// ============================================================
// 🔹 TRIE NODE STRUCTURE
// ============================================================

class TrieNode {
  constructor() {
    this.children = {};    // Map of character → TrieNode
    this.isEndOfWord = false; // Marks complete word
    // Optional: this.count = 0;  // Count words with this prefix
    // Optional: this.word = null;  // Store the complete word
  }
}

// ============================================================
// 🔹 TRIE IMPLEMENTATION ⭐
// ============================================================

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // INSERT a word — O(m)
  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // SEARCH for exact word — O(m)
  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord; // Must be a complete word!
  }

  // Check if any word STARTS WITH prefix — O(m)
  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return true; // Just needs to exist as a path
  }

  // Helper: Get the node for a prefix (useful for other operations)
  _getNode(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return null;
      node = node.children[char];
    }
    return node;
  }
}

// Usage:
// const trie = new Trie();
// trie.insert("apple");
// trie.search("apple");    // true
// trie.search("app");      // false (not a complete word)
// trie.startsWith("app");  // true (prefix exists)
// trie.insert("app");
// trie.search("app");      // true (now it's a complete word)

// ============================================================
// 🔹 TRIE WITH MAP (Alternative — handles unicode)
// ============================================================
class TrieMap {
  constructor() {
    this.root = new Map();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.has(char)) node.set(char, new Map());
      node = node.get(char);
    }
    node.set("$", true); // End marker
  }

  search(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.has(char)) return false;
      node = node.get(char);
    }
    return node.has("$");
  }

  startsWith(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.has(char)) return false;
      node = node.get(char);
    }
    return true;
  }
}

// ============================================================
// 🔹 WHEN TO USE A TRIE? ⭐
// ============================================================
/*
1. PREFIX MATCHING — "Find all words starting with 'pre'"
2. AUTOCOMPLETE — Suggest words as user types
3. SPELL CHECKER — Find similar words
4. WORD SEARCH (in grid) — Efficient multi-word search
5. IP ROUTING — Longest prefix match
6. DICTIONARY — Fast word lookup
7. WORD GAMES — Scrabble, Boggle word validation
*/

// ============================================================
// 🔹 ADVANCED TRIE OPERATIONS
// ============================================================

class AdvancedTrie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  // Find all words with a given prefix
  findAllWithPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return [];
      node = node.children[char];
    }

    const results = [];
    this._collectWords(node, prefix, results);
    return results;
  }

  _collectWords(node, prefix, results) {
    if (node.isEndOfWord) results.push(prefix);
    for (const [char, child] of Object.entries(node.children)) {
      this._collectWords(child, prefix + char, results);
    }
  }

  // DELETE a word
  delete(word) {
    this._deleteHelper(this.root, word, 0);
  }

  _deleteHelper(node, word, index) {
    if (index === word.length) {
      if (!node.isEndOfWord) return false;
      node.isEndOfWord = false;
      return Object.keys(node.children).length === 0;
    }

    const char = word[index];
    if (!node.children[char]) return false;

    const shouldDelete = this._deleteHelper(node.children[char], word, index + 1);
    if (shouldDelete) {
      delete node.children[char];
      return !node.isEndOfWord && Object.keys(node.children).length === 0;
    }
    return false;
  }

  // Count words with prefix
  countWithPrefix(prefix) {
    let node = this.root;
    for (const char of prefix) {
      if (!node.children[char]) return 0;
      node = node.children[char];
    }
    return this._countWords(node);
  }

  _countWords(node) {
    let count = node.isEndOfWord ? 1 : 0;
    for (const child of Object.values(node.children)) {
      count += this._countWords(child);
    }
    return count;
  }
}

// ============================================================
// 🔹 CLASSIC TRIE PROBLEMS
// ============================================================

// --- 1. Word Search II (LeetCode #212) ---
// Find all words from dictionary that exist in a grid
function findWords(board, words) {
  const trie = new TrieNode();

  // Build trie from word list
  for (const word of words) {
    let node = trie;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.word = word; // Store complete word at leaf
  }

  const result = [];
  const rows = board.length, cols = board[0].length;

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;
    const char = board[r][c];
    if (char === "#" || !node.children[char]) return;

    node = node.children[char];

    if (node.word) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }

    board[r][c] = "#"; // Mark visited
    dfs(r + 1, c, node);
    dfs(r - 1, c, node);
    dfs(r, c + 1, node);
    dfs(r, c - 1, node);
    board[r][c] = char; // Unmark
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, trie);
    }
  }
  return result;
}

// --- 2. Design Add and Search Words (with '.' wildcard) ---
class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    return this._searchHelper(word, 0, this.root);
  }

  _searchHelper(word, index, node) {
    if (index === word.length) return node.isEndOfWord;

    const char = word[index];
    if (char === ".") {
      // Wildcard: try ALL children
      for (const child of Object.values(node.children)) {
        if (this._searchHelper(word, index + 1, child)) return true;
      }
      return false;
    } else {
      if (!node.children[char]) return false;
      return this._searchHelper(word, index + 1, node.children[char]);
    }
  }
}
// dict.addWord("bad");
// dict.search("b.d"); // true (. matches 'a')
// dict.search("b.."); // true

// --- 3. Longest Common Prefix using Trie ---
function longestCommonPrefix(strs) {
  if (strs.length === 0) return "";
  const trie = new Trie();
  for (const str of strs) trie.insert(str);

  let prefix = "";
  let node = trie.root;

  while (true) {
    const keys = Object.keys(node.children);
    if (keys.length !== 1 || node.isEndOfWord) break;
    prefix += keys[0];
    node = node.children[keys[0]];
  }
  return prefix;
}

// ============================================================
// 🔹 TRIE vs OTHER APPROACHES
// ============================================================
/*
┌─────────────────────┬───────────┬───────────┬──────────────┐
│ Operation           │ Trie      │ Hash Set  │ Sorted Array │
├─────────────────────┼───────────┼───────────┼──────────────┤
│ Search word         │ O(m)      │ O(m)*     │ O(m log n)   │
│ Search prefix       │ O(m) ✅   │ O(n*m) ❌ │ O(m log n)   │
│ Insert              │ O(m)      │ O(m)      │ O(n)         │
│ Autocomplete        │ O(m+k) ✅ │ O(n*m) ❌ │ O(m log n+k) │
│ Space               │ O(n*m)    │ O(n*m)    │ O(n*m)       │
├─────────────────────┴───────────┴───────────┴──────────────┤
│ m = word length, n = number of words, k = results count   │
│ * Hash: O(m) for computation, but prefix search requires  │
│   checking every word = O(n*m)                             │
└────────────────────────────────────────────────────────────┘

USE TRIE when prefix operations are needed!
USE HASH SET when only exact lookups are needed.
*/

// ============================================================
// 🔹 TRIE COMPLEXITY
// ============================================================
/*
Time:
  Insert:    O(m) — m = word length
  Search:    O(m)
  Prefix:    O(m)
  Delete:    O(m)

Space:
  O(ALPHABET_SIZE × m × n) in worst case
  Where n = number of words
  For lowercase English: ALPHABET_SIZE = 26
  
  In practice, tries are often SMALLER because words share prefixes!
  "apple", "application", "apply" share "appl" → saves space
*/

console.log("✅ Trie — The ultimate prefix data structure!");
