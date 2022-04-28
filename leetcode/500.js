import { ArrayToTree } from "../structure/index.js";

/**
 * 435. 无重叠区间
 * @tag 动态规划
 * 本质上就是 300. 最长递增子序列
 * @param {number[][]} intervals
 * @return {number}
 */
var eraseOverlapIntervals = function (intervals) {
    if (!intervals.length) {
        return 0
    }
    intervals.sort((a, b) => a[0] - b[0])

    const len = intervals.length
    const dp = new Array(len).fill(1) // dp存储前 i 个位置数量最多的不重叠区间

    for (let i = 1; i < len; i++) {
        // 更新 dp[i]：遍历小于 i 的区间，选择所有区间右侧小于等于区间 i 左侧
        for (let j = 0; j < i; j++) {
            if (intervals[j][1] <= intervals[i][0]) {
                dp[i] = Math.max(dp[i], dp[j] + 1)
            }
        }
    }

    return len - Math.max(...dp) // n - max(dp[i]) 即去掉最少的区间
};
/**
 * 435. 无重叠区间
 * @tag 贪心算法
 * 可以理解为会议室约定选择开最多会议的方案，每一个区间是会议的起始时间
 * 那么根据贪心算法，应按照结束时间排序
 * 之后遍历，贪心的加入新会议并更新最晚结束时间
 */
var eraseOverlapIntervals = function (intervals) {
    if (!intervals.length) {
        return 0
    }
    intervals.sort((a, b) => a[1] - b[1]) // 按会议结束时间排序

    const len = intervals.length
    let right = intervals[0][1] // right：最晚结束时间
    let ans = 1 // ans：已添加的会议数
    for (let i = 1; i < len; ++i) {
        // 遍历，当前会议开始时间小于最晚结束时间，则加入会议，更新最晚结束时间
        if (intervals[i][0] >= right) {
            ++ans
            right = intervals[i][1]
        }
    }
    return len - ans
}
// console.log("eraseOverlapIntervals====", eraseOverlapIntervals([[1, 2], [2, 3], [3, 4], [1, 3]]));

/**
 * 438. 找到字符串中所有字母异位词
 * @tag 滑动窗口协议
 * @param {string} s
 * @param {string} p
 * @return {number[]}
 */
var findAnagrams = function (s, p) {
    if (p.length > s.length) return []
    const ans = []
    const sCount = new Array(26).fill(0)
    const pCount = new Array(26).fill(0)

    for (let index = 0; index < p.length; index++) {
        sCount[s[index].charCodeAt() - 'a'.charCodeAt()]++
        pCount[p[index].charCodeAt() - 'a'.charCodeAt()]++
    }

    if (sCount.toString() === pCount.toString()) {
        ans.push(0)
    }

    for (let index = 0; index < s.length - p.length; index++) {
        sCount[s[index].charCodeAt() - 'a'.charCodeAt()]--
        sCount[s[index + p.length].charCodeAt() - 'a'.charCodeAt()]++
        if (sCount.toString() === pCount.toString()) {
            ans.push(index + 1)
        }
    }

    return ans
};
// console.log("findAnagrams====", findAnagrams("abcab", "ab"));

/**
 * 450. 删除二叉搜索树中的节点
 * @tag 递归
 * @param {TreeNode} root
 * @param {number} key
 * @return {TreeNode}
 */
var deleteNode = function (root, key) {
    if (!root) return null

    const findMax = (node) => !node.right ? node.val : findMax(node.right, node)
    const findMin = (node) => !node.left ? node.val : findMin(node.left, node)

    if (key > root.val) root.right = deleteNode(root.right, key)
    else if (key < root.val) root.left = deleteNode(root.left, key)
    else {
        // 叶子节点，直接删除
        if (root.left == null && root.right == null) root = null
        // 存在右子节点
        else if (root.right !== null) {
            root.val = findMin(root.right) // 当前节点值替换为右侧最小的节点值
            root.right = deleteNode(root.right, root.val) // 删除原右侧最小节点
        }
        // 存在左子节点  
        else {
            root.val = findMax(root.left) // 当前节点值替换为左侧最大节点值
            root.left = deleteNode(root.left, root.val) // 删除原左侧最大节点
        }
    }
    return root
};
console.log("deleteNode====", deleteNode(ArrayToTree([5, 3, 6, 2, 4, null, 7]), 5));

/**
 * 459. 重复的子字符串
 * 若是有重复的子字符串那么 s 一定是 s + s 的子串，并且重复起始点会出现在[1, s.length - 2]中
 * 这里判断子串可以由 kmp 算法实现
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function (s) {
    return (s + s).indexOf(s, 1) !== s.length
};
// console.log("repeatedSubstringPattern====", repeatedSubstringPattern("abab"));
