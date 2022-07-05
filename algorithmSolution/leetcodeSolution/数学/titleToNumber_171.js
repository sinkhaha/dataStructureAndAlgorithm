/**
 * 171. Excel 表列序号
 * 简单
 * https://leetcode.cn/problems/excel-sheet-column-number/
 * 
 * 解法：数学
 */
/**
 * @param {string} columnTitle
 * @return {number}
 */
var titleToNumber = function (columnTitle) {
    let ans = 0;

    for (let i = 0; i < columnTitle.length; i++) {
        let num = columnTitle[i].charCodeAt() - 'A'.charCodeAt() + 1;
        ans = ans * 26 + num;
    }

    return ans;
};