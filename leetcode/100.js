import { List, ListNode, Tree, TreeNode } from "../structure/index.js";

/**
 * 53. 最大子序和
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  // 动态规划算法
  // let pre = 0;
  // let max = nums[0];
  // nums.forEach((item) => {
  //   pre = Math.max(item, item + pre);
  //   max = Math.max(max, pre);
  // });
  // return max;

  // 分治算法，线段树
  function Status(l, r, m, i) {
    this.lSum = l;
    this.rSum = r;
    this.mSum = m;
    this.iSum = i;
  }

  const pushUp = (l, r) => {
    const iSum = l.iSum + r.iSum;
    const lSum = Math.max(l.lSum, l.iSum + r.lSum);
    const rSum = Math.max(r.rSum, r.iSum + l.rSum);
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);
    return new Status(lSum, rSum, mSum, iSum);
  };

  const getInfo = (a, l, r) => {
    console.log(l, r);
    if (l === r) {
      return new Status(a[l], a[l], a[l], a[l]);
    }
    const m = (l + r) >> 1;
    const lSub = getInfo(a, l, m);
    const rSub = getInfo(a, m + 1, r);
    return pushUp(lSub, rSub);
  };

  return getInfo(nums, 0, nums.length - 1).mSum;
};

console.log("ans----", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

/**
 * 54. 螺旋矩阵
 *  m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素
 * 每层逐层递归
 * @param {number[][]} matrix
 * @return {number[]}
 */
var spiralOrder = function (matrix) {
  const ans = [];
  const circle = (left, top, right, bottom) => {
    if (right < left || bottom < top) return;
    for (let i = left; i <= right; i++) {
      ans.push(matrix[top][i]);
    }
    for (let i = top + 1; i <= bottom; i++) {
      ans.push(matrix[i][right]);
    }
    if (right > left && bottom > top) {
      for (let i = right - 1; i >= left; i--) {
        ans.push(matrix[bottom][i]);
      }
      for (let i = bottom - 1; i > top; i--) {
        ans.push(matrix[i][left]);
      }
    }

    circle(left + 1, top + 1, right - 1, bottom - 1);
  };
  circle(0, 0, matrix[0].length - 1, matrix.length - 1);
  return ans;
};

// console.log(
//   "spiralOrder===",
//   spiralOrder([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//   ])
// );

/**
 * 55. 跳跃游戏
 * 贪心算法，每次计算当前最右边可以跳到多远
 * 给定一个非负整数数组 nums ，你最初位于数组的 第一个下标
 * 数组中的每个元素代表你在该位置可以跳跃的最大长度
 * 判断你是否能够到达最后一个下标
 * @param {number[]} nums
 * @return {boolean}
 */
var canJump = function (nums) {
  let right = 0;
  for (let index = 0; index < nums.length - 1; index++) {
    //在right可跳的范围内，每次遍历都更新最右边right
    if (index <= right) {
      right = Math.max(right, index + nums[index]);
      if (right >= nums.length - 1) {
        return true;
      }
    }
  }
  return right >= nums.length - 1;
};

// console.log("canJump===", canJump([3, 0, 4, 1, 0, 0]));

/**
 * 56. 合并区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  let ans = [];
  intervals.sort((a, b) => a[0] - b[0]);
  intervals.forEach((item) => {
    console.log(ans, item);
    if (ans[ans.length - 1] && item[0] <= ans[ans.length - 1][1]) {
      ans[ans.length - 1][1] = Math.max(ans[ans.length - 1][1], item[1]);
    } else {
      ans.push(item);
    }
  });
  return ans;
};

// console.log(
//   "===",
//   merge([
//     [1, 4],
//     [2, 3],
//   ])
// );

/**
 * 62. 不同路径
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function (m, n) {
  const arr = new Array(m).fill(0).map((item) => new Array(n));
  arr[0] = new Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    arr[i][0] = 1;
    for (let j = 1; j < n; j++) {
      arr[i][j] = arr[i - 1][j] + arr[i][j - 1];
    }
  }
  return arr[m - 1][n - 1];
};

// console.log("===", uniquePaths(3, 7));

/**
 * 64. 最小路径和
 * f(i,j) = grid[i][j] + min(f(i-1,j),f(i,j-1))
 * @param {number[][]} grid
 * @return {number}
 */
