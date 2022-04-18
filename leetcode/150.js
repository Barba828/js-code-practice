import { ArrayToList, ListNode, ArrayToTree, TreeNode } from "../structure/index.js";

/**
 * 101. 对称二叉树
 * 给定一个二叉树，检查它是否是镜像对称的
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  if (root === null) return true;
  const compare = (left, right) => {
    if (left === right) {
      return true;
    } else if (left !== null && right !== null && left.val === right.val) {
      return compare(left.left, right.right) && compare(left.right, right.left);
    } else {
      return false;
    }
  };
  return compare(root.left, root.right);
};

// console.log("isSymmetric===", isSymmetric(ArrayToTree([1, 2, 2, 3, 4, 4])));

/**
 * 102. 二叉树的层序遍历
 * 给你一个二叉树，请你返回其按 层序遍历 得到的节点值
 * 队列遍历
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
  const ans = [];
  if (!root) return ans;

  const queue = [root];
  while (queue.length !== 0) {
    //当前队列长度，即为该层节点数
    const layerSize = queue.length;
    //该层数组保存
    const layer = new Array(layerSize);
    for (let i = 0; i < layerSize; i++) {
      //保存节点
      const { val, left, right } = queue.shift();
      layer[i] = val;
      //加入下层队列，队列长度更改，所以之前用layerSize保存上层长度
      if (left) queue.push(left);
      if (right) queue.push(right);
    }
    ans.push(layer);
  }

  return ans;
};

// console.log(
//   "levelOrder===",
//   levelOrder(ArrayToTree([1, 2, null, 3, null, 4, null, 5]))
// );

/**
 * 153. 寻找旋转排序数组中的最小值
 * @tag 二分法
 * @param {number[]} nums
 * @return {number}
 */
var findMin = function (nums) {
  let left = 0
  let right = nums.length - 1

  while (left !== right) {
    const mid = Math.floor((left + right) / 2)

    if (nums[left] > nums[right]) {
      // left -> right 包含旋转，分两种情况二分判断最小值归属
      if (nums[left] > nums[mid]) {
        right = mid
      } else {
        left = mid + 1
      }
    } else {
      // 不包含旋转，则最左侧肯定是最小值
      right = left
    }
  }

  return nums[left]
};

// console.log(
//   "findMin===",
//   findMin([4, 5, 6, 7, 0, 1, 2]),
//   findMin([2, 1])
// );

/**
 * 104. 二叉树的最大深度
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function (root) {
  let max = 0;
  const nextLayer = (node, depth) => {
    if (!node || node.val === null) return;
    max = depth > max ? depth : max;
    if (node.left) nextLayer(node.left, depth + 1);
    if (node.right) nextLayer(node.right, depth + 1);
  };
  nextLayer(root, 1);
  return max;
};

// console.log("maxDepth===", maxDepth(ArrayToTree([3, 9, 20, null, null, 15, 7])));

/**
 * 105. 从前序与中序遍历序列构造二叉树
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  /**
   * 获取子树
   * @param {*} preLeft 前序数组起始下标
   * @param {*} inLeft 中序数组起始下标
   * @param {*} length 数组长度
   * @returns
   */
  const childTree = (preLeft, inLeft, length) => {
    const root = new TreeNode(preorder[preLeft]); //前序首位为根节点
    const inRoot = inorder.indexOf(preorder[preLeft]); //中序查找根节点位置，该位置左侧为左子树，右侧为右子树
    const leftLength = inRoot - inLeft; //左子树长度
    const rightLength = length - leftLength - 1; //右子树长度
    //存在左子树
    if (leftLength > 0) {
      root.left = childTree(preLeft + 1, inLeft, leftLength);
    }
    //存在右子树
    if (rightLength > 0) {
      root.right = childTree(preLeft + 1 + leftLength, inRoot + 1, rightLength);
    }
    return root;
  };
  return childTree(0, 0, preorder.length);
};

// console.log(
//   "buildTree===",
//   buildTree([4, 1, 2, 3, 5], [3, 2, 5, 1, 4]).toString()
// );

