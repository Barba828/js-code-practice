/**
 * 713. 乘积小于K的子数组
 * @tag 滑动窗口 遍历 O(n2) 复杂度
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var numSubarrayProductLessThanK = function (nums, k) {
    let count = 0
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] >= k) continue

        let step = 0 // 子数组长度
        let mul = 1 // 乘积
        while (nums[index + step]) {
            mul *= nums[index + step]
            if (mul < k) {
                count++
            } else {
                break
            }
            step++
        }
    }
    return count
};

/**
 * 713. 乘积小于K的子数组 2
 * @tag 滑动窗口
 * @tag 双指针
 * 和 209. 长度最小的子数组 相同解法
 * 滑动窗口为双指针构造[left, right]，乘积 mul < k时，即有 (right - left + 1 ) 个子数组
 * 右指针遍历 n ，左指针实际上也遍历 n ，复杂度 O(n)
 */
var numSubarrayProductLessThanK = function (nums, k) {
    if (k <= 1) {
        return 0
    }
    let count = 0 // 计数
    let left = 0 // 左指针
    let right = 0 // 右指针
    let mul = 1 // 乘积
    while (right < nums.length) {
        mul *= nums[right]
        while (mul >= k) {
            mul /= nums[left]
            left++
        }

        count += right - left + 1
        right++
    }
    return count
}

// console.log('numSubarrayProductLessThanK====', numSubarrayProductLessThanK([10, 5, 2, 6], 100));

/**
 * 746. 使用最小花费爬楼梯
 * @tag 动态规划
 * dp[n] = min(dp[n-1], dp[n-2]) + cost[n]
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
    const len = cost.length
    const dp = new Array(len).fill(Infinity)
    dp[0] = cost[0]
    dp[1] = cost[1]

    for (let i = 2; i < len; i++) {
        dp[i] = Math.min(dp[i - 1], dp[i - 2]) + cost[i]
    }

    return Math.min(dp[len - 1], dp[len - 2])
};
console.log('minCostClimbingStairs====', minCostClimbingStairs([1, 100, 1, 1, 1, 100, 1, 1, 100, 1]));

/**
 * 797. 所有可能的路径
 * @tag 深度优先遍历
 * @param {number[][]} graph
 * @return {number[][]}
 */
var allPathsSourceTarget = function (graph) {
    const ans = []
    const stack = [] // 保存当前路径
    const dfs = (i, n) => {
        if (i === n) {
            ans.push([...stack, n])
            return
        }
        for (const y of graph[i]) {
            stack.push(i)
            dfs(y, n)
            stack.pop()
        }
    }
    dfs(0, graph.length - 1)
    return ans
};
/**
 * 797. 所有可能的路径
 * @tag 深度优先
 * @tag 回溯
 */
var allPathsSourceTarget = function (graph) {
    // 回溯保存遍历过到终点的路径数组
    const paths = new Array(graph.length).fill(false)

    const dfs = (i, n) => {
        // 已有 i->n 路径 返回回溯值
        if (paths[i]) {
            return paths[i]
        }

        // 新建 i->n 路径
        const path = []
        // 遍历 i 点支持的下一站
        for (const y of graph[i]) {
            const x = dfs(y, n)
            // 获取下一站的所有路径，push到 i 点路径
            path.push(...x.map(p => [i, ...p]))
        }
        paths[i] = path
        return path
    }

    paths[graph.length - 1] = [[graph.length - 1]]
    dfs(0, graph.length - 1)
    return paths[0]
};
// console.log('allPathsSourceTarget====', allPathsSourceTarget([[1, 2], [3], [1, 3], []]));
// console.log('allPathsSourceTarget====', allPathsSourceTarget([[4, 3, 1], [3, 2, 4], [3], [4], []]));
