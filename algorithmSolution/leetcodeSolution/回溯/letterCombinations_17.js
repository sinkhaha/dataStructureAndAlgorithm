/**
 * 17. 电话号码的字母组合
 * 中等
 * https://leetcode.cn/problems/letter-combinations-of-a-phone-number/
 * 
 * 解法：回溯
 */
/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
    if (!digits) {
        return [];
    }

    const n = digits.length;

    let charMap = {
        2: 'abc',
        3: 'def',
        4: 'ghi',
        5: 'jkl',
        6: 'mno',
        7: 'pqrs',
        8: 'tuv',
        9: 'wxyz'
    };

    let res = [];

    // trackStr为选择的字符串；level为层，一个数字对应一层
    this.backtrack = function (trackStr, level) {
        if (trackStr.length === n) {
            res.push(trackStr);
            return;
        }

        const digit = digits[level]; // js字符串可以根据下标取值
        const digitToCharStr = charMap[digit];

        // 当前层选择字符
        for (let c of digitToCharStr) {
            // 选择
            trackStr = trackStr + c;
            this.backtrack(trackStr, level + 1);
            // 撤销选择
            trackStr = trackStr.substring(0, trackStr.length - 1);
        }
    }

    // 回溯
    this.backtrack('', 0);

    return res;
};