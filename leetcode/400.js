import { ArrayToTree, ArrayToList, ListNode } from "../structure/index.js";

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
 * 328. 奇偶链表
 * 新建一个奇节点和一个偶节点，一次遍历更新
 * @param {ListNode} head
 * @return {ListNode}
 */
var oddEvenList = function (head) {
  if (!head || !head.next) return head

  let single = head, double = head.next
  const doubleHead = double // 另存偶链表头节点

  while (double && double.next) {
    // 奇链表更新
    single.next = double.next
    single = single.next

    // 偶链表更新（基于奇链表更新）
    double.next = single.next
    double = double.next
  }
  single.next = doubleHead
  return head
};
// console.log("oddEvenList====" + oddEvenList(ArrayToList([1, 2, 3, 4, 5])));

/**
 * 334. 递增的三元子序列
 * 双向遍历
 * @param {number[]} nums
 * @return {boolean}
 */
var increasingTriplet = function (nums) {
  const len = nums.length
  if (len < 3) {
    return false
  }

  const leftMin = [...nums]
  const rightMax = [...nums]

  for (let i = 1; i < len; i++) {
    leftMin[i] = Math.min(nums[i], leftMin[i - 1])
  }
  for (let i = len - 2; i >= 0; i--) {
    rightMax[i] = Math.max(nums[i], rightMax[i + 1])
  }

  for (let i = 0; i < len; i++) {
    if (leftMin[i] < nums[i] && rightMax[i] > nums[i]) {
      return true
    }
  }
  return false
};
/**
 * 334. 递增的三元子序列
 * @tag 贪心算法
 * 每一次遍历更新最小值，第二小值
 */
var increasingTriplet = function (nums) {
  const n = nums.length
  if (n < 3) {
    return false
  }
  let first = nums[0], second = Infinity
  for (let i = 1; i < n; i++) {
    const num = nums[i]
    if (num > second) {
      // first < second < num
      return true
    } else if (num > first) {
      // first < num < second 更新第二小值
      second = num
    } else {
      // num < first < second 更新最小值
      first = num
    }
  }
  return false
};
// console.log("increasingTriplet====" + increasingTriplet([20, 100, 10, 12, 5, 13]));

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
// console.log("rob===", rob(ArrayToTree([3, 2, 3, null, 3, null, 1])));

/**
 * 340. 至多包含 K 个不同字符的最长子串
 * 和「 159. 至多包含两个不同字符的最长子串」一致解法
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  if (s.length < k + 1) {
    return s.length;
  }

  let maxLength = 0;
  let left = 0;
  let right = 0;

  const map = new Map();

  while (right < s.length) {
    // map更新有右侧窗口下标
    map.set(s[right], right);

    // map长度大于2，则更新左侧窗口下标
    if (map.size > k) {
      // map中value最小值即原左侧窗口下标
      let minValue = Infinity;
      let minKey = 0;
      map.forEach((value, key) => {
        if (value < minValue) {
          minValue = value;
          minKey = key;
        }
      });
      // 删除原左侧下标
      map.delete(minKey);
      // 更新现在左下标
      left = minValue + 1;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
};

/**
 * 388. 文件的最长绝对路径
 * @tag 栈
 * 将 input 分割成二维数组，遍历一维部分即是路径，二维部分入栈判断最长路径
 * @param {string} input
 * @return {number}
 */
var lengthLongestPath = function (input) {
  if (!input.includes('.')) return 0

  const pathArr = input.split('\n').map(item => item.split('\t'))
  const stack = [pathArr[0][pathArr[0].length - 1]]
  let ans = stack.join('').length + stack.length - 1

  for (let i = 1; i < pathArr.length; i++) {
    // 每次遍历都先清理上一次路径的路径层数
    const popLen = pathArr[i - 1].length - pathArr[i].length + 1
    for (let j = 0; j < popLen; j++) {
      stack.pop()
    }

    // 当前文件名
    const name = pathArr[i][pathArr[i].length - 1]
    stack.push(name)

    // 该路径是文件则更新路径长度
    if (name.includes('.')) {
      ans = Math.max(ans, stack.join('').length + stack.length - 1)
    }
  }

  return ans
};