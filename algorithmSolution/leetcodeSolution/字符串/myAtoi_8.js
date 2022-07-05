/**
 * 8. 字符串转换整数 (atoi)
 * 中等
 * 
 * 解法：字符串
 */
/**
 * @param {string} s
 * @return {number}
 */
var myAtoi = function (s) {

    let str = s.trim(); // 去掉空格

    if (str.length == 0) {
        return 0;
    }

    let i = 0;
    let sign = 1; // 标示首位是正号 还是 负号

    if (str[0] == '-') {
        sign = -1;
        i = 1;
    } else if (str[0] == '+') {
        i = 1;
    }

    let res = 0;
    const intMax = 2147483647;
    const intMin = -2147483648;

    for (let j = i; j < str.length; j++) {
        if (str[j] >= 0 && str[j] <= 9 && str[j] != " ") {
            res = res * 10 + (+str[j] - 0); // 此时c[j]是数字字符，算出此时字符串转成数字的结果

            // 判断加上当前字符后是否越界
            if (res * sign <= intMin) {
                return intMin;
            } else if (res * sign >= intMax) {
                return intMax;
            }
        } else {
            break;
        }
    }

    return sign * res;
};