import { ArrayToList, ListNode, ArrayToTree, TreeNode } from "../structure/index.js";

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
 * 209. 长度最小的子数组
 * @tag 滑动窗口
 * @tag 双指针
 * 解法和 713. 乘积小于K的子数组 2 相同
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  let len = Infinity
  let left = 0
  let right = 0
  let add = 0
  while (right < nums.length) {
    add += nums[right]
    while (add >= target) {
      len = Math.min(len, right - left + 1)
      add -= nums[left]
      left++
    }
    right++
  }
  return len === Infinity ? 0 : len
};
// console.log('minSubArrayLen====', minSubArrayLen(7, [1, 1, 1]));

/**
 * 213. 打家劫舍 II
 * @tag 动态规划
 * 和 198. 打家劫舍 相同，只是因为环状所以分割为两次计算 => [ 0, n-1], [ 1, n ]
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  const len = nums.length
  if (len < 4) {
    return Math.max(...nums)
  }

  const listMax = (left, right) => {
    const dp = new Array(right - left)
    for (let i = 0; i < right - left; i++) {
      dp[i] = nums[i + left] + Math.max(dp[i - 2] || 0, dp[i - 3] || 0)
    }
    return dp
  }

  return Math.max(...listMax(0, len - 1), ...listMax(1, len))
}
// console.log("rob===", rob([1, 2, 3, 1]));

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

// console.log('reverseList====', reverseList(ArrayToList([1, 2, 3, 4, 5])).toString());

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
// const tree = ArrayToTree([2, 1, 3]);
// invertTree(tree);
// console.log("invertTree===" + tree);

/**
 * 230. 二叉搜索树中第K小的元素
 * 中序遍历到第 k 位即可
 * @param {TreeNode} root
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  const stack = []
  let num = 0
  while (root !== null || stack.length > 0) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    if (stack.length > 0) {
      num++
      const node = stack.pop()
      if (num === k) {
        return node.val
      }

      root = node.right
    }
  }
};
// console.log("kthSmallest===", kthSmallest(ArrayToTree([5, 1, 8, null, 2]), 3));

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

// console.log("isPalindrome===" + isPalindrome(ArrayToList([1, 2, 3, 3, 2, 1])));

/**
 * 236. 二叉树的最近公共祖先
 * 1. 递归寻找，当一个节点满足：存在 p 和 q 都在子节点，则返回该节点
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  if (!root) return null;
  if (root === p || root === q) return root;

  const lNode = lowestCommonAncestor(root.left, p, q); // 保存左子节点，无 p/q 返回null
  const rNode = lowestCommonAncestor(root.right, p, q); // 保存右子节点，无 p/q 返回null

  // 公共父节点
  if (lNode !== null && rNode !== null) return root;
  // 两个都在右子树
  else if (lNode === null) return rNode;
  // 两个都在左子树
  else return lNode;
};
/**
 * 236. 二叉树的最近公共祖先
 * 2. 分别从 p/q 由低向上查找，查找第一个已遍历节点
 */
var lowestCommonAncestor = function (root, p, q) {
  const parent = new Map() // 保存节点的父节点指向
  const visited = new Set() // 保存已遍历节点

  // dfs 遍历生成 parent
  const stack = [root]
  while (stack.length > 0) {
    const node = stack.pop()
    if (node.right) {
      parent.set(node.right.val, node)
      stack.push(node.right)
    }
    if (node.left) {
      parent.set(node.left.val, node)
      stack.push(node.left)
    }
  }

  // 根据 p 点路径生成 visited
  while (p) {
    visited.add(p.val)
    p = parent.get(p.val)
  }

  // 根据 q 点和 visited 查询父节点
  while (true) {
    if (visited.has(q.val)) {
      return q
    }
    q = parent.get(q.val)
  }
}
const tree = ArrayToTree([3, 5, 1, 6, 2, 0, 8, null, null, 7, 4]);
console.log(
  "lowestCommonAncestor===" +
  lowestCommonAncestor(tree, tree.get(5), tree.get(1))
);

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
