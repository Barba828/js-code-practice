/**
 * 1060. 有序数组中的缺失元素
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var missingElement = function (nums, k) {
  // 获取nums下标位置的缺失数量
  const missing = (index) => {
    return nums[index] - (nums[0] + index);
  };

  if (missing(nums.length - 1) < k) {
    return nums[nums.length - 1] + k - missing(nums.length - 1);
  }

  // 二分查找左右向k值靠拢
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    let pivot = left + Math.floor((right - left) / 2);
    if (missing(pivot) < k) {
      left = pivot + 1;
    } else {
      right = pivot;
    }
  }

  return nums[left - 1] + k - missing(left - 1, nums);
};

/**
 * 1091. 二进制矩阵中的最短路径
 * @tag 深度优先搜索
 * @param {number[][]} grid
 * @return {number}
 */
var shortestPathBinaryMatrix = function (grid) {

};

// console.log(missingElement([4, 7, 9, 10], 3));

/**
 * 1231. 分享巧克力
 * @param {number[]} sweetness
 * @param {number} k
 * @return {number}
 */
var maximizeSweetness = function (sweetness, k) {
  // 是否存在一块甜度为x的巧克力
  const canDivide = (x) => {
    let count = 0; // 当前块数
    let tempSweetness = 0; // 当前块的甜度
    sweetness.forEach((item) => {
      tempSweetness += item;
      if (tempSweetness >= x) {
        count++;
        tempSweetness = 0;
      }
    });
    return count >= k + 1;
  };

  // 二分查找，自己拿到的甜度一定在最小块甜度和平均甜度之间
  let left = Math.min(...sweetness); // 左侧是最小块甜度
  let right = Math.floor(
    // 右侧是平均甜度
    sweetness.reduce((prev, curr) => prev + curr) / (k + 1)
  );

  while (left < right) {
    let mid = left + Math.floor((right - left + 1) / 2);
    if (canDivide(mid)) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left;
};

// console.log(maximizeSweetness([1, 2, 3, 4, 5, 6, 7, 8, 9], 5));

/**
 * 1182. 与目标颜色间的最短距离
 * @param {number[]} colors
 * @param {number[][]} queries
 * @return {number[]}
 */
var shortestDistanceColor = function (colors, queries) {
  // color abc分别放入三个数组，值为原下标
  const arr = [[], [], []];
  colors.forEach((color, index) => {
    arr[color - 1].push(index);
  });

  // 根据下标数组二分查找距离最近的下标
  return queries.map(([index, color]) => {
    const indexArr = arr[color - 1];
    if (indexArr.length === 0) {
      return -1;
    }
    let leftIndex = 0;
    let rightIndex = indexArr.length - 1;
    while (leftIndex < rightIndex - 1) {
      let mid = Math.floor((leftIndex + rightIndex) / 2);
      if (indexArr[mid] > index) {
        rightIndex = mid;
      } else {
        leftIndex = mid;
      }
    }

    return Math.min(
      Math.abs(indexArr[leftIndex] - index),
      Math.abs(indexArr[rightIndex] - index)
    );
  });
};

// console.log(
//   shortestDistanceColor(
//     [3, 1, 1, 2, 3, 3, 2, 1, 2, 3, 1, 1, 3, 2, 3, 1, 1, 1, 1, 2, 2, 1, 2, 2, 2],
//     [[5, 1]]
//   )
// );

/**
 * 1229. 安排会议日程
 * @tag 双指针
 * @param {number[][]} slots1
 * @param {number[][]} slots2
 * @param {number} duration
 * @return {number[]}
 */
var minAvailableDuration = function (slots11, slots22, duration) {
  const slots1 = slots11.sort((a, b) => a[0] - b[0]);
  const slots2 = slots22.sort((a, b) => a[0] - b[0]);
  let n1 = 0;
  let n2 = 0;
  while (n1 < slots1.length && n2 < slots2.length) {
    if (slots1[n1][1] < slots2[n2][0]) {
      n1++;
    } else if (slots1[n1][0] > slots2[n2][1]) {
      n2++;
    } else {
      const start = Math.max(slots1[n1][0], slots2[n2][0]);
      const end = Math.min(slots1[n1][1], slots2[n2][1]);
      if (end - start >= duration) {
        return [start, start + duration];
      } else {
        if (slots1[n1][1] > slots2[n2][1]) {
          n2++;
        } else {
          n1++;
        }
      }
    }
  }
  return [];
};

console.log(
  minAvailableDuration(
    [
      [216397070, 363167701],
      [98730764, 158208909],
      [441003187, 466254040],
      [558239978, 678368334],
      [683942980, 717766451],
    ],
    [
      [50490609, 222653186],
      [512711631, 670791418],
      [730229023, 802410205],
      [812553104, 891266775],
      [230032010, 399152578],
    ],
    456085
  )
);
