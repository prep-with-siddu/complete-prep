/**
 * ============================================================
 *  PATTERN 28: DESIGN PROBLEMS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Design problems test your ability to combine multiple data
 *  structures to achieve specific time/space complexity.
 *
 *  Common themes:
 *    • Caching (LRU, LFU) → HashMap + Doubly Linked List
 *    • O(1) operations → HashMap + Array/Set
 *    • Ordered operations → BST or sorted structure
 *    • Stream processing → Heap or Queue
 *    • Serialization → Tree traversal encoding/decoding
 *
 *  Key skill: choosing the RIGHT combination of data structures.
 *
 *  ┌─────────────────────┬──────────────────────────────────────────┐
 *  │ Operation Needed    │ Data Structure                           │
 *  ├─────────────────────┼──────────────────────────────────────────┤
 *  │ O(1) get/put        │ HashMap                                  │
 *  │ O(1) order tracking │ Doubly Linked List                       │
 *  │ O(1) random access  │ Array + HashMap (index mapping)          │
 *  │ O(1) min            │ Two stacks or separate min tracker       │
 *  │ O(log n) sorted     │ Heap or Balanced BST                     │
 *  └─────────────────────┴──────────────────────────────────────────┘
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Design a data structure that supports…"
 *    ✅ "Implement X" with specific O() requirements.
 *    ✅ "LRU Cache", "LFU Cache", "Min Stack", etc.
 *    ✅ Multiple operations, each with tight time bounds.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Think: "What operations do I need? What's the time constraint?"
 *  2. HashMap = O(1) lookup → almost always a building block.
 *  3. Doubly Linked List = O(1) add/remove if you have the node reference.
 *  4. HashMap + DLL = O(1) get + O(1) eviction ordering (LRU/LFU).
 *  5. HashMap + Array = O(1) insert, delete, getRandom.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  28a. LRU CACHE — LC #146
// ────────────────────────────────────────────────────────────

/**
 * Least Recently Used (LRU) Cache.
 * get(key) → O(1), put(key, value) → O(1).
 *
 * Structure: HashMap (key → DLL node) + Doubly Linked List.
 * DLL order: head → most recent, tail → least recent.
 * On access: move node to head.
 * On eviction: remove from tail.
 *
 * DRY RUN: capacity=2
 *   put(1,1): map={1:N1}, DLL=[1]
 *   put(2,2): map={1:N1,2:N2}, DLL=[2,1]
 *   get(1):   move N1 to head → DLL=[1,2], return 1
 *   put(3,3): evict tail (key 2) → DLL=[3,1], map={1:N1,3:N3}
 *   get(2):   not found → return -1
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key → {key, val, prev, next}

    // Sentinel nodes
    this.head = { key: 0, val: 0, prev: null, next: null };
    this.tail = { key: 0, val: 0, prev: null, next: null };
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _addToHead(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
  }

  _removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  _moveToHead(node) {
    this._removeNode(node);
    this._addToHead(node);
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    this._moveToHead(node);
    return node.val;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key);
      node.val = value;
      this._moveToHead(node);
    } else {
      const node = { key, val: value, prev: null, next: null };
      this.map.set(key, node);
      this._addToHead(node);

      if (this.map.size > this.capacity) {
        // Evict LRU (node before tail sentinel)
        const lru = this.tail.prev;
        this._removeNode(lru);
        this.map.delete(lru.key);
      }
    }
  }
}

// ────────────────────────────────────────────────────────────
//  28b. LFU CACHE — LC #460
// ────────────────────────────────────────────────────────────

/**
 * Least Frequently Used. On tie, evict least recently used.
 *
 * Structure:
 *   keyMap: key → {key, val, freq}
 *   freqMap: freq → Set of keys (ordered by insertion = LRU order)
 *   minFreq: tracks current minimum frequency
 */
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.keyMap = new Map();   // key → {val, freq}
    this.freqMap = new Map();  // freq → Set (Map preserves insertion order)
    this.minFreq = 0;
  }

  _touch(key) {
    const entry = this.keyMap.get(key);
    const oldFreq = entry.freq;

    // Remove from old frequency bucket
    this.freqMap.get(oldFreq).delete(key);
    if (this.freqMap.get(oldFreq).size === 0) {
      this.freqMap.delete(oldFreq);
      if (this.minFreq === oldFreq) this.minFreq++;
    }

    // Add to new frequency bucket
    entry.freq++;
    if (!this.freqMap.has(entry.freq)) this.freqMap.set(entry.freq, new Set());
    this.freqMap.get(entry.freq).add(key);
  }

  get(key) {
    if (!this.keyMap.has(key)) return -1;
    this._touch(key);
    return this.keyMap.get(key).val;
  }

  put(key, value) {
    if (this.capacity === 0) return;

    if (this.keyMap.has(key)) {
      this.keyMap.get(key).val = value;
      this._touch(key);
      return;
    }

    // Evict if full
    if (this.keyMap.size >= this.capacity) {
      const bucket = this.freqMap.get(this.minFreq);
      const evictKey = bucket.values().next().value; // First = LRU
      bucket.delete(evictKey);
      if (bucket.size === 0) this.freqMap.delete(this.minFreq);
      this.keyMap.delete(evictKey);
    }

    // Insert new
    this.keyMap.set(key, { val: value, freq: 1 });
    if (!this.freqMap.has(1)) this.freqMap.set(1, new Set());
    this.freqMap.get(1).add(key);
    this.minFreq = 1;
  }
}

