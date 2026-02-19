/**
 * ============================================================
 *  PATTERN 4: MERGE INTERVALS
 * ============================================================
 *
 *  📖 THEORY
 *  ─────────
 *  Deals with overlapping intervals [start, end].
 *
 *  Core idea:
 *    1. SORT intervals by start time.
 *    2. Two intervals overlap if: current.start <= previous.end
 *       (after sorting by start).
 *    3. Merge by extending end: max(prev.end, curr.end).
 *
 *  Variations:
 *    • Merge all overlapping intervals.
 *    • Insert a new interval into sorted list.
 *    • Find intersections between two interval lists.
 *    • Minimum meeting rooms (max concurrent overlaps).
 *
 *
 *  🔍 HOW TO IDENTIFY
 *  ───────────────────
 *    ✅ Problem involves intervals [start, end].
 *    ✅ Keywords: "merge", "overlap", "intersect", "conflict".
 *    ✅ "Meeting rooms", "schedule", "time ranges".
 *    ✅ Need to determine if ranges overlap or how many overlap.
 *
 *
 *  💡 HINTS
 *  ─────────
 *  1. ALWAYS sort by start time first.
 *  2. Compare current.start with lastMerged.end.
 *  3. For "minimum rooms": count max simultaneous overlaps
 *     using sweep line or min-heap.
 *  4. For intersections: advance the interval that ends first.
 *
 *
 *  📊 COMPLEXITY
 *  ─────────────
 *  Time:  O(n log n) for sorting + O(n) scan = O(n log n)
 *  Space: O(n) for result
 *
 * ============================================================
 */

// ────────────────────────────────────────────────────────────
//  4a. MERGE OVERLAPPING INTERVALS — LC #56
// ────────────────────────────────────────────────────────────

/**
 * Merge all overlapping intervals.
 *
 * Example: [[1,3],[2,6],[8,10],[15,18]] → [[1,6],[8,10],[15,18]]
 *
 * Visualization:
 *   [1───3]
 *     [2─────6]      → merged: [1───────6]
 *              [8──10]                    [8──10]
 *                         [15──18]              [15──18]
 */
function merge(intervals) {
  if (intervals.length < 2) return intervals;

  // Step 1: Sort by start time
  intervals.sort((a, b) => a[0] - b[0]);

  const merged = [intervals[0]];

  for (let i = 1; i < intervals.length; i++) {
    const last = merged[merged.length - 1];
    const curr = intervals[i];

    if (curr[0] <= last[1]) {
      // Overlapping → extend end
      last[1] = Math.max(last[1], curr[1]);
    } else {
      // No overlap → add new interval
      merged.push(curr);
    }
  }

  return merged;
}

// ────────────────────────────────────────────────────────────
//  4b. INSERT INTERVAL — LC #57
// ────────────────────────────────────────────────────────────

/**
 * Insert a new interval and merge if necessary.
 * Input intervals are already sorted and non-overlapping.
 *
 * Example: [[1,3],[6,9]], newInterval = [2,5]
 *          → [[1,5],[6,9]]
 *
 * Strategy: Three phases:
 *   1. Add all intervals that come BEFORE newInterval.
 *   2. Merge all overlapping intervals into newInterval.
 *   3. Add all intervals that come AFTER.
 */
