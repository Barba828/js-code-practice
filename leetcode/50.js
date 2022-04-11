import { List, ListNode, Tree, TreeNode } from "../structure/index.js";

/**
 * 4. 寻找两个正序数组的中位数
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  // make sure to do binary search for shorten array
  if (nums1.length > nums2.length) {
    [nums1, nums2] = [nums2, nums1];
  }
  const m = nums1.length;
  const n = nums2.length;
  let low = 0;
  let high = m;
  while (low <= high) {
    const i = low + Math.floor((high - low) / 2);
    const j = Math.floor((m + n + 1) / 2) - i;

    const maxLeftA = i === 0 ? -Infinity : nums1[i - 1];
    const minRightA = i === m ? Infinity : nums1[i];
    const maxLeftB = j === 0 ? -Infinity : nums2[j - 1];
    const minRightB = j === n ? Infinity : nums2[j];

    if (maxLeftA <= minRightB && minRightA >= maxLeftB) {
      return (m + n) % 2 === 1
        ? Math.max(maxLeftA, maxLeftB)
        : (Math.max(maxLeftA, maxLeftB) + Math.min(minRightA, minRightB)) / 2;
    } else if (maxLeftA > minRightB) {
      high = i - 1;
    } else {
      low = low + 1;
    }
  }
};

// console.log("===", findMedianSortedArrays([1, 2], [-1, 3]));

/**
 * 6. Z 字形变换
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
var convert = function (s, numRows) {
  const arr = s.split("");
  const ans = new Array();
  let width = (numRows - 1) * 2;
  width = width === 0 ? 1 : width;
  for (let index = 0; index < numRows; index++) {
    let location = index;
    let distance = (numRows - index - 1) * 2;
    while (arr[location]) {
      ans.push(arr[location]);
      location = distance === 0 ? location + width : location + distance;
      distance = distance === width ? width : width - distance;
    }
  }
  return ans.join("");
};

// console.log(convert("ABCDEFG", 4));

/**
 * 9. 回文数
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 == 0 && x !== 0)) {
    return false;
  }
  let reverse = 0;
  let temp = x;
  while (temp > reverse) {
    reverse = reverse * 10 + (temp % 10);
    temp = Math.floor(temp / 10);
  }
  console.log(temp, reverse);
  return reverse === temp || Math.floor(reverse / 10) === temp;
};

// console.log("isPalindrome===", isPalindrome(10));

/**
 * 剑指 Offer 09. 用两个栈实现队列
 */
var CQueue = function () {
  // stack 只能使用 push 和 pop 操作
  this.inStack = [];
  this.outStack = [];
};

/**
 * @param {number} value
 * @return {void}
 */
CQueue.prototype.appendTail = function (value) {
  // this.inStack = [];
  // while (this.outStack.length > 0) {
  //   this.inStack.push(this.outStack.pop());
  // }
  // this.inStack.push(value);

  // while (this.inStack.length > 0) {
  //   this.outStack.push(this.inStack.pop());
  // }
  // console.log(this.outStack);
  this.inStack.push(value);
};

/**
 * @return {number}
 */