// ────────────────────────────────────────────────────────────
//  28c. INSERT DELETE GETRANDOM O(1) — LC #380
// ────────────────────────────────────────────────────────────

/**
 * All operations in O(1):
 *   insert(val), remove(val), getRandom()
 *
 * Trick: Array for O(1) random, Map for O(1) lookup.
 * On remove: swap target with last element, then pop.
 */
class RandomizedSet {
  constructor() {
    this.arr = [];
    this.indexMap = new Map(); // val → index in arr
  }

  insert(val) {
    if (this.indexMap.has(val)) return false;
    this.indexMap.set(val, this.arr.length);
    this.arr.push(val);
    return true;
  }

  remove(val) {
    if (!this.indexMap.has(val)) return false;
    const idx = this.indexMap.get(val);
    const last = this.arr[this.arr.length - 1];

    // Swap with last
    this.arr[idx] = last;
    this.indexMap.set(last, idx);

    // Remove last
    this.arr.pop();
    this.indexMap.delete(val);
    return true;
  }

  getRandom() {
    const idx = Math.floor(Math.random() * this.arr.length);
    return this.arr[idx];
  }
}

// ────────────────────────────────────────────────────────────
//  28d. MIN STACK — LC #155
// ────────────────────────────────────────────────────────────

/**
 * Stack supporting push, pop, top, getMin — all O(1).
 * Trick: Store [value, currentMin] pairs.
 */
class MinStack {
  constructor() {
    this.stack = []; // Each element: [val, minSoFar]
  }

  push(val) {
    const currentMin = this.stack.length === 0
      ? val
      : Math.min(val, this.getMin());
    this.stack.push([val, currentMin]);
  }

  pop() {
    this.stack.pop();
  }

  top() {
    return this.stack[this.stack.length - 1][0];
  }

  getMin() {
    return this.stack[this.stack.length - 1][1];
  }
}

// ────────────────────────────────────────────────────────────
//  28e. SERIALIZE / DESERIALIZE BINARY TREE — LC #297
// ────────────────────────────────────────────────────────────

/**
 * Encode tree to string, decode string to tree.
 * Use preorder traversal. Null nodes = "N".
 */
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

function serialize(root) {
  const parts = [];
  function dfs(node) {
    if (!node) {
      parts.push("N");
      return;
    }
    parts.push(String(node.val));
    dfs(node.left);
    dfs(node.right);
  }
  dfs(root);
  return parts.join(",");
}

function deserialize(data) {
  const vals = data.split(",");
  let idx = 0;

  function dfs() {
    if (vals[idx] === "N") {
      idx++;
      return null;
    }
    const node = new TreeNode(parseInt(vals[idx]));
    idx++;
    node.left = dfs();
    node.right = dfs();
    return node;
  }

  return dfs();
}

// ────────────────────────────────────────────────────────────
//  28f. DESIGN TWITTER — LC #355
// ────────────────────────────────────────────────────────────

/**
 * postTweet(userId, tweetId)
 * getNewsFeed(userId) → 10 most recent tweets from self + followees
 * follow(followerId, followeeId)
 * unfollow(followerId, followeeId)
 */
class Twitter {
  constructor() {
    this.tweets = new Map();    // userId → [{tweetId, timestamp}]
    this.following = new Map(); // userId → Set of followeeIds
    this.time = 0;
  }

  postTweet(userId, tweetId) {
    if (!this.tweets.has(userId)) this.tweets.set(userId, []);
    this.tweets.get(userId).push({ tweetId, time: this.time++ });
  }