function insert(intervals, newInterval) {
  const result = [];
  let i = 0;

  // Phase 1: Add intervals ending before newInterval starts
  while (i < intervals.length && intervals[i][1] < newInterval[0]) {
    result.push(intervals[i]);
    i++;
  }

  // Phase 2: Merge overlapping intervals
  while (i < intervals.length && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(newInterval[0], intervals[i][0]);
    newInterval[1] = Math.max(newInterval[1], intervals[i][1]);
    i++;
  }
  result.push(newInterval);

  // Phase 3: Add remaining intervals
  while (i < intervals.length) {
    result.push(intervals[i]);
    i++;
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  4c. INTERVAL LIST INTERSECTIONS — LC #986
// ────────────────────────────────────────────────────────────

/**
 * Find intersections between two sorted interval lists.
 *
 * Example:
 *   A = [[0,2],[5,10],[13,23],[24,25]]
 *   B = [[1,5],[8,12],[15,24],[25,26]]
 *   → [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]
 *
 * Strategy: Two pointers, one per list.
 * Intersection = [max(starts), min(ends)] if it's valid.
 * Advance the pointer whose interval ends first.
 */
function intervalIntersection(firstList, secondList) {
  const result = [];
  let i = 0, j = 0;

  while (i < firstList.length && j < secondList.length) {
    const start = Math.max(firstList[i][0], secondList[j][0]);
    const end = Math.min(firstList[i][1], secondList[j][1]);

    if (start <= end) {
      result.push([start, end]); // Valid intersection
    }

    // Advance the interval that ends first
    if (firstList[i][1] < secondList[j][1]) {
      i++;
    } else {
      j++;
    }
  }

  return result;
}

// ────────────────────────────────────────────────────────────
//  4d. MEETING ROOMS II — LC #253
// ────────────────────────────────────────────────────────────

/**
 * Find minimum number of meeting rooms required.
 *
 * Example: [[0,30],[5,10],[15,20]] → 2
 *
 * Strategy: SWEEP LINE / Event-based approach.
 *   +1 when a meeting starts, -1 when it ends.
 *   Max concurrent = answer.
 */
function minMeetingRooms(intervals) {
  const events = [];

  for (const [start, end] of intervals) {
    events.push([start, 1]);   // Meeting starts → need +1 room
    events.push([end, -1]);    // Meeting ends → free -1 room
  }

  // Sort by time; if tie, end (-1) before start (+1)
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

  let maxRooms = 0;
  let currentRooms = 0;

  for (const [, type] of events) {
    currentRooms += type;
    maxRooms = Math.max(maxRooms, currentRooms);
  }

  return maxRooms;
}

// ────────────────────────────────────────────────────────────
//  4e. NON-OVERLAPPING INTERVALS — LC #435
// ────────────────────────────────────────────────────────────

/**
 * Min intervals to remove so remaining are non-overlapping.
 * Equivalent to: find max non-overlapping intervals.
 *
 * Greedy: Sort by END time. Keep interval ending earliest.
 */
function eraseOverlapIntervals(intervals) {
  intervals.sort((a, b) => a[1] - b[1]); // Sort by end time

  let removals = 0;
  let prevEnd = -Infinity;

  for (const [start, end] of intervals) {
    if (start >= prevEnd) {
      prevEnd = end; // No overlap → keep this interval
    } else {
      removals++;     // Overlap → remove this interval
    }
  }

  return removals;
}

// ────────────────────────────────────────────────────────────
//  🧪 TESTS
// ────────────────────────────────────────────────────────────

console.log("=== MERGE INTERVALS PATTERN ===\n");

console.log("4a. Merge Intervals:");
console.log("  ", JSON.stringify(merge([[1, 3], [2, 6], [8, 10], [15, 18]])));
// [[1,6],[8,10],[15,18]]

console.log("\n4b. Insert Interval:");
console.log("  ", JSON.stringify(insert([[1, 3], [6, 9]], [2, 5])));
// [[1,5],[6,9]]

console.log("\n4c. Interval Intersection:");
console.log("  ", JSON.stringify(intervalIntersection(
  [[0, 2], [5, 10], [13, 23], [24, 25]],
  [[1, 5], [8, 12], [15, 24], [25, 26]]
)));

console.log("\n4d. Meeting Rooms II:");
console.log("   [[0,30],[5,10],[15,20]] →", minMeetingRooms([[0, 30], [5, 10], [15, 20]])); // 2

console.log("\n4e. Non-overlapping (removals):");
console.log("   [[1,2],[2,3],[3,4],[1,3]] →", eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]])); // 1

// ────────────────────────────────────────────────────────────
//  📝 PRACTICE PROBLEMS
// ────────────────────────────────────────────────────────────
/*
 *  | Problem                         | Difficulty | LC # |
 *  |---------------------------------|------------|------|
 *  | Merge Intervals                 | Medium     | 56   |
 *  | Insert Interval                 | Medium     | 57   |
 *  | Non-overlapping Intervals       | Medium     | 435  |
 *  | Meeting Rooms                   | Easy       | 252  |
 *  | Meeting Rooms II                | Medium     | 253  |
 *  | Interval List Intersections     | Medium     | 986  |
 *  | Min Number of Arrows to Burst   | Medium     | 452  |
 *  | Employee Free Time              | Hard       | 759  |
 */
