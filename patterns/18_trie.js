/**
 * ============================================================
 *  PATTERN 18: TRIE (PREFIX TREE)
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Tree-like data structure for efficient string operations.
 *  Each node represents a CHARACTER. Path from root to a node
 *  represents a PREFIX.
 *
 *  Operations (all O(L) where L = word length):
 *    • insert(word)      — Add a word.
 *    • search(word)      — Check if exact word exists.
 *    • startsWith(prefix)— Check if any word starts with prefix.
 *
 *  Each node has:
 *    • children: Map or array of size 26 (for lowercase English).
 *    • isEnd: boolean — marks end of a complete word.
 *
 *  Space: O(total characters across all words) worst case.
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Implement Trie / prefix tree."
 *    ✅ "Word Search II" (search multiple words in grid).
 *    ✅ "Auto complete" / "prefix matching."
 *    ✅ "Replace words" with shortest prefix.
 *    ✅ "Add and Search Word" (with wildcard).
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Use a Map for children (flexible, handles any characters).
 *  2. `isEnd` flag distinguishes "app" from "apple" prefix.
 *  3. For "Word Search II" — build trie of words, DFS on grid.
 *  4. For wildcard '.' matching — recurse into ALL children.
 *  5. Delete operations: decrement count or use reference counting.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  18a. IMPLEMENT TRIE — LC #208
// ────────────────────────────────────────────────────────────

class TrieNode {
  constructor() {
    this.children = new Map();
    this.isEnd = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  /** Insert a word into the trie. O(L) */
  insert(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  /** Returns true if the word is in the trie. O(L) */
  search(word) {
    const node = this._findNode(word);
    return node !== null && node.isEnd;
  }

  /** Returns true if any word starts with prefix. O(L) */
  startsWith(prefix) {
    return this._findNode(prefix) !== null;
  }

  /** Helper: traverse trie following the string, return end node or null */
  _findNode(str) {
    let node = this.root;
    for (const ch of str) {
      if (!node.children.has(ch)) return null;
      node = node.children.get(ch);
    }
    return node;
  }
}

// ────────────────────────────────────────────────────────────
//  18b. ADD AND SEARCH WORD — LC #211
// ────────────────────────────────────────────────────────────

/**
 * Extends Trie to support '.' wildcard that matches any character.
 * When encountering '.', recurse into ALL children.
 */
class WordDictionary {
  constructor() {
    this.root = new TrieNode();
  }

  addWord(word) {
    let node = this.root;
    for (const ch of word) {
      if (!node.children.has(ch)) {
        node.children.set(ch, new TrieNode());
      }
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  search(word) {
    return this._dfs(word, 0, this.root);
  }

  _dfs(word, index, node) {
    if (index === word.length) return node.isEnd;

    const ch = word[index];

    if (ch === '.') {
      // Try ALL children
      for (const child of node.children.values()) {
        if (this._dfs(word, index + 1, child)) return true;
      }
      return false;
    }

    if (!node.children.has(ch)) return false;
    return this._dfs(word, index + 1, node.children.get(ch));
  }
}

// ────────────────────────────────────────────────────────────
//  18c. WORD SEARCH II — LC #212
// ────────────────────────────────────────────────────────────

/**
 * Given a grid and a list of words, return all words found in the grid.
 * Build a Trie from words → DFS on grid while walking the trie.
 * This avoids re-checking the grid for each word independently.
 */
function findWords(board, words) {
  const root = new TrieNode();

  // Build trie
  for (const word of words) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.word = word; // Store full word at end node
  }

  const result = [];
  const rows = board.length, cols = board[0].length;

  function dfs(r, c, node) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;

    const ch = board[r][c];
    if (ch === '#' || !node.children.has(ch)) return;

    node = node.children.get(ch);

    if (node.word) {
      result.push(node.word);
      node.word = null; // Avoid duplicates
    }

    board[r][c] = '#'; // Mark visited

    dfs(r + 1, c, node);
    dfs(r - 1, c, node);
    dfs(r, c + 1, node);
    dfs(r, c - 1, node);

    board[r][c] = ch; // Restore

    // Optimization: prune empty branches
    if (node.children.size === 0) {
      // This node has no children and no word — remove from parent
      // (We'd need parent reference for full pruning; skip for clarity)
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dfs(r, c, root);
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  18d. REPLACE WORDS — LC #648
// ────────────────────────────────────────────────────────────

/**
 * Given a dictionary of roots and a sentence, replace words with
 * their shortest root.
 * Build trie from dictionary. For each word, walk trie to find
 * shortest matching root.
 */
function replaceWords(dictionary, sentence) {
  const root = new TrieNode();

  // Build trie from dictionary
  for (const word of dictionary) {
    let node = root;
    for (const ch of word) {
      if (!node.children.has(ch)) node.children.set(ch, new TrieNode());
      node = node.children.get(ch);
    }
    node.isEnd = true;
  }

  return sentence.split(' ').map(word => {
    let node = root;
    for (let i = 0; i < word.length; i++) {
      if (!node.children.has(word[i])) break;
      node = node.children.get(word[i]);
      if (node.isEnd) return word.substring(0, i + 1); // Shortest root
    }
    return word;
  }).join(' ');
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== TRIE ===\n");

// 18a. Implement Trie
const trie = new Trie();
trie.insert("apple");
trie.insert("app");
console.log("18a. search('apple'):", trie.search("apple"));       // true
console.log("     search('app'):", trie.search("app"));           // true
console.log("     search('ap'):", trie.search("ap"));             // false
console.log("     startsWith('ap'):", trie.startsWith("ap"));     // true

// 18b. Word Dictionary
const wd = new WordDictionary();
wd.addWord("bad");
wd.addWord("dad");
wd.addWord("mad");
console.log("\n18b. search('.ad'):", wd.search(".ad"));   // true
console.log("     search('b..'):", wd.search("b.."));     // true
console.log("     search('b.d'):", wd.search("b.d"));     // true
console.log("     search('..z'):", wd.search("..z"));     // false

// 18c. Word Search II
console.log("\n18c. Find Words:", findWords(
  [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]],
  ["oath","pea","eat","rain"]
)); // ["oath","eat"]

// 18d. Replace Words
console.log("\n18d. Replace Words:", replaceWords(
  ["cat","bat","rat"],
  "the cattle was rattled by the battery"
)); // "the cat was rat by the bat"

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Implement Trie                          | Medium     | 208   |
 *  | Add and Search Word                     | Medium     | 211   |
 *  | Word Search II                          | Hard       | 212   |
 *  | Replace Words                           | Medium     | 648   |
 *  | Design Search Autocomplete System       | Hard       | 642   |
 *  | Longest Word in Dictionary              | Medium     | 720   |
 *  | Map Sum Pairs                           | Medium     | 677   |
 *  | Maximum XOR of Two Numbers (XOR Trie)   | Medium     | 421   |
 */
