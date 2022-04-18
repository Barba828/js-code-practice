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

console.log('numSubarrayProductLessThanK====', numSubarrayProductLessThanK([10, 5, 2, 6], 100));