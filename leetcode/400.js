import { ArrayToTree } from "../structure/ArrayToTree.js";

/**
 * 300. 最长递增子序列
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  const dp = new Array(nums.length);
  dp[0] = 1;
  let maxans = 1;
  //从1开始计算dp[i]
  for (let i = 1; i < nums.length; i++) {
    dp[i] = 1;
    //从0到i遍历，根据动规数组获取当前i最优解
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    //更新最大值
    maxans = Math.max(maxans, dp[i]);
  }
  return maxans;
};

// console.log("lengthOfLIS===" + lengthOfLIS([3, 1, 3, 4, 2]));

/**
 * 301. 删除无效的括号
 * 1.第一遍遍历获取要删除的左括号或者右括号长度
 * 2.通过深度优先遍历获取删除可能的所有括号的结果
 * 3.Set去重
 * @param {string} s
 * @return {string[]}
 */
var removeInvalidParentheses = function (s) {
  let leftRemove = 0;
  let rightRemove = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      leftRemove++;
    } else if (s[i] === ")") {
      if (leftRemove > 0) {
        leftRemove--;
      } else {
        rightRemove++;
      }
    }
  }
  const arr = new Array();
  const dfs = (index, leftCount, rightCount, leftRemove, rightRemove, path) => {
    if (index === s.length) {
      if (leftRemove === 0 && rightRemove === 0) {
        arr.push(path);
      }
      return;
    }

    //1.删除括号，path不变
    if (s[index] === "(" && leftRemove > 0) {
      dfs(index + 1, leftCount, rightCount, leftRemove - 1, rightRemove, path);
    }
    if (s[index] === ")" && rightRemove > 0) {
      dfs(index + 1, leftCount, rightCount, leftRemove, rightRemove - 1, path);
    }

    //2.不修改字符，path加入该字符
    path += s[index];
    if (s[index] === "(") {
      dfs(index + 1, leftCount + 1, rightCount, leftRemove, rightRemove, path);
    } else if (s[index] === ")") {
      //右括号仅在小于左括号数量时加入path
      if (rightCount < leftCount) {
        dfs(
          index + 1,
          leftCount,
          rightCount + 1,
          leftRemove,
          rightRemove,
          path
        );
      }
    } else {
      dfs(index + 1, leftCount, rightCount, leftRemove, rightRemove, path);
    }
  };
  dfs(0, 0, 0, leftRemove, rightRemove, "");
  return Array.from(new Set(arr));
};

// console.log(
//   "removeInvalidParentheses===" + removeInvalidParentheses("()())()")
// );

/**
 * 309. 最佳买卖股票时机含冷冻期
 * f[i][0]: 手上持有股票的最大收益
 * f[i][1]: 手上不持有股票，并且处于冷冻期中的累计最大收益
 * f[i][2]: 手上不持有股票，并且不在冷冻期中的累计最大收益
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length === 0) return 0;
  const dp = new Array(prices.length).fill(0).map(() => new Array(3));
  dp[0][0] = -prices[0];
  dp[0][1] = 0;
  dp[0][2] = 0;
  for (let i = 1; i < prices.length; i++) {
    dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - prices[i]);
    dp[i][1] = dp[i - 1][0] + prices[i];
    dp[i][2] = Math.max(dp[i - 1][1], dp[i - 1][2]);
  }
  return Math.max(dp[prices.length - 1][1], dp[prices.length - 1][2]);
};

// console.log("maxProfit===" + maxProfit([1, 2, 3, 0, 2]));

/**
 * 312. 戳气球
 * 二维数组动态规划rec[][]
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
  const n = nums.length;
  const val = [1, ...nums, 1]; //扩增数值数组
  const rec = new Array(n + 2).fill(1).map(() => new Array(n + 2).fill(0)); //动规数组
  //i从n到0
  for (let i = n - 1; i >= 0; i--) {
    //j从i到n
    for (let j = i + 2; j <= n + 1; j++) {
      //i到j之间，取最优解
      for (let k = i + 1; k < j; k++) {
        let sum = val[i] * val[k] * val[j];
        sum += rec[i][k] + rec[k][j];
        rec[i][j] = Math.max(rec[i][j], sum);
      }
    }
  }
  return rec[0][n + 1];
};

// console.log("maxCoins===" + maxCoins([3, 1, 5, 8]));

/**
 * 322. 零钱兑换
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  if (amount < 1) return 0;
  //所有数量的money数组
  const count = new Array(amount + 1).fill(0);

  //获取该money的最小计数
  const change = (money) => {
    //无效money
    if (money < 0) return Infinity;
    //money为0
    if (money === 0) return 0;
    //已记录的money直接返回
    if (count[money] !== 0) return count[money];

    let min = Infinity;
    //遍历coins数组所有情况
    for (const coin of coins) {
      let res = change(money - coin);
      //去最小值
      min = Math.min(res + 1, min);
    }
    count[money] = min;
    return count[money];
  };
  const ans = change(amount);
  return ans === Infinity ? -1 : ans;
};

// console.log("coinChange===" + coinChange([2], 3));

/**
 * 337. 打家劫舍 III
 * 和之前的打家劫舍相似，用长度为2的数组表示选中该节点或是子节点
 * @param {ArrayToTree} root
 * @return {number}
 */
var rob = function (root) {
  const search = (node) => {
    if (!node) return [0, 0];
    const left = search(node.left);
    const right = search(node.right);
    const selected = node.val + left[1] + right[1]; //选择当前节点，则跳过子节点
    const notSelected =
      Math.max(left[0], left[1]) + Math.max(right[0], right[1]); //不选择当前节点，取子节点
    return [selected, notSelected];
  };
  return Math.max(...search(root));
};

console.log("rob===", rob(ArrayToTree([3, 2, 3, null, 3, null, 1])));