var minPathSum = function (grid) {
  const m = grid.length;
  const n = grid[0].length;
  const distance = [...grid];
  distance[0][0] = grid[0][0];
  for (let i = 1; i < m; i++) {
    distance[i][0] = distance[i - 1][0] + grid[i][0];
  }
  for (let i = 1; i < n; i++) {
    distance[0][i] = distance[0][i - 1] + grid[0][i];
  }
  for (let i = 1; i < m; i++) {
    for (let j = 1; j < n; j++) {
      distance[i][j] =
        grid[i][j] + Math.min(distance[i - 1][j], distance[i][j - 1]);
    }
  }
  return distance[m - 1][n - 1];
};

// console.log(
//   "===",
//   minPathSum([
//     [1, 2, 3],
//     [4, 5, 6],
//   ])
// );

/**
 * 70. 爬楼梯
 * 动态规划，最后一步可以跨一步或者两步 f[i] = f[i - 1] + f[i - 2]
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  const dpFib = new Array(n + 1);
  dpFib[0] = dpFib[1] = 1;
  for (let i = 2; i < n + 1; i++) {
    dpFib[i] = dpFib[i - 1] + dpFib[i - 2];
  }
  return dpFib[n];
};

// console.log("===", climbStairs(6));

/**
 * 72. 编辑距离
 * 给你两个单词 word1 和 word2，请你计算出将 word1 转换成 word2 所使用的最少操作数
 * 定义二维数组 横轴是word1数组 纵轴是word2数组
 * 动态规划
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
var minDistance = function (word1, word2) {
  let dp = new Array(word1.length + 1)
    .fill(0)
    .map((item) => new Array(word2.length + 1));
  //左侧word1
  for (let i = 0; i < word1.length + 1; i++) {
    dp[i][0] = i;
  }
  //上侧word2
  for (let i = 0; i < word2.length + 1; i++) {
    dp[0][i] = i;
  }

  for (let i = 1; i < word1.length + 1; i++) {
    for (let j = 1; j < word2.length + 1; j++) {
      let left = dp[i][j - 1] + 1; //增删操作+1
      let up = dp[i - 1][j] + 1; //增删操作+1
      let leftUp = dp[i - 1][j - 1] + 1; //修改操作+1
      if (word1[i - 1] === word2[j - 1]) {
        leftUp = leftUp - 1; //如果该处字母相同，则不用操作
      }
      dp[i][j] = Math.min(left, up, leftUp);
    }
  }

  return dp[word1.length][word2.length];
};

// console.log("===", minDistance("intention", "execution"));

/**
 * 91. 解码方法
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  let temp = 0; //当前动规
  let pre = 1; //动规dp[i-1]
  let pre_pre = 1; //动规dp[i-2]
  for (let i = 0; i < s.length; i++) {
    temp = s[i] !== "0" ? pre : 0;
    if (s[i - 1] !== "0" && s[i - 1] * 10 + s[i] * 1 < 27) {
      temp += pre_pre;
    }
    //更新动规值
    pre_pre = pre;
    pre = temp;
  }

  return temp;
};

// console.log("===", numDecodings("1"));

/**
 * 75. 颜色分类
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let red = 0;
  let blue = nums.length - 1; //蓝色 2
  let point = 0;
  while (point <= blue) {
    if (nums[point] === 0) {
      nums[point] = nums[red];
      nums[red] = 0;
      red++;
      point++;
    } else if (nums[point] === 2) {
      nums[point] = nums[blue];
      nums[blue] = 2;
      blue--;
    } else {
      point++;
    }
    console.log(nums, point, blue);
  }
  return nums;
};

// console.log("===", sortColors([0, 1, 2, 0, 2, 1, 1]));

/**
 * 78. 子集
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const ans = [];
  const length = nums.length;
  //假设len为6
  //1左移len位:1000000，即遍历000000到111111
  const binary = 1 << length;
  for (let i = 0; i < binary; i++) {
    const temp = [];
    for (let j = 0; j < nums.length; j++) {
      if (i & (1 << j)) {
        temp.push(nums[j]);
      }
    }
    ans.push(temp);
  }
  return ans;
};

// console.log("===", subsets([1, 2, 3]));

/**
 * 79. 单词搜索
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function (board, word) {
  const maxM = board.length - 1;
  const maxN = board[0].length - 1;
  const nextStep = (m, n, i) => {
    board[m][n] = false;
    if (findNext(m, n, i + 1)) {
      return true;
    } else {
      board[m][n] = word[i];
    }
  };
  const findNext = (m, n, i) => {
    console.log(m, n, i);
    if (i === word.length) {
      return true;
    }
    if (m < maxM && board[m + 1][n] === word[i]) {
      if (nextStep(m + 1, n, i)) return true;
    }
    if (m > 0 && board[m - 1][n] === word[i]) {
      if (nextStep(m - 1, n, i)) return true;
    }
    if (n < maxN && board[m][n + 1] === word[i]) {
      if (nextStep(m, n + 1, i)) return true;
    }

    if (n > 0 && board[m][n - 1] === word[i]) {
      if (nextStep(m, n - 1, i)) return true;
    }
    return false;
  };
  for (let i = 0; i <= maxM; i++) {
    for (let j = 0; j <= maxN; j++) {
      if (board[i][j] === word[0] && nextStep(i, j, 0)) {
        return true;
      }
    }
  }
  return false;
};

// console.log("===", exist([["A", "A"]], "AAA"));

/**
 * 94. 二叉树的中序遍历
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
  //1.迭代算法
  const ans = new Array();
  const next = (node) => {
    if (!node || node.val === null) {
      return;
    }
    node.left && next(node.left);
    ans.push(node.val);
    node.right && next(node.right);
  };
  next(root);
  return ans;

  //2.递归算法
  // const ans = new Array();
  // const next = (node) => {
  //   if (!node || node.val === null) {
  //     return;
  //   }

  //   node.left && next(node.left);
  //   ans.push(node.val);
  //   node.right && next(node.right);
  // };
  // next(root);
  // return ans;
};
// const myRoot = new TreeNode(1, null, new TreeNode(2, new TreeNode(3)));
// console.log("===", inorderTraversal(myRoot));

/**
 * 96. 不同的二叉搜索树
 * @param {number} n
 * @return {number}
 */
