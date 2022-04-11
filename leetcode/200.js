import { List, ListNode } from "../structure/index.js";

/**
 * 151. 翻转字符串里的单词
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let ans = "";
  let j = 0;
  for (let i = s.length - 1; i >= -1; --i) {
    if ((s[i] === " " || i === -1) && j > 0) {
      let temp = " " + s.substring(i + 1, i + j + 1);
      ans += temp;
      j = 0;
    } else if (s[i] !== " ") {
      j++;
    }
    // console.log(j, i);
  }
  return ans.substring(1, ans.length);
};

// console.log("reverseWords===", reverseWords("the sky is blue"));

/**
 * 152. 乘积最大子数组
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = nums[0];
  let tempMax = nums[0];
  let tempMin = nums[0];
  for (let i = 1; i < nums.length; i++) {
    const tempMaxs = tempMax;
    tempMax = Math.max(tempMax * nums[i], tempMin * nums[i], nums[i]);
    tempMin = Math.min(tempMaxs * nums[i], tempMin * nums[i], nums[i]);
    console.log(tempMax, tempMin);
    max = Math.max(tempMax, max);
  }
  return max;
};

// console.log("maxProduct===", maxProduct([2, -5, -2, -4, 3]));

/**
 * 155. 最小栈
 * initialize your data structure here.
 */
var MinStack = function () {
  this.value = new Array();
};

/**
 * @param {number} val
 * @return {void}
 */
MinStack.prototype.push = function (val) {
  return this.value.push(val);
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  return this.value.pop();
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.value[this.value.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function () {
  return Math.min(...this.value);
};

/**
 * 159. 至多包含两个不同字符的最长子串
 * @tag 滑动窗口
 * 滑动窗口[left,right]，使用map存储left和right的下标
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  if (s.length < 3) {
    return s.length;
  }
  let maxLength = 2;
  let left = 0;
  let right = 1;

  const map = new Map([
    [s[0], 0],
    [s[1], 1],
  ]);

  while (right < s.length) {
    // map更新有右侧窗口下标
    map.set(s[right], right);

    // map长度大于2，则更新左侧窗口下标
    if (map.size > 2) {
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

// console.log(lengthOfLongestSubstringTwoDistinct("aabbccc"));

/**
 * 160. 相交链表
 * 双指针法，headA，headB一起遍历next，headA到最后一位则指向headB头节点，headB到最后一位也指向headA头节点
 * 假设headA长度m，headB长度n，则如果有交叉，则在m+n次遍历内重合（出现在[max(m,n),m+n]次中）
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
var getIntersectionNode = function (headA, headB) {
  let pA = headA;
  let pB = headB;
  let count = 0;
  while (pA.val !== pB.val) {
    if (pA.next) {
      pA = pA.next;
    } else {
      pA = headB;
      count++;
    }
    if (pB.next) {
      pB = pB.next;
    } else {
      pB = headA;
      count++;
    }
    if (count > 2) {
      pA = null;
      break;
    }
  }
  return pA;
};

// console.log(
//   "getIntersectionNode===",
//   getIntersectionNode(List([1, 3, 5, 7, 9, 11]), List([2, 4, 8, 10]))
// );

/**
 * 169. 多数元素
 * Boyer-Moore 投票算法
 * 遍历数字，只要和候选数不同，则两两抵消，剩下来的一定是众数
 * 使用count计数，计算两两抵消以及更新候选数
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  let item = nums[0];
  let count = 0;
  for (let i = 0; i < nums.length; i++) {
    if (count === 0) {
      item = nums[i];
    }
    if (item === nums[i]) {
      count++;
    } else {
      count--;
    }
    // console.log(item, count);
  }
  //   console.log(item);
  return item;
};

// console.log("majorityElement===", majorityElement([1, 2, 1, 2, 1, 2, 1]));

/**
 * 198. 打家劫舍
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    dp[i] = Math.max(dp[i - 2] || 0, dp[i - 3] || 0) + nums[i];
  }
  console.log(dp);
  return Math.max(dp[nums.length - 2] || 0, dp[nums.length - 1] || 0);
};

// console.log("rob===", rob([0]));

/**
 * 200. 岛屿数量
 * @param {character[][]} grid
 * @return {number}
 */
var numIslands = function (grid) {
  let count = 0;
  let m = grid.length;
  let n = grid[0].length;

  const DFS = (i, j) => {
    grid[i][j] = "0";
    if (i > 0 && grid[i - 1][j] === "1") DFS(i - 1, j);
    if (j > 0 && grid[i][j - 1] === "1") DFS(i, j - 1);
    if (i < m - 1 && grid[i + 1][j] === "1") DFS(i + 1, j);
    if (j < n - 1 && grid[i][j + 1] === "1") DFS(i, j + 1);
  };
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (grid[i][j] === "1") {
        DFS(i, j);
        count++;
      }
    }
  }
  return count;
};

// console.log(
//   "numIslands===",
//   numIslands([
//     ["1", "1", "1"],
//     ["0", "1", "0"],
//     ["1", "1", "1"],
//   ])
// );