import { ArrayToTree } from "../structure/index.js";

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
            queue.push(i)
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