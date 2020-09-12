/**
 * leetcode 49 字母异位词分组
 * 给定一个字符串数组，将字母异位词组合在一起。字母异位词指字母相同，但排列不同的字符串。
 * 
 * Medium
 * 
 * 输入: ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
 * 输出:
 * [
 *  ['ate','eat','tea'],
 *  ['nat','tan'],
 *  ['bat']
 * ]
 * 解法一：排序数组分类
 * 
 * 思路:当且仅当它们的排序字符串相等时，两个字符串是字母异位词
 * 
 * 维护一个映射 strMap : {String -> List}，
 * 其中每个键 K 是一个排序字符串，每个值是初始输入的字符串数组(数组里的值排序后等于K)
 *
 * 时间复杂度O(NKlogK)：N 是 strs 的长度，而 K 是 strs 中字符串的最大长度。
 * 当遍历每个字符串时，外部循环具有的复杂度为O(N)。然后在O(KlogK) 的时间内对每个字符串排序
 *
 * 空间复杂度O(NK)
 * 
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams1 = function(strs) {
    if (strs.length === 0) {
        return [];
    }
    // key是有序的字符串，value是所有的异位词
    let strMap = {};
    for (let str of strs) {
        const strArr = str.split('');
        // 先排序后转成字符串，计算key
        strArr.sort();
        const key = strArr.join('');
        const value = strMap[key];
        if (value === undefined) {
            strMap[key] = [ str ];
        } else {
            value.push(str);
            strMap[key] = value;
        }
    }
    console.log('strMap是', strMap);
    return Object.values(strMap);
};

const strs = ['eat','tea','tan','ate','nat','bat'];
console.log(groupAnagrams1(strs));

var groupAnagrams2 = function(strs) {
    if (strs.length === 0) {
        return [];
    }
    // key是有序的字符串，value是所有的异位词
    let strCountMap = {};

    for (let str of strs) {
        let countArr = Array(26).fill(0);
        for (let i = 0; i < str.length; i++) {
           const index = str.charCodeAt(i) - 97;
           countArr[index]++;
        }
        const key = countArr.join('#');
        const value = strCountMap[key];
        if (value === undefined) {
            strCountMap[key] = [str];
        } else {
            value.push(str);
            strCountMap[key] = value;
        }
    }
    console.log('strCountMap是', strCountMap);
    return Object.values(strCountMap);
};
console.log(groupAnagrams2(strs));