/**
 * 114. 二叉树展开为链表
 * 展开后的单链表应该同样使用 TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null
 * @param {TreeNode} root
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (node) {
  if (!node || node.val === null) return;
  let { left, right } = node;
  flatten(left); //扁平化左子树
  flatten(right); //扁平化右子树

  //左子树接上right当新的右子树
  if (left) {
    node.right = left;
  }
  //新的右子树指向最后一个right
  while (left && left.right) {
    left = left.right;
  }
  //右子树接上新的右子树right
  if (right && left) {
    left.right = right;
  }

  node.left = null;
  return node;
};

// console.log("flatten===", flatten(ArrayToTree([1, 2, 5, 3, 4, null, 6])));

/**
 * 117. 填充每个节点的下一个右侧节点指针 II
 * @tag 广度优先搜索
 * 实际上层级遍历，每一遍历一层先保存到 nextQueue ，用以生成 next 指向，然后更新 queue 
 * @param {Node} root
 * @return {Node}
 */
var connect = function (root) {
  if (!root) {
    return root
  }
  let queue = [root]

  while (queue.length > 0) {
    const nextQueue = []
    for (let i = 0; i < queue.length; i++) {
      if (queue[i].left) nextQueue.push(queue[i].left)
      if (queue[i].right) nextQueue.push(queue[i].right)
    }
    for (let j = 0; j < nextQueue.length - 1; j++) {
      nextQueue[j].next = nextQueue[j + 1]
    }

    queue = nextQueue
  }
  return root
};
console.log("connect===", connect(ArrayToTree([])));

/**
 * 121. 买卖股票的最佳时机
 * 给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格
 * 求差值，相当于计算最大连续区间值
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  if (prices.length < 2) {
    return 0;
  }
  const dp = [0];
  for (let i = 0; i < prices.length - 1; i++) {
    const money = prices[i + 1] - prices[i];
    dp[i + 1] = dp[i] + money > money ? dp[i] + money : money;
  }

  console.log(dp);
  return Math.max(...dp);
};

// console.log("maxProfit===", maxProfit([7, 1, 5, 3, 6, 4]));

/**
 * 124. 二叉树中的最大路径和
 * @param {TreeNode} root
 * @return {number}
 */
var maxPathSum = function (root) {
  let max = -Infinity;
  const maxGain = (node) => {
    if (node === null) return 0;
    const { val, right, left } = node;
    const leftGain = Math.max(maxGain(left), 0);
    const rightGain = Math.max(maxGain(right), 0);

    //左，父节点，右 => 为当前路径
    const tempMax = val + leftGain + rightGain;

    max = Math.max(max, tempMax);

    //只选择左右中的一条纳入路径
    return val + Math.max(leftGain, rightGain);
  };
  maxGain(root);
  return max;
};

// console.log("maxPathSum===", maxPathSum(ArrayToTree([7, 1, 5, 3, 6, 4])));

/**
 * 128. 最长连续序列
 * 给定一个未排序的整数数组 nums ，找出数字连续的最长序列长度
 * 使用Set去重，每一个item都寻找item-1来查找连续长度
 * 若存在item+1则不考虑（因为遍历到item+1的时候再寻找到item加入连续序列）
 * @param {number[]} nums
 * @return {number}
 */
var longestConsecutive = function (nums) {
  //set去重
  const set = new Set(nums);
  let maxLength = 0;
  for (let item of set) {
    //item+1不考虑
    if (set.has(item + 1)) continue;
    let tempLength = 1;
    //从item一直item--计算长度
    while (set.has(item - 1)) {
      tempLength++;
      item = item - 1;
    }
    maxLength = Math.max(maxLength, tempLength);
  }
  return maxLength;
};

// console.log(
//   "longestConsecutive===",
//   longestConsecutive([100, 4, 200, 1, 3, 2])
// );

/**
 * 146. LRU 缓存机制
 * Map.keys() 迭代器自动保存set添加记录
 * put时自动保存记录
 * get时通过先删除后添加自动保存记录
 * @param {number} capacity
 */

