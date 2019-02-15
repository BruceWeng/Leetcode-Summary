/**
 * Definition
 * 1. Given a price array
 * 2. Each day can be in hold, sold and rest state
 * 3. Each day can do buy, sell and rest action
 *
 * Template 1, no cooldown
 * Algorithm: Finite State Machine DP
 *
 * Finite State Machine:
 *
 * States: hold, sold
 * Actions: rest, sell, buy
 *
 *
 *                  sell
 *    rest -> hold -----> sold -> rest
 *         <-      <-----      <-
 *                   buy
 *
 * a. Each states stores max profit at day i
 * b. Transfer functions:
 * hold[i] = max(rest action from hold, buy action from sold)
 *         = max(hold[i-1], sold[i-1] - prices[i])
 * sold[i] = max(rest action from sold, sell action from hold)
 *         = max(sold[i-1], hold[i-1] + prices[i])
 *
 * c. Day 0 initialization for each stage:
 *    hold[0] = -prices[0] (paid prices[0])
 *    sold[0] = 0 (sell nothing)
 *
 * d. Answer: max(hold[n], sold[n])
 *
 * Constraint: at most k transactions
 * transaction update only after sell action:
 * 1. Only hold[i-1][k-1] + prices[i] use (k-1)th state
 * 2. Other stages use kth state
 *
 * A. From constraint, extend stages[i] to stages[i][j], let i = ith day, j = jth transaction
 *
 * B. Overall transfer function:
 * hold[i][j] = max(rest action from hold at jth transaction, buy action from sold at jth transaction)
 *            = max(hold[i-1][j], sold[i-1][j] - prices[i])
 * sold[i][j] = max(rest action from sold at jth transaction, sell action from hold at (j-1)th transaction)
 *            = max(sold[i-1][j], hold[i-1][j-1] + prices[i])
 *
 * C.1 Initialize day 0 with k transaction
 *     hold[0][j] = -prices[0] (paid prices[0])
 *     sold[0][j] = 0 (sell nothing)
 *
 * C.2 Initialize transaction 0 for ith day:
 *     hold[i][0] = max(
 *                      privous day hold but 0 transaction,
 *                      -prices[i] (paid prices[i])
 *                     )
 *     sold[i][0] = 0 (sell nothing)
 *
 * D. Answer = max(hold[n][k], sold[n][k])
 *
 * T: O(n*k), S: O(n*k)
 * Runtime: 100 ms
 *
 * Note: if k > n: infinite transaction
 * Problem reduced to quickSolve 122.
 *
 *
 * Template 2, with Cooldown
 * Finite State machine DP
 * Stages:              Actions:
 * hold (after buy)     buy
 * sold (after sell)    sell
 * rest (cooldown)      rest
 *
 * Finite State machine:
 *                    rest
 *                   /   ^
 *                  v   /
 *                  rest
 *            buy /     ^ rest
 *               v       \
 *    rest <- hold ----> sold
 *         ->      sell
 *
 * a. Each stage holds max profit for the day
 * b. transfer functions:
 *   b.1 hold[i] = max(rest action from hold, buy action from rest)
 *               = max(hold[i-1], rest[i-1] - prices[i])
 *   b.2 sold[i] = sell action from hold
 *               hold[i-1] + prices[i]
 *   b.3 rest[i] = max(rest action from rest, rest action from sold)
 *               = max(rest[i-1], sold[i-1])
 * c. Day 0 initialization for each stage:
 *    hold[0] = -prices[0] (paid prices[0])
 *    sold[0] = 0 (sell nothing)
 *    rest[0] = 0
 * d. Answer: max(rest[n], sold[n])
 *
 * T: O(n), S: O(n) (can be reduce to O(1))
 */

// 188. Best Time to Buy and Sell Stock IV
const maxProfit = (k, prices) => {
  if (k > prices.length / 2) return quickSolve(prices);

  let n = prices.length;

  let hold = [];
  for (let i = 0; i < n + 1; i += 1) {
    // row: n days
    hold.push(new Array(k + 1).fill(0)); // col: k+1 transactions
  }

  for (let j = 0; j < k + 1; j += 1) {
    // initial 0th day with k transaction
    hold[0][j] = -prices[0];
  }

  for (let i = 0; i < n; i += 1) {
    // initial 0th transaction at ith day
    hold[i + 1][0] = Math.max(hold[i][0], -prices[i]); // max(prev hold but no transaction, paid prices[i])
  }

  let sold = [];
  for (let i = 0; i < n + 1; i += 1) {
    // row: n days
    sold.push(new Array(k + 1).fill(0)); // col: k+1 transactions
  }

  // FSM DP
  for (let i = 0; i < n; i += 1) {
    // i is the index of prices[i], map to states[i+1]
    for (let j = 0; j < k; j += 1) {
      hold[i + 1][j + 1] = Math.max(hold[i][j + 1], sold[i][j + 1] - prices[i]);
      sold[i + 1][j + 1] = Math.max(sold[i][j + 1], hold[i][j] + prices[i]);
    }
  }

  return Math.max(hold[n][k], sold[n][k]);
};

const quickSolve = prices => {
  let profit = 0;
  let n = prices.length;

  for (let i = 1; i <= n; i += 1) {
    if (prices[i] > prices[i - 1]) profit += prices[i] - prices[i - 1];
  }

  return profit;
};

// 309. Best Time to Buy and Sell Stock with Cooldown
const maxProfit = prices => {
  let n = prices.length;
  let hold = new Array(n + 1).fill(0);
  hold[0] = -prices[0];
  let sold = new Array(n + 1).fill(0);
  let rest = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i += 1) {
    // i is the index of prices[i], map to states[i+1]
    hold[i + 1] = Math.max(hold[i], rest[i] - prices[i]);
    sold[i + 1] = hold[i] + prices[i];
    rest[i + 1] = Math.max(rest[i], sold[i]);
  }

  return Math.max(rest[n], sold[n]);
};
