// ============================================================
// 📘 CONCEPT 7: STACK & QUEUE
// ============================================================
// Two fundamental data structures that control the ORDER
// in which elements are added and removed.
// ============================================================

// ============================================================
// ━━━━━━━━━━ PART 1: STACK (LIFO) ━━━━━━━━━━
// ============================================================
// LIFO = Last In, First Out
// Think of a stack of plates — you take from the top!
//
//   push → [1, 2, 3, 4] ← top
//   pop  → removes 4 (the top)
//
// Operations:
//   push(item)  → Add to top     → O(1)
//   pop()       → Remove from top → O(1)
//   peek()/top  → View top        → O(1)
//   isEmpty()   → Check if empty  → O(1)

// ============================================================
// 🔹 STACK IMPLEMENTATION
// ============================================================

// Using an Array (simplest in JS)
class Stack {
  constructor() {
    this.items = [];
  }
  push(item) { this.items.push(item); }
  pop() { return this.items.pop(); }
  peek() { return this.items[this.items.length - 1]; }
  isEmpty() { return this.items.length === 0; }
  size() { return this.items.length; }
}

// ============================================================
// 🔹 WHEN TO USE A STACK? ⭐
// ============================================================
/*
1. MATCHING BRACKETS / PARENTHESES → Classic stack problem
2. UNDO/REDO → Browser back button, text editor
3. FUNCTION CALL STACK → How recursion works internally
4. EXPRESSION EVALUATION → Postfix, infix to postfix
5. MONOTONIC STACK → Next greater/smaller element
6. DFS (Depth-First Search) → Use stack instead of recursion
7. STRING PROBLEMS → Decode strings, remove duplicates
*/

// ============================================================
// 🔹 CLASSIC STACK PROBLEMS
// ============================================================

// --- 1. Valid Parentheses (LeetCode #20) ---
function isValid(s) {
  const stack = [];
  const map = { ")": "(", "}": "{", "]": "[" };

  for (const char of s) {
    if (char === "(" || char === "{" || char === "[") {
      stack.push(char);
    } else {
      if (stack.pop() !== map[char]) return false;
    }
  }
  return stack.length === 0;
}
// isValid("({[]})") → true
// isValid("({)}") → false

// --- 2. Next Greater Element ---
// For each element, find the next element that is greater
function nextGreaterElement(nums) {
  const result = new Array(nums.length).fill(-1);
  const stack = []; // Store indices

  for (let i = 0; i < nums.length; i++) {
    while (stack.length > 0 && nums[i] > nums[stack[stack.length - 1]]) {
      const index = stack.pop();
      result[index] = nums[i];
    }
    stack.push(i);
  }
  return result;
}
// [4, 2, 1, 3, 5] → [5, 3, 3, 5, -1]

// --- 3. Min Stack — Get minimum in O(1) ---
class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = []; // Tracks minimums
  }

  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0
      ? val
      : Math.min(val, this.minStack[this.minStack.length - 1]);
    this.minStack.push(min);
  }

  pop() {
    this.stack.pop();
    this.minStack.pop();
  }

  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}

// --- 4. Evaluate Reverse Polish Notation ---
function evalRPN(tokens) {
  const stack = [];
  for (const token of tokens) {
    if (["+", "-", "*", "/"].includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      if (token === "+") stack.push(a + b);
      else if (token === "-") stack.push(a - b);
      else if (token === "*") stack.push(a * b);
      else stack.push(Math.trunc(a / b));
    } else {
      stack.push(Number(token));
    }
  }
  return stack[0];
}
// ["2","1","+","3","*"] → ((2+1)*3) = 9

// --- 5. Daily Temperatures (Monotonic Stack) ---
function dailyTemperatures(temperatures) {
  const result = new Array(temperatures.length).fill(0);
  const stack = []; // Store indices

  for (let i = 0; i < temperatures.length; i++) {
    while (stack.length && temperatures[i] > temperatures[stack[stack.length - 1]]) {
      const idx = stack.pop();
      result[idx] = i - idx;
    }
    stack.push(i);
  }
  return result;
}

// ============================================================
// ━━━━━━━━━━ PART 2: QUEUE (FIFO) ━━━━━━━━━━
// ============================================================
// FIFO = First In, First Out
// Think of a line at a store — first person in line is served first!
//
//   enqueue → [1, 2, 3, 4] → dequeue
//   front = 1, back = 4
//
// Operations:
//   enqueue(item)  → Add to back    → O(1)
//   dequeue()      → Remove from front → O(1)*
//   front()/peek() → View front       → O(1)
//   isEmpty()      → Check if empty   → O(1)
//
// * O(1) amortized if using linked list. Using array shift() is O(n)!

// ============================================================
// 🔹 QUEUE IMPLEMENTATION
// ============================================================

// ⚠️ Using array with shift() is O(n)! (shifts all elements)
// For DSA, use a proper implementation:

// Using Linked List (True O(1) operations)
class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(val) {
    const node = { val, next: null };
    if (this.tail) {
      this.tail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
    this.length++;
  }

  dequeue() {
    if (!this.head) return undefined;
    const val = this.head.val;
    this.head = this.head.next;
    if (!this.head) this.tail = null;
    this.length--;
    return val;
  }