CQueue.prototype.deleteHead = function () {
  // return this.outStack.pop() || -1;
  if (this.outStack.length === 0) {
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  return this.outStack.pop() || -1;
};

/**
 * 11. 盛最多水的容器
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  let left = 0;
  let right = height.length - 1;
  let ans = 0;
  let h = 0;
  let w = right - left;
  while (left !== right) {
    if (height[left] > height[right]) {
      h = height[right];
      right--;
    } else {
      h = height[left];
      left++;
    }
    let tmp = h * w;
    ans = tmp > ans ? tmp : ans;
    w--;
  }
  return ans;
};

// console.log(maxArea([4, 3, 2, 1, 4]));

/**
 * 15. 三数之和
 * 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有和为 0 且不重复的三元组。
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  let ans = [];
  let length = nums.length;
  nums.sort((a, b) => {
    return a - b;
  });

  for (let i = 0; i < length; i++) {
    if (nums[i] > 0) return ans;
    if (nums[i] === nums[i - 1]) continue;
    let l = i + 1;
    let r = length - 1;

    while (l < r) {
      if (nums[i] + nums[l] > 0) break;

      let temp = nums[i] + nums[l] + nums[r];

      if (temp === 0) {
        ans.push([nums[i], nums[l], nums[r]]);
        while (l < r && nums[l] === nums[l + 1]) {
          ++l;
        }
        while (l < r && nums[r] === nums[r - 1]) {
          --r;
        }
        ++l;
      } else if (temp < 0) {
        ++l;
      } else {
        --r;
      }
    }
  }
  return ans;
};

// console.log(threeSum([-1, 0, 1, 2, -1, -4]));

/**
 * 17. 电话号码的字母组合
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const map = new Map();
  map.set("2", ["a", "b", "c"]);
  map.set("3", ["d", "e", "f"]);
  map.set("4", ["g", "h", "i"]);
  map.set("5", ["j", "k", "l"]);
  map.set("6", ["m", "n", "o"]);
  map.set("7", ["p", "q", "r", "s"]);
  map.set("8", ["t", "u", "v"]);
  map.set("9", ["w", "x", "y", "z"]);
  let ans = [];
  const arr = digits.split("");
  arr.forEach((i) => {
    let now = map.get(i);
    let next = [];
    now.forEach((j) => {
      let temp = j;
      ans.length === 0 && next.push(temp);
      ans.forEach((item, index) => {
        next.push(item + temp);
      });
    });
    ans = next;
  });
  return ans;
};

// console.log(letterCombinations("23"));

/**
 * 19. 删除链表的倒数第 N 个结点
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  let pre = new ListNode(-1, head);
  let fast = pre;
  let slow = pre;
  for (let index = 0; index < n; index++) {
    fast = fast.next;
  }
  while (fast.next) {
    slow = slow.next;
    fast = fast.next;
  }
  slow.next = slow.next.next;
  return pre.next;
};

// removeNthFromEnd(head, 1);

/**
 * 20. 有效的括号
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  if (s % 2 === 1) {
    return false;
  }
  const stack = [0];
  const map = new Map([
    [")", "("],
    ["]", "["],
    ["}", "{"],
  ]);
  s.split("").forEach((item) => {
    if (stack[stack.length - 1] === map.get(item)) {
      stack.pop();
    } else {
      stack.push(item);
    }
  });
  return stack.length === 1;
};

// console.log("ans----", isValid("()"));

/**
 * 21. 合并两个有序链表
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function (l1, l2) {
  let head = new ListNode(-1);
  let temp = head;
  while (true) {
    if (!l1) {
      temp.next = l2;
      break;
    }
    if (!l2) {
      temp.next = l1;
      break;
    }
    // console.log(l1.val, l2.val);
    if (l1.val < l2.val) {
      temp.next = l1;
      l1 = l1.next;
    } else {
      temp.next = l2;
      l2 = l2.next;
    }
    temp = temp.next;
  }
  return head.next;
};

// console.log(
//   "===",
//   mergeTwoLists(List([1, 2, 4]), List([1, 3, 4])).toString()
// );

/**
 * 22. 括号生成
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function (n) {
  let arr = [];
  arr[0] = [""];
  for (let i = 0; i < n; i++) {
    arr[i + 1] = [];
    for (let j = 0; j <= i; j++) {
      let left = arr[j];
      let right = arr[i - j];
      // console.log(i, j);
      left.forEach((l) => {
        let temp = "(" + l + ")";
        right.forEach((r) => {
          arr[i + 1].push(temp + r);
        });
      });
    }
  }
  return arr[n];
};

// console.log(generateParenthesis(4));

/**
 * 23. 合并K个升序链表
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  let head = new ListNode(-1);
  let temp = head;
  while (true) {
    if (lists.length === 0) {
      break;
    }
    let min = 0;
    let index = 0;
    while (index < lists.length) {
      const item = lists[index];
      if (item) {
        if (item.val < lists[min].val) {
          min = index;
        }
        index++;
      } else {
        lists.splice(index, 1);
      }
    }

    temp.next = lists[min] || null;
    temp = temp.next;
    if (lists[min] && lists[min].next) {
      lists[min] = lists[min].next;
    } else {
      lists.splice(min, 1);
    }
  }
  //   console.log(head.next);
  return head.next;
};

// console.log(
//   "===",
//   mergeKLists([List([1, 4, 5]), List([1, 3, 4]), List([2, 6])]).toString()
// );

/**
 * 27. 移除元素
 * 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function (nums, val) {
  let offset = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      ++offset;
    } else {
      nums[i - offset] = nums[i];
    }
  }
  return nums.length - offset;
};

// console.log("removeElement===", removeElement([0, 1, 2, 2, 3, 0, 4, 2], 2));

/**
 * 28. KMP实现 strStr()
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  const n = haystack.length;
  const m = needle.length;
  if (m === 0) {
    return 0;
  }
  let next = new Array(m).fill(0);
  // 求取 KMP 的 next 数组，l前缀，r后缀
  for (let l = 0, r = 1; r < m; r++) {
    while (l > 0 && needle[l] !== needle[r]) {
      l = next[l - 1];
    }
    if (needle[l] === needle[r]) {
      l++;
    }
    next[r] = l;
  }
  // 与 KMP 相似算法，求取 needle 作为前缀出现在 haystack 中的位置
  for (let l = 0, r = 0; r < n; r++) {
    while (l > 0 && needle[l] !== haystack[r]) {
      l = next[l - 1];
    }
    if (needle[l] === haystack[r]) {
      l++;
    }
    if (l === m) {
      return r - m + 1;
    }
  }
  return -1;
};

// console.log("===", strStr("hello", "el"));

/**
 * 剑指 Offer 30. 包含min函数的栈
 * initialize your data structure here.
 */
var MinStack = function () {
  // 辅助栈，存储单减最小值
  this.minStack = [];
  // 标准栈，栈操作
  this.stack = [];
};

/**
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function (x) {
  this.stack.push(x);
  if (
    this.minStack.length === 0 ||
    this.minStack[this.minStack.length - 1] >= x
  ) {
    this.minStack.push(x);
  }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function () {
  const x = this.stack.pop();
  if (x === this.minStack[this.minStack.length - 1]) {
    this.minStack.pop();
  }
  return x;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function () {
  return this.stack[this.stack.length - 1];
};

/**
 * @return {number}
 */
MinStack.prototype.min = function () {
  return this.minStack[this.minStack.length - 1];
};

/**
 * 32.最长有效括号
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s.length === 0) {
    return 0;
  }
  let dp = new Array(s.length);
  dp.fill(0);
  for (let i = 1; i < s.length; i++) {
    if (s[i] == ")") {
      if (s[i - 1] == "(") {
        let pre = i > 1 ? dp[i - 2] : 0;
        dp[i] = pre + 2;
      } else if (i - dp[i - 1] > 0 && s[i - dp[i - 1] - 1] == "(") {
        let preIndex = i - dp[i - 1];
        console.log(i, dp, preIndex, i - 2 - preIndex);
        let pre = preIndex > 1 ? dp[preIndex - 2] : 0;
        dp[i] = dp[i - 1] + pre + 2;
      }
    }
  }
  return Math.max(...dp) || 0;
};

// console.log("ans----", longestValidParentheses("()())"));

/**
 * 31. 下一个排列
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 * 现获取 下一个排列 的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。
 * 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。
 * 必须 原地 修改，只允许使用额外常数空间。
 */
var nextPermutation = function (nums) {
  let i = nums.length - 1;
  while (nums[i] <= nums[i - 1]) {
    i--;
  }
  if (i !== 0) {
    let temp = nums[i] + 1;
    let j = nums.length - 1;

    for (let k = nums.length - 1; k >= i; k--) {
      if (nums[k] > nums[i - 1] && nums[k] < temp) {
        temp = nums[k];
        j = k;
      }
      console.log(j, k, nums[k]);
    }

    nums[j] = nums[i - 1];
    nums[i - 1] = temp;
  }

  console.log(i);
  console.log(nums);

  for (let x = 0; x < (nums.length - i) / 2; x++) {
    let y = x + i;
    let temps = nums[y];
    if (temps > nums[nums.length - 1 - x]) {
      nums[y] = nums[nums.length - 1 - x];
      nums[nums.length - 1 - x] = temps;
    }
  }
  return nums;
};

// console.log(nextPermutation([2, 3, 1]));
// // console.log(nextPermutation([1, 3, 2]));
// console.log(nextPermutation([2, 1, 2, 2, 2, 2, 2, 1]));

/**
 * 33. 搜索旋转排序数组
 * 给你 旋转后（区间交换） 的数组 nums 和一个整数 target ，如果 nums 中存在这个目标值 target ，则返回它的下标
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  const find = (start, end) => {
    if (target === nums[start]) {
      console.log(start);
      return start;
    } else if (end < start) {
      return -1;
    }

    let mid = parseInt((end + start) / 2);
    console.log(start, mid, end);

    if (nums[start] > nums[mid]) {
      if (target > nums[start] || target <= nums[mid]) {
        return find(start, mid);
      } else {
        return find(mid + 1, end);
      }
    } else {
      if (target <= nums[mid] && target >= nums[start]) {
        return find(start, mid);
      } else {
        return find(mid + 1, end);
      }
    }
  };
  return find(0, nums.length - 1);
};

// console.log("ans----", search([1, 3, 5], 3));

/**
 * 34. 在排序数组中查找元素的第一个和最后一个位置
 * 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置O(logn)
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  let ans = [-1, -1];
  const find = (start, end) => {
    if (end < start || end < 0) {
      return -1;
    }
    let mid = parseInt((end + start) / 2);
    if (nums[mid] === target) {
      return mid;
    } else if (nums[mid] > target) {
      return find(start, mid - 1);
    } else {
      return find(mid + 1, end);
    }
  };
  const findLeft = (start, end) => {
    if (start === end) {
      ans[0] = start;
      return;
    }
    let mid = parseInt((end + start) / 2);
    if (nums[mid] === target) {
      findLeft(start, mid);
    } else {
      findLeft(mid + 1, end);
    }
  };
  const findRight = (start, end) => {
    if (start === end) {
      ans[1] = nums[start] === target ? start : start - 1;
      return;
    }
    let mid = parseInt((end + start) / 2);
    if (nums[mid] === target) {
      findRight(mid + 1, end);
    } else {
      findRight(start, mid);
    }
  };
  let p = find(0, nums.length - 1);
  if (p !== -1) {
    findLeft(0, p);
    findRight(p, nums.length - 1);
  }

  return ans;
};

// console.log("ans----", searchRange([5, 7, 7, 8, 8, 10], 6));
// console.log("ans----", searchRange([8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9], 8));

/**
 * 39. 组合总和
 * 给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const ans = [];
  const dfs = (sum, combine, idx) => {
    // console.log("sum-" + sum, "  combine-", combine, "  idx-" + idx);
    if (sum >= target) {
      if (sum === target) {
        ans.push(combine);
      }
      return;
    }
    for (let i = idx; i < candidates.length; i++) {
      dfs(sum + candidates[i], [...combine, candidates[i]], i);
    }
  };
  dfs(0, [], 0);
  return ans;
};

// console.log("ans----", combinationSum([1, 2, 3], 3));

/**
 * 42. 接雨水
 * 给定 n 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水
 * @tag 动态规划
 * 每个格子所容纳水量为：左右两侧柱子高度的最小值 - 当前格子高度
 * 左右两个动态规划数组
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let ans = 0;
  let leftMax = new Array(height.length);
  let rightMax = new Array(height.length);
  leftMax.fill(0);
  rightMax.fill(0);

  // 计算每个格子左侧柱子有效高度
  let maxIndex = 0;
  for (let index = 0; index < height.length; index++) {
    if (height[index] > height[maxIndex]) {
      maxIndex = index;
      leftMax[index] = height[index];
    } else {
      leftMax[index] = height[maxIndex];
    }
  }

  // 计算每个格子右侧柱子有效高度
  let rightMaxIndex = height.length - 1;
  for (let index = height.length - 1; index >= 0; index--) {
    if (height[index] > height[rightMaxIndex]) {
      rightMaxIndex = index;
      rightMax[index] = height[index];
    } else {
      rightMax[index] = height[rightMaxIndex];
    }
  }
  ans = height.reduce((pre, item, index) => {
    // 左右两侧柱子高度min值 - 当前格子高度 = 当前格子接水量
    return (pre += Math.min(leftMax[index], rightMax[index]) - item);
  }, 0);
  return ans;
};

/**
 * 42. 接雨水
 * @tag 单调栈
 * 每次遍历到一个格子，如果当前格子比栈顶元素高，则将栈顶元素弹出，计算当前格子接水量
 * 将遍历过的每个格子压入栈中
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  const stack = [];
  let ans = 0;
  height.forEach((item, index) => {
    while (stack.length && height[stack[stack.length - 1]] < item) {
      console.log(stack, item);
      const top = stack.pop();
      if (stack.length === 0) {
        break;
      }
      const left = stack[stack.length - 1];
      const currHeight = Math.min(item, height[left]) - height[top];
      const currWidth = index - left - 1;
      ans += currWidth * currHeight;
    }
    stack.push(index);
  });
  return ans;
};

/**
 * 42. 接雨水
 * @tag 双指针
 * 和动态规划类似，将动态规划的左右两侧柱子高度数组改为左右双指针
 * @param {number[]} height
 * @return {number}
 */
var trap = function (height) {
  let leftIndex = 0;
  let rightIndex = height.length - 1;
  let leftMax = 0;
  let rightMax = 0;
  let ans = 0;

  while (leftIndex < rightIndex) {
    leftMax = Math.max(leftMax, height[leftIndex]);
    rightMax = Math.max(rightMax, height[rightIndex]);
    if (leftMax > rightMax) {
      ans += rightMax - height[rightIndex];
      rightIndex--;
    } else {
      ans += leftMax - height[leftIndex];
      leftIndex++;
    }
  }

  return ans;
};

// console.log("ans----", trap([4, 2, 0, 3, 2, 5]));

/**
 * 46. 全排列
 * 给定一个 没有重复 数字的序列，返回其所有可能的全排列。
 * 回溯算法
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  let ans = [];
  const exchange = (arr, nextIndex) => {
    if (nextIndex === arr.length) {
      ans.push(arr);
      return;
    }
    for (let index = nextIndex; index < arr.length; index++) {
      let temp = arr[index];
      arr[index] = arr[nextIndex];
      arr[nextIndex] = temp;
      exchange([...arr], nextIndex + 1);
    }
  };
  exchange(nums, 0);
  return ans;
};

// console.log("ans----", permute([1, 2, 3, 4]));

/**
 * 48. 旋转图像
 * 给定一个 n × n 的二维矩阵 matrix 表示一个图像。请你将图像顺时针旋转 90 度。
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var rotate = function (matrix) {
  let r = parseInt(matrix.length / 2);
  for (let layer = 0; layer < r; layer++) {
    //该层原左上角 matrix[layer][layer]
    let size = matrix.length - 2 * layer;
    for (let index = 0; index < size - 1; index++) {
      // console.log("开始0", matrix);
      let temp = matrix[layer][layer + index];
      matrix[layer][layer + index] =
        matrix[matrix.length - 1 - layer - index][layer];
      // console.log("开始1", matrix);
      matrix[matrix.length - 1 - layer - index][layer] =
        matrix[matrix.length - 1 - layer][matrix.length - 1 - layer - index];
      // console.log("开始2", matrix);
      matrix[matrix.length - 1 - layer][matrix.length - 1 - layer - index] =
        matrix[layer + index][matrix.length - 1 - layer];
      // console.log("开始3", matrix);
      matrix[layer + index][matrix.length - 1 - layer] = temp;
      // console.log("结束", matrix);
    }
  }
  return matrix;
};

// console.log(
//   "ans----",
//   rotate([
//     [1, 2, 3, 4],
//     [5, 6, 7, 8],
//     [9, 10, 11, 12],
//     [13, 14, 15, 16],
//   ])
// );

/**
 * 49. 字母异位词分组
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function (strs) {
  let map = new Map();

  strs.forEach((str) => {
    const key = str.split("").sort().join("");
    map.has(key) ? map.get(key).push(str) : map.set(key, [str]);
  });

  // console.log(map);

  return Array.from(map.values());
};
// console.log(
//   "ans----",
//   groupAnagrams(["eat", "tea", "tan", "ate", "nat", "bat"])
// );
