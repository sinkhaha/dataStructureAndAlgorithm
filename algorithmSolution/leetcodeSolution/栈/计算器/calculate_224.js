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
 *
 */
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function(s) {
    s = s.trim();

    let stack = [];

    // 整数操作数
    let operate = 0;
    // 整数操作数的进位
    let n = 0;

    // 逆序遍历
    for (let i = s.length - 1; i >= 0; i--) {
        let cur_char = s[i];

        // 空格跳过
        if (cur_char == ' ') {
            continue;
        }

        // 计算多个字符组成的整数操作数
        if (isDigit(cur_char)) {
            operate = (Math.pow(10, n) * Number(cur_char)) + operate;
            n += 1;
        } else {
            // 遇到非数字字符，则把操作数入栈
            if (n != 0) {
                stack.push(operate);
                operate = 0;
                n = 0;
            }

            // 遇到左括号，则计算括号内的子表达式的结果值，后重新入栈
            if (cur_char == '(') {
                // 计算括号内子表达式的值
                let res = evaluateExpr(stack);
                stack.push(res);
            } else {
                // 右括号 或 运算符，直接入栈
                stack.push(cur_char);
            }
        }
    }

    // 字符串左边是一个整数操作数，不是括号
    if (n != 0) {
        stack.push(operate);
    }

    return evaluateExpr(stack);

};

function evaluateExpr(stack) {
   let res = 0;
  
   if (stack.length) {
        // 如果是整数，当成左操作数（因为也可能是运算符）
        let topValue = stack[stack.length - 1];
        if (isDigit(topValue)) {
            stack.pop();
            res = topValue;
        }
   }

   // 栈为空 或 遇到右括号则停止循环
   while (stack.length && stack[stack.length - 1] !== ')') {
       // 运算符号
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
  
   // 去掉右括号
   if (stack.length) {
     stack.pop();  
   }
   
   return res;
}

// 判断字符是否是数字
function isDigit(c) {
    return !isNaN(Number(c));
}

console.log(calculate("(1+(4+2)-1)")); // 6