var numTrees = function (n) {
  const dp = new Array(n + 1);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    let temp = 0;
    for (let j = 0; j < parseInt(i / 2); j++) {
      temp += dp[j] * dp[i - j - 1];
    }
    dp[i] = 2 * temp;
    if ((i - 1) % 2 === 0) {
      const mid = (i - 1) / 2;
      dp[i] += Math.pow(dp[mid], 2);
    }
  }
  return dp[n];
};

// console.log("===", numTrees(4));

/**
 * 98. 验证二叉搜索树
 * 给定一个二叉树，判断其是否是一个有效的二叉搜索树
 * 给定一个子树的最大最小值，递归求解
 * @param {TreeNode} root
 * @return {boolean}
 */
var isValidBST = function (root) {
  const isValidChildTree = (node, min, max) => {
    const { val, left, right } = node;
    // console.log(node.toString(), min, max);

    if (
      left &&
      !(left.val < val && left.val > min && isValidChildTree(left, min, val))
    ) {
      return false;
    }

    if (
      right &&
      !(right.val > val && right.val < max && isValidChildTree(right, val, max))
    ) {
      return false;
    }
    return true;
  };
  return isValidChildTree(root, -Infinity, Infinity);
};

// console.log("isValidBST===", isValidBST(Tree([2, 1, 3, 0, 3])));