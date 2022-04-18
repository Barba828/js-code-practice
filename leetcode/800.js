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
        // s指针获取下一个有效自负sIndex
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
        // t指针获取下一个有效自负tIndex
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

console.log("backspaceCompare====", backspaceCompare('ab#c', 'ad#c'));