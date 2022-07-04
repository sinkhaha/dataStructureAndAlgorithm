/**
 * 150. 逆波兰表达式求值
 * 中等
 * https://leetcode.cn/problems/evaluate-reverse-polish-notation/
 * 
 * 解法：栈
 * 
 * 时间O(n)
 * 空间O(n)
 */
/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
    // 栈
    // 遍历数组
    // 遇到操作数，则入栈
    // 遇到操作符，则取栈顶的两个元素进行计算，先出栈的元素是右操作数，后出栈的元素是左操作数，然后把计算结果重新入栈
    // 最后整个栈只有一个元素，即逆波兰表达式的值

    let stack = [];
    for (let item of tokens) {
        if (isNumber(item)) {
            stack.push(parseInt(item));
        } else {
            const num1 = stack.pop(); // 右操作数
            const num2 = stack.pop(); // 左操作数
            if (item == '+') {
                stack.push(num2 + num1);
            } else if (item == '-') {
                stack.push(num2 - num1);
            } else if (item == '*') {
                stack.push(num2 * num1);
            } else if (item == '/') {
                // 区分结果是正还是负
                const result = num2 / num1 > 0 ? Math.floor(num2 / num1) : Math.ceil(num2 / num1);
                stack.push(result);
            }
        }
    }

    return stack.pop();
};

const isNumber = (item) => {
    return !(item == '+' || item == '-' || item == '*' || item == '/');
}