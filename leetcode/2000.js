/**
 * @param {number[][]} mat
 * @return {number[]}
 */
var findPeakGrid = function (mat) {
    let top = 0;
    let bottom = mat.length - 1;
    let col = 0;

    // 二分查找行数
    while (top < bottom) {
        const row = Math.floor((bottom + top) / 2);
        // 查找该行最大值的列数
        col = mat[row].findIndex((item) => item === Math.max(...mat[row]));

        // 该列是否比上/下行的数字大，否则说明该行不是峰值，则进行下一次二分取行数
        if (mat[row][col] < mat[row + 1][col]) {
            top = row + 1;
        } else {
            bottom = row;
        }
    }

    return [Math.floor((bottom + top) / 2), col];
};
// console.log(
//   findPeakGrid([
//     [10, 19, 15],
//     [21, 20, 14],
//     [31, 16, 32],
//   ])
// );

/**
 * 1868. 两个行程编码数组的积
 * @tag 双指针
 * 只能同时解码和压缩
 * @param {number[][]} encoded1
 * @param {number[][]} encoded2
 * @return {number[][]}
 */
var findRLEArray = function (encoded1, encoded2) {
    let index1 = 0,
        index2 = 0;
    let count1 = 0,
        count2 = 0,
        num1 = 0,
        num2 = 0;
    let count = 0,
        num = 0;
    const ans = [];

    // 同时解码两个数组
    while (index1 < encoded1.length || index2 < encoded2.length) {
        if (count1 === 0) {
            count1 = encoded1[index1][1];
            num1 = encoded1[index1][0];
            index1++;
        }
        if (count2 === 0) {
            count2 = encoded2[index2][1];
            num2 = encoded2[index2][0];
            index2++;
        }

        // 压缩计算乘积count
        let newCount = Math.min(count1, count2);
        count1 -= newCount;
        count2 -= newCount;
        // 压缩计算乘积num
        const newNum = num1 * num2;

        // 更新压缩数组
        if (newNum === num) {
            count += newCount;
        } else {
            if (count !== 0) {
                ans.push([num, count]);
            }
            count = newCount;
            num = newNum;
        }
    }
    ans.push([num, count]);
    return ans;
};

console.log(
    findRLEArray(
        [
            [1, 3],
            [2, 3],
        ],
        [
            [6, 3],
            [3, 3],
        ]
    )
);
