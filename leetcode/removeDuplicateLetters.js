/**
 * leetcode 316 去除重复字母
 * hard
 * 题目：
 * 给你一个仅包含小写字母的字符串，请你去除字符串中重复的字母，
 * 使得每个字母只出现一次。需保证返回结果的字典序最小（要求不能打乱其他字符的相对位置）。
 * 
 * 比如说输入s = "babc"，去重且符合相对位置的字符串有两个，"bac"和"abc"，
 * 但是需要返回"abc"，因为它的字典序更小
 * 
 * 思路：
 * 维护一个计数和一个结果栈
 * 1、记录每个字符出现的次数；
 * 2、遍历得到每个字符，修改计数，如果这个字符在字符串只出现过一次，
 * 则把这个字符放入栈中，如果当前字符比栈顶字符小，且栈顶字符出现过多次，
 * 则把栈顶字符出栈，等待该字符下一次入栈
 * 
 * 
 * 时间复杂度O(n) n为字符串度长度
 * 空间复杂度O(n)
 * 
 * @param {string} s
 * @return {string}
 */
var removeDuplicateLetters = function(s) {
    // 每个字符对应出现的个数
    let countMap = {};
    for (let char of s) {
        const value = countMap[char];
        countMap[char] = value ? value + 1 : 1;
    }

    console.log(countMap);
    
    let result = [];
    for (let char of s) {
        const value = countMap[char];
        countMap[char] = value - 1;

        if (result.includes(char)) {
            continue;
        }

        // 当遇到比栈顶的字母更小时，检查栈顶字母出现的次数
        // 出现一次不需要pop,有出现多次则pop掉，等后面该字符重新入栈
        while (result.length && char < result[result.length - 1]) {
            const last = result[result.length - 1];
            // 说明该字符在字符串只出现过一次，不能pop
            if (countMap[last] === 0) {
                break;
            }
            result.pop();
        }

        result.push(char);
    }

    return result.toString().replace(/,/g, '');
};

const s = 'bacbabc';
console.log(removeDuplicateLetters(s)); // abc