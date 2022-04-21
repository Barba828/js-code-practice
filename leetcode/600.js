import { ArrayToTree } from "../structure/index.js";

/**
 * 509. 斐波那契数
 * 经典递归法
 * @param {number} n
 * @return {number}
 */
var fib = function (n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2)
};
/**
 * 509. 斐波那契数
 * @tag 动态规划
 * 动规状态转移方程 F(n)=F(n−1)+F(n−2)，边界值 F(0) 和 F(1)
 * arr 保存每一次 fib 的状态值，空间复杂度 O(n)
 */
var fib = function (n) {
    if (n < 2) return n

    const arr = new Array(n).fill(0)
    arr[1] = 1

    for (let i = 2; i <= n; i++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }
    return arr[n]
};
/**
 * 509. 斐波那契数
 * @tag 动态规划
 * 实际上动规可以用滚动数组思想，实际上每一次只需要保存 n-2，n-1，n三个值，空间复杂度 O(1)
 */
var fib = function (n) {
    if (n < 2) return n

    let f2 = 0, f1 = 0, f = 1
    for (let i = 2; i <= n; i++) {
        f2 = f1
        f1 = f
        f = f1 + f2
    }
    return f
}
console.log('fib====', fib(4));

/**
 * 547. 省份数量
 * @tag 深度优先搜索
 * 利用 DFS 计算一个邻接矩阵表示的图的连通分量数
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isConnected) {
    const len = isConnected.length
    const visited = new Array(len).fill(false)
    const dfs = (i) => {
        visited[i] = true
        for (let j = 0; j < len; j++) {
            if (isConnected[i][j] === 1 && !visited[j]) {
                dfs(j)
            }
        }
    }

    let count = 0
    for (let i = 0; i < len; i++) {
        if (!visited[i]) {
            count++
            dfs(i)
        }
    }
    return count
};

/**
 * 547. 省份数量
 * @tag 广度优先搜索
 * 利用 BFS 计算一个邻接矩阵表示的图的连通分量数
 */
var findCircleNum = function (isConnected) {
    const len = isConnected.length
    const visited = new Array(len).fill(false)

    const queue = []
    let count = 0
    for (let i = 0; i < len; i++) {
        if (!visited[i]) {
            queue.push(i) // 这里用 stack 就是DFS
            while (queue.length) {
                const j = queue.shift()
                visited[j] = true
                for (let k = 0; k < len; k++) {
                    if (isConnected[j][k] === 1 && !visited[k]) {
                        queue.push(k)
                    }
                }
            }
            count++
        }
    }
    return count
}

// console.log("findCircleNum====", findCircleNum([[1, 1, 0], [1, 1, 0], [0, 0, 1]]));

/**
 * 572. 另一棵树的子树
 * @tag 深度优先搜索
 * @tag KMP
 * @param {TreeNode} root
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
    const getTreeArr = (node, arr) => {
        if (!node) {
            arr.push('x')
            return
        }
        arr.push('-' + node.val)
        getTreeArr(node.left, arr)
        getTreeArr(node.right, arr)
        return
    }

    const rootArr = []
    const subRootArr = []
    getTreeArr(root, rootArr)
    getTreeArr(subRoot, subRootArr)
    // 这里应该用KMP算法查找子序列
    return rootArr.toString().includes(subRootArr.toString())
};

console.log("findCircleNum====", isSubtree(ArrayToTree([12]), ArrayToTree([2])));