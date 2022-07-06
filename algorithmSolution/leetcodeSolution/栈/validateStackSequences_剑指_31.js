/**
 * 剑指 Offer 31. 栈的压入、弹出序列
 * 中等
 * https://leetcode.cn/problems/zhan-de-ya-ru-dan-chu-xu-lie-lcof/
 * 
 * 解法：栈
 */
/**
 * @param {number[]} pushed
 * @param {number[]} popped
 * @return {boolean}
 */
var validateStackSequences = function (pushed, popped) {
    // 借助辅助栈，模拟pushed入栈和poped出栈操作
    // 对pushed依次入栈到辅助栈中，每入一次栈后，判断popped[i]当前元素是否和入栈的值相等，
    // 相等则从辅助栈中出栈，然后i++，循环结束后，如果helpStack为空，说明为true
    const helpStack = [];
    let i = 0;
    for (let num of pushed) {
        helpStack.push(num);
        while (helpStack.length && popped[i] === helpStack[helpStack.length - 1]) {
            helpStack.pop();
            i += 1;
        }
    }

    return helpStack.length === 0;
};