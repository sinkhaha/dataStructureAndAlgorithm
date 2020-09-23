const { is } = require("bluebird");
const { OPENSSL_VERSION_NUMBER } = require("constants");

/**
 * 面试题 16.26. 计算器(没有括号)
 * 
 * 题目：
 * 给定一个包含正整数、加(+)、减(-)、乘(*)、除(/)的算数表达式(括号除外)，计算其结果。
 * 表达式仅包含非负整数，+， - ，*，/ 四种运算符和空格。 整数除法仅保留整数部分。
 *
 * @param {string} s
 * @return {number}
 */
var calculate1 = function (s) {
    // 去掉空格
    // s = s.replace(/\s+/g, '');
    console.log(s);

    let stack = [];

    // 当前数字
    let num = 0;

    // num前的符号，初始化为+
    let sign = '+';

    for (let i = 0; i < s.length; i++) {
        let curChar = s[i];

        // 如果是数字，连续取num，因为一个数字可能有多个字符
        if (isdigit(curChar)) {
            // 把字符数字转成数字
            num = 10 * num + (curChar - '0');
            console.log(`num=${num}`);
        }

        // 如果不是数字，而是运算符号，把前面的数字和符号都存进栈中 
        if ((!isdigit(curChar) && curChar != ' ') || i == s.length - 1) {
            console.log(`curChar1=${curChar} sign=${sign} num=${num}`);

            switch (sign) {
                case '+': 
                    stack.push(num); 
                    break; 
                case '-': 
                    stack.push(-num); 
                    break; 
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                case '/':
                    console.log(`stack===== `, stack);
                    stack.push(Math.floor(stack.pop() / num)); 
                break;
            }
            console.log(`curChar2=${curChar} sign=${sign} num=${num}`);
            // 更新符号为当前符号，数字清零
            sign = curChar; 
            num = 0; 
        }
    }
    
    console.log(stack);
    // 栈中所有结果求和即可
    let res = 0;
    while (stack.length) {
        res += stack.pop();
    }

    return res;
}

/**
 * 判断一个字符串是否是数字
 * @param {*} str 
 */
function isdigit(str) {
    let n = Number(str);
    return !isNaN(n);
}

// TODO
const s = '2-3/4'; // '14-3/2';
console.log(calculate1(s));

