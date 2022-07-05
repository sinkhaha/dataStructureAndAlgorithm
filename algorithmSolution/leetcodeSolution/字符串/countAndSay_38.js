/**
 * 38. 外观数列
 * 中等
 * https://leetcode.cn/problems/count-and-say/
 * 
 * 解法：字符串
 */
/**
 * @param {number} n
 * @return {string}
 */
var countAndSay = function (n) {

    let str = '1';

    for (let i = 2; i <= n; i++) {
        // 对每个n求出它的序列，其实是对前一项相同字符的个数统计
        let start = 0;
        let point = 0;
        const sb = []; // 存放前一项相同字符的个数统计，如['11','21'] 分别表示1个1，2个1

        while (point < str.length) {
            while (point < str.length && str[point] == str[start]) {
                point++;
            }

            // 此时point - 1索引指向的数和start索引指向的数是相同的，放入队列中，如3个1，即'31'
            sb.push('' + (point - start) + str[start]);
            start = point;
        }

        // 前一项的序列
        str = sb.join('');
    }

    return str;
};