/**
 * 136. 只出现一次的数字
 * 异或 ^ : a^a=0 , a^0 = a
 * 所有相同的数字异或结果0，答案ans异或0为ans
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  let ans = 0;
  for (const item of nums) {
    ans ^= item;
  }
  return ans;
};

// console.log("singleNumber===", singleNumber([1, 2, 3, 4, 5, 4, 3, 2, 1]));

/**
 * 139. 单词拆分
 * 动态规划，第一层遍历 i: 0->s.length，第二层遍历 j: 0->i寻找之前符合条件的单词
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  const dp = new Array(s.length + 1);
  dp[0] = true; //空字符串为true
  for (let i = 1; i < s.length + 1; i++) {
    // 第二层遍历 j: 0->i寻找之前符合条件的单词
    for (let j = 0; j < i; j++) {
      // dp[j]为true保证之前的单词连续，s[j,i]也为true则连续
      if (dp[j] && wordDict.indexOf(s.substring(j, i)) !== -1) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[s.length] === true;
};

// console.log("wordBreak===", wordBreak("dogsandot", ["dog", "sand", "dot"]));

var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.value = new Map();
};
/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (this.value.has(key)) {
    const temp = this.value.get(key);
    this.value.delete(key);
    this.value.set(key, temp);
    return temp;
  } else return -1;
};
/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.set = function (key, value) {
  if (this.value.has(key)) {
    this.value.delete(key);
  } else if (this.capacity === this.value.size) {
    this.value.delete(this.value.keys().next().value);
  }
  this.value.set(key, value);
};

/**
 * 141. 环形链表
 * 给定一个链表，判断链表中是否有环
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  //Set存储，空间复杂度O(n)
  // let set = new Set();
  // while (head) {
  //   if (set.has(head)) {
  //     return true;
  //   }
  //   set.add(head);
  //   head = head.next;
  // }
  // return false;

  //快慢指针，快指针next两步，如果有环，则环内next必定能和slow重合
  if (!head || !head.next) return false;
  let fast = head.next;
  let slow = head;
  while (fast != slow) {
    if (fast === null || fast.next === null) return false;
    fast = fast.next.next;
    slow = slow.next;
  }
  return true;
};

// console.log("hasCycle===", hasCycle(ArrayToList([3, 2, 0, -4])));

/**
 * 142. 环形链表 II
 * 返回环节点
 * @param {ListNode} head
 * @return {boolean}
 */
var detectCycle = function (head) {
  //Set存储，空间复杂度O(n)
  // let set = new Set();
  // while (head) {
  //   if (set.has(head)) {
  //     return head;
  //   }
  //   set.add(head);
  //   head = head.next;
  // }
  // return null;

  //快慢指针，快指针next两步，如果有环，则环内next必定能和slow重合
  if (!head || !head.next) return null;
  let fast = head.next;
  let slow = head;
  while (fast != slow) {
    if (fast === null || fast.next === null) return null;
    fast = fast.next.next;
    slow = slow.next;
  }

  let ptr = head;
  slow = slow.next;
  while (ptr !== slow) {
    ptr = ptr.next;
    slow = slow.next;
  }
  return ptr;
};
// let head = ArrayToList([3, 2, 0, 4, 5]);
// head.next.next.next.next.next = head.next.next;
// console.log("detectCycle===", detectCycle(head));

/**
 * 148. 排序链表
 * 给你链表的头结点 head ，请将其按 升序 排列并返回 排序后的链表
 * @param {ListNode} head
 * @return {ListNode}
 */
var sortList = function (head) {
  //合并两个有序链表
  const merge = (l1, l2) => {
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

  const toSortList = (head, tail) => {
    if (head === null) {
      return head;
    }
    if (head.next === tail) {
      head.next = null;
      return head;
    }
    let slow = head,
      fast = head;

    //快指针走到尾节点，慢指针走到中间节点
    while (fast !== tail) {
      slow = slow.next;
      fast = fast.next;
      if (fast !== tail) {
        fast = fast.next;
      }
    }
    const mid = slow;
    //归并
    return merge(toSortList(head, mid), toSortList(mid, tail));
  };
  return toSortList(head, null);
};

// console.log("sortList===", sortList(ArrayToList([3, 2, 0, 4, 5])).toString());
