/**
 * 821. 字符的最短距离
 * 从左至右和从右至左分别遍历一次找出左右两侧 c 的最近值，初始 idx 用 Infinity 表示（反向时会被覆盖掉）
 * @param {string} s
 * @param {character} c
 * @return {number[]}
 */
var shortestToChar = function (s, c) {
    const n = s.length
    const ans = new Array(n).fill(0)

    for (let i = 0, idx = -Infinity; i < n; i++) {
        if (s[i] === c) {
            idx = i
        }
        ans[i] = i - idx
    }

    for (let i = n - 1, idx = Infinity; i >= 0; i--) {
        if (s[i] === c) {
            idx = i
        }
        ans[i] = Math.min(idx - i, ans[i])
    }

    return ans
};
/**
 * 821. 字符的最短距离
 * @tag BFS
 * 先遍历一次找出所有 c 的位置，从 c 的所有位置入队开始左右方向 BFS，未遍历过的值等于上一层的距离 + 1
 */
var shortestToChar = function (s, c) {
    const n = s.length
    const ans = new Array(n).fill(-1)
    const queue = []
    const layer = [-1, 1]

    // 获取 BFS 第 0 层
    for (let i = 0; i < n; i++) {
        if (s[i] === c) {
            ans[i] = 0
            queue.push(i)
        }
    }

    while (queue.length > 0) {
        const temp = queue.shift()
        for (const step of layer) {
            if (ans[temp + step] === -1) {
                ans[temp + step] = ans[temp] + 1
                queue.push(temp + step)
            }
        }
    }
    return ans
}
console.log("shortestToChar====", shortestToChar("aaba", 'b'));

/**
 * 844. 比较含退格的字符串
 * @tag 栈
 * 给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。
 * 使用栈来重构 # 退格的字符串再比较
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
    const transSharp = (str) => {
        const arr = []
        str.split('').forEach(item => {
            if (item === '#') {
                arr.pop()
            } else {
                arr.push(item)
            }
        })
        return arr.join('')
    }
    return transSharp(s) === transSharp(t)
};
/**
 * 844. 比较含退格的字符串 2 
 * @tag 双指针 
 * 从字符串尾部开始双指针遍历，skipS记录 # 次数，indexS记录指针位置
 * 每一次子whlie循环获取从后往前数的下一个有效字母，比较
 */
var backspaceCompare = function (s, t) {
    let skipS = 0
    let skipT = 0
    let sIndex = s.length - 1
    let tIndex = t.length - 1

    while (sIndex >= 0 || tIndex >= 0) {
        // s指针获取下一个有效字符sIndex
        while (sIndex >= 0) {
            if (s[sIndex] === '#') {
                skipS++
                sIndex--
            } else if (skipS > 0) {
                skipS--
                sIndex--
            } else {
                break
            }
        }
        // t指针获取下一个有效字符tIndex
        while (tIndex >= 0) {
            if (t[tIndex] === '#') {
                skipT++
                tIndex--
            } else if (skipT > 0) {
                skipT--
                tIndex--
            } else {
                break
            }
        }

        if (s[sIndex] !== t[tIndex]) {
            return false
        }

        sIndex--
        tIndex--
    }
    return true
};
// console.log("backspaceCompare====", backspaceCompare('ab#c', 'ad#c'));

/**
 * 986. 区间列表的交集
 * 给定两个由一些 闭区间 组成的列表，firstList 和 secondList ，其中 firstList[i] = [starti, endi] 而 secondList[j] = [startj, endj] 。每个区间列表都是成对 不相交 的，并且 已经排序 。
 * 返回这 两个区间列表的交集
 * @tag 双指针
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */
var intervalIntersection = function (firstList, secondList) {
    let i = 0
    let j = 0
    const ans = []
    // i，j 两个指针分别指向两个数组下标，通过 max/min 获取交集
    while (i < firstList.length && j < secondList.length) {
        const lo = Math.max(firstList[i][0], secondList[j][0])
        const high = Math.min(firstList[i][1], secondList[j][1])

        if (lo <= high) {
            ans.push([lo, high])
        }

        // 通过比较区间尾部，有效移动指针
        if (firstList[i][1] < secondList[j][1]) {
            i++
        } else {
            j++
        }
    }
    return ans
};

// console.log(
//     'intervalIntersection====',
//     intervalIntersection([[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]])
// );