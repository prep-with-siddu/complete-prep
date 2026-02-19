/**
 * ============================================================
 *  PATTERN 24: STACK & QUEUE FUNDAMENTALS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Stack: LIFO (Last In, First Out) — push/pop from TOP.
 *  Queue: FIFO (First In, First Out) — enqueue at back, dequeue from front.
 *
 *  In JavaScript:
 *    Stack → Array with push() / pop()         — both O(1).
 *    Queue → Array with push() / shift()       — shift() is O(n)!
 *    Better Queue → Linked list or index-based  — O(1) dequeue.
 *
 *  Classic stack problems:
 *    • Matching brackets.
 *    • Evaluate expressions (postfix, calculator).
 *    • Decode nested strings.
 *    • Min stack (O(1) getMin).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ "Valid parentheses" / "balanced brackets."
 *    ✅ "Min stack" / "max stack."
 *    ✅ "Evaluate Reverse Polish Notation."
 *    ✅ "Decode string" / nested bracket problems.
 *    ✅ "Implement queue using stacks" (and vice versa).
 *    ✅ "Simplify path."
 *    ✅ Any problem with NESTING or MATCHING pairs.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. Opening bracket → push. Closing bracket → pop and compare.
 *  2. For "Min Stack": store [value, currentMin] tuples.
 *  3. For nested decode: push state onto stack when entering '['.
 *  4. Queue using 2 stacks: push to inStack, pop from outStack (amortized O(1)).
 *  5. "Simplify path": split by '/', push dirs, pop for '..', skip '.' and empty.
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  24a. VALID PARENTHESES — LC #20
// ────────────────────────────────────────────────────────────

/**
 * DRY RUN: s = "({[]})"
 *   ( → push. Stack: [(]
 *   { → push. Stack: [(, {]
 *   [ → push. Stack: [(, {, []
 *   ] → pop [, matches. Stack: [(, {]
 *   } → pop {, matches. Stack: [(]
 *   ) → pop (, matches. Stack: []
 *   Empty → true ✓
 */
function isValid(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const ch of s) {
    if (ch === '(' || ch === '{' || ch === '[') {
      stack.push(ch);
    } else {
      if (stack.length === 0 || stack.pop() !== map[ch]) return false;
    }
  }

  return stack.length === 0;
}

// ────────────────────────────────────────────────────────────
//  24b. MIN STACK — LC #155
// ────────────────────────────────────────────────────────────

/**
 * Stack supporting push, pop, top, and getMin — ALL in O(1).
 * Store [value, currentMin] tuples so min is always available.
 */
class MinStack {
  constructor() {
    this.stack = []; // Each entry: [value, minSoFar]
  }

