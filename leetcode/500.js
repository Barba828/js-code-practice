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

console.log("findAnagrams====", findAnagrams("abcab", "ab"));