import { ArrayToList, ListNode, ArrayToTree, TreeNode } from "../structure/index.js";

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

// console.log("ans----maxSubArray", maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

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
 * 先排序，再合并连续区间
 * @param {number[][]} intervals
 * @return {number[][]}
 */
var merge = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0])
  const ans = [intervals[0]]

  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] <= ans[ans.length - 1][1]) {
      ans[ans.length - 1][1] = Math.max(intervals[i][1], ans[ans.length - 1][1])
    } else {
      ans.push(intervals[i])
    }
  }
  return ans
}
// console.log("merge====", merge([[1, 4], [0, 4]]));

/**
 * 59. 螺旋矩阵 II
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  const ans = new Array(n).fill(0).map(() => new Array(n))
  const layerHeight = Math.floor(n / 2)
  ans[layerHeight][layerHeight] = n * n
  let count = 0
  for (let layer = 0; layer < layerHeight; layer++) {
    for (let i = layer; i < n - layer - 1; i++) {
      ans[layer][i] = ++count
    }
    for (let i = layer; i < n - layer - 1; i++) {
      ans[i][n - layer - 1] = ++count
    }
    for (let i = layer; i < n - layer - 1; i++) {
      ans[n - layer - 1][n - 1 - i] = ++count
    }
    for (let i = layer; i < n - layer - 1; i++) {
      ans[n - 1 - i][layer] = ++count
    }
  }
  return ans
};
console.log("generateMatrix====", generateMatrix(1));

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
 * @tag 动态规划
 * 最后一步可以跨一步或者两步 f[i] = f[i - 1] + f[i - 2]，但是这里使用斐波那契递归算法会栈溢出
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
/**
 * 70. 爬楼梯
 * @tag 动态规划
 * 使用滚动数组优化 动规数组
 * 因为只需要 n-2,n-1,n 所以dp数组滚动更新即可
 */
var climbStairs = function (n) {
  if (n <= 2) return n

  // 滚动数组也可以变为，滚动常数
  // let dp2 = 0, dp1 = 1, dp = 2
  // for (let i = 2; i < n; i++) {
  //   dp2 = dp1
  //   dp1 = dp
  //   dp = dp2 + dp1
  // }
  // return dp;

  // 滚动数组
  const dp = [0, 1, 2]
  for (let i = 2; i < n; i++) {
    dp.shift()
    dp.push(dp[0] + dp[1])
  }
  return dp[2];
};

// console.log("climbStairs====", climbStairs(5));

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
// console.log("minDistance====", minDistance("intention", "execution"));

/**
 * 73. 矩阵置零
 * 先遍历一遍，若出现 0 修改该行首和该列首为 0 ，再次遍历首行和首列，补全 0 
 * 补全 0 时，matrix[0][0]需要特殊处理
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function (matrix) {
  const height = matrix.length
  const width = matrix[0].length
  let headRow = false, headCol = false // 处理 matrix[0][0]，是否补全首列/首行

  // 遍历修改首行和首列
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      if (matrix[i][j] === 0) {
        matrix[i][0] = 0
        matrix[0][j] = 0
        if (i === 0) headRow = true // 处理 matrix[0][0]
        if (j === 0) headCol = true // 处理 matrix[0][0]
      }
    }
  }

  // 补全 0 
  for (let i = 1; i < height; i++) {
    if (matrix[i][0] === 0) {
      for (let j = 0; j < width; j++) {
        matrix[i][j] = 0
      }
    }
  }
  for (let j = 1; j < width; j++) {
    if (matrix[0][j] === 0) {
      for (let i = 0; i < height; i++) {
        matrix[i][j] = 0
      }
    }
  }

  // 处理 matrix[0][0] 补全首列 0 
  if (headRow) {
    for (let j = 0; j < width; j++) {
      matrix[0][j] = 0
    }
  }
  // 处理 matrix[0][0] 补全首行 0 
  if (headCol) {
    for (let i = 1; i < height; i++) {
      matrix[i][0] = 0
    }
  }
  return matrix
};
// console.log("setZeroes====", setZeroes([[1, 2, 3, 4], [5, 0, 7, 8], [0, 10, 11, 12], [13, 14, 15, 0]]));
// console.log("setZeroes====", setZeroes([[1, 0, 3]]));

/**
 * 74. 搜索二维矩阵
 * 编写一个高效的算法来判断 m x n 矩阵中，是否存在一个目标值。该矩阵具有如下特性：
 *  每行中的整数从左到右按升序排列
 *  每行的第一个整数大于前一行的最后一个整数。
 * 
 *  从矩阵左下或者右上出发，看成一颗二叉树解决，复杂度O(m+n)
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  let m = matrix.length - 1;
  let n = 0;

  while (m >= 0 && n < matrix[0].length) {
    const temp = matrix[m][n];
    if (target < temp) {
      m--
    } else if (target > temp) {
      n++
    } else {
      return true
    }
  }
  return false
};
/**
 * 74. 搜索二维矩阵 2
 * 二分法 复杂度 log(m) + log(n)，二维两次二分搜索即可
 */
var searchMatrix = function (matrix, target) {
  let top = 0
  let bottom = matrix.length - 1
  const width = matrix[0].length
  while (top !== bottom) {
    const mid = Math.floor((top + bottom) / 2)
    if (target <= matrix[mid][width - 1]) {
      bottom = mid
    } else {
      top = mid + 1
    }
  }

  let left = 0;
  let right = width - 1;
  while (left !== right) {
    const mid = Math.floor((left + right) / 2)
    if (target <= matrix[top][mid]) {
      right = mid
    } else {
      left = mid + 1
    }
  }

  return matrix[top][left] === target
};
// console.log("searchMatrix===", searchMatrix([[1, 3, 5, 7], [10, 11, 16, 20], [23, 30, 34, 60]], 3));

/**
 * 82. 删除排序链表中的重复元素 II
 * 给定一个已排序的链表的头 head ， 删除原始链表中所有重复数字的节点，只留下不同的数字 。返回 已排序的链表
 * @tag 双指针
 * @param {ListNode} head
 * @return {ListNode}
 */
var deleteDuplicates = function (head) {
  const dummy = new ListNode(0, head);

  let cur = dummy;
  while (cur.next && cur.next.next) {
    // 记录重复节点值，while 消除
    if (cur.next.val === cur.next.next.val) {
      const duplicateVal = cur.next.val;
      while (cur.next && cur.next.val === duplicateVal) {
        cur.next = cur.next.next;
      }
    } else {
      cur = cur.next;
    }
  }
  return dummy.next;
};

// console.log("deleteDuplicates===", deleteDuplicates(ArrayToList([1, 3, 3, 3, 4, 5])).toString())

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
 * @tag 双指针
 * 左指针 red = 0 ，右指针 blue = length - 1，遍历一遍
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
  }
};
/**
 * 75. 颜色分类
 * @tag 双指针
 * @param {number[]} nums
 * @param {*} nums 
 * @returns 
 */
var sortColors = function (nums) {
  // 红白蓝：0 1 2
  let red = 0, white = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      let temp = nums[white]
      nums[white] = nums[i]
      nums[i] = temp
      white++
    } else if (nums[i] === 0) {
      let temp = nums[red]
      nums[red] = nums[i]
      nums[i] = temp
      if (red < white) {
        temp = nums[white]
        nums[white] = nums[i]
        nums[i] = temp
      }
      red++
      white++
    }
  }
  return nums
}
// console.log("sortColors====", sortColors([0, 1, 2, 0, 2, 1, 1]));

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

// console.log("isValidBST===", isValidBST(ArrayToTree([2, 1, 3, 0, 3])));
