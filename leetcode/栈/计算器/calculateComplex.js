/**
 * 带括号和加减乘除的计算器
 * 
 * @param {*} s 
 */
var calculate = function (s) {

    this.cal = function (s) {
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

            // 遇到左括号开始递归计算 num 
            if (curChar == '('){
                num = this.cal(s);
            }

            // 如果不是数字(空格不处理)，而是运算符号，把前面的数字和符号都存进栈中 
            if ((!isdigit(curChar) && curChar != ' ') || i == s.length - 1) {
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
                        // 直接舍弃小数部分，即向0取整 如：-1.5 => -1
                        let rst = parseInt(stack.pop() / num);
                        stack.push(rst);
                        break;
                }
                // 更新符号为当前符号，数字清零
                sign = curChar;
                num = 0;
            }
            // 遇到右括号返回递归结果 
            if (curChar == ')'){
                break;
            }
        }

        // 栈中所有结果求和即可
        let res = 0;
        while (stack.length) {
            res += stack.pop();
        }

        return res;
    }

    return cal(s);
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
const s = '3*(4-5/2)'; // 0
console.log(calculate(s));