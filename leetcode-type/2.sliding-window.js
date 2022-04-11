/**
 * @type {sliding window algorithm} 滑动窗口算法
 * 可以用以解决数组/字符串的子元素问题，它可以将嵌套的循环问题，转换为单循环问题，降低时间复杂度
 */

/**
 * 159. 至多包含两个不同字符的最长子串
 * @tag 滑动窗口
 * 滑动窗口[left,right]，使用map存储left和right的下标
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstringTwoDistinct = function (s) {
  if (s.length < 3) {
    return s.length;
  }
  let maxLength = 2;
  let left = 0;
  let right = 1;

  const map = new Map([
    [s[0], 0],
    [s[1], 1],
  ]);

  while (right < s.length) {
    // map更新有右侧窗口下标
    map.set(s[right], right);

    // map长度大于2，则更新左侧窗口下标
    if (map.size > 2) {
      // map中value最小值即原左侧窗口下标
      let minValue = Infinity;
      let minKey = 0;
      map.forEach((value, key) => {
        if (value < minValue) {
          minValue = value;
          minKey = key;
        }
      });
      // 删除原左侧下标
      map.delete(minKey);
      // 更新现在左下标
      left = minValue + 1;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
};

// console.log(lengthOfLongestSubstringTwoDistinct("aabbccc"));

/**
 * 340. 至多包含 K 个不同字符的最长子串
 * 和「 159. 至多包含两个不同字符的最长子串」一致解法
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  if (s.length < k + 1) {
    return s.length;
  }

  let maxLength = 0;
  let left = 0;
  let right = 0;

  const map = new Map();

  while (right < s.length) {
    // map更新有右侧窗口下标
    map.set(s[right], right);

    // map长度大于2，则更新左侧窗口下标
    if (map.size > k) {
      // map中value最小值即原左侧窗口下标
      let minValue = Infinity;
      let minKey = 0;
      map.forEach((value, key) => {
        if (value < minValue) {
          minValue = value;
          minKey = key;
        }
      });
      // 删除原左侧下标
      map.delete(minKey);
      // 更新现在左下标
      left = minValue + 1;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
};
