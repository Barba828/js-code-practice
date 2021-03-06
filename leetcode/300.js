import { ArrayToTree, TreeNode } from "../structure/index.js";

/**
 * 258. 各位相加
 * @param {number} num
 * @return {number}
 */
var addDigits = function (num) {
  if (num === 0) {
    return num;
  }
  return num % 9 === 0 ? 9 : num % 9;
};

// console.log('addDigits====', addDigits(38));

/**
 * 279. 完全平方数
 * 贪心算法
 * @param {number} n
 * @return {number}
 */
var numSquares = function (n) {
  //set存储平方数
  const square_nums = new Set();
  for (let i = 1; i * i <= n; ++i) {
    square_nums.add(i * i);
  }

  //n是否由count个平方数组成
  const is_divided_by = (n, count) => {
    // console.log(n, count);
    if (count === 1) {
      return square_nums.has(n);
    }
    for (const square of square_nums) {
      if (is_divided_by(n - square, count - 1)) {
        return true;
      }
    }
    return false;
  };

  //遍历count
  for (let count = 1; count <= n; ++count) {
    if (is_divided_by(n, count)) return count;
  }
  return count;
};

// console.log("numSquares===" + numSquares(12));

/**
 * 283. 移动零
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    nums[i - count] = nums[i];
    if (nums[i] === 0) {
      ++count;
    }
  }
  for (let i = nums.length - count; i < nums.length; i++) {
    nums[i] = 0;
  }
  return nums;
};
// console.log("moveZeroes===" + moveZeroes([3, 0, -2, 1, 4, 0, 5]));

/**
 * 287. 寻找重复数
 * 该方法修改了原数组不可取
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let p = 0;
  while (true) {
    //以查询则break
    if (nums[p] === true) {
      break;
    } else {
      //查询第p位，并赋值位true表示已查，询下一个查询nums[p]位
      let temp = nums[p];
      nums[p] = true;
      p = temp;
    }
  }
  return p;
};

/**
 * 287. 寻找重复数
 * 快慢指针解法
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = 0;
  let fast = 0;
  // 寻找快慢指针相遇的点
  do {
    slow = nums[slow]; // 慢指针走一步
    fast = nums[nums[fast]]; // 快指针走两步
  } while (slow !== fast);

  // 142. 环形链表 II
  // 根据快慢指针封闭环算法，指针A到入环口的距离 = 指针B在环内循环（n-1）次的距离 + 相遇点到入环口的距离
  slow = 0;

  while (slow !== fast) {
    // 3.相遇之时肯定是环入口
    slow = nums[slow]; // 1.指针A从零走到入环口
    fast = nums[fast]; // 2.指针B从相遇点开始环内转圈走
  }
  return slow; // 环入口即是重复的数字
};
// console.log("findDuplicate===" + findDuplicate([3, 1, 2, 2, 4]));


/**
 * 297. 二叉树的序列化与反序列化
 * Encodes a tree to a single string.
 * 序列化
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  let preorder = ''
  const rserialize = (node) => {
    if (!node) {
      preorder += '#,'
      return
    }

    preorder += node.val + ','
    rserialize(node.left)
    rserialize(node.right)
  }
  rserialize(root)
  return preorder
};
/**
 * Decodes your encoded data to tree.
 * 反序列化
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const preorder = data.split(',')
  const rdeserialize = (order) => {
    const value = order.shift()
    if (value === '#') {
      return null
    }

    return new TreeNode(Number(value), rdeserialize(order), rdeserialize(order))
  }

  return rdeserialize(preorder)
};
// const serials = serialize(ArrayToTree([1, 2, 3, null, null, 4, 5]))
// console.log("serialize===", serials);
// console.log("deserialize===", deserialize(serials));

/**
 * 300. 最长递增子序列
 * @tag 动态规划
 * 和 435. 无重叠区间 解法相似
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  if (nums.length == 0) {
    return 0;
  }
  const len = nums.length
  const dp = new Array(len).fill(1)

  for (let i = 1; i < len; i++) {
    // 更新dp[i]: 遍历 0 - i
    for (let j = 0; j < i; j++) {
      if (nums[j] < nums[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
  }

  return Math.max(...dp)
}

// console.log("lengthOfLIS===" + lengthOfLIS([1]));