  front() { return this.head ? this.head.val : undefined; }
  isEmpty() { return this.length === 0; }
  size() { return this.length; }
}

// Quick & Simple Queue for LeetCode (using object as circular buffer)
class SimpleQueue {
  constructor() {
    this.data = {};
    this.head = 0;
    this.tail = 0;
  }
  enqueue(val) { this.data[this.tail++] = val; }
  dequeue() {
    if (this.head === this.tail) return undefined;
    const val = this.data[this.head];
    delete this.data[this.head++];
    return val;
  }
  front() { return this.data[this.head]; }
  isEmpty() { return this.head === this.tail; }
  size() { return this.tail - this.head; }
}

// ============================================================
// 🔹 WHEN TO USE A QUEUE? ⭐
// ============================================================
/*
1. BFS (Breadth-First Search) → THE #1 use case
2. Level-order tree traversal
3. Task scheduling / Process scheduling
4. Sliding window problems
5. Message queues / Event handling
6. Cache (FIFO eviction)
*/

// ============================================================
// 🔹 TYPES OF QUEUES
// ============================================================

// --- 1. Simple Queue (FIFO) ---
// Already shown above

// --- 2. Deque (Double-Ended Queue) ---
// Can add/remove from BOTH ends
class Deque {
  constructor() {
    this.items = {};
    this.head = 0;
    this.tail = 0;
  }
  pushBack(val)  { this.items[this.tail++] = val; }
  pushFront(val) { this.items[--this.head] = val; }
  popBack()  {
    if (this.head === this.tail) return undefined;
    const val = this.items[--this.tail];
    delete this.items[this.tail];
    return val;
  }
  popFront() {
    if (this.head === this.tail) return undefined;
    const val = this.items[this.head];
    delete this.items[this.head++];
    return val;
  }
  peekFront() { return this.items[this.head]; }
  peekBack()  { return this.items[this.tail - 1]; }
  isEmpty()   { return this.head === this.tail; }
  size()      { return this.tail - this.head; }
}

// --- 3. Priority Queue --- (Covered in Concept 09: Heap)
// Elements are dequeued based on priority, not order

// --- 4. Circular Queue ---
class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.size = k;
    this.front = 0;
    this.rear = -1;
    this.count = 0;
  }
  enqueue(val) {
    if (this.isFull()) return false;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = val;
    this.count++;
    return true;
  }
  dequeue() {
    if (this.isEmpty()) return -1;
    const val = this.queue[this.front];
    this.front = (this.front + 1) % this.size;
    this.count--;
    return val;
  }
  isEmpty() { return this.count === 0; }
  isFull()  { return this.count === this.size; }
}

// ============================================================
// 🔹 CLASSIC QUEUE PROBLEMS
// ============================================================

// --- 1. BFS Level Order Traversal ---
function levelOrder(root) {
  if (!root) return [];
  const result = [];
  const queue = [root];

  while (queue.length > 0) {
    const levelSize = queue.length;
    const level = [];

    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift(); // In interview, use proper queue
      level.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(level);
  }
  return result;
}

// --- 2. Implement Stack using Queues ---
class StackUsingQueues {
  constructor() {
    this.q1 = [];
    this.q2 = [];
  }
  push(x) {
    this.q2.push(x);
    while (this.q1.length) this.q2.push(this.q1.shift());
    [this.q1, this.q2] = [this.q2, this.q1];
  }
  pop() { return this.q1.shift(); }
  top() { return this.q1[0]; }
  isEmpty() { return this.q1.length === 0; }
}

// --- 3. Implement Queue using Stacks ---
class QueueUsingStacks {
  constructor() {
    this.pushStack = [];
    this.popStack = [];
  }
  enqueue(x) { this.pushStack.push(x); }
  dequeue() {
    if (this.popStack.length === 0) {
      while (this.pushStack.length) {
        this.popStack.push(this.pushStack.pop());
      }
    }
    return this.popStack.pop();
  }
  peek() {
    if (this.popStack.length === 0) {
      while (this.pushStack.length) {
        this.popStack.push(this.pushStack.pop());
      }
    }
    return this.popStack[this.popStack.length - 1];
  }
  isEmpty() {
    return this.pushStack.length === 0 && this.popStack.length === 0;
  }
}

// ============================================================
// 🔹 STACK vs QUEUE COMPARISON
// ============================================================
/*
┌──────────────────┬────────────────┬────────────────┐
│                  │ STACK (LIFO)   │ QUEUE (FIFO)   │
├──────────────────┼────────────────┼────────────────┤
│ Add              │ push (top)     │ enqueue (back) │
│ Remove           │ pop (top)      │ dequeue (front)│
│ View             │ peek (top)     │ front (front)  │
│ Use case         │ DFS, undo      │ BFS, scheduling│
│ Analogy          │ Stack of plates│ Line at store  │
│ Recursion alt.   │ YES (DFS)      │ NO             │
│ Iterative BFS    │ NO             │ YES            │
└──────────────────┴────────────────┴────────────────┘
*/

console.log("✅ Stack & Queue — Control the order of processing!");
