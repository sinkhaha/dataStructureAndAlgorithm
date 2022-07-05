/**
 * 166. 分数到小数
 * 中等
 * https://leetcode.cn/problems/fraction-to-recurring-decimal/
 * 
 * 解法：长除法
 * 参考官方题解 https://leetcode.cn/problems/fraction-to-recurring-decimal/solution/fen-shu-dao-xiao-shu-by-leetcode-solutio-tqdw/

 */
/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
    // 长除法

    // 整除
    if (numerator % denominator == 0) {
        return '' + Math.floor(numerator / denominator);
    }

    const sb = [];
    if (numerator < 0 ^ denominator < 0) {
        sb.push('-');
    }

    // 整数部分
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
    const integerPart = Math.floor(numerator / denominator);
    sb.push(integerPart);
    sb.push('.');

    // 小数部分
    const fractionPart = [];
    const remainderIndexDic = new Map();
    let remainder = numerator % denominator;
    let index = 0;
    while (remainder !== 0 && !remainderIndexDic.has(remainder)) {
        remainderIndexDic.set(remainder, index);
        remainder *= 10;
        fractionPart.push(Math.floor(remainder / denominator));
        remainder %= denominator;
        index++;
    }
    if (remainder !== 0) { // 有循环节
        let insertIndex = remainderIndexDic.get(remainder);
        fractionPart.splice(insertIndex, 0, '(');
        fractionPart.push(')');
    }
    sb.push(fractionPart.join(''));

    return sb.join('');
}