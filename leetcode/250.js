import { List, ListNode, Tree, TreeNode } from "../structure/index.js";

/**
 * 207. 课程表
 * 解法，根据prerequisites生成有向图
 * 查看该图是否存在拓扑排序，即直接遍历如果有环则false
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) { };

// console.log(
//   "canFinish===",
//   canFinish(8, [
//     [1, 0],
//     [2, 6],
//     [1, 7],
//     [6, 4],
//     [7, 0],
//     [0, 5],
//   ])
// );

/**
 * 208. 实现 Trie (前缀树)
 * Initialize your data structure here.
 */
var Trie = function () {
  this.trie = new TrieNode(-1);
};

var TrieNode = function (val, child) {
  this.val = val === undefined ? null : val;
  this.child = child === undefined ? new Map() : child;
};

/**
 * Inserts a word into the trie.
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let map = this.trie.child;
  for (let i = 0; i < word.length; i++) {
    if (!map.has(word[i])) {
      map.set(word[i], new TrieNode(i === word.length - 1));
    }
    if (i === word.length - 1) {
      map.get(word[i]).val = true;
    }
    map = map.get(word[i]).child;
  }
};

/**
 * Returns if the word is in the trie.
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let map = this.trie.child;
  for (let i = 0; i < word.length; i++) {
    if (map.has(word[i])) {
      if (i !== word.length - 1) {
        map = map.get(word[i]).child;
      }
    } else {
      return false;
    }
  }

  return map.get(word[word.length - 1]).val;
};

/**
 * Returns if there is any word in the trie that starts with the given prefix.
 * @param {string} prefix
 * @return {boolean}
 */
Trie.prototype.startsWith = function (prefix) {
  let map = this.trie.child;
  for (let i = 0; i < prefix.length; i++) {
    if (map.has(prefix[i])) {
      map = map.get(prefix[i]).child;
    } else {
      return false;
    }
  }
  return true;
};

// var obj = new Trie();
// obj.insert("apple");
// console.log(obj);
// console.log(obj.search("appl"));
// console.log(obj.startsWith("appl"));

/**
 * 213. 打家劫舍 II
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }

  const listMax = (left, right) => {
    if (right - left <= 1) {
      return [nums[left]];
    }
    const dp = new Array(right - left);
    dp[0] = nums[left];
    dp[1] = Math.max(nums[left + 1], nums[left]);
    for (let i = 2 + left; i < right; i++) {
      dp[i - left] = Math.max(dp[i - left - 1], dp[i - left - 2] + nums[i]);
    }
    return dp;
  };

  console.log(listMax(0, nums.length - 1));
  console.log(listMax(1, nums.length));

  return Math.max(...listMax(0, nums.length - 1), ...listMax(1, nums.length));
};

// console.log("rob===", rob([0]));

/**
 * 206. 反转链表
 * @tag 双指针 迭代法
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let pre = null;
  let tmpNext = null;
  while (head) {
    tmpNext = head.next;
    head.next = pre;
    pre = head;
    head = tmpNext;
  }
  return pre;
};

/**
 * 206. 反转链表
 * @tag 递归法
 * @param {ListNode} head
 * @return {ListNode}
 */
var reverseList = function (head) {
  let pre = null;
  let tmpNext = null;
  while (head) {
    tmpNext = head.next;
    head.next = pre;
    pre = head;
    head = tmpNext;
  }
  return pre;
};

console.log(reverseList(List([1, 2, 3, 4, 5])).toString());

/**
 * 215. 数组中的第K个最大元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function (nums, k) {
  nums.sort((a, b) => a - b);
  return nums[nums.length - k];
};
// console.log("findKthLargest===" + findKthLargest([5, 6, 2, 4, 7, 8, 5, 6], 2));

/**
 * @param {character[][]} matrix
 * @return {number}
 */
var maximalSquare = function (matrix) {
  const height = matrix.length;
  const width = matrix[0].length;
  const dp = new Array(height).fill(0).map(() => new Array(width).fill(0));

  let max = 0;
  for (let i = 0; i < height; i++) {
    dp[i][0] = matrix[i][0] === "1" ? 1 : 0;
    max = Math.max(dp[i][0], max);
  }
  for (let i = 0; i < width; i++) {
    dp[0][i] = matrix[0][i] === "1" ? 1 : 0;
    max = Math.max(dp[0][i], max);
  }

  for (let i = 1; i < height; i++) {
    for (let j = 1; j < width; j++) {
      if (matrix[i][j] === "1") {
        let s = 1;
        for (let k = 1; k <= dp[i - 1][j - 1]; k++) {
          if (matrix[i - k][j] === "1" && matrix[i][j - k] === "1") {
            ++s;
          } else {
            break;
          }
        }
        dp[i][j] = s;
        max = Math.max(dp[i][j], max);
      }
    }
  }
  return max * max;
};
// console.log(
//   "maximalSquare===" +
//     maximalSquare([
//       ["0", "1", "1", "0", "1", "1", "1", "1", "1", "1", "1"],
//       ["1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
//       ["1", "1", "0", "1", "1", "1", "1", "1", "1", "1", "1"],
//       ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
//       ["1", "1", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
//       ["1", "1", "1", "0", "1", "1", "1", "0", "1", "1", "1"],
//       ["1", "0", "1", "1", "1", "1", "1", "1", "1", "1", "1"],
//     ])
// );

