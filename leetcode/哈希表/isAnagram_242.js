/**
 * 242. 有效的字母异位词
 * 简单
 * 
 * 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词
 * 
 * 输入: s = "anagram", t = "nagaram"
 * 输出: true
 *
 * 解法1: map计数(计算s每个字符的个数，然后再计算t每个字符的个数)
 * 时间复杂度O(n)，优于解法2
 * 空间复杂度O(n)
 * 
 * 解法2: 分别对s和t排序，然后比较两个排序好的字符串是否相等（假设用快排，时间复杂度N*O(logN)）
 * 
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var isAnagram1 = function(s, t) {
    if (s.length !== t.length) {
        return false;
    }
    if (s == t) {
        return true;
    }

    let map = new Map();
    for (let c of s) {
        const val = map.get(c);
        if (val) {
            map.set(c, val + 1);
        } else {
            map.set(c, 1);
        }
    }
    
    console.log(map);

    // 减少map的计数
    for (let c of t) {
        const val = map.get(c);
        if (val) {
            if (val === 1) {
                map.delete(c);
            } else {
                map.set(c, val - 1);
            }
        }
    }

    console.log(map);

    return map.size < 1;
};

const s = 'aacc'; const t = 'ccac';
console.log(isAnagram1(s, t));

/**
 * 解法2: 排序
 * @param {*} s 
 * @param {*} t 
 */
var isAnagram2 = function(s, t) {
    const sortS = sortStr(s);
    const sortT = sortStr(t);
    return sortS == sortT;
}
/**
 * 字符串按字母从小到大排序
 * @param {*} s 
 */
function sortStr(s) {
    return s.split('').sort((a, b) => {
        return a.localeCompare(b);
    }).join('');
}
console.log(isAnagram2(s, t));