  push(val) {
    const min = this.stack.length === 0 ? val : Math.min(val, this.getMin());
    this.stack.push([val, min]);
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
//  24c. EVALUATE REVERSE POLISH NOTATION — LC #150
// ────────────────────────────────────────────────────────────

/**
 * Evaluate postfix expression. Numbers → push. Operators → pop two, compute, push result.
 *
 * DRY RUN: ["2","1","+","3","*"]
 *   push 2, push 1
 *   "+": pop 1,2 → 2+1=3, push 3
 *   push 3
 *   "*": pop 3,3 → 3*3=9, push 9
 *   Answer: 9 ✓
 */
function evalRPN(tokens) {
  const stack = [];

  for (const token of tokens) {
    if (['+', '-', '*', '/'].includes(token)) {
      const b = stack.pop();
      const a = stack.pop();
      switch (token) {
        case '+': stack.push(a + b); break;
        case '-': stack.push(a - b); break;
        case '*': stack.push(a * b); break;
        case '/': stack.push(Math.trunc(a / b)); break; // Truncate toward zero
      }
    } else {
      stack.push(parseInt(token));
    }
  }

  return stack[0];
}

// ────────────────────────────────────────────────────────────
//  24d. DECODE STRING — LC #394
// ────────────────────────────────────────────────────────────

/**
 * "3[a2[c]]" → "accaccacc"
 * When hitting '[': push current string and number onto stack.
 * When hitting ']': pop, repeat current string, prepend to previous.
 */
function decodeString(s) {
  const countStack = [];
  const stringStack = [];
  let currentString = '';
  let currentNum = 0;

  for (const ch of s) {
    if (ch >= '0' && ch <= '9') {
      currentNum = currentNum * 10 + parseInt(ch);
    } else if (ch === '[') {
      countStack.push(currentNum);
      stringStack.push(currentString);
      currentNum = 0;
      currentString = '';
    } else if (ch === ']') {
      const count = countStack.pop();
      const prevString = stringStack.pop();
      currentString = prevString + currentString.repeat(count);
    } else {
      currentString += ch;
    }
  }

  return currentString;
}

// ────────────────────────────────────────────────────────────
//  24e. IMPLEMENT QUEUE USING STACKS — LC #232
// ────────────────────────────────────────────────────────────

/**
 * Two stacks: inStack for push, outStack for pop/peek.
 * When outStack is empty, pour ALL from inStack → outStack.
 * Amortized O(1) per operation.
 */
class MyQueue {
  constructor() {
    this.inStack = [];
    this.outStack = [];
  }

  push(x) {
    this.inStack.push(x);
  }

  pop() {
    this._transfer();
    return this.outStack.pop();
  }

  peek() {
    this._transfer();
    return this.outStack[this.outStack.length - 1];
  }

  empty() {
    return this.inStack.length === 0 && this.outStack.length === 0;
  }

  _transfer() {
    if (this.outStack.length === 0) {
      while (this.inStack.length > 0) {
        this.outStack.push(this.inStack.pop());
      }
    }
  }
}

// ────────────────────────────────────────────────────────────
//  24f. SIMPLIFY PATH — LC #71
// ────────────────────────────────────────────────────────────

/**
 * Unix-style path simplification.
 * Split by '/', process each part:
 *   ".." → pop (go up)
 *   "." or "" → skip
 *   anything else → push
 */
function simplifyPath(path) {
  const stack = [];

  for (const part of path.split('/')) {
    if (part === '..') {
      stack.pop();
    } else if (part !== '' && part !== '.') {
      stack.push(part);
    }
  }

  return '/' + stack.join('/');
}

// ────────────────────────────────────────────────────────────
//  24g. BASIC CALCULATOR II — LC #227
// ────────────────────────────────────────────────────────────

/**
 * Evaluate "3+2*2" → 7. Supports +, -, *, / (no parentheses).
 * Process * and / immediately (higher precedence).
 * Push +/- terms to stack. Sum at end.
 */
function calculate(s) {
  const stack = [];
  let num = 0;
  let sign = '+';

  for (let i = 0; i <= s.length; i++) {
    const ch = s[i];

    if (ch >= '0' && ch <= '9') {
      num = num * 10 + parseInt(ch);
    }

    if ((ch !== ' ' && (ch < '0' || ch > '9')) || i === s.length) {
      switch (sign) {
        case '+': stack.push(num); break;
        case '-': stack.push(-num); break;
        case '*': stack.push(stack.pop() * num); break;
        case '/': stack.push(Math.trunc(stack.pop() / num)); break;
      }
      sign = ch;
      num = 0;
    }
  }

  return stack.reduce((a, b) => a + b, 0);
}

// ────────────────────────────────────────────────────────────
//  24h. ASTEROID COLLISION — LC #735
// ────────────────────────────────────────────────────────────

/**
 * Positive = moving right, negative = moving left.
 * Collision when top of stack is + and current is -.
 * Bigger one survives. Equal → both destroyed.
 */
function asteroidCollision(asteroids) {
  const stack = [];

  for (const ast of asteroids) {
    let alive = true;

    while (alive && ast < 0 && stack.length > 0 && stack[stack.length - 1] > 0) {
      const top = stack[stack.length - 1];

      if (top < -ast) {
        stack.pop(); // Top destroyed, keep checking
      } else if (top === -ast) {
        stack.pop(); // Both destroyed
        alive = false;
      } else {
        alive = false; // Current destroyed
      }
    }

    if (alive) stack.push(ast);
  }

  return stack;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== STACK & QUEUE FUNDAMENTALS ===\n");

console.log("24a. Valid Parentheses '({[]})' →", isValid('({[]})')); // true
console.log("     Valid Parentheses '(]' →", isValid('(]'));         // false

// 24b. Min Stack
const ms = new MinStack();
ms.push(-2); ms.push(0); ms.push(-3);
console.log("\n24b. Min Stack getMin:", ms.getMin()); // -3
ms.pop();
console.log("     After pop, top:", ms.top(), "min:", ms.getMin()); // 0, -2

console.log("\n24c. Eval RPN ['2','1','+','3','*'] →", evalRPN(['2','1','+','3','*'])); // 9

console.log("\n24d. Decode String '3[a2[c]]' →", decodeString('3[a2[c]]')); // accaccacc

// 24e. Queue using Stacks
const q = new MyQueue();
q.push(1); q.push(2);
console.log("\n24e. Queue peek:", q.peek(), "pop:", q.pop(), "empty:", q.empty());
// 1, 1, false

console.log("\n24f. Simplify Path '/a/./b/../../c/' →", simplifyPath('/a/./b/../../c/')); // /c

console.log("\n24g. Calculator '3+2*2' →", calculate('3+2*2'));     // 7
console.log("     Calculator '14-3/2' →", calculate('14-3/2'));   // 13

console.log("\n24h. Asteroid Collision [5,10,-5] →", asteroidCollision([5, 10, -5])); // [5,10]
console.log("     Asteroid Collision [10,2,-5] →", asteroidCollision([10, 2, -5])); // [10]

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                                 | Difficulty | LC #  |
 *  |-----------------------------------------|------------|-------|
 *  | Valid Parentheses                       | Easy       | 20    |
 *  | Min Stack                               | Medium     | 155   |
 *  | Evaluate Reverse Polish Notation        | Medium     | 150   |
 *  | Decode String                           | Medium     | 394   |
 *  | Implement Queue using Stacks            | Easy       | 232   |
 *  | Implement Stack using Queues            | Easy       | 225   |
 *  | Simplify Path                           | Medium     | 71    |
 *  | Basic Calculator II                     | Medium     | 227   |
 *  | Basic Calculator                        | Hard       | 224   |
 *  | Asteroid Collision                      | Medium     | 735   |
 *  | Remove All Adjacent Duplicates          | Easy       | 1047  |
 *  | Backspace String Compare                | Easy       | 844   |
 *  | Design Circular Queue                   | Medium     | 622   |
 *  | Remove K Digits                         | Medium     | 402   |
 *
 *  STACK vs QUEUE — WHEN TO USE WHICH?
 *  ────────────────────────────────────
 *  STACK (LIFO):
 *    • Matching/nesting (brackets, HTML tags)
 *    • Undo/redo operations
 *    • Expression evaluation
 *    • DFS traversal (explicit stack)
 *    • Monotonic stack problems
 *    • Backtracking state management
 *
 *  QUEUE (FIFO):
 *    • BFS traversal
 *    • Level-order processing
 *    • Task scheduling / round-robin
 *    • Sliding window (Deque variant)
 *    • Stream processing (first-come first-served)
 */
