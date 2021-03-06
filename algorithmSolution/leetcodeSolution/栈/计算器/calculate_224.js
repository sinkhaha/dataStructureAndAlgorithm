/**
 * leetcode 224 基本计算器
 * 
 * 困难
 * https://leetcode-cn.com/problems/basic-calculator/
 * 
 * 栈实现带有括号带计算器
 * 
 * 实现一个基本的计算器来计算一个简单的字符串表达式的值
 * 字符串表达式可以包含左括号 ( ，右括号 )，加号 + ，减号 -，非负整数和空格
 *
 * 输入: "(1+(4+5+2)-3)+(6+8)"
 * 输出: 23
 *
 * 思路：
 * 可以用'栈'来解决，因为表达式中包含括号，我们可以使用栈来查找每个子表达式的值
 * 本质上，我们需要延迟处理主表达式，直到完成对括号种的中间子表达式的求值
 * 
 * 具体算法：
 * 1.按逆序遍历字符串
 * 
 * 2. 操作数可以由多个字符组成，字符串 "123" 表示数字 123，它可以被构造为：123 >> 120 + 3 >> 100 + 20 + 3。
 * 如果我们读取的字符是一个数字，则我们要将读取的数字乘以 10 的幂并将当前数字相加，形成操作数。因为我们是按逆序处理字符串。
 * 
 * 3.操作数由多个字符组成，一旦我们遇到的字符不是数字，则我们将操作数添加到栈上。
 * 
 * 4.当我们遇到左括号 (，这意味这遇到了一个子表达式结束。由于我们是逆序，
 * 所以开括号成了表达式的结尾。则需要从栈中弹出操作数和运算发来计算表达式，
 * 直到弹出相应的右括号。子表达式的最终结果最终添加到栈上。
 * 
 * 5.将非数字字符添加到栈上。
 * 
 * 6.这个做直到我们得到最终的结果。可能我们没有更多的字符要处理，但是栈仍然是非空的。
 * 当主表达式没有用括号括起来时，就会发生这种情况。因此，在完成对整个表达式求值之后，
 * 我们将检查栈是否非空。如果是的话，我们将栈中的元素作为最终表达式处理，并像遇到左括号时那样对其求值。
 * 我们还可以用一组括号覆盖原表达式，以此避免额外调用。
 * 
 * 注意点：
 * 1.输入始终包含有效的字符串
 * 2.加减法规则
 * 3.括号中的优先含义
 * 4.空格不影响输入表达式的计算
 *
 * 时间复杂度：O(N)，其中 N 指的是字符串的长度。
 * 空间复杂度：O(N)，其中 N 指的是字符串的长度。
 *
 * @param {string} str
 * @return {number}
 */
var calculate = function(str) {
    let operate = 0; // 记录多位整数的和
    let n = 0; // 记录多位整数的位(个十百)
    const stack = [];

    for (let i = str.length;  i > 0; i--) {
        let ch = str[i];
        if (ch === ' ') {
            continue;
        }
        // 是多位数整数需要计算
        if (isInteger(+ch)) {
            operate = Math.pow(10, n) * Number(ch) + operate;
            n += 1;
        } else {
            // n有值，说明有多位整数，先加入栈中
            if (n !== 0) {
                stack.push(operate);
                n = 0;
                operate = 0;
            }

            // 遇到左括号先计算括号内的表达式，再放入栈
            if (ch === '(') {
                let res = evaluateExpr(stack);
                // 去掉左括号
                stack.pop();
                // 放入计算后的值
                stack.push(res);
            } else {
                // 加减号 或 右括号)
                stack.push(ch);
            }
        }
    }

    // 最后一位(因为逆序所以此时是表达式的第一位)是多位整数
    if (n !== 0) {
        stack.push(operate);
    }

    return evaluateExpr(stack);
};

/**
 * 计算括号内的整数
 * @param {*} stack 
 */
function evaluateExpr(stack) {
   let res = 0;
   if (stack.length !== 0) {
       // 第1个整数操作数
       res = +stack.pop();
   }

   // 栈空了 或 遇到右括号则停止计算
   while (stack.length !== 0 && stack[stack.length - 1] !== ')') {
       // 运算符号+或-
       let sign = stack.pop();
       // 第2个整数操作数
       const num = +stack.pop();

       // 因为栈存储的是从右到左的整数，所以取出来的值是从左到右的，可以直接相加减
       if (sign === '+') {
           res += num;
       } else {
           res -= num;
       }
   }

   return res;
}

function isInteger(obj) {
    return typeof obj === 'number' && obj % 1 === 0;
}

console.log(calculate("(1+(4+2)-1)")); // 6