  getNewsFeed(userId) {
    // Gather all tweets from user + followees
    const users = [userId, ...(this.following.get(userId) || [])];
    const allTweets = [];

    for (const uid of users) {
      const tweets = this.tweets.get(uid) || [];
      allTweets.push(...tweets);
    }

    // Sort by time descending, take top 10
    allTweets.sort((a, b) => b.time - a.time);
    return allTweets.slice(0, 10).map(t => t.tweetId);
  }

  follow(followerId, followeeId) {
    if (!this.following.has(followerId)) this.following.set(followerId, new Set());
    this.following.get(followerId).add(followeeId);
  }

  unfollow(followerId, followeeId) {
    this.following.get(followerId)?.delete(followeeId);
  }
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== DESIGN PROBLEMS ===\n");

// 28a. LRU Cache
console.log("28a. LRU Cache:");
const lru = new LRUCache(2);
lru.put(1, 1);
lru.put(2, 2);
console.log("  get(1):", lru.get(1));   // 1
lru.put(3, 3);                          // evicts key 2
console.log("  get(2):", lru.get(2));   // -1
lru.put(4, 4);                          // evicts key 1
console.log("  get(1):", lru.get(1));   // -1
console.log("  get(3):", lru.get(3));   // 3
console.log("  get(4):", lru.get(4));   // 4

// 28b. LFU Cache
console.log("\n28b. LFU Cache:");
const lfu = new LFUCache(2);
lfu.put(1, 1);
lfu.put(2, 2);
console.log("  get(1):", lfu.get(1));   // 1
lfu.put(3, 3);                          // evicts key 2 (freq 1, LRU)
console.log("  get(2):", lfu.get(2));   // -1
console.log("  get(3):", lfu.get(3));   // 3

// 28c. RandomizedSet
console.log("\n28c. RandomizedSet:");
const rs = new RandomizedSet();
console.log("  insert(1):", rs.insert(1));    // true
console.log("  remove(2):", rs.remove(2));    // false
console.log("  insert(2):", rs.insert(2));    // true
console.log("  getRandom:", rs.getRandom());  // 1 or 2
console.log("  remove(1):", rs.remove(1));    // true
console.log("  getRandom:", rs.getRandom());  // 2

// 28d. Min Stack
console.log("\n28d. Min Stack:");
const ms = new MinStack();
ms.push(-2);
ms.push(0);
ms.push(-3);
console.log("  getMin:", ms.getMin());  // -3
ms.pop();
console.log("  top:", ms.top());        // 0
console.log("  getMin:", ms.getMin());  // -2

// 28e. Serialize / Deserialize
console.log("\n28e. Serialize/Deserialize:");
const tree = new TreeNode(1, new TreeNode(2), new TreeNode(3, new TreeNode(4), new TreeNode(5)));
const encoded = serialize(tree);
console.log("  Serialized:", encoded);  // "1,2,N,N,3,4,N,N,5,N,N"
const decoded = deserialize(encoded);
console.log("  Re-serialized:", serialize(decoded)); // Same

// 28f. Design Twitter
console.log("\n28f. Design Twitter:");
const tw = new Twitter();
tw.postTweet(1, 5);
console.log("  Feed(1):", tw.getNewsFeed(1));     // [5]
tw.follow(1, 2);
tw.postTweet(2, 6);
console.log("  Feed(1):", tw.getNewsFeed(1));     // [6, 5]
tw.unfollow(1, 2);
console.log("  Feed(1):", tw.getNewsFeed(1));     // [5]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                               | Difficulty | LC #  |
 *  |---------------------------------------|------------|-------|
 *  | LRU Cache                             | Medium     | 146   |
 *  | LFU Cache                             | Hard       | 460   |
 *  | Min Stack                             | Medium     | 155   |
 *  | Insert Delete GetRandom O(1)          | Medium     | 380   |
 *  | Serialize/Deserialize Binary Tree     | Hard       | 297   |
 *  | Design Twitter                        | Medium     | 355   |
 *  | Design HashMap                        | Easy       | 706   |
 *  | Design Linked List                    | Medium     | 707   |
 *  | Design Browser History                | Medium     | 1472  |
 *  | Implement Queue using Stacks          | Easy       | 232   |
 *
 *  DESIGN PROBLEM FRAMEWORK:
 *  ─────────────────────────
 *  1. List ALL operations and their required time complexity.
 *  2. For each operation, think: which DS gives this time?
 *  3. Combine DS: often HashMap + something else.
 *  4. Draw the data flow between structures.
 *  5. Handle edge cases: empty, full, duplicate, overflow.
 */
