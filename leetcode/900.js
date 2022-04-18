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

console.log(
    'intervalIntersection====',
    intervalIntersection([[0, 2], [5, 10], [13, 23], [24, 25]], [[1, 5], [8, 12], [15, 24], [25, 26]])
);