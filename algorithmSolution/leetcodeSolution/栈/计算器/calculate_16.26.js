/**
 * 面试题 16.26. 计算器(没有括号)
 * 
 * https://leetcode-cn.com/problems/calculator-lcci/
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
    // console.log(s);

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
        }

        // 如果不是数字(空格不处理)，而是运算符号，把前面的数字和符号运算后存进栈中 
        if ((!isdigit(curChar) && curChar != ' ') || i == s.length - 1) {
            switch (sign) {
                case '+': 
                    stack.push(num); 
                    break; 
                case '-': 
                    stack.push(-num); 
                    break; 
                // 乘除需要计算后再存入    
                case '*':
                    stack.push(stack.pop() * num);
                    break;
                case '/':
                    // 直接舍弃小数部分，即向0取整 如：-1.5 => -1
                    let rst = parseInt(stack.pop() / num);
                    stack.push(rst); 
                break;
            }
            // 更新符号为当前符号，数字清零
            sign = curChar;
            num = 0; 
        }
    }
    
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

const s = '14-3/2'; // 13
console.log(calculate1(s));

/** ==================================================== */

function calculate2(s) {
    let numStack = [];
    let charStack = [];
    
    let num = 0;

    for (let i = 0; i < s.length; i++) {
        const curChar = s[i];
        if (isdigit(+curChar)) {
            num = 10 * num + (curChar - '0');
            if (i === s.length-1) {
                numStack.push(num);
            }
        } else {
            console.log('num', num);
            numStack.push(num);
            while (charStack.length && prof(charStack[charStack.length -1], curChar)) {
                const num1 = numStack.pop();
                const sign = charStack.pop();
                const num2 = numStack.pop();
                const result = cal(num2, num1, sign);
                numStack.push(result);
            }
            charStack.push(curChar);
            num = 0;
        }
    }

    console.log(numStack);
    console.log(charStack);
    
    let result = 0;
    while (numStack.length && charStack.length) {
        const num1 = numStack.pop();
        const sign = charStack.pop();
        const num2 = numStack.pop();
        const rst = cal(num2, num1, sign);
        numStack.push(rst);
        result = rst;
    }
    return result;
}

function cal(a, b, sign) {
    let result = 0;
    switch(sign) {
        case '+': result = a + b; break;
        case '-': result = a - b; break;
        case '*': result = a * b; break;
        case '/': result = a / b; break;
    }
    return result;
}

function prof(c1, c2) {
    if (['*', '/'].includes(c1)) {
        return true;
    } else if (['+', '-'].includes(c2)) {
        return true;
    }
    return false;
}

// TODO
console.log(calculate2('3+2*2'));

