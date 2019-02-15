/**
 * Definition
 * 1. Given matrix
 * 2. Find optimized path in the matrix
 *
 * Template
 * 1. Initialize initial stages[][]
 *    1.1 find count: 1
 *    1.2 find sum: presum
 * 2. Iterate the matrix:
 *    // some condition
 *    stages[i][j] = max/min/sum(stages[i][j-1] left, stages[i-1][j] top)
 *    // some condition
 *    reset stages value
 * 3. return stages[m-1][n-1]
 * 4. Note stages[m][n] can be reduced to currStage[m] and prevStage[m]
 */

// 62. Unique Paths
const uniquePaths = function(m, n) {
  let stages = new Array(n).fill(1);

  for (let i = 1; i < m; i += 1) {
    for (let j = 1; j < n; j += 1) {
      stages[j] = stages[j] + stages[j - 1];
    }
  }

  return stages[n - 1];
};

// 63. Unique Paths II
const uniquePathsWithObstacles = function(obstacleGrid) {
  let n = obstacleGrid[0].length;
  // stages need to be initiated with 0 instead of 1 because once obstacleRow[j] === 1,
  // all the following stages[j] should be 0
  let stages = new Array(n).fill(0);
  stages[0] = 1;

  for (let obstacleRow of obstacleGrid) {
    for (let j = 0; j < n; j += 1) {
      if (obstacleRow[j] === 1) {
        stages[j] = 0;
      } else if (j > 0) {
        stages[j] = stages[j] + stages[j - 1];
      }
    }
  }

  return stages[n - 1];
};

// 64. Minimum Path Sum
const minPathSum = function(grid) {
  if (grid.length === 0 || grid[0].length === 0) return 0;

  let m = grid.length;
  let n = grid[0].length;
  // Initiate preSum to first row
  for (let j = 1; j < n; j += 1) {
    grid[0][j] += grid[0][j - 1];
  }

  // Initate preSum to first col
  for (let i = 1; i < m; i += 1) {
    grid[i][0] += grid[i - 1][0];
  }

  for (let j = 1; j < n; j += 1) {
    for (let i = 1; i < m; i += 1) {
      grid[i][j] += Math.min(grid[i - 1][j], grid[i][j - 1]);
    }
  }
  return grid[m - 1][n - 1];
};