/**
 * 226. 翻转二叉树
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (!root) return null;
  let temp = root.right;
  root.right = root.left;
  root.left = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
};
// const tree = Tree([2, 1, 3]);
// invertTree(tree);
// console.log("invertTree===" + tree);

/**
 * 234. 回文链表
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  let fast = head;
  let low = head;
  //快门指针，找到后半段链表low
  while (fast && fast.next) {
    fast = fast.next.next;
    low = low.next;
  }
  //后半段链表low反转为reverse链表
  let pre = null;
  let reverse = null;
  while (low) {
    reverse = new ListNode(low.val, pre);
    pre = reverse;
    low = low.next;
  }
  //遍历reverse链表和head链表相同
  while (reverse) {
    if (reverse.val === head.val) {
      reverse = reverse.next;
      head = head.next;
    } else {
      return false;
    }
  }
  return true;
};

// console.log("isPalindrome===" + isPalindrome(List([1, 2, 3, 3, 2, 1])));

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === p || root === q) {
    return root;
  }
  if (root !== null) {
    const lNode = lowestCommonAncestor(root.left, p, q);
    const rNode = lowestCommonAncestor(root.right, p, q);
    if (lNode !== null && rNode !== null) return root;
    else if (lNode === null) {
      //两个都在右子树
      return rNode;
    } else {
      //两个都在左子树里面
      return lNode;
    }
  }
  return null;
};

// const tree = Tree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
// console.log(
//   "lowestCommonAncestor===" +
//     lowestCommonAncestor(tree, tree.get(5), tree.get(4))
// );

/**
 * 238. 除自身以外数组的乘积
 * f(x) = [0,x-1]乘积 * [x,n]乘积
 * L数组保存 0->n 乘积
 * R数组保存 n->0 乘积
 * f(x) = L[x]*R[x]
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  const L = new Array(nums.length);
  const R = new Array(nums.length);
  const output = new Array(nums.length);
  L[0] = 1;
  R[nums.length - 1] = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    L[i + 1] = L[i] * nums[i];
  }
  for (let i = nums.length - 1; i > 0; i--) {
    R[i - 1] = R[i] * nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    output[i] = L[i] * R[i];
  }
  return output;
};

// console.log("productExceptSelf===" + productExceptSelf([1, 2, 3, 4]));

/**
 * 239. 滑动窗口最大值
 * 单调队列，每次push到队列尾部值，会同时移除比该值小的元素，因此该队列恒单调
 * 取最大值即为队列头部
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  const q = [];
  //初始化单调队列
  for (let i = 0; i < k; i++) {
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    q.push(i);
  }

  const ans = [nums[q[0]]];
  for (let i = k; i < nums.length; i++) {
    //单调队列新增值前移除更小元素
    while (q.length && nums[i] >= nums[q[q.length - 1]]) {
      q.pop();
    }
    //新增该值，由此单调
    q.push(i);
    //新增后判断队列头部是否超过了滑动窗口
    while (q[0] <= i - k) {
      q.shift();
    }
    ans.push(nums[q[0]]);
  }
  return ans;
};

// console.log(
//   "maxSlidingWindow===" + maxSlidingWindow([1, 3, -1, -3, 5, 3, 4, 7], 3)
// );

/**
 * 240. 搜索二维矩阵 II
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function (matrix, target) {
  //初始节点，右上角
  let row = 0;
  let col = matrix[0].length - 1;
  while (row < matrix.length && col >= 0) {
    if (matrix[row][col] === target) {
      return true;
    } else if (matrix[row][col] > target) {
      --col;
    } else {
      ++row;
    }
  }
  return false;
};

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

console.log(addDigits(38));

// console.log(
//   "searchMatrix===" +
//     searchMatrix(
//       [
//         [1, 4, 7, 11, 15],
//         [2, 5, 8, 12, 19],
//         [3, 6, 9, 16, 22],
//       ],
//       5
//     )
// );
