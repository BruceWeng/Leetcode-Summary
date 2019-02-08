/**
 * Preprocess
 * Sort ascending by start point for each interval
 * 
 * The interval questions are all about:
 * Comparing interval1.start or end with interval2.start or end
 *  
 * Template:
 * 1. Merge: (find overlap)
 * if currInterval.start < prevInterval.end: // overlap
 *   prevInterval.end = max(prevInterval.end, currInterval.end) // update end boundary
 * else:
 *   push new Interval(prevInterval.start, prevInterval.end)
 *   update prev start and end
 * 
 * 2. Insert: (Merge if necessary)
 *   2.a find all the left intervals (if interval.end < newInterval.start) 
 *       and put into new left array
 *   2.b find all the right intervals (if interval.start > newInterval.end) 
 *       and put into new right array
 *   2.c if left.length + right.length !== intervals.length:
 *       // some intervals need to be merge with newInterval
 *       push new interval with union boundary where:
 *       s = min(smallest start of mid interval, newInteral.start)
 *       e = max(largest end of mid interval, newInterval.end)
 *   2.d return [...left, new Interval(s, e), ...right]
 * Note: 2.a, 2.b, 2.c can be done in one for loop
 * 
 * Non-overlapping: currInterval.start > prevInterval.end
 * Min Heap Category
 * 3. Count non-overlapping intervals: (use min heap)
 *    3.a heap.push(intervals[0].end)
 *    3.b Iterate intervals:
 *        if non-overlap: heap.pop()
 *        heap.push(interval.end)
 *    3.c return heap.size()
 * 
 * 4. If the input is interval stream: 
 *      4.a Use a minHeap to store the intervals
 *      4.b addNum(val): Push num to minHeap to maintain the order after insert new interval
 *      4.c getIntervals(): Use a temp[] to store merge result from minHeap
 *                          copy temp[] to minHeap and return temp[]
 * 
 * Non-overlapping: currInterval.start > prevInterval.end
 * Sort By interval.end Catagory
 * 5. Find the maximum intervals that are non-overlapping
 *   5.1 If overlapping: 
 *     5.1.a update prevInterval.end = currInterval.end
 * 
 * 6. Intersection of two list and find next interval
 *   6.1 find intersection:
 *     s = max(interval1.start, interval2.start)
 *     e = min(interval1.end, interval2.end)
 *     if s <= e: overlapping
 *   6.2 find next interval by smaller interval.end 
 *       -> possible to find next smaller interval.start
 */
function Interval(start, end) {
  this.start = start;
  this.end = end;
}

// Leetcode 56. Merge Intervals (1)
/**
 * @param {Interval[]} intervals
 * @return {Interval[]}
 */
const merge = (intervals) => {
  if (intervals === undefined || intervals.length === 0) return [];

  let result = [];
  intervals.sort((a, b) => a.start - b.start);
  let prevInterval = intervals[0];
  for (let i = 1; i < intervals.length; i += 1) {
    if (intervals[i].start <= prevInterval.end) { // overlap
      prevInterval.end = Math.max(intervals[i].end, prevInterval.end);
    }
    else {
      result.push(new Interval(prevInterval.start, prevInterval.end));
      prevInterval = intervals[i];
    }
  }
  
  result.push(new Interval(prevInterval.start, prevInterval.end));
  return result;
};

// Leetcode 57. Insert Interval (2)
/**
 * @param {Interval[]} intervals
 * @param {Interval} newInterval
 * @return {Interval[]}
 */
const insert = (intervals, newInterval) => {
  let left = [];
  let right = [];
  let start = newInterval.start;
  let end = newInterval.end;

  // 2.a find all the left intervals
  // 2.b find all the right intervals
  // 2.c find merged interval start(smallest) and end(largest)
  for (let i = 0; i < intervals.length; i += 1) {
    if (intervals[i].end < start) left.push(intervals[i]);
    else if (intervals[i].start > end) right.push(intervals[i]);
    else {
      start = Math.min(start, intervals[i].start);
      end = Math.max(end, intervals[i].end);
    }
  }

  return [...left, new Interval(start, end), ...right];
};

// Leetcode 252. Meeting Rooms (1)
/**
 * @param {Interval[]} intervals
 * @return {boolean}
 */
const canAttendMeetings = (intervals) => {
  intervals.sort((a, b) => a.start - b.start);

  let prevInterval = intervals[0];
  for (let i = 1; i < intervals.length; i += 1) {
    // overlap found
    if (intervals[i].start < prevInterval.end) return false;
    prevInterval = intervals[i];
  }
  return true;
};

// Leetcode 253. Meeting Rooms II (3)
/**
 * @param {Interval[]} intervals
 * @return {number}
 */
const minMeetingRooms = (intervals) => {
  if (intervals === undefined || intervals.length === 0) return 0;
  
  intervals.sort((a, b) => a.start - b.start);
  let minHeap = new Heap();
  minHeap.push(intervals[0].end);

  for (let i = 1; i < intervals.length; i += 1) {
    // pop prevInterval.end if non-overlapping (prevInterval.end < intervals[i].start)
    if (minHeap.peek() <= intervals[i].start) minHeap.pop();
    minHeap.push(intervals[i].end);
  }

  return minHeap.size();
};

// Leetcode 352. Data Stream as Disjoint Intervals (4)
function SummaryRanges() {
  let minHeap = new Heap((a, b) => a.start - b.start);

  const addNum = (val) => {
    minHeap.push(new Interval(val, val));
  };

  const getIntervals = () => {
    let temp = [];
    // if overlap(curr.start <= prev.end + 1), merge
    while (minHeap.size() !== 0) {
      let currInterval = minHeap.pop();
      if (temp.length === 0) temp.push(currInterval);
      else {
        let prevInterval = temp[temp.length-1];
        if (currInterval.start <= prevInterval.end + 1) prevInterval.end = Math.max(prevInterval.end, currInterval.end);
        else temp.push(currInterval);
      }
    }

    // copy temp = minHeap
    for (let interval of temp) minHeap.push(interval);
    return temp;
  }

  return {
    addNum,
    getIntervals
  }
}

// Leetcode 435. Non-overlapping Intervals (5)
// find the minimum number of intervals you need to remove to 
// make the rest of the intervals non-overlapping.
// ===
const eraseOverlapIntervals = (intervals) => {
  if (intervals.length === 0) return 0;
  intervals.sort((a, b) => a.end - b.end);

  let count = 0;
  let prevEnd = intervals[0].end;
  for (let i = 1; i < intervals.length; i += 1) {
    // Intervals like [1,2] and [2,3] have borders "touching" but they don't overlap each other.
    // non-overlapping
    if (prevEnd <= intervals[i].start) prevEnd = Math.max(prevEnd, intervals[i].end);
    else count += 1;
  }

  return count;
};

// Leetcode 986. Interval List Intersections (6)
/**
 * @param {Interval[]} A
 * @param {Interval[]} B
 * @return {Interval[]}
 */
const intervalIntersection = (A, B) => {
  let result = [];
  let ptrA = 0;
  let ptrB = 0;

  while (ptrA < A.length && ptrB < B.length) {
    let start = Math.max(A[ptrA].start, B[ptrB].start);
    let end = Math.min(A[ptrA].end, B[ptrB].end);
    // overlap
    if (start >= end) result.push(new Interval(start, end));
    else { // find next interval by smaller end
      if (A[ptrA].end < B[ptrB].end) ptrA += 1;
      else ptrB += 1
    }
  }

  return reseult;
};